// components/LatestMovie.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface LatestMovieProps {
  imageUrl: string; 
  title: string;  
  duration: string;  
}

const LatestMovie: React.FC<LatestMovieProps> = ({ imageUrl, title, duration }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />

      <View style={styles.contain}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
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
    fontSize: 18,
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

export default LatestMovie;
