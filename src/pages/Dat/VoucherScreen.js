import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const vouchers = [
  { id: 1, title: "VOUCHER Giảm 15%", expiry: "11/06/2025" },
  { id: 2, title: "VOUCHER Giảm 15%", expiry: "11/06/2025" },
  { id: 3, title: "VOUCHER Giảm 15%", expiry: "11/06/2025" },
  { id: 4, title: "VOUCHER Giảm 15%", expiry: "11/06/2025" },
];

const VoucherScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const handleViewTerms = () => {
    navigation.navigate("TermsScreen"); // Điều hướng sang trang điều khoản
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Mã giảm giá</Text>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm mã giảm giá"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      <Text style={styles.suggestedText}>Đề xuất:</Text>

      {/* Danh sách voucher */}
      {vouchers.map((voucher) => (
        <TouchableOpacity
          key={voucher.id}
          style={[
            styles.voucherItem,
            selectedId === voucher.id && styles.voucherSelected
          ]}
          onPress={() => setSelectedId(voucher.id)}
        >
          <View style={styles.voucherIconContainer}>
            <Text style={styles.voucherEmoji}>🎟️</Text>
          </View>

          <View style={styles.voucherTextContainer}>
            <Text
              style={[
                styles.voucherTitle,
                selectedId === voucher.id && styles.voucherTitleBold
              ]}
            >
              {voucher.title}
            </Text>
            <Text style={styles.voucherExpiry}>
              Hạn sử dụng {voucher.expiry}
            </Text>
            <TouchableOpacity onPress={handleViewTerms}>
              <Text style={styles.link}>Xem điều kiện sử dụng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {/* Nút Xong */}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Xong</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f5f7",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 18,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    height: 45,
    marginBottom: 15,
  
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  suggestedText: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
    fontSize: 15
  },
  voucherItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  voucherSelected: {
    borderColor: "#007bff",
    backgroundColor: "#f0f8ff",
  },
  voucherIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  voucherEmoji: {
    fontSize: 30,
  },
  voucherTextContainer: {
    flex: 1,
  },
  voucherTitle: {
    fontSize: 15,
    color: "#000",
    marginBottom: 4,
    fontWeight: "normal",
  },
  voucherTitleBold: {
    fontWeight: "bold",
  },
  voucherExpiry: {
    fontSize: 13,
    color: "#666",
  },
  link: {
    fontSize: 13,
    color: "#007bff",
    marginTop: 2,
  },
  doneButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 40,
    width: "40%",
    alignSelf: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default VoucherScreen;
