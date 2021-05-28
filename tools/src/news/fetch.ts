import { NewsItem } from '../../../src/types/NewsItem';
import * as matter from 'gray-matter';
const nodeFetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const RSSParser = require('rss-parser');
const rssParser = new RSSParser();

console.log(process.env.NODE_ENV, 'test');

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
    writeFile: (filepath: string, contents: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
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
    createSafeFilename: (filename: string) => {
      return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }
  }

  return _interface;
})();

const markdown = (() => {
  const _interface = {
    newsItemToFrontmatter: (newsItem: NewsItem) => {
      return matter.stringify(newsItem.description || '', newsItem);
    },
    write: (directory: string, computeFileName: (newsItem: NewsItem) => string) => (newsItems: NewsItem[]) => {
      return Promise.all(newsItems.map(newsItem => {
        return files.writeFile(path.resolve(directory, computeFileName(newsItem)), _interface.newsItemToFrontmatter(newsItem));
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
  const twitterDir = path.resolve(__dirname, '../../../src/content/news/tweets');
  const curationHashtag = 'Devcon';
  const host = 'https://api.twitter.com/2';
  const bearer = 'Bearer AAAAAAAAAAAAAAAAAAAAAMwLQAEAAAAA4jN75oBs9B3waNjeZVf02Hp0kOc%3DIgSciJXZu23fLg4y5DisVYjTQkT0CDG0PZ0kT1idJbUPH3LTcZ';
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
    getTweets: async (sinceID: number) => {
      const result = await fetchWrapper(`/users/${userID}/tweets`, {
        exclude: 'retweets,replies',
        since_id: sinceID,
        'tweet.fields': 'created_at,entities'
      });

      if (result.meta.result_count === 0) return [];

      // We only collect tweets that are marked with the curation hashtag
      return result.data.filter((tweet: any) => tweet?.entities?.hashtags?.some((hashtag: any) => hashtag.tag === curationHashtag));
    },
    getUserID: async () => {
      const result = await fetchWrapper(`/users/by/username/EFDevcon`);

      return result;
    },
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
  const blogDir = path.resolve(__dirname, '../../../src/content/news/blog-posts');

  const _interface = {
    blogDir,
    ensureDirectory: async () => {
      files.ensureDirectory(blogDir);
    },
    getPosts: async () => {
      const feed = await rssParser.parseURL('http://blog.ethereum.org/feed/category/devcon.xml');

      console.log(feed, 'feed');
  
      return feed.items;
    },
  }

  return _interface;
})();

twitter
  .ensureDirectory()
  .then(twitter.getLatestTweetID)
  .then(twitter.getTweets)
  .then(tweets => tweets.map(formatting.formatTweet))
  .then(markdown.write(twitter.twitterDir, (newsItem) => `${newsItem.tweetID}.md`))
  .catch(e => {
    console.error('Twitter failed: ', e)
  })

// blog
//   .getPosts()
//   .then(posts => posts.map(formatting.formatBlogPost))
//   .then(markdown.write(blog.blogDir, (newsItem) => `${files.createSafeFilename(newsItem.title)}.md`))
//   .catch(e => {
//     console.error('Blog failed: ', e)
//   })

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
