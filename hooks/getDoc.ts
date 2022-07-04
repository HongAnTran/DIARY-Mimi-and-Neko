import React from "react";
import { db } from "../firebase/index";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  WhereFilterOp,
  doc,
  getDocs,
} from "firebase/firestore";

type Condition = {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: any;
};

export {Condition}
const getDoc = (collectionS: string, condition?: Condition,...args: any[]) => {
  const [document, setDocument] = React.useState([]);

  React.useEffect(() => {
    let collectionRef = query(
      collection(db, collectionS),
      orderBy("createdAt","desc")
    );

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const data: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log("data", data);
      setDocument(data);
    });

    return unsub;
  }, [collectionS, condition]);


  return document;
};
const getDocPost =  async (user: any) => {
  let document : any = [];
  const timeThreeDays = new Date().getTime() - 259200000;
 
  const getDocPostFriends = async () => {
    const data : any = [];
   
    for await (const friend of user.listFriends) {
      // const docRef = await doc(collection(db, "posts"));
      const q = query(
        collection(db, "posts"),
      orderBy("createdAt"),

        where("author", "==", friend.uid),
        // where("timePosted", ">", timeThreeDays),
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
    }
   
   return data;
  };

  let collectionRef = query(
    collection(db, "posts"),
    orderBy("createdAt"),
    where("author", "==", user.uid),
    // where("timePosted", ">", timeThreeDays),
  );


   onSnapshot(collectionRef, async (snapshot) => {
    const data: any = await snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  
   
    const postFriends = await getDocPostFriends();

    document = data.concat(postFriends);

    // console.log('doc',document);

  });
  

     console.log('doc',document);

  return document
    
  

};



export {  getDocPost };
export default getDoc;
