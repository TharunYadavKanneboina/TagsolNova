import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const ManagDashboard = () => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [studentInfoVisible, setStudentInfoVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentImages, setStudentImages] = useState([
    require('./assets/images/slides/logo1.png'),
    require('./assets/images/slides/homework.png'),
    require('./assets/images/slides/bus.png'),
    require('./assets/images/slides/timetable.png'),
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % studentImages.length);
    }, 2000); // Change image every 2 seconds
    return () => clearInterval(intervalId);
  }, [studentImages]);

  const toggleSearch = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const toggleStudentInfoTab = () => {
    setStudentInfoVisible(!studentInfoVisible);
  };
  const handleSearch = () => {
    const results = [];
    Object.keys(itemImages).forEach((item) => {
      if (item.replace(/-/g, ' ').toUpperCase().includes(searchQuery.toUpperCase())) {
        results.push(item);
      }
    });
    setSearchResults(results);
  };


  const itemImages = {
    "Create-account": require('./assets/images/slides/acad1.jpg'),
    "StudentInfo": require('./assets/images/slides/acadapp.jpg'),
    "Time-table": require('./assets/images/slides/apptimetable.jpeg'),
    "Attendence-records": require('./assets/images/slides/att.jpg'),
    "Event-calendar": require('./assets/images/slides/eventCopy.jpg'),
    "Photo-sharing": require('./assets/images/slides/share.jpg'),
    "Fees-upload": require('./assets/images/slides/mfee.jpg'),
    "Academic-performance": require('./assets/images/slides/acadapp.jpg'),
  };


  return (
    <View style={styles.mobileFrame}>
      {/* Main Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          {/* Search Icon */}
          <TouchableOpacity onPress={toggleSearch}>
            <FontAwesomeIcon icon={faSearch} size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          {searchBarVisible && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
            />
          )}
          <TouchableOpacity onPress={() => navigation.navigate('StudenticonManage')}>
            <FontAwesomeIcon icon={faUser} size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faBell} size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Empty Small Header with Space */}
      <View style={styles.emptyHeader} />
      <Text></Text>
      <Text></Text>

      {/* Student Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image source={studentImages[currentIndex]} style={styles.profilePicture} />
        <View style={{ height: 10 }} />
        <Text style={styles.studentName}>Student Name</Text>
      </View>
      <Text></Text>
      <Text></Text>

      {/* Scrollable Icons */}
      <ScrollView horizontal style={styles.scrollingIconsContainer}>
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.scrollingLink}
            >
              <View style={styles.scrollingItem}>
                <Image source={itemImages[item]} style={styles.scrollingItemImage} />
                <Text style={styles.imageText}>{item.replace(/-/g, ' ').toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          Object.keys(itemImages).map((item, index) => (
            <TouchableOpacity key={index}
              onPress={() => {
                if (item === 'Time-table') {
                  navigation.navigate('ManageUploadTimetable');  // Navigate to ParentHomeworkScreen
                }
                else if (item === 'Academic-performance') {
                  navigation.navigate('ManagementAcademicPerformance');
                }
                else if (item === 'Create-account') {
                  navigation.navigate('CreateAccount');
                }
                else if (item === 'Create-account') {
                  navigation.navigate('StudentInfo');
                }
                else if (item === 'Photo-sharing') {
                  navigation.navigate('ManagmentEventMediaUpload');
                }
                else if (item === 'Attendence-records') {
                  navigation.navigate('ManagmentAttendanceView');
                }
                else if (item === 'Event-calendar') {
                  navigation.navigate('ManagmentEventCalendar');
                }
                else if (item === 'Fees-upload') {
                  navigation.navigate('ManagementFeeUpload');
                }

                else {
                  navigation.navigate(item);
                }
              }} style={styles.scrollingLink}
            >
              <View style={styles.scrollingItem}>
                <Image source={itemImages[item]} style={styles.scrollingItemImage} />
                <Text style={styles.imageText}>{item.replace(/-/g, ' ').toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 1,
    marginTop: -90
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180, 182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 120,
  },
  logo: {
    width: 60,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
    marginTop: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    width: 150,
  },
  emptyHeader: {
    height: 30,
    backgroundColor: 'rgb(160, 180, 182)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 2,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollingIconsContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  scrollingLink: {
    marginRight: 20,
  },
  scrollingItem: {
    position: 'relative',
    width: 120,
    height: 150,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: 'flex',
  },
  imageText: {
    marginTop: 150,
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'black'
  },
  scrollingItemImage: {
    width: 120,
    height: 190,
    borderRadius: 10,
  },
  scrollText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  studentInfoTab: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ManagDashboard;

