import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const genreList = ["Home", "Western", "Movies", "Horror", "Fantasy"] as const;
type Genre = typeof genreList[number];

const genreIcons: Record<Genre, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Western: 'map',
  Movies: 'film',
  Horror: 'skull',
  Fantasy: 'planet',
};

interface Movie {
  title: string;
  imageUrl: string;
  duration: string;
}

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          params: {
            api_key: '7011b5acfc7ee4ea8bc216e0947cfe24',
            language: 'en-US',
            page: 1,
          },
        }
      );

      const topFive: Movie[] = response.data.results.slice(0, 5).map((movie: any) => ({
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        duration: '2hrs',
      }));

      setMovies(topFive);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
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
        <Ionicons name={genreIcons[item]} size={24} color="#fff" />
      </View>
      <Text style={{ color: '#fff' }}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMovie = ({ item }: { item: Movie }) => (
    <View
      style={{
        width: screenWidth * 0.7,
        marginRight: 15,
        borderRadius: 26,
        overflow: 'hidden',
        backgroundColor: '#1f2937',
      }}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '100%', height: 350 }}
        resizeMode="cover"
      />
      <View style={{ padding: 20, flex: 1, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>{item.duration}</Text>
      </View>
    </View>

    
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 20, paddingHorizontal: 15 }}>
      {/* Header */}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', margin: 15, flex: 1, alignItems: "center", justifyContent: "center" }}>
          Welcome To Flix Play <Ionicons name="pause" size={50} color="green" />
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

      {/* Latest Movies Section */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', margin: 15 }}>
        Latest Movies
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          horizontal
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMovie}
          showsHorizontalScrollIndicator={false}
          style={{ padding: 15 }}
        />
      )}
    </ScrollView>
  );
}
