import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddAddressScreen() {
  const [isDefault, setIsDefault] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>THÊM ĐỊA CHỈ</Text>
      </View>

      {/* Form */}
      <Text style={styles.labelPrimary}>Thêm địa chỉ mới:</Text>

      <TextInput style={styles.input} placeholder="Họ và tên" defaultValue="HauBro" />
      <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" defaultValue="0123456789" />
      <TextInput style={styles.input} placeholder="Địa chỉ" defaultValue="Thủ Đức, HCM" />
      <TextInput style={styles.input} placeholder="Ghi chú cho shipper" defaultValue="Né giờ ngủ trưa giúp em!" />

      {/* Switch */}
      <View style={styles.switchRow}>
        <Text style={styles.setDefaultText}>Đặt làm mặc định</Text>
        <Switch value={isDefault} onValueChange={setIsDefault} trackColor={{ false: '#ccc', true: '#007AFF' }} />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  labelPrimary: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  setDefaultText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
