import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, View, Text, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Alert, Button, TouchableOpacity } from 'react-native';
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconButton";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "./ImageViewer";

const NoteInputModel = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [showImageOptions, setShowImageOptions] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title);
            setDesc(note.desc);
            setImages(note.images || []);
        }
    }, [isEdit]);

    const handleModelClose = () => {
        Keyboard.dismiss();
    };

    const closeModel = () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
            setImages([]);
        }
        onClose();
    };

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    };

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();

        if (isEdit) {
            onSubmit(title, desc, Date.now(), images);
        } else {
            onSubmit(title, desc, images);
            setTitle('');
            setDesc('');
            setImages([]);
        }
        onClose();
    };

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
        } else {
            alert("You did not select any image.");
        }
    };

    const handleImageLongPress = (imageUri) => {
        setSelectedImageUri(imageUri);
        setShowImageOptions(true);
    };

    const handleImageOptions = async (option) => {
        if (option === 'select') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const updatedImages = images.map(imgUri =>
                    imgUri === selectedImageUri ? result.assets[0].uri : imgUri
                );
                setImages(updatedImages);
            }
        } else if (option === 'delete') {
            const updatedImages = images.filter(imgUri => imgUri !== selectedImageUri);
            setImages(updatedImages);
        }
        setShowImageOptions(false);
    };

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
                        placeholder="Type something..."
                        style={[styles.input, styles.desc]}
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                    />
                    <ScrollView horizontal style={styles.imageContainer}>
                        {images.map((imageUri, index) => (
                            <TouchableOpacity key={index} onLongPress={() => handleImageLongPress(imageUri)}>
                                <ImageViewer key={index} selectedImage={imageUri} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={styles.toolBtnContainer}>
                        <RoundIconBtn size={15} antIconName='upload' onPress={handleImagePick} />
                    </View>

                    <View style={styles.btnContainer}>
                        <RoundIconBtn
                            size={15}
                            antIconName='check'
                            onPress={handleSubmit}
                        />
                        {(title.trim() || desc.trim() || images.length > 0) && (
                            <RoundIconBtn
                                size={15}
                                style={{ marginLeft: 15 }}
                                antIconName='close'
                                onPress={closeModel}
                            />
                        )}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModelClose}>
                    <View style={[styles.modelBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                visible={showImageOptions}
                transparent
                animationType="slide"
                onRequestClose={() => setShowImageOptions(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.btnContainer}>
                        <RoundIconBtn size={15} antIconName='upload' style={styles.button} onPress={() => handleImageOptions('select')} />
                        <RoundIconBtn size={15} antIconName='delete' style={styles.button} onPress={() => handleImageOptions('delete')} />
                        <RoundIconBtn size={15} antIconName='close' style={styles.button} onPress={() => setShowImageOptions(false)} />
                    </View>

                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    input: {
        fontSize: 20,
        color: colors.DARK,
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 48,
    },
    desc: {
        height: 100,
    },
    imageContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 5,
    },
    modelBG: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,


    },
    toolBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        paddingVertical: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,


    },
    button: {
        marginHorizontal: 5,
    },
});

export default NoteInputModel;
