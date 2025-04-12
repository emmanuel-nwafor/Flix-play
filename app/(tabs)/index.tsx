import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import HeaderTitle from "../components/HeaderTitle";

export default function Index() {
  return (
    <ScrollView 
      style={{ backgroundColor: "#1b1b1b" }}
      horizontal // Enables horizontal scrolling
    >
      <SafeAreaView style={{ flex: 1, padding: 10 }}> {/* Reduced padding */}
        {/* Parent View with single row layout */}
        <View
          style={{
            flexDirection: "row", // horizontal layout
            justifyContent: "flex-start", // align items to the left
            gap: 8, // Reduced spacing between items
            overflow: "hidden", // prevents overflow of content
          }}
        >
          {["Drama", "K-Drama", "Anime", "Action", "Romance", "Sci-Fi", "Comedy", "Thriller", "Horror", "Mystery", "Fantasy", "Crime", "Adventure", "Family"].map((genre, index) => (
            <View
              key={index}
              style={{
                width: 100,
              }}
            >
              <TouchableOpacity 
                style={{
                  backgroundColor: "#333", // Optional: background for each button
                  padding: 10, // Optional: padding for better tap area
                  borderRadius: 100, // Optional: rounded corners
                }}
                onPress={() => {
                  // Handle press event here
                  console.log(`${genre} clicked`);
                }}
              >
                <HeaderTitle title={genre} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
