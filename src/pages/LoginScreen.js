import { useState, useContext, useEffect } from 'react';
import { Text, Image, View, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import styles from '../../styles';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import CustomInputToggleable from '../components/CustomInputToggleable';
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
                const response = await axios.post('https://fakestoreapi.com/auth/login',
                    { username: email, password: password })
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

    return (
        <ScrollView contentContainerStyle={{paddingTop: Platform.select({ ios: 50, android: 30, default: 40 })}}>
            <View style={{paddingHorizontal: 20 }}>
                <Image source={require('../assets/icons/reseller-upsized.png')} style={{width: 200, resizeMode: 'contain'}}/>
            </View>
            <View style={[styles.header]}>
                <Text style={styles.heading}>ĐĂNG NHẬP</Text>
            </View>
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Tên đăng nhập"
                placeholderTextColor="grey"
                iconName="person"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInputToggleable
                style={{ paddingLeft: 20, fontSize: 16, marginLeft: 20, marginRight: 20 }}
                placeholder="Mật khẩu"
                placeholderTextColor="grey"
                iconName="lock-closed"
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
            <TouchableOpacity style={[styles.button, { backgroundColor: '#000000', borderRadius: 30 }]} onPress={onLoginPress}>
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
            <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity style={[styles.socialButton, { marginBottom: 20 }]}>
                    <Icon style={styles.socialIcon} name="logo-apple" size={20} />
                    <Text style={{ fontSize: 17.3 }}>Đăng nhập với Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon style={styles.socialIcon} name="logo-google" size={20} />
                    <Text style={{ fontSize: 17.3 }}>Đăng nhập với Google</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


export default LoginScreen;