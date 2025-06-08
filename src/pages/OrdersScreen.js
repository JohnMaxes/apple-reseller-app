import { useCallback, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from "./LoadingScreen";
import { useFocusEffect } from "@react-navigation/native";
import { getOrders } from "../services/order";

const OrdersScreen = ({navigation}) => {
    useFocusEffect(
        useCallback(() => {
            const fetchOrders = async () => {
                setLoading(true);
                try {
                    const response = await getOrders();
                    console.log(response.data.data[0]);
                    setOrders(response.data.data);
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
    const [orders, setOrders] = useState([]);
    const goBack = () => navigation.goBack();

    const handleOrderDetails = (order) => navigation.navigate('OrderDetailsScreen', {order: order});
    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.orderId} onPress={() => handleOrderDetails(item)} style={{backgroundColor: 'white', padding: 10, marginBottom: 10}}>
            <Text style={{fontSize: 18, fontFamily: 'Inter', fontWeight: 900, marginBottom: 10}}>Mã đơn hàng: {item.orderId}</Text>
            {(item.items || []).map((orderItem, idx) => (
                <View key={idx} style={styles.productItem}>
                    <Image source={{ uri: orderItem.imageUrl }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>
                            {orderItem.productName} {orderItem.color} {orderItem.storage}
                        </Text>
                        <Text style={styles.productPrice}>
                            {orderItem.price?.toLocaleString()}đ
                        </Text>
                        <Text style={styles.productQuantity}>
                            Số lượng: {orderItem.quantity}
                        </Text>
                    </View>
                </View>
            ))}
            <Text style={{textAlign: 'right' ,fontSize: 16, fontFamily: 'Inter', fontWeight: 700, color: '#0073FF'}}>
                {item.orderStatus == 'pending' ? 'Đang xác nhận' : ''}
            </Text>
        </TouchableOpacity>
    );

    if(loading) return <LoadingScreen/>
    return (
        <View style={styles.container}>
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
                showsVerticalScrollIndicator={false}
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
        paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }),
        paddingBottom: 80,
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