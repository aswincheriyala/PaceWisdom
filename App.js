import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddUser from './src/components/UpdateUser';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import reducer from './src/redux/reducers';
import UserList from './src/components/UserList';
import Camera from './src/components/Camera';

const Stack = createStackNavigator();

function App() {
  let createStoreWithMiddleware;
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return (
    <Provider store={createStoreWithMiddleware(reducer)}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Users" component={UserList} />
          <Stack.Screen name="UserDetail" component={AddUser} />
          <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
