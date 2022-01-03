//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import StyleHome from '../stylesheet/StyleHome';
// create a component

const Array = [
  {id: 1, project: 'Adding'},
  {id: 2, project: '1322'},
];
const HomeScreen = ({navigation}) => {
  const [projectList, setProjectList] = useState([]);
  const [isProjectModalVisible, setProjectModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isViewExpandable, setViewExpandable] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('saveData').then(value => {
      console.log('AsyncData', value);

      // setProjectList(value);
      // console.log('Array', projectList);

      // if (value != '' || value != null) {
      // setProjectList(value[0][0]);
      // }
      // setProjectList([
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

    setProjectList(temp);
    setProjectName('');
    AsyncStorage.setItem('saveData', JSON.stringify(temp)).then(() => {
      showExpandableview(false);
      showProjectModalVisible(false);
      console.log('ProjectList', projectList);
    });
  };

  const showExpandableview = visible => {
    setViewExpandable(visible);
  };

  return (
    <View style={StyleHome.container}>
      {/* <View style={StyleHome.subContainer}>
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
      </View> */}
      {projectList.length == 0 ? (
        <Text>No Project</Text>
      ) : (
        <View style={StyleHome.projectListContainer}>
          <Text style={StyleHome.titleTextStyle}>Project List</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={projectList}
            renderItem={({item, index}) => (
              <View style={StyleHome.projectListSubContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('EditImageScreen', {name: item})
                  }>
                  <Text>{item.project}</Text>
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
        animationType="fade"
        transparent={true}
        onRequestClose={() => showProjectModalVisible(false)}
        // onOrientationChange={'portrait'}
        visible={isProjectModalVisible}>
        <View style={StyleHome.modelImagePickerContainer}>
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

            {isViewExpandable == false ? (
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
            ) : (
              <View>
                <View style={StyleHome.editTextContainer}>
                  <TextInput
                    value={projectName}
                    placeholder="Add Project"
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
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles

//make this component available to the app
export default HomeScreen;
