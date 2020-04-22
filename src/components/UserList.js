import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import ScrollContainer from './ScrollContainer';
import {fetchUserDetails} from '../redux/actions/UserActions';
import Button from './common/Button';

const UserList = ({list, navigation, fetchUsers}) => {
  useEffect(() => {
    if (!list) {
      fetchUsers();
    }
  });
  return (
    <ScrollContainer>
      {list &&
        list.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.userList}
            onPress={() =>
              navigation.navigate('UserDetail', {
                title: 'USER DETAILS',
                index: index + 1,
              })
            }>
            <View style={styles.dot} />
            <Text style={styles.name}>{item.name}</Text>
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.pencil}
            />
          </TouchableOpacity>
        ))}
      {list && list.length !== 0 ? (
        <View style={styles.seperator} />
      ) : (
        <Text style={styles.noUser}>No Users Found</Text>
      )}
      <Button
        onPress={() => navigation.navigate('UserDetail', {title: 'ADD USER'})}
        title="Add user"
      />
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 5,
    width: 5,
    borderRadius: 3,
    backgroundColor: 'grey',
    marginRight: 15,
  },
  userList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  name: {
    fontSize: 20,
  },
  seperator: {
    height: 1,
    backgroundColor: 'grey',
    marginTop: 10,
    marginBottom: 30,
  },
  noUser: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
  },
  pencil: {
    position: 'absolute',
    right: 0,
    height: 15,
    width: 15,
    tintColor: 'grey',
  },
});

const mapStateToProps = (state) => ({
  list: state.user.list,
});

export default connect(mapStateToProps, {fetchUsers: fetchUserDetails})(
  UserList,
);
