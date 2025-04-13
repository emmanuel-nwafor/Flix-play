import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";
import HeaderTitle from "../components/HeaderTitle";
import LatestMovie from "../components/LatestMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";  // Import Ionicons (or your preferred icon library)

export default function Index() {
  // Define a mapping for genres to icons
  const genreIcons: { [key: string]: string } = {
    Home: "home",
    Western: "map",
    Movies: "film",
    Horror: "skull",
    Fantasy: "planet",
  };

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View>
          <Text
            style={{
              color: "white",
              margin: 10,
              marginBottom: 20,
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            Discover Your Next Favourite Movie 🎞
          </Text>
        </View>

        <View style={styles.genreContainer}>
          {["Home", "Western", "Movies", "Horror", "Fantasy"].map((genre, index) => (
            <View key={index} style={styles.genreButtonContainer}>
              <TouchableOpacity
                style={styles.genreButton}
                onPress={() => {
                  console.log(`${genre} clicked`);
                }}
              >
                <HeaderTitle title={genre} iconName={genreIcons[genre]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Horizontal scroll of Latest Movies */}
        <View style={styles.moviesSectionContainer}>
          <View style={styles.minicontainer}>
            <Text style={styles.sectionTitle}>Latest Movies</Text>
            <Link style={{ color: "green", fontSize: 17 }} href={"/screens/latestMovies"}>
              See all
            </Link>
          </View>          
          
          <FlatList
            data={[
              { imageUrl: "https://i.pinimg.com/474x/ae/3d/dd/ae3dddf605a6113b4dc7dc7b3826e931.jpg", title: "Deadpool and Wolverine", duration: "2hrs 10mins" },
              { imageUrl: "https://i.pinimg.com/474x/6f/56/8f/6f568fa303de3dff2b710021f8a1d3e5.jpg", title: "Avatar The Last Airbender", duration: "2hrs" },
              { imageUrl: "https://i.pinimg.com/236x/c9/ac/f9/c9acf90a10bdc3566cd5f744caf5a56f.jpg", title: "School for Good and Evil", duration: "2hrs" },
              { imageUrl: "https://i.pinimg.com/474x/1a/12/e4/1a12e43e9f2083ffca2174bdaeaa2968.jpg", title: "Dune", duration: "2hrs" },
              { imageUrl: "https://i.pinimg.com/474x/8c/f1/1b/8cf11b0531c0e45746302a14c34f38bb.jpg", title: "Joker", duration: "2hrs" },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <LatestMovie imageUrl={item.imageUrl} title={item.title} duration={item.duration} />
            )}
          />
        </View>

        {/* Horizontal scroll of Upcoming Movies */}
        <View style={styles.moviesSectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Movies</Text>
          <FlatList
            data={[
              { imageUrl: "https://i.pinimg.com/236x/2d/e1/b0/2de1b074f4ae8051ab2b9dfbfc5ed907.jpg", title: "Thunderbolts", trailer: "2hrs 10mins" },
              { imageUrl: "https://i.pinimg.com/474x/60/34/63/603463d250bb2567f202279357746547.jpg", title: "Jolt", trailer: "2hrs" },
              { imageUrl: "https://i.pinimg.com/474x/fc/0f/7d/fc0f7dba4eaafacdd3d8558b0047128e.jpg", title: "Love Hurts", trailer: "2hrs" },
              { imageUrl: "https://i.pinimg.com/474x/44/36/b2/4436b293af487f044b6aa1321381774c.jpg", title: "Superman", trailer: "2hrs" },
              { imageUrl: "https://i.pinimg.com/474x/e8/98/0a/e8980a942e6108f11f8f89db2100122d.jpg", title: "Gladiator 2", trailer: "2hrs" },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <UpcomingMovies imageUrl={item.imageUrl} title={item.title} trailer={item.trailer} />
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  genreContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    overflow: "hidden",
  },
  genreButtonContainer: {
    width: 100,
  },
  genreButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 100,
    margin: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  moviesSectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "white",
    fontWeight: "bold",
    margin: 10,
    fontSize: 28,
  },
  minicontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
