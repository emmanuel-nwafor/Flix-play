import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const genreList = ['Home', 'Western', 'Movies', 'Horror', 'Fantasy'] as const;
type Genre = typeof genreList[number];

const genreIcons: Record<Genre, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Western: 'map',
  Movies: 'film',
  Horror: 'skull',
  Fantasy: 'planet',
};

interface MediaItem {
  title: string;
  imageUrl: string;
  duration: string;
}

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MediaItem[]>([]);
  const [tvSeries, setTvSeries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24';
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

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

      const mapResults = (items: any[]): MediaItem[] =>
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

  useEffect(() => {
    fetchData();
  }, []);

  const renderGenre = ({ item }: { item: Genre }) => (
    <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10 }}>
      <View
        style={{
          backgroundColor: '#111827',
          borderRadius: 20,
          padding: 20,
          marginBottom: 5,
        }}
      >
        <Ionicons name={genreIcons[item]} size={24} color="green" />
      </View>
      <Text style={{ color: '#fff' }}>{item}</Text>
    </TouchableOpacity>
  );

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
        <Text
          style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>{item.duration}</Text>
      </View>
    </View>
  );

  const SectionHeader = ({ title, link }: { title: string; link: string }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          margin: 15,
        }}
      >
        {title}
      </Text>
      <Link href={link} style={{ fontSize: 15, color: 'green', margin: 15 }}>
        See all
      </Link>
    </View>
  );

  const renderSection = (
    title: string,
    link: string,
    data: MediaItem[],
    isLoading: boolean
  ) => (
    <>
      <SectionHeader title={title} link={link} />
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMovie}
          showsHorizontalScrollIndicator={false}
          style={{ padding: 15, marginBottom: 25 }}
        />
      )}
    </>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 15 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
            margin: 15,
            flex: 1,
          }}
        >
          Welcome To Flix Play 🎬
        </Text>
      </View>

      {/* Genre Section */}
      <View style={{ marginBottom: 30 }}>
        <FlatList
          horizontal
          data={genreList}
          keyExtractor={(item) => item}
          renderItem={renderGenre}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Sections */}
      {renderSection('Top Movies 📽', './latestMovies', movies, loading)}
      {renderSection('TV Series 📺', './tvSeries', tvSeries, loading)}
      {renderSection('Upcoming Movies 🎞', './upcomingMovies', upcomingMovies, loading)}
    </ScrollView>
  );
}
