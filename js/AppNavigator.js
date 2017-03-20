import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import SplashScreen from 'react-native-splash-screen';

import { closeDrawer } from './actions/drawer';

import About from './components/about/';
import BlankPage from './components/blankPage';
import Home from './components/home/';
import Login from './components/login/';
import PhoneNumbers from './components/phoneNumbers';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {
  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
    //    _handleBackAction: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._handleBackAction = this._handleBackAction.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      /*
      console.log('press back sucka');
      const routes = this.props.navigation.routes;

      if (
        routes[routes.length - 1].key === 'home' ||
        routes[routes.length - 1].key === 'login'
      ) {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
      */
      this._handleBackAction();
      return true;
    });
    SplashScreen.hide();
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  _handleBackAction() {
    /*  if (this.props.cardNavigation.index === 0) {
      return false;
    }
    */

    console.log('get back sucka');
    //  this.popRoute();

    const routes = this.props.navigation.routes;

    if (
      routes[routes.length - 1].key === 'home' ||
      routes[routes.length - 1].key === 'login'
    ) {
      return false;
    }

    this.props.popRoute(this.props.navigation.key);

    return true;
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) {
    // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'about':
        return <About />;
      case 'blankPage':
        return <BlankPage />;
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'phoneNumbers':
        return <PhoneNumbers />;
      case 'splashscreen':
        return <SplashPage />;
      default:
        return <Home />;
    }
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        type="overlay"
        side="right"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={ratio => {
          //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar backgroundColor={statusBarColor} barStyle="default" />
        <NavigationCardStack
          navigationState={this.props.navigation}
          onNavigateBack={this._handleBackAction}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
