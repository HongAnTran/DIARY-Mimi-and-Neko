import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import {
  Card,
  Avatar,
  Header as HeaderRNE,
  ListItem,
  Divider,
} from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect, useContext, useMemo } from "react";
// import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { AuthContext } from "../context/index";
import { getDoc } from "../hooks/getDoc";
import useAddDoc from "../hooks/useAddDoc";
import { collection, query, where, onSnapshot, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../firebase/index";
import { doc, setDoc } from "firebase/firestore";

// Add a new document with a generated id

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const list = [
  {
    name: "Nhớ Ân wa 🤧",
    avatar_url:
      "../assets/images/0ee5dbcf8163ce8da87512a5070ba40b.gif",
    active: false,
  },
  {
    name: "Dậy ik Ân ui 💩",
    avatar_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    active: false,
  },
  {
    name: "Đi chơi Ân ui 🙋🏻‍♀️",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
  {
    name: "Thèm trà vải 🍒",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
  {
    name: "Thèm trà đào 🍑",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
  {
    name: "Đoái pụng Wa Ân uii 😖 ",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },

  {
    name: "thèm ăn vặt 😗",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
  {
    name: "Hú cho dui 🥳",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },

  {
    name: "Quýnh Ân 👊",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
];


const listAn = [
  {
    name: "Nhớ Tuỳn cute wa 🤧",
    avatar_url:
      "../assets/images/cute2.jpg",
    
    active: false,
  },
  {
    name: "Dậy ik Tuỳn ui 💩",
    avatar_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    active: false,
  },
  {
    name: "Đi chơi Tuỳn ui 🙋🏻",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
  
  {
    name: "Đoái pụng Wa Tuỳn uii 😖 ",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },


  {
    name: "Hú cho dui 🥳",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },

  {
    name: "iu Tuỳn ❤️",
    avatar_url:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    active: false,
  },
];
export default function ChatScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.displayName === "Mimi") {
      const q1 = query(collection(db, "token"), where("id", "==", "Mimi"));
      const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          if(querySnapshot.empty){
            registerForPushNotificationsAsync().then((token) => {
              useAddDoc("token", {
                token,
                id: "Mimi", 
              })
            })
         
          }else{
       
          registerForPushNotificationsAsync().then((token) => {
            const washingtonRef = doc(db, "token", "Mimi");

            // Set the "capital" field of the city 'DC'
            updateDoc(washingtonRef, {
                token,
            });
          })
               
          }
      });


      const q2 = query(collection(db, "token"), where("id", "==", "Neko"));
      const unsubscribe2 = onSnapshot(q1, (querySnapshot) => {
          if(!querySnapshot.empty){
            querySnapshot.forEach((doc) => {
              setExpoPushToken(doc.data()[0].token)
            })
          }

     
      })
       


    } else if (user.displayName === "Neko") {
      const q1 = query(collection(db, "token"), where("id", "==", "Neko"));
      const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          if(querySnapshot.empty){
            registerForPushNotificationsAsync().then((token) => {
              useAddDoc("token", {
                token,
                id: "Neko", 
              })
            })
           
          }
      });
  
      const q2 = query(collection(db, "token"), where("id", "==", "Mimi"));
      const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
        if(!querySnapshot.empty){
          querySnapshot.forEach((doc) => {
            setExpoPushToken(doc.data()[0].token)
          })
        }
      })
       
 
    } else {
      alert("Bạn không có quyền truy cập chức năng này");
    }

    return () => {};
  }, []);

  const [order, setOrder] = useState(user.displayName === "Mimi" ? list : listAn);

  const handleOrderClick = (index: any) => {
    // order[index].active  = !order[index].active
    let orderNew = [...order];
    orderNew[index].active = !orderNew[index].active;

    setOrder(orderNew);
  };

  async function sendPushNotification(
    expoPushToken: any,
    title: string,
    body: string
  ) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const senMess = async () => {
    const orderActive = order.filter((or) => or.active);
 
    if (orderActive.length > 0) {
      const title =
        user.displayName === "Mimi" ? "Tuỳn hú Ân 🙆🏻‍♀️" : "Ân hú Tuỳn 🙆🏻";
      const body = orderActive.map((or) => `${or.name}`).join(" ,");
      await sendPushNotification(expoPushToken, title, body);
      alert("Hú thành công");


      const orderNoneActive = order.map(item => ({
        ...item,
        active:false
      }))
      setOrder(orderNoneActive)
      
    } else {
      alert("Sao hông chọn gì hết mà hú gòi z");
    }
  };
  return (
    <>
      <HeaderRNE
        backgroundColor="pink"
    

        style={{ alignItems: "center" }}
        rightComponent={
          <View style={styles.headerRight}>
            <FontAwesome
              onPress={() => senMess()}
              name="bell"
              size={40}
              style={{ marginRight: 6, color: "red" }}
            />
          </View>
        }
        centerComponent={
          <View style={styles.headerRight}>
            <Text style={styles.title}>
              {user.displayName === "Mimi" ? "Hú cho Ân" : "Hú cho Tuỳn cute"}
            </Text>
          </View>
        }
      />

      <ScrollView style={styles.container}>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {order.map((user, index) => (
            <ListItem
              key={index}
              bottomDivider
              onPress={() => handleOrderClick(index)}
              containerStyle={{
                margin: 8,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                backgroundColor: user.active ? "pink" : "#fff",

                display: "flex",
                flexDirection: "column",
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                width: 180,
                elevation: 5,
              }}
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
            >
               {/* <Avatar size={50}
          rounded
        source={require("../assets/images/cute2.jpg")}></Avatar> */}

              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: user.active ? "#fff" : "#000",
                  }}
                >
                  {user.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>

        {/* <View
style={{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-around',
}}>
<Text>Your expo push token: {expoPushToken}</Text>
<View style={{ alignItems: 'center', justifyContent: 'center' }}>
  <Text>Title: {notification && notification.request.content.title} </Text>
  <Text>Body: {notification && notification.request.content.body}</Text>
  <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
</View>

</View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cdfffc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  listMessage: {},
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});
