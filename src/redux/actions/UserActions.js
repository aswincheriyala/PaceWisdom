import firestore from '@react-native-firebase/firestore';
import {LayoutAnimation} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

import {ValidateEmail} from '../../services';

export const addUser = (callback) => async (dispatch, getState) => {
  const {list, newFields} = getState().user;
  const finalList = [...list];
  let id = (Math.random() * 1000000).toFixed(0);
  let data = {id, ...newFields};

  const {error, errorExist} = validate(newFields);
  if (errorExist) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    });
    return;
  }
  dispatch({type: 'SET_LOADER'});
  finalList.push(data);
  firestore()
    .collection('Users')
    .doc(id)
    .set(data)
    .then(() => {
      callback();
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatch({
          type: 'ADD_USER',
          payload: finalList,
        });
      }, 100);
    });
};

export const deleteUserDetail = (index, callback) => async (
  dispatch,
  getState,
) => {
  const {list} = getState().user;
  const finalList = [...list];
  finalList.splice(index, 1);
  await firestore()
    .collection('Users')
    .doc(list[index].id)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
  callback();
  setTimeout(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({
      type: 'ADD_USER',
      payload: finalList,
    });
  }, 100);
};

export const fetchUserDetails = () => async (dispatch) => {
  const users = await firestore().collection('Users').get();
  let data = users.docs.map((doc) => doc.data());
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  dispatch({
    type: 'ADD_USER',
    payload: data,
  });
};

export const setLocation = () => async (dispatch) => {
  Geolocation.getCurrentPosition((data) => {
    const location = {
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
    };
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        var addressComponent = json.results[0].address_components;
        let address = '';
        addressComponent.forEach((item, index) => {
          address = `${address}${index !== 0 ? ',' : ''} ${item.long_name}`;
        });
        console.log('address', address);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatch({
          type: 'SET_LOCATION',
          payload: {location, address},
        });
      })
      .catch((error) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatch({
          type: 'SET_LOCATION',
          payload: {location, address: ''},
        });
      });
  });
};

export const setUserDetails = (index) => async (dispatch, getState) => {
  const {list} = getState().user;
  const payload = list[index - 1];
  dispatch({
    type: 'SET_USER',
    payload,
  });
};

export const clearUserFileds = (index) => async (dispatch) => {
  dispatch({
    type: 'CLEAR_USER',
  });
};

export const onChangeText = (label, value, callback) => async (
  dispatch,
  getState,
) => {
  const {newFields} = getState().user;
  const finalFields = {...newFields};

  finalFields[label] = value;
  if (callback) {
    callback();
  }
  dispatch({
    type: 'SET_USER',
    payload: finalFields,
  });
};

const validate = (data) => {
  let error = {
    name: false,
    email: false,
    phone: false,
    address: false,
  };
  let errorExist = false;
  if (data.name.length === 0) {
    error.name = true;
    errorExist = true;
  }
  if (data.phone.length === 0) {
    error.phone = true;
    errorExist = true;
  }
  if (data.address.length === 0) {
    error.address = true;
    errorExist = true;
  }
  if (ValidateEmail(data.email)) {
    error.email = true;
    errorExist = true;
  }
  console.log(error);
  return {error, errorExist};
};
