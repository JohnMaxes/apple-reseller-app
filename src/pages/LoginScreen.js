import { useState, useContext, useEffect } from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import styles from '../../styles';

import CustomInput from '../components/CustomInput';
import CustomInputToggleable from '../components/CustomInputToggleable';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ togglePage, navigation }) => {
    useEffect(() => { // sử dụng data và API mẫu
        setEmail('mor_2314');
        setPassword('83r5^_');
    }, [])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login, loggedIn } = useContext(AuthContext);
    const onLoginPress = async () => {
        setLoading(true);
        await login(email, password);
        if(!loggedIn) setLoading(false);
        navigation.pop();
    }
    const navigateToForgotPassword = () => navigation.navigate('ForgotPassword');

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
    );
};


export default LoginScreen;