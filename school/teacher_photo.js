import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Remove the duplicate useNavigation import
import { Header } from 'react-native-elements';



const TeacherEventMediaUpload = () => {
    const [eventName, setEventName] = useState('');
    const [eventMedia, setEventMedia] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigation = useNavigation(); // Corrected this to only use one useNavigation


    const handleMediaUpload = async () => {
        if (!eventName || !eventMedia) {
            setResponseMessage('   Please select event name and media');
            setIsSuccess(false);
            return;
        }

        const formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('eventMedia', eventMedia);

        try {
            const response = await fetch('/api/upload-event-media', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            if (data.success) {
                setResponseMessage('Successfully uploaded!');
                setIsSuccess(true);
            } else {
                setResponseMessage('Error in uploading, please try again.');
                setIsSuccess(false);
            }
        } catch (error) {
            setResponseMessage('Error in uploading, please try again.');
            setIsSuccess(false);
        }
    };

    const handleChooseMedia = async () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setEventMedia(response.assets[0]);
            }
        });
    };

    return (
<View style={styles.mobileFrame}>
        {/* Header Section */}
        <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
            <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
            <Icon name="home" type="material" size={60} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.emptyHeader} />
            <Text style={{ fontSize: 29 ,fontWeight:'bold',textAlign:'center'}}>Upload Event Media</Text>

                <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', marginVertical: 8, padding: 8 }}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={setEventName}
                    required
                />
                            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginLeft:-235 ,alignItems:'flex-start'}}>

                            <TouchableOpacity style={{ backgroundColor: 'rgb(160, 180, 182)', padding: 10 }} onPress={handleChooseMedia}>
    <Text style={{ color: 'white' }}>Choose Files</Text>
</TouchableOpacity>
<Text></Text>
<TouchableOpacity style={{ backgroundColor: 'rgb(160, 180, 182)', padding: 10, alignItems: 'center' }} onPress={handleMediaUpload}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Upload</Text>
</TouchableOpacity>


                </View>
                </View>
                <Text style={{ color: isSuccess ? 'green' : 'red', marginVertical: 8 }}>{responseMessage}</Text>
            </View>
    );
};
const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 45,
},
    
  
  logo: {
    width: 100,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0, // set paddingTop to 0
    marginTop: -40, // set marginTop to -40 (or the height of your header)
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
  picker: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',

},
logo:{
  width:80,
  height:80,
  marginRight:100,
  alignItems:'center',
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
},
input: {
  borderColor: '#ccc',
  borderRadius: 8,
  backgroundColor: '#fff',
  fontSize: 16,
  color: '#333',
},
});


export default TeacherEventMediaUpload;