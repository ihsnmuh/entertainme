const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
  type MovieEntertainme {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type SeriesEntertainme {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type allData {
    movies: [MovieEntertainme]
    tvSeries: [SeriesEntertainme]
  }

  extend type Query {
    entertainme: allData
  }
`;

const resolvers = {
  Query: {
    entertainme: async () => {
      try {
        const moviesCache = await redis.get('movies');
        const seriesCache = await redis.get('tvseries');

        console.log();

        if (!moviesCache && !seriesCache) {
          const movies = await axios({
            method: 'GET',
            // url: 'http://localhost:4001/movies',
            url: 'http://3.83.244.245:4001/movies',
          });

          const tvSeries = await axios({
            method: 'GET',
            // url: 'http://localhost:4002/tvseries',
            url: 'http://34.236.154.118:4002/tvseries',
          });

          await redis.set('movies', JSON.stringify(movies.data));
          await redis.set('tvseries', JSON.stringify(tvSeries.data));

          const allDataCache = {
            movies: JSON.parse(JSON.stringify(movies.data)),
            tvSeries: JSON.parse(JSON.stringify(tvSeries.data)),
          };
          return allDataCache;
        } else if (!moviesCache) {
          const movies = await axios({
            method: 'GET',
            // url: 'http://localhost:4001/movies',
            url: 'http://3.83.244.245:4001/movies',
          });

          await redis.set('movies', JSON.stringify(movies.data));

          console.log(movies.data, '<<<<<<<<<<< Movies');

          const allDataCache = {
            movies: JSON.parse(JSON.stringify(movies.data)),
            tvSeries: JSON.parse(seriesCache),
          };

          return allDataCache;
        } else if (!seriesCache) {
          const tvSeries = await axios({
            method: 'GET',
            // url: 'http://localhost:4002/tvseries',
            url: 'http://34.236.154.118:4002/tvseries',
          });

          await redis.set('tvseries', JSON.stringify(tvSeries.data));

          console.log(tvSeries.data, '<<<<<<<<<<< TV SERIES');

          const allDataCache = {
            movies: JSON.parse(moviesCache),
            tvSeries: JSON.parse(JSON.stringify(tvSeries.data)),
          };

          return allDataCache;
        } else {
          const movies = JSON.parse(moviesCache);
          const tvSeries = JSON.parse(seriesCache);

          const allDataCache = {
            movies: movies,
            tvSeries: tvSeries,
          };

          console.log(allDataCache);

          return allDataCache;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
