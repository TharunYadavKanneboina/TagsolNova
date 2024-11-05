import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';


const ParentBehavioralReport = () => {
    const [reports, setReports] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchBehavioralReports();
    }, []);

    const fetchBehavioralReports = async () => {
        try {
            const response = await fetch('https://your-backend-api.com/behavioral-reports');
            const reportsData = await response.json();
            setReports(reportsData);
        } catch (error) {
            console.error('Error fetching behavioral reports:', error);
        }
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

                <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold',textAlign:'center' ,padding:10}}>Behaviorl Report </Text>
                <View style={{ marginTop: 20 }}>
                        {reports.map((report, index) => (
                            <View key={index} style={{ marginBottom: 20 }}>
                                <Text><strong>Date:</strong> {report.date}</Text>
                                <Text><strong>Student Name:</strong> {report.studentName}</Text>
                                <Text><strong>Class:</strong> {report.class}</Text>
                                <Text><strong>Teacher:</strong> {report.teacherName}</Text>
                                <Text><strong>Behavior:</strong> {report.behavior}</Text>
                                <Text><strong>Notes:</strong> {report.notes}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ flex: 0.1 }}>
                    {/* Footer */}
                </View>
            </View>
    );
};
const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  mainHeader: {
    backgroundColor: 'rgb(160, 180, 182)',
    justifyContent: 'space-between', // Align logo to the left, icon to the right
    alignItems: 'center',            // Vertically center the elements
    width: '100%',  // Set to full width
    height: 110,     // Adjusted height
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
    backgroundColor: '#d1dde6',
  },
});

export default ParentBehavioralReport;