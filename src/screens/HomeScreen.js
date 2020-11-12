import React from 'react';
import {View, Text} from 'react-native';

function HomeScreen({ navigation }) {
  React.useEffect(() => {
      setTimeout(function () {
          navigation.replace('ImageScreen');
        }, 3000);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
