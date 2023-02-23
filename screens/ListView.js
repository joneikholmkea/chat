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

import {database, storage} from '../config/firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import DetailView from '../screens/DetailView';

const ListView = ({navigation, route}) => {  // route.params.xxx

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
            key: snap.id
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
        const storageRef = ref(storage, 'somechild.png');
        uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("uploaded blob or file " + snapshot);
        });
    };

    const downloadImage = async () => {
        const storageRef = ref(storage, 'somechild.png');
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

    const clickRow = (obj) => {
        // alert("row click " + str);
        obj.imagePath = imagePath;
        navigation.navigate('DetailView', {object: obj})
    }

    var imagePreview;

    if(imagePath){
        imagePreview = <Image  style={styles.image} source={{uri: imagePath}}/>;
    }else{
        imagePreview = <Image  style={styles.image} source={{uri: 'https://reactjs.org/logo-og.png'}}/>;
    }
    
    return (
        <View style={styles.container}>
            <Button title='New Note' onPress={addNote}/>
            <Button title='ReadDB' onPress={readDB}/>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <StatusBar style="auto" />
            <FlatList
                data={notes}
                renderItem={({item}) => 
                <Button style={styles.item} 
                    title={item.text} 
                    onPress={() => clickRow(item)}/>  
                }
            />
        </View> 
    );
};

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


  export default ListView;