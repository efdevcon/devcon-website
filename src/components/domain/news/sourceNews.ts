// import { NewsItem } from 'src/types/NewsItem';
// date: Date
// author?: string
// url: string
// imageUrl?: string
// title: string
// description?: string
// tags?: string[]

// const sourceData = () => {

// }

// const NewsFactory = () => {
//   const api = {
//     fetchNews: () => {
//       async 
//     },
//     standardizeData: () => {

//     },
//     sortNews: () => {

//     },
//   }

//   return api;
// }


// const fetchNews = async () => {
//   const fetchBlog = async () => {
//     return fetch('localhost:4000/rss/categories/devcon.xml');
//   };
//   const fetchNews = async () => {
//     return fetch('localhost:4000/rss/categories/devcon.xml');
//   };

//   return Promise.all([])
// }

// const useNews = () => {
//   const [data, setData] = React.useState(null);

//   if (data === null) {
//     return <p>Loading</p>;
//   }
// }

/*
  Mount (load spinner)
  => 
  Source raw data
  => 
  Transform to standardized format
  => 
  Sort by date
  => 
  Remove load spinner

  Issues: Can't fetch paginated, because we can't request date ranges across 3 sources
  Solution: Add mongoDB layer 
*/