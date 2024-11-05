import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const TeacherAcademicPerformanceEntry = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        if (selectedClass && selectedSection) {
            fetchStudents();
        }
    }, [selectedClass, selectedSection]);

    const fetchStudents = async () => {
        try {
            const response = await fetch(`http://192.168.0.114:3000/get_students?class=${selectedClass}&section=${selectedSection}`);
            if (!response.ok) {
                const data = await response.json();
                Alert.alert('No students found', data.message || 'Failed to fetch students.');
                setStudents([]);
                return;
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Error', 'Failed to fetch students.');
        }
    };

    const handleMarkChange = (studentName, subject, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [studentName]: {
                ...prevMarks[studentName],
                [subject]: value,
            },
        }));
    };

    const submitMarks = async () => {
        const marksToSubmit = Object.entries(marks).map(([student_name, subjects]) => ({
            class_name: selectedClass,
            section: selectedSection,
            student_name: student_name,
            marks: subjects,
        }));

        try {
            const response = await fetch('http://192.168.0.114:3000/submit_marks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(marksToSubmit),
            });
            const result = await response.json();
            Alert.alert(result.message || 'Marks submitted!');
        } catch (error) {
            console.error('Error submitting marks:', error);
            Alert.alert('Error', 'Failed to submit marks.');
        }
    };

    return (
        <View style={styles.mobileFrame}>
            <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
                    <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
                    <Icon name="home" type="material" size={33} color="#000" />
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Academic Performance Entry</Text>
            <View style={{ marginVertical: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select Class:</Text>
                <Picker selectedValue={selectedClass} onValueChange={(itemValue) => setSelectedClass(itemValue)}>
                    <Picker.Item label="--Select Class--" value="" />
                    {[1, 2, 3, 4, 5].map((num) => (
                        <Picker.Item key={num} label={num.toString()} value={num} />
                    ))}
                </Picker>
            </View>
            <View style={{ marginVertical: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select Section:</Text>
                <Picker selectedValue={selectedSection} onValueChange={(itemValue) => setSelectedSection(itemValue)}>
                    <Picker.Item label="--Select Section--" value="" />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                </Picker>
            </View>
            <ScrollView>
                {students.map((student) => (
                    <View key={student.name} style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 18 }}>{student.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {['Maths', 'Science', 'English'].map((subject) => (
                                <View key={subject} style={{ marginRight: 16 }}>
                                    <Text>{subject}:</Text>
                                    <TextInput
                                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                        placeholder="Enter marks"
                                        keyboardType="numeric"
                                        onChangeText={(value) => handleMarkChange(student.name, subject, value)}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.submitButton} onPress={submitMarks}>
                <Text style={styles.submitButtonText}>Submit Marks</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainHeader: {
        backgroundColor: 'rgb(160, 180, 182)',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 90,
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 42,
    },
    mobileFrame: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingRight: 10,
    },
    logo: {
        width: 55,
        height: 55,
        marginRight: 100,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: 'rgb(160, 180, 182)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 200,
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
    },
});

export default TeacherAcademicPerformanceEntry;
