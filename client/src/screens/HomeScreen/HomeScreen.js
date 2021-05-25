import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useQuery } from '@apollo/client';
import CardData from '../Component/Card';
import { GET_HOMEPAGE_DATA } from '../../graphql/queries';

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_HOMEPAGE_DATA, {
    fetchPolicy: 'network-only',
  });

  // data : { entertainme = {movies = {}, tvSeries = {}}} = []

  const moveToTVSeries = () => navigation.navigate('TvSeries');

  const moveToMovies = () => navigation.navigate('Movies');

  if (loading) return <Text>Loading... </Text>;
  if (error) return <Text>Server Error</Text>;

  return (
    <>
      <View style={styles.container}>
        <Text>Halaman HOME</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Movies</Text>
          <TouchableOpacity style={styles.button} onPress={moveToMovies}>
            <Text style={styles.buttonText}>All Movies</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>{JSON.stringify(data.entertainme.movies)}</Text> */}
        {/* <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            {data.entertainme.movies.map((data) => {
              return (
                <CardData navigation={navigation} data={data} key={data._id} />
              );
            })}
          </View>
        </ScrollView> */}
        <FlatList
          data={data.entertainme.movies}
          renderItem={({ item }) => (
            <CardData navigation={navigation} item={item} key={data._id} />
          )}
          keyExtractor={(item) => item._id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>TV Series</Text>
          <TouchableOpacity style={styles.button} onPress={moveToTVSeries}>
            <Text style={styles.buttonText}>All TV Series</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data.entertainme.tvSeries}
          renderItem={({ item }) => (
            <CardData navigation={navigation} item={item} key={data._id} />
          )}
          keyExtractor={(item) => item._id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <StatusBar style='auto' />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2978b5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 100,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
