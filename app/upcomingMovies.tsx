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
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

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

        const today = new Date();

        while (page <= totalPages) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&language=en-US&page=${page}`
          );

          const futureMovies = response.data.results.filter((movie: any) => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate > today;
          });

          allMovies.push(...futureMovies);
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
        <Text style={styles.pageTitle}>Upcoming Movies</Text>
        <Text style={styles.subTitle}>Get ready for the next big hits!</Text>

        <TextInput
          placeholder="Search upcoming movies..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchInput}
        />
      </View>

      {/* Genre Selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreScroll}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {['Action', 'Comedy', 'Fantasy', 'Drama', 'Sci-Fi'].map((genre) => (
          <TouchableOpacity
            key={genre}
            style={styles.seriesSelectionBtn}
            activeOpacity={0.7}
            onPress={() => {
              // Handle genre selection (optional future feature)
              console.log(`Selected genre: ${genre}`);
            }}
          >
            <Text style={styles.text}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Movie List */}
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={screenWidth > 600 ? 3 : 2}
          columnWrapperStyle={styles.row}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 30 }}>
              No movies found matching your search.
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
    width: screenWidth > 600 ? '30%' : '48%',
    backgroundColor: '#111',
    borderRadius: 26,
    overflow: 'hidden',
    marginBottom: 15,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  seriesSelectionBtn: {
    borderRadius: 100,
    backgroundColor: 'green',
    marginRight: 10,
    marginBottom: 10,
    padding: 20
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
