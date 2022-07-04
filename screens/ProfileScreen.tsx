import { StyleSheet ,Button} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {  signOut } from "firebase/auth";

import { auth }  from '../firebase/index'
import React,{useContext} from 'react';
import Header from '../components/Header';
import getDoc  from '../hooks/getDoc'
import { AuthContext } from '../context';
import { ListItem } from '@rneui/base';
import TouchableScale from 'react-native-touchable-scale';
export default function ProfileScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const posts = getDoc('posts')

  const [postsDui , setPostsDui] = React.useState(0)
  const [postsKhok , setPostsKhok] = React.useState(0)



  const { user }  = useContext(AuthContext)
   function signIn(){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  React.useEffect(() => {

   setPostsDui(posts.filter((post:any) => post.status == '😁' && post.author === 'Mimi').length)
   setPostsKhok(posts.filter((post :any) => post.status == '😭'&& post.author === 'Mimi').length)

  },[posts])

  return (
   <View 
    style={styles.container}
   >
    <Header
    user={user}
    ></Header>

<View style={{padding:10 , marginBottom:20 , backgroundColor:'pink'}}>
<Text
              
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color:  "#fff",
              }}>
              {postsDui ? `số lần dui ${postsDui}` : 'chưa có thống kê lần dui'}
              </Text>
       
</View>


       <View style={{padding:10 , marginBottom:20 ,backgroundColor:'red'}}>
        <Text
         style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color:  "#fff",
        }}>
          {postsKhok ? `số lần Khok ${postsKhok}` : 'chưa có thống kê lần khok'}</Text>
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor:'#cdfffc'
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
