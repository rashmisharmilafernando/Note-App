import { useEffect, useState } from 'react';
import NoteScreen from './app/screens/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './app/screens/indro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetails from './app/components/NoteDetails';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './contents/NoteProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (!user.name) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
          <Stack.Screen component={RenderNoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetails} name="NoteDetails" />
        </Stack.Navigator>
      </NoteProvider>

    </NavigationContainer>
  );
}
