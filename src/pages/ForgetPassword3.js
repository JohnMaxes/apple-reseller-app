import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgetPassword3 = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);

  const handleToggleSecure1 = () => setSecureText1(!secureText1);
  const handleToggleSecure2 = () => setSecureText2(!secureText2);

  const handleGoBack = () => {
    if (navigation) navigation.goBack();
  };

  const handleChangePassword = () => {
    if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    alert('Đổi mật khẩu thành công!');
    // Gọi API đổi mật khẩu ở đây
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <View style={styles.backIconWrapper}>
            <Icon name="chevron-back" size={22} color="#000" />
          </View>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.title}>ĐỔI MẬT KHẨU</Text>
          <Text style={styles.subtitle}>
            Đổi mật khẩu mới. Mật khẩu mới không được trùng với mật khẩu gần đây nhất.
          </Text>

          {/* Ô nhập mật khẩu mới */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Mật khẩu mới tối thiểu 8 ký tự"
              placeholderTextColor="#aaa"
              secureTextEntry={secureText1}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleToggleSecure1} style={styles.eyeIcon}>
              <Icon name={secureText1 ? 'eye-off-outline' : 'eye-outline'} size={20} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Ô nhập lại mật khẩu */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor="#aaa"
              secureTextEntry={secureText2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleToggleSecure2} style={styles.eyeIcon}>
              <Icon name={secureText2 ? 'eye-off-outline' : 'eye-outline'} size={20} color="#555" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Đổi mật khẩu</Text>
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
    paddingTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 13,
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 10,
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

export default ForgetPassword3;
