import { NewsItem } from 'types/NewsItem';
import { BASE_CONTENT_FOLDER } from 'utils/constants'
import nodeFetch from 'node-fetch';
import matter from 'gray-matter';
import { GetTags } from 'services/page';
import moment from 'moment';
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const RSSParser = require('rss-parser');
const rssParser = new RSSParser();

const formatting = (() => {
  const _interface = {
    formatBlogPost: (post: any): NewsItem => {
      return {
        title: post.title,
        url: post.link,     
        date: moment(post.isoDate).valueOf(),
        author: post.author || 'Devcon Team',
        description: post.content,
     }
    },
    formatTweet: (tweet: any): NewsItem => {
      return {
        title: tweet.id,
        url: `https://twitter.com/EFDevcon/status/${tweet.id}`,
        date: moment(tweet.created_at).valueOf(),
        author: '@EFDevcon',
        tweetID: tweet.id,
        description: tweet.text
      }
    }
  }

  return _interface;
})();

const twitter = (() => {
  // const twitterDir = path.resolve(newsDirectory, 'tweets');
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
  }

  return _interface;
})();

const blog = (() => {
  const _interface = {
    getPosts: async () => {
      const feed = await rssParser.parseURL('http://blog.ethereum.org/feed/category/devcon.xml');
  
      return feed.items;
    },
  }

  return _interface;
})();

const getNewsItems = async (lang: string) => {
  if (lang !== 'es') lang = 'en'

  const tweets = await twitter.getTweets(1379132185274384384);
  const tweetsFormatted = tweets.map(formatting.formatTweet);
  const blogs = await blog.getPosts();
  const blogsFormatted = blogs.map(formatting.formatBlogPost);

  const cmsPath = path.resolve(process.cwd(), 'src/content/news', lang)

  const newsFromCMS = fs.readdirSync(cmsPath).map((file: any)  => {
      const content = fs.readFileSync(path.join(cmsPath, file), 'utf8')

      if (!content) {
          console.log('File has no content..', file)
          return undefined
      }

      const doc = matter(content)
      const allTags = GetTags(lang)
      const tags: Array<string> = doc.data.tags ?? []

      return {
          ...doc.data,
          id: file.replace('.md', '').toLowerCase(),
          title: doc.data.title,
          date: moment(doc.data.date).valueOf(), //new Date(doc.data.date).getTime(),
          tags: tags.map(i => allTags.find(x => x.slug === i)).filter(i => !!i)
      } as NewsItem
  }).filter((i: any) => !!i) as Array<NewsItem>

  return [
    ...newsFromCMS,
    ...blogsFormatted,
    ...tweetsFormatted
  ].sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else if (a.date === b.date) {
        return 0
      } else {
        return -1
      }
  });
}

export default getNewsItems;