import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { theme } from '../utils/theme'
import Card from '../components/card'
import Header from './Header'
import {downloadIcon, backIcon}  from '../assets'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



function Server({ navigation }) {

    const goNavigation = link => {
        navigation.navigate(link)
    }

    const _onPressed = () => {
        goNavigation('Home')
    }

    const checkbox =  <Card image={downloadIcon} text={'Toca do Malte'}  textStyle={style.textContainer} />

    const [data, setData] = useState([
        checkbox,
    ]);

    return (
        <View style={style.container}>
            <Header />
            <Text style={style.title}>My Drive + Shared Folders</Text>
            <Table 
                borderStyle={{borderWidth: 0.3, borderColor: theme.colors.white}} 
                style={style.table}>
                <Row data={data} style={style.row} textStyle={style.text} />  
                <Row data={data} style={style.row} textStyle={style.text} />  
                <Row data={data} style={style.row} textStyle={style.text} />  
                <Row data={data} style={style.row} textStyle={style.text} />  
                <Row data={data} style={style.row} textStyle={style.text} />  
                <Row data={data} style={style.row} textStyle={style.text} />  
            </Table>

            <View style={style.buttonContainer}>
                <TouchableOpacity onPress={() => goNavigation('Home')}>
                    <View style={{
                        backgroundColor: theme.colors.dimGray,
                        height:hp(6),
                        width:wp(30),
                        borderRadius: 12,    
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent:'space-around',
                    }}>
                        <Text style={style.text}>{'Cancel'}</Text>
                    </View>
                </TouchableOpacity>    
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: hp(100),
        width: wp(100),
        backgroundColor: theme.colors.nightRider,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-around',
        paddingBottom: hp(4)
    },

    table: {
        height: hp(70),
        width: wp(90),
        borderWidth: 0.3,
        borderColor: theme.colors.white,
        alignContent: "center",
        paddingBottom: hp(3)
    },

    row: { 
        height: hp(8),
        width: wp(90),
        borderWidth: 0.3,
        borderBottomColor: theme.colors.white,
        alignContent: "center",
    },

    content: { 
        height: hp(5),
        width: wp(80),
        alignContent: "center",
    },
    
    text: { 
        fontSize: 15,
        color: 'white', 
        textAlign: 'center'      
    },

    title: {
        height:hp(3),
        fontSize: 16,
        color: 'white', 
        textAlign: 'left'       
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

export default Server    