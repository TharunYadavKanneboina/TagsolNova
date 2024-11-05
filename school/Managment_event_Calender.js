import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Remove the duplicate useNavigation import



const ManagmentEventCalendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const navigation = useNavigation(); // Corrected this to only use one useNavigation


  useEffect(() => {
    updateEventCalendar();
  }, [currentYear, currentMonthIndex]);

  const createCalendarDays = (year, monthIndex, daysInMonth, startDay) => {
    const daysContainer = [];

    for (let i = 0; i < startDay; i++) {
      daysContainer.push(<View key={empty - ${i}} style = { styles.emptyDay } />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const today = new Date();
    const isToday = today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === day;
    const event = events.find(e => new Date(e.date).getDate() === day);

    daysContainer.push(
      <TouchableOpacity
        key={day}
        style={[
          styles.day,
          event && styles.eventDay,
          isToday && styles.today
        ]}
        onPress={() => {
          setEventDate(${ year } - ${ monthIndex + 1}- ${ day });
    setModalVisible(true);
  }
}
        >
  <Text style={isToday ? styles.todayText : styles.dayText}>{day}</Text>
        </TouchableOpacity >
      );

    }

return daysContainer;
  };

const generateEventCalendar = (year, monthIndex) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay();

  return (
    <View style={styles.month}>
      <View style={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Text key={index} style={styles.weekday}>{day}</Text>
        ))}
      </View>
      <View style={styles.days}>
        {createCalendarDays(year, monthIndex, daysInMonth, startDay)}
      </View>
    </View>
  );
};

const fetchEventCalendarData = (year, monthIndex) => {
  // Replace with actual API fetching logic
  const demoEvents = [
    { date: ${ year } - ${ monthIndex + 1}-5, title: 'Sports Day' },
{ date: ${ year } -${ monthIndex + 1 } -15, title: 'Annual Day' },
{ date: ${ year } -${ monthIndex + 1 } -20, title: 'Midterm Exams' },
{ date: ${ year } -${ monthIndex + 1 } -25, title: 'Holiday' },
    ];

setEvents(demoEvents);
  };

const updateEventCalendar = () => {
  fetchEventCalendarData(currentYear, currentMonthIndex);
};

return (
  <View style={styles.container}>
    <Header
      containerStyle={styles.mainHeader}
      leftComponent={
        <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
          <Image
            source={require('./assets/images/slides/logo226.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      }
      centerComponent={{ text: '', style: { color: '#fff', fontSize: 20 } }}
      rightComponent={
        <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
          <Icon
            name="home"
            type="font-awesome"
            color="black"

            iconStyle={styles.homeIcon}
          />
        </TouchableOpacity>

      }

    />

    <View style={styles.subHeader} />

    <Text style={styles.calendarTitle}>School Event Calendar for {currentYear}</Text>

    <View style={styles.calendarContainer}>
      <View style={styles.monthNavigation}>
        <Button title="<" onPress={() => {
          if (currentMonthIndex === 0) {
            setCurrentMonthIndex(11);
            setCurrentYear(currentYear - 1);
          } else {
            setCurrentMonthIndex(currentMonthIndex - 1);
          }
        }} />
        <Text style={styles.monthTitle}>{new Date(currentYear, currentMonthIndex).toLocaleString('default', { month: 'long' })}</Text>
        <Button title=">" onPress={() => {
          if (currentMonthIndex === 11) {
            setCurrentMonthIndex(0);
            setCurrentYear(currentYear + 1);
          } else {
            setCurrentMonthIndex(currentMonthIndex + 1);
          }
        }} />
      </View>

      <View id="event-calendar-container">
        {generateEventCalendar(currentYear, currentMonthIndex)}
      </View>
    </View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text>Enter Event Title</Text>
          <TextInput
            style={styles.input}
            value={eventTitle}
            onChangeText={setEventTitle}
            placeholder="Event Title"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetch('http://192.168.0.106:3000/add-event', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: eventTitle, // Use the event title from the input
                  date: eventDate,   // Store the date in the event_date
                }),
              })
                .then(response => response.json())
                .then(data => {
                  if (data.message === 'Event added successfully') {
                    // Save the new event to local state with both date and title
                    setEvents([...events, { date: eventDate, title: eventTitle }]);
                    setModalVisible(false);
                    setEventTitle(''); // Clear the title input
                    setEventDate(''); // Optionally clear the date input if necessary
                  } else {
                    console.log('Error adding event:', data.error);
                  }
                })
                .catch(error => console.error('Error:', error));
            }}
          >
            <Text>Save Event</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  </View>
);
};

const styles = StyleSheet.create({
  // Subheader styles

  // Calendar Title
  calendarTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  calendarContainer: { marginTop: 20 },
  monthNavigation: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  monthTitle: { fontSize: 18 },

  // Month styles
  month: { marginVertical: 10 },
  weekdays: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F0F0F0', padding: 5 },
  weekday: { width: '14%', textAlign: 'center', fontWeight: 'bold', color: '#444' },

  // Days styles
  days: { flexDirection: 'row', flexWrap: 'wrap' },
  day: {
    width: '14%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
  },
  emptyDay: {
    width: '14%',
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayText: {
    fontSize: 14,
  },
  eventDay: {
    backgroundColor: '#d0e7f3',
  },
  today: {
    backgroundColor: '#FFF9C4',
    borderColor: '#000',
    borderWidth: 1
  },
  todayText: {
    fontWeight: 'bold'
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
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0, // set paddingTop to 0
    marginTop: -40, // set marginTop to -40 (or the height of your header)
  },
  logo: {
    width: 90,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
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

  // Modal styles
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 },
  input: { marginVertical: 10, borderWidth: 1, borderColor: '#ccc', padding: 5 },
  button: { backgroundColor: '#007bff', padding: 10, alignItems: 'center', borderRadius: 5, marginBottom: 10 },
});

export default ManagmentEventCalendar;