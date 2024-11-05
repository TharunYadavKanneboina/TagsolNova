import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ParentLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([
        require('./assets/images/slides/acad1.jpg'),
        require('./assets/images/slides/att.jpg'),
        require('./assets/images/slides/bus.png'),
        require('./assets/images/slides/homework.jpg'),
    ]);

    const navigation = useNavigation(); // Use navigation for navigating between screens

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
        }, 2000); // Change image every 2 seconds
        return () => clearInterval(intervalId);
    }, [currentIndex, images]);

    const handleLogin = () => {
        const validUsername = 'nova';
        const validPassword = 'nova123';

        if (username === validUsername && password === validPassword) {
            // Navigate to the Parent Dashboard when login is successful
            navigation.navigate('ParentDashboard');
        } else {
            Alert.alert('Invalid username or password. Please try again.');
        }
    };

    return (
        <LinearGradient
            colors={['#000000', '#ffffff']} // Linear gradient from black to white
            style={styles.linearGradient}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={images[currentIndex]}
                        style={styles.image}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Log In" onPress={handleLogin} color="#003153" />
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 140,
        borderWidth: 10,
    },
    inputContainer: {
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        width: 200,
        borderColor: '#003153',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: 200,
        borderRadius: 88,
    },
});

export default ParentLogin;