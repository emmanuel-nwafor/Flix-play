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
          name="anime"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Anime & Cartoons", 
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
        {/* SERIES SECTION */}
        <Stack.Screen
          name="anime&cartoonTV"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Anime & Cartoon Series", 
          }}
        />
        <Stack.Screen
          name="allTV"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "All Series", 
          }}
        />
        <Stack.Screen
          name="comedyTV"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Comedy Series", 
          }}
        />
        {/* MOVIE DETAILS */}
        <Stack.Screen
          name="detailsScreen"
          options={{
            headerShown: true,
            headerTintColor: "#fff", 
            title: "Details", 
          }}
        />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
