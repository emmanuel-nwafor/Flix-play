import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderTitleProps {
  title: string;
  iconName?: string;  // `iconName` is optional, so it may or may not be passed
}

export default function HeaderTitle({ title, iconName }: HeaderTitleProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
      {/* Conditionally render the icon if iconName is passed */}
      {iconName && (
        <Ionicons
          name={iconName}
          size={20}
          color="green"
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
  );
}
