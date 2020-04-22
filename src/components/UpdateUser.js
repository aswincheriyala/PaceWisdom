import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {connect} from 'react-redux';

import MapView, {Marker} from 'react-native-maps';
import {
  addUser,
  setLocation,
  setUserDetails,
  deleteUserDetail,
  clearUserFileds,
  onChangeText,
} from '../redux/actions/UserActions';
import ScrollContainer from './common/ScrollContainer';
import Button from './common/Button';

class AddUser extends Component {
  constructor(props) {
    super(props);
    const title = props.route.params.title;
    props.navigation.setOptions({title});
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    const {setLocationData, route, setUserData} = this.props;
    const index = route.params.index;
    if (index) {
      setUserData(index);
    } else {
      setLocationData();
    }
  }

  componentWillUnmount() {
    const {clearUser} = this.props;
    clearUser();
  }
  save() {
    const {saveUser, navigation} = this.props;
    saveUser(() => {
      navigation.goBack();
    });
  }
  delete() {
    const {deleteUser, navigation, route} = this.props;
    const index = route.params.index;
    deleteUser(index, () => {
      navigation.goBack();
    });
  }

  renderInputs(title, field, keyboardType, multiline) {
    const {newFields, onChangeValue, error, route} = this.props;
    const index = route.params.index;
    return (
      <View>
        <Text style={styles.label}>{title} :</Text>
        <TextInput
          editable={!index}
          style={[styles.input, error[field] && styles.error]}
          value={newFields[field]}
          onChangeText={(txt) => onChangeValue(field, txt)}
          keyboardType={keyboardType}
          multiline={multiline}
        />
      </View>
    );
  }

  render() {
    const {loading, route, newFields, navigation} = this.props;
    const index = route.params.index;
    console.log('newFields.photo', newFields.photo);
    return (
      <ScrollContainer>
        <TouchableOpacity
          style={styles.image}
          disabled={index}
          onPress={() => navigation.navigate('Camera')}>
          <Image
            source={{
              uri: newFields.photo
                ? newFields.photo
                : 'https://cdn.pixabay.com/photo/2017/01/25/17/35/shutter-2008488_1280.png',
            }}
            style={StyleSheet.absoluteFill}
          />
        </TouchableOpacity>
        {this.renderInputs('Name', 'name', 'default', false)}
        {this.renderInputs('Email', 'email', 'default', false)}
        {this.renderInputs('Phone', 'phone', 'number-pad', false)}

        {newFields.location && (
          <>
            {this.renderInputs('Address', 'address', 'default', true)}
            <Text style={styles.label}>Location :</Text>
            <Text style={styles.location}>
              Latitude: {newFields.location.latitude}
            </Text>
            <Text style={styles.location}>
              Longitude: {newFields.location.longitude}
            </Text>

            <MapView
              style={styles.map}
              region={{
                latitude: newFields.location.latitude,
                longitude: newFields.location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: newFields.location.latitude,
                  longitude: newFields.location.longitude,
                }}
              />
            </MapView>
          </>
        )}
        {index ? (
          <Button loading={loading} onPress={this.delete} title="Delete" />
        ) : (
          <Button loading={loading} onPress={this.save} title="Save" />
        )}
      </ScrollContainer>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: '#000000aa',
  },
  input: {
    fontSize: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#00000044',
    marginBottom: 50,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#00000066',
    alignSelf: 'center',
    marginBottom: 30,
    overflow: 'hidden',
    elevation: 2,
  },
  location: {
    marginLeft: 40,
    marginTop: 5,
  },
  map: {
    height: 200,
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addredd: {
    maxWidth: 200,
    marginLeft: 40,
  },
  error: {
    borderBottomWidth: 1,
    borderColor: 'red',
  },
});

const mapStateToProps = (state) => ({
  list: state.user.list,
  newFields: state.user.newFields,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps, {
  saveUser: addUser,
  setLocationData: setLocation,
  setUserData: setUserDetails,
  deleteUser: deleteUserDetail,
  clearUser: clearUserFileds,
  onChangeValue: onChangeText,
})(AddUser);
