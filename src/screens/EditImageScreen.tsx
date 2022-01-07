//import liraries
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
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
  const [profileImage, setprofileImage] = useState(null);
  const [resourcePath, setResourcePath] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [top, setTop] = useState('');
  const [left, setLeft] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const [isEditImageModalVisible, setEditImageModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const [addDescription, setDescription] = useState('');
  const [incrementId, setIncrementId] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isImageUpload, setImageUpload] = useState(false);

  const {name} = route.params;

  console.log('Get Params from one to other Screen', name);

  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('First ', typeof tagList);

      var checkData = realm.objects('ImageList');
      console.log('ImageList', checkData);

      var storeDes = checkData.find((item, index) => {
        if (item.projectId == name.id) {
          return item;
        }
      });
      console.log('CSSSS', storeDes);

      if (storeDes != undefined) {
        setprofileImage(storeDes.image);
        setDescription(storeDes.description);

        var saveTagList = realm.objects('TagList');

        console.log('Tagt', saveTagList);

        var showTagList = realm
          .objects('TagList')
          .filtered(`imageId="${storeDes.imageId}"`);

        console.log('TAGGGG', typeof showTagList);
        setTagList(showTagList);
        // setImageUpload(storeDes.image);
      }

      setprojectName(name.project);

      var saveTagList = realm.objects('TagList');

      var get = saveTagList.map((item, index) => {
        return item.tagId;
      });
      console.log('Max', get);

      var getId = Math.max(...get);
      console.log('Max Id', getId, incrementId, tagList.length);

      setIncrementId(getId);
      // setprofileImage(name.image);
    });
  }, [tagList]);

  useEffect(() => {
    // removeUser;
  }, [profileImage]);
  const setLoaderState = loaderState => {
    setLoading(loaderState);
  };

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
        console.log('response', JSON.stringify(response.uri));

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
        tagId: tagList.length + 1,
        addMessage: message,
      };
      setTagList(tagList.concat([newView]));

      addTagList(message, top, left);

      // var getTagList = realm.objects('TagList');

      // for (let i = 0; i < getTagList.length; i++) {
      //   if (getTagList[i].tagId == incrementId) {
      //     getTagList.tagId = i + 1;
      //   }
      //   console.log('Final', getTagList);
      // }
      // realm.write(() => {
      //   var store = realm.create('TagList', {
      //     tagId: getTagList.length + 1,
      //     imageId: name.id,
      //     locationX: left,
      //     locationY: top,
      //     addMessage: message,
      //   });
      // });
    } else {
      // console.log('ERRRRRR');

      editTagList(message, top, left);
      var tempList = list;
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].tagId == id) {
          tempList[i].addMessage = message;
          // console.log('Here', tempList[i]);
          setId(null);
        }
      }
    }
    setAddMessage('');
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
          RNFS.moveFile(filePath, newFilepath)
            .then(() => {
              setLoaderState(true);

              console.log('FILE MOVED', filePath, newFilepath);
              resolve(true);

              realm.write(() => {
                var imageTable = realm.create('ImageList', {
                  imageId: name.id,
                  projectId: name.id,
                  description: description,
                  image: newFilepath,
                });
                console.log('Check DATA', imageTable);
              });
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

    if (description === '') {
      ToastAndroid.show('Please Enter Description', ToastAndroid.SHORT);
    } else if (profileImage == '' || profileImage == null) {
      ToastAndroid.show('Please Add Image', ToastAndroid.SHORT);
    } else {
      const newImageName = profileImage.fileName;
      const newFilepath = `${dirPicutures}/${newImageName}`;
      const imageMoved = await moveAttachment(
        profileImage.path,
        newFilepath,
        description,
      );
      console.log('image moved', imageMoved);
    }
  };

  const addTagList = (message, top, left) => {
    var getTagList = realm.objects('TagList');

    for (let i = 0; i < getTagList.length; i++) {
      if (getTagList[i].tagId == incrementId) {
        getTagList.tagId = i + 1;
      }
    }

    realm.write(() => {
      var store = realm.create('TagList', {
        tagId: getTagList.length + 1,
        imageId: name.id,
        locationX: left,
        locationY: top,
        addMessage: message,
      });
    });
  };

  const editTagList = (message, top, left) => {
    var getTagList = realm.objects('TagList');

    // console.log('Final', getTagList);
    realm.write(() => {
      getTagList.map((item, index) => {
        if (item.tagId == id) {
          item.addMessage = message;
        }
      });
    });
  };

  const setEditImageModal = visible => {
    setEditImageModalVisible(visible);
  };

  const saveMessage = message => {
    Keyboard.dismiss();

    setAddMessage(message);
    setEditImageModalVisible(false);
    tagUser(message, tagList, top, left);
  };

  const editUser = editdata => {
    console.log('CEEE', editdata);

    setAddMessage(editdata.addMessage);

    // if(id ==)
    setId(editdata.tagId);

    // setId()
    setEditImageModal(true);
  };

  const removeUser = (user, index) => {
    console.log('Before', index, typeof tagList, tagList);

    // delete tagList[tagList[index]];

    // let store = JSON.stringify(tagList);
    // var store1 = JSON.parse(store);
    // // const checkdata = store.splice(index, 1);
    // console.log('After', store1, tagList);

    // var store = JSON.parse(tagList);
    setTagList(tagList);
    // user.splice(index, 1);
    removeTagListFromDatabase(user.tagId);

    // setTagList([...tempUser]);
  };

  const removeTagListFromDatabase = deleteId => {
    var getTagList = realm.objects('TagList');
    console.log('Final', getTagList, deleteId);

    var deleteList = getTagList.filter((item, index) => {
      // console.log('ITEM', item, index);
      if (item.tagId === deleteId) return item;
    });
    console.log('DEEEE', deleteList);

    realm.write(() => {
      realm.delete(deleteList);
    });
  };

  const dynamicStyle = data => {
    // console.log('Data', data);

    let setData = (screenWidth * data.locationX) / 100;
    let setTopData = (screenHeight * data.locationY) / 100;

    // console.log('Show Posi', top, left, tagList);

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
              returnKeyType="none"
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
                // resizeMode="contain"
                style={StyleEditImage.addImageContainer}
                source={
                  //  This is set for image // {
                  //   uri:
                  //     name.image != ''
                  //       ? 'file://' + name.image
                  //       : 'file://' + profileImage.path,
                  // }
                  resourcePath === null
                    ? {uri: 'file://' + profileImage}
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
            (list, index) => (
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
                        removeUser(list, index);
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
            <TouchableOpacity
              style={StyleEditImage.modelImagePickerContainer}
              onPress={() => setEditImageModal(false)}>
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
            </TouchableOpacity>
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
      {/* {isLoading && ( */}
      <ActivityIndicator
        size="large"
        color={'#00ff00'}
        style={StyleEditImage.loaderStyle}
      />
      {/* )} */}
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
