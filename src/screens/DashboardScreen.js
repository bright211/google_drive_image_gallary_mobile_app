import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {theme} from '../utils/theme';
import Card from '../components/card';
import Header from './Header';
import {
  copyIcon,
  clockIcon,
  errorIcon,
  firewall,
  rightIcon,
} from '../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

function Home({navigation}) {
  const goNavigation = (link) => {
    navigation.navigate(link);
  };

  const storeData = useSelector((store) => store.data);

  const _onPressed = () => {
    goNavigation('Home');
  };

  return (
    <View style={style.container}>
      <Header />

      <View>
        <Text style={style.textContainer}>Standard Images</Text>
        <View style={style.googleDriveContainer}>
          <Card
            image={copyIcon}
            text={'images'}
            textStyle={style.textContainer}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{width: wp(55), backgroundColor: 'red'}}></View>
            <TouchableOpacity onPress={() => navigation.navigate('ShowFolder')}>
              <Text style={style.textbutton}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={style.textContainer}>Default Settings</Text>
        <View style={style.defaultSettingsContainer}>
          <Card
            image={clockIcon}
            text={`Display Time: ${storeData.duration / 1000} sec.`}
          />
          <Card image={errorIcon} text={'Device Name: AdM0123'} />
          <Card image={firewall} text={'Change the Password'} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{width: wp(55), backgroundColor: 'red'}}></View>
            <TouchableOpacity onPress={()=>navigation.navigate("Setting")}>
              <Text style={style.textbutton}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.buttonsContainer}>
        <TouchableOpacity onPress={() => _onPressed()}>
          <View
            style={{
              backgroundColor: theme.colors.dimGray,
              height: hp(6),
              width: wp(40),
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Image source={rightIcon} style={style.icon} />
            <Text style={style.text}>{'Close AdMobi'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onPressed()}>
          <View
            style={{
              backgroundColor: theme.colors.dimGray,
              height: hp(6),
              width: wp(55),
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Image source={rightIcon} style={style.icon} />
            <Text style={style.text}>{'Close Admin Panel'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    backgroundColor: theme.colors.nightRider,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: hp(3),
  },

  googleDriveContainer: {
    height: hp(13),
    width: wp(90),
    borderWidth: 0.2,
    borderColor: theme.colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  standardImagesContainer: {
    height: hp(13),
    width: wp(90),
    borderWidth: 0.2,
    borderColor: theme.colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  defaultSettingsContainer: {
    height: hp(27),
    width: wp(90),
    borderWidth: 0.2,
    borderColor: theme.colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  buttonsContainer: {
    height: hp(15),
    width: wp(90),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textContainer: {
    height: hp(3),
    fontSize: 16,
    color: 'white',
  },

  textbutton: {
    backgroundColor: theme.colors.dimGray,
    height: hp(6),
    width: wp(30),
    fontSize: 20,
    borderRadius: 12,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  icon: {
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
  },

  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default Home;
