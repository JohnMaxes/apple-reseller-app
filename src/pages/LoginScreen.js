import { useState, useContext, useEffect } from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity, Platform, ActivityIndicator, TouchableWithoutFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';

import CustomInput from '../components/CustomInput';
import CustomInputToggleable from '../components/CustomInputToggleable';
import Icon from 'react-native-vector-icons/Ionicons';
import { Keyboard } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/sso';

const LoginScreen = ({ navigation, togglePage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setLoggedIn, setUserInfo } = useContext(AuthContext);
    
    const onLoginPress = async () => {
        setLoading(true);
        try {
            const response = await login({
                username: username,
                password: password,
            });
            const resData = response.data;
            if (resData.status === 200) {
                await AsyncStorage.setItem('accessToken', resData.accessToken);
                await AsyncStorage.setItem('refreshToken', resData.refreshToken);
                setLoggedIn(true);
                setUserInfo(resData.userInfo);
                setLoading(false);
                // Thoát modal đăng nhập
                navigation.goBack();
            } else {
                setLoading(false);
                Alert.alert("Lỗi", resData.message + 123 || "Đăng nhập không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            setLoading(false);
            const message = error?.response?.data?.message || "Đăng nhập không thành công. Vui lòng thử lại.";
            Alert.alert("Lỗi", message);
        }
    };

    const navigateToForgotPassword = () => navigation.navigate('ForgotPassword');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    value={username}
                    onChangeText={setUsername}
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
                    <TouchableOpacity onPress={navigateToForgotPassword}>
                        <Text style={{ color: "#0171E3", fontSize: 16 }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#000000', borderRadius: 30 }]} onPress={onLoginPress}>
                    <Text style={[styles.buttonText, { fontSize: 20, fontWeight: 'bold' }]}>{loading ? <ActivityIndicator size="small" color="white" /> : 'Đăng nhập'}</Text>
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
        </TouchableWithoutFeedback>
    );
};


export default LoginScreen;