import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, View, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from '../../../styles';
import CustomInput from '../../components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../../assets/Logo/Logo-shop.jpg';
import Reseller from '../../assets/Apple-Reseller.webp';
const LoginScreen = ({ togglePage }) => {
    useEffect(() => { // sử dụng data và API mẫu
        setEmail('mor_2314');
        setPassword('83r5^_');
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedIn, setToken, decodeForId } = useContext(AuthContext);

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
                await AsyncStorage.setItem('token', response.data.token);
                setLoggedIn(true);
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    // useEffect(() => {
    //     setEmail('mor_2314');
    //     setPassword('83r5^_');
    // }, [])

    return (
        <ScrollView>
            <View style={[styles.header, { alignItems: 'flex-start', marginTop: 40 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                    <Image
                        source={Logo}
                        style={{ width: 63.48, height: 63.48, borderRadius: 30 }}
                    />
                    <View style={{ width: 1, height: 50, backgroundColor: '#ccc', marginHorizontal: 10 }} />
                    <Image
                        source={Reseller}
                        style={{ width: 112.86, height: 53, resizeMode: 'contain' }}
                    />
                </View>
                <Text style={[styles.heading, {marginTop: 10, fontSize: 35, fontWeight: 'bold', alignSelf: 'center'}]}>Đăng nhập</Text>
            </View>
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Tên đăng nhập"
                placeholderTextColor="grey"
                iconUri="person-outline"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, marginLeft: 20, marginRight: 20 }}
                placeholder="Mật khẩu"
                placeholderTextColor="grey"
                secureTextEntry
                value={password}
                showToggleEye={true}
                onChangeText={setPassword}
            />
            <View style={styles.forgetContainer}>
                <TouchableOpacity>
                    <Text style={{ color: "#0171E3", fontSize: 16 }}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#000000', borderRadius: 30, width: 288, height: 50 }]} onPress={onLoginPress}>
                <Text style={[styles.buttonText, { fontSize: 20, fontWeight: 'bold' }]}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePage} style={{ color: "#0171E3", alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: "#0171E3", fontSize: 16 }}>Đăng ký</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Hoặc</Text>
                <View style={styles.line} />
            </View>
            <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
                <TouchableOpacity style={[styles.socialButton, { marginBottom: 20, width: 250, height: 55 }]}>
                    <Icon style={[styles.socialIcon]} name="logo-apple" size={19} />
                    <Text style={{ fontSize: 17.3 }}>Đăng nhập với Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { width: 250, height: 55 }]}>
                    <Icon style={styles.socialIcon} name="logo-google" size={19} />
                    <Text style={{ fontSize: 17.3 }}>Đăng nhập với Google</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


export default LoginScreen;