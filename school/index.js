import { AppRegistry } from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';



import ParentLogin from './Parent-login';
import TeacherLogin from './Teacher-login';
import ManagementLogin from './login.mng'; 


const Stack = createStackNavigator();

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

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
                <Stack.Screen name="ParentLogin" component={ParentLogin} />
                <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
                
                <Stack.Screen name="ManagementLogin" component={ManagementLogin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    mobileFrame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 205,
    },
    loginOptions: {
        marginTop: 30,
        alignItems: 'center',
    },
    loginButtonBox: {
        backgroundColor: '#24385f',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 20,
        width: 245,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default App;