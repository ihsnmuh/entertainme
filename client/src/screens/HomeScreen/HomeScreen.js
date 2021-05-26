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
  Dimensions,
} from 'react-native';
import { useQuery } from '@apollo/client';
import CardData from '../Component/Card';
import { GET_HOMEPAGE_DATA } from '../../graphql/queries';

const windowWidth = Dimensions.get('window').width;

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
        {/* <Text>Halaman HOME</Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            width: windowWidth,
            marginBottom: 10,
            borderBottomWidth: 3,
            borderBottomColor: '#db0000',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginVertical: 10,
              marginRight: 20,
              marginHorizontal: 20,
              color: '#fff',
            }}
          >
            Movies
          </Text>
          <TouchableOpacity style={styles.button} onPress={moveToMovies}>
            <Text style={styles.buttonText}>List Movies</Text>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            width: windowWidth,
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 3,
            borderBottomColor: '#db0000',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginVertical: 10,
              marginHorizontal: 20,
              color: '#fff',
            }}
          >
            Series
          </Text>
          <TouchableOpacity style={styles.button} onPress={moveToTVSeries}>
            <Text style={styles.buttonText}>List Series</Text>
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
          style={styles.buttonLogout}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.buttonLogoutText}>Back</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 150,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#db0000',
    fontWeight: 'bold',
  },
  buttonLogout: {
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: windowWidth,
    // borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonLogoutText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});
