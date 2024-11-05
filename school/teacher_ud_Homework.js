import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

const TeacherHomeworkUpload = () => {
  const [classInput, setClassInput] = useState('');
  const [sectionInput, setSectionInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [homeworkMedia, setHomeworkMedia] = useState([]);
  const [selectedFilesText, setSelectedFilesText] = useState('No file chosen');
  const [homeworkList, setHomeworkList] = useState([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      console.log('Document Picker Result:', result);

      if (result.canceled) {
        Alert.alert('File selection canceled', 'Please select a valid file.');
        return;
      }

      if (result.uri) {
        setHomeworkMedia(prev => [...prev, result]);
        const fileNames = result.name || result.uri.split('/').pop();
        setSelectedFilesText(prev => (prev === 'No file chosen' ? fileNames : `${prev}, ${fileNames}`));
      } else {
        Alert.alert('Error', 'Could not retrieve file information. Please try again.');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'An error occurred while picking the document. Please try again.');
    }
  };

  const validateAndUpload = async () => {
    if (!classInput || !sectionInput || !subjectInput || !descriptionInput || homeworkMedia.length === 0) {
      Alert.alert('Please fill all fields and select media files.');
      return;
    }

    const formData = new FormData();
    homeworkMedia.forEach(file => {
      formData.append('homework_file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/pdf',
      });
    });

    formData.append('class_name', classInput);
    formData.append('section', sectionInput);
    formData.append('subject', subjectInput);
    formData.append('description', descriptionInput);

    try {
      const response = await fetch('http://192.168.0.114:3000/upload-homework', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message || 'Files uploaded successfully!');
        resetForm();
      } else {
        Alert.alert('Error', result.message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading homework:', error);
      Alert.alert('Upload Error', 'There was an error uploading your files. Please try again.');
    }
  };

  const resetForm = () => {
    setClassInput('');
    setSectionInput('');
    setSubjectInput('');
    setDescriptionInput('');
    setHomeworkMedia([]);
    setSelectedFilesText('No file chosen');
  };

  const fetchHomeworkList = async () => {
    try {
      const response = await fetch('http://192.168.0.114:3000/homework-list');
      const result = await response.json();
      if (response.ok) {
        setHomeworkList(result);
      } else {
        Alert.alert('Error fetching homework list', result.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Error fetching homework list:', error);
      Alert.alert('Error fetching homework', 'There was an error fetching the homework list. Please try again.');
    }
  };

  const openDocument = async (base64Data) => {
    const fileUri = `${FileSystem.documentDirectory}document.pdf`;

    try {
      if (base64Data.startsWith('data:application/pdf;base64,')) {
        const base64String = base64Data.split(',')[1];
        await FileSystem.writeAsStringAsync(fileUri, base64String, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          throw new Error('File does not exist after writing.');
        }

        await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_VIEW, {
          data: fileUri,
          type: 'application/pdf',
        });
      } else {
        throw new Error('Base64 data is not in the correct format.');
      }
    } catch (error) {
      console.error('Error opening document:', error);
      Alert.alert('Error', error.message || 'Could not open the document.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Class" value={classInput} onChangeText={setClassInput} />
      <TextInput style={styles.input} placeholder="Section" value={sectionInput} onChangeText={setSectionInput} />
      <TextInput style={styles.input} placeholder="Subject" value={subjectInput} onChangeText={setSubjectInput} />
      <TextInput style={styles.input} placeholder="Description" value={descriptionInput} onChangeText={setDescriptionInput} />

      <TouchableOpacity onPress={pickDocument} style={styles.button}>
        <Text>{selectedFilesText}</Text>
      </TouchableOpacity>
      <Button title="Upload Homework" onPress={validateAndUpload} />
      <Button title="Fetch Homework List" onPress={fetchHomeworkList} />

      <FlatList
        data={homeworkList}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Class: {item.class_name}</Text>
            <Text>Section: {item.section}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Description: {item.description}</Text>
            <TouchableOpacity onPress={() => openDocument(item.homework_file)}>
              <Text style={styles.link}>View Document</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default TeacherHomeworkUpload;
