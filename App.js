import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/store';
import DashboardScreen from './src/screens/DashboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShowLocalFolderScreen from './src/screens/ShowLocalFolder';
import ShowFileListScreen from './src/screens/ShowFileList';
import SettingScreen from './src/screens/SettingScreen';

const Stack = createStackNavigator();

// App component is routing component.
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ShowFolder"
            component={ShowLocalFolderScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="FileList"
            component={ShowFileListScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
