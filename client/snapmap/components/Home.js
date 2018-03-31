import React from 'react';
import { Container, Content, Header, Button, Title} from 'native-base';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { error, loading } = this.state;
    return (
      <Container>
        <Header>
          <Title style={styles.margin}>SnapMap</Title>
        </Header>
        <Content style={styles.margin}>
          <Text>Foobar</Text>
          <Button onPress={() => firebase.auth().signOut()}>
            <Text>Sign Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    margin: 10
  }
});
