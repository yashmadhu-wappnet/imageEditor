//import liraries
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker/lib/commonjs';
import {dirPicutures} from '../database/dirStorage';
import realm from '../database/realme';
import StyleEditImage from '../stylesheet/StyleEditImage';
const RNFS = require('react-native-fs');

// import StyleEditImage from '../StyleEditImageheet/StyleEditImage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// create a component
const EditImageScreen = ({route, navigation}) => {
  const [projectName, setprojectName] = useState('');
  const [profileImage, setprofileImage] = useState('');
  const [resourcePath, setResourcePath] = useState('');
  const [tagList, setTagList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [top, setTop] = useState('');
  const [left, setLeft] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const [isEditImageModalVisible, setEditImageModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const [addDescription, setDescription] = useState('');

  const {name} = route.params;

  console.log('Get Params from one to other Screen', name);

  useEffect(() => {
    console.log('Check folder', dirPicutures, name.image);

    navigation.addListener('focus', () => {
      // RNFS.mkdir(dirPicutures);

      setprojectName(name.project);
      setDescription(name.description);
      setprofileImage(name.image);

      var data = realm.objects('ProjectList');
      console.log('Check Imae', data);
    });
  }, [tagList]);

  const setImagePickerModalVisible = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));

        setResourcePath(response);
        setprofileImage(response);

        // pickedImage: {
        //     uri: res.uri,
        //     data: res.data,
        //     name: res.fileName,
        //     type: res.type,
        //   },
      }
    });
  };

  const tagUser = (message, list, top, left) => {
    console.log('Updated', id, message, top, left);

    if (id == null) {
      let newView = {
        locationX: left,
        locationY: top,
        id: tagList.length + 1,
        addMessage: message,
      };
      setTagList(tagList.concat([newView]));
    } else {
      var tempList = list;
      console.log('Check Id', id);

      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].id == id) {
          tempList[i].addMessage = message;
          console.log('Here', tempList[i]);
          setId(null);
        }
      }
      console.log('Updates', tempList);
    }

    // let newView = {
    //   locationX: left,
    //   locationY: top,
    //   id: tagList.length + 1,
    //   addMessage: message,
    // };

    // setTagList(tagList.concat([newView]));

    setAddMessage('');
    // setId(null);
  };

  const handlePress = evt => {
    setTop((evt.nativeEvent.locationY * 100) / screenHeight);
    setLeft((evt.nativeEvent.locationX * 100) / screenWidth);

    console.log('Post', top, left);
    // if (top != '' && left != '') {
    setEditImageModal(true);
  };

  //move the attachment to app folder
  const moveAttachment = async (filePath, newFilepath, description) => {
    console.log('Check Path', filePath, newFilepath);

    return new Promise((resolve, reject) => {
      RNFS.mkdir(dirPicutures)
        .then(() => {
          console.log('Check Here');
          RNFS.moveFile(filePath, newFilepath)
            .then(() => {
              console.log('FILE MOVED', filePath, newFilepath);
              resolve(true);

              var store = realm.objects('ProjectList');

              if (description === '') {
                ToastAndroid.show(
                  'Please Enter Description',
                  ToastAndroid.SHORT,
                );
              } else if (resourcePath === '') {
                ToastAndroid.show('Please Add Image', ToastAndroid.SHORT);
              } else {
                realm.write(() => {
                  let getData = store;
                  getData.map((item, index) => {
                    if (item.id === name.id) {
                      item.description = description;
                      item.image = newFilepath;
                    }
                  });
                  console.log('Check Entry', getData);
                });
              }
            })
            .catch(error => {
              console.log('moveFile error', error);
              reject(error);
            });
        })
        .catch(err => {
          console.log('mkdir error', err);
          reject(err);
        });
    });
  };

  const saveData = async description => {
    console.log('Get Id', profileImage);

    const newImageName = profileImage.fileName;
    const newFilepath = `${dirPicutures}/${newImageName}`;
    const imageMoved = await moveAttachment(
      profileImage.path,
      newFilepath,
      description,
    );
    console.log('image moved', imageMoved);

    // var store = realm.objects('ProjectList').filtered(`id = ${.id}`);
  };

  const setEditImageModal = visible => {
    setEditImageModalVisible(visible);
  };

  const saveMessage = message => {
    setAddMessage(message);

    setEditImageModalVisible(false);

    tagUser(message, tagList, top, left);
  };

  const editUser = editdata => {
    setAddMessage(editdata.addMessage);
    setId(editdata.id);

    setEditImageModal(true);
  };

  const removeUser = user => {
    console.log('Userdata', user);

    let tempUser = tagList;
    let index = _.findIndex(tempUser, function (o) {
      return o.id == user.id;
    });
    tempUser.splice(index, 1);
    setTagList([...tempUser]);
    // console.log('After', tempUser, tagList);
    // this.setState({tagList: tempUser});
  };

  const dynamicStyle = data => {
    console.log('Data', data);

    let setData = (screenWidth * data.locationX) / 100;
    let setTopData = (screenHeight * data.locationY) / 100;

    console.log('Show Posi', top, left, tagList);

    return {
      position: 'absolute',
      top: setTopData + 150,
      left: setData,
      justifyContent: 'center',
    };
  };

  return (
    <View style={StyleEditImage.container}>
      <StatusBar backgroundColor={'white'} />
      <Text style={StyleEditImage.titleTextStyle}>{projectName}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={StyleEditImage.scrollContentContainer}>
        <View style={{alignItems: 'center'}}>
          {/* <Text style={StyleEditImage.titleTextStyle}>{projectName}</Text> */}
          <View style={StyleEditImage.addDescriptionContainer}>
            <TextInput
              style={StyleEditImage.addDescriptionTextStyle}
              value={addDescription}
              placeholder="Add Description"
              numberOfLines={5}
              // maxLength={2}
              multiline={true}
              onChangeText={addDescription => setDescription(addDescription)}
              returnKeyType="done"
            />
          </View>
          {profileImage == null || profileImage == '' ? (
            <View style={StyleEditImage.addImageContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                // style={StyleEditImage.addImageContainer}
                onPress={() => setImagePickerModalVisible()}>
                <Image
                  style={StyleEditImage.addIconStyle}
                  source={require('../assets/icons/ic_plus.png')}
                />
                <Text style={StyleEditImage.addTextStyle}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={event => handlePress(event)}>
              <Image
                resizeMode="cover"
                style={StyleEditImage.addImageContainer}
                source={
                  // {
                  //   uri: 'file://' + setprofileImage,
                  // }
                  resourcePath === null
                    ? {
                        uri: 'file://' + name.image,
                      }
                    : {
                        uri: 'data:image/jpeg;base64,' + resourcePath.data,
                      }
                }
              />
            </TouchableOpacity>
          )}
          {/* <View style={StyleEditImage.imageContainer}>
        <TouchableWithoutFeedback onPress={event => handlePress(event)}>
          <Image
            style={StyleEditImage.imageStyle}
            source={require('../assets/icons/ic_plus.png')}
          />
        </TouchableWithoutFeedback>
      </View> */}
          {tagList.map(
            list => (
              console.log('list', list.addMessage),
              (
                <View key={list.id} style={dynamicStyle(list)}>
                  <View style={StyleEditImage.tagTriangle}></View>
                  <View style={StyleEditImage.tagUserView}>
                    <Text style={StyleEditImage.tagListText}>
                      {list.addMessage}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={list.id}
                      style={StyleEditImage.removeTagUser}
                      onPress={() => {
                        editUser(list);
                      }}>
                      <Image
                        style={StyleEditImage.removeIcon}
                        source={require('../assets/icons/ic_edit.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={list.id}
                      style={StyleEditImage.removeTagUser}
                      onPress={() => {
                        removeUser(list);
                      }}>
                      <Image
                        style={StyleEditImage.removeIcon}
                        source={require('../assets/icons/ic_remove.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            ),
          )}
          <Modal
            animated
            animationType="fade"
            transparent={true}
            onRequestClose={() => setEditImageModal(false)}
            // onOrientationChange={'portrait'}
            visible={isEditImageModalVisible}>
            <View style={StyleEditImage.modelImagePickerContainer}>
              <View style={StyleEditImage.modelImagePickerBgContainer}>
                <TouchableOpacity
                  style={StyleEditImage.closeModalContainer}
                  activeOpacity={0.7}
                  onPress={() => setEditImageModalVisible(false)}>
                  <Image
                    style={StyleEditImage.removeIcon}
                    source={require('../assets/icons/ic_close.png')}
                  />
                </TouchableOpacity>
                <View style={StyleEditImage.editTextContainer}>
                  <TextInput
                    value={addMessage}
                    placeholder="Add Message"
                    numberOfLines={1}
                    onChangeText={addMessage => setAddMessage(addMessage)}
                    returnKeyType="done"></TextInput>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    saveMessage(addMessage);
                  }}
                  style={StyleEditImage.saveButtonStyle}>
                  <Text style={StyleEditImage.saveTextStyle}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          saveData(addDescription);
        }}
        style={StyleEditImage.saveDataContainer}>
        <Text style={StyleEditImage.saveTextStyle}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your StyleEditImage

//make this component available to the app
export default EditImageScreen;

// This is Example of realm Database
// const saveData = () => {
//   for (let i = 0; i < 3; i++) {
//     realm.write(() => {
//       const book = realm.create('Book', {
//         title: 'Barry Butter' + i,
//         pages: 400,
//       });
//     });
//     console.log('Check Entry', book);
//   }
// };
