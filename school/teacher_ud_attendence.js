import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [studentsLoaded, setStudentsLoaded] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
  const navigation = useNavigation();

  const loadStudents = () => {
    const mockStudents = [
      { name: "John", icon: "person" },
      { name: "Smith", icon: "person" },
      { name: "Alex", icon: "person" },
      { name: "Virat", icon: "person" },
      { name: "Dhoni", icon: "person" },
      { name: "Rohit", icon: "person" },
      { name: "Sachin", icon: "person" },
      { name: "Jadeja", icon: "person" },
      { name: "Hardik", icon: "person" },
      { name: "Meena", icon: "person" },

    ];
    setStudents(mockStudents);
    setAttendance({});
    setStudentsLoaded(true);
  };

  const submitAttendance = () => {
    console.log('Submitting attendance:', attendance);
    alert('Attendance submitted successfully!');
  };

  const handleStudentIconClick = (index) => {
    const currentStatus = attendance[`attendance_${index}`];
    if (currentStatus === 'present') {
      setAttendance({ ...attendance, [`attendance_${index}`]: 'absent' });
      setSelectedStudentIndex(index);
      setLeaveModalVisible(true);
    } else if (currentStatus === 'absent') {
      setAttendance({ ...attendance, [`attendance_${index}`]: null });
    } else {
      setAttendance({ ...attendance, [`attendance_${index}`]: 'present' });
    }
  };

  const handleLeaveOption = (type) => {
    setAttendance({ ...attendance, [`attendance_${selectedStudentIndex}`]: 'absent' });
    setLeaveModalVisible(false);
  };

  const renderStudentGrid = () => {
    return (
      <View style={styles.gridContainer}>
        {students.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <TouchableOpacity
              onPress={() => handleStudentIconClick(index)}
              style={[
                styles.studentIcon,
                attendance[`attendance_${index}`] === 'present'
                  ? styles.presentIcon
                  : attendance[`attendance_${index}`] === 'absent'
                  ? styles.absentIcon
                  : styles.defaultIcon,
              ]}
            >
              <Icon name={student.icon} size={30} color={attendance[`attendance_${index}`] ? "#fff" : "gray"} />
            </TouchableOpacity>
            <Text style={styles.studentName}>{student.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.mobileFrame}>
      <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
          <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
          <Icon name="home" size={60} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.emptyHeader} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Select Class and Section</Text>
          <Text style={{ fontWeight: 'bold' }}>Class:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedClass}
            onValueChange={(itemValue) => {
              setSelectedClass(itemValue);
              setStudentsLoaded(false);
              setAttendance({});
            }}
          >
            <Picker.Item label="Select Class" value="" />
            <Picker.Item label="Class 1" value="Class 1" />
            <Picker.Item label="Class 2" value="Class 2" />
            <Picker.Item label="Class 3" value="Class 3" />
          </Picker>

          <Text style={{ fontWeight: 'bold' }}>Section:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedSection}
            onValueChange={(itemValue) => {
              setSelectedSection(itemValue);
              setStudentsLoaded(false);
              setAttendance({});
            }}
          >
            <Picker.Item label="Select Section" value="" />
            <Picker.Item label="Section A" value="Section A" />
            <Picker.Item label="Section B" value="Section B" />
            <Picker.Item label="Section C" value="Section C" />
          </Picker>

          <Button title="Load Students" onPress={loadStudents} disabled={!selectedClass || !selectedSection} color="rgb(160, 180,182)" />

          {studentsLoaded && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Student List</Text>
              {renderStudentGrid()}
              <Button title="Submit Attendance" onPress={submitAttendance} color="rgb(160, 180,182)" />
            </View>
          )}
        </View>
      </ScrollView>

      <Modal visible={leaveModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Leave Type</Text>
            <TouchableOpacity onPress={() => handleLeaveOption('planned')}>
              <Text style={styles.leaveOption}>Planned Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLeaveOption('unplanned')}>
              <Text style={styles.leaveOption}>Unplanned Leave</Text>
            </TouchableOpacity>
            <Button
              title="Cancel"
              onPress={() => setLeaveModalVisible(false)}
              color="rgb(160, 180,182)" // Set button color here
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: 'rgb(160, 180,182)',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 90,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 70,
  },
  logo: {
    width: 60,
    height: 70,
  },
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0,
    marginTop: -40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  picker: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  studentContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '30%', // Ensures that there are 3 students in a row
  },
  studentIcon: {
    padding: 5,
    borderRadius: 35, // Make it round
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  emptyHeader: {
    height: 30,
    backgroundColor: 'rgb(160, 180, 182)',
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  presentIcon: {
    backgroundColor: 'green',
  },
  absentIcon: {
    backgroundColor: 'red',
  },
  defaultIcon: {
    backgroundColor: 'gray',
  },
  studentName: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  leaveOption: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default TeacherAttendance;
