import React, { Component } from 'react';
import { Alert, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  //  Container,
  //  Content,
  Button,
  Item,
  Input,
  //  Button,
  Icon, //  View,
  Text,
} from 'native-base';

import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import commonStyles from '../../common/commonStyles';
import logo from '../../../images/logo.png';
import { setUser } from '../../actions/user';

const {
  replaceAt,
} = actions;

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  setUser(name) {
    this.props.setUser(name);
  }

  keyboardWillShow = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  render() {
    const isValid = true;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.Image
          source={logo}
          style={[styles.logo, { height: this.imageHeight }]}
        />
        <Item success={isValid ? true : null} error={isValid ? null : true}>
          {/*  <Item success> */}
          <Icon name="person" />
          <Input
            placeholder="EMAIL"
            onChangeText={name => this.setState({ name })}
          />
          <Icon name="checkmark-circle" />
        </Item>
        <Item style={{ marginBottom: 24 }}>
          <Icon name="unlock" />
          <Input placeholder="PASSWORD" secureTextEntry />
        </Item>

        <Button
          style={commonStyles.button}
          onPress={() => Alert.alert('Bingo', '')}
        >
          <Text style={commonStyles.buttonText} allowFontScaling={false}>
            Sign In
          </Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) =>
      dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
