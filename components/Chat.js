import {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  SystemMessage,
} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  addDoc,
  collection,
  disableNetwork,
  enableNetwork,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({db, storage}) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const {name, color, userID} = route.params;
  let unsubMessages;
  const {isConnected} = useNetInfo();

  useEffect(() => {
    // Check for a connection
    if (isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (isConnected === true) {
      enableNetwork(db);
    }

    // Set the header to use name and color from previous screen, text is set to white to be visible no matter what background color is chosen
    navigation.setOptions({
      title: name,
      headerStyle: {backgroundColor: color},
      headerTintColor: '#fff',
    });

    // Only fetch new messages if connected to the database
    if (isConnected === true) {
      // Unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
      if (unsubMessages) {
        unsubMessages();
      }

      // Query the messages collection and order them by createdAt field in descending order
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      // Attach an onSnapshot listener to get real-time updates on the collection
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        const newMessages = documentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        }));
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      // Load cached messages if not connected to the database
      loadCachedMessages();
    }

    // Clean up function to unregister the onSnapshot listener
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [db, isConnected, name, color, navigation]);

  // Async function that sets messages with cached value
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || '[]';
    setMessages(JSON.parse(cachedMessages));
  };

  // Async function that caches messages whenever it is updated
  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to handle sending new messages to the database
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };


  // Render the chat bubbles, the user's color is matched to the selected color
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: color,
        },
        left: {
          backgroundColor: '#FFF',
        },
      }}
    />
  );

  // Disable the input toolbar if not connected
  const renderInputToolbar = (props) =>
    isConnected ? <InputToolbar {...props} /> : null;

  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      textStyle={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}
    />
  );

  // renderCustomActions function is responsible for creating the circle button
  const renderCustomActions = (props) => {
    return <CustomActions onSend={onSend} userID={userID} storage={storage} {...props} />;
  };

    const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSystemMessage={renderSystemMessage}
        messages={messages}
        onSend={onSend}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
