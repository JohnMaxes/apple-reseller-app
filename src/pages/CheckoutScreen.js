import { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckoutContext } from "../context/CheckoutContext";

const CheckoutScreen = ({navigation}) => {
    const { checkoutItems, selectedAddress, total, selectedMethod, setSelectedMethod } = useContext(CheckoutContext);
    const [paymentMethod, setPaymentMethod] = useState(selectedMethod);
    const [voucher, setVoucher] = useState([]);

    const togglePaymentMethod = (method) => {
        setPaymentMethod(method);
        setSelectedMethod(method);
    };

    const paymentMethods = [
        { label: 'Thanh toán qua Momo', icon: require('../assets/icons/momo-icon.png'), value: 'Momo' },
        { label: 'Thanh toán qua ngân hàng', icon: require('../assets/icons/banking-icon.png'), value: 'eBanking' },
        { label: 'Thanh toán qua Apple Pay', icon: require('../assets/icons/applepay-icon.png'), value: 'ApplePay'},
        { label: 'Thanh toán khi nhận hàng', icon: require('../assets/icons/cash-icon.png'), value: 'Cash'},
    ];

    const goBack = () => navigation.goBack();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                        <View style={styles.backIconWrapper}>
                        <Icon name="chevron-back" size={22} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>THANH TOÁN</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Sản phẩm */}
                <View style={styles.box}>
                    {checkoutItems.map((p) => (
                        <View key={p.id} style={styles.productItem}>
                            <Image source={{ uri: p.image }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{p.title}</Text>
                                <Text style={styles.productPrice}>{p.price.toLocaleString()}đ</Text>
                                <Text style={styles.productQuantity}>x{p.quantity}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.deliveryDate}>Thời gian giao hàng dự kiến: T5 29/2/2025</Text>
                    <Text style={styles.deliveryType}>Giao hàng tiêu chuẩn</Text>
                </View>

                {/* Địa chỉ giao hàng */}
                <View style={styles.box}>
                   <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Địa chỉ{"\n"}giao hàng</Text>
                        </View>
                        <TouchableOpacity style={styles.addressRightColumn} onPress={() => navigation.navigate("CheckoutAddressScreen")}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bold}>{selectedAddress.name}</Text>
                            <Text>{selectedAddress.phone}</Text>
                            <Text>{selectedAddress.address}</Text>
                        </View>
                        <Icon name="chevron-forward" size={18} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* Thanh toán */}
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Hình thức{"\n"}thanh toán</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        { paymentMethods.map((method) => (
                            <TouchableOpacity key={method.value} style={[ styles.paymentBox, paymentMethod === method.value && styles.paymentBoxSelected ]}
                                onPress={() => togglePaymentMethod(method.value)} activeOpacity={0.8}
                            >
                                <Image
                                    source={method.icon}
                                    style={{ width: 28, height: 28, marginRight: 12, tintColor: paymentMethod === method.value ? "#fff" : "#007bff" }}
                                    resizeMode="contain"
                                />
                                <Text style={[ styles.paymentText, paymentMethod === method.value && { color: "#fff", fontWeight: "bold" } ]}>
                                    {method.label}
                                </Text>
                            </TouchableOpacity>
                        )) }                        
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Mã giảm giá */}
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Mã giảm{"\n"}giá</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={styles.bold}>VOUCHER03</Text>
                                <Text style={styles.discountBlue}>Đã giảm 100.000đ</Text>
                            </View>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={styles.bold}>Miễn phí vận chuyển</Text>
                                <Text style={styles.discountBlue}>Đã giảm 50.000đ</Text>
                            </View>
                            <View style={styles.voucherInputRow}>
                                <TextInput
                                    placeholder="Nhập mã giảm giá"
                                    value={voucher}
                                    onChangeText={setVoucher}
                                    style={styles.voucherInput}
                                />
                                <Icon name="search-outline" size={20} color="#888" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Tổng thanh toán */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Chi tiết thanh toán</Text>
                    <View style={styles.summaryLine}>
                        <Text>Tổng tiền sản phẩm:</Text>
                        <Text>{total}</Text>
                    </View>
                    <View style={styles.summaryLine}>
                        <Text>Tổng phí vận chuyển:</Text>
                        <Text>50.000đ</Text>
                    </View>
                    {/*}
                    <View style={styles.summaryLine}>
                        <Text>Giảm từ mã giảm giá:</Text>
                        <Text style={styles.discountBlue}>-100.000đ</Text>
                    </View>
                    <View style={styles.summaryLine}>
                        <Text>Giảm phí vận chuyển:</Text>
                        <Text style={styles.discountBlue}>-50.000đ</Text>
                    </View>
                    {*/}
                    <View style={styles.summaryLine}>
                        <Text style={styles.bold}>Tổng thanh toán:</Text>
                        <Text style={[styles.bold]}>{total + 50000}đ</Text>
                    </View>
                </View>

                {/* Nút đặt hàng */}
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Đặt hàng</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingTop: Platform.select({ ios: 70, android: 50, default: 40 })
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
        paddingBottom: 120
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
    box: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15
    },
    productItem: {
        flexDirection: "row",
        marginBottom: 10
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10
    },
    productDetails: {
        flex: 1
    },
    productName: {
        fontWeight: "bold"
    },
    productPrice: {
        color: "#000"
    },
    productQuantity: {
        color: "#666"
    },
    deliveryDate: {
        marginTop: 10,
        color: "#000"
    },
    deliveryType: {
        color: "#888"
    },
    rowBetween: {
        flexDirection: "row",
        marginBottom: 10
    },
    leftColumn: {
        width: 100
    },
    rightColumn: {
        flex: 1
    },
    addressRightColumn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    grayLabel: {
        color: "#999",
        fontSize: 14
    },
    bold: {
        fontWeight: "bold"
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 10
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    paymentText: {
        fontSize: 14
    },
    discountBlue: {
        color: "#007bff"
    },
    voucherInputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginTop: 10
    },
    voucherInput: {
        flex: 1,
        paddingVertical: 6
    },
    summaryBox: {
        backgroundColor: "#eaf3ff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20
    },
    summaryTitle: {
        fontWeight: "bold",
        marginBottom: 10
    },
    summaryLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    orderButton: {
        backgroundColor: "#007bff",
        width: "50%",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 40
    },
    orderButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    paymentBox: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#007bff",
        marginBottom: 8,
        backgroundColor: "#fff"
    },
    paymentBoxSelected: {
        backgroundColor: "#007bff",
        borderColor: "#007bff",
    },
});

export default CheckoutScreen;
