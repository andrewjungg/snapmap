import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { map } from 'lodash'

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
      markers: [
        {
          coordinate: {
            latitude: 43.472355,
            longitude: -80.544911
          },
          title: 'University of Waterloo',
          description: 'Geese breeding ground'
        },
        {
          coordinate: {
            latitude: 43.642760,
            longitude: -79.387003
          },
          title: 'CN Tower',
          description: 'Drake was here'
        },
        {
          coordinate: {
            latitude: 37.785990,
            longitude: -122.400632
          },
          title: 'SF MOMA',
          description: 'Much art'
        }
      ]
    };
  }

  render() {
    const { region, markers } = this.state;
    return (
      <MapView
        style={styles.map}
        scrollEnabled
        zoomEnabled
        initialRegion={region}
      >
        {map(markers, (marker, key) => {
          const { coordinate, title, description } = marker;
          return(
            <MapView.Marker
              key={key}
              coordinate={coordinate}
              title={title}
              description={description}
            />
          );
        })}
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
