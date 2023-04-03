import { StyleSheet, View, Text } from 'react-native';

const Chat = () => {
 return (
   <View style={styles.container}>
     <Text>Hello Screen2!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;