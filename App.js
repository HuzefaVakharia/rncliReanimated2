/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
//import liraries








/* 

what is use of interpolate in reanimated in React native?

Sometimes you need to map a value from one range to another. This is where you should use the interpolate function which approximates values between points in the output range and lets you map a value inside the input range to a corresponding approximation in the output range.

The interpolate do not work well with withTiming() function, so always use interpolate only without any function like this:

animation.value=1;

or with withSpring() function like this:

animation.value=withSpring(1);

But do not use interpolate with withTiming() function like this:

animation.value=withTiming(1,{duration:1000});



Ref: https://www.youtube.com/watch?v=ddye_L0Azm8&t=81s

*/








import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, interpolateColor, withTiming } from 'react-native-reanimated';
// create a component
const App = () => {
  const animation=useSharedValue(1);
  const widthForInterpolate=interpolate(animation.value,[1,0],[100,200]);
  const borderRadiusForInterpolate=interpolate(animation.value,[1,0],[0,100]);
  const backgroundColorForInterpolate=interpolateColor(animation.value,[1,0],['orange','purple']);
  const [clicked,setClicked]=useState(true);
  /* const animatedStyle=useAnimatedStyle(()=>{
    return {
      width:animation.value==1?100:200,
      height:animation.value==1?100:200,
    };
  }) */

  const animatedStyle=useAnimatedStyle(()=>{
    return {
      width:widthForInterpolate,
      height:widthForInterpolate,
      backgroundColor:backgroundColorForInterpolate,
      borderRadius:borderRadiusForInterpolate,
    };
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[{width:100,height:100,backgroundColor:'orange'},animatedStyle]}></Animated.View>
      <TouchableOpacity 
      style={{borderWidth: 1,width:200,height:50,justifyContent: 'center',alignItems:'center',marginTop:30}}
      onPress={()=>{
        if(clicked){
          //animation.value=1;
          animation.value=withSpring(1);
          //animation.value=withTiming(1,{duration:1000});
          
        }else{
          //animation.value=0;
          animation.value=withSpring(0);
          //animation.value=withTiming(0,{duration:1000});
        }
        setClicked(!clicked);
        }}
      >
        <Text>Start Animation</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f0ec0b',
  },
});

//make this component available to the app
export default App;
