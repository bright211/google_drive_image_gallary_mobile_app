import React, { useEffect, useState }from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, Android } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFS from "react-native-fs";

const Separator = () => (
    <View style={styles.separator} />
);

const file_image = { uri: 'file:///data/data/com.testcachedimage/cache/imagesCacheDir/my_bamps_online_e6d51c26611343fb5e8c3e493674423c3d3f3943/38baef384cbb5bcc5f6138ca0653884561f85fde.jpg' };
const initImageValue = [
    {
        caption: 'This image is bundled with the app, so you must provide dimensions for it',
        source: 'file:///storage/emulated/0/Pictures/face_1.jpg',
        dimensions: { width: 540, height: 720 }
    },
    {
        caption: 'This image has a broken URL',
        source: { uri: 'http://wrongdomain.tld/images/wrongimage.jpg' }
    },
    {
        caption: 'Remote image with supplied dimensions',
        source: { uri: 'http://i.imgur.com/gSmWCJF.jpg' },
        dimensions: { width: 1200, height: 800 }
    },
    { caption: 'Caption 4', source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
    { caption: 'Caption 5', source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
    { caption: 'Caption 6', source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
    { caption: 'Caption 7', source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } },
    { caption: 'Caption 8', source: { uri: 'http://i.imgur.com/BN8RVGa.jpg' } },
    { caption: 'Caption 9', source: { uri: 'http://i.imgur.com/jXbhTbv.jpg' } },
    { caption: 'Caption 10', source: { uri: 'http://i.imgur.com/30s12Qj.jpg' } },
    { caption: 'Caption 11', source: { uri: 'http://i.imgur.com/4A1Q49y.jpg' } },
    { caption: 'Caption 12', source: { uri: 'http://i.imgur.com/JfVDTF9.jpg' } },
    { caption: 'Caption 13', source: { uri: 'http://i.imgur.com/Vv4bmwR.jpg' } }
];

function TestScreen({ navigation }) {
    const [imageURL, setImageURL] = useState(initImageValue[0].source);

    const fileUpload = () => {
        console.log('-------------------------file_upload');
    }

    const fileDownload = () => {
        console.log('-------------------------file_download');
    }
    
    const onPressMe_1 = () => {
        setImageURL('http://i.imgur.com/XP2BE7q.jpg');
        console.log('-------------------------storage : ' + imageURL);
    }

    const onPressMe_2 = () => {
        setImageURL('file://' + RNFS.PicturesDirectoryPath + '/face_1.jpg');
        console.log('-------------------------storage : ' + imageURL);
    }


    useEffect(() => {
        console.log('-------------------------decode_uri : ', decodeURI(imageURL));
        console.log('-------------------------picture_path : ' + RNFS.PicturesDirectoryPath);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    The title and onPress handler are required. It is recommended to set accessibilityLabel to help make your app usable by everyone.
        </Text>
                <Image
                    source={{ uri: imageURL }}
                    style={{ height: hp(35), width: wp(92), resizeMode: 'stretch', marginBottom: 15, marginRight: 15 }}
                />
                <Button
                    title="Press me"
                    onPress={() => onPressMe_1()}
                />
            </View>
            <Separator />
            <View>
                <Text style={styles.title}>
                    Adjust the color in a way that looks standard on each platform. On  iOS, the color prop controls the color of the text. On Android, the color adjusts the background color of the button.
        </Text>
                <Button
                    title="Press me"
                    color="#f194ff"
                    onPress={() => onPressMe_2()}
                />
            </View>
            <Separator />
            <View>
                <Text style={styles.title}>
                    All interaction for the component are disabled.
        </Text>
                <Button
                    title="Press me"
                    disabled
                    onPress={() => Alert.alert('Cannot press this one')}
                />
            </View>
            <Separator />
            <View>
                <Text style={styles.title}>
                    This layout strategy lets the title define the width of the button.
                </Text>
                <View style={styles.fixToText}>
                    <Button
                        title="Left button"
                        onPress={() => Alert.alert('Left button pressed')}
                    />
                    <Button
                        title="Right button"
                        onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default TestScreen;
