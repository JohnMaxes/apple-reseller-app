import { useContext, useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckoutContext } from '../context/CheckoutContext';

const CheckoutAddressEditScreen = ({ navigation, route }) => {
  const { id, name, phone, address, note, isDefault } = route.params;
  const { setAddresses } = useContext(CheckoutContext);

  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [newAddress, setNewAddress] = useState(address);
  const [newNote, setNewNote] = useState(note);
  const [newIsDefault, setNewIsDefault] = useState(isDefault);

  const handleSave = () => {
    const nameRegExp = /^[a-zA-ZÀ-ỹà-ỹ\s]{2,}$/u.test(newName);
    const phoneRegExp = /^0\d{9}$/.test(newPhone);
    const addressRegExp = /^[\wÀ-ỹà-ỹ\s,.-]{5,}$/u.test(newAddress);
    if(!nameRegExp || !phoneRegExp || !addressRegExp) return Toast.show({
        type: 'error',
        text1: 'Trường ' + (!nameRegExp ? 'TÊN' : !phoneRegExp ? 'SỐ ĐIỆN THOẠI' : 'ĐỊA CHỈ NHẬN HÀNG') + ' chưa hợp lệ!',
        text2: 'Vui lòng điền thông tin hợp lệ trước khi tiếp tục!',
        text1Style: {fontFamily: 'Inter', fontSize: 16, fontWeight: 500},
        text2Style: {fontFamily: 'Inter', fontSize: 12,},
        autoHide: true, avoidKeyboard: true, topOffset: 20,  
    })
    const updatedAddress = { id: id, name: newName, phone: newPhone, address: newAddress, isDefault: newIsDefault };
    setAddresses(prev => prev.map(item => item.id === id ? updatedAddress
      : (newIsDefault ? { ...item, isDefault: false } : item) )
    );
    goBack();
  };  
  const goBack = () => navigation.goBack();

  return (
    <View style={[styles.container, { paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }) }, ]}>
      <View style={styles.header}>
        <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
          <View style={styles.backIconWrapper}>
            <Icon name="chevron-back" size={22} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ĐỊA CHỈ</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ và tên người nhận</Text>
        <TextInput style={styles.input} placeholder="HauBro" value={newName} onChangeText={setNewName}/>

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} placeholder="0123456789" keyboardType="phone-pad" value={newPhone} onChangeText={setNewPhone}/>

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} placeholder="Thủ Đức, HCM" value={newAddress} onChangeText={setNewAddress} />

        <Text style={styles.label}>Ghi chú cho shipper</Text>
        <TextInput style={styles.input} placeholder="Né giờ ngủ trưa giúp em!" value={newNote} onChangeText={setNewNote}/>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Đặt làm mặc định</Text>
        <Switch value={newIsDefault} onValueChange={setNewIsDefault} trackColor={{ false: '#ccc', true: '#3b82f6' }} thumbColor="#fff"/>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutAddressEditScreen;

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
    fontWeight: "bold", 
    textAlign: "center"
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
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
