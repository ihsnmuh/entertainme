import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://192.168.100.4:4000/', // Pakai IP Leptop sendiri
  cache: new InMemoryCache(),
});
