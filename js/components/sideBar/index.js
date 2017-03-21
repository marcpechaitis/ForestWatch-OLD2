import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem } from 'native-base';

import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

import styles from './style';

class SideBar extends Component {
  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  };
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar}>
        <ListItem button onPress={() => this.navigateTo('login')}>
          <Text>Sign In</Text>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('home')}>
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('about')}>
          <Text>About Us</Text>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('phoneNumbers')}>
          <Text>Important Phone Numbers</Text>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
