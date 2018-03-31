import React from 'react';
import { Container, Content, Button, Title, Body, Right, Left, Header } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

// import { retrieveResults } from '../../../server/cloud-vision-server.js';
// import { foo } from '../../foo.js';

import HeatMap from './HeatMap';
import List from './List';
import Settings from './Settings';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { error, loading } = this.state;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>SnapMap</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Settings')}
            >
              <Icon name='gear' size={30}/>
            </Button>
          </Right>
        </Header>
        <Content style={styles.margin}>
          <Button block style={styles.button}>
            <Text style={styles.buttonText}>Upload Picture</Text>
          </Button>
          <HeatMap />
          <List />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    margin: 10
  },
  button: {
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
});
