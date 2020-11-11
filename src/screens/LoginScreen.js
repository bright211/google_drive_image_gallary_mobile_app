import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { theme } from '../utils/theme'
import {backIcon}  from '../assets'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



function Login({ navigation }) {

    const goNavigation = link => {
        navigation.navigate(link)
    }

    const _onPressed = () => {
        goNavigation('Dashboard')
    }

    return (
        <View style={style.container}>
            <View style={style.content}>
                <Text style={style.title}>
                    PLEASE ENTER THE ADMINISTRATOR PASSWORD
                </Text>

                <View style={style.space} />
    
                <TextInput
                        style={style.textinput}
                        label="Note"
                        returnKeyType="done"
                        // value={note.value}
                        // placeholder={'Note'}
                        // onChangeText={text => setNote({ value: text, error: '' })}
                        // error={!!note.error}
                        // errorText={note.error}
                    />
                    
                <View style={style.space} />
            
                <View style={style.buttonContainer}>
                    <TouchableOpacity>
                        <View style={{
                            backgroundColor: theme.colors.dimGray,
                            height:hp(6),
                            width:wp(35),
                            borderRadius: 12,    
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'space-around',
                        }}>
                            <Image source={backIcon} style={style.icon} />
                            <Text style={style.text}>{'Return'}</Text>
                        </View>
                    </TouchableOpacity>    
                    <TouchableOpacity onPress={() => _onPressed()}>
                        <View style={{
                            backgroundColor: theme.colors.dimGray,
                            height:hp(6),
                            width:wp(30),
                            borderRadius: 12,    
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'space-around',
                        }}>
                            <Text style={style.text}>{'OK'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            
           
        </View>
    )
}

const style = StyleSheet.create({
    container: {
      height:hp(100),
      width:wp(100),
      backgroundColor: theme.colors.nightRider,
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'space-around',
      paddingBottom: hp(3)
    },

    content: {
        backgroundColor: theme.colors.silver,
        height:hp(45),
        width:wp(90),
        borderRadius: 10,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-around'
    },

    title: {
        height:hp(10),
        width:wp(70),
        fontSize: 20,
        color: 'black',  
        textAlign: "center",
        textAlignVertical: 'center',      
    },

    space: {
        width: wp(10),
        height: hp(5),
    },

    textinput: {
        height: hp(8),
        width: wp(80),
        borderWidth: 0.5,
        backgroundColor: theme.colors.white,
        borderColor:'black',
        borderRadius: 10,
        color: 'black',
        fontSize:15,
    },

    buttonContainer: {
        width:wp(80),
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around'
    },

    icon: {
        width: wp(6),
        height:hp(6),
        resizeMode:'contain'
    },

    text: {
        fontSize: 20,
        color: 'white',        
    },
});

export default Login    