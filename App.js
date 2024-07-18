import { useEffect } from 'react';
import NoteScreen from './app/screens/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    console.log(result)
  }
  useEffect(() => {
    findUser()
  }, []);

  return (
    <NoteScreen />
  );
}

