import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  TextInput, TouchableOpacity,
} from 'react-native';

const backgroundColors = {
  black: {backgroundColor: '#090C08'},
  purple: {backgroundColor: '#474056'},
  grey: {backgroundColor: '#8A95A5'},
  green: {backgroundColor: '#B9C6AE'},
};

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', color: ''};
  }

  render() {
    const {black, purple, grey, green} = backgroundColors;

    return (
        <View style={{flex: 1}}>
          <ImageBackground
              source={require('../assets/background-image.png')}
              style={styles.image}
          >
            <Text style={styles.title}>Chat App</Text>

            <View style={styles.box}>
              <TextInput
                  style={[styles.input, styles.text]}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  placeholder={'Please enter your name'}/>
              <View>
                <Text style={styles.text}>Choose your Background Color</Text>
                <View style={[styles.colorSelector]}>
                  <TouchableOpacity
                      style={[
                        styles.colorOption,
                        black,
                        this.state.color === black.backgroundColor
                            ? styles.colorSelected
                            : {},
                      ]}
                      onPress={() =>
                          this.setState({color: black.backgroundColor})
                      }
                  />
                  <TouchableOpacity
                      style={[
                        styles.colorOption,
                        purple,
                        this.state.color === purple.backgroundColor
                            ? styles.colorSelected
                            : {},
                      ]}
                      onPress={() =>
                          this.setState({color: purple.backgroundColor})
                      }
                  />
                  <TouchableOpacity
                      style={[
                        styles.colorOption,
                        grey,
                        this.state.color === grey.backgroundColor
                            ? styles.colorSelected
                            : {},
                      ]}
                      onPress={() =>
                          this.setState({color: grey.backgroundColor})
                      }
                  />
                  <TouchableOpacity
                      style={[
                        styles.colorOption,
                        green,
                        this.state.color === green.backgroundColor
                            ? styles.colorSelected
                            : {},
                      ]}
                      onPress={() =>
                          this.setState({color: green.backgroundColor})
                      }
                  />
                </View>
              </View>
              <TouchableOpacity
                  style={styles.button}
                  title="Start Chatting"
                  onPress={() =>
                      this.props.navigation.navigate('Chat', {
                        name: this.state.name,
                        color: this.state.color,
                      })
                  }
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF',
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    resizeMode: 'cover',
  },

  box: {
    backgroundColor: '#FFFFFF',
    width: '88%',
    height: '44%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  input: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    borderWidth: 2,
    opacity: .5,
  },

  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  },

  colorSelector: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  colorOption: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 40,
  },

  colorSelected: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#5f5f5f',
  },

  button: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#757083',
  },

  buttonText: {
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
