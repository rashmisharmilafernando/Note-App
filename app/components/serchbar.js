import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, StatusBar } from 'react-native';
import colors from "../misc/colors";


const SearchBar = ({ containerStyle }) => {


    return (
        <>
            <View style={[styles.container,{...containerStyle}]}>
                <TextInput style={styles.searchbar} placeholder="Search here.."/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    searchbar:{
        borderWidth:0.5,
        borderColor:colors.PRIMARY,
        height:40,
        borderRadius:10,
        paddingLeft:15,
        fontSize:20,
        

    }



});

export default SearchBar;
