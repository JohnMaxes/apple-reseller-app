import { React, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import CustomInput from '../components/customInput';
import styles from '../styles';
const SignUpScreen = ({ togglePage }) => {
    
    const [registUsername, setRUsername] = useState('');
    const [registEmail, setREmail] = useState('');
    const [registPassword, setRPassword] = useState('');

    const processRequest = async () => {
        togglePage();
    };

    return (
        <ScrollView>
            <View style={styles.header}>
                <Image
                    style={styles.headerImg}
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlt-TGjHVh4qzymsShj8a9dkNKBG7rfq2wTg&s",
                    }}
                />
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
            <TouchableOpacity style={styles.button} onPress={processRequest}>
                <Text style={styles.buttonText}>CREATE</Text>
            </TouchableOpacity>
            <View style={styles.toogleTextContainer}>
                <Text style={[styles.toggleText, { fontWeight: "normal", color: "black" }]}>
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={togglePage}>
                    <Text style={styles.toggleText}>Login now!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;