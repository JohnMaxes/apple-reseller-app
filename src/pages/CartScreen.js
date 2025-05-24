import { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";
import { CartIcon } from "../assets/icons/cart-icon";
import { AuthContext } from "../context/AuthContext";

const CartScreen = ({navigation}) => {
    const { cart } = useContext(CartContext);
    const { loggedIn } = useContext(AuthContext);
    const navigateToProducts = () => navigation.navigate('Categories');
    if ( cart.length === 0 || !loggedIn ) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CartIcon width={150} height={150}></CartIcon>
            <Text style={cartStyle.emptyCartText1}>Giỏ hàng của bạn đang trống.</Text>
            <Text style={cartStyle.emptyCartText2}>Hãy duyệt thêm các sản phẩm hoặc mua{"\n"}các sản phẩm bạn đã lưu trước đó.</Text>
            <TouchableOpacity onPress={navigateToProducts} style={cartStyle.exploreButton}><Text style={{color: 'black', fontSize: 16, fontFamily: 'Inter'}}>Khám phá ngay</Text></TouchableOpacity>
        </View>
    );

    return (
        <>
            <View style={{ marginTop: 60, marginBottom: 10, alignItems: 'center', paddingHorizontal: 15 }}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <View style={{flex: 6, justifyContent: 'center'}}> 
                        <Text style={{fontWeight: 600, fontSize: 20}}>Tất cả sản phẩm</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', flex: 5, backgroundColor: '#007bff', paddingVertical: 10, borderRadius: 10, width: '90%' }}>
                        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList 
                data={cart}
                renderItem={({item}) => {return <CartItem title={item.title} image={item.image} price={item.price} id={item.id} quantity={item.quantity}/>}}
                keyExtractor={(item) => (item.id.toString())}
                scrollEnabled={true}
                style={{paddingBottom: 60}}
                contentContainerStyle={{paddingBottom: 100}}
            />
        </>
    );
}
export default CartScreen;

const cartStyle = StyleSheet.create({
    emptyCartText1: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 10
    },
    emptyCartText2: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Inter',
        color: 'grey'
    },
    exploreButton: {
        borderRadius: 20,
        marginTop: 20,
        width: 190,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#e0e0e0',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    }
})