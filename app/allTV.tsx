import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function All() {
  const [allTVSeries, setAllTVSeries] = useState<any[]>([]);
  const [filteredTVSeries, setFilteredTVSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllTVSeries = async () => {
      try {
        const allSeries: any[] = [];
        let page = 1;
        let totalPages = 1;

        // Fetching all TV series without genre filtering
        while (page <= totalPages && page <= 5) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=7011b5acfc7ee4ea8bc216e0947cfe24&language=en-US&page=${page}`
          );
          
          console.log('Fetched Data:', response.data); // Log the response data

          allSeries.push(...response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }

        setAllTVSeries(allSeries);
        setFilteredTVSeries(allSeries); // Initially, all TV series are displayed
      } catch (error) {
        console.error('Error fetching TV series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTVSeries();
  }, []);

  // This function updates the list based on the search query
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = allTVSeries.filter((series) =>
      series.name.toLowerCase().includes(text.toLowerCase()) // Matching titles
    );
    
    console.log('Filtered Data:', filtered); // Log the filtered data

    setFilteredTVSeries(filtered);
  };

  const renderTVSeriesItem = ({ item }: { item: any }) => (
    <View style={styles.tvSeriesCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.releaseDate}>First Aired: {item.first_air_date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search TV Series..."
        placeholderTextColor="#888"
        value={searchQuery}  // Keeps track of the search input
        onChangeText={handleSearch}  // Updates the filtered list as the text changes
      />

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={filteredTVSeries}  // Displays filtered list
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderTVSeriesItem}
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
  tvSeriesCard: {
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
