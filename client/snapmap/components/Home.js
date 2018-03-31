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

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      locations: [
        {
          coordinate: {
            latitude: 43.472355,
            longitude: -80.544911
          },
          title: 'University of Waterloo',
          description: 'Geese breeding ground',
          chance: '50%'
        },
        {
          coordinate: {
            latitude: 43.642760,
            longitude: -79.387003
          },
          title: 'CN Tower',
          description: 'Drake was here',
          chance: '44%'
        },
        {
          coordinate: {
            latitude: 37.785990,
            longitude: -122.400632
          },
          title: 'SF MOMA',
          description: 'Much art',
          chance: '33%'
        }
      ],
      region: {
        latitude: 43.472355,
        longitude: -80.544911,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0041
      },
    };

    this.updateMap = this.updateMap.bind(this);
  }

  updateMap(coordinate) {
    this.setState({
      region: {
        ...this.state.region,
        ...coordinate
      }
    });
  }

  render() {
    const { error, loading, locations, region } = this.state;
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
          <HeatMap markers={locations} region={region} />
          <List locations={locations} updateMap={this.updateMap}/>
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
