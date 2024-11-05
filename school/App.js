import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';

// Import your screens
import ParentLogin from './parent_login'; // Ensure correct path
import TeacherLogin from './teacher_login'; // Ensure correct path
import TeacherDashboard from './teacherDashboard'; // Ensure correct path
import ManagmentLogin from './managment_login';
import ParentDashboard from './parentDashboard';
import ManageDashboard from './ManagDashboard';
import Teacher_HomeworkTrackerScreen from './teacher_ud_Homework';
import Teachertimetable from './teacher_timetable';
import TeacherAttendance from './teacher_ud_attendence';
import teachermessge from './teacher_msg';
import TeacherEventCalendar from './teacher_calender';
import TeacherEventMediaUpload from './teacher_photo';
import TeacherResorces from './teacher_resorces';
import TeacherBehaviour from './teacher_ud_behaviour';
import TeacherAcademicPerformanceEntry from './teacher_acodamicperformence';
import ParentHomeworkScreen from './parent_homework';
import ParentTimetable from './parent_timetable';
import Parentmessge from './parent_msg';
import ParentAcodamicPerformence from './parent_Acodamicperformence';
import ParentBehavioralReport from './parent_behaviour';
import ParentPhoto from './parent_photo';
import ParentEventCalendar from './parent_event_calender';
import ParentResources from './parent_Resources';
import ParentAttendence from './parent_Attenndence';
import ManageUploadTimetable from './Managment_Timetable';
import ManagementAcademicPerformance from './Managment_Acodamic_Performence';
import CreateAccount from './Managment_creat_Account';
import ManagmentEventMediaUpload from './Managment_EventMedia';
import ManagementFeeUpload from './Managment_Fee';
import ManagmentAttendanceView from './Managment_AttendenceRecords';
import ManagmentEventCalendar from './Managment_event_Calender';
import Studenticon from './Studenticon';
import StudenticonTeacher from './StudenticonTeacher';
import StudenticonManage from './StudentIconManag';
import StudentInfo from './Management_studentinfo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="ParentLogin" component={ParentLogin} options={{ headerShown: false }} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="ManagementLogin" component={ManagmentLogin} options={{ headerShown: false }} />
        <Stack.Screen name="ManageDashboard" component={ManageDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Teacher_HomeworkTrackerScreen" component={Teacher_HomeworkTrackerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Teachertimetable" component={Teachertimetable} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherAttendance" component={TeacherAttendance} options={{ headerShown: false }} />
        <Stack.Screen name="teachermessge" component={teachermessge} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherEventCalendar" component={TeacherEventCalendar} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherEventMediaUpload" component={TeacherEventMediaUpload} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherResorces" component={TeacherResorces} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherBehaviour" component={TeacherBehaviour} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherAcademicPerformanceEntry" component={TeacherAcademicPerformanceEntry} options={{ headerShown: false }} />
        <Stack.Screen name="ParentHomeworkScreen" component={ParentHomeworkScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ParentTimetable" component={ParentTimetable} options={{ headerShown: false }} />
        <Stack.Screen name="Parentmessge" component={Parentmessge} options={{ headerShown: false }} />
        <Stack.Screen name="ParentAcodamicPerformence" component={ParentAcodamicPerformence} options={{ headerShown: false }} />
        <Stack.Screen name="ParentBehavioralReport" component={ParentBehavioralReport} options={{ headerShown: false }} />
        <Stack.Screen name="ParentPhoto" component={ParentPhoto} options={{ headerShown: false }} />
        <Stack.Screen name="ParentEventCalendar" component={ParentEventCalendar} options={{ headerShown: false }} />
        <Stack.Screen name="ParentResources" component={ParentResources} options={{ headerShown: false }} />
        <Stack.Screen name="ParentAttendence" component={ParentAttendence} options={{ headerShown: false }} />
        <Stack.Screen name="ManageUploadTimetable" component={ManageUploadTimetable} options={{ headerShown: false }} />
        <Stack.Screen name="ManagementAcademicPerformance" component={ManagementAcademicPerformance} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
        <Stack.Screen name="StudentInfo" component={StudentInfo} options={{ headerShown: false }} />
        <Stack.Screen name="ManagementFeeUpload" component={ManagementFeeUpload} options={{ headerShown: false }} />
        <Stack.Screen name="ManagmentAttendanceView" component={ManagmentAttendanceView} options={{ headerShown: false }} />
        <Stack.Screen name="ManagmentEventMediaUpload" component={ManagmentEventMediaUpload} options={{ headerShown: false }} />
        <Stack.Screen name="ManagmentEventCalendar" component={ManagmentEventCalendar} options={{ headerShown: false }} />
        <Stack.Screen name="Studenticon" component={Studenticon} options={{ headerShown: false }} />
        <Stack.Screen name="StudenticonTeacher" component={StudenticonTeacher} options={{ headerShown: false }} />
        <Stack.Screen name="StudenticonManage" component={StudenticonManage} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#000000', '#ffffff']}
        style={styles.linearGradient}
      >
        <View style={styles.mobileFrame}>
          <View style={styles.logoContainer}>
            <Image source={require('./assets/images/slides/logo1.png')} style={styles.logo} />
          </View>
          <View style={styles.loginOptions}>
            <TouchableOpacity
              style={styles.loginButtonBox}
              onPress={() => navigation.navigate('ParentLogin')}
            >
              <Text style={styles.loginButtonText}>Parent Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButtonBox}
              onPress={() => navigation.navigate('TeacherLogin')}
            >
              <Text style={styles.loginButtonText}>Teacher Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButtonBox}
              onPress={() => navigation.navigate('ManagementLogin')}
            >
              <Text style={styles.loginButtonText}>Management Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({

  root: { flex: 1, flexDirection: 'row' },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  mobileFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 150,
  },
  loginOptions: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%'
  },
  loginButtonBox: {
    backgroundColor: '#24385f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    margin: 10,
    borderWidth: 2,
    borderRadius: 30,
    width: '65%',
    alignItems: 'center',
    shadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;