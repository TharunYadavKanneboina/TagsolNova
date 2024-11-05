import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import TeacherDashboard from './teacherDashboard';

const TeacherLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    require('./assets/images/slides/logo1.png'),
    require('./assets/images/slides/homework.png'),
    require('./assets/images/slides/bus.png'),
    require('./assets/images/slides/timetable.png'),
    // Add more images to the array
  ]);

  const navigation = useNavigation();

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
      navigation.navigate('TeacherDashboard');
    } else {
      Alert      .alert('Invalid username or password. Please try again.');
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
        <View>
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
          <Button title="Log In" onPress={handleLogin} color="#007bff" />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 200,
  },
});

export default TeacherLogin;