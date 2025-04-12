import { SafeAreaView, ScrollView, Text, View } from "react-native";
import HeaderTitle from "../components/HeaderTitle";

export default function Index() {
  return (
    <ScrollView style={{ backgroundColor: "#1b1b1b" }}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        {/* Parent View is now a grid */}
        <View
          style={{
            flexDirection: "row", // horizontal layout
            flexWrap: "wrap", // allows the items to wrap onto new lines
            gap: 12, // adds spacing between items
            justifyContent: "space-between", // distribute items evenly
          }}
        >
          <HeaderTitle title="Drama" />
          <HeaderTitle title="K-Drama" />
          <HeaderTitle title="Anime" />
          <HeaderTitle title="Action" />
          <HeaderTitle title="Romance" />
          <HeaderTitle title="Sci-Fi" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
