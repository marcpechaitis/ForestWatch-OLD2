import React, { Component } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  Header,
  Subtitle,
  Title,
  Card,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import commonStyles from '../../common/commonStyles';
import params from '../../common/params';
import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;

class Home extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  };

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <Header iconRight style={commonStyles.header}>
          {/*
          <Left>
            <Button
              transparent
              onPress={() => this.props.reset(this.props.navigation.key)}
            >
              <Icon name="ios-power" />
            </Button>
          </Left>
          */}
          <Left />
          <Body>
            <Title style={commonStyles.headerText} allowFontScaling={false}>
              {this.props.name ? this.props.name : params.APP_TITLE}
            </Title>
            <Subtitle style={commonStyles.headerText} allowFontScaling={false}>
              {params.APP_SUBTITLE}
            </Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon style={commonStyles.headerText} name="md-more" />
            </Button>
          </Right>
        </Header>

        <Content style={commonStyles.content}>
          <Card style={commonStyles.card}>
            <Grid style={styles.grid}>
              {this.props.list.map((item, i) => (
                <Row key={i}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.pushRoute('blankPage', i)}
                  >
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                </Row>
              ))}
            </Grid>
            <Button
              style={commonStyles.button}
              onPress={() => Alert.alert('Bingo', '')}
            >
              <Text style={commonStyles.buttonText} allowFontScaling={false}>
                Report New Incident
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
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
