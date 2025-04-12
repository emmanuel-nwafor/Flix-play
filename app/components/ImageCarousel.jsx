import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: item }}
          style={{
            width: width - 40,
            height: 200,
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 40}
        layout={"default"}
      />
    </View>
  );
};

export default ImageCarousel;
