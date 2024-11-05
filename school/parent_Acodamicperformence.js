import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Remove the duplicate useNavigation import



const ParentAcodamicPerformence = () =>  // Corrected this to only use one useNavigation

{  const navigation = useNavigation(); // Corrected this to only use one useNavigation

    
    const [loginTabVisible, setLoginTabVisible] = useState(false);


    const handleLoginIconClick = () => {
        setLoginTabVisible(!loginTabVisible);
    };

    const handleLogoutButtonPress = () => {
        alert('You have been logged out.');
        setLoginTabVisible(false);
    };


    const data = [
        { x: 'Week 1', y: 85 },
        { x: 'Week 2', y: 88 },
        { x: 'Week 3', y: 90 },
        { x: 'Week 4', y: 85 },
        { x: 'Week 5', y: 87 },
    ];
    

    const pieData = [
        { value: 10, svg: { fill: 'rgba(75, 192, 192, 0.2)' }, key: 'Math' },
        { value: 20, svg: { fill: 'rgba(54, 162, 235, 0.2)' }, key: 'Science' },
        { value: 40, svg: { fill: 'rgba(153, 102, 255, 0.2)' }, key: 'History' },
        { value: 30, svg: { fill: 'rgba(255, 99, 132, 0.2)' }, key: 'English' },
    ];

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

            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>
                    Performance in Subjects
                </Text>
                <PieChart
                    style={{ height: 200 }}
                    data={pieData}
                    innerRadius="40%"
                    outerRadius="80%"
                />
                
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>
                    Performance Over Time
                </Text>
                <LineChart
                    style={{ height: 200 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                />
            </View>

            <View style={{ height: 50, backgroundColor: '#f8f8f8' }}>
                {/* Footer */}
            </View>

            {loginTabVisible && (
                <View id="loginTab" style={styles.loginTab}>
                    <TouchableOpacity onPress={handleLogoutButtonPress}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mobileFrame: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainHeader: {
        backgroundColor: 'rgb(160, 180, 182)',
        justifyContent: 'space-between', // Align logo to the left, icon to the right
        alignItems: 'center',            // Vertically center the elements
        width: '100%',  // Set to full width
        height: 90,     // Adjusted height
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
    loginIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    loginTab: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default ParentAcodamicPerformence;
