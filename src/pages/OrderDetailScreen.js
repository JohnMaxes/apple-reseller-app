import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const OrderDetailScreen = ({ navigation, route }) => {
    // Get order from route params
    const { order } = route.params;

    // Payment method mapping (mock, since order may not have payment method)
    const paymentMethods = [
        { label: 'Thanh toán qua Ví Momo', icon: require('../assets/icons/momo-icon.png'), value: 'Momo' },
        { label: 'Thanh toán qua ngân hàng', icon: require('../assets/icons/banking-icon.png'), value: 'eBanking' },
        { label: 'Thanh toán qua Apple Pay', icon: require('../assets/icons/applepay-icon.png'), value: 'ApplePay'},
        { label: 'Thanh toán khi nhận hàng', icon: require('../assets/icons/cash-icon.png'), value: 'COD'},
    ];

    // If order has a paymentMethod, find its label, else fallback
    const selectedPayment = paymentMethods.find(m => m.value === order.paymentMethod) || { label: "Không xác định" };

    const goBack = () => navigation.goBack();

    // Calculate subtotal
    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Shipping fee (mocked as 50,000đ)
    const shippingFee = 50000;

    // Calculate voucher discounts
    let orderVoucherDiscount = 0;
    let orderVoucherTitle = '';
    if (order.orderOrderVoucher) {
        orderVoucherTitle = order.orderOrderVoucher.title;
        if (order.orderOrderVoucher.type === 'static') {
            orderVoucherDiscount = order.orderOrderVoucher.value || 0;
        } else if (order.orderOrderVoucher.type === 'ratio') {
            orderVoucherDiscount = Math.round((subtotal * (order.orderOrderVoucher.value || 0)));
        }
    }
    let shipVoucherDiscount = 0;
    let shipVoucherTitle = '';
    if (order.orderShipVoucher) {
        shipVoucherTitle = order.orderShipVoucher.title;
        // ship voucher value is a ratio (e.g. 1 for free, 0.5 for 50% off)
        shipVoucherDiscount = Math.round(shippingFee * (order.orderShipVoucher.value || 0));
    }

    // Calculate total
    // const total = subtotal + shippingFee - orderVoucherDiscount - shipVoucherDiscount;
    const total = order.totalAmount;

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                        <View style={styles.backIconWrapper}>
                            <Icon name="chevron-back" size={22} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>CHI TIẾT ĐƠN HÀNG</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Sản phẩm */}
                <View style={styles.box}>
                    {order.items.map((p) => (
                        <View key={p.imageUrl} style={styles.productItem}>
                            <Image source={{ uri: p.imageUrl }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{p.productName} {p.color} {p.storage}</Text>
                                <Text style={styles.productPrice}>{p.price.toLocaleString()}đ</Text>
                                <Text style={styles.productQuantity}>x{p.quantity}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.deliveryDate}>Ngày đặt hàng: {order.orderDate}</Text>
                    <Text style={styles.deliveryType}>{order.orderStatus}</Text>
                </View>

                {/* Địa chỉ giao hàng */}
                <View style={styles.box}>
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Địa chỉ{"\n"}giao hàng</Text>
                        </View>
                        <View style={styles.addressRightColumn}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.bold}>{order.fullName ? order.fullName : 'mock'}</Text>
                                <Text>{order.phoneNumber ? order.phoneNumber : 'mock'}</Text>
                                <Text>{order.shippingAddress}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Thanh toán */}
                <View style={styles.box}>
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Hình thức{"\n"}thanh toán</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={selectedPayment.icon} style={{ width: 40, height: 40, marginRight: 12 }} resizeMode="contain" />
                            <Text style={styles.paymentText}>
                                {selectedPayment.label}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Mã giảm giá */}
                <View style={styles.box}>
                    <View style={styles.rowBetween}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.grayLabel}>Mã giảm{"\n"}giá</Text>
                        </View>
                        <View style={styles.addressRightColumn}>
                            <View style={{flex: 1}}>
                                { order.productVoucherCode ? (
                                    <View style={{ marginBottom: 8 }}>
                                        <Text style={styles.bold}>{order.productVoucherCode}</Text>
                                    </View>
                                ) : null }
                                { order.shippingVoucherCode ? (
                                    <View style={{ marginBottom: 8 }}>
                                        <Text style={styles.bold}>{order.shippingVoucherCode}</Text>
                                    </View>
                                ): null }
                                { !order.productVoucherCode && !order.shippingVoucherCode ? (
                                    <View style={{flex: 1}}>
                                        <Text style={styles.bold}>Không áp dụng voucher</Text>
                                    </View>
                                ): null }
                            </View>
                        </View>
                    </View>
                </View>

                {/* Tổng thanh toán */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Chi tiết thanh toán</Text>
                    <View style={styles.summaryLine}>
                        <Text>Tổng tiền sản phẩm:</Text>
                        <Text>{subtotal.toLocaleString()}đ</Text>
                    </View>
                    <View style={styles.summaryLine}>
                        <Text>Tổng phí vận chuyển:</Text>
                        <Text>{shippingFee.toLocaleString()}đ</Text>
                    </View>
                    {/*}
                    { orderVoucherDiscount > 0 ? (
                        <View style={styles.summaryLine}>
                            <Text>Giảm từ mã giảm giá:</Text>
                            <Text style={styles.discountBlue}>-{orderVoucherDiscount.toLocaleString()}đ</Text>
                        </View>
                    ) : null }
                    { shipVoucherDiscount > 0 ? (
                        <View style={styles.summaryLine}>
                            <Text>Giảm phí vận chuyển:</Text>
                            <Text style={styles.discountBlue}>-{shipVoucherDiscount.toLocaleString()}đ</Text>
                        </View>
                    ) : null }
                    {*/}
                    { total !== subtotal ? (
                        <View style={styles.summaryLine}>
                            <Text>Đã giảm :</Text>
                            <Text style={styles.discountBlue}>-{Math.round((total - subtotal) * 100) / 100}đ</Text>
                        </View>
                    ) : (null)}
                    <View style={styles.summaryLine}>
                        <Text style={styles.bold}>Tổng thanh toán:</Text>
                        <Text style={[styles.bold]}>{total}đ</Text>
                    </View>
                </View>

                {/* Nút quay lại */}
                <TouchableOpacity style={styles.orderButton} onPress={goBack}>
                    <Text style={styles.orderButtonText}>Quay lại</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default OrderDetailScreen;

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
        paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }),
        paddingBottom: 30,
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