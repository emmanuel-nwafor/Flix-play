import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1b1b1b",
        }}>
          <Text style={{ color: "white" }}>Home Screen hio</Text>
        </View>
  );
}
