import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MOVIES_DATA } from '../../graphql/queries';
import CardDataCategory from '../Component/CardCategory';

const windowWidth = Dimensions.get('window').width;

export default function MoviesScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_MOVIES_DATA);

  if (loading) return <Text>Loading... </Text>;
  if (error) return <Text>Server Error</Text>;

  // console.log(data);
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginVertical: 20,
            borderBottomWidth: 3,
            borderBottomColor: '#db0000',
          }}
        >
          List Movies
        </Text>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        <FlatList
          data={data.movies}
          renderItem={({ item }) => (
            <CardDataCategory
              navigation={navigation}
              item={item}
              key={data._id}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
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
    justifyContent: 'center',
  },
});
