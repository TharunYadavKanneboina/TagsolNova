import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ParentPhoto
= () => {
    const navigation = useNavigation();  // Use curly braces to include logic

    return (
      <View style={styles.mobileFrame}>
        {/* Header Section */}
        <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
            <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
            <Icon name="home" type="material" size={60} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.emptyHeader} />
        {/* Gallery Section */}
        <GalleryContainer />
      </View>
    );
};

const GalleryContainer = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('photoupload.php'); // Ensure this is the correct API endpoint
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPhotos(data);
      }
    } catch (error) {
      setError('Error fetching photos. Please try again later.');
    }
  };

  const displayPhotos = () => {
    if (!photos || !Array.isArray(photos)) {
      return (
        <Text style={{ fontSize: 18, color: 'red' }}>
          Error fetching photos. Please try again later.
        </Text>
      );
    }

    return photos.map((photo, index) => (
      <View key={index} style={{ marginBottom: 10 }}>
        {photo.Pattachments && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${photo.Pattachments} `}} // Fix the syntax for uri
            style={{ width: 200, height: 200 }}
            resizeMode="cover"
          />
        )}
        <Text style={{ fontSize: 18 }}>{photo.PeventName}</Text>
      </View>
    ));
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left', padding: 10 }}>
        Photo Gallery :
      </Text>
      {error ? (
        <Text style={{ fontSize: 18, color: 'red' }}>{error}</Text>
      ) : (
        <ScrollView>
          {displayPhotos()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 5,
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
        backgroundColor: 'rgb(160, 180, 182)',
        marginTop: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
  },
  iconContainer: {
    backgroundColor: 'rgb(160, 180, 182)',  // Background color only for the icon
    borderRadius: 30,  // Optional: To make it a circle
    padding: 10,  // Optional: To add some padding around the icon
    justifyContent: 'center',  // Center the icon inside the container
    alignItems: 'center',
  },

});

export default ParentPhoto
;