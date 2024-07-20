import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, View, Text, StatusBar, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native';
import colors from "../misc/colors";
import SearchBar from "./Serchbar";
import RoundIconBtn from "../components/RoundIconButton";

const Note = ({ item,onPress}) => {
    const { title, desc } = item;

    return (
        <>

            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text numberOfLines={10}>{desc}</Text>


            </TouchableOpacity>

        </>
    );



}
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        height:200,
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
