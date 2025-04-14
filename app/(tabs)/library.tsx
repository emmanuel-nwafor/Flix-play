import { View, Text, ScrollView } from 'react-native'

export default function library() {
  return (
    <ScrollView style={{
        flex: 1,

        backgroundColor: "#000",
      }}>
      <View style={{ 
         justifyContent: "center",
        alignItems: "center",
       }}>
        <View style={{ backgroundColor: "green", padding: 30 }}>
          <Text>View 1</Text>
        </View>
        <View style={{ backgroundColor: "green", padding: 30 }}>
          <Text>View 2</Text>
        </View>
        <View style={{ backgroundColor: "green", padding: 30 }}>
          <Text>View 3</Text>
        </View>
        <View style={{ backgroundColor: "green", padding: 30 }}>
          <Text>View 4</Text>
        </View>
      </View>
    </ScrollView>
  )
}
