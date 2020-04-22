import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';
import {onChangeText} from '../../redux/actions/UserActions';
const Camera = ({navigation, setImage}) => {
  const takePicture = async (camera) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    setImage('photo', data.uri, () => {
      navigation.goBack();
    });
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={
          RNCamera.Constants.Type.front
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') {
            return <View />;
          }
          return (
            <TouchableOpacity
              onPress={() => takePicture(camera)}
              style={styles.capture}>
              <Text>SNAP</Text>
            </TouchableOpacity>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default connect(null, {
  setImage: onChangeText,
})(Camera);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    height: 60,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    elevation: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 50,
  },
});
