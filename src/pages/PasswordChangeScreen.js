import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomInputToggleable from '../components/CustomInputToggleable';

const PasswordChangeScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const handleChangePassword = () => {
    if (password.length < 8) return alert('Mật khẩu phải có ít nhất 8 ký tự');
    if (password !== confirmPassword) return alert('Mật khẩu không khớp');
    // Gọi API đổi mật khẩu ở đây
    setLoggedIn(true);
    navigation.getParent()?.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <Text style={styles.title}>ĐỔI MẬT KHẨU</Text>
          <Text style={styles.subtitle}>
            Đổi mật khẩu mới. Mật khẩu mới không được trùng với mật khẩu gần đây nhất.
          </Text>
          <CustomInputToggleable
            placeholder="Mật khẩu tối thiểu 8 ký tự"
            placeholderTextColor="grey"
            required
            iconName="lock-closed"
            onChangeText={setPassword}
            value={password}
            showToggleEye={true}
            secureTextEntry={true}
          />
          <CustomInputToggleable
            placeholder="Nhập lại mật khẩu mới"
            placeholderTextColor="grey"
            required
            iconName="lock-closed"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            showToggleEye={true}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    paddingHorizontal: 20,
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

export default PasswordChangeScreen;
