import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Checkbox, RadioButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ThanhToanScreen = () => {
  const [checkedPayment, setCheckedPayment] = useState('');
  const [voucherCode, setVoucherCode] = useState('VOUCHER03');

  const handlePaymentSelect = (value) => {
    setCheckedPayment(value);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>THANH TOÁN</Text>

      {/* Danh sách sản phẩm */}
      <View style={styles.productBox}>
        {[1, 2].map((_, index) => (
          <View key={index} style={styles.productItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>iPhone 16 Xanh Mòng Két 256GB</Text>
              <Text style={styles.productPrice}>23.999.000đ</Text>
              <Text style={styles.productQty}>x1</Text>
            </View>
          </View>
        ))}
        <Text style={styles.deliveryTime}>Thời gian giao hàng dự kiến: T5 29/2/2025</Text>
      </View>

      {/* Địa chỉ giao hàng */}
      <View style={styles.section}>
        <Text style={styles.label}>Địa chỉ giao hàng</Text>
        <View style={styles.addressBox}>
          <Text>Huu Bro - 0123456789</Text>
          <Text>120, đường San Fran Xích Long</Text>
        </View>
      </View>

      {/* Phương thức thanh toán */}
      <View style={styles.section}>
        <Text style={styles.label}>Hình thức thanh toán</Text>
        {['Momo', 'Ngân hàng', 'Apple Pay', 'Thanh toán khi nhận hàng'].map((method, i) => (
          <TouchableOpacity
            key={i}
            style={styles.radioRow}
            onPress={() => handlePaymentSelect(method)}
          >
            <RadioButton
              value={method}
              status={checkedPayment === method ? 'checked' : 'unchecked'}
              onPress={() => handlePaymentSelect(method)}
            />
            <Text>{`Thanh toán qua ${method}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mã giảm giá */}
      <View style={styles.section}>
        <Text style={styles.label}>Mã giảm giá</Text>
        <View style={styles.voucherRow}>
          <TextInput
            value={voucherCode}
            onChangeText={setVoucherCode}
            style={styles.voucherInput}
          />
          <TouchableOpacity>
            <Icon name="chevron-forward" size={24} />
          </TouchableOpacity>
        </View>
        <Text>Giảm giá 100.000đ - Miễn phí vận chuyển</Text>
      </View>

      {/* Chi tiết thanh toán */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLine}>Tổng tiền sản phẩm: 65.890.000đ</Text>
        <Text style={styles.summaryLine}>Tổng tiền phí vận chuyển: 50.000đ</Text>
        <Text style={styles.summaryLine}>Tổng tiền ưu đãi giảm: -100.000đ</Text>
        <Text style={styles.summaryLine}>Giảm giá phí vận chuyển: -50.000đ</Text>
        <Text style={styles.totalLine}>Tổng thanh toán: 65.740.000đ</Text>
      </View>

      {/* Nút đặt hàng */}
      <Button mode="contained" style={styles.orderButton}>
        Đặt hàng
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  productBox: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 10 },
  productItem: { flexDirection: 'row', marginBottom: 10 },
  productImage: { width: 60, height: 60, borderRadius: 8 },
  productInfo: { marginLeft: 10 },
  productTitle: { fontWeight: 'bold' },
  productPrice: { color: '#000' },
  productQty: { color: '#888' },
  deliveryTime: { fontSize: 12, marginTop: 4, color: '#555' },
  section: { marginTop: 20 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  addressBox: { backgroundColor: '#f2f2f2', padding: 10, borderRadius: 8 },
  radioRow: { flexDirection: 'row', alignItems: 'center' },
  voucherRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  voucherInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 },
  summaryBox: {
    backgroundColor: '#eef5ff',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  summaryLine: { fontSize: 14, marginBottom: 4 },
  totalLine: { fontWeight: 'bold', marginTop: 8 },
  orderButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default ThanhToanScreen;
