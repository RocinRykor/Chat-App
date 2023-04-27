import {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';

// import firebase functions
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';


const Chat = ({db,  isConnected }) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  // save the name and color from the previous screen
  const {name, color} = route.params;

  useEffect(() => {
    //Set the header to use name and color from previous screen, text is set to white to be visible no mater what background color is chosen
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: color,
      },
      headerTintColor: '#fff',
    });

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // code to execute when the component will be unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

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

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{ _id: route.params.userID, username: route.params.name }}
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
