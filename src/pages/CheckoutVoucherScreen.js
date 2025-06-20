import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckoutContext } from "../context/CheckoutContext";
import { getAllVouchers } from "../services/voucher";
import LoadingScreen from "./LoadingScreen";

const CheckoutVoucherScreen = ({ navigation }) => {
  const {
    shipVouchers, setShipVouchers,
    orderVouchers, setOrderVouchers,
    selectedShipVoucher, setSelectedShipVoucher,
    selectedOrderVoucher, setSelectedOrderVoucher
  } = useContext(CheckoutContext);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await getAllVouchers();
        const allVouchers = response.data;
        const shipping = allVouchers.filter(v => v.voucherType === "shipping");
        const product = allVouchers.filter(v => v.voucherType === "product");
        setShipVouchers(shipping);
        setOrderVouchers(product);
      } catch (err) {
        console.error("Failed to load vouchers", err);
        setShipVouchers([]);
        setOrderVouchers([]);
      } finally {
        setLoading(false)
      }
    };
    fetchVouchers();
  }, []); 

  const toggleShipVoucher = (voucher) => {
    if (selectedShipVoucher && selectedShipVoucher.id === voucher.id) {
      setSelectedShipVoucher(null); 
    } else {
      setSelectedShipVoucher(voucher);
    }
  };

  const toggleOrderVoucher = (voucher) => {
    if (selectedOrderVoucher && selectedOrderVoucher.id === voucher.id) {
      setSelectedOrderVoucher(null);
    } else {
      setSelectedOrderVoucher(voucher);
    }
  };

  // Format date từ chuỗi ISO sang định dạng dd/mm/yyyy
  const formatDate = (isoDateStr) => {
    const date = new Date(isoDateStr);
    if (isNaN(date)) return 'Không xác định';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  
  const goBack = () => navigation.goBack();

  const handleViewTerms = () => {
    alert('Điều kiện sử dụng... Coming soon hehe');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
            <View style={styles.backIconWrapper}>
              <Icon name="chevron-back" size={22} color="#000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CÁC VOUCHER</Text>
          <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Tìm mã giảm giá" style={styles.searchInput} placeholderTextColor="#888"/>
      </View>

      { loading &&  (
        <View style={{ flex: 1, justifyContent: 'center', minHeight: 300 }}>
          <LoadingScreen/>
        </View>
      ) }
      { !loading && (
        <>
          <Text style={styles.suggestedText}>Voucher ship:</Text>
          {shipVouchers.map((voucher) => (
            <TouchableOpacity key={voucher.id} style={[ styles.voucherItem, (selectedShipVoucher ? selectedShipVoucher.id === voucher.id : null) && styles.voucherSelected ]} 
              onPress={() => toggleShipVoucher(voucher)}
            >
              <View style={styles.voucherIconContainer}>
                <Text style={styles.voucherEmoji}>🎟️</Text>
              </View>

              <View style={styles.voucherTextContainer}>
                <Text style={[ styles.voucherTitle, (selectedShipVoucher ? selectedShipVoucher.id === voucher.id : null) && styles.voucherTitleBold ]}>
                  {voucher.code}
                </Text>
                <Text style={styles.voucherExpiry}>
                  Hạn sử dụng {formatDate(voucher.endDate)}
                </Text>
                <TouchableOpacity onPress={handleViewTerms} style={{width: '50%'}}>
                  <Text style={styles.link}>Xem điều kiện sử dụng</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.suggestedText}>Voucher đơn hàng:</Text>
          {orderVouchers.map((voucher) => (
            <TouchableOpacity key={voucher.id} style={[ styles.voucherItem, (selectedOrderVoucher ? selectedOrderVoucher.id === voucher.id : null) && styles.voucherSelected ]}
              onPress={() => toggleOrderVoucher(voucher)}
            >
              <View style={styles.voucherIconContainer}>
                <Text style={styles.voucherEmoji}>🎟️</Text>
              </View>

              <View style={styles.voucherTextContainer}>
                <Text style={[ styles.voucherTitle, (selectedOrderVoucher ? selectedOrderVoucher.id === voucher.id : null) && styles.voucherTitleBold ]}>
                  {voucher.code}
                </Text>
                <Text style={styles.voucherExpiry}>
                  Hạn sử dụng {formatDate(voucher.endDate)}
                </Text>
                <TouchableOpacity onPress={handleViewTerms}>
                  <Text style={styles.link}>Xem điều kiện sử dụng</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.doneButton} onPress={goBack}>
            <Text style={styles.doneButtonText}>Xong</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default CheckoutVoucherScreen;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f5f7",
    paddingTop: Platform.select({ ios: 70, android: 50, default: 40 })
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 25, 
    fontFamily: 'Inter', 
    fontWeight: "bold", 
    textAlign: "center"
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
    fontSize: 18
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

