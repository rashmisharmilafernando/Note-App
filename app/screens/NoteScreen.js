import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import colors from "../misc/colors";
import SearchBar from "../components/serchbar";
import RoundIconBtn from "../components/RoundIconButton";
import NoteInputModel from "../components/NoteInputModel"
import Note from "../components/Note"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNote } from "../../contents/NoteProvider";




const NoteScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const { notes, setNotes } = useNote()

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning..!');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon..!');
        setGreet('Evening..!');

    };

    useEffect(() => {
        findGreet();


    }, []);

    const handleOnSubmit = async (title, desc) => {

        const note = { id: Date.now(), title: title, desc, time: Date.now() };
        const updateNotes = [...notes, note];
        setNotes(updateNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
    }
    const openNote = (note) => {
        navigation.navigate('NoteDetails', { note });
    };

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                <View style={styles.container}>
                    <Text style={styles.header}>
                        {`Good ${greet} ${user.name}`}
                    </Text>
                    {notes.length ? (
                        <SearchBar containerStyle={{ marginVertical: 15 }} />
                    ) : null}
                    <FlatList
                        data={notes}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}

                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <Note onPress={() => openNote(item)} item={item} />}
                    />
                    {!notes.length ? (
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeanderContainer]}>
                            <Text style={styles.emptyHeander}>Add Notes</Text>

                        </View>

                    ) : null}

                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn
                onPress={() => setModalVisible(true)}
                antIconName='plus'
                style={styles.addBtn} />
            <NoteInputModel
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onsubmit={handleOnSubmit}
            />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },
    emptyHeander: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,

    },
    emptyHeanderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -2

    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1
    }

});

export default NoteScreen;
