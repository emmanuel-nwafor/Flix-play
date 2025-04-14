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
            headerTintColor: "#fff", // Changes the header text color to Tomato
            title: "Top Movies", // Custom title for the screen
          }}
        />
        <Stack.Screen
          name="upcomingMovies"
          options={{
            headerShown: true,
            headerTintColor: "#fff", // Changes the header text color to Tomato
            title: "Upcoming Movies", // Custom title for the screen
          }}
        />

        <Stack.Screen
          name="tvSeries"
          options={{
            headerShown: true,
            headerTintColor: "#fff", // Changes the header text color to Tomato
            title: "TV Series", // Custom title for the screen
          }}
        />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
