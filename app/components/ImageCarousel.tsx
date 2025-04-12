import React from "react";
import { View, FlatList, Image, Dimensions, StyleSheet, Text } from "react-native";

const { width } = Dimensions.get("window");

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const renderItem = ({ item }: { item: string }) => {
    // Debugging: Check if item is valid
    console.log("Rendering image:", item);
    
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  // Debugging: Check if images are passed correctly
  console.log("Images:", images);

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10, // Add spacing between images
  },
  image: {
    width: width - 40, // Adjust width
    height: 200, // Adjust height
    borderRadius: 10,
    resizeMode: "cover",
  },
});

export default ImageCarousel;
