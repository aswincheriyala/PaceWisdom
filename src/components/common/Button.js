import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Button = ({loading, onPress, title, backgroundColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    paddingHorizontal: 80,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    width: 100,
    textAlign: 'center',
  },
});

export default Button;
