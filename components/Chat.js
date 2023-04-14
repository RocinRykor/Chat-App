import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Chat = ({route, navigation}) => {
  useEffect(() => {
    const name = route.params.name;
    navigation.setOptions({title: name});
  }, []);

  const name = route.params.name;
  const backgroundColor = route.params.color;

  return (
    <View style={[styles.chatContainer, {backgroundColor}]}>
      <Text style={styles.text}>Welcome, {name}!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Start')}>
        <Text style={styles.text}>Go to Start</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default Chat;
