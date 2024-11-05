   import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Header } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

const ParentResources = () => {
    const [resources, setResources] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResources, setFilteredResources] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const dummyResources = [
            { id: 1, title: 'Math Workbook', link: 'https://example.com/math-workbook' },
            { id: 2, title: 'Science Textbook', link: 'https://example.com/science-textbook' },
            { id: 3, title: 'History Notes', link: 'https://example.com/history-notes' }
        ];
        setResources(dummyResources);
        setFilteredResources(dummyResources);
    }, []);

    const handleSearch = () => {
        const filtered = resources.filter(resource =>
            resource.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredResources(filtered);
    };

    const openResourceLink = (link) => {
        // Function to open resource link
        // You can implement linking logic here
        console.log('Opening link:', link);
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

            <View style={styles.content}>
                <Text style={styles.title}>Resource Center</Text>
                <Input 
                    placeholder='Search Resources' 
                    value={searchInput}
                    onChangeText={setSearchInput}
                    rightIcon={<Icon name='search' type='font-awesome' onPress={handleSearch} />}
                />
                </View>
                    {filteredResources.map(resource => (
                        <View key={resource.id} style={styles.resourceCard}>
                            <Text style={styles.resourceTitle}>{resource.title}</Text>
                            <Button 
                                title="View Resource" 
                                buttonStyle={styles.buttonStyle} // Custom button style
                                onPress={() => openResourceLink(resource.link)} 
                            />
                        </View>
                    ))}
                </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40, // To avoid overlap with status bar
        backgroundColor: '#f8f9fa',
    },
    mainHeader: {
        flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 5,
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
    logo: {
        width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
    navLinks: {
        flexDirection: 'row',
    },
    navItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    navText: {
        color: '#000', // Set to black
        fontSize: 12,
        marginTop: 5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    resourceCard: {
        backgroundColor: '#d1dde6',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#d1dde6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    resourceTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonStyle: {
        backgroundColor: '#AABEC3', // Custom color for the button (Green)
        borderRadius: 5,
    },
});

export default ParentResources;