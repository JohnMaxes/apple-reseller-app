import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { MyContext } from '../context';
import axios from 'axios';
import styles from '../styles';
import CustomInput from '../components/customInput';

const LoginScreen = ({togglePage}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setLoggedIn, setToken, decodeForId} = useContext(MyContext);

    const onLoginPress = async () => {
        if (!email || !password) {
            Alert.alert('Please fill out all fields.');
            return;
        } else {
            try {
                const response = await axios.post(
                    'https://fakestoreapi.com/auth/login',
                    {
                        username: email,
                        password: password,
                    }
                )
                console.log(response.data);
                setToken(response.data.token);
                await decodeForId();
                setLoggedIn(true);
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        setEmail('mor_2314');
        setPassword('83r5^_');
    }, [])

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome</Text>
            </View>
            <CustomInput 
                placeholder="Username" 
                placeholderTextColor="grey" 
                iconUri="https://img.icons8.com/?id=63&format=png" 
                value={email} 
                onChangeText={setEmail}
            />
            <CustomInput 
                placeholder="Password" 
                placeholderTextColor="grey" 
                secureTextEntry 
                iconUri="https://img.icons8.com/?id=94&format=png" 
                value={password} 
                onChangeText={setPassword} 
            />
            <View style={styles.forgetContainer}>
                <TouchableOpacity>
                    <Text style={{ color: "#d366a4" }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.loginWith}>Or login with</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image style={styles.socialImg} source={{ uri: "https://img.icons8.com/color/512/facebook-new.png" }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={[styles.socialImg, { width: 65, height: 68 }]} source={{ uri: "https://img.icons8.com/?size=512&id=17949&format=png" }} />
                </TouchableOpacity>
            </View>
            <View style={[styles.toggleTextContainer, {marginTop:-10}]}>
                <Text style={[styles.toggleText, { fontWeight: "normal", color: "black" }]}>
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={togglePage}>
                    <Text style={styles.toggleText}>Sign up here!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;