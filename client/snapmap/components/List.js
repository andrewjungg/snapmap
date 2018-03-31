import React from 'react';
import { List, ListItem, Body, Right } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const locationsArr = [
      {
        location: 'Waterloo',
        chance: '50%'
      },
      {
        location: 'Toronto',
        chance: '44%'
      },
      {
        location: 'San Francisco',
        chance: '33%'
      },
    ];
    return (
      <View style={styles.list}>
        <Text style={styles.listTitle}>List of Possible Locations</Text>
        <List dataArray={locationsArr}
          renderRow={data =>
            <ListItem>
              <Body>
                <Text>{data.location}</Text>
              </Body>
              <Right>
                <Text>{data.chance}</Text>
              </Right>
            </ListItem>
          }>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 10
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 18,
    margin: 10
  },
});
