import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import commonStyles from '../../common/commonStyles';
import styles from './styles';

const {
  popRoute,
} = actions;

const pageTitle = 'Blank Page';

class BlankPage extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { props: { name, index, list } } = this;
    const platform = Platform.OS;

    return (
      <Container style={styles.container}>
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

        <Content padder>
          <Text>
            {!isNaN(index) ? list[index] : 'Create Something Awesome . . .'}
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(BlankPage);
