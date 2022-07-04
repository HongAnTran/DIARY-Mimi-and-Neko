import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import {
    Card,
    Avatar,
    Header as HeaderRNE,
    SpeedDial
  } from "@rneui/themed";
  import { FontAwesome  } from "@expo/vector-icons";
export default function Header({user}) {
  return (
    <HeaderRNE
    backgroundColor="transparent"
    style={{alignItems: "center"}}
        
  
        leftComponent={
          <View style={styles.headerRight}>

            {user?.displayName === 'Mimi'  ? 
            
            <Avatar size={50}
            rounded
          source={require("../assets/images/cute2.jpg")}></Avatar>
          : 
          <Avatar size={50}
          rounded
        source={require("../assets/images/IMG_20210703_220933.jpg")}></Avatar>
         
          }
   
      
              
      </View>
        }

        rightComponent={
          <View style={styles.headerRight}>
         
         {/* <FontAwesome size={50} name="order" style={{color:'red'}}></FontAwesome> */}
           
           <FontAwesome size={40} name="reorder" style={{color:'black'}}></FontAwesome>
                   
           </View>
        }
        
        centerComponent={
          <View style={styles.headerRight}>
  
              <Text style={{fontSize:20,fontWeight:'bold'}}>Hi , {user?.displayName}</Text>
                   {/* <Text style={{fontSize: 30,fontWeight: "bold", color: "#000"}}>Iu </Text> */}
          </View>
          }
        />
  )
}

const styles = StyleSheet.create({

  

  
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
  