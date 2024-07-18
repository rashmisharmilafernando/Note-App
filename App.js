import { useEffect, useState } from 'react';
import NoteScreen from './app/screens/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [user,setUser] = useState({})
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    setUser(JSON.parse(result))
  }
  useEffect(() => {
    findUser()
  }, []);

  return (
    <NoteScreen user={user}/>
  );
}

