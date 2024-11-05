import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Teachertimetable = () => {
  const [selectedClass, setSelectedClass] = useState('nursery');
  const [selectedSection, setSelectedSection] = useState('A');
  const [timetable, setTimetable] = useState(null);
  const navigation = useNavigation();

  const loadTimetable = () => {
    const generatedTimetable = generateTimetable(selectedClass, selectedSection);
    setTimetable(generatedTimetable);
  };

  return (
<View style={styles.mobileFrame}>
        {/* Header Section */}
        <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
            <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
            <Icon name="home" type="material" size={60} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyHeader} />
      <View style={styles.selectionContainer}>
        <Text style={styles.label}>Select Class:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
        >
          <Picker.Item label="Nursery" value="nursery" />
          <Picker.Item label="Class 1" value="1" />
          <Picker.Item label="Class 2" value="2" />
          {/* Continue adding up to Class 10 */}
        </Picker>

        <Text style={styles.label}>Select Section:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedSection}
          onValueChange={(itemValue) => setSelectedSection(itemValue)}
        >
          <Picker.Item label="Section A" value="A" />
          <Picker.Item label="Section B" value="B" />
          <Picker.Item label="Section C" value="C" />
        </Picker>

        <Button title="Load Timetable" onPress={loadTimetable} color='rgb(160, 180,182)' />
      </View>

      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          {timetable ? (
            <View style={styles.table}>
              {timetable.map((day, index) => (
                <View key={index} style={styles.dayContainer}>
                  <Text style={styles.dayHeader}>{day.day}</Text>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Period</Text>
                    <Text style={styles.tableHeaderText}>Subject</Text>
                  </View>
                  {day.periods.map((period, i) => (
                    <View key={i} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{period.period}</Text>
                      <Text style={styles.tableCell}>{period.teacher}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noTimetable}>No timetable available. Please select class and section.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const timetableData = {
  nursery: {
    A: {
      Monday: [
        { period: '1', teacher: 'English - Ms. Rose' },
        { period: '2', teacher: 'Math - Mr. Brown' },
        { period: '3', teacher: 'Science - Mrs. Smith' },
        { period: '4', teacher: 'Art - Mr. Green' },
        { period: '5', teacher: 'PE - Ms. Blue' },
        { period: '6', teacher: 'Music - Mr. White' },
        { period: '7', teacher: 'History - Mr. Grey' },
        { period: '8', teacher: 'Geography - Mrs. Pink' },
      ],
    },
    // Add more sections and days if needed
  },
};

const generateTimetable = (classSelected, sectionSelected) => {
  const periods = timetableData[classSelected]?.[sectionSelected] || {};
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  if (Object.keys(periods).length === 0) {
    return null;
  }

  return daysOfWeek.map((day) => ({
    day,
    periods: periods[day] || Array(8).fill({ period: '-', teacher: '-' }),
  }));
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 95,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  logo: {
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginTop:10,
  },
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0,
    marginTop: -40,
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
  selectionContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  tableContainer: {
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
    flexDirection: 'row',
  },
  dayContainer: {
    marginBottom: 20,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 5,
    width: 150, // Set a specific width for each day container
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e1e1e1',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 50, // Set a fixed height for table header cells
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40, // Set a fixed height for table row cells
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    height: '100%', // Ensure the cell takes the full height
  },
  dayHeader: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 18,
    textAlign: 'center',
  },
  noTimetable: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default Teachertimetable;
