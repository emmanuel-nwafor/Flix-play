import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
        <>
         <ScrollView style={{
            backgroundColor: "#1b1b1b",
          }}>
          {/* <SafeAreaView> */}
            <View style={{ 
              justifyContent: "center", 
              alignItems: "center", 
              flex: 1,
             }}>
              <Text style={{ color: "white", fontSize: 40 }}>Home Screen </Text>
              <Text style={{ color: "white", fontSize: 40 }}>Home Screen </Text>
              <Text style={{ color: "white", fontSize: 40 }}>Home Screen </Text>
            </View>
          {/* </SafeAreaView> */}
         </ScrollView>
        </>
  );
}
