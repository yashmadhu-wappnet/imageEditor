//import liraries
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker/lib/commonjs';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// create a component
const EditImageScreen = ({route, navigation}) => {
  const [projectName, setprojectName] = useState(false);
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
    setprojectName(name.project);
  }, [tagList]);

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
        setprofileImage(response.uri);
      }
    });
  };

  // const saveProject = (name: string) => {
  //   var tempObj = {
  //     id: projectList.length + 1,
  //     project: name,
  //   };

  //   const temp = [...projectList, tempObj];

  //   setProjectList(temp);
  //   setProjectName('');
  //   AsyncStorage.setItem('saveData', JSON.stringify(temp)).then(() => {
  //     showExpandableview(false);
  //     showProjectModalVisible(false);
  //     console.log('ProjectList', projectList);
  //   });
  // };

  const tagUser = (message, list, top, left) => {
    console.log('Updated', id, message, top, left);

    if (id == null) {
      // setTagList([
      //   ...tagList,
      //   {
      //     locationX: left,
      //     locationY: top,
      //     id: tagList.length + 1,
      //     addMessage: message,
      //   },
      // ]);
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
    // }
    // setEditImageModal(true);
  };

  const setEditImageModal = visible => {
    setEditImageModalVisible(visible);
  };

  const saveMessage = message => {
    setAddMessage(message);

    setEditImageModalVisible(false);

    // console.log('C=Posu', );

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
    <View style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContentContainer}> */}
      <Text style={styles.titleTextStyle}>{projectName}</Text>
      <View style={styles.addDescriptionContainer}>
        <TextInput
          style={styles.addDescriptionTextStyle}
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
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addImageContainer}
          onPress={() => setImagePickerModalVisible()}>
          <Image
            style={styles.addIconStyle}
            source={require('../assets/icons/ic_plus.png')}
          />
          <Text style={styles.addTextStyle}>Upload Image</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={event => handlePress(event)}>
          <Image
            resizeMode="cover"
            style={styles.addImageContainer}
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
      {/* <View style={styles.imageContainer}>
        <TouchableWithoutFeedback onPress={event => handlePress(event)}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/icons/ic_plus.png')}
          />
        </TouchableWithoutFeedback>
      </View> */}
      {tagList.map(
        list => (
          console.log('list', list.addMessage),
          (
            <View key={list.id} style={dynamicStyle(list)}>
              <View style={styles.tagTriangle}></View>
              <View style={styles.tagUserView}>
                <Text style={styles.tagListText}> {list.addMessage} </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={list.id}
                  style={styles.removeTagUser}
                  onPress={() => {
                    editUser(list);
                  }}>
                  <Image
                    style={styles.removeIcon}
                    source={require('../assets/icons/ic_edit.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={list.id}
                  style={styles.removeTagUser}
                  onPress={() => {
                    removeUser(list);
                  }}>
                  <Image
                    style={styles.removeIcon}
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
        <View style={styles.modelImagePickerContainer}>
          <View style={styles.modelImagePickerBgContainer}>
            <TouchableOpacity
              style={styles.closeModalContainer}
              activeOpacity={0.7}
              onPress={() => setEditImageModalVisible(false)}>
              <Image
                style={styles.removeIcon}
                source={require('../assets/icons/ic_close.png')}
              />
            </TouchableOpacity>
            <View style={styles.editTextContainer}>
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
              style={styles.saveButtonStyle}>
              <Text style={styles.saveTextStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </ScrollView> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
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
    // backgroundColor: 'aqua',
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
    height: hp('75%'),
    marginVertical: hp('2%'),
    // flex:1,,
    width: wp('90%'),
    // flex: 1,
    borderWidth: wp('0.2%'),
    backgroundColor: 'aqua',
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

  modelImagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modelImagePickerBgContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('2%'),
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
  editTextContainer: {
    borderBottomColor: '#929292',
    borderBottomWidth: wp('0.2%'),
    // backgroundColor: 'aqua',
  },
});

//make this component available to the app
export default EditImageScreen;
