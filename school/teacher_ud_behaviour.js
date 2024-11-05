import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const TeacherBehaviour = () => {
  const [classSelected, setClassSelected] = useState('');
  const [sectionSelected, setSectionSelected] = useState('');
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [behaviorComment, setBehaviorComment] = useState('');
  const [submittedReports, setSubmittedReports] = useState([]); // Track submitted reports
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const studentsData = {
    class1: {
      sectionA: ['John Doe', 'Jane Smith', 'Mark Taylor', 'Virat', 'Sachin', 'Rohit', 'Kalyan', 'Joshi', 'Power'],
      sectionB: ['Alice Brown', 'David Johnson'],
    },
    class2: {
      sectionA: ['Chris Evans', 'Natalie Adams'],
      sectionB: ['Emma Watson', 'Tom Hanks'],
    },
  };

  const loadStudents = () => {
    if (classSelected && sectionSelected) {
      const students = studentsData[classSelected]?.[sectionSelected] || [];
      setStudents(
        students.map((student, index) => ({ id: index.toString(), name: student }))
      );
    } else {
      Alert.alert('Error', 'Please select both class and section');
    }
  };

  const openModal = (studentName) => {
    setSelectedStudent(studentName);
    setBehaviorComment(''); // Clear previous comment
    setModalVisible(true);
  };

  const submitReport = () => {
    console.log(`Behavior report submitted for ${selectedStudent}: ${behaviorComment}`);
    Alert.alert('Success', 'Report submitted successfully!');
    setSubmittedReports([...submittedReports, selectedStudent]); // Add student to submitted list
    setModalVisible(false);
  };

  const searchStudents = (text) => {
    setSearchText(text);
    const filteredStudents = studentsData[classSelected]?.[sectionSelected]?.filter((student) =>
      student.toLowerCase().includes(text.toLowerCase())
    ) || [];
    setStudents(filteredStudents.map((student, index) => ({ id: index.toString(), name: student })));
  };

  const renderStudent = ({ item }) => {
    const isSubmitted = submittedReports.includes(item.name);
    return (
      <TouchableOpacity style={styles.studentContainer} onPress={() => openModal(item.name)}>
        <View style={[styles.iconContainer, isSubmitted && { backgroundColor: 'rgb(160, 180, 182)' }]}>
          <Icon name="person" type="material" size={40} color={isSubmitted ? "#fff" : "#000"} />
        </View>
        <Text style={styles.studentName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mobileFrame}>
      {/* Header Section */}
      <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
          <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
          <Icon name="home" type="material" size={60} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.headerText}>Select Class and Section</Text>

        <Text style={styles.label}>Class</Text>
        <PickerSelect
          style={pickerSelectStyles}
          onValueChange={(itemValue) => setClassSelected(itemValue)}
          items={[
            { label: 'Select Class', value: '' },
            { label: 'Class 1', value: 'class1' },
            { label: 'Class 2', value: 'class2' },
          ]}
        />

        <Text style={styles.label}>Section</Text>
        <PickerSelect
          style={pickerSelectStyles}
          onValueChange={(itemValue) => setSectionSelected(itemValue)}
          items={[
            { label: 'Select Section', value: '' },
            { label: 'Section A', value: 'sectionA' },
            { label: 'Section B', value: 'sectionB' },
          ]}
        />

        <Button title="Load Students" onPress={loadStudents} disabled={!classSelected || !sectionSelected} color="rgb(160, 180,182)" />

        <TextInput
          style={styles.input}
          placeholder="Search student by name..."
          onChangeText={(text) => searchStudents(text)}
          value={searchText}
        />

        {/* FlatList for Students */}
        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={(item) => item.id}
          numColumns={3} // Display 3 students per row
          contentContainerStyle={styles.studentList}
        />

        <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={{ backgroundColor: 'rgb(160, 180, 182)', borderRadius: 5, padding: 10, alignItems: 'center' }} onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
              </TouchableOpacity>
              <Text>Behavior Report for {selectedStudent}</Text>
              <TextInput
                placeholder="Enter behavior comment"
                value={behaviorComment}
                onChangeText={setBehaviorComment}
                style={styles.behaviorInput}
              />
              <TouchableOpacity style={{ backgroundColor: 'rgb(160, 180, 182)', borderRadius: 5, padding: 10, alignItems: 'center' }} onPress={submitReport}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  logo: {
    width: 60,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'rgb(160, 180, 182)',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  studentContainer: {
    alignItems: 'center',
    padding: 10,
    margin: 5,
    width: '30%', // Ensure 3 students per row
  },
  iconContainer: {
    backgroundColor: 'transparent', // Default no color
    borderRadius: 50, // Make the icon round
    padding: 5,
  },
  studentName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  behaviorInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginVertical: 10,
  },
  studentList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fff',
    fontSize: 15,
    color: '#333',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
};

export default TeacherBehaviour;


