import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Card({ image, text }) {
    return (
        <View style={style.container}>
            <Image source={image} style={style.icon} />
            <Text style={style.text}>{text}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },

    icon: {
        width: wp(12.5),
        height:hp(3.5),
        resizeMode:'contain'
    },

    text: {
        width: wp(80),
        height:hp(3),
        fontSize: 16,
        color: 'white',        
    },
})