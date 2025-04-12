import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#1b1b1b",
          shadowColor: "#1b1b1b",
        },
        tabBarStyle: {
          backgroundColor: "#1b1b1b",
          borderTopWidth: 0,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
          title: "Library",
        }}
      />
      <Tabs.Screen
        name="shelf"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          title: "Shelf",
        }}
      />
    </Tabs>
  );
}
