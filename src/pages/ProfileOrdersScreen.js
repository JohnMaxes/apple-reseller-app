import { useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ProfileOrdersScreen = ({navigation}) => {
    let mockOrders = [
        { 
            orderId: '1', 
            orderShipVoucher: { code: 'SHIPFREE', discount: 20000, description: 'Free shipping for orders over 500k' },
            orderOrderVoucher: { code: 'SALE10', discount: 50000, description: '10% off for first order' },
            orderItems: [
                { orderItemId: '1', id: '1', title: 'iPhone 15 Pro Max', image: 'https://example.com/iphone15promax.png', color: 'Titan Gray', memory: '256GB', quantity: 1, price: 34990000 },
                { cartItemId: '2', id: '2', title: 'AirPods Pro 2', image: 'https://example.com/airpodspro2.png', color: 'White', memory: '', quantity: 2,price: 4990000 }
            ],
            orderStatus: 'Đang giao',
            orderTotal: 44990000,
            orderDate: '2024-06-01'
        },
        {
            orderId: '2',
            orderShipVoucher: null,
            orderOrderVoucher: null,
            orderItems: [
                { orderItemId: '3', id: '3', title: 'MacBook Air M3', image: 'https://example.com/macbookairm3.png', color: 'Midnight', memory: '512GB', quantity: 1, price: 29990000 }
            ],
            orderStatus: 'Đã giao',
            orderTotal: 29990000,
            orderDate: '2024-05-15'
        }
    ];

    const [orders, setOrders] = useState(mockOrders);
    const goBack = () => navigation.goBack();
    const handleOrderDetails = (order) => navigation.navigate('ProfileOrdersDetailsScreen', {order: order});

    const renderItem = (order) => (
        <TouchableOpacity onPress={() => handleOrderDetails(order)} style={{backgroundColor: 'white', padding: 10, marginBottom: 10}}>
            <Text>Mã đơn hàng: {order.orderId}</Text>
            {order.orderItems.map(item => (
                <View key={item.orderItemId} style={styles.productItem}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item.title} {item.color} {item.memory}</Text>
                        <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
                        <Text style={styles.productQuantity}>x{item.quantity}</Text>
                    </View>
                </View>
            ))}
        </TouchableOpacity>
    )

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

export default ProfileOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9fb',
        paddingHorizontal: 20,
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
})