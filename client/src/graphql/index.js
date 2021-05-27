import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // uri: 'http://192.168.100.4:4000/', // Pakai IP Leptop sendiri
  uri: 'http://3.91.39.46:4000/', // Pakai IP dari AWS
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          movies: {
            merge(_, incoming) {
              return incoming;
            },
          },
          tvSeries: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
