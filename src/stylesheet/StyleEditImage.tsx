import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StyleEditImage = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: wp('5%'),
    backgroundColor: 'white',
  },
  scrollContentContainer: {
    zIndex: 1,
    // backgroundColor: 'red',
    width: wp('100%'),
    height: hp('100%'),
  },
  titleTextStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: hp('2%'),
  },
  addDescriptionContainer: {
    borderWidth: wp('0.2%'),
    // backgroundColor: 'aqua',
    borderRadius: 5,
    width: wp('90%'),
    height: hp('15%'),
    //  margin:
    borderBottomColor: '#929292',
  },
  addDescriptionTextStyle: {
    textAlignVertical: 'top',
  },
  imageContainer: {
    height: screenHeight / 2,
    position: 'absolute',
  },
  imageStyle: {
    width: screenWidth,
    height: screenHeight / 2,
  },
  tagTriangle: {
    height: 0,
    width: 0,
    left: 15,
    borderLeftColor: 'transparent',
    borderLeftWidth: 7,
    borderRightColor: 'transparent',
    borderRightWidth: 7,
    borderBottomColor: 'rgba(0,0,0,.30)',
    borderBottomWidth: 7,
  },
  tagUserView: {
    backgroundColor: 'rgba(0,0,0,.30)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.30)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
  },
  tagListText: {
    color: 'white',
    fontWeight: '800',
  },
  removeTagUser: {
    backgroundColor: 'white',
    height: wp('5%'),
    width: wp('5%'),
    marginLeft: 5,
    borderRadius: 15,
  },
  closeModalContainer: {
    backgroundColor: 'white',
    height: wp('7%'),
    width: wp('7%'),
    marginLeft: 5,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  removeIcon: {
    height: wp('5%'),
    width: wp('5%'),
  },
  closeIconStyle: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginRight: 10,
  },

  addImageContainer: {
    borderRadius: 10,
    height: hp('65%'),
    marginVertical: hp('2%'),
    // flex:1,,
    width: wp('90%'),
    // flex: 1,
    borderWidth: wp('0.2%'),
    backgroundColor: 'white',
    borderColor: '#929292',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconStyle: {
    width: wp('8%'),
    height: wp('8%'),
    alignSelf: 'center',
  },
  addTextStyle: {
    textAlign: 'center',
  },

  modelImagePickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modelImagePickerBgContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp('2%'),
    width: wp('100%'),
  },
  saveButtonStyle: {
    backgroundColor: '#19c0e4',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('3%'),
  },
  saveDataContainer: {
    backgroundColor: '#19c0e4',
    borderRadius: 5,
    marginBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginVertical: hp('3%'),
  },
  saveTextStyle: {
    textAlign: 'center',
    color: 'white',
  },
  editTextContainer: {
    borderBottomColor: '#929292',
    borderBottomWidth: wp('0.2%'),
    // backgroundColor: 'aqua',
  },
  loaderStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default StyleEditImage;
