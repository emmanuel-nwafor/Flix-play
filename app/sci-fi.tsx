import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from 'react-native';
import axios from 'axios';

export default function ScifiMoviesPage() {
  const [scifiMovies, setScifiMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchScifiMovies = async () => {
      try {
        const allMovies: any[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && page <= 5) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&with_genres=878&language=en-US&page=${page}`
          );
          allMovies.push(...response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }

        setScifiMovies(allMovies);
        setFilteredMovies(allMovies);  // Initially, all movies are displayed
      } catch (error) {
        console.error('Error fetching Sci-Fi movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScifiMovies();
  }, []);

  // This function updates the list based on the search query
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = scifiMovies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase()) // Matching titles
    );
    setFilteredMovies(filtered);
  };

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
      <TextInput
        style={styles.searchInput}
        placeholder="Search Sci-Fi movies..."
        placeholderTextColor="#888"
        value={searchQuery}  // Keeps track of the search input
        onChangeText={handleSearch}  // Updates the filtered list as the text changes
      />

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={filteredMovies}  // Displays filtered list
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 30 }}>
              No Sci-Fi movies found.
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
  searchInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
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
