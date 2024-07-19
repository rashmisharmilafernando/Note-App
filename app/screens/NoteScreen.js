import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import colors from "../misc/colors";
import SearchBar from "../components/serchbar";
import RoundIconBtn from "../components/RoundIconButton";
import NoteInputModel from "../components/NoteInputModel"
import Note from "../components/Note"
import AsyncStorage from "@react-native-async-storage/async-storage";
const NoteScreen = ({ user }) => {
    const [greet, setGreet] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning..!');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon..!');
        setGreet('Evening..!');

    };

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');

        if (result !== null) setNotes(JSON.parse(result));
    }

    useEffect(() => {
        findNotes();

        findGreet();
    }, []);

    const handleOnSubmit = async (title, desc) => {

        const note = { id: Date.now(), title: title, desc, time: Date.now() };
        const updateNotes = [...notes, note];
        setNotes(updateNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
    }

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
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Note item={item} />}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
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
        bottom: 50
    }

});

export default NoteScreen;
