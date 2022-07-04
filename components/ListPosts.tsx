import { FlatList} from 'react-native'
import React from 'react'

  import Post from "./Post";
export default function ListPosts({posts}) {

  
  return (
  
   
    <FlatList
      data={posts}
      renderItem={({ item,index } : any  ) => {
        // console.log('post',post,index) 
          return (
            <Post key={index} post={item} 
            // keyExtractor={item => item.id}
            />
          )
      }}
      keyExtractor={item => item.id}
    />
  
  
   
  
  )
  }



  