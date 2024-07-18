import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text ,StatusBar} from 'react-native';
import RounedIconBtn from '../components/RoundIconButton';
import colors from "../misc/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = () => {
    const [name, setName] = useState(''); 
    const handleOnChangeText = text => setName(text);
    const handleSubmit=async()=>{
        const user = { name:name }
        await AsyncStorage.setItem('user',JSON.stringify(user))
    }

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter your name to continue</Text>
                <TextInput 
                    value={name} 
                    onChangeText={handleOnChangeText} 
                    placeholder="Enter Name" 
                    style={styles.textInput} 
                />
                {name.trim().length >= 3 ? (
                    <RounedIconBtn antIconName='arrowright' onPress={handleSubmit}/>
                ) : null}           
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '90%', 
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15,
        margin:5
    },
    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
        
    }
});

export default Intro;
