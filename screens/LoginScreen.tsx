import { StatusBar } from "expo-status-bar";
import React, { useState,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SocialIcon } from '@rneui/themed';
import { RootStackScreenProps } from '../types';
import { signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { auth } from "../firebase/index"
import { AuthContext } from "../context/index"

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLoginWithPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigation.navigate('Root')
    })
    .catch((error) => {
      console.log(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  // function handleLoginWithGoogle() {
  //   const provider = new GoogleAuthProvider();
  //   const signIn =   signInWithPopup(auth, provider)

  //   signIn.then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential : any = GoogleAuthProvider.credentialFromResult(result);
  //     const token : any = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log(user);
  //     // ...
  //   })
  // }
  // const handleLoginWithFacebook =() => {

  // }

  

 
  return ( 
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/neko.gif")} />
 
      <StatusBar style="auto" />
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
 
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
            
        }}
      >
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
                
            }}
      >
        <Text style={styles.forgot_button}>Chưa có tài khoản thì đắng kí ở đây</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}
        onPress={handleLoginWithPassword}
      >
        <Text style={styles.loginText}>Gét Gô</Text>
      </TouchableOpacity>

      <View style={{width: '100%',flexDirection:'row',justifyContent:'center'}}>
      {/* <TouchableOpacity 
        onPress={handleLoginWithGoogle}
      >
     <SocialIcon
                type={'google'}
               iconType={'font-awesome'}

               iconSize={32}
              
              />
      </TouchableOpacity> */}
      {/* <TouchableOpacity 
        onPress={handleLoginWithFacebook}
      >
           <SocialIcon
                type={'facebook'}
                iconType={'logo-facebook'}
               iconSize={32}

              
              />
      </TouchableOpacity> */}
      </View>
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
    // width:300,
  
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
    height: 30,
    marginBottom: 10,
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
    fontSize: 20,
    fontWeight: "bold",
  }
});