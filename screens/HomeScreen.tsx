import { StyleSheet} from "react-native";
import { useState ,useContext ,useEffect} from "react";

import { RootTabScreenProps } from "../types";
import { ScrollView, View, Text } from "react-native";
import {
  SpeedDial
} from "@rneui/themed";

import { AuthContext } from "../context";

import Header from "../components/Header";
import CreatePostHome from "../components/CreatePostHome";
import ListPosts from "../components/ListPosts";
import React from "react";
import getDoc,{getDocPost}  from "../hooks/getDoc";
export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const posts : any[] = getDoc('posts') 
  const { user }:any = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Header user={user} />
   


  
<CreatePostHome user={user} navigation={navigation}/> 
 <ListPosts posts={posts}/> 



 
   
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#cdfffc',
    // alignItems: "center",
    // paddingTop:20
    // justifyContent: "center",
    // backgroundColor: "#000",
  },
  status: {

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9b89ff",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
    marginLeft: 10,
  },

  cartHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  card:{
    marginBottom: 10,
    // borderBottomEndRadius: 20,
  },
  cartBottom: {
    flex: 1,
    flexDirection: "row",
  },
  cartBottomItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    // flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
