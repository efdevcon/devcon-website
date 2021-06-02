import { NewsItem } from '../../../src/types/NewsItem';
require('dotenv').config()
const nodeFetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const RSSParser = require('rss-parser');
const rssParser = new RSSParser();

const newsDirectory = path.resolve(__dirname, '../../../src/content/news-external');

const files = (() => {
  const _interface = {
    readFile: (filepath: string): Promise<File> => {
      return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err: any, file: any) => {
          if (err) {
            reject(err) 
          } else {
            resolve(file);
          }
        });
      })
    },
    getFilenamesByDirectory: (directory: string): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        fs.readdir(directory, (err: any, files: string[]) => {
          if (err) {
            reject(err) 
          } else {
            resolve(files);
          }
        });
      })
    },
    writeFile: async (filepath: string, contents: string): Promise<boolean> => {
      // If file with given path already exists we don't want to override it - that allows us to change them using the CMS
      const exists = await _interface.checkFileExists(filepath);

      return new Promise((resolve, reject) => {
        if (exists) {
          resolve(true);

          return;
        }

        fs.writeFile(filepath, contents, (err: any) => {
          if (err) {
            reject(err) 
          } else {
            resolve(true);
          }
        });
      });
    },
    ensureDirectory: (directory: string) => {
      if (!fs.existsSync(directory)){
          fs.mkdirSync(directory);
      }
    },
    checkFileExists: (filepath: string) => {
      return new Promise((resolve, reject) => {
        fs.access(filepath, (err: any, exists: any) => {
          if (err) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
      });
    },
    createSafeFilename: (filename: string) => {
      return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }
  }

  return _interface;
})();

const markdown = (() => {
  const _interface = {
    newsItemToMarkdown: (newsItem: NewsItem) => {
      // return matter.stringify(newsItem.description || '', newsItem);
      const attributes = Object.entries(newsItem);

      const markdown = `---${attributes.reduce((acc, [key, value], index) => {
        if (typeof value === 'undefined' || key === 'description') return acc;

          return acc += `\n${key}: '${value.trim()}'`;
        }, '')}\n---\n${newsItem.description?.trim()}`;

      return markdown;
    },
    write: (directory: string, computeFileName: (newsItem: NewsItem) => string) => (newsItems: NewsItem[]) => {
      return Promise.all(newsItems.map(newsItem => {
        return files.writeFile(path.resolve(directory, computeFileName(newsItem)), _interface.newsItemToMarkdown(newsItem));
      }));
    }
  }

  return _interface;
})();

const formatting = (() => {
  const _interface = {
    formatBlogPost: (post: any): NewsItem => {
      return {
        title: post.title,
        url: post.link,     
        date: post.isoDate,
        author: post.author,
        description: post.content,
     }
    },
    formatTweet: (tweet: any): NewsItem => {
      return {
        title: tweet.id,
        url: `https://twitter.com/EFDevcon/status/${tweet.id}`,
        date: tweet.created_at,
        author: '@EFDevcon',
        tweetID: tweet.id,
        description: tweet.text
      }
    }
  }

  return _interface;
})();

const twitter = (() => {
  const twitterDir = path.resolve(newsDirectory, 'tweets');
  // We only include tweets which include a specific hashtag
  const curationHashtag = 'Devcon'; 
  const host = 'https://api.twitter.com/2';
  const bearer = `Bearer ${process.env.TWITTER_API_KEY}`;
  const userID = '1013526003015184385';

  const fetchWrapper = (pathname = '', queryParams?: { [key: string]: any }) => {
    const fetchOptions = {
      headers: {
        Authorization: bearer
      }
    }
  
    const queryString = new URLSearchParams(queryParams).toString();

    const url = `${host}${pathname}${queryString ? `?${queryString}` : ''}`;
  
    return nodeFetch(url, fetchOptions).then((response: any) => response.json());
  }

  const _interface = {
    twitterDir,
    ensureDirectory: async () => {
      files.ensureDirectory(twitterDir);
    },
    getTweets: async (sinceID: number, results: any[] = [], nextToken?: string): Promise<any> => {
      const queryParams = {
        exclude: 'retweets,replies',
        since_id: sinceID,
        max_results: 100,
        'tweet.fields': 'created_at,entities'
      } as any

      if (nextToken) {
        queryParams.pagination_token = nextToken;
      }

      const result = await fetchWrapper(`/users/${userID}/tweets`, queryParams);

      if (result.meta.result_count === 0) return results;

      results = [...results, ...result.data]; 

      if (result.meta.next_token) {
        return await _interface.getTweets(sinceID, results, result.meta.next_token);
      } else {
        // We only collect tweets that are marked with the curation hashtag
        return results.filter((tweet: any) => tweet?.entities?.hashtags?.some((hashtag: any) => hashtag.tag === curationHashtag));
      }
    },
    getUserID: async () => {
      const result = await fetchWrapper(`/users/by/username/EFDevcon`);

      return result;
    },
    /* 
      Collected tweets are named by IDs (which are sequential) - we can retrieve the latest fetched tweet ID by finding the highest number among the saved tweets, which is useful for
      only requesting tweets that happened after that tweet
    */
    getLatestTweetID: async () => {
      const filenames = await files.getFilenamesByDirectory(path.resolve(__dirname, twitterDir));
      let latestRecordedTweet: number = 1379132185274384384;
  
      filenames.forEach(filename => {
        const timestamp = parseInt(filename);
  
        if (timestamp > latestRecordedTweet) {
          latestRecordedTweet = timestamp;
        }
      })
  
      return latestRecordedTweet;
    } 
  }

  return _interface;
})();

const blog = (() => {
  const blogDir = path.resolve(newsDirectory, 'blog-posts');

  const _interface = {
    blogDir,
    ensureDirectory: async () => {
      files.ensureDirectory(blogDir);
    },
    getPosts: async () => {
      const feed = await rssParser.parseURL('http://blog.ethereum.org/feed/category/devcon.xml');
  
      return feed.items;
    },
  }

  return _interface;
})();

files.ensureDirectory(newsDirectory);

twitter
  .ensureDirectory()
  .then(twitter.getLatestTweetID)
  .then(twitter.getTweets)
  .then((tweets: any) => console.log(tweets) as any || tweets.map(formatting.formatTweet))
  .then(markdown.write(twitter.twitterDir, (newsItem) => `${newsItem.tweetID}.md`))
  .catch(e => {
    console.error('Twitter failed: ', e)
  })

blog
  .ensureDirectory()
  .then(blog.getPosts)
  .then(posts => posts.map(formatting.formatBlogPost))
  .then(markdown.write(blog.blogDir, (newsItem) => `${files.createSafeFilename(newsItem.title)}.md`))
  .catch(e => {
    console.error('Blog failed: ', e)
  })

/*
  1) Trigger GITHUB build on: push, pull_request, new tweets ONLY with the correct hashtag, new blog posts
    Github actions:
      1) Load existing news files from markdown
      2) Get latest tweet, request all tweets after that date
      3) Get blog RSS feed
      4) Write markdown files
      5) Git add . git commit -m 'Fetch news' git push
      6) Yarn build
      7) curl netlify build hook

  Issues:
    1) If generating markdown files from tweets and blogs, do we translate them? If no, how do we prevent them from reaching crowdin? DONE/solved
    2) Rate limits on tweets
    3) Triggering builds (create server, or use zapier?). Zapier has to be intelligent enough to only trigger builds when necessary, or we will build too often
      3.1) If we use a server to trigger builds, we might as well generate the markdown files on that server and commit them from there, rather than doing it in github actions

    Left to do:
      0) Slight adjustments
      1) Listen to feed updates/new tweets and trigger github build
      2) Pagination 
      3) Refresh twitter API tokens (do not push this as well)
*/
