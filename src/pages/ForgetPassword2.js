import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgetPassword2 = ({ route, navigation }) => {
//   const { phoneNumber } = route.params || {}; // Lấy số điện thoại từ màn hình trước
  const phoneNumber = route?.params?.phoneNumber || '';

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);


  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResendCode = () => {
    alert(`Mã xác thực đã được gửi lại đến ${phoneNumber}`);
  };

  const handleConfirm = () => {
    alert(`Mã xác nhận: ${otp.join('')}`);
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < inputRefs.current.length - 1) {  //tự động nhảy ô khi nhập số
        inputRefs.current[index + 1]?.focus();
      }
    
      // Nếu xóa thì focus về ô trước (nếu có)
      if (!text && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <View style={styles.backIconWrapper}>
            <Icon name="chevron-back" size={22} color="#000" />
          </View>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.title}>QUÊN MẬT KHẨU</Text>
          <Text style={styles.subtitle}>
            Đã gửi mã xác thực đến số điện thoại
          </Text>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>

          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            ))}
          </View>

          <Text style={styles.resendText}>
            Bạn chưa nhận được mã?{' '}
            <Text style={styles.resendLink} onPress={handleResendCode}>
              Gửi lại
            </Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 170,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 1,
    alignSelf: 'flex-start',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal :12
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#f5f5f5',
  },
  resendText: {
    alignSelf: 'center',
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
  },
  resendLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgetPassword2;
