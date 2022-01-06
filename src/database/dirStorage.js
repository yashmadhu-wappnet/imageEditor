import {Platform} from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/ImageEditor`,
  android: `/storage/emulated/0/Android/ImageEditor/Projects`,
});

export const dirPicutures = `${dirHome}/images`;
export const dirAudio = `${dirHome}/Audio`;

// `${RNFS.ExternalStorageDirectoryPath}/imageEditor`;
