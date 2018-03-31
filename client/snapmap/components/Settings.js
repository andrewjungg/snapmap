import React from 'react';
import { Container, Content, Header, Button, Left, Right, Body, Title } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
              >
              <Icon name='chevron-left' size={30}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.margin}>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.margin}>
          <Button
            block
            style={styles.button}
            dark
            onPress={() => firebase.auth().signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Button>
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
