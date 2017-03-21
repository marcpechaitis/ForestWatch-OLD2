import { StyleSheet, Dimensions } from 'react-native';

import commonColors from '../../common/commonColors';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 5;

export default StyleSheet.create({
  container: {
    backgroundColor: commonColors.BACKGROUND_COLOR_CARD,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 30,
  },
});
