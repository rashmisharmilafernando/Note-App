import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import colors from "../misc/colors";

const Note = ({ item, onPress }) => {
    const { title, desc, images } = item;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text numberOfLines={10}>{desc}</Text>
            {images && images.length > 0 && (
                <ScrollView horizontal style={styles.imageContainer}>
                    {images.map((imageUri, index) => (
                        <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                    ))}
                </ScrollView>
            )}
        </TouchableOpacity>
    );
}

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        height: 200,
        padding: 8,
        borderRadius: 10,
        marginBottom: 10,  
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT
    },
    imageContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 5,
    }
});

export default Note;
