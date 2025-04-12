import { View, Text } from 'react-native'

export default function HeaderTitle( {title} ) {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Text style={{ color: "white", fontSize: 17 }}>
        {title}
      </Text>
    </View>
  )
}
