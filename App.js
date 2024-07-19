import { useEffect, useState } from 'react';
import NoteScreen from './app/screens/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './app/screens/indro';

export default function App() {
  const [user, setUser] = useState({})
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }

  }
  useEffect(() => {
      findUser();
    
  }, []);

  if(!user.name) return <Intro onFinish={findUser}/>;
  return (
    <NoteScreen user={user} />
  );
}

