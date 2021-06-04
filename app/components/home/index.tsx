import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
