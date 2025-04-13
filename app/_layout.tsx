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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="latestMovies"
          options={{
            headerShown: true,
            headerTintColor: "#ff6347", // Changes the header text color to Tomato
            title: "Top Movies Now", // Custom title for the screen
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
