import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

interface MediaItem {
  id: number;
  title?: string;
  imageUrl: string;
  duration?: string;
  mediaType: 'movie' | 'tv';
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

      const mapResults = (items: { id: number; title?: string; name?: string; poster_path: string }[], mediaType: 'movie' | 'tv'): MediaItem[] =>
        items.slice(0, 5).map((item) => ({
          id: item.id,
          title: item.title || item.name,
          imageUrl: `${BASE_IMAGE_URL}${item.poster_path}`,
          duration: '2hrs',
          mediaType,
        }));

      setMovies(mapResults(popularMovies.data.results, 'movie'));
      setUpcomingMovies(mapResults(upcomingMovies.data.results, 'movie'));
      setTvSeries(mapResults(popularSeries.data.results, 'tv'));
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

      const items: MediaItem[] = response.data.results.slice(0, 10).map((item: { id: number; poster_path: string }) => ({
        id: item.id,
        imageUrl: `${BASE_IMAGE_URL}${item.poster_path}`,
        mediaType: 'movie',
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

  const navigateToDetails = (id: number, mediaType: 'movie' | 'tv') => {
    router.push(`/details/${id}?type=${mediaType}`);
  };

  const renderMovie = ({ item }: { item: MediaItem }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item.id, item.mediaType)}>
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
    </TouchableOpacity>
  );

  const renderCarouselImage = ({ item }: { item: MediaItem }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item.id, item.mediaType)}>
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
              textAlign: 'center',
            }}
          >
            Welcome To Flix Play 🎬
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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

/*
 * Suggested Details Page Setup (create in app/details/[id].tsx):
 *
 * import { useLocalSearchParams, useRouter } from 'expo-router';
 * import { View, Text, Image, ActivityIndicator } from 'react-native';
 * import axios from 'axios';
 * import { useEffect, useState } from 'react';
 *
 * const DetailsScreen: React.FC = () => {
 *   const { id, type } = useLocalSearchParams<{ id: string; type: 'movie' | 'tv' }>();
 *   const [details, setDetails] = useState<any>(null);
 *   const [loading, setLoading] = useState<boolean>(true);
 *
 *   const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24';
 *   const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
 *
 *   useEffect(() => {
 *     const fetchDetails = async () => {
 *       try {
 *         const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
 *           params: { api_key: API_KEY, language: 'en-US' },
 *         });
 *         setDetails(response.data);
 *       } catch (error) {
 *         console.error('Error fetching details:', error);
 *       } finally {
 *         setLoading(false);
 *       }
 *     };
 *     fetchDetails();
 *   }, [id, type]);
 *
 *   if (loading) return <ActivityIndicator size="large" color="green" />;
 *   if (!details) return <Text style={{ color: '#fff' }}>Error loading details</Text>;
 *
 *   return (
 *     <View style={{ flex: 1, backgroundColor: '#000', padding: 15 }}>
 *       <Image source={{ uri: `${BASE_IMAGE_URL}${details.poster_path}` }} style={{ width: '100%', height: 400 }} />
 *       <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{details.title || details.name}</Text>
 *       <Text style={{ color: '#fff' }}>{details.overview}</Text>
 *       <Text style={{ color: '#fff' }}>Release: {details.release_date || details.first_air_date}</Text>
 *       <Text style={{ color: '#fff' }}>Rating: {details.vote_average}/10</Text>
 *     </View>
 *   );
 * };
 *
 * export default DetailsScreen;
 *
 * Ensure your app/_layout.tsx includes a dynamic route for details, e.g.:
 * import { Stack } from 'expo-router';
 * export default function Layout() {
 *   return (
 *     <Stack>
 *       <Stack.Screen name="index" options={{ title: 'Home' }} />
 *       <Stack.Screen name="details/[id]" options={{ title: 'Details' }} />
 *       <Stack.Screen name="latestMovies" />
 *       <Stack.Screen name="tvSeries" />
 *       <Stack.Screen name="upcomingMovies" />
 *     </Stack>
 *   );
 * }
 */

export default HomeScreen;
