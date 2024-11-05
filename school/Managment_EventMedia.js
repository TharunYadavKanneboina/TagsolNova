import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from 'react-native-elements';

const ManagmentEventMediaUpload = ({ navigation }) => {
    const [eventName, setEventName] = useState('');

    const [uploaderName, setUploaderName] = useState('');
    const [uploaderDesignation, setUploaderDesignation] = useState('');
    const [eventMedia, setEventMedia] = useState([]);
    const [selectedFilesText, setSelectedFilesText] = useState('No file chosen');
    const [isUploading, setIsUploading] = useState(false); // Disable button during upload

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allow all file types
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                Alert.alert('File selection canceled', 'Please select a valid file.');
                return;
            }

            if (result.assets && result.assets.length > 0) {
                const file = result.assets[0];

                const isAlreadySelected = eventMedia.some(item => item.uri === file.uri);
                if (!isAlreadySelected) {
                    setEventMedia(prevMedia => [...prevMedia, file]);
                    const fileNames = file.name || file.uri.split('/').pop();
                    setSelectedFilesText(prevText => prevText === 'No file chosen' ? fileNames : `${prevText}, ${fileNames}`);
                } else {
                    Alert.alert('File already selected', 'This file has already been selected.');
                }
            } else {
                Alert.alert('File selection error', 'No valid file was selected.');
            }
        } catch (err) {
            console.error('Error picking document:', err);
            Alert.alert('Error picking document', 'Please try again.');
        }
    };

    const validateAndUpload = async () => {
        if (!eventName || !uploaderName || !uploaderDesignation || eventMedia.length === 0) {
            Alert.alert('Please fill all fields and select media files.');
            return;
        }

        setIsUploading(true); // Disable button to prevent duplicate submissions

        const formData = new FormData();
        eventMedia.forEach(file => {
            formData.append('attached_file', {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || 'application/octet-stream',
            });
        });

        formData.append('name_of_event', eventName);
        formData.append('uploader_name', uploaderName);
        formData.append('uploader_designation', uploaderDesignation);

        try {
            const response = await fetch('http://192.168.0.114:5000/api/upload-event-media', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', result.message || 'Files uploaded successfully!');
                setEventName('');
                setUploaderName('');
                setUploaderDesignation('');
                setEventMedia([]);
                setSelectedFilesText('No file chosen');
            } else {
                Alert.alert('Error', result.message || 'Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            Alert.alert('Upload Error', 'There was an error uploading your files. Please try again.');
        }

        setIsUploading(false); // Re-enable button after upload
    };

    return (
        <View style={styles.mobileFrame}>
            <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                    <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                    <Icon name="home" type="material" size={60} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.emptyHeader} />
            <View style={{ padding: 20 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={setEventName}
                />
                <TextInput
                    placeholder="Uploader Name"
                    value={uploaderName}
                    onChangeText={setUploaderName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Uploader Designation"
                    value={uploaderDesignation}
                    onChangeText={setUploaderDesignation}
                    style={styles.input}
                />
                <Button title="Select Media" onPress={pickDocument} color="#000" />
                <Text style={{ marginVertical: 10 }}>{selectedFilesText}</Text>
                <Button title="Upload" onPress={validateAndUpload} style={styles.button} disabled={isUploading} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mobileFrame: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 0,
        marginTop: -40,
    },
    mainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(160, 180,182)',
        paddingVertical: 10,
        height: 95,
        paddingHorizontal: 15,
        marginTop: 70,
    },
    emptyHeader: {
        height: 30,
        backgroundColor: 'rgb(160, 180,182)',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    button: {
        marginTop: 10,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default ManagmentEventMediaUpload;
