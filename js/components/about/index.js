import React, { Component } from 'react';
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
import theme from '../../themes/base-theme';

const {
  popRoute,
} = actions;

class About extends Component {
  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <Header style={commonStyles.header}>
          <Left>
            <Button transparent onPress={() => this.popRoute()}>
              <Icon style={commonStyles.headerText} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={commonStyles.headerText} allowFontScaling={false}>
              About Us
            </Title>
          </Body>
          <Right />
        </Header>

        <Content style={commonStyles.content}>
          <Card style={commonStyles.card}>
            <Text style={commonStyles.text}>
              {params.ABOUT_US}
            </Text>
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

export default connect(mapStateToProps, bindAction)(About);
