import { useContext, useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckoutContext } from '../context/CheckoutContext';
import { createShippingAddress } from '../services/user'; 
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutAddressAddScreen = ({ navigation }) => {
  const { setAddresses } = useContext(CheckoutContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [note, setNote] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = async () => {
    const nameRegExp = /^[a-zA-ZÀ-ỹà-ỹ\s]{2,}$/u.test(name);
    const phoneRegExp = /^0\d{9}$/.test(phone);
    const addressRegExp = /^[\wÀ-ỹà-ỹ\s,.-]{5,}$/u.test(newAddress);
    
    if (!nameRegExp || !phoneRegExp || !addressRegExp) {
      return Toast.show({
        type: 'error',
        text1: 'Trường ' + (!nameRegExp ? 'TÊN' : !phoneRegExp ? 'SỐ ĐIỆN THOẠI' : 'ĐỊA CHỈ NHẬN HÀNG') + ' chưa hợp lệ!',
        text2: 'Vui lòng điền thông tin hợp lệ trước khi tiếp tục!',
        text1Style: { fontFamily: 'Inter', fontSize: 16, fontWeight: 500 },
        text2Style: { fontFamily: 'Inter', fontSize: 12 },
        autoHide: true,
        avoidKeyboard: true,
        topOffset: 20,
      });
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        return Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: 'Vui lòng đăng nhập lại',
          autoHide: true,
          topOffset: 20,
        });
      }

      const payload = {
        fullName: name,
        shippingAddress: newAddress,
        phoneNumber: phone,
        note: note,
        isDefault: isDefault,
      };

      const response = await createShippingAddress(token, payload);
      console.log('Add address response:', response);
      if (response.status === 200) {
        const serverData = response.data || {};
        const newAddressObj = {
          id: serverData.id || name + phone,
          name,
          phone,
          address: newAddress,
          note,
          isDefault,
        };

        setAddresses((prev) => {
          if (!prev) return [newAddressObj];
          if (isDefault) {
            const updated = prev.map(item => ({ ...item, isDefault: false }));
            return [...updated, newAddressObj];
          }
          return [...prev, newAddressObj];
        });

        Toast.show({
          type: 'success',
          text1: 'Địa chỉ đã được thêm!',
          autoHide: true,
          topOffset: 20,
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Thêm địa chỉ thất bại',
          text2: response.message || 'Vui lòng thử lại sau',
          autoHide: true,
          topOffset: 20,
        });
      }
    } catch (err) {
      console.error('Add address error:', err);
      Toast.show({
        type: 'error',
        text1: 'Lỗi hệ thống',
        text2: 'Không thể thêm địa chỉ',
        autoHide: true,
        topOffset: 20,
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{ zIndex: 10 }} onPress={() => navigation.goBack()}>
          <View style={styles.backIconWrapper}>
            <Icon name="chevron-back" size={22} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ĐỊA CHỈ</Text>
        <View style={{ width: 24 }}></View>
      </View>

      {/* Form */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ và tên người nhận</Text>
        <TextInput style={styles.input} placeholder="HauBro" value={name} onChangeText={setName} />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} placeholder="0123456789" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} placeholder="Thủ Đức, HCM" value={newAddress} onChangeText={setNewAddress} />

        <Text style={styles.label}>Ghi chú cho shipper</Text>
        <TextInput style={styles.input} placeholder="Né giờ ngủ trưa giúp em!" value={note} onChangeText={setNote} />
      </View>

      {/* Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Đặt làm mặc định</Text>
        <Switch value={isDefault} onValueChange={setIsDefault} trackColor={{ false: '#ccc', true: '#3b82f6' }} thumbColor="#fff" style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} />
      </View>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutAddressAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
