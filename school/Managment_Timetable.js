import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header, Icon } from 'react-native-elements';

const ManageUploadTimetable = ({ navigation }) => {
  const [daySelected, setDaySelected] = useState('Monday');
  const [timetable, setTimetable] = useState([]);
  const [morningInterval, setMorningInterval] = useState('');
  const [lunchInterval, setLunchInterval] = useState('');
  const [afternoonInterval, setAfternoonInterval] = useState('');

  // Add Period function
  const addPeriod = () => {
    if (timetable.length < 10) {
      setTimetable([...timetable, { period: timetable.length + 1, subject: '' }]);
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 10 periods.');
    }
  };

  // Handle input changes for periods
  const handleInputChange = (index, field, value) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[index][field] = value;
    setTimetable(updatedTimetable);
  };

  // Remove a specific period
  const removePeriod = (index) => {
    const updatedTimetable = timetable.filter((_, i) => i !== index);
    setTimetable(updatedTimetable);
  };

  // Remove entire timetable
  const removeEntireTimetable = () => {
    Alert.alert('Confirmation', 'Are you sure you want to remove the entire timetable?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setTimetable([]) },
    ]);
  };

  // Submit the timetable data to the backend
  const submitTimetable = async () => {
    const timetableData = {
      day: daySelected,
      periods: timetable.map((item) => ({
        period: item.period,
        subject: item.subject,
      })),
      morning_interval: morningInterval,
      lunch: lunchInterval,
      afternoon_interval: afternoonInterval,
    };

    try {
      const response = await fetch('http://50.6.194.240:5000/api/user/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timetableData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Timetable submitted successfully!');
      } else {
        alert('Failed to submit timetable: ' + result.message);
      }
    } catch (error) {
      alert('Error submitting timetable. Please check your network or server.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.mainHeader}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
            <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
            <Icon name="home" type="font-awesome" color="black" iconStyle={styles.homeIcon} />
          </TouchableOpacity>
        }
        centerComponent={{ text: '', style: { color: '#fff', fontSize: 20 } }}
      />

      <ScrollView>
        <View style={styles.subHeader} />
        <Text style={styles.title}>Upload Timetable</Text>

        <View style={styles.pickerContainer}>
          <Text>Day:</Text>
          <Picker
            selectedValue={daySelected}
            onValueChange={(itemValue) => {
              setDaySelected(itemValue);
              setTimetable([]); // Clear the timetable when day is changed
            }}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
        </View>

        <Button title="Add Period" onPress={addPeriod} color="#003153" />

        {timetable.map((item, index) => (
          <View key={index} style={styles.periodRow}>
            <Text>Period {item.period}</Text>
            <TextInput
              placeholder="Subject"
              value={item.subject}
              onChangeText={(text) => handleInputChange(index, 'subject', text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => removePeriod(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Morning Interval */}
        <View style={styles.intervalContainer}>
          <Text>Morning Interval:</Text>
          <TextInput
            placeholder="Morning Interval"
            value={morningInterval}
            onChangeText={setMorningInterval}
            style={styles.input}
          />
        </View>

        {/* Lunch Interval */}
        <View style={styles.intervalContainer}>
          <Text>Lunch Interval:</Text>
          <TextInput
            placeholder="Lunch"
            value={lunchInterval}
            onChangeText={setLunchInterval}
            style={styles.input}
          />
        </View>

        {/* Afternoon Interval */}
        <View style={styles.intervalContainer}>
          <Text>Afternoon Interval:</Text>
          <TextInput
            placeholder="Afternoon Interval"
            value={afternoonInterval}
            onChangeText={setAfternoonInterval}
            style={styles.input}
          />
        </View>

        <Button title="Submit Timetable" onPress={submitTimetable} color="#003153" />

        {timetable.length > 0 && <Button title="Remove Timetable" onPress={removeEntireTimetable} color="#003153" />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  mainHeader: {
    backgroundColor: '#AABEC3',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 110,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  homeIcon: {
    marginRight: 10,
  },
  subHeader: {
    padding: 12,
    backgroundColor: '#AABEC3',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 1,
    marginTop: 9,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  periodRow: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: '50%',
  },
  removeButton: {
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#003153',
  },
  intervalContainer: {
    marginVertical: 10,
  },
});

export default ManageUploadTimetable;
