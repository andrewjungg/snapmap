import React from 'react';
import { Container, Content, Header, Button, Title} from 'native-base';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

import HeatMap from './HeatMap';

export default class Home extends React.Component {
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
          <Button block style={styles.button}>
            <Text style={styles.buttonText}>Upload Picture</Text>
          </Button>
          <HeatMap />
          <Text style={styles.listTitle}>List of Possible Locations</Text>
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
  listTitle: {
    textAlign: 'center',
    fontSize: 18,
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
