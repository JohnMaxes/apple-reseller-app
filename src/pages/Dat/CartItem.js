import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../context/CartContext";
import { CheckoutContext } from "../context/CheckoutContext";

const Checkbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={() => onValueChange(!value)} style={[styles.checkbox, { backgroundColor: value ? '#007bff' : '#fff' }]}>  
    {value ? <Icon name="checkmark" size={16} color="#fff" /> : null}
  </TouchableOpacity>
);

const CartItem = ({ title, image, price, id, quantity, color, storage, status = 'inStock' }) => {
  const { checkoutItems, setCheckoutItems } = useContext(CheckoutContext);
  const { cart, setCart } = useContext(CartContext);
  const [itemQuantity, setQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(checkoutItems.some(item => item.id === id));
  const colorOptions = ["#C4AB98", "#C2BCB2", "#D7D7D7", "#3C3C3D"];
  const storageOptions = ["256GB", "512GB", "1T"];
  const [selectedColor, setSelectedColor] = useState(color || colorOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(storage || storageOptions[0]);

  const handleChangeQuantity = (operation) => {
    if (operation === '-' && itemQuantity === 1) return setModalVisible(true);
    const newQuantity = operation === '+' ? itemQuantity + 1 : itemQuantity - 1;
    setQuantity(newQuantity);
    setCart(cart.map(item => item.id === id && item.color === selectedColor && item.storage === selectedStorage ? { ...item, quantity: newQuantity } : item));
  };

  const removeCartItem = () => {
    setCart(cart.filter(item => !(item.id === id && item.color === selectedColor && item.storage === selectedStorage)));
    setCheckoutItems(checkoutItems.filter(item => !(item.id === id && item.color === selectedColor && item.storage === selectedStorage)));
    setModalVisible(false);
  };

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (newChecked)
      setCheckoutItems([...checkoutItems, { title, image, price, id, quantity: itemQuantity, color: selectedColor, storage: selectedStorage }]);
    else
      setCheckoutItems(checkoutItems.filter(item => !(item.id === id && item.color === selectedColor && item.storage === selectedStorage)));
  };

  return (
    <>
      <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Bạn có chắc muốn xóa sản phẩm này?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={removeCartItem}>
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.cartItemContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
          <Icon name="close-circle-outline" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.itemRow}>
          <Checkbox onValueChange={handleCheck} value={checked} />

          <Image source={{ uri: image }} style={styles.productImage} />

          <View style={styles.itemInfo}>
            <Text numberOfLines={2} style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemPrice}>{price}đ</Text>
            <Text style={styles.discountNote}>(Chưa áp dụng ưu đãi)</Text>

            <View style={styles.colorOptions}>
              {colorOptions.map((colorOption, index) => {
                const isSelected = selectedColor === colorOption;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedColor(colorOption);
                      setCart(cart.map(item =>
                        item.id === id && item.color === selectedColor && item.storage === selectedStorage ? { ...item, color: colorOption } : item
                      ));
                      if (checked) {
                        setCheckoutItems(checkoutItems.map(item =>
                          item.id === id && item.color === selectedColor && item.storage === selectedStorage ? { ...item, color: colorOption } : item
                        ));
                      }
                    }}
                  >
                    <View style={[styles.outerColorCircle, isSelected && { borderColor: '#0073FF', borderWidth: 2 }]}> 
                      <View style={[styles.innerColorCircle, { backgroundColor: colorOption }, isSelected && { borderColor: '#fff', borderWidth: 2 }]} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.storageOptions}>
              {storageOptions.map((option, index) => {
                const isSelected = selectedStorage === option;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.storageButton, isSelected ? styles.storageButtonSelected : styles.storageButtonUnselected]}
                    onPress={() => {
                      setSelectedStorage(option);
                      setCart(cart.map(item =>
                        item.id === id && item.color === selectedColor && item.storage === selectedStorage ? { ...item, storage: option } : item
                      ));
                      if (checked) {
                        setCheckoutItems(checkoutItems.map(item =>
                          item.id === id && item.color === selectedColor && item.storage === selectedStorage ? { ...item, storage: option } : item
                        ));
                      }
                    }}
                  >
                    <Text style={[styles.storageText, isSelected && styles.storageTextSelected]}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => handleChangeQuantity('-')}>
                <Text style={styles.quantityBtn}>–</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{itemQuantity}</Text>
              <TouchableOpacity onPress={() => handleChangeQuantity('+')}>
                <Text style={styles.quantityBtn}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPrice}>Tổng: {price * itemQuantity}đ</Text>
            <Text style={[styles.stockStatus, { color: status === 'inStock' ? 'green' : 'red' }]}>Tình trạng: {status === 'inStock' ? 'Còn hàng' : 'Tạm hết hàng'}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 25
  },
  cartItemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    position: 'relative'
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
  },
  itemRow: {
    flexDirection: 'row'
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 5
  },
  itemInfo: {
    flex: 1
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '90%'
  },
  itemPrice: {
    color: '#333',
    marginTop: 2,
    fontSize: 16
  },
  discountNote: {
    fontSize: 12,
    color: '#999'
  },
  colorOptions: {
    flexDirection: 'row',
    marginTop: 5
  },
  outerColorCircle: {
    borderRadius: 20,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  innerColorCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderColor: "#ccc",
  },
  storageOptions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
    flexWrap: 'wrap'
  },
  storageButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  storageButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderWidth: 1
  },
  storageButtonUnselected: {
    backgroundColor: '#fff',
    borderColor: '#007bff',
    borderWidth: 1
  },
  storageText: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  storageTextSelected: {
    color: '#fff'
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16
  },
  quantityBtn: {
    fontSize: 18,
    paddingHorizontal: 10
  },
  totalPrice: {
    fontSize: 14,
    marginTop: 4
  },
  stockStatus: {
    fontSize: 13,
    marginTop: 4
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalContent: {
    margin: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  confirmButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  },
  cancelButtonText: {
    color: '#333'
  }
});
