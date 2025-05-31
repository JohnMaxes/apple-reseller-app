import { useContext, useEffect, useState, useRef, useLayoutEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, TextInput, Alert, StyleSheet, Platform, Image, Button, TouchableWithoutFeedback, Keyboard } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileEditScreen = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: userInfo.name.firstname,
        lastName: userInfo.name.lastname,
        username: userInfo.username,
        email: userInfo.email,
        phoneNumber: userInfo.phone,
        houseNumber: userInfo.address.number,
        street: userInfo.address.street,
        city: userInfo.address.city,
    });

    const goBack = () => navigation.goBack();

    const formDataRef = useRef(formData);
    useEffect(() => {
        setFormData({
            firstName: userInfo.name.firstname,
            lastName: userInfo.name.lastname,
            username: userInfo.username,
            email: userInfo.email,
            phoneNumber: userInfo.phone,
            houseNumber: userInfo.address.number,
            street: userInfo.address.street,
            city: userInfo.address.city,
        });
    }, [userInfo]);

    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(formData);
    };

    useEffect(() => {
        console.log('Updated formData:', formData);
    }, [formData]);

    const validateForm = () => {
        const { firstName, lastName, username, email, phoneNumber, houseNumber, street, city } = formData;
        if (!firstName || !lastName || !username || !email || !phoneNumber || !houseNumber || !street || !city) {
            Alert.alert('Validation Error', 'All fields are required.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        console.log(formData);
        if (validateForm()) {
            setLoading(true);
            const updatedUserInfo = {
                ...userInfo,
                name: {
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                },
                username: formData.username,
                email: formData.email,
                phone: formData.phoneNumber,
                address: {
                    number: formData.houseNumber,
                    street: formData.street,
                    city: formData.city,
                },
            };

            try {
                const response = await axios.put(`https://fakestoreapi.com/users/${userInfo.id}`, updatedUserInfo, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setUserInfo(response.data || updatedUserInfo);
                navigation.goBack();
            } catch (error) {
                console.error('Error saving user: ', error);
                Alert.alert('Error', 'Failed to save user information.');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Please fill out all fields!');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }), paddingHorizontal: 20 }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={styles.backButton} onPress={goBack}>
                            <View style={styles.backIconWrapper}>
                                <Icon name="chevron-back" size={22} color="#000"  />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginBottom: 10, alignItems: 'center', marginTop: 20, gap: 10 }}>
                    <Image source={{ uri: 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466' }}
                        style={{ height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{userInfo.name.firstname + ' ' + userInfo.name.lastname}</Text>
                    <Text style={{ color: '#0D6EFD', fontSize: 16 }}>Đổi ảnh đại diện</Text>
                </View>

                <Text style={styles.label}>Họ</Text>
                <TextInput
                    style={styles.input}
                    value={formData.firstName}
                    onChangeText={(value) => handleChange('firstName', value)}
                    required
                />
                <Text style={styles.label}>Tên</Text>
                <TextInput
                    style={styles.input}
                    value={formData.lastName}
                    onChangeText={(value) => handleChange('lastName', value)}
                    required
                />
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(value) => handleChange('username', value)}
                    required
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    required
                />
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phoneNumber}
                    onChangeText={(value) => handleChange('phoneNumber', value)}
                    required
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        maxWidth: 400,
        alignSelf: 'center',
        marginTop: 50,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    backIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
});