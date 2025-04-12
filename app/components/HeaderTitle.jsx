import { View, Text } from 'react-native'

export default function HeaderTitle( {title} ) {
  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 6 }}>
      <Text style={{ color: "white", fontSize: 17 }}>
        {title}
      </Text>
    </View>
  )
}
