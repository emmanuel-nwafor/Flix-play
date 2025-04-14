import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

export default function ActionMoviesPage() {
  const [actionMovies, setActionMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionMovies = async () => {
      try {
        const allMovies: any[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && page <= 5) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&with_genres=28&language=en-US&page=${page}`
          );
          allMovies.push(...response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }

        setActionMovies(allMovies);
      } catch (error) {
        console.error('Error fetching action movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActionMovies();
  }, []);

  const renderMovieItem = ({ item }: { item: any }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.releaseDate}>Release: {item.release_date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.heading}>Action Movies</Text> */}

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={actionMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 30 }}>
              No action movies found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  movieCard: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 26,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  releaseDate: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
  },
});
