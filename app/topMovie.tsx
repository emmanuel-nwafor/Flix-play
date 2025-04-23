import React, { useEffect, useState } from 'react';
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const cardMargin = 10;
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

export default function TopMoviesPage() {
  const [topMovies, setTopMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const allMovies: any[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && page <= 5) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&language=en-US&page=${page}`
          );
          allMovies.push(...response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }

        setTopMovies(allMovies);
        setFilteredMovies(allMovies);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = topMovies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleNavigate = (id: number) => {
    router.push({
      pathname: '/detailsScreen',
      params: { id: id.toString(), type: 'movie' },
    });
  };

  const renderMovieItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleNavigate(item.id)}
      style={styles.movieCard}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={styles.movieTitle}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search top rated movies..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={handleSearch}
      />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
          <Link href="/action" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Action</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/fantasy" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Fantasy</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/anime" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Anime & Cartoon</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/sci-fi" asChild>
            <TouchableOpacity style={styles.seriesSelectionBtn}>
              <Text style={styles.text}>Sci-Fi</Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: cardMargin,
  },
  searchInput: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    marginVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  movieCard: {
    width: cardWidth,
    backgroundColor: '#111',
    marginBottom: cardMargin,
    borderRadius: 16,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  movieTitle: {
    color: '#fff',
    padding: 10,
    fontSize: 14,
    fontWeight: '600',
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
