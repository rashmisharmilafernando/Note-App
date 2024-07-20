import React, { useEffect, createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NoteContext = createContext();
const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');

        if (result !== null) setNotes(JSON.parse(result));
    };

    useEffect(() => {
        findNotes();
    }, []);

    return (
        <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => useContext(NoteContext);

export default NoteProvider;
