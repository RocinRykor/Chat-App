import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// importing anonymous auth firebase functions
import {getAuth, signInAnonymously} from 'firebase/auth';

const backgroundColors = {
  black: {backgroundColor: '#090C08'},
  purple: {backgroundColor: '#474056'},
  grey: {backgroundColor: '#8A95A5'},
  green: {backgroundColor: '#B9C6AE'},
};

export default function Start({navigation}) {

  const auth = getAuth();

  const signInUser = () => {
    // Sign in the user and navigate to the Chat screen, passing along the UserID (uid) in the navigation as well
    signInAnonymously(auth).then((result) => {
      navigation.navigate('Chat', {
        userID: result.user.uid,
        name: name,
        color: color,
      });
    }).catch((error) => {
      Alert.alert('Unable to sign in, try again later.');
    });
  };

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const {black, purple, grey, green} = backgroundColors;

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.image}>
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.box}>
          <TextInput
            style={[styles.input, styles.text]}
            onChangeText={setName}
            value={name}
            placeholder={'Please enter your name'}
          />
          <View>
            <Text style={styles.text}>Choose your Background Color</Text>
            <View style={[styles.colorSelector]}>
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  black,
                  color === black.backgroundColor ?
                    styles.colorSelected :
                    {},
                ]}
                onPress={() => setColor(black.backgroundColor)}
              />
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  purple,
                  color === purple.backgroundColor ?
                    styles.colorSelected :
                    {},
                ]}
                onPress={() => setColor(purple.backgroundColor)}
              />
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  grey,
                  color === grey.backgroundColor ?
                    styles.colorSelected :
                    {},
                ]}
                onPress={() => setColor(grey.backgroundColor)}
              />
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  green,
                  color === green.backgroundColor ?
                    styles.colorSelected :
                    {},
                ]}
                onPress={() => setColor(green.backgroundColor)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            title="Start Chatting"
            onPress={() => signInUser()
            }>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
});
