import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#000",
        },
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "green",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          title: "Flix Play",
          headerTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
          title: "Profile",
          headerTintColor: "white"
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
          title: "Library",
          headerTintColor: "white"
        }}
      />
      <Tabs.Screen
        name="shelf"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          title: "Shelf",
          headerTintColor: "white"
        }}
      />
    </Tabs>
  );
}
