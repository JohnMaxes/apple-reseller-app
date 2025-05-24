import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = () => {
    // Xử lý logic lưu địa chỉ tại đây
    console.log({ name, phone, address, note, isDefault });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ĐỊA CHỈ</Text>
        <View style={{ width: 24 }} /> {/* Để giữ khoảng cách như icon bên trái */}
      </View>

      {/* Form */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="HauBro"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="0123456789"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          placeholder="Thủ Đức, HCM"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Ghi chú cho shipper</Text>
        <TextInput
          style={styles.input}
          placeholder="Né giờ ngủ trưa giúp em!"
          value={note}
          onChangeText={setNote}
        />
      </View>

      {/* Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Đặt làm mặc định</Text>
        <Switch
          value={isDefault}
          onValueChange={setIsDefault}
          trackColor={{ false: '#ccc', true: '#3b82f6' }}
          thumbColor="#fff"
        />
      </View>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
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
});
