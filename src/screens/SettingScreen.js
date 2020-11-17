import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '../utils/theme';
import Card from '../components/card';
import Header from './Header';
import {copyIcon, clockIcon, errorIcon, firewall, rightIcon} from '../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import * as Types from "../store/types"


function SettingScreen({navigation}) {
  const goNavigation = (link) => {
    navigation.navigate(link);
  };
  const dispatch = useDispatch()
  const storeData = useSelector((store) => store.data);
  const [state, setState] = useState({
    isTimeModal: false,
    duration:storeData.duration
  });

  const _onPressed = () => {
    goNavigation('Dashboard');
  };

  const toggleTimeModal = () => {
    setState({...state, isTimeModal: !state.isTimeModal});
  };

  const setTime = (time) => {
      toggleTimeModal()
        dispatch({type: Types.SET_DATA, payload:{duration: parseInt(time)*1000}})
  };
  const timeList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
  ];

  return (
    <View style={style.container}>
      <Header />
      <Modal
        isVisible={state.isTimeModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: hp(30),
            width: wp(70),
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={{width: wp(50), textAlign: 'center'}}>
            Display Time:
          </Text>
          <View style={{height: hp(20), width: wp(70)}}>
            <ScrollView>
              {timeList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    height: hp(5),
                    width: wp(70),
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }} onPress={()=>setTime(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View>
        <Text style={style.textContainer}>Default Settings</Text>
        <View style={style.defaultSettingsContainer}>
          <View
            style={{
              padding: 10,
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            }}>
            <Card
              image={clockIcon}
              text={`Display Time: ${storeData.duration / 1000} sec.`}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={toggleTimeModal}>
              <Text style={style.textbutton}>Change</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            }}>
            <Card image={errorIcon} text={'Device Name: AdM0123'} />
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Text style={style.textbutton}>Change</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
            }}>
            <Card image={firewall} text={'Change the Password'} />
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
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
              width: wp(30),
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {/* <Image source={rightIcon} style={style.icon} /> */}
            <Text style={style.text}>{'Return'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onPressed()}>
          <View
            style={{
              backgroundColor: theme.colors.dimGray,
              height: hp(6),
              width: wp(30),
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {/* <Image source={rightIcon} style={style.icon} /> */}
            <Text style={style.text}>{'Save'}</Text>
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
    height: hp(40),
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
    flexDirection: 'row',
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

export default SettingScreen;
