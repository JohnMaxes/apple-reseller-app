import React, { useContext, useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, Image, Button, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import axios from "axios";
import { MyContext } from "../context";
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from "@react-navigation/stack";

const UStack = createStackNavigator();
const UserStack = () => {
    return (
        <UStack.Navigator initialRouteName="User">
            <UStack.Screen name="User" component={UserScreen}/>
            <UStack.Screen name="Edit User" component={UserEdit} options={{
            }}/>
        </UStack.Navigator>
    )
}

const UserScreen = ({navigation}) => {
    const {id, logOut, userInfo, setUserInfo} = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function initUser() {
            try {
                const response = await axios.get('https://fakestoreapi.com/users/' + id);
                setUserInfo(response.data);
                setLoading(false);
            }
            catch (error) {
                console.log('Error getting user info: ' + error);
            }
        }
        if(userInfo == null) initUser();
    }, []);

    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    return (
        <View style={{flex:1, padding: 20}}>
            <View style={{flexDirection:'row', marginBottom: 10, alignItems:'center'}}>
                <Image source={{uri: 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466'}}
                style={{height: 100, width: 100, borderRadius: 50}}/>
                <Text style={{fontWeight:'bold', fontSize: 25, paddingLeft: 10}}>{userInfo.name.firstname + ' ' + userInfo.name.lastname}</Text>
                <TouchableOpacity style={{marginLeft: '15%'}} onPress={() => navigation.navigate('Edit User')}>
                    <Icon name='create-outline' color='black' size={40}/>
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Name:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.name.firstname + ' ' + userInfo.name.lastname}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Username:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.username}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Email:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.email}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Phone:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.phone}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Address:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>
                {userInfo.address.number + ', ' + userInfo.address.street + ', ' + userInfo.address.city}
            </Text>
            <Button title='Log out' onPress={logOut}/>
        </View>
    )
}

const UserEdit = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(MyContext);
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

    const formDataRef = useRef(formData);

    useEffect(() => {
        formDataRef.current = formData; // Update the ref whenever formData changes
    }, [formData]);

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

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={async () => await handleSubmit()} style={{ padding: 20 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Text style={{ fontSize: 20 }}>Save</Text>
                    )}
                </TouchableOpacity>
            ),
        });
    }, []);

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
                    firstname: formDataRef.current.firstName,
                    lastname: formDataRef.current.lastName,
                },
                username: formDataRef.current.username,
                email: formDataRef.current.email,
                phone: formDataRef.current.phoneNumber,
                address: {
                    number: formDataRef.current.houseNumber,
                    street: formDataRef.current.street,
                    city: formDataRef.current.city,
                },
            };
            setUserInfo(updatedUserInfo);
            
            try {
                const response = await axios.put(`https://fakestoreapi.com/users/${userInfo.id}`, updatedUserInfo, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
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
        <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 20}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 3, marginRight: 5}}>
                    <Text style={styles.label}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.firstName}
                        onChangeText={(value) => handleChange('firstName', value)}
                        required
                    />
                </View>
                <View style={{flex: 2, marginLeft: 5}}>
                    <Text style={styles.label}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.lastName}
                        onChangeText={(value) => handleChange('lastName', value)}
                        required
                    />
                </View>
            </View>
            
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
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(value) => handleChange('phoneNumber', value)}
                required
            />
            <Text style={styles.label}>House Number:</Text>
            <TextInput
                style={styles.input}
                value={formData.houseNumber}
                onChangeText={(value) => handleChange('houseNumber', value)}
                required
            />
            <Text style={styles.label}>Street:</Text>
            <TextInput
                style={styles.input}
                value={formData.street}
                onChangeText={(value) => handleChange('street', value)}
                required
            />
            <Text style={styles.label}>City:</Text>
            <TextInput
                style={styles.input}
                value={formData.city}
                onChangeText={(value) => handleChange('city', value)}
                required
            />
        </View>
    );
};


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
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
    },
});

export default UserStack;