import React, { useState } from 'react';
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

const ForgetPassword1 = ({ navigation }) => {
  const [input, setInput] = useState('');

  const handleSendCode = () => {
    if (!input) {
      alert('Vui lòng nhập số điện thoại hoặc email');
      return;
    }
    alert(`Mã xác thực đã được gửi đến ${input}`);
  };

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
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
            Nhập số điện thoại hoặc gmail đăng ký để lấy lại mật khẩu
        </Text>
        <TextInput
            placeholder="Nhập số điện thoại hoặc gmail đăng ký"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={input}
            onChangeText={setInput}
            keyboardType="default"
          />
        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <Text style={styles.buttonText}>Nhận mã xác thực</Text>
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
    padding: 24,
    paddingTop: 200, 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 14,
    fontSize: 13,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf:'center',
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

export default ForgetPassword1;
