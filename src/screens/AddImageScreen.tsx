//import liraries
import React, {useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker/lib/commonjs';
import {StyleAddImage} from '../stylesheet/StyleAddImage';
// import * as StyleAddImage from '../stylesheet/StyleAddImage';

// create a component
const AddImageScreen = ({navigation}) => {
  const [profileImage, setprofileImage] = useState('');
  const [resourcePath, setResourcePath] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const [isMarkerVisible, setMarkerVisible] = useState(false);
  const [isEditImageModalVisible, setEditImageModalVisible] = useState(false);

  const setImagePickerModalVisible = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    console.log('Here');
    ImagePicker.launchCamera(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        // const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setResourcePath(response.data);
        setprofileImage(
          response.uri,
          //  response.data,
          // res.fileName
        );
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri,
        // });
      }
    });
  };

  const showMarker = visible => {
    setMarkerVisible(visible);
  };

  const setEditImageModal = visible => {
    setEditImageModalVisible(visible);
  };

  const saveMessage = message => {
    console.log('Show', message);

    setEditImageModalVisible(false);
    setAddMessage(message);
  };

  return (
    <View style={StyleAddImage.container}>
      {profileImage == null || profileImage == '' ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={StyleAddImage.addImageContainer}
          onPress={() => setImagePickerModalVisible()}>
          <Image
            style={StyleAddImage.addIconStyle}
            source={
              require('../assets/icons/ic_plus.png')
              // profileImage == null || profileImage == ''
              //   ? require('../assets/icons/ic_plus.png')
              //   : resourcePath == null
              //   ? {uri: profileImage}
              //   : {
              //       uri: 'data:image/jpeg;base64,' + resourcePath,
              //     }
            }
          />
          <Text style={StyleAddImage.addTextStyle}>Upload Image</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={() => navigation.navigate('EditImageScreen')}
          onLongPress={() => showMarker(true)}>
          <Image
            style={StyleAddImage.addImageContainer}
            source={
              resourcePath == null
                ? {uri: profileImage}
                : {
                    uri: 'data:image/jpeg;base64,' + resourcePath,
                  }
            }
          />
        </TouchableOpacity>
      )}

      {isMarkerVisible && (
        <TouchableOpacity
          onPress={() => setEditImageModal(true)}
          style={StyleAddImage.editIconContainer}>
          <Image
            style={StyleAddImage.editIconStyle}
            source={require('../assets/icons/ic_edit.png')}
          />
        </TouchableOpacity>
      )}

      <Modal
        animated
        animationType="fade"
        transparent={true}
        onRequestClose={() => setEditImageModal(false)}
        // onOrientationChange={'portrait'}
        visible={isEditImageModalVisible}>
        <View style={StyleAddImage.modelImagePickerContainer}>
          <View style={StyleAddImage.modelImagePickerBgContainer}>
            <View style={StyleAddImage.editTextContainer}>
              <TextInput
                value={addMessage}
                placeholder="Add Message"
                onChangeText={addMessage => setAddMessage(addMessage)}
                returnKeyType="done"></TextInput>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => saveMessage(addMessage)}
              style={StyleAddImage.saveButtonStyle}>
              <Text style={StyleAddImage.saveTextStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

//make this component available to the app
export default AddImageScreen;
