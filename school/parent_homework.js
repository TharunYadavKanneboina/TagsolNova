import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ParentHomeworkScreen = () => {
    const [homeworkItems, setHomeworkItems] = useState([]);
    const [filteredHomeworkItems, setFilteredHomeworkItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchHomework();
    }, []);

    const fetchHomework = async () => {
        try {
            const response = await fetch('https://your-api-endpoint.com/api/homework'); // Replace with your actual API endpoint
            const data = await response.json();
            setHomeworkItems(data);
            setFilteredHomeworkItems(data);
        } catch (error) {
            console.error('Error fetching homework:', error);
        }
    };

    const displayHomework = () => {
        if (filteredHomeworkItems.length === 0) {
            return <Text style={styles.noHomeworkText}>No homework available.</Text>;
        } else {
            return (
                <FlatList
                    data={filteredHomeworkItems}
                    renderItem={({ item }) => (
                        <View style={styles.homeworkItem}>
                            <Text style={styles.subject}>{item.subject_name}</Text>
                            <Text style={styles.title}>{item.homework_title}</Text>
                            <Text style={styles.dueDate}>Due Date: {item.due_date}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            );
        }
    };

    const toggleSearch = () => {
        setShowSearchBar(!showSearchBar);
        setShowNotificationDropdown(false);
    };

    const toggleNotification = () => {
        setShowNotificationDropdown(!showNotificationDropdown);
        setShowSearchBar(false);
    };

    const filterFrames = (text) => {
        setSearchInput(text);
        const filteredItems = homeworkItems.filter((item) => {
            return item.subject_name.toLowerCase().includes(text.toLowerCase()) || 
                   item.homework_title.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredHomeworkItems(filteredItems);
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
            <Text style={styles.screenTitle}>Homework</Text>
            {showSearchBar && (
                <View style={styles.searchBar}>
                    <TextInput
                        value={searchInput}
                        onChangeText={(text) => filterFrames(text)}
                        placeholder="Search homework"
                        style={styles.searchInput}
                    />
                </View>
            )}
            {showNotificationDropdown && (
                <View style={styles.notificationDropdown}>
                    <Text>Notification Dropdown</Text>
                </View>
            )}
            <View style={styles.content}>
                {displayHomework()}
            </View>
            <View style={styles.footer}>
                {/* Footer content can be added here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#rgb(160, 180, 182)',
    },
    logo: {
        width: 80,
        height: 80,
        alignItems: 'center',
        shadowColor: 'rgb(160, 180, 182)',
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
        height: 80,     // Adjusted height
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 40,

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
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    searchBar: {
        padding: 10,
        backgroundColor: 'rgb(160, 180, 182)',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    notificationDropdown: {
        padding: 10,
        backgroundColor: 'rgb(160, 180, 182)',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    content: {
        flex: 1,
        padding: 10,
    },
    homeworkItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    subject: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        marginTop: 5,
    },
    dueDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    noHomeworkText: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 20,
        fontSize: 16,
    },
    footer: {
        height: 50,
        // Add footer styles if needed
    },
});

export default ParentHomeworkScreen;
