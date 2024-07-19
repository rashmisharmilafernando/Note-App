import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, View, Text, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from "../misc/colors";
import SearchBar from "../components/serchbar";
import RoundIconBtn from "../components/RoundIconButton";

const NoteInputModel = ({ visible, onClose, onsubmit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const handleModelClose = () => {
        Keyboard.dismiss();

    };
    const closeModel = () => {
        setTitle('');
        setDesc('');
        onClose();

    }
    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();
        onsubmit(title, desc);
        setTitle('');
        setDesc('');
        onClose();

    }
    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType="fade">

                <View style={styles.container}>

                    <TextInput
                        value={title}
                        placeholder="Title"
                        style={[styles.input, styles.title]}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                    />
                    <TextInput
                        value={desc}
                        multiline
                        placeholder="Note"
                        style={[styles.input, styles.desc]}
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                    />
                    <View style={styles.btnContainer}>
                        <RoundIconBtn size={15}
                            antIconName='check'
                            onPress={handleSubmit}
                        />
                        {title.trim() || desc.trim() ? (
                            < RoundIconBtn
                            size={15}
                            style={{ marginLeft: 15 }}
                            antIconName='close'
                            onPress={closeModel}

                        />
                        ) : null}

                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModelClose}>
                    <View style={[styles.modelBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>


            </Modal>
        </>
    );



}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',

    },
    desc: {
        height: 100,

    },
    modelBG: {
        flex: 1,
        zIndex: -1,

    }
    ,
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    }


});

export default NoteInputModel;
