import * as React from "react" 
import { StyleSheet, Text, View } from "react-native";
import Slider from "react-native-hook-image-slider"
import { SliderBox } from "react-native-image-slider-box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HomeScreen = () => {
  return (
    <View
      style={{    flex: 1,
        height:hp(100),
        width:wp(100),
       justifyContent: 'center',
      }}>
      <SliderBox
        sliderBoxHeight={hp(100)}
        autoplay
        circleLoop
        parentWidth={wp(100)}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)"
        }}
         images={[
          'http://i.imgur.com/XP2BE7q.jpg',
          'http://i.imgur.com/5nltiUd.jpg',
          'http://i.imgur.com/6vOahbP.jpg',
          'http://i.imgur.com/kj5VXtG.jpg',
          'http://i.imgur.com/BN8RVGa.jpg',
          'http://i.imgur.com/jXbhTbv.jpg',
          'http://i.imgur.com/30s12Qj.jpg',
          'http://i.imgur.com/4A1Q49y.jpg',
          'http://i.imgur.com/JfVDTF9.jpg',
          'http://i.imgur.com/Vv4bmwR.jpg',
        ]}
      />
    </View>
  )

}

export default HomeScreen;