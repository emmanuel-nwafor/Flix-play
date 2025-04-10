import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
        <>
         <ScrollView>
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1b1b1b",
          }}>
            <Text style={{ color: "white" }}>Home Screen hio</Text>
          </View>
         </ScrollView>
        </>
  );
}
