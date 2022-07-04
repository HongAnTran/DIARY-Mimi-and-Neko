import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Avatar,Badge, ListItem } from '@rneui/base'
import { FontAwesome  } from "@expo/vector-icons";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

export default function CreatePostHome({user ,navigation}) {
    const [search, setSearch] = useState("");
    const input = React.createRef();

      const handleOnCreatePost = () => {
        navigation.navigate("ModalCreatePost");
      }
  return (
     

<ListItem  bottomDivider
       onPress={() =>handleOnCreatePost()}

       containerStyle={{margin:10,borderRadius:20,shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2,
       },
       backgroundColor:'#F3425F',
       shadowOpacity: 0.25,
       
       shadowRadius: 3.84,
       
       elevation: 5,}}
       Component={TouchableScale}
       friction={90} //
       tension={100} // These props are passed to the parent component (here TouchableScale)
       activeScale={0.95} //
       >
      

       <ListItem.Content>
         <ListItem.Title style={{fontSize:20,fontWeight:'bold',color: '#fff' }}>Thêm nhật kí cảm xúc nhấn zô đây nha </ListItem.Title>
         {/* <ListItem.Subtitle
           numberOfLines={1}
         style={{color:'#a7a9ad'}}>{user.subtitle}</ListItem.Subtitle> */}
       </ListItem.Content>

     </ListItem>
  

  )
}

const styles = StyleSheet.create({
    container: {
        // marginLeft:16,
        // marginRight:16,
        marginTop:20,
        paddingBottom:10,
        paddingTop:10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius:30,
        paddingRight:10,
        paddingLeft:10,
    flexDirection: "row",
    // borderColor: "#9b89ff",
    color:'#fff',
    backgroundColor: "#ff577f",
    alignItems: "center",
    // borderStyle: "solid",
    // borderWidth: 1,
    },
    view: {
        
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      inputPost: {
    width: "80%",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    height: 40,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",

      }
})