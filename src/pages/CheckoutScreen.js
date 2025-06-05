import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckoutContext } from "../context/CheckoutContext";
import Toast from "react-native-toast-message";

const CheckoutScreen = ({ navigation }) => {
    const {
        checkoutItems,
        selectedAddress,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedShipVoucher,
        selectedOrderVoucher,
        subtotal,
        total,
        getTotalDiscount
    } = useContext(CheckoutContext);

    const { orderDiscount, shippingDiscount } = getTotalDiscount();

    const paymentMethods = [
        { label: 'Thanh toán qua Ví Momo', icon: require('../assets/icons/momo-icon.png'), value: 'Momo' },
        { label: 'Thanh toán qua ngân hàng', icon: require('../assets/icons/banking-icon.png'), value: 'eBanking' },
        { label: 'Thanh toán qua Apple Pay', icon: require('../assets/icons/applepay-icon.png'), value: 'ApplePay' },
        { label: 'Thanh toán khi nhận hàng', icon: require('../assets/icons/cash-icon.png'), value: 'Cash' },
    ];

    const goBack = () => navigation.goBack();

    const infoGuard = () => {
        if (!selectedAddress || !selectedPaymentMethod) {
            Toast.show({
                type: 'error',
                text1: 'Bạn chưa chọn ' + (!selectedAddress ? 'địa chỉ giao hàng.' : 'phương thức thanh toán.'),
                text2: 'Vui lòng chọn trước khi tiếp tục!',
                text1Style: { fontFamily: 'Inter', fontSize: 16, fontWeight: 500 },
                text2Style: { fontFamily: 'Inter', fontSize: 12 },
                autoHide: true,
                avoidKeyboard: true,
                topOffset: 20,
            });
        } else {
            navigation.navigate('CheckoutConfirmScreen');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={{ zIndex: 10 }} onPress={goBack}>
                        <View style={styles.backIconWrapper}>
                            <Icon name="chevron-back" size={22} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>THANH TOÁN</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Sản phẩm */}
                <View style={styles.box}>
                    {checkoutItems.map((p, index) => (
                        <View key={p.uuid || `${p.title}-${p.color.title}-${p.memory}-${index}`} style={styles.productItem}>
                            <Image source={{ uri: p.image }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{p.title} {p.color.title} {p.memory}</Text>
                                <Text style={styles.productPrice}>{p.price.toLocaleString("vi-VN")}đ</Text>
                                <Text style={styles.productQuantity}>x{p.quantity}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.deliveryDate}>Thời gian giao hàng dự kiến: T5 29/2/2025</Text>
                    <Text style={styles.deliveryType}>Giao hàng tiêu chuẩn</Text>
                </View>

                {/* Địa chỉ giao hàng và thanh toán */}
                <View style={styles.box}>
                    {/* Địa chỉ */}
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Địa chỉ{"\n"}giao hàng</Text>
                        </View>
                        <TouchableOpacity style={styles.addressRightColumn} onPress={() => navigation.navigate("CheckoutAddressScreen")}>
                            {selectedAddress ? (
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.bold}>{selectedAddress.fullName}</Text>
                                    <Text>{selectedAddress.phoneNumber}</Text>
                                    <Text>{selectedAddress.shippingAddress}</Text>
                                </View>
                            ) : (
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.bold}>Hãy chọn một địa chỉ!</Text>
                                </View>
                            )}
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
                            {paymentMethods.map((method) => (
                                <TouchableOpacity
                                    key={method.value}
                                    style={[styles.paymentBox, selectedPaymentMethod === method.value && styles.paymentBoxSelected]}
                                    onPress={() => setSelectedPaymentMethod(method.value)}
                                    activeOpacity={0.8}
                                >
                                    <Image source={method.icon} style={{ width: 45, height: 45, marginRight: 12 }} resizeMode="contain" />
                                    <Text style={[styles.paymentText, selectedPaymentMethod === method.value && { color: "#fff", fontWeight: "bold" }]}>
                                        {method.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Mã giảm giá */}
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Mã giảm{"\n"}giá</Text>
                        </View>
                        <TouchableOpacity style={styles.addressRightColumn} onPress={() => navigation.navigate("CheckoutVoucherScreen")}>
                            <View style={{ flex: 1 }}>
                                {selectedOrderVoucher && orderDiscount > 0 && (
                                    <View style={{ marginBottom: 8 }}>
                                        <Text style={styles.bold}>{selectedOrderVoucher.code}</Text>
                                        <Text style={styles.discountBlue}>Đã giảm {orderDiscount.toLocaleString("vi-VN")}đ</Text>
                                    </View>
                                )}
                                {selectedShipVoucher && shippingDiscount > 0 && (
                                    <View style={{ marginBottom: 8 }}>
                                        <Text style={styles.bold}>{selectedShipVoucher.code}</Text>
                                        <Text style={styles.discountBlue}>Đã giảm {shippingDiscount.toLocaleString("vi-VN")}đ</Text>
                                    </View>
                                )}
                                {!selectedShipVoucher && !selectedOrderVoucher && (
                                    <Text style={styles.bold}>Áp dụng voucher ở đây!</Text>
                                )}
                            </View>
                            <Icon name="chevron-forward" size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tổng thanh toán */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Chi tiết thanh toán</Text>
                    <View style={styles.summaryLine}>
                        <Text>Tổng tiền sản phẩm:</Text>
                        <Text>{subtotal.toLocaleString("vi-VN")}đ</Text>
                    </View>
                    <View style={styles.summaryLine}>
                        <Text>Tổng phí vận chuyển:</Text>
                        <Text>50.000đ</Text>
                    </View>
                    {orderDiscount > 0 && (
                        <View style={styles.summaryLine}>
                            <Text>Giảm từ mã giảm giá:</Text>
                            <Text style={styles.discountBlue}>-{orderDiscount.toLocaleString("vi-VN")}đ</Text>
                        </View>
                    )}
                    {shippingDiscount > 0 && (
                        <View style={styles.summaryLine}>
                            <Text>Giảm phí vận chuyển:</Text>
                            <Text style={styles.discountBlue}>-{shippingDiscount.toLocaleString("vi-VN")}đ</Text>
                        </View>
                    )}
                    <View style={styles.summaryLine}>
                        <Text style={styles.bold}>Tổng thanh toán:</Text>
                        <Text style={styles.bold}>{total.toLocaleString("vi-VN")}đ</Text>
                    </View>
                </View>

                {/* Nút đặt hàng */}
                <TouchableOpacity style={styles.orderButton} onPress={infoGuard}>
                    <Text style={styles.orderButtonText}>Tiếp tục</Text>
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
        paddingBottom: 30,
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
        borderColor: "#ddd",
        marginBottom: 8,
        backgroundColor: "#fff"
    },
    paymentBoxSelected: {
        backgroundColor: "#007bff",
        borderColor: "#007bff",
    },
});

export default CheckoutScreen;
