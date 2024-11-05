import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const ManagmentAttendanceView = ({ navigation }) => {
  const [viewClass, setViewClass] = useState('');
  const [viewSection, setViewSection] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [showSectionPicker, setShowSectionPicker] = useState(false);


  // Sample classes and sections for the picker options
  const classes = ['Class 1', 'Class 2', 'Class 3'];
  const sections = ['A', 'B', 'C'];

  // Fetch Attendance Records
  const fetchAttendanceRecords = () => {
    const queryParams = new URLSearchParams({
      class: viewClass,
      section: viewSection,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    });

    fetch(`view_attendance .php?${encodeURIComponent(queryParams.toString())}`)      .then(response => response.json())
      .then(data => {
        if (data.records && data.records.length > 0) {
          setAttendanceRecords(data.records);
        } else {
          setAttendanceRecords([]);
          alert('No records found for the selected criteria.');
        }
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
        alert('Error in fetching attendance records. Please try again.');
      });
  };

  // Handling date change
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  // Handling class and section selection (simulate picker using text input)
  const selectClass = (selectedClass) => {
    setViewClass(selectedClass);
    setShowClassPicker(false);
  };

  const selectSection = (selectedSection) => {
    setViewSection(selectedSection);
    setShowSectionPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Main Header with Logo and Home Icon */}
      <View style={styles.mainHeader}>
      <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
        <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
          <Icon name="home" type="font-awesome" color="#000" style={styles.homeIcon} />
        </TouchableOpacity>
      </View>

      {/* Space between Main Header and Sub Header */}
      <View style={styles.space} />
        {/* Subheader */}
        <View style={styles.subHeader} />

{/* Content */}
<ScrollView contentContainerStyle={{ padding: 20 }}>
  <Card>
    <Text style={styles.title}>View Attendance Records</Text>

    {/* Class Picker */}
    <Text style={styles.label}>Class:</Text>
    <TouchableOpacity onPress={() => setShowClassPicker(!showClassPicker)}>
      <TextInput
        placeholder="Select Class"
        style={styles.input}
        value={viewClass}
        editable={false}
      />
    </TouchableOpacity>
    {showClassPicker && (
      <View style={styles.dropdown}>
        {classes.map((cls, index) => (
          <TouchableOpacity key={index} onPress={() => selectClass(cls)}>
            <Text style={styles.dropdownItem}>{cls}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

    {/* Section Picker */}
    <Text style={styles.label}>Section:</Text>
    <TouchableOpacity onPress={() => setShowSectionPicker(!showSectionPicker)}>
      <TextInput
        placeholder="Select Section"
        style={styles.input}
        value={viewSection}
        editable={false}
      />
    </TouchableOpacity>
    {showSectionPicker && (
      <View style={styles.dropdown}>
        {sections.map((section, index) => (
          <TouchableOpacity key={index} onPress={() => selectSection(section)}>
            <Text style={styles.dropdownItem}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

    {/* Start Date Picker */}
    <Text style={styles.label}>Date Range :</Text>
    <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
      <TextInput
        placeholder="Select Start Date"
        style={styles.input}
        value={startDate.toISOString().split('T')[0]}
        editable={false}
      />
    </TouchableOpacity>
    {showStartDatePicker && (
      <DateTimePicker
        value={startDate}
        mode="date"
        display="default"
        onChange={onStartDateChange}
      />
    )}

    {/* End Date Picker */}
    <Text style={styles.label}>To:</Text>
    <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
      <TextInput
        placeholder="Select End Date"
        style={styles.input}
        value={endDate.toISOString().split('T')[0]}
        editable={false}
      />
    </TouchableOpacity>
    {showEndDatePicker && (
      <DateTimePicker
        value={endDate}
        mode="date"
        display="default"
        onChange={onEndDateChange}
      />
    )}
    <Button title="View Attendance" onPress={fetchAttendanceRecords} color="#003153" />
        </Card>

        <View id="attendance-records">
          {attendanceRecords.length > 0 ? (
            <View style={styles.recordsTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCell}>Student Name</Text>
                <Text style={styles.tableCell}>Date</Text>
                <Text style={styles.tableCell}>Attendance</Text>
              </View>
              {attendanceRecords.map((record, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{record.student_name}</Text>
                  <Text style={styles.tableCell}>{record.date}</Text>
                  <Text style={styles.tableCell}>{record.attendance}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No records found for the selected criteria.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainHeader: {
    backgroundColor: '#AABEC3',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  homeIcon: {
    fontSize: 20,
  },
  space: {
    height: 10,
  },
  subHeader: {
    padding: 3,
    backgroundColor: '#AABEC3',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 1,
    marginTop: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#A0B4B6',
    marginBottom: 15,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  recordsTable: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ManagmentAttendanceView;