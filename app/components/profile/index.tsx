import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
    </View>
  );
};

export default ProfileScreen;
