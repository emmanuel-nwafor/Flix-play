import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const allMovies: any[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && page <= 5) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&language=en-US&page=${page}`
          );

          allMovies.push(...response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }

        setMovies(allMovies);
        setFilteredMovies(allMovies);
      } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredMovies(movies);
    } else {
      const lowerText = searchText.toLowerCase();
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerText)
      );
      setFilteredMovies(filtered);
    }
  }, [searchText, movies]);

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Top Movies</Text>
        <Text style={styles.subTitle}>Top big hits for you!</Text>

        <TextInput
          placeholder="Search upcoming movies..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchInput}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
          <Link href="/action" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Action</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/comedy" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Comedy</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/fantasy" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Fantasy</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/drama" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Drama</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/sci-fi" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Sci-Fi</Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>

      </View>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 30 }}>
              No upcoming movies found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default UpcomingMoviesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
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
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    width: '95%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
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
  genreScroll: {
    width: '100%',
    marginBottom: 15,
  },
  seriesSelectionBtn: {
    borderRadius: 100,
    backgroundColor: 'green',
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
