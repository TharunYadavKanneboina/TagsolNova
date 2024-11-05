import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const teachermessge = () => {
  const navigation = useNavigation(); // Define navigation

  const [contacts, setContacts] = useState([
    { name: 'Mr. Smith', role: 'Mathematics Teacher' },
    { name: 'Mrs. Johnson', role: 'English Teacher' },
    { name: 'Principal Brown', role: 'Principal' }
  ]);

  const [messages, setMessages] = useState({
    'Mr. Smith': [
      { sender: 'parent', text: 'Hello Mr. Smith, I have a question about the homework.' },
      { sender: 'teacher', text: 'Sure, what is your question?' },
      { sender: 'parent', text: 'Can you please explain the second problem?' },
      { sender: 'teacher', text: 'Absolutely, the second problem requires...' }
    ],
    'Mrs. Johnson': [
      { sender: 'parent', text: 'Hi Mrs. Johnson, how is my child doing in English?' },
      { sender: 'teacher', text: 'Your child is doing well, but can improve in writing.' }
    ],
    'Principal Brown': [
      { sender: 'parent', text: 'Good morning Principal Brown, can I schedule a meeting?' },
      { sender: 'principal', text: 'Good morning, I will check my schedule and let you know.' }
    ]
  });

  const [currentContact, setCurrentContact] = useState(null); // Track the selected contact
  const [messageText, setMessageText] = useState(''); // Input text for new messages
  const [showContacts, setShowContacts] = useState(false); // Toggle contacts visibility

  const loadMessages = (contactName) => {
    setCurrentContact(contactName); // Set the current contact to the selected one
    setShowContacts(false); // Hide contacts list when a contact is selected
  };

  const toggleContacts = () => {
    setShowContacts(!showContacts); // Toggle the contacts list visibility
  };

  const populateContacts = () => {
    return contacts.map((contact, index) => (
      <TouchableOpacity
        key={index}
        style={styles.contactItem}
        onPress={() => loadMessages(contact.name)}
      >
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactRole}>{contact.role}</Text>
      </TouchableOpacity>
    ));
  };

  const sendMessage = () => {
    if (messageText && currentContact) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [currentContact]: [...prevMessages[currentContact], { sender: 'parent', text: messageText }]
      }));
      setMessageText(''); // Clear input after sending the message
    }
  };

  return (
    <View style={styles.mobileFrame}>
      {/* Header Section */}
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
          <Image source={require('./assets/images/slides/logo226.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={toggleContacts} style={{ marginRight: 20 }}>
            <Icon name="person" type="material" size={40} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
            <Icon name="home" type="material" size={40} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.emptyHeader} />


      {/* Body Section */}
      {showContacts ? (
        <View style={styles.contactsContainer}>
          <Text style={styles.contactsHeader}>Contacts</Text>
          <ScrollView style={styles.contactsList}>
            {populateContacts()}
          </ScrollView>
        </View>
      ) : currentContact ? (
        <View style={styles.chatContainer}>
          <Text style={styles.chatHeader}>Chat with {currentContact}</Text>
          <ScrollView>
            {messages[currentContact].map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.chatBubble,
                  msg.sender === 'parent' ? styles.sentMessage : styles.receivedMessage
                ]}
              >
                <Text style={{ fontSize: 16, color: '#000' }}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Select a contact to start chatting.</Text>
        </View>
      )}

      {currentContact && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your message..."
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0,
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
  mainHeader: {
    backgroundColor: 'rgb(160, 180, 182)',
    justifyContent: 'space-between', // Align logo to the left, icon to the right
    alignItems: 'center',            // Vertically center the elements
    width: '100%',  // Set to full width
    height: 80,     // Adjusted height
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop:-35,
},
  logo: {
    width: 80,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  contactsContainer: {
    flex: 1,
    padding: 10,
  },
  contactsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  contactsList: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    maxHeight: 150,
  },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactRole: {
    fontSize: 14,
    color: '#555',
  },
  chatContainer: {
    flex: 2,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatBubble: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#555',
  },
});

export default teachermessge;
