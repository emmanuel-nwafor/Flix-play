import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

interface MediaItem {
  title?: string;
  imageUrl: string;
  duration?: string;
}

const screenWidth = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
  // State for movies, series, etc.
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MediaItem[]>([]);
  const [tvSeries, setTvSeries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State for carousel
  const [carouselMovies, setCarouselMovies] = useState<MediaItem[]>([]);
  const [carouselLoading, setCarouselLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList<MediaItem>>(null);
  const currentIndex = useRef<number>(0);

  const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24';
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  const router = useRouter();

  // Fetch data for existing sections
  const fetchData = async () => {
    try {
      const [popularMovies, upcomingMovies, popularSeries] = await Promise.all([
        axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        }),
        axios.get('https://api.themoviedb.org/3/movie/upcoming', {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        }),
        axios.get('https://api.themoviedb.org/3/tv/popular', {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        }),
      ]);

      const mapResults = (items: { title?: string; name?: string; poster_path: string }[]): MediaItem[] =>
        items.slice(0, 5).map((item) => ({
          title: item.title || item.name,
          imageUrl: `${BASE_IMAGE_URL}${item.poster_path}`,
          duration: '2hrs',
        }));

      setMovies(mapResults(popularMovies.data.results));
      setUpcomingMovies(mapResults(upcomingMovies.data.results));
      setTvSeries(mapResults(popularSeries.data.results));
    } catch (error) {
      console.error('Error fetching media data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data for carousel
  const fetchCarouselData = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
        params: { api_key: API_KEY, language: 'en-US' },
      });

      const items: MediaItem[] = response.data.results.slice(0, 10).map((item: { poster_path: string }) => ({
        imageUrl: `${BASE_IMAGE_URL}${item.poster_path}`,
      }));

      setCarouselMovies(items);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    } finally {
      setCarouselLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCarouselData();
  }, []);

  // Auto-scroll for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselMovies.length === 0) return;

      currentIndex.current = (currentIndex.current + 1) % carouselMovies.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselMovies]);

  const renderMovie = ({ item }: { item: MediaItem }) => (
    <View
      style={{
        width: screenWidth * 0.7,
        marginRight: 15,
        borderRadius: 26,
        overflow: 'hidden',
        backgroundColor: '#111',
      }}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '100%', height: 350 }}
        resizeMode="cover"
      />
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>{item.duration}</Text>
      </View>
    </View>
  );

  const renderCarouselImage = ({ item }: { item: MediaItem }) => (
    <View style={{ position: 'relative', width: screenWidth, height: 300 }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: screenWidth, height: 300 }}
        resizeMode="cover"
      />
      <View
        style={{
          position: 'absolute',
          top: 15,
          left: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          paddingVertical: 60,
          paddingHorizontal: 60,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '900',
            color: '#fff',
            textAlign: "center",
          }}
        >
          Welcome To Flix Play 🎬
        </Text>
      </View>
    </View>
  );

  const SectionHeader: React.FC<{ title: string; onSeeAll: () => void }> = ({ title, onSeeAll }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', margin: 15 }}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={{ fontSize: 15, color: 'green', margin: 15 }}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = (title: string, navigateTo: string, data: MediaItem[], isLoading: boolean) => (
    <>
      <SectionHeader title={title} onSeeAll={() => router.push(navigateTo)} />
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          horizontal
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderMovie}
          showsHorizontalScrollIndicator={false}
          style={{ padding: 15, marginBottom: 25 }}
        />
      )}
    </>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 15 }}>
      {/* Carousel Section */}
      {carouselLoading ? (
        <ActivityIndicator size="large" color="green" style={{ marginVertical: 20 }} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={carouselMovies}
          keyExtractor={(_, index) => `carousel-${index}`}
          renderItem={renderCarouselImage}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
        />
      )}

      {/* Sections */}
      {renderSection('Top Movies 📽', '/latestMovies', movies, loading)}
      {renderSection('TV Series 📺', '/tvSeries', tvSeries, loading)}
      {renderSection('Upcoming Movies 🎞', '/upcomingMovies', upcomingMovies, loading)}
    </ScrollView>
  );
};

export default HomeScreen;
