import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, {
  useState, 
  useCallback
} from 'react';

import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore'

import {database} from './config/firebase'
import FlatListDemo from './FlatListDemo';
export default function App() {
  const chatColl = 'notes';
  const [notes, setNotes] = useState([]);
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
        text: "New note"
    });
  }

  const clickRow = () => {
    alert("hej");
  }

  return (
    <View style={styles.container}>
      <Button title='New Note' onPress={addNote}/>
      <Button title='ReadDB' onPress={readDB}/>
      <Text>Open up App.js to start working on your app</Text>
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
});
