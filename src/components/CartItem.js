import { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../context/CartContext';
import { CheckoutContext } from '../context/CheckoutContext';
import Toast from 'react-native-toast-message';

const Checkbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={() => onValueChange(!value)} style={[styles.checkbox, { backgroundColor: value ? '#007bff' : '#fff' }]}>
    {value ? <Icon name="checkmark" size={16} color="#fff" /> : null}
  </TouchableOpacity>
);

const CartItem = ({
  sku,
  title,
  image,
  price,
  quantity,
  color,
  storage,
  status = 'inStock'
}) => {
  const { checkoutItems, setCheckoutItems } = useContext(CheckoutContext);
  const { cart, setCart } = useContext(CartContext);
  const [itemQuantity, setQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(
    checkoutItems.some(item => item.sku === sku && item.color === color && item.storage === storage)
  );

  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedStorage, setSelectedStorage] = useState(storage);
  const formatPrice = (price) => { return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') };

  // Thay đổi số lượng
  const handleChangeQuantity = (operation) => {
    if (operation === '-' && itemQuantity === 1) return setModalVisible(true);
    const newQuantity = operation === '+' ? itemQuantity + 1 : itemQuantity - 1;
    setQuantity(newQuantity);
    setCart(cart.map(item =>
      item.sku === sku && item.color === selectedColor && item.storage === selectedStorage
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeCartItem = () => {
    setCart(cart.filter(item => !(item.sku === sku && item.color === selectedColor && item.storage === selectedStorage)));
    setCheckoutItems(checkoutItems.filter(item => !(item.sku === sku && item.color === selectedColor && item.storage === selectedStorage)));
    setModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Xóa sản phẩm khỏi giỏ hàng thành công.',
      text1Style: { fontFamily: 'Inter', fontSize: 14, fontWeight: 500 },
      autoHide: true, avoidKeyboard: true, topOffset: 20,
    });
  };

  // Chọn/bỏ chọn sản phẩm để thanh toán
  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (newChecked) {
      setCheckoutItems([
        ...checkoutItems,
        {
          sku,
          title,
          image,
          price,
          quantity: itemQuantity,
          color: selectedColor,
          storage: selectedStorage
        }
      ]);
    } else {
      setCheckoutItems(
        checkoutItems.filter(item => !(item.sku === sku && item.color === selectedColor && item.storage === selectedStorage))
      );
    }
  };

  // Cập nhật cart và checkoutItems khi đổi màu hoặc bộ nhớ
  useEffect(() => {
    setCart(cart.map(item =>
      item.sku === sku
        ? { ...item, color: selectedColor, storage: selectedStorage }
        : item
    ));
    if (checked) {
      setCheckoutItems(checkoutItems.map(item =>
        item.sku === sku
          ? { ...item, color: selectedColor, storage: selectedStorage }
          : item
      ));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedStorage]);

  return (
    <>
      <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'Inter', textAlign: 'center' }}>Xóa sản phẩm này khỏi giỏ hàng?</Text>
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
            <Text numberOfLines={2} style={styles.itemTitle}>{title} {selectedStorage}</Text>
            <Text style={styles.itemPrice}>{formatPrice(price)}đ</Text>
            <Text style={styles.discountNote}>Chưa áp dụng ưu đãi</Text>
            <View style={styles.colorOptions}>
              <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Màu sắc:  </Text>
              <Text style={{ fontSize: 14, marginRight: 10 }}>{selectedColor}</Text>
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
            <View style={styles.colorOptions}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tổng:  </Text>
              <Text style={styles.totalPrice}>{formatPrice(price * itemQuantity)}đ</Text>
            </View>
            <Text style={[styles.stockStatus, { color: status === 'inStock' ? 'green' : 'red' }]}>
              Tình trạng: {status === 'inStock' ? 'Còn hàng' : 'Tạm hết hàng'}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  subHeader: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  cartItemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    position: 'relative'
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
    color: '#2364DE',
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold'
  },
  totalPrice: {
    color: '#2364DE',
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold'
  },
  discountNote: {
    fontSize: 12,
    color: '#999'
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
  stockStatus: {
    fontSize: 13,
    marginTop: 4
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
  CheckoutButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    width: "40%",
    alignSelf: "center",
  },
  doneButtonText: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalContent: {
    margin: 30,
    marginHorizontal: 50,
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
    width: 100,
    backgroundColor: '#e53935',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    width: 100,
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
  }
});
