import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const CardData = ({ navigation, item }) => {
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
      <Text
        style={{
          textAlign: 'center',
          fontSize: 13,
          width: 150,
          paddingVertical: 10,
          fontWeight: 'bold',
          backgroundColor: '#D6E0F0',
          color: 'black',
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        {item.title}
      </Text>
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
    width: 170,
    height: 250,
  },
  image: {
    width: 150,
    height: 225,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default CardData;
