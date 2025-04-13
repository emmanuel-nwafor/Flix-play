import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

interface MovieDetails {
  title: string;
  imageUrl: string;
  description: string;
  releaseDate: string;
  runtime: string;
}

export default function MovieDetailsScreen({ params }: { params: { id: string } }) {
  const { id } = params; // Access the `id` from the route params
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '7011b5acfc7ee4ea8bc216e0947cfe24',
              language: 'en-US',
            },
          }
        );
        const movie = response.data;
        setMovieDetails({
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          releaseDate: movie.release_date,
          runtime: movie.runtime,
        });
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="green" />;
  }

  if (!movieDetails) {
    return <Text style={{ color: '#fff' }}>Movie details not available</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
      <Image source={{ uri: movieDetails.imageUrl }} style={{ width: '100%', height: 400 }} resizeMode="cover" />
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{movieDetails.title}</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Release Date: {movieDetails.releaseDate}</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Runtime: {movieDetails.runtime} mins</Text>
      <Text style={{ color: '#fff', fontSize: 16 }}>{movieDetails.description}</Text>
    </ScrollView>
  );
}
