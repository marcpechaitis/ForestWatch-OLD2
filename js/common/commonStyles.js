import { Platform, Dimensions } from 'react-native';
import commonColors from './commonColors';

// const React = require('react-native');
// const { StyleSheet } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
// const styles = {
// module.exports = StyleSheet.create({
export default {
  // layout styles
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  header: {
    backgroundColor: commonColors.HEADER_BG_COLOR,
  },
  headerText: {
    color: commonColors.HEADER_TEXT_COLOR,
  },
  headerBody: {
    flex: 3,
  },
  content: {
    backgroundColor: commonColors.BACKGROUND_COLOR_CONTENT,
    width: deviceWidth,
    height: deviceHeight,
  },
  card: {
    backgroundColor: commonColors.BACKGROUND_COLOR_CARD,
    margin: 8,
    padding: 8,
    borderRadius: platform === 'ios' ? 5 : 2,
  },
  mt16: {
    marginTop: 16,
  },
  // text styles
  text: {
    fontSize: 16,
    alignItems: 'center',
  },
  // element styles
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    flex: 1,
    backgroundColor: commonColors.BUTTON_COLOR,
    marginTop: 16,
    marginBottom: 16,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emergency: {
    backgroundColor: commonColors.BUTTON_COLOR_EMERGENCY,
  },
  dispatch: {
    backgroundColor: commonColors.BUTTON_COLOR,
  },
};
