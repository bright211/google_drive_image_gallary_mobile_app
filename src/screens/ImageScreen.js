import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import GDrive from 'react-native-google-drive-api-wrapper';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';

async function requestWriteStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write your android storage Permission',
        message: 'Write your android storage to save your data',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can write storage');
    } else {
      console.log('Write Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * * require read storage permission
 */
async function requestReadStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Read your android storage Permission',
        message: 'Read your android storage to save your data',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can Read storage');
    } else {
      console.log('Read Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}


function ImageScreen({navigation}) {
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [state, setState] = useState({
    token: '',
    files: [],
  });

  // check storage permission
  const checkPermission = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then((writeGranted) => {
      console.log('writeGranted', writeGranted);
      if (!writeGranted) {
        requestWriteStoragePermission();
      }
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then((readGranted) => {
        console.log('readGranted', readGranted);
        if (!readGranted) {
          requestReadStoragePermission();
        }
      });
    });
  };

  const getDataFromGoogleDrive = async () => {
    // await initialGoogle();
    // const userInfo = await GoogleSignin.signIn();
    // await signOut()
    // await _signIn()
    let info = await GoogleSignin.getTokens();
    const queryParams = {alt: 'media'};
    if (userInfo) {
      GDrive.setAccessToken(info.accessToken);
      const params = {
        files: {
          boundary: 'foo_bar_baz', // The boundary string for multipart file uploads. Default: "foo_bar_baz".
        },
      };

      GDrive.init();

      GDrive.files
        .list({
          q: "'root' in parents",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.files.length > 0) {
            data.files.map((item, index) => {
              if (
                item.mimeType === "'image/jpg'" ||
                item.mimeType === 'image/jpeg'
              ) {
                console.log(item.name);
                const downloadHeaderPath =
                  RNFS.DocumentDirectoryPath + '/' + item.name;
                let downloadFileOptions = {
                  toFile: downloadHeaderPath,
                };
                console.log(downloadHeaderPath);

                GDrive.files.download(item.id, downloadFileOptions, {
                  alt: 'media',
                });

                
              }
            });
          }
          alert("Download Successfully")
        }) //data.files is the array containing list of files
        .catch((err) => alert(err));
    }
  };

  function stringGen(len) {
    var text = "";
    
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
  }

  const uploads = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        var data = await RNFS.readFile(response.uri, 'base64').then((res) => {
          return res;
        });
        GDrive.files
          .createFileMultipart(
            data,
            "'image/jpg'",
            {
              parents: ['root'], 
              name: stringGen(5)+'.jpg',
            },
            true,
          )
          .then((a) => {
            console.log(a);
            alert("Upload Successfully")
          })
          .catch(error=>alert("Try again"))
      }
    });
  };


  useEffect(() => {
    checkPermission();
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive',
      ],
      webClientId:
        '684348389755-72bqbrti1la9gag0ngj5uubqgmvgm6ku.apps.googleusercontent.com',
      androidClientId:
        '684348389755-qr4a4ka8m6hj97us6qp0cj68i7pploi6.apps.googleusercontent.com',
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      setUserInfo(userInfo);
    //   navigation.replace('Dashboard')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const goHomeScreen = () => {
    navigation.replace("Home")
  }

  return (
    <View style={styles.container}>
   
      
      {userInfo ? (
        <>
          <TouchableHighlight
            style={styles.buttonGetData}
            onPress={() => getDataFromGoogleDrive()}>
            <Text style={styles.text}>Get media from Google Drive</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonGetData}
            onPress={() => uploads()}>
            <Text style={styles.text}>Upload Image</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonGetData}
            onPress={() => goHomeScreen()}>
            <Text style={styles.text}>Go Gallery Screen</Text>
          </TouchableHighlight>
        </>
      ):(
        <GoogleSigninButton
        style={{width: 225, height: 55}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
      />
      )}

      <Text style={styles.textData}>{JSON.parse(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 10,
  },
  textData: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  buttonGetData: {
    backgroundColor: '#333',
    padding: 10,
    margin: 10,
    width: 300
  },
});

export default ImageScreen;
