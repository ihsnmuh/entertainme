const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  # Output yang diinginkan dari data balikannya
  extend type Query {
    # Query Tv Series
    tvSeries: [Series]
    serie(_id: ID): [Series]
  }

  input NewTvSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    # Mutation tvSeries
    addTvSeries(newTvSeries: NewTvSeries): Series
    updateTvSeries(_id: ID, updateTvSeries: NewTvSeries): Series
    deleteTvSeries(_id: ID): Series
  }
`;

const resolvers = {
  Query: {
    // Query untuk Movies
    tvSeries: async () => {
      try {
        const seriesCache = await redis.get('tvseries');

        if (!seriesCache) {
          console.log('dari Server');
          const { data } = await axios({
            method: 'GET',
            // url: 'http://localhost:4002/tvseries',
            url: 'http://34.236.154.118:4002/tvseries',
          });
          await redis.set('tvseries', JSON.stringify(data));
          return data;
        } else {
          const data = JSON.parse(seriesCache);
          console.log('dari Cache');
          return data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    // berdasarakan params yang di ambil
    serie: (parent, args, context, info) => {
      const { _id } = args;
      // console.log(args);
      return axios({
        method: 'GET',
        // url: 'http://localhost:4002/tvseries/' + _id,
        url: 'http://34.236.154.118:4002/tvseries/' + _id,
      })
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
  },
  Mutation: {
    // Mutation TV SERIES
    addTvSeries: (_, args) => {
      const newSeries = {
        title: args.newTvSeries.title,
        overview: args.newTvSeries.overview,
        poster_path: args.newTvSeries.poster_path,
        popularity: args.newTvSeries.popularity,
        tags: args.newTvSeries.tags,
      };

      return axios({
        method: 'POST',
        // url: 'http://localhost:4002/tvseries',
        url: 'http://34.236.154.118:4002/tvseries',
        data: newSeries,
      })
        .then(({ data }) => {
          redis.del('tvseries');
          console.log(data);
          return data.ops[0];
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },

    updateTvSeries: (_, args) => {
      const { _id } = args;

      const updateTvSeries = {
        title: args.updateTvSeries.title,
        overview: args.updateTvSeries.overview,
        poster_path: args.updateTvSeries.poster_path,
        popularity: args.updateTvSeries.popularity,
        tags: args.updateTvSeries.tags,
      };

      return axios({
        method: 'PUT',
        // url: 'http://localhost:4002/tvseries/' + `${_id}`,
        url: 'http://34.236.154.118:4002/tvseries/' + `${_id}`,
        data: updateTvSeries,
      })
        .then(({ data }) => {
          redis.del('tvseries');
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          return err;
        });
    },

    deleteTvSeries: (_, args) => {
      const { _id } = args;

      return axios({
        method: 'DELETE',
        // url: 'http://localhost:4002/tvseries/' + `${_id}`,
        url: 'http://34.236.154.118:4002/tvseries/' + `${_id}`,
      })
        .then(({ data }) => {
          redis.del('tvseries');
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          return err;
        });
    },
  },
};

module.exports = { typeDefs, resolvers };
