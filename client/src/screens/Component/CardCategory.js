import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const CardDataCategory = ({ navigation, item }) => {
  const moveToDetails = () =>
    navigation.navigate('Detail', { id: item._id, typename: item.__typename });

  return (
    <TouchableOpacity style={styles.containerImage} onPress={moveToDetails}>
      <Image
        style={styles.image}
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
        }}
      />
      <Text style={{ textAlign: 'center' }}>{item.title}</Text>
      <Text style={{ textAlign: 'center' }}>Popularity: {item.popularity}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    // flex: 5,
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center',
    width: windowWidth,
    height: 400,
  },
  image: {
    width: 250,
    height: 350,
  },
});

export default CardDataCategory;
