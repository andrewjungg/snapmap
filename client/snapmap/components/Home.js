import React from 'react';
import { Container, Content, Button, Title, Body, Right, Left, Header, Spinner} from 'native-base';
import { Text, StyleSheet, Image, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import axios from 'axios';

import HeatMap from './HeatMap';
import List from './List';
import Settings from './Settings';

const { width, height } = Dimensions.get('window');

export default class Home extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      image: {
        uri: null
      },
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
    this.uploadImage = this.uploadImage.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  updateMap(coordinate) {
    this.setState({
      region: {
        ...this.state.region,
        ...coordinate
      }
    });
  }

  uploadImage = async () => {
    const options = {
      mediaTypes: 'Images',
      allowsEditing: false,
      base64: true
    };
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      this.setState({
        loading: true
      });
      // send base 64 image to server here //
      axios.post('https://snapmap-syde322.herokuapp.com/preprocessImage', {
        preprocessedImage: [{
          pp_IMG: result.base64
        }]
      })
      .then((response) => {
        this.setState({
          image: {
            uri: result.uri,
          },
          error: null,
          loading: false
        });
        this.updateResults() // update region and locations
      })
      .catch((error) => {
        this.setState({
          error: 'Failed to Upload',
          loading: false
        });
      });
    }
  };

  updateResults() {
    // order results, and set new state
  }

  render() {
    const { error, loading, locations, region, image } = this.state;
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
              <EvilIcons name='gear' size={30}/>
            </Button>
          </Right>
        </Header>
        <Content style={styles.margin}>
          {image.uri && !error &&
            <Image
              style={styles.image}
              source={image}
            />
          }
          { error &&
            <Text style={styles.error}>{error}</Text>
          }
          { !loading ?
            <Button
              block
              large
              onPress={this.uploadImage}
              style={styles.button}>
              <Text style={styles.buttonText}>Upload Picture</Text>
            </Button> :
            <Spinner color='#5a9bd2' />
          }
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
  image: {
    width,
    height: 200,
    marginBottom: 10
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10
  }
});
