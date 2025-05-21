import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const initialAddresses = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    phone: '0909123456',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0987654321',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    isDefault: false,
  },
];

const ShippingAddressScreen = () => {
  const [addresses, setAddresses] = useState(initialAddresses);

  const handleSelect = (id) => {
    const updated = addresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));
    setAddresses(updated);
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: (addresses.length + 1).toString(),
      name: 'Tên mới',
      phone: '0123456789',
      address: 'Địa chỉ mới',
      isDefault: false,
    };
    setAddresses([...addresses, newAddress]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.row} onPress={() => handleSelect(item.id)}>
        <View style={styles.checkbox}>
          {item.isDefault && <View style={styles.checked} />}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        {item.isDefault ? (
          <View style={styles.defaultLabel}>
            <Text style={styles.defaultText}>Mặc định</Text>
          </View>
        ) : (
          <TouchableOpacity>
            <Text style={styles.editText}>Sửa</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ĐỊA CHỈ GIAO HÀNG</Text>

      <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          <TouchableOpacity style={styles.addBox} onPress={handleAddAddress}>
            <Icon name="add" size={30} color="#000" />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 20,
    marginBottom: 10,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    height: 14,
    width: 14,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    marginVertical: 2,
  },
  address: {
    color: '#444',
  },
  defaultLabel: {
    backgroundColor: '#E0ECFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  defaultText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  editText: {
    color: '#999',
    fontSize: 14,
  },
  addBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
