import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Avatar, FAB } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
export default function Post({ post }: any) {
  const [avt, setAvt] = useState("");
  console.log("post", post);
  return (
    <View style={styles.card}>
      <Card containerStyle={{ borderRadius: 10 ,}}>
        <Card.Title style={{ textAlign: "left" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.cartHeader}>
             

            
              {post?.author === 'Mimi'  ?     <Avatar size={64} rounded source={require("../assets/images/cute2.jpg")} />
               : 
                <Avatar
          size={64}
          rounded
          source={require("../assets/images/IMG_20210703_220933.jpg")}


        />}

            

              <Text style={styles.name}>{post?.author}</Text>
              <Text style={styles.name}>{post?.status}</Text>
           
            
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>{post?.dayPost}</Text>
            </View>
          </View>
        </Card.Title>

        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>{post?.content}</Text>

        {post?.image ?   <Card.Image
        style={{ padding: 0,height:300 }}
        source={{ uri: post?.image }}
       
      /> : null}

        <Card.Divider />

        {/* <View style={styles.cartBottom}>
          <View style={styles.cartBottomItem}>
            <FontAwesome
              name="heart"
              size={25}
              style={{ marginRight: 6, color: "#000" }}
            />
            <Text style={{ marginRight: 15, fontSize: 18 }}>
              {post?.likeCount}
            </Text>
          </View>
          <View style={styles.cartBottomItem}>
            <FontAwesome name="comment" size={25} style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 18 }}>{post?.commentCount}</Text>
          </View>
        </View> */}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flex:1,
    display: "flex",
    flexDirection: "row",
    justifyContent:'space-between'
  },
  card: {
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

  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
