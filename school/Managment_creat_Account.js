import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CreateAccount = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async () => {
        if (!username || !password || !userType) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }

        const accountData = {
            username,
            password,
            userType,
        };

        console.log("Account Data:", accountData);

        try {
            const response = await axios.post('http://192.168.0.114:5000/create-account', accountData);
            if (response.data.success) {
                alert('Account created successfully!');
                setSuccessMsg('Account created successfully!'); // Optionally set success message
                setTimeout(() => {
                    // Make sure the navigation happens after the success message is displayed
                    navigation.navigate('StudentInfo');
                }, 2000);
            } else {
                Alert.alert('Error', response.data.message || 'Account creation failed.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                Alert.alert('Error', error.response.data.message || 'Failed to create account.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                Alert.alert('Error', 'No response from server. Please try again later.');
            } else {
                console.error('Error:', error.message);
                Alert.alert('Error', 'An unexpected error occurred.');
            }
        }
    };

    return (
        <View style={styles.mobileFrame}>
            {/* Header Section */}
            <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                    <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                    <Icon name="home" type="material" size={60} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.emptyHeader} />
            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
            />
            <Text style={styles.label}>User Type:</Text>
            <Picker
                selectedValue={userType}
                onValueChange={(itemValue) => setUserType(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select User Type" value="" />
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Teacher" value="teacher" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {successMsg ? <Text style={styles.success}>{successMsg}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        height: 200,
        marginTop: 90
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    input: {
        marginVertical: 10,
        borderBottomWidth: -10,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: 'rgb(160, 180,182)', // Button background color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    mainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(160, 180,182)',
        paddingVertical: 10,
        height: 95,
        paddingHorizontal: 15,
        marginTop: 70,
    },
    logo: {
        width: 70,
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        marginTop: 10,
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
    buttonText: {
        color: '#ffffff', // Button text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default CreateAccount;