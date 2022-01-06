//import liraries
import React, {useEffect} from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// const goToLoginPage = () => navigate('/login');

// create a component
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  });
  // useEffect = () => {

  //   se
  //   [navigation.navigate('Profile', {name: 'Jane'})];
  // };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <ImageBackground
        style={styles.imageContainer}
        // resizeMode="contain"
        source={require('../assets/images/ic_logo.png')}
      />
      <Text>Image Editor</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: 10,
  },
});

//make this component available to the app
export default SplashScreen;
