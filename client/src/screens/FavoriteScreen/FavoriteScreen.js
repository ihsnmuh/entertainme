import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { favoritesVar } from '../../graphql/vars';
import { useReactiveVar } from '@apollo/client';
import CardData from '../Component/CardFavorite';

export default function FavoritesScreen({ navigation }) {
  const favorites = useReactiveVar(favoritesVar);

  console.log(favorites);
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
          Your Favorites
        </Text>
        {/* <Text>{JSON.stringify(favorites, null, 2)}</Text> */}
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <CardData navigation={navigation} item={item} key={favorites._id} />
          )}
          keyExtractor={(item) => item._id.toString()}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
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
