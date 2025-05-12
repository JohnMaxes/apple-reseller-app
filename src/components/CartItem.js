import React, { useContext, useState, useEffect } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../../styles";
import { CartContext } from "../context/CartContext";
import Checkbox from "./Checkbox";

const CartItem = ({ title, image, price, id, quantity }) => {
  const [itemQuantity, setQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const { cart, setCart, setCheckedItems } = useContext(CartContext);

  const handleChangeQuantity = (operation) => {
    if (operation == 'x' || (operation == '-' && itemQuantity == 1)) {
      setCart((prevCart) => (prevCart.filter(item => item.id !== id)));
      return;
    }
    else if (operation == '+') setQuantity(previousQuantity => previousQuantity + 1);
    else if (operation == '-') setQuantity(previousQuantity => previousQuantity - 1);
    const updatedItems = cart.map(item => item.id === id ? { ...item, quantity: itemQuantity } : item );
    setCart(updatedItems);
  };

  const handleCheck = () => {
    setChecked((prev) => !prev);
    if(checked) setCheckedItems((prev) => [...prev, id])
    else setCheckedItems((prev) => (prev.filter(x => x !== id)))
  };

  return (
    <>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to remove this item?</Text>
            <View style={cartItemStyles.modalButtonsContainer}>
              <TouchableOpacity style={cartItemStyles.confirmButton} onPress={() => handleChangeQuantity('x')}>
                <Text style={cartItemStyles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={cartItemStyles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={cartItemStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={cartItemStyles.cartItemContainer}>
        <View style={cartItemStyles.itemRow}>
          <Checkbox onValueChange={handleCheck} value={checked}/>

          <Image source={{ uri: image }} style={cartItemStyles.productImage} />

          <View style={cartItemStyles.itemInfo}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{alignSelf: 'flex-end', top: -7.5, left: 7.5, marginBottom: -10}}>
              <Icon name='close-outline' size={25} color='#888' />
            </TouchableOpacity>

            <Text numberOfLines={2} style={cartItemStyles.itemTitle}>{title}</Text>
            <Text style={cartItemStyles.itemPrice}>{price}đ</Text>
            <Text style={[cartItemStyles.discountNote, {display: 'none'}]}>(Chưa áp dụng ưu đãi)</Text>

            <View style={cartItemStyles.colorOptions}>
              <View style={[cartItemStyles.colorCircle, { backgroundColor: '#ccc' }]} />
              <View style={[cartItemStyles.colorCircle, { backgroundColor: '#000' }]} />
              <View style={[cartItemStyles.colorCircle, { backgroundColor: '#007bff' }]} />
            </View>

            <Text style={cartItemStyles.stockStatus}>Tình trạng: Còn hàng</Text>

            <View style={cartItemStyles.quantityControl}>
              <TouchableOpacity style={cartItemStyles.quantityButton} onPress={() => handleChangeQuantity('-')}>
                <Icon name="remove-outline" size={22}></Icon>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', paddingHorizontal: 5}}>
                <Text style={[cartItemStyles.quantityText]}>{itemQuantity}</Text>
              </View>
              <TouchableOpacity style={cartItemStyles.quantityButton} onPress={() => handleChangeQuantity('+')}>
                <Icon name="add-outline" size={22}></Icon>
              </TouchableOpacity>
            </View>

            <Text style={cartItemStyles.totalPrice}>
              Tổng: {price * itemQuantity}đ
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CartItem;

const cartItemStyles = StyleSheet.create({
  cartItemContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    borderColor: 'black', borderWidth: 2
  },
  checkbox: {
    height: 18,
    width: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18.77,
  },
  itemPrice: {
    fontSize: 18.77,
    color: '#333',
  },
  discountNote: {
    fontSize: 13,
    color: 'gray',
  },
  colorOptions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  stockStatus: {
    color: 'green',
    fontSize: 13,
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  quantityText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginHorizontal: 5,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f44336',
    marginHorizontal: 5,
  },
  confirmButtonText: {
    color: 'white',
  },
  cancelButtonText: {
    color: 'white',
  },
});