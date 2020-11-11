import * as React from "react"
import { StyleSheet, Text, View } from "react-native";
import Slider from "react-native-hook-image-slider"
import { SliderBox } from "react-native-image-slider-box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TimedSlideshow from 'react-native-timed-slideshow';
import { PanGestureHandler } from 'react-native-gesture-handler' 
const HomeScreen = () => { 

	const handleGesture = (e) => {
	 
		console.log('out test scree' )
	  }

		const items = [
			{
				uri: "http://i.imgur.com/XP2BE7q.jpg", 
			},
			{
				uri:  "http://i.imgur.com/6vOahbP.jpg", 
				duration: 3000
			},
			{
				uri:  "http://i.imgur.com/5nltiUd.jpg",
				fullWidth: true
			},
			{
				uri: "http://i.imgur.com/kj5VXtG.jpg", 
			},
			{
				uri:  "http://i.imgur.com/BN8RVGa.jpg", 
				duration: 3000
			},
			{
				uri:  "http://i.imgur.com/jXbhTbv.jpg",
				fullWidth: true 
			},
			{
				uri:  "http://i.imgur.com/30s12Qj.jpg", 
				duration: 3000
			},
			{
				uri:  "http://i.imgur.com/4A1Q49y.jpg",
				fullWidth: true 
			},
			{
				uri:  "http://i.imgur.com/JfVDTF9.jpg", 
				duration: 3000
			},
			{
				uri:  "http://i.imgur.com/Vv4bmwR.jpg",
				fullWidth: true
			}
		]

		return (  <PanGestureHandler onHandlerStateChange={handleGesture}> 
			<TimedSlideshow
				items={items}
			/>

			</PanGestureHandler>
		);
 

}

export default HomeScreen;