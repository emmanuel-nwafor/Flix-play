import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  tagline?: string;
  runtime?: number;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const DetailsScreen: React.FC = () => {
  const { id, type } = useLocalSearchParams<{ id: string; type: 'movie' | 'tv' }>();
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24';
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
            params: { api_key: API_KEY, language: 'en-US' },
          }),
          axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
            params: { api_key: API_KEY, language: 'en-US' },
          }),
        ]);
        setDetails(detailsRes.data);
        setCast(creditsRes.data.cast);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id, type]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${details.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{details.title || details.name}</Text>
        {details.tagline ? <Text style={styles.tagline}>"{details.tagline}"</Text> : null}
        <Text style={styles.subtitle}>
          {details.release_date || details.first_air_date} • {details.vote_average.toFixed(1)}/10
        </Text>
        <Text style={styles.genres}>{details.genres.map((g) => g.name).join(', ')}</Text>
        <Text style={styles.overview}>{details.overview}</Text>

        {/* Cast Section */}
        {cast.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Top Cast</Text>
            <FlatList
              data={cast.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.castItem}>
                  {item.profile_path ? (
                    <Image
                      source={{ uri: `${BASE_IMAGE_URL}${item.profile_path}` }}
                      style={styles.castImage}
                    />
                  ) : (
                    <View style={[styles.castImage, { backgroundColor: '#333' }]} />
                  )}
                  <Text style={styles.castName}>{item.name}</Text>
                  <Text style={styles.castCharacter}>{item.character}</Text>
                </View>
              )}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
  poster: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagline: {
    fontStyle: 'italic',
    color: '#9ca3af',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 16,
    marginBottom: 10,
  },
  genres: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 15,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  castItem: {
    marginRight: 12,
    alignItems: 'center',
    width: 100,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  castName: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  castCharacter: {
    color: '#9ca3af',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default DetailsScreen;
