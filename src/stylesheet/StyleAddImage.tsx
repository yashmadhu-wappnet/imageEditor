import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const StyleAddImage = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addImageContainer: {
    borderRadius: 10,
    height: hp('30%'),
    width: wp('60%'),
    borderWidth: wp('0.2%'),
    // backgroundColor: 'aqua',
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
    // ali,
  },
  editTextContainer: {
    borderBottomColor: '#929292',
    borderBottomWidth: wp('0.2%'),
    // backgroundColor: 'aqua',
  },
  editIconStyle: {
    width: wp('8%'),
    height: wp('8%'),
  },
  editIconContainer: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
  },
  modelImagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modelImagePickerBgContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('5%'),
    width: wp('90%'),
  },
  saveButtonStyle: {
    backgroundColor: '#19c0e4',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('3%'),
  },
  saveTextStyle: {
    textAlign: 'center',
    color: 'white',
  },
});

export {StyleAddImage};
