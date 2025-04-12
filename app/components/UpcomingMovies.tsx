// components/LatestMovie.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface UpcomingMovies {
  imageUrl: string; 
  title: string;  
  trailer: string;  
}

const UpcomingMovies: React.FC<UpcomingMovies> = ({ imageUrl, title, trailer }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />

      <View style={styles.contain}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{trailer}</Text>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    // padding: 10,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  duration: {
    color: 'gray',
    fontSize: 14,
  },
  contain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UpcomingMovies;
