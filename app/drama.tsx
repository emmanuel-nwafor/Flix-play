import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

export default function drama() {
  return (
    <View style={style.container}>
        <Text style={{ fontSize: 40, color: "white" }}>
            Hello Drama Movies
        </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#000"
  }
})