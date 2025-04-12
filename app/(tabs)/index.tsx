import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import HeaderTitle from "../components/HeaderTitle";
import ImageCarousel from "../components/ImageCarousel";

const image = [
  'https://via.placeholder.com/600x200?text=Image+1',
  'https://via.placeholder.com/600x200?text=Image+2',
  'https://via.placeholder.com/600x200?text=Image+3',
  'https://via.placeholder.com/600x200?text=Image+4',
];

export default function Index() {
  return (
    <ScrollView style={{ backgroundColor: "#1b1b1b" }} horizontal>
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            overflow: "hidden",
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
                  backgroundColor: "#333",
                  padding: 10, 
                  borderRadius: 100, 
                }}
                onPress={() => {
                  console.log(`${genre} clicked`);
                }}
              >
                <HeaderTitle title={genre} />
              </TouchableOpacity>
            </View>
          ))}
          <ImageCarousel images={image} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
