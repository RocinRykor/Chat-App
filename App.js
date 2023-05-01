// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

// import firestore
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Create the navigator
const Stack = createNativeStackNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAoTLNLyAG-bmfCndZpc6y8mkrfscqd07Y',
  authDomain: 'chat-app-c0048.firebaseapp.com',
  projectId: 'chat-app-c0048',
  storageBucket: 'chat-app-c0048.appspot.com',
  messagingSenderId: '242864350333',
  appId: '1:242864350333:web:6d290f2fc34d76c7e1fd14',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
