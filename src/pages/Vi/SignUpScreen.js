import { React, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import styles from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/Logo/Logo-shop.jpg';
import Reseller from '../../assets/Apple-Reseller.webp';
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
        <ScrollView scrollEnabled={false}>
            <View style={[styles.header, { alignItems: 'flex-start' ,marginTop: 40 }]}>
                <View style={{ flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                    <Image
                        source={Logo}
                        style={{ width: 63.48, height: 63.48, borderRadius: 30, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6, }}
                    />
                    <View style={{ width: 1, height: 50, backgroundColor: '#ccc', marginHorizontal: 10 }} />
                    <Image
                        source={Reseller}
                        style={{ width: 112.86, height: 53, resizeMode: 'contain' }}
                    />
                </View>
                <Text style={[styles.heading, { marginTop: 10, fontSize: 35, fontWeight: 'bold', alignSelf: 'center' }]}>ĐĂNG KÝ</Text>
            </View>
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Tên đăng nhập"
                placeholderTextColor="grey"
                required
                iconName="person-outline"
                onChangeText={setRUsername}
                value={registUsername}
            />
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Số điện thoại"
                placeholderTextColor="grey"
                required
                iconName="call-outline"
                onChangeText={setRPhone}
                value={registPhone}
            />
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Mật khẩu tối thiểu 8 ký tự"
                placeholderTextColor="grey"
                required
                iconName="lock-closed-outline"
                onChangeText={setRPassword}
                value={registPassword}
                showToggleEye={true}
                secureTextEntry={true}
            />
            <CustomInput
                style={{ paddingLeft: 20, fontSize: 16, borderRadius: 30, marginLeft: 20, marginRight: 20 }}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="grey"
                required
                iconName="lock-closed-outline"
                onChangeText={setRConfirmPassword}
                value={registConfirmPassword}
                showToggleEye={true}
                secureTextEntry={true}
            />

            <TouchableOpacity style={[styles.button, { borderRadius: 30, backgroundColor: '#000000', width: 288, height: 50}]} onPress={processRequest}>
                <Text style={[styles.buttonText, { fontWeight: 'bold', alignItems: 'center'}]}>Đăng ký</Text>
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

const newStyles = StyleSheet.create({

})

export default SignUpScreen;