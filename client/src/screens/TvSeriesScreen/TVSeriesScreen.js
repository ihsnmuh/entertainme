import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_SERIES_DATA } from '../../graphql/queries';
import CardDataCategory from '../Component/CardCategory';
import LoadingScreen from '../LoadingScreen';

export default function TVSeriesScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_SERIES_DATA);

  if (loading) return <LoadingScreen />;
  if (error) return <Text>Server Error</Text>;

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
          List Series
        </Text>
        <FlatList
          data={data.tvSeries}
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
