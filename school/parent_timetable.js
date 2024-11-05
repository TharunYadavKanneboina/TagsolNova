import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Remove the duplicate useNavigation import


const ParentTimetable = () => {
  const [timetableData, setTimetableData] = useState({
    Monday: [
      { period: 'M', subject: 'Mathematics', teacher: 'Mr. Smith' },
      { period: 'E', subject: 'English', teacher: 'Mrs. Johnson' },
      { period: 'S', subject: 'Science', teacher: 'Mr. Lee' },
      { period: 'H', subject: 'History', teacher: 'Ms. Davis' },
      { period: 'P', subject: 'Physical Education', teacher: 'Mr. Green' },
    ],
    // Repeat for other days...
  });

  const [currentDay, setCurrentDay] = useState('');
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(-1);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Corrected this to only use one useNavigation


  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    let periodIndex = -1;
    if (currentHour >= 9 && currentHour < 10) periodIndex = 0;
    if (currentHour >= 10 && currentHour < 11) periodIndex = 1;
    if (currentHour >= 11 && currentHour < 12) periodIndex = 2;
    if (currentHour >= 12 && currentHour < 13) periodIndex = 3;
    if (currentHour >= 13 && currentHour < 14) periodIndex = 4;

    setCurrentPeriodIndex(periodIndex);

    const daysOfWeek = Object.keys(timetableData);
    const dayIndex = now.getDay() - 1;
    setCurrentDay(daysOfWeek[dayIndex]);
  }, []);

  const generateTimetable = () => {
    const daysOfWeek = Object.keys(timetableData);
    const timetableRows = [];

    // Header Row with "D/P" and numbers for periods
    timetableRows.push(
      <View key="header" style={styles.row}>
        <Text style={[styles.cellHeader, { width: 60 }]}>D/P</Text>
        {timetableData.Monday.map((_, index) => (
          <Text key={index} style={styles.cellHeader}>{index + 1}</Text>
        ))}
      </View>
    );

    // Data rows for each day of the week
    daysOfWeek.forEach((day) => {
      const dayRow = (
        <View key={day} style={styles.row}>
          <Text style={[styles.cellHeader, { width: 60 }]}>{day}</Text>
          {timetableData[day].map((period, periodIndex) => (
            <TouchableOpacity
              key={period.period}
              style={[
                styles.cell,
                { backgroundColor: day === currentDay && periodIndex === currentPeriodIndex ? 'yellow' : 'white' }
              ]}
              onPress={() => {
                setSelectedPeriod(`${period.subject} - ${period.teacher}`);
                setModalVisible(true);
              }}
            >
              <Text>{period.period}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
      timetableRows.push(dayRow);
    });

    return timetableRows;
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
      <View style={styles.timetableContainer}>
        {generateTimetable()}
      </View>

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{selectedPeriod}</Text>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: 'rgb(160, 180,182)' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

    </View>

  );
};

const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mainHeader: {
    backgroundColor: 'rgb(160, 180, 182)',
    justifyContent: 'space-between', // Align logo to the left, icon to the right
    alignItems: 'center',            // Vertically center the elements
    width: '100%',  // Set to full width
    height: 80,     // Adjusted height
    flexDirection: 'row',
    paddingHorizontal: 15,
},
  logo: {
    width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
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
  timetableContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  cellHeader: {
    fontWeight: 'bold',
    padding: 10,
    width: 50,
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ParentTimetable;
