import React from 'react';
import { Content, Form, Item, Input, Icon, Title, Button } from 'native-base';
import { Text, StyleSheet } from 'react-native';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  render() {
    return (
      <Content style={styles.margin}>
        <Form>
          <Item inlineLabel>
            <Icon>✉️</Icon>
            <Input
              placeholder='Email'
              onTextChange={email => this.setState({ email })}
              autoCorrect={false}
              value={this.state.email}
            />
          </Item>
          <Item inlineLabel last>
            <Icon>🔑</Icon>
            <Input
              placeholder='Password'
              onTextChange={password => this.setState({ password })}
              secureTextEntry
              value={this.state.password}
            />
          </Item>
        </Form>
        <Button style={styles.margin} primary block><Text style={styles.buttonText}>Log In</Text></Button>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    margin: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
});
