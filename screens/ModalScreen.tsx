
import { Platform, StyleSheet ,TextInput, Text, View,Button,Alert,Image,ActivityIndicator} from 'react-native';

import { Avatar } from '@rneui/base'
import { v4 as uuidv4 } from 'uuid';
import { useEffect,useContext,useState } from 'react';
import { AuthContext } from '../context';
import * as ImagePicker from 'expo-image-picker';
import { storage} from '../firebase';
import {  ref   ,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAddDoc  from '../hooks/useAddDoc';
import React from 'react';



import { ButtonGroup } from '@rneui/themed'

const emoticons = ['😁','😭','😔','😡','🤡','😤','❤',<Text>&#128405;</Text>]
export default function ModalCreatePostScreen() {
  const { user }:any = useContext(AuthContext)
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [image, setImage] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [contentPost, setContentPost] = useState('');


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);



const hasMediaLibraryPermissionGranted = async () => {
  let granted =  false;

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.canAskAgain || permission.status === "denied") {
    granted = false;

  }

  if (permission.granted) {
    granted = true;
  }

  return granted;
};

const uploadImageFromDevice = async () => {
  let imgURI = null;
  const storagePermissionGranted = await hasMediaLibraryPermissionGranted();

  // Discard execution when  media library permission denied
  if (!storagePermissionGranted) return imgURI;

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [6, 8],
    quality: 1,
  });

  if (!result.cancelled) {
    imgURI = result.uri;
  }

  return imgURI;
};

const getBlobFroUri = async (url:any) => {

  const storageRef = ref(storage, `images/antech/${Date.now()}.jpg`);
  const metadata = {
    contentType: 'image/jpeg'
  };

  const img = await fetch(url);
  const blob = await img.blob();
  const uploadTask = uploadBytesResumable(storageRef, blob,metadata);

  uploadTask.on('state_changed',(snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    switch (snapshot.state) {
       case 'paused':
           console.log('Upload is paused');
       break;
       case 'running':
          console.log('Upload is running');
       break;
    }
 },
 (error) => {
console.log(error.code);
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
       case 'storage/unauthorized':
          console.log("User doesn't have permission to access the object");
       break;
       case 'storage/canceled':
          console.log("User canceled the upload");
       break;
       case 'storage/unknown':
          console.log("Unknown error occurred, inspect error.serverResponse");
       break;
    }
 },
 () => {

    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setimageUrl(downloadURL);
      
   
       //perform your task
    });
 });
};

  const handlePick = async () => {
      const url :any = await uploadImageFromDevice();
      setImage(url);
    getBlobFroUri(url);
  }

  
  const handlePost = () => {


    const dataPost ={
      content:contentPost,
      image:imageUrl,
      author:user.displayName,
      status:emoticons[selectedIndex2],
      // likeCount:0,
      // commentCount:0,
    }

    useAddDoc('posts',dataPost)

    setContentPost('');
    setImage('');
    setimageUrl('');
    Alert.alert('Thêm trạng thái cảm xúc thành công rùi nhaa!!!')

  }


  return (
    <View style={styles.container}>
      <View style={styles.headerCreate}>
     
      <View >
            <Button title="Thêm nhật kí"
              color="red"
            disabled={contentPost ? false : true}
            onPress={() => handlePost()}/>
      </View>


      </View>
      {/* <View style={{backgroundColor: '#fff',display: 'flex',flexDirection: 'row',justifyContent:'space-evenly'}}>
            <View>

  
              <ButtonGroup
      selectedButtonStyle={{backgroundColor: 'red'}}
              
              buttonStyle={{
                width: 200,
                height:50,
              }}
          buttons={[
            <Avatar size={40}
            rounded
          source={require("../assets/images/cute2.jpg")}></Avatar>
            ,  <Avatar size={40}
            rounded
          source={require("../assets/images/IMG_20210703_220933.jpg")}></Avatar>
        ]}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{    height:50 ,width:400}}
        />
        </View>
        
          </View> */}
          <View style={{backgroundColor: '#fff',display: 'flex',flexDirection: 'row',justifyContent:'space-evenly'}}>

          
  
      <ButtonGroup
      selectedButtonStyle={{backgroundColor: 'red'}}
      buttonStyle={{
        width: '100%',
        height:50,
        
      }}
    buttons={emoticons}
    selectedIndex={selectedIndex2}
    onPress={(value) => {
    setSelectedIndex2(value);
    }}
    containerStyle={{    height:50 ,width:'100%'}}
    />
         </View>
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <TextInput 
       
          onChangeText={(e) =>{
          
            setContentPost(e)
          }}
        multiline
        numberOfLines={10}
        placeholder="Viết nhật kí ở đây nèee" style={{width: '100%',padding:10,fontSize:20,borderStyle:'solid',borderWidth:1,borderColor:'#ccc'}}
        value={contentPost}
        />

          <Image source={{ uri: image }} style={{ width:'100%', height:'100%' }} />
      </View>

     


      <View  style={styles.menuCreate}>
        <View style={styles.itemButton}>

      <Button
        title="Thêm hình ảnh"
        color="red"
     
        onPress={() =>handlePick()}
        
        />
        </View>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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
  headerCreate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding:8,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  menuCreate: {
    flexDirection: 'column',
    width: '100%',
    // height: 200, 
  },
  itemButton: {
      marginBottom:10,
  }
 
});
