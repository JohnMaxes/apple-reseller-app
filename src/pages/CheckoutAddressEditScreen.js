import { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckoutAddressEditScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = () => {
    console.log({ name, phone, address, note, isDefault });
  };
  const goBack = () => console.log('lmao');

  return (
    <View style={[styles.container, { paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }) } ]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
          <View style={styles.backIconWrapper}>
            <Icon name="chevron-back" size={22} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ĐỊA CHỈ</Text>
        <View style={{ width: 24 }} /> {/* Để giữ khoảng cách như icon bên trái */}
      </View>

      {/* Form */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={styles.input} placeholder="HauBro" value={name} onChangeText={setName}/>

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} placeholder="0123456789" keyboardType="phone-pad" value={phone} onChangeText={setPhone}/>

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} placeholder="Thủ Đức, HCM" value={address} onChangeText={setAddress} />

        <Text style={styles.label}>Ghi chú cho shipper</Text>
        <TextInput style={styles.input} placeholder="Né giờ ngủ trưa giúp em!" value={note} onChangeText={setNote}/>
      </View>

      {/* Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Đặt làm mặc định</Text>
        <Switch value={isDefault} onValueChange={setIsDefault} trackColor={{ false: '#ccc', true: '#3b82f6' }} thumbColor="#fff"/>
      </View>

      {/* Save button */}
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
    fontSize: 14,
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
    fontSize: 14,
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
