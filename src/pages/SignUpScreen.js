import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomInputToggleable from '../components/CustomInputToggleable';
import styles from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
const SignUpScreen = ({ togglePage }) => {

    const [registUsername, setRUsername] = useState('');
    const [registEmail, setREmail] = useState('');
    const [registPassword, setRPassword] = useState('');
    const [registPhone, setRPhone] = useState('');
    const [registConfirmPassword, setRConfirmPassword] = useState('');

    const processRequest = async () => {
        togglePage();
    };

    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={{paddingTop: Platform.select({ ios: 50, android: 30, default: 40 })}}>
            <View style={{paddingHorizontal: 20 }}>
                <Image source={require('../assets/icons/reseller-upsized.png')} style={{width: 200, resizeMode: 'contain'}}/>
            </View>
            <View style={styles.header}><Text style={styles.heading}>ĐĂNG KÝ</Text></View>
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Tên đăng nhập"
                placeholderTextColor="grey"
                required
                iconName="person"
                onChangeText={setRUsername}
                value={registUsername}
            />
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Số điện thoại"
                placeholderTextColor="grey"
                required
                iconName="call"
                onChangeText={setRPhone}
                value={registPhone}
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
                <TouchableOpacity onPress={togglePage}>
                    <Text style={styles.toggleText}>Đăng nhập ngay!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;