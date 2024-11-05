import React, { useState } from 'react';
import { View, Text, Image, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';


const MobileLogin = () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [students, setStudents] = useState([]);
    const [behaviorComments, setBehaviorComments] = useState({});

    const loadStudents = () => {
        // Load students based on selectedClass and selectedSection
        const studentsData = {
            class1: {
                sectionA: ['John Doe', 'Jane Smith', 'Mark Taylor'],
                sectionB: ['Alice Brown', 'David Johnson']
            },
            class2: {
                sectionA: ['Chris Evans', 'Natalie Adams'],
                sectionB: ['Emma Watson', 'Tom Hanks']
            }
        };

        const students = studentsData[selectedClass]?.[selectedSection] || [];

        setStudents(students);
    };

    const handleSubmit = () => {
        // Submit behavior report logic
        const data = { ...behaviorComments };

        // Send the data to the server (use fetch or AJAX)
        fetch('/submitBehaviorReport', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            // Show success or failure message
            const messageElement = document.getElementById('behaviorMessage');
            if (result.success) {
                messageElement.innerHTML = "Behavior report submitted successfully!";
                messageElement.style.color = "green";
            } else {
                messageElement.innerHTML = "Failed to submit behavior report. Please try again.";
                messageElement.style.color = "red";
            }
        })
        .catch(error => {
            const messageElement = document.getElementById('behaviorMessage');
            messageElement.innerHTML = "An error occurred. Please try again.";
            messageElement.style.color = "red";
            console.error('Error:', error);
        });
    };

    const handleBehaviorCommentChange = (index, value) => {
        setBehaviorComments({ ...behaviorComments, [`behavior_comment_${index}`]: value });
    };

    return (
<View style={styles.mobileFrame}>
      <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity>
          <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Icon name="home" type="material" size={60} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.emptyHeader} />
            <ScrollView className="container">
            <Text style={{ fontSize: 29 ,fontWeight:'bold',textAlign:'center'}}>Select Class and Section</Text>
            <Text style={{  textAlign:'left', marginLeft:10}}> Class: </Text>
                <Picker style={styles.picker}
                    selectedValue={selectedClass}
                    onValueChange={(itemValue) => setSelectedClass(itemValue)}>
                    <Picker.Item label="Select Class" value="" />
                    <Picker.Item label="Class 1" value="class1" />
                    <Picker.Item label="Class 2" value="class2" />
                </Picker>

                <Text style={{  textAlign:'left', marginLeft:10}}> Section: </Text>
                <Picker style={styles.picker}
                    selectedValue={selectedSection}
                    onValueChange={(itemValue) => setSelectedSection(itemValue)}>
                    <Picker.Item label="Select Section" value="" />
                    <Picker.Item label="Section A" value="sectionA" />
                    <Picker.Item label="Section B" value="sectionB" />
                </Picker>

                <Button title="Load Students" onPress={loadStudents} />

                <View id="behaviorMessage" style={styles.message}>
                <Text style={{ fontSize: 20 ,fontWeight:'bold',textAlign:'left',marginLeft:10}}>Student List - Behavior Report</Text>
                <ScrollView style={styles.studentListWrapper}>
    {students.map((student, index) => (
      <View key={index} style={styles.studentItem}>
        <Text style={styles.input}>{student}</Text>
        <TextInput 
          style={styles.behaviorComment}
          placeholder="Enter behavior comment"
          onChangeText={(text) => handleBehaviorCommentChange(index, text)}
        />
      </View>
    ))}
  </ScrollView>
  <Button title="Submit Report" onPress={handleSubmit} style={{ backgroundColor: 'green' }} />
  </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
  mobileFrame: {
      flex: 1,
      backgroundColor: '#fff',
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },
  logo: {
      width: 100,
      height: 30,
      resizeMode: 'contain',
  },
  container: {
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  attendanceMessage: {
      marginTop: 20,
  },
  studentListTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  studentListWrapper: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
  },
  studentItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },
  studentName: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  attendanceStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  attendanceButton: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
  },
  attendanceButtonActive: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d1dde6',
    paddingVertical: 10,
    height: 120,
    paddingHorizontal: 15,
    marginTop: 80,
    backgroundColor: 'rgb(160, 180,182)'
    
  },
  logo: {
    width: 100,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0, // set paddingTop to 0
    marginTop: -40, // set marginTop to -40 (or the height of your header)
  },
  emptyHeader: {
    height: 30,
    backgroundColor: '#d1dde6',
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  picker: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',

},
logo:{
  width:80,
  height:80,
  marginRight:100,
  alignItems:'center',
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
},
input: {
  marginVertical: 10,
  borderBottomWidth: 1,
  padding: 20,
  borderColor: '#ccc',
  borderRadius: 8,
  backgroundColor: '#fff',
  fontSize: 16,
  color: '#333',
},
});

export default MobileLogin;