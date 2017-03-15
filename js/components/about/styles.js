import { Platform } from 'react-native';
import commonColors from '../../common/commonColors';

const React = require('react-native');

const { StyleSheet } = React;

const platform = Platform.OS;

module.exports = StyleSheet.create({
  text: {
    fontSize: 16,
    alignItems: 'center',
  },
});
