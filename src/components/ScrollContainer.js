import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

const ScrollContainer = ({children}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>{children}</View>
    </ScrollView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 30,
  },
});
