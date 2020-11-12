import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { theme } from '../utils/theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function Header() {

    return (
        <View style={{
            backgroundColor: theme.colors.blackRussian,
            height:hp(9),
            width:wp(90),
            color: 'white',  
            borderWidth: 0.3, 
            borderColor: theme.colors.white,
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-around'
        }}>
            <View style={{
                    width: wp(50), 
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent:'space-around',
                }}>
                <Text style={{
                    backgroundColor: theme.colors.neonPink,
                    height:hp(8),
                    width:wp(25),
                    fontSize: 45,
                    color: theme.colors.nightRider,   
                    textAlign: "center",
                    textAlignVertical: 'center',
                    flexDirection: 'column',
                    alignItems:'center',
                    justifyContent:'space-around',
                    fontWeight: 'bold',
                }}>Ad</Text>
                <Text style={{
                    height:hp(8),
                    width:wp(25),
                    borderWidth: 0.2,
                    fontSize: 45,
                    color: theme.colors.white,   
                    textAlign: "center",
                    textAlignVertical: 'center',
                    flexDirection: 'column',
                    alignItems:'center',
                    justifyContent:'space-around',
                    fontWeight: 'bold',
                }}>Mobi</Text>
            </View>
        </View>  
    )
}

export default Header    