import React,{ useEffect , useState} from "react";
import { db } from "../firebase";
import { collection, addDoc,serverTimestamp} from "firebase/firestore"; 


export default async function useAddDoc(nameDoc : string,data : Object) {
  
    const date = new Date().toLocaleDateString();

    const time = new Date().getTime();
    
                try {

                    const docRef :any = await addDoc(collection(db, nameDoc), {
                        ...data,
                        createdAt: time,
                        dayPost: date,
                    });
                
                    
                      return docRef;
                } catch (error) {
                    console.log(error);
                }

}