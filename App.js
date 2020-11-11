
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {Provider as PaperProvider} from 'react-native-paper';
// import {Provider} from 'react-redux';
// import store from './src/redux';

// import app screens
import LoginScreen from './src/screens/LoginScreen'
import ServerScreen from './src/screens/ServerScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import HomeScreen from './src/screens/HomeScreen';
// import LoginScreen from './src/screens/Login'
// import SettingScreen from './src/screens/Setting'


const Stack = createStackNavigator();

// App component is routing component.   
function App() {
  return(
    // <Provider store={store}>
    //   <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Server"
              component={ServerScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            {/* <Stack.Screen
              name="Local"
              component={LocalScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
    //   </PaperProvider>
    // </Provider>
  )
}

export default App;


