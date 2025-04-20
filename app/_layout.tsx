import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#000", // Keeps the header background black
            },
          }}
        >
        <Stack.Screen
          name="latestMovies"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Top Movies", 
          }}
        />
        <Stack.Screen
          name="upcomingMovies"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Upcoming Movies", 
          }}
        />

        <Stack.Screen
          name="tvSeries"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "TV Series", 
          }}
        />

        <Stack.Screen
          name="action"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Action Movies"
          }}
        />
        <Stack.Screen
          name="comedy"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Comedy", 
          }}
        />
        <Stack.Screen
          name="fantasy"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Fanstasy", 
          }}
        />
        <Stack.Screen
          name="sci-fi"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Sci-Fi", 
          }}
        />
        <Stack.Screen
          name="drama"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Drama", 
          }}
        />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
