import { 
    TextInput, View, Image, StyleSheet, Button 
    } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import React, {
  useState
} from 'react';
import {
  doc,
  collection,
  addDoc,
  setDoc,
  query,
  onSnapshot
} from 'firebase/firestore';
import {database, storage} from '../config/firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

const DetailView = ({navigation, route}) => {
    const [text, setText] = useState(route.params.object.text);
    const [hasImage, setHasImage] = useState(route.params.object.hasImage);
    const [imagePath, setImagePath] = useState(null);
  
    const chatColl = 'notes';
    const takeImageHandler = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing:true
      });
    setImage(result); // was result.assets[0].uri
    setImagePath(result.assets[0].uri); // was result.assets[0].uri
    setHasImage(true);
  }

  const uploadImage = async () => {
    const res = await fetch(imagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, route.params.object.key);
    uploadBytes(storageRef, blob).then((snapshot) => {
    console.log("uploaded blob or file " );
    
    });
};

  const downloadImage = async () => {
    const storageRef = ref(storage, route.params.object.key);
    getDownloadURL(storageRef)
    .then((url) => {
    // Insert url into an <img> tag to "download"
    setImagePath(url);
    })
    .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/object-not-found':
        // File doesn't exist
        break;
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
        // User canceled the upload
        break;

        // ...

        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
    });
  };

  if(hasImage){
    downloadImage()
  }

  const updateNote = async () => {
    await setDoc(doc(database, chatColl, route.params.object.key), {
        text:text,
        hasImage: hasImage
    })
}
    
    return (
    <View>
        <Button title='Save' onPress={updateNote}/>
        <Button title='UploadImage' onPress={uploadImage}/>
        <Button title='Get Image' onPress={takeImageHandler}/>
        <TextInput multiline={true} 
          onChangeText={newText => setText(newText)}>
            {route.params.object.text}
        </TextInput>
        <Image  style={styles.image} source={{uri: imagePath}}/>
    </View> );
  };

export default DetailView;


const styles = StyleSheet.create({
  image:{
    width:200,
    height:200
  }
});