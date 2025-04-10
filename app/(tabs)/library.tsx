import { View, Text } from 'react-native'

export default function library() {
  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b1b1b",
      }}>
      <Text>
        Hello Library
      </Text>
    </View>
  )
}
