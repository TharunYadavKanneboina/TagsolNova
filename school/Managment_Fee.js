 import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'; 
import { Icon, Header } from 'react-native-elements'; 
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; 

const ManagementFeeUpload = () => {
    const [installments, setInstallments] = useState([]);
    const [classValue, setClassValue] = useState('');
    const [sectionValue, setSectionValue] = useState('');
    const [paymentClassValue, setPaymentClassValue] = useState('');
    const [paymentSectionValue, setPaymentSectionValue] = useState('');
    const [studentName, setStudentName] = useState('');
    const [paidAmount, setPaidAmount] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [paymentResponseMessage, setPaymentResponseMessage] = useState(''); 
    const navigation = useNavigation();// This will display error or success messages

    useEffect(() => {
        addInstallmentField();
    }, []);

    const addInstallmentField = () => {
        setInstallments([...installments, '']);
    };

    const removeInstallment = (index) => {
        const newInstallments = installments.filter((_, i) => i !== index);
        setInstallments(newInstallments);
    };

    const handleFeeUpload = () => {
        const formData = new FormData();
        formData.append('class', classValue);
        formData.append('section', sectionValue);
        installments.forEach((amount, index) => {
            formData.append(`installment[${index}]`, amount);        });

        fetch('/api/upload-fee-details', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setResponseMessage('Fee details successfully uploaded!');
            } else {
                setResponseMessage('Error uploading fee details, please try again.');
            }
        })
        .catch(() => {
            setResponseMessage('Error uploading fee details, please try again.');
        });
    };

    const handleFeePayment = () => {
        const paymentFormData = new FormData();
        paymentFormData.append('payment-class', paymentClassValue);
        paymentFormData.append('payment-section', paymentSectionValue);
        paymentFormData.append('student-name', studentName);
        paymentFormData.append('paid-amount', paidAmount);

        fetch('/api/record-fee-payment', {
            method: 'POST',
            body: paymentFormData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setPaymentResponseMessage('Payment successfully recorded!');
            } else {
                setPaymentResponseMessage('Error recording payment, please try again.');
            }
        })
        .catch(() => {
            setPaymentResponseMessage('Error recording payment, please try again.');
        });
    };

    return (
        <View style={styles.container}>
            <Header
                containerStyle={styles.mainHeader}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
                    <Image
                        source={require('./assets/images/slides/logo226.png')}
                        style={styles.logo}
                    />
                    </TouchableOpacity>
                }
                centerComponent={{ text: '', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('ManageDashboard')}>
                    <Icon
                        name="home"
                        type="font-awesome"
                        color="black"
                       
                        iconStyle={styles.homeIcon}
                    />
                    </TouchableOpacity>
                    
                }
               
            />

            <View style={styles.subHeader} />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.uploadFeeDetails}>
                    <Text style={styles.sectionTitle}>Upload Fee Details</Text>
                </View>
                
                <Text style={styles.labelText}>Class:</Text>
                <Picker
                    selectedValue={classValue}
                    onValueChange={(itemValue) => setClassValue(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Class" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                </Picker>

                <Text style={styles.labelText}>Section:</Text>
                <Picker
                    selectedValue={sectionValue}
                    onValueChange={(itemValue) => setSectionValue(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Section" value="" />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                </Picker>

                {installments.map((installment, index) => (
                    <View key={index} style={styles.installment}>
                        <Text style={styles.labelText}>Installment {index + 1}:</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter Amount"
                            keyboardType="numeric"
                            value={installment}
                            onChangeText={text => {
                                const newInstallments = [...installments];
                                newInstallments[index] = text;
                                setInstallments(newInstallments);
                            }}
                        />
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeInstallment(index)}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity style={styles.addButton} onPress={addInstallmentField}>
                    <Text style={styles.addButtonText}>Add Installment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.uploadButton} onPress={handleFeeUpload}>
                    <Text style={styles.uploadButtonText}>Upload Fee Details</Text>
                </TouchableOpacity>
                <Text>{responseMessage}</Text>

                <View id="fee-payment-container">
                    <Text style={styles.sectionTitle}>Record Fee Payment</Text>

                    <Text style={styles.labelText}>Class:</Text>
                    <Picker
                        selectedValue={paymentClassValue}
                        onValueChange={(itemValue) => setPaymentClassValue(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Class" value="" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>

                    <Text style={styles.labelText}>Section:</Text>
                    <Picker
                        selectedValue={paymentSectionValue}
                        onValueChange={(itemValue) => setPaymentSectionValue(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Section" value="" />
                        <Picker.Item label="A" value="A" />
                        <Picker.Item label="B" value="B" />
                    </Picker>

                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Student Name"
                        value={studentName}
                        onChangeText={setStudentName}
                    />

                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Amount Paid"
                        keyboardType="numeric"
                        value={paidAmount}
                        onChangeText={setPaidAmount}
                    />

                    <TouchableOpacity style={styles.uploadButton} onPress={handleFeePayment}>
                        <Text style={styles.uploadButtonText}>Record Payment</Text>
                    </TouchableOpacity>

                    {/* Display error/success message for payment */}
                    <Text>{paymentResponseMessage}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:20,
      flex: 1,
      padding: 6,
      marginLeft:-2,
    },
    mainHeader: {
        backgroundColor: '#AABEC3',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 110,
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    logo: {
        width: 40,  
        height: 40, 
        marginLeft: 10,
    },
    homeIcon: {
        marginRight: 10,
    },
    subHeader: {
        padding: 12,
        backgroundColor: '#AABEC3',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 1,
        marginTop: 9,
      },
    scrollViewContent: {
        paddingBottom: 100,
    },
    uploadFeeDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    picker: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    installment: {
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#003153',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    uploadButton: {
        backgroundColor: '#003153',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    removeButton: {
        backgroundColor: '#F08080',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
    },
    removeButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    feePaymentContainer: {
        marginTop: 30, // Adjust the margin-top here as needed
    },
});

export default ManagementFeeUpload;