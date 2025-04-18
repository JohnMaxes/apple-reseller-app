import { React, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import styles from '../../styles';
const SignUpScreen = ({togglePage}) => {
    
    const [registUsername, setRUsername] = useState('');
    const [registEmail, setREmail] = useState('');
    const [registPassword, setRPassword] = useState('');

    const processRequest = async () => {
        togglePage();
    };

    return (
        <ScrollView scrollEnabled={false}>
            <View style={styles.header}>
                <Text style={styles.heading}>Create New Account</Text>
            </View>
            <CustomInput
                placeholder="Enter Username"
                placeholderTextColor="grey"
                required
                iconUri="https://img.icons8.com/?id=23264&format=png"
                onChangeText={setRUsername}
                value={registUsername}
            />
            <CustomInput
                placeholder="Enter Email"
                placeholderTextColor="grey"
                required
                iconUri="https://img.icons8.com/?id=63&format=png"
                onChangeText={setREmail}
                value={registEmail}
            />
            <CustomInput
                placeholder="Enter Password"
                placeholderTextColor="grey"
                secureTextEntry
                required
                iconUri="https://img.icons8.com/?id=94&format=png"
                onChangeText={setRPassword}
                value={registPassword}
            />
            <CustomInput
                placeholder="Confirm Password"
                placeholderTextColor="grey"
                secureTextEntry
                required
                iconUri="https://img.icons8.com/?id=94&format=png"
            />
            <TouchableOpacity style={styles.button} onPress={() => processRequest()}>
                <Text style={styles.buttonText}>CREATE</Text>
            </TouchableOpacity>
            <View style={styles.toogleTextContainer}>
                <Text style={[styles.toggleText, { fontWeight: "normal", color: "black" }]}>
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => togglePage()}>
                    <Text style={styles.toggleText}>Login now!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const newStyles = StyleSheet.create({

})

export default SignUpScreen;