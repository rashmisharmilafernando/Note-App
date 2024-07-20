import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNote } from "../../contents/NoteProvider";
import NoteInputModel from "./NoteInputModel";

const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
}

const NoteDetails = (props) => {
    const [note, setNote] = useState(props.route.params.note)

    const headerHeight = useHeaderHeight();
    const { setNotes } = useNote();
    const [showModal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);

        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
    }

    const dispalyDelectAlert = () => {
        Alert.alert(
            'Are you sure!',
            "This action will delete your note permanently!",
            [
                {
                    text: 'Delete',
                    onPress: deleteNote
                },
                {
                    text: 'No Thanks',
                    onPress: () => console.log("No Thanks")
                }
            ],
            {
                cancelable: true
            }
        );
    }

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes')
        let notes = [];
        if (result != null) notes = JSON.parse(result)
        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title
                n.desc = desc
                n.isUpdated = true
                n.time = time
            }
            setNote(n);
            return n;
        })
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    }
    const handleOnClose = () => setModal(false)
    const openEditModal = () => {
        setIsEdit(true)
        setModal(true)
    }
    return (
        <>
            <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
                <Text style={styles.time}>{note.isUpdated
                    ? `Updated At ${formatDate(note.time)}`
                    : `Created At ${formatDate(note.time)}`}
                </Text>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.desc}>{note.desc}</Text>
            </ScrollView>
            <View style={styles.btnContainer}>
                <RoundIconBtn
                    antIconName='delete'
                    style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
                    onPress={dispalyDelectAlert}
                />
                <RoundIconBtn
                    antIconName='edit'
                    style={{ backgroundColor: colors.PRIMARY }}
                    onPress={openEditModal}
                />
            </View>
            <NoteInputModel isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
        </>
    );
}

const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 70,
    },
    title: {
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 20,
        opacity: 0.6
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5,
        paddingTop: 30,
    },
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50
    }
});

export default NoteDetails;
