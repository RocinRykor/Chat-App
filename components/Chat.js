import {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  SystemMessage,
} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';

// import firebase functions
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';


// Importing storage for native apps
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({db, isConnected}) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  // save the name and color from the previous screen
  const {name, color, userID} = route.params;
  let unsubMessages;

  useEffect(() => {
    //Set the header to use name and color from previous screen, text is set to white to be visible no mater what background color is chosen
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: color,
      },
      headerTintColor: '#fff',
    });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    // code to execute when the component will be unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);


 // async function that sets messages with cached value
  // || [] will assign an empty array to cachedMessages if the messages_stored item hasn’t been set yet in AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages =
      (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // cashing data whenever it is updated
  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
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

  // Disable the input toolbar if not connected
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSystemMessage={renderSystemMessage}
        onSend={messages => onSend(messages)}
        user={{_id: userID, username: name}}
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
