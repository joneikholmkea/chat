import { 
  Button,
  StyleSheet, 
  View,
  Image 
  } from 'react-native';
import React, {useState} 
from 'react';

import {
  collection,
  addDoc,
  query,
  onSnapshot
} from 'firebase/firestore'

import {database, storage} from './config/firebase'
import {ref, uploadBytes} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
const [image, setImage] = useState([]);
const [imagePath, setImagePath] = useState();

const noteColl = "notes"
const addNote = () => {
  addDoc(collection(database, noteColl),{
    text: "hi from app"
  });
}

const readDB = () => {
  const reference = collection(database, noteColl);
  const q = query(reference, ref => ref.orderBy('createdAt', 'desc'));
  onSnapshot(q, snapshot => {
    snapshot.forEach(snap =>{
      console.log(snap.data()['text']);
    });
  })
}

const getImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing:true
  });
  console.log(result);
  setImagePath(result.assets[0].uri)
  setImage(result);
}

const uploadImage = async () => {
   const res = await fetch(imagePath);
   const blob = await res.blob();
   const storageRef = ref(storage, 'some-image');
   uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("uploaded image...");
   });
}
 
var imagePreview;
if(image){
  imagePreview = <Image style={styles.image} source={{uri: imagePath}}/>;
}else {
  imagePreview = <Image style={styles.image} source={{uri: 'https://reactjs.org/logo-og.png'}}/>;
}

  return (
    <View style={styles.container}>
      <View>
        <Button title='New Note' onPress={addNote}></Button>
        <Button title='Read DB' onPress={readDB}></Button>
        <Button title='Get Image' onPress={getImage}></Button>
        <Button title='Upload Image' onPress={uploadImage}></Button>
        <View style={styles.imagePreview}>
          {imagePreview}
        </View>
      </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop:100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview:{
    width:200,
    height:200,
    alignItems:'center',
    backgroundColor: "#933"
  }, 
  image:{
    width:200,
    height:200
  }
});



// sources: Good ones at that!
// https://firebase.google.com/docs/web/setup#add-sdk-and-initialize
// https://firebase.google.com/docs/storage/web/upload-files