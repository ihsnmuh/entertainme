const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
  type MovieEntertaime {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type SeriesEntertaime {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type allData {
    movies: [MovieEntertaime]
    tvSeries: [SeriesEntertaime]
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

        if (!moviesCache && !seriesCache) {
          const movies = await axios({
            method: 'GET',
            url: 'http://localhost:4001/movies',
          });

          const tvSeries = await axios({
            method: 'GET',
            url: 'http://localhost:4002/tvseries',
          });

          await redis.set('movies', JSON.stringify(movies.data));
          await redis.set('tvseries', JSON.stringify(tvSeries.data));

          const allDataCache = {
            movies: JSON.parse(movies.data),
            tvSeries: JSON.parse(tvSeries.data),
          };
          return allDataCache;
        } else if (!moviesCache) {
          const movies = await axios({
            method: 'GET',
            url: 'http://localhost:4001/movies',
          });

          await redis.set('movies', JSON.stringify(movies.data));

          const allDataCache = {
            movies: JSON.parse(movies.data),
            tvSeries: JSON.parse(seriesCache),
          };

          return allDataCache;
        } else if (!seriesCache) {
          const tvSeries = await axios({
            method: 'GET',
            url: 'http://localhost:4002/tvseries',
          });

          await redis.set('tvseries', JSON.stringify(tvSeries.data));

          const allDataCache = {
            movies: JSON.parse(moviesCache),
            tvSeries: JSON.parse(tvSeries.data),
          };

          return allDataCache;
        } else {

          const movies = JSON.parse(moviesCache)
          const tvSeries = JSON.parse(seriesCache)

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
