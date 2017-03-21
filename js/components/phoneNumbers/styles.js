import { Platform } from 'react-native';
import commonColors from '../../common/commonColors';

// const React = require('react-native');
// const { StyleSheet } = React;
const platform = Platform.OS;

// const styles = {
// module.exports = StyleSheet.create({
export default {
  container: {
    margin: 16,
  },
  content: {
    backgroundColor: commonColors.BACKGROUND_COLOR_CONTENT,
  },
  card: {
    backgroundColor: commonColors.BACKGROUND_COLOR_CARD,
    margin: 8,
    padding: 8,
    borderRadius: platform === 'ios' ? 5 : 2,
  },
  grid: {
    marginTop: 16,
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
  },
  mt16: {
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  // temporary until they fix bug allowing arrays of styles
  buttonEmergency: {
    flex: 1,
    backgroundColor: commonColors.BUTTON_COLOR_EMERGENCY,
    marginTop: 32,
    marginBottom: 16,
    width: 200,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonDispatch: {
    flex: 1,
    backgroundColor: commonColors.BUTTON_COLOR,
    marginTop: 16,
    marginBottom: 8,
    width: 200,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textMarginTop24: {
    marginTop: 24,
    fontSize: 16,
    alignItems: 'center',
  },
  textMarginTop16: {
    marginTop: 16,
    fontSize: 16,
    alignItems: 'center',
  },
};
