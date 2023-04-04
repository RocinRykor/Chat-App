import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class Chat extends Component {
  componentDidMount() {
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({title: name});
  }

  render() {
    const name = this.props.route.params.name;
    const backgroundColor = this.props.route.params.color;
    return (
        <View style={[styles.chatContainer, {backgroundColor}]}>
          <Text style={styles.text}>Welcome, {name}!</Text>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Start')}
          >
            <Text style={styles.text}>Go to Start</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});