import React from "react";
import { auth,db } from "../firebase/index";
import { useState,createContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ActivityIndicator } from "react-native";
import { View } from "../components/Themed";

 const AuthContext  = createContext(null); 
export {AuthContext}


const AuthProvier  = ({children} ) => {
  const [user , setUser]  = useState({
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
        const subscriptions =  auth.onAuthStateChanged((user) => {
      if (user) {
      const {uid} = user;

          const q = query(collection(db, "users"), where("uid", "==", uid));
          const querySnapshot = getDocs(q);

          querySnapshot.then((docs) => {
            docs.forEach((doc) => {
              const userOnDoc = doc.data();
              setUser({
               ...userOnDoc
              });
            });
          });
        

        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return subscriptions;
  }, []);

    return (
      <AuthContext.Provider value={{ user , setUser }}>
        {loading ? 
        <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}> 

        <ActivityIndicator size="large" color="#00ff00" />
        </View>
        
        : children}
      </AuthContext.Provider>
    )
 

  
}

export default AuthProvier;
