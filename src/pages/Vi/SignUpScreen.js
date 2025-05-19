import { React, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import styles from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/Logo/Logo-shop.jpg';
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
            <View style={styles.header}>
                <Image
                    style={styles.headerImg}
                    source={Logo}
                />
                <Text style={styles.heading}>Đăng ký</Text>
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

const newStyles = StyleSheet.create({

})

export default SignUpScreen;