import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, View, Text, StatusBar, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import colors from "../misc/colors";
import SearchBar from "../components/serchbar";
import RoundIconBtn from "../components/RoundIconButton";

const Note = ({ item }) => {
    const { title, desc } = item;

    return (
        <>

            <View style={styles.container}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text numberOfLines={2}>{desc}</Text>


            </View>

        </>
    );



}
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        padding:8,
        borderRadius:10,
         

    },
    title:{
        fontWeight:'bold',
        fontSize:16,
        color:colors.LIGHT
    }



});

export default Note;
