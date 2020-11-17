import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {theme} from '../utils/theme';
import Header from './Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import * as Types from '../store/types'

function ShowLocalFolder({navigation}) {
  const storeData = useSelector((store) => store.data);
  const {config, fs} = RNFetchBlob;
  const goNavigation = (link) => {
    navigation.navigate(link);
  };
  const [state, setState] = useState({
    folders: [],
    imageLists:[]
  });
  const dispatch = useDispatch()

  const _onPressed = () => {
    navigation.goBack();
  };

  useEffect(() => {
    RNFetchBlob.fs.ls(fs.dirs.PictureDir).then((files) => {
      setState({...state, folders: files});
    });
  }, []);

  const checkImage = (item) => {
    if(!state.imageLists.includes(item)){
        setState({...state, imageLists:[...state.imageLists, item]})
    } else {
        let index = state.imageLists.indexOf(item)
        let temp = [...state.imageLists]
        temp.splice(index,1)
        setState({...state, imageLists:[...temp]})
    }
  };

  const useImages = () => {
    let temp = []
    let PictureDir = fs.dirs.PictureDir;
    if(state.imageLists.length>0){
        state.imageLists.map((item, index)=>{
            temp.push({
                uri: 'file://' + PictureDir + '/Images/' + item,
                title: item,
                text: item,
                duration: storeData.duration,
              })
        })
        dispatch({type: Types.SET_DATA, payload:{items: temp}})
        navigation.navigate("Dashboard");
        
    } else {
        alert("Please select images")
    }
  }

  return (
    <View style={style.container}>
      <Header />

      <View>
        <Text style={style.textContainer}>Select Images</Text>

        <View style={style.googleDriveContainer}>
          <ScrollView>
            {storeData.files.length > 0 &&
              storeData.files.map((item, index) => (
                <TouchableOpacity
                  style={style.folderList}
                  key={index}
                  onPress={() => {
                    checkImage(item);
                  }}>
                  <CheckBox
                    // style={{flex: 1, padding: 10}}
                    onClick={() => {
                      checkImage(item);
                    }}
                    isChecked={state.imageLists.includes(item)}
                    // leftText={'CheckBox'}
                  />
                  <Image
                    source={{
                      uri:
                        'file://' + fs.dirs.PictureDir + '/' + 'images/' + item,
                    }}
                    style={{height: hp(5), resizeMode: 'stretch', width: hp(7)}}
                  />
                  <Text style={style.folderText}>{item}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
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
            <Text style={style.text}>Return</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => useImages()}>
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
            <Text style={style.text}>Use this Images</Text>
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
    overflow: 'scroll',
    height: hp(60),
    width: wp(90),
    borderWidth: 0.2,
    borderColor: theme.colors.white,
    flexDirection: 'column',
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

  folderList: {
    height: hp(7),
    width: wp(90),
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  folderText: {
    fontSize: 15,
    color: 'white',
    paddingLeft: 15,
  },
});

export default ShowLocalFolder;
