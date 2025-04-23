import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
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

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface SimilarMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
}

const DetailsScreen: React.FC = () => {
  const { id, type } = useLocalSearchParams<{ id: string; type: 'movie' | 'tv' }>();
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [similar, setSimilar] = useState<SimilarMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_KEY = '7011b5acfc7ee4ea8bc216e0947cfe24';
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
            params: { api_key: API_KEY, language: 'en-US' },
          }),
          axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
            params: { api_key: API_KEY, language: 'en-US' },
          }),
          axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
            params: { api_key: API_KEY, language: 'en-US' },
          }),
          axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar`, {
            params: { api_key: API_KEY, language: 'en-US' },
          }),
        ]);
        setDetails(detailsRes.data);
        setCast(creditsRes.data.cast);
        setCrew(creditsRes.data.crew);
        setVideos(videosRes.data.results);
        setSimilar(similarRes.data.results);
      } catch (error) {
        console.error('Error fetching all data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEverything();
  }, [id, type]);

  const openYouTube = (videoKey: string) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoKey}`);
  };

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

  const mainCrew = crew.filter(c => c.job === 'Director' || c.job === 'Producer').slice(0, 5);
  const trailers = videos.filter(v => v.type === 'Trailer' && v.site === 'YouTube').slice(0, 3);

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

        {/* 🎥 Trailers */}
        {trailers.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Trailers</Text>
            {trailers.map((video) => (
              <TouchableOpacity key={video.id} onPress={() => openYouTube(video.key)}>
                <Text style={styles.trailerLink}>▶ {video.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* 🎬 Crew */}
        {mainCrew.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Crew</Text>
            {mainCrew.map((member) => (
              <Text key={member.id} style={styles.crewText}>
                {member.name} – {member.job}
              </Text>
            ))}
          </>
        )}

        {/* 🎭 Cast */}
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

        {/* 🎬 Similar Shows */}
        {similar.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>Similar {type === 'movie' ? 'Movies' : 'TV Shows'}</Text>
            <FlatList
              data={similar.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.similarItem}>
                  {item.poster_path ? (
                    <Image
                      source={{ uri: `${BASE_IMAGE_URL}${item.poster_path}` }}
                      style={styles.similarImage}
                    />
                  ) : (
                    <View style={[styles.similarImage, { backgroundColor: '#333' }]} />
                  )}
                  <Text style={styles.similarTitle}>{item.title || item.name}</Text>
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
    backgroundColor: '#000' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000' 
},
  errorContainer: { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000' 
},
  errorText: { 
    color: '#fff', 
    fontSize: 18 
  },
  poster: { 
    width: '100%', 
    height: 400 
},
  content: { 
    padding: 15,
  },
  title: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 5 
},
  tagline: { 
    fontStyle: 'italic', 
    color: '#9ca3af', 
    marginBottom: 8 
},
  subtitle: {
     color: '#9ca3af', 
    fontSize: 16, 
    marginBottom: 10 
},
  genres: { 
    color: '#9ca3af', 
    fontSize: 14, 
    marginBottom: 15 
},
  overview: {
    color: '#fff', 
    fontSize: 16, 
    lineHeight: 24,
    marginBottom: 20 
    },
  sectionHeader: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 10 
},
  trailerLink: { 
    color: '#10b981', 
    fontSize: 16, 
    marginBottom: 10 
},
  crewText: { 
    color: '#9ca3af', 
    fontSize: 14 
  },
  castItem: { 
    marginRight: 12, 
    alignItems: 'center', 
    width: 100 
},
  castImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginBottom: 5 
},
  castName: { 
    color: '#fff', 
    fontSize: 12, 
    textAlign: 'center' 
  },
  castCharacter: { 
    color: '#9ca3af', 
    fontSize: 10, 
    textAlign: 'center' 
},
  similarItem: { 
    marginRight: 12, 
    alignItems: 'center',
    width: 100 
},
  similarImage: { 
    width: 100, 
    height: 150, 
    borderRadius: 8, marginBottom: 5 
},
  similarTitle: { 
    color: '#fff', 
    fontSize: 12, 
    textAlign: 'center' 
},
});

export default DetailsScreen;
