import { useContext, useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../../styles";
import { CartContext } from "../context/CartContext";
import { CheckoutContext } from "../context/CheckoutContext";
import Checkbox from "./Checkbox";

const CartItem = ({ title, image, price, id, quantity, color }) => {
  const { checkoutItems, setCheckoutItems } = useContext(CheckoutContext);
  const { cart, setCart } = useContext(CartContext);
  const [itemQuantity, setQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(checkoutItems.some(item => item.id == id) ? true : false);

  const handleChangeQuantity = (operation) => {
    if (operation == '-' && itemQuantity == 1) {
      return setModalVisible(true);
    }
    else if (operation == '+') setQuantity(previousQuantity => previousQuantity + 1);
    else if (operation == '-') setQuantity(previousQuantity => previousQuantity - 1);
    const updatedItems = cart.map(item => item.id === id ? { ...item, quantity: itemQuantity } : item );
    setCart(updatedItems);
  };

  const removeCartItem = () => {
    setCart((prevCart) => (prevCart.filter(item => item.id !== id)));
    setCheckoutItems((prev) => prev.filter(item => item.id !== id))
  }

  const handleCheck = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      if (newChecked) setCheckoutItems((prev) => [...prev, {title, image, price, id, quantity, color}]);
      else setCheckoutItems((prev) => prev.filter(item => item.id !== id));
      return newChecked;
    });
  };

  return (
    <>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 17}}>Xóa sản phẩm này khỏi giỏ hàng?</Text>
            <View style={cartItemStyles.modalButtonsContainer}>
              <TouchableOpacity style={cartItemStyles.confirmButton} onPress={() => removeCartItem()}>
                <Text style={cartItemStyles.confirmButtonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity style={cartItemStyles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={cartItemStyles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={cartItemStyles.cartItemContainer}>
        <View style={cartItemStyles.itemRow}>
          <Checkbox onValueChange={handleCheck} value={checked}/>

          <View style={{height: '90%', alignItems: 'flex-start'}}>
            <Image source={{ uri: image }} style={cartItemStyles.productImage} />
          </View>

          <View style={cartItemStyles.itemInfo}>
            <Text numberOfLines={2} style={cartItemStyles.itemTitle}>{title}</Text>
            <Text style={cartItemStyles.itemPrice}>{price}đ</Text>
            <Text style={[cartItemStyles.discountNote, {display: 'none'}]}>(Chưa áp dụng ưu đãi)</Text>

            <View style={cartItemStyles.colorOptions}>
              <View style={[cartItemStyles.colorCircle, { backgroundColor: color || '#ccc' }]} />
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
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    padding: 5,
    paddingTop: 15,
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
    width: 60,
    height: 60,
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
    marginTop: 20,
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