import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { favoritesVar } from '../../graphql/vars';
import { useReactiveVar } from '@apollo/client';

const windowWidth = Dimensions.get('window').width;

const CardDataCategory = ({ navigation, item }) => {
  const removeFavorite = () => {
    const favorites = favoritesVar();
    let filtered = favorites.filter((data) => data._id !== item._id);
    const newUpdate = [...filtered];
    favoritesVar(newUpdate);
    ToastAndroid.show(
      `${item.title} has been remove from favorites`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <View style={styles.containerImage}>
      <Image
        style={styles.image}
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          width: 250,
          paddingVertical: 10,
          fontWeight: 'bold',
          backgroundColor: '#D6E0F0',
          color: 'black',
        }}
      >
        {item.title}
      </Text>
      {/* <Text style={{ textAlign: 'center' }}>Popularity: {item.popularity}</Text> */}
      <TouchableOpacity style={styles.button} onPress={removeFavorite}>
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 10,
    // justifyContent: 'center',
    width: windowWidth,
    height: 450,
    // borderWidth: 2,
  },
  image: {
    width: 250,
    height: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: {
    backgroundColor: '#db0000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 250,
    // borderRadius: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    // marginTop: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CardDataCategory;
