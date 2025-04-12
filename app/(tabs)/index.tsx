import { SafeAreaView, ScrollView, View, TouchableOpacity, Image, Dimensions } from "react-native";
import HeaderTitle from "../components/HeaderTitle";

const { width } = Dimensions.get('window');

const image = [
  'https://i.pinimg.com/236x/69/66/87/69668756a24d07355f402f7a3d53fc58.jpg',
  'https://via.placeholder.com/600x200?text=Image+2',
  'https://via.placeholder.com/600x200?text=Image+3',
  'https://via.placeholder.com/600x200?text=Image+4',
];

export default function Index() {
  return (
    <ScrollView style={{ backgroundColor: "#1b1b1b" }} horizontal showsHorizontalScrollIndicator={false}>
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {image.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{
                  width: width - 40,
                  height: 200,
                  borderRadius: 10,
                  resizeMode: 'cover',
                  marginRight: 10,
                }}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
