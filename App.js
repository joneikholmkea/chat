import { StatusBar } from 'expo-status-bar';
import { FlatList, 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Image
  } from 'react-native';

import * as ImagePicker from 'expo-image-picker'

import React, {
  useState
} from 'react';

import {
  collection,
  addDoc,
  query,
  onSnapshot
} from 'firebase/firestore'

import {database, storage} from './config/firebase'
import {ref, uploadBytes} from "firebase/storage";

export default function App() {
  const chatColl = 'notes';
  const [notes, setNotes] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [image, setImage] = useState(null);
  const readDB = () => {
    const collectionRef = collection(database, chatColl);
    const q = query(collectionRef, ref => ref.orderBy('createdAt', 'desc'));
    onSnapshot(q, snapshot =>{
      const _notes = [];
      snapshot.forEach(snap => {
        _notes.push({
          ...snap.data(),
          key: snap.id,
        });
      });
      setNotes(_notes);
    });
  }

  const addNote = () => {
    addDoc(collection(database, chatColl), {
        text: "Tuesday note"
    });
  }

  const takeImageHandler = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true
      });
      setImagePath(result.assets[0].uri);
      setImage(result)
  }

  const uploadImage = async () => {
    const res = await fetch(imagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, 'some-child');
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("uploaded blob or file");
    });
  };

  var imagePreview;

  if(image){
    imagePreview = <Image  style={styles.image} source={{uri: imagePath}}/>;
  }else{
    imagePreview = <Image  style={styles.image} source={{uri: 'https://reactjs.org/logo-og.png'}}/>;
  }

  return (
    <View style={styles.container}>
      <Button title='Get Image' onPress={takeImageHandler}/>
      <Button title='Upload Image' onPress={uploadImage}/>
      <Button title='New Note' onPress={addNote}/>
      <Button title='ReadDB' onPress={readDB}/>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <StatusBar style="auto" />
      <FlatList
        data={notes}
        renderItem={({item}) => 
        // <Text style={styles.item}>{item.text}{item.key}</Text>  
        <Button style={styles.item} title={item.text} onPress={clickRow}/>  
      }
      />
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
  item: {
    padding: 10,
    fontSize: 11,
    height: 44,
    backgroundColor: "#68c",
    borderColor: "#944"
    
  },
  imagePreview:{
    width:'100%',
    height:200,
    alignItems:'center',
    backgroundColor: "#933"
  }, 
  image:{
    width:'100%',
    height:'100%'
  }
});



// sources:
// https://firebase.google.com/docs/web/setup#add-sdk-and-initialize
// https://firebase.google.com/docs/storage/web/upload-files