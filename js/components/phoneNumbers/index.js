import React, { Component } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Card,
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import commonStyles from '../../common/commonStyles';
import params from '../../common/params';
import styles from './styles';

const {
  popRoute,
} = actions;

const pageTitle = 'Important Phone Numbers';

class PhoneNumbers extends Component {
  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  makePhoneCall(phoneNbrToCall) {
    const phoneURL = `tel:${phoneNbrToCall}`;
    Alert.alert(`Call ${phoneNbrToCall}?`, '', [
      { text: 'Cancel', onPress: () => null },
      {
        text: 'Yes',
        onPress: () =>
          Linking.canOpenURL(phoneURL)
            .then(supported => {
              if (!supported) {
                console.log(`Can't call: ${phoneURL}`);
              } else {
                return Linking.openURL(phoneURL);
              }
            })
            .catch(error => console.log('An unexpected error happened', error)),
      },
    ]);
  }

  render() {
    const platform = Platform.OS;
    return (
      <Container style={commonStyles.container}>
        <Header style={commonStyles.header}>
          <Left>
            <Button transparent onPress={() => this.popRoute()}>
              <Icon style={commonStyles.headerText} name="ios-arrow-back" />
              {platform === 'ios'
                ? null
                : <Title style={commonStyles.headerTextAndroid}>
                    {pageTitle}
                  </Title>}

            </Button>
          </Left>
          {platform === 'ios'
            ? <Body style={commonStyles.headerBody}>
                <Title style={commonStyles.headerText} allowFontScaling={false}>
                  {pageTitle}
                </Title>
              </Body>
            : null}
          {platform === 'ios' ? <Right /> : null}
        </Header>

        <Content style={commonStyles.content}>
          <Card style={commonStyles.card}>
            <Text style={commonStyles.text}>
              {params.PHONE_TEXT_EMERGENCY}
            </Text>
            <Button
              style={styles.buttonEmergency}
              onPress={() => this.makePhoneCall(params.PHONE_NUMBER_EMERGENCY)}
            >
              <Text style={commonStyles.buttonText} allowFontScaling={false}>
                Call {params.PHONE_NUMBER_EMERGENCY}
              </Text>
            </Button>
            <Text style={styles.textMarginTop24}>
              {params.PHONE_TEXT_NON_EMERGENCY}
            </Text>
            <Text style={styles.textMarginTop24}>
              {params.PHONE_TEXT_DISPATCH_BOULDER}
            </Text>
            <Button
              style={styles.buttonDispatch}
              onPress={() =>
                this.makePhoneCall(params.PHONE_NUMBER_DISPATCH_BOULDER)}
            >
              <Text style={commonStyles.buttonText} allowFontScaling={false}>
                Call {params.PHONE_NUMBER_DISPATCH_BOULDER}
              </Text>
            </Button>
            <Text style={styles.textMarginTop16}>
              {params.PHONE_TEXT_DISPATCH_GILPEN}
            </Text>
            <Button
              style={styles.buttonDispatch}
              onPress={() =>
                this.makePhoneCall(params.PHONE_NUMBER_DISPATCH_GILPEN)}
            >
              <Text style={styles.buttonText} allowFontScaling={false}>
                Call {params.PHONE_NUMBER_DISPATCH_GILPEN}
              </Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(PhoneNumbers);
