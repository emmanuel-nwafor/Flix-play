import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24';
const BASE_URL = 'https://api.themoviedb.org/3';

const TvSeries = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredSeries, setFilteredSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        const allSeries: any[] = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && page <= 5) {
          const response = await axios.get(`${BASE_URL}/tv/popular`, {
            params: {
              api_key: API_KEY,
              language: 'en-US',
              page,
            },
          });

          const results = response.data?.results || [];
          allSeries.push(...results);
          totalPages = response.data?.total_pages || 1;
          page++;
        }

        setSeries(allSeries);
        setFilteredSeries(allSeries); // initialize filtered list
      } catch (error) {
        console.error('Failed to fetch TV series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVSeries();
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredSeries(series);
    } else {
      const lowerSearch = searchText.toLowerCase();
      const filtered = series.filter((item) =>
        item.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredSeries(filtered);
    }
  }, [searchText, series]);

  const renderSeriesItem = ({ item }: { item: any }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{item?.name}</Text>
        <Text style={styles.releaseDate}>First Air: {item?.first_air_date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Popular TV Series</Text>
        <Text style={styles.subTitle}>Binge-worthy shows to watch now</Text>

        <TextInput
          placeholder="Search TV series..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchInput}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
          <TouchableOpacity style={styles.seriesSelectionBtn}>
            <Text style={styles.text}>Action</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seriesSelectionBtn}>
            <Text style={styles.text}>Comedy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seriesSelectionBtn}>
            <Text style={styles.text}>Fantasy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seriesSelectionBtn}>
            <Text style={styles.text}>Drama</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={filteredSeries}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderSeriesItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 30 }}>
              No TV series found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default TvSeries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 10,
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
  },
  details: {
    padding: 8,
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
