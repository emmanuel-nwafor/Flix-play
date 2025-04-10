import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: true,
      headerStyle: {
        backgroundColor: "#1b1b1b",
        shadowColor: "#1b1b1b"
      },
      tabBarStyle: {
        backgroundColor: "#1b1b1b",
        borderTopWidth: 0,
      }
    }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="shelf" />
    </Tabs>
    
  )
}
