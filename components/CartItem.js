import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal, Button } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles";
import { MyContext } from "../context";

const CartItem = ({title, image, price, id, quantity}) => {
    const [itemQuantity, setQuantity] = useState(quantity);
    const [modalVisible, setModalVisible] = useState(false);
    const {cart, setCart, cartTotal, setCartTotal} = useContext(MyContext);
    const handleChangeQuantity = (operation) => {
        console.log(id);
        if(operation == 'x' || (operation == '-' && itemQuantity == 1)) {
            setCartTotal(previousTotal => Math.floor(previousTotal - price * itemQuantity));
            let newCart = cart.filter(item => item.id !== id);
            console.log(newCart);
            setCart(newCart);
            return;
        }
        else if(operation == '+') {
            setCartTotal(previousTotal => Math.floor(previousTotal + price));
            setQuantity(previousQuantity => previousQuantity + 1);
        }
        else if(operation == '-') {
            setCartTotal(previousTotal =>  Math.floor(previousTotal - price));
            setQuantity(previousQuantity => previousQuantity - 1);
        }
        const updatedItems = cart.map(item =>
            item.id === id ? { ...item, quantity: itemQuantity } : item
        );
        setCart(updatedItems);
    }

    return (
    <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}  //gồm 2 giá trị: true/false
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Are you sure you want to remove this item?</Text>
                    <View style={{alignContent:'center', justifyContent:'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            backgroundColor: '#4CAF50',
                            marginHorizontal: 5,
                        }} 
                        onPress={() => handleChangeQuantity('x')}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            backgroundColor: '#f44336',
                            marginHorizontal: 5,
                        }} 
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        <View style={{width: Dimensions.get('window').width * 0.93, borderColor:'grey', borderWidth: 1, height: 135, marginBottom: 15, padding: 7, borderRadius: 10}}>
            <View style ={{height: '25%'}}>
                <Text numberOfLines={1} style={{fontSize: 17}}>{title}</Text>
            </View>
            <View style={{flexDirection:'row', height: '75%'}}>
                <View style={{flex: 1, height: 'auto', width: 100}}>
                    <Image source={{uri: image}} style={{height:'100%', width:'100%'}}/>
                </View>

                <View style={{flex: 1.3, flexDirection:'column', alignItems:'center', justifyContent:'center', paddingLeft: 10}}>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize: 19}}>{price}$</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', borderColor:'black', borderWidth:2}}>
                        <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center'}} onPress={() => handleChangeQuantity('-')}>
                            <Text style={{fontSize: 25}}>—</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize: 20}}>{itemQuantity}</Text>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center'}} onPress={() => handleChangeQuantity('+')}>
                            <Text style={{fontSize: 30}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex: 2, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Total: {price * itemQuantity}$</Text>
                </View>
                <TouchableOpacity style={{flex: 0.7, alignItems:'center', justifyContent:'center'}} onPress={() => setModalVisible(true)}>
                    <Icon name='close-circle-outline' size={35}/>
                </TouchableOpacity>
            </View>
        </View>
    </>
    )
}

export default CartItem;