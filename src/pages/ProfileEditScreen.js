import React, { useContext, useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, TextInput, View, Text, Alert, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { updateUserInfo } from "../services/user";

const ProfileEditScreen = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                fullName: userInfo.fullName || '',
                username: userInfo.username || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                address: userInfo.address || '',
            });
        }
    }, [userInfo]);

    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const updatedUser = {
            fullName: formData.fullName?.trim() || null,
            username: formData.username?.trim() || null,
            email: formData.email?.trim() || null,
            phoneNumber: formData.phoneNumber?.trim() || null,
            address: formData.address?.trim() || null,
        };

        try {
            const response = await updateUserInfo(userInfo.userId, updatedUser);
            const resData = response.data;
            if (resData.status === 200) {
                setUserInfo(resData.userInfo || updatedUser);
                navigation.goBack();
            }
            else {
                Alert.alert("Lỗi", resData.message || "Không thể cập nhật thông tin người dùng.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            Alert.alert("Lỗi", "Không thể lưu thông tin người dùng.");
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => navigation.goBack();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }), paddingHorizontal: 20 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.backButton} onPress={goBack}>
                            <View style={styles.backIconWrapper}>
                                <Icon name="chevron-back" size={22} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{loading ? "Đang lưu..." : "Lưu"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Avatar */}
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Image
                        source={{ uri: 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466' }}
                        style={{ height: 120, width: 120, borderRadius: 60 }}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, marginTop: 10 }}>{formData.fullName}</Text>
                    <Text style={{ color: '#0D6EFD', fontSize: 16 }}>Đổi ảnh đại diện</Text>
                </View>

                {/* Form Fields */}
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                    style={styles.input}
                    value={formData.fullName}
                    onChangeText={(value) => handleChange('fullName', value)}
                />

                <Text style={styles.label}>Tên đăng nhập</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: '#ddd' }]}
                    value={formData.username}
                    editable={false}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: '#ddd' }]}
                    value={formData.email}
                    editable={false}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phoneNumber}
                    onChangeText={(value) => handleChange('phoneNumber', value)}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput
                    style={styles.input}
                    value={formData.address}
                    onChangeText={(value) => handleChange('address', value)}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    backIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
});