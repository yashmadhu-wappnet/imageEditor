import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const StyleHome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyListImageStyle: {
    height: wp('40%'),
    width: wp('40%'),
    marginVertical: hp('1%'),
    // alignSelf: 'center',
  },
  emptyListTextStyle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  projectListContainer: {
    marginVertical: hp('4%'),
    justifyContent: 'center',
    flex: 1,
  },
  titleTextStyle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  projectListSubContainer: {
    borderWidth: wp('0.2%'),
    // backgroundColor: 'aqua',
    // flexDirection: 'row',
    width: wp('90%'),
    borderColor: '#929292',
    marginVertical: hp('1%'),
    padding: wp('2%'),
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 15,
    flex: 1,
    marginHorizontal: wp('2%'),
    // backgroundColor: 'aqua',
  },

  nextIconStyle: {
    width: wp('5%'),
    height: wp('5%'),
  },
  folderIconStyle: {
    width: wp('8%'),
    height: wp('8%'),
  },
  addProjectContainer: {
    alignSelf: 'flex-end',
    // marginRight: wp('3%'),
    // marginTop: hp('16%'),
    position: 'absolute',
    // top: 0,
    bottom: 20,
    right: 20,
    // backgroundColor: 'red',
  },
  addProjectIconStyle: {
    width: wp('10%'),
    height: wp('10%'),
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
    padding: wp('3%'),
    width: wp('90%'),
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
  editTextContainer: {
    borderWidth: wp('0.2%'),
    borderColor: '#929292',
    borderRadius: 5,
  },
});

export default StyleHome;
