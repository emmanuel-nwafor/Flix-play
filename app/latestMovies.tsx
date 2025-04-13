import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const LatestMoviesPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLatestMovies = async () => {
      try {
        const allMovies: any[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&language=en-US&page=${page}`
          );

          allMovies.push(...response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }

        setMovies(allMovies);
      } catch (error) {
        console.error('Failed to fetch latest movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLatestMovies();
  }, []);

  const renderMovieItem = ({ item }: { item: any }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Latest Movie Releases</Text>
        <Text style={styles.subTitle}>Catch up with the newest blockbusters!</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </SafeAreaView>
  );
};

export default LatestMoviesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  // Header style
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#aaa',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  movieCard: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 10,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
  },
});
