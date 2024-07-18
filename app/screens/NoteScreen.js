import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, StatusBar } from 'react-native';

const NoteScreen = () => {


    return (
        <>
            <View style={styles.container}>
                <Text>
                    NoteScreen
                </Text>
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

});

export default NoteScreen;
