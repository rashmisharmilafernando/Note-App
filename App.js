import { useEffect, useState } from 'react';
import NoteScreen from './app/screens/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './app/screens/indro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetails from './app/components/NoteDetails';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './contents/NoteProvider';
import { Text } from 'react-native';
import colors from './app/misc/colors';
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center', // Aligns title to the center
            headerTransparent: true,
          }}
        >
          <Stack.Screen
            component={RenderNoteScreen}
            name="NoteScreen"
            options={{
              headerTitle: (props) => <Text {...props} style={{ color: colors.PRIMARY, fontSize: 36,fontWeight:'bold' }}>My Notes</Text>,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />
          <Stack.Screen
            component={NoteDetails}
            name="NoteDetails"
            options={{
              headerTitle: (props) => <Text {...props} style={{ color: colors.PRIMARY, fontSize: 36,fontWeight:'bold'  }}>Note Details</Text>,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}
