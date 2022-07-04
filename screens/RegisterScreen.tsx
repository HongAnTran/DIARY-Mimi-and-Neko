import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { RootStackScreenProps } from '../types';
import { auth } from '../firebase/index'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {AuthContext} from "../context/index"
import { useContext} from 'react'
import useAddDoc from '../hooks/useAddDoc'
export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");


    const { setUser }:any = useContext(AuthContext);

 

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const userData =  {
      displayName,
      email,
      uid:user.uid,
      photoURL:user.photoURL,
      listFriends:[]
    }
    useAddDoc('users',userData)
    setUser(userData)

    navigation.navigate('Root')
  })
  .catch((error) => {
    console.log(error,'error')
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  } 
 
  return ( 
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/neko.gif")} />
 
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tên nhân vật"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setDisplayName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          
          onChangeText={(password) => setPassword(password)}
        />
      </View>

 
      <TouchableOpacity
        onPress={() =>{
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.forgot_button}>Có tài khoản rùi thì nhấn zô đây</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn}
        onPress={handleRegister}
      >
        <Text style={styles.loginText}>Đăng kí</Text>
      </TouchableOpacity>

      
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececfc",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  
  },
 
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    width:'100%',
  },
 
  forgot_button: {
    margin:20,
  },
 
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#9b89ff",
  },
  loginBtnSocial: {
width: "35%",
borderRadius: 25,
height: 50,
alignItems: "center",
justifyContent: "center",
marginTop: 8,
backgroundColor: "#9b89ff",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,

  }
});