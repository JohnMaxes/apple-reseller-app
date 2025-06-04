import { useCallback, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, Platform } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from "./LoadingScreen";
import { useFocusEffect } from "@react-navigation/native";

const OrdersScreen = ({navigation}) => {
    const mockUrl = 'https://cdn.tgdd.vn/Products/Images/42/329149/s16/iphone-16-pro-max-titan-sa-mac-thumbnew-650x650.png';
    const mockOrders = [
        { 
            orderId: '1', 
            address: { name: 'John Doe', phone: '0912345678', address: 'TPHCM' },
            orderShipVoucher: { id: 1, title: "FREESHIP 30/04", value: 1 },
            orderOrderVoucher: { id: 1, title: "VOUCHER Giảm 15%", type: 'ratio', value: 0.15 },
            orderItems: [
                { orderItemId: '1', id: '1', title: 'iPhone 15 Pro Max', image: mockUrl, color: 'Titan Gray', memory: '256GB', quantity: 1, price: 34990000 },
                { orderItemId: '2', id: '2', title: 'AirPods Pro 2', image: mockUrl, color: 'White', memory: '', quantity: 2, price: 4990000 }
            ],
            orderStatus: 'Đang giao', orderTotal: 44990000, orderDate: '2024-06-01'
        },
        {
            orderId: '2', 
            address: { name: 'John Doe', phone: '0912345678', address: 'TPHCM' },
            orderShipVoucher: null, orderOrderVoucher: null,
            orderItems: [
                { orderItemId: '3', id: '3', title: 'MacBook Air M3', image: mockUrl, color: 'Midnight', memory: '512GB', quantity: 1, price: 29990000 }
            ],
            orderStatus: 'Hoàn thành vào ...', orderTotal: 29990000, orderDate: '2024-05-15'
        }
    ];

    useFocusEffect(
        useCallback(() => {
            const fetchOrders = async () => {
            setLoading(true);
            try {
                /*
                const response = await axios.get('https://your-backend-link.com/orders');
                setOrders(response.data);
                */
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            };
            fetchOrders();
        }, [])
    );


    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(mockOrders);
    const goBack = () => navigation.goBack();

    const handleOrderDetails = (order) => navigation.navigate('OrderDetailsScreen', {order: order});
    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.orderId} onPress={() => handleOrderDetails(item)} style={{backgroundColor: 'white', padding: 10, marginBottom: 10}}>
            <Text style={{fontSize: 18, fontFamily: 'Inter', fontWeight: 900, marginBottom: 10}}>Mã đơn hàng: {item.orderId}</Text>
            {item.orderItems.map(orderItem => (
                <View key={orderItem.orderItemId} style={styles.productItem}>
                    <Image source={{ uri: orderItem.image }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{orderItem.title} {orderItem.color} {orderItem.memory}</Text>
                        <Text style={styles.productPrice}>{orderItem.price.toLocaleString()}đ</Text>
                        <Text style={styles.productQuantity}>Số lượng: {orderItem.quantity}</Text>
                    </View>
                </View>
            ))}
            <Text style={{textAlign: 'right' ,fontSize: 16, fontFamily: 'Inter', fontWeight: 700, color: '#0073FF'}}>{item.orderStatus}</Text>
        </TouchableOpacity>
    );

    if(loading) return <LoadingScreen/>
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                    <View style={styles.backIconWrapper}>
                        <Icon name="chevron-back" size={22} color="#000" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ĐƠN HÀNG</Text>
                <View style={{ width: 24 }}></View>
            </View>

            <FlatList
                data={orders}
                renderItem={renderItem}
            />
        </View>
    )
}

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9fb',
        paddingHorizontal: 20,
        paddingTop: Platform.select({ ios: 70, android: 50, default: 40 })
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
    productItem: {
        flexDirection: "row",
        marginBottom: 10
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 5,
    },
    productDetails: {
        flex: 1
    },
    productName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    productPrice: {
        color: "#000"
    },
    productQuantity: {
        color: "#666"
    },
})