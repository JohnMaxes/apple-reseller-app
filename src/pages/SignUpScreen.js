import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomInputToggleable from '../components/CustomInputToggleable';
import styles from '../../styles';
import { register } from '../services/sso';

const SignUpScreen = ({ togglePage }) => {

    const [registUsername, setRUsername] = useState('');
    const [registEmail, setREmail] = useState('');
    const [registPassword, setRPassword] = useState('');
    const [registConfirmPassword, setRConfirmPassword] = useState('');

    const processRequest = async () => {
        if (registPassword !== registConfirmPassword) {
            return Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp");
        }
        try {
            const response = await register({ 
                username: registUsername,
                email: registEmail,
                password: registPassword,
            });
            const resData = response.data;
            if (resData.status === 200) {
                Alert.alert("Thành công", resData.message || "Đăng ký thành công!");
                togglePage();
            } else {
                Alert.alert("Lỗi", resData.message || "Đăng ký không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            const message = error?.response?.data?.message || "Đăng ký không thành công. Vui lòng thử lại.";
            Alert.alert("Lỗi", message);
        }
    };

    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={{paddingTop: Platform.select({ ios: 50, android: 30, default: 40 })}}>
            <View style={{paddingHorizontal: 20 }}>
                <Image source={require('../assets/icons/reseller-upsized.png')} style={{width: 200, resizeMode: 'contain'}}/>
            </View>
            <View style={styles.header}><Text style={styles.heading}>ĐĂNG KÝ</Text></View>
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Username"
                placeholderTextColor="grey"
                required
                iconName="person"
                onChangeText={setRUsername}
                value={registUsername}
            />
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Email"
                placeholderTextColor="grey"
                required
                iconName="mail"
                onChangeText={setREmail}
                value={registEmail}
            />
            <CustomInputToggleable
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Mật khẩu tối thiểu 8 ký tự"
                placeholderTextColor="grey"
                required
                iconName="lock-closed"
                onChangeText={setRPassword}
                value={registPassword}
                showToggleEye={true}
                secureTextEntry={true}
            />
            <CustomInputToggleable
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="grey"
                required
                iconName="lock-closed"
                onChangeText={setRConfirmPassword}
                value={registConfirmPassword}
                showToggleEye={true}
                secureTextEntry={true}
            />

            <TouchableOpacity style={[styles.button, {borderRadius: 30, backgroundColor: '#000000'}]} onPress={processRequest}>
                <Text style={[styles.buttonText, {fontWeight: 'bold'}]}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.toogleTextContainer}>
                <Text style={[styles.toggleText, { fontWeight: "normal", color: "black" }]}>
                    Bạn đã có tài khoản?{" "}
                </Text>
                <TouchableOpacity onPress={() => togglePage()}>
                    <Text style={styles.toggleText}>Đăng nhập ngay!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;