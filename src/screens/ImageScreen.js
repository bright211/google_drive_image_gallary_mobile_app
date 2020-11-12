/**
 * Google Drive
 * created by luyxtran264@gmail.com
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PermissionsAndroid
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
import GDrive from "react-native-google-drive-api-wrapper";
import RNFS from "react-native-fs"

let apiToken = null
const url = 'https://www.googleapis.com/drive/v3' // demo method to understand easier https://developers.google.com/drive/v3/reference/files/list
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3'
const downloadHeaderPath = RNFS.DocumentDirectoryPath + '/data.json' // see more path directory https://github.com/itinance/react-native-fs#api
const boundaryString = 'foo_bar_baz' // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload

/**
 * query params 
 */
function queryParams() {
    return encodeURIComponent("name = 'data.json'")
}

/**
 * Set api token
 */
function setApiToken(token) {
    apiToken = token
}

/**
 * crete multi body
 */
function createMultipartBody(body, isUpdate = false) {
    // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
    const metaData = {
        name: 'data.json',
        description: 'Backup data for my app',
        mimeType: 'application/json',
    }
    // if it already exists, specifying parents again throws an error
    if (!isUpdate) metaData.parents = ['appDataFolder']

    // request body
    const multipartBody = `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
        + `${JSON.stringify(metaData)}\r\n`
        + `--${boundaryString}\r\nContent-Type: application/json\r\n\r\n`
        + `${JSON.stringify(body)}\r\n`
        + `--${boundaryString}--`

    return multipartBody
}


/**
 * configure post method
 */
function configurePostOptions(bodyLength, isUpdate = false) {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${apiToken}`)
    headers.append('Content-Type', `multipart/related; boundary=${boundaryString}`)
    headers.append('Content-Length', bodyLength)
    return {
        method: isUpdate ? 'PATCH' : 'POST',
        headers,
    }
}

/**
 * configure get method
 */
function configureGetOptions() {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${apiToken}`)
    return {
        method: 'GET',
        headers,
    }
}

/**
 * create download url based on id
 */
function downloadFile(existingFileId) {
    const options = configureGetOptions()
    console.log(existingFileId)
    if (!existingFileId) throw new Error('Didn\'t provide a valid file id.')
    return `${url}/files/${existingFileId}?alt=media`
}

/**
 * returns the files meta data only. the id can then be used to download the file
 */
function getFile() {
    const qParams = queryParams()
    const options = configureGetOptions()
    console.log('options', apiToken)
    return fetch(`${url}/files?q=${qParams}&spaces=appDataFolder`, options)
        .then(parseAndHandleErrors)
        .then((body) => {
            console.log(body)
            if (body && body.files && body.files.length > 0) return body.files[0]
            return null
        })
}

/**
 * upload file to google drive
 */
function uploadFile(content, existingFileId) {
    const body = createMultipartBody(content, !!existingFileId)
    const options = configurePostOptions(body.length, !!existingFileId)
    return fetch(`${uploadUrl}/files${existingFileId ? `/${existingFileId}` : ''}?uploadType=multipart`, {
        ...options,
        body,
    })
        .then(parseAndHandleErrors)
}

/**
 * handle error
 */
function parseAndHandleErrors(response) {
    console.log(response)
    if (response.ok) {
        return response.json()
    }
    return response.json()
        .then((error) => {
            throw new Error(JSON.stringify(error))
        })
}

/**
 * require write storage permission
 */
async function requestWriteStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Write your android storage Permission',
                'message': 'Write your android storage to save your data'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can write storage")
        } else {
            console.log("Write Storage permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}


/**
 * * require read storage permission
 */
async function requestReadStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Read your android storage Permission',
                'message': 'Read your android storage to save your data'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can Read storage")
        } else {
            console.log("Read Storage permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

function ImageScreen({ navigation }) {

    const [data, setData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

    // check storage permission
    const checkPermission = () => {
        console.log('------------------check_permission.');
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((writeGranted) => {
            console.log('writeGranted', writeGranted)
            if (!writeGranted) {
                requestWriteStoragePermission()
            }
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((readGranted) => {
                console.log('readGranted', readGranted)
                if (!readGranted) {
                    requestReadStoragePermission()
                }
            })
        })
    }

    // download and read file to get data content in downloaded file
    const downloadAndReadFile = (file) => {
        const fromUrl = downloadFile(file.id)
        let downloadFileOptions = {
            fromUrl: fromUrl,
            toFile: downloadHeaderPath,
        }
        downloadFileOptions.headers = Object.assign({
            "Authorization": `Bearer ${apiToken}`
        }, downloadFileOptions.headers);

        console.log('downloadFileOptions', downloadFileOptions)

        RNFS.downloadFile(downloadFileOptions).promise.then(res => {
            console.log(res)
            return RNFS.readFile(downloadHeaderPath, 'utf8');
        }).then(content => {
            console.log(content)
            setData(content);
        }).catch(err => {
            console.log('error', err)
        });
    }

    // check existed file
    const checkFile = () => {
        getFile().then((file) => {
            console.log('file', file)
            if (file) {
                downloadAndReadFile(file)
            } else {
                console.log('file no found')
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    // crete file to upload
    const createFile = () => {
        const content = [
            {
                id: 1,
                text: 'transaction memo list',
                name: 'dang'
            },
            {
                id: 2,
                text: 'transaction memo list',
                name: 'dang 2'
            }
        ]
        getFile().then((file) => {
            console.log('file', file)
            if (file) {
                uploadFile(JSON.stringify(content), file.id)
            } else {
                uploadFile(JSON.stringify(content))
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    const getDataFromGoogleDrive = async () => {

        await initialGoogle()

        if (apiToken) {
            checkFile()
        }

        console.log('----------------------apiToken : ' + apiToken);
    }

    const setDataFromGoogleDrive = async () => {
        await initialGoogle()

        if (apiToken) {
            createFile()
        }
    }

    const initialGoogle = async () => {

        console.log('-----------------------initial_google.');

        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.appdata'],
            shouldFetchBasicProfile: true,
            webClientId: '90643745421-v56mj14i88ip01euu90ei3jq56lvq039.apps.googleusercontent.com',
            offlineAccess: true
        });

        // await GoogleSignin.configure({
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        //     webClientId: '84981263328-r2jdsv87kedo09ovjbf3skbuutua32me.apps.googleusercontent.com', 
        //     offlineAccess: true, 
        //     hostedDomain: '', 
        //     loginHint: '', 
        //     forceConsentPrompt: true, 
        //     accountName: ''
        //     });

        const user = await GoogleSignin.getCurrentUser();

        console.log('-----------------------google_signin.');
        //set api token
        console.log('------------------api_token : ' + user.accessToken);
        setApiToken(user.accessToken)
    }

    useEffect(() => {
        checkPermission();
        // GoogleSignin.configure({
        //     // Mandatory method to call before calling signIn()
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        //     shouldFetchBasicProfile: true,
        //     // Repleace with your webClientId
        //     // Generated from Firebase console
        //     webClientId: '84981263328-r2jdsv87kedo09ovjbf3skbuutua32me.apps.googleusercontent.com',
        //     offlineAccess: true
        // });        

        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            androidClientId: '84981263328-01bhph871tm3c2a02b94djebo8s65sk5.apps.googleusercontent.com',// my clientID
            offlineAccess: false,
            forceConsentPrompt: true
        });
        // Check if user is already signed in
        _isSignedIn();

        console.log('--------------------use_effect.');
    }, []);

    const _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            // Set User Info if user is already signed in
            _getCurrentUserInfo();
        } else {
            console.log('Please Login');
        }
        setGettingLoginStatus(false);
    };

    const _getCurrentUserInfo = async () => {
        try {
            let info = await GoogleSignin.signInSilently();
            console.log('User Info --> ', info);
            setUserInfo(info);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Unable to get user's info");
                console.log("Unable to get user's info");
            }
        }
    };

    const _signIn = async () => {
        // It will prompt google Signin Widget
        try {
            await GoogleSignin.hasPlayServices({
                // Check if device has Google Play Services installed
                // Always resolves to true on iOS
                showPlayServicesUpdateDialog: true,
            });

            console.log('------------google_drive_installed---------');
            
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            setUserInfo(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signing In');
            } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
            ) {
                alert('Play Services Not Available or Outdated');
            } else {
                console.log('-----------------error.message', error.message);
                alert(error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                style={{ width: 225, height: 55 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
            />
            <TouchableHighlight style={styles.buttonGetData} onPress={() => getDataFromGoogleDrive()}>
                <Text style={styles.text}>
                    Get data from Google Drive
                </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonGetData} onPress={() => setDataFromGoogleDrive()}>
                <Text style={styles.text}>
                    Create data or Update data
                </Text>
            </TouchableHighlight>
            <Text style={styles.textData}>
                {JSON.parse(data)}
            </Text>
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
    }
});

export default ImageScreen;