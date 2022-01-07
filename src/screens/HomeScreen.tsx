//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import realm from '../database/realme';
import StyleHome from '../stylesheet/StyleHome';
const RNFS = require('react-native-fs');
// create a component

const HomeScreen = ({navigation}) => {
  const [projectList, setProjectList] = useState([]);
  const [isProjectModalVisible, setProjectModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isViewExpandable, setViewExpandable] = useState(false);

  useEffect(() => {
    // export const dirPicutures = `${dirHome}/Pictures`;
    // export const dirAudio = `${dirHome}/Audio`;
    navigation.addListener('focus', () => {
      var getdata = realm.objects('ProjectList'); //This realme.objects give us object value.
      console.log('ProjectList ', getdata);

      setProjectList(getdata);

      AsyncStorage.getItem('saveData').then(value => {
        console.log('AsyncData', JSON.parse(value)); // Here JSON.parse is used to Convert String to Object.
        // console.log('Data ', store
      });
    });
  }, []);
  const showProjectModalVisible = visible => {
    setProjectModalVisible(visible);
  };

  const saveProject = (name: string) => {
    var tempObj = {
      id: projectList.length + 1,
      project: name,
    };

    const temp = [...projectList, tempObj];

    // setProjectList(temp);
    console.log('Project temp', temp);

    setProjectName('');

    // for (let i = 0; i < temp.length; i++) {
    realm.write(() => {
      var store = realm.create('ProjectList', {
        id: projectList.length + 1,
        project: name,
      });
    });
    // }

    // AsyncStorage.setItem('saveData', JSON.stringify(temp)).then(() => {
    showExpandableview(false);
    showProjectModalVisible(false);
    // console.log('ProjectList', projectList);
    // });
  };

  const showExpandableview = visible => {
    setViewExpandable(visible);
  };

  return (
    <View style={StyleHome.container}>
      <StatusBar backgroundColor={'white'} />
      {projectList.length == 0 ? (
        <View>
          <Image
            style={StyleHome.emptyListImageStyle}
            source={require('../assets/icons/ic_list.png')}
          />
          <Text style={StyleHome.emptyListTextStyle}>No Project</Text>
        </View>
      ) : (
        <View style={StyleHome.projectListContainer}>
          <Text style={StyleHome.titleTextStyle}>Project List</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={projectList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={StyleHome.projectListSubContainer}>
                <TouchableOpacity
                  style={StyleHome.subContainer}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('EditImageScreen', {name: item})
                  }>
                  <Text style={{flex: 1}}>{item.project}</Text>
                  <Image
                    source={require('../assets/icons/ic_next.png')}
                    style={StyleHome.nextIconStyle}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <TouchableOpacity
        style={StyleHome.addProjectContainer}
        onPress={() => showProjectModalVisible(true)}>
        <Image
          style={StyleHome.addProjectIconStyle}
          source={require('../assets/icons/ic_plus.png')}
        />
      </TouchableOpacity>

      <Modal
        animated
        animationType="slide"
        transparent={true}
        onRequestClose={() => showProjectModalVisible(false)}
        // onOrientationChange={'portrait'}
        visible={isProjectModalVisible}>
        <TouchableOpacity
          onPress={() => showProjectModalVisible(false)}
          style={StyleHome.modelImagePickerContainer}>
          <View style={StyleHome.modelImagePickerBgContainer}>
            <TouchableOpacity
              style={StyleHome.closeModalContainer}
              activeOpacity={0.7}
              onPress={() => showProjectModalVisible(false)}>
              <Image
                style={StyleHome.removeIcon}
                source={require('../assets/icons/ic_close.png')}
              />
            </TouchableOpacity>

            {/* {isViewExpandable == false ? (
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => showExpandableview(true)}>
                  <View style={StyleHome.subContainer}>
                    <Image
                      style={StyleHome.folderIconStyle}
                      source={require('../assets/icons/ic_folder.png')}
                    />
                    <Text style={StyleHome.textStyle}>Create Project</Text>
                  </View>
                </TouchableOpacity>
                <View style={StyleHome.subContainer}>
                  <Image
                    style={StyleHome.folderIconStyle}
                    source={require('../assets/icons/ic_folder.png')}
                  />
                  <Text style={StyleHome.textStyle}>Open Project</Text>
                </View>
              </View>
            ) : ( */}
            <View>
              <View style={StyleHome.editTextContainer}>
                <TextInput
                  value={projectName}
                  placeholder="Create Project"
                  numberOfLines={1}
                  onChangeText={projectName => setProjectName(projectName)}
                  returnKeyType="done"></TextInput>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => saveProject(projectName)}
                style={StyleHome.saveButtonStyle}>
                <Text style={StyleHome.saveTextStyle}>Save</Text>
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// define your styles

//make this component available to the app
export default HomeScreen;
