import { View, Text, ScrollView } from 'react-native'

export default function tvSeries() {
  return (
    <ScrollView>
        <View style={{ flex: 1,  }}>
            <Text style={{ fontSize: 30, color: "white", backgroundColor: "black" }}>
                Hello TV Series
            </Text>
        </View>
    </ScrollView>
  )
}
