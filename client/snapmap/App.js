import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Spinner, Title, Button } from 'native-base';
import firebase from 'firebase';
import { Text, StyleSheet, View } from 'react-native';

import LoginForm from './components/LoginForm';
import Home from './components/Home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
    this.renderContent = this.renderContent.bind(this)
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBJ6XkGZQVWQDQljyvsUwWrWxH5CNGVCaw",
      authDomain: "snapmap-01.firebaseapp.com",
      databaseURL: "https://snapmap-01.firebaseio.com",
      projectId: "snapmap-01",
      storageBucket: "snapmap-01.appspot.com",
      messagingSenderId: "361067480229"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Container>
            <Home />
          </Container>
        );

      case false:
        return (
          <Container>
            <Header>
              <Title style={styles.margin}>Log In</Title>
            </Header>
            <LoginForm />
          </Container>
        );

      default:
        return (
          <Content>
            <Spinner />
          </Content>
        );
    }
  }

  render() {
    return (
      <Container>
        {this.renderContent()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    margin: 10
  }
});
