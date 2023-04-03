import { StyleSheet, View, Text, Button } from 'react-native';

const Start = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <Text>Hello Screen1!</Text>
     <Button
       title="Go to Screen 2"
       onPress={() => navigation.navigate('Chat')}
     />
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

export default Start;