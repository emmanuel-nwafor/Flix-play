import { View, Text } from 'react-native'

export default function me() {
  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b1b1b",
      }}>
      <Text>
        Hello Me
      </Text>
    </View>
  )
}
