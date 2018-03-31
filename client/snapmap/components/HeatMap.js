import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MapView } from 'expo';

const { width, height } = Dimensions.get('window');

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 43.472355,
        longitude: -80.544911,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0041
      },
      pin: {
        coordinate: {
          latitude: 43.472355,
          longitude: -80.544911
        },
        title: 'University of Waterloo',
        description: 'Geese breeding ground'
      }
    };
  }

  render() {
    const { region, pin } = this.state;
    return (
      <MapView
        style={styles.map}
        scrollEnabled
        zoomEnabled
        initialRegion={region}
      >
        <MapView.Marker
          coordinate={pin.coordinate}
          title={pin.title}
          description={pin.description}
       />
     </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width,
    height: height/2
  },
});
