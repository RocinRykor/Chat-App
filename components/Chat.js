import {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {positiveMessages} from '../positiveMessages';

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);

  // save the name and color from the previous screen
  const name = route.params.name;
  const color = route.params.color;

  useEffect(() => {
    //Set the header to use name and color from previous screen, text is set to white to be visible no mater what background color is chosen
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: color
      },
      headerTintColor: '#fff'
    });

    /* Create static messages to display when first opening
    * The system message will pull from a list of positive messages and use one at random */
    setMessages([
      {
        _id: 1,
        text: 'Welcome to chat, ' + name,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat App!',
          avatar: 'https://picsum.photos/id/237/140/140',
        },
      },
      {
        _id: 2,
        text: `Entering chat, remember, ${positiveMessages[Math.floor(Math.random() * positiveMessages.length)]}`,
        createdAt: new Date(),
        system: true,
      },
    ]);

  }, []);

  const onSend = (newMessages) => {
    setMessages(
      previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  // Render the chat bubbles, the users color is matched to the selected color
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: color,
        },
        left: {
          backgroundColor: '#FFF',
        },
      }}
    />;
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name,
        }}
      />
      {Platform.OS === 'android'
        ? <KeyboardAvoidingView behavior="height"/>
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
