import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import storage from '@react-native-firebase/storage';
import TimedSlideshow from '../components/SlideShow/index.js';
import {PanGestureHandler} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import {useDispatch, useSelector} from 'react-redux';
import * as Types from '../store/types';
import Modal from 'react-native-modal';
import SoundPlayer from 'react-native-sound-player';

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const HomeScreen = ({navigation}) => {
  let itemTemp = [];
  let touchCount = 0;

  NetInfo.fetch().then((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  const storeData = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    items: [],
    isModalVisible: false,
    password: '',
  });
  const {config, fs} = RNFetchBlob;

  const handleGesture = (e) => {
    touchCount += 1;
    console.log(touchCount);
    SoundPlayer.playSoundFile('beep', 'mp3');
    if (touchCount > 6 && touchCount < 9) {
      touchCount = 0;
      setState({...state, isModalVisible: true});
    }
  };
  const getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const getName = (filename) => {
    return filename.split('/')[1].split('.')[0];
    undefined;
  };

  const downloadImage = (image_URL, extention, filename) => {
    let ext = '.' + extention[0];
    console.log(ext);
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/Images/' + filename + ext,
        description: 'Image',
      },
    };

    let flag = 1;
    console.log(itemTemp);
    itemTemp.map((item, index) => {
      if (item.uri === 'file://' + PictureDir + '/Images/' + filename + ext) {
        flag = 0;
      }
    });
    let PATH_OF_FILE = PictureDir + '/Images/' + filename + ext;
    itemTemp.push({
      uri: 'file://' + PictureDir + '/Images/' + filename + ext,
      title: filename,
      text: filename,
      duration: storeData.duration,
    });
    RNFetchBlob.fs
      .exists(PATH_OF_FILE)
      .then((exist) => {
        if (!exist) {
          if (flag) {
            config(options)
              .fetch('GET', image_URL)
              .then((res) => {
                itemTemp.push({
                  uri:
                    'file://' +
                    PictureDir +
                    '/Images/' +
                    filename +
                    '.' +
                    ext[0],
                  title: filename,
                  text: filename,
                  ext: ext[0],
                });
                setState({...state, items: itemTemp});
                dispatch({type: Types.SET_DATA, payload: {items: itemTemp}});
              });
          }
        } else {
          dispatch({type: Types.SET_DATA, payload: {items: itemTemp}});
        }
      })
      .catch(() => {});
  };

  function listFilesAndDirectories(reference, pageToken) {
    return reference.list({pageToken}).then(async (result) => {
      // Loop over each item

      let temp = [];

      result.items.forEach((ref) => {
        console.log(ref.fullPath);
        temp.push({
          url: ref.fullPath,
          ext: getExtention(ref.fullPath),
          name: getName(ref.fullPath),
        });
      });
      await temp.map(async (item, index) => {
        console.log(item);
        const url = await storage().ref(item.url).getDownloadURL();
        downloadImage(url, item.ext, item.name);
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }

      return Promise.resolve();
    });
  }

  const reference = storage().ref('medias');

  React.useEffect(() => {
    requestPermission();

    NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        listFilesAndDirectories(reference).then(() => {
          console.log('Finished listing');
        });
      } else {
        RNFetchBlob.fs.ls(fs.dirs.PictureDir + '/Images').then((files) => {
          let temp=[]
          files.map((item, index)=>{
            temp.push({
              uri: 'file://' + fs.dirs.PictureDir + '/Images/' + item,
              title: item,
              text: item,
              duration: storeData.duration,
            })
          })
          setState({...state, items: temp})          
        });
      }
    });
   
  }, []);

  React.useEffect(() => {
    let temp = [...storeData.items];
    let tempItems = [];
    temp.map((item, index) => {
      tempItems.push({...item, duration: storeData.duration});
    });
    setState({...state, items: tempItems});
  }, [storeData]);

  const toggleModal = () => {
    setState({...state, isModalVisible: !state.isModalVisible, password: ''});
  };

  const setPassword = (text) => {
    setState({...state, password: text});
  };

  const checkPassword = () => {
    if (state.password === '123456789') {
      console.log('passed');
      toggleModal();
      navigation.navigate('Dashboard');
    }
  };

  return (
    <>
      <Modal
        isVisible={state.isModalVisible}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: hp(30),
            width: wp(70),
            backgroundColor: '#bfbfbf',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 15,
          }}>
          <Text style={{width: wp(50), textAlign: 'center'}}>
            PLEASE ENTER THE ADMINISTRATOR PASSWORD
          </Text>
          <TextInput
            style={{
              height: hp(5),
              width: wp(45),
              borderRadius: 15,
              backgroundColor: '#fff',
              paddingHorizontal: 10,
            }}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: wp(45),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                height: hp(4),
                width: wp(20),
                backgroundColor: '#707070',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}
              onPress={toggleModal}>
              <Text style={{color: 'white'}}>Return</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: hp(4),
                width: wp(20),
                backgroundColor: '#707070',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}
              onPress={checkPassword}>
              <Text style={{color: 'white'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <View style={{height: hp(100), width: wp(100)}}>
          {state.items.length > 0 && state.items[0].text && (
            <TimedSlideshow items={state.items} />
          )}
        </View>
      </PanGestureHandler>
    </>
  );
};

export default HomeScreen;
