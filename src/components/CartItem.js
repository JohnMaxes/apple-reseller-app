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

const CartItem = ({ uuid, title, color, storage, price, quantity, products, status = 'inStock' }) => {
  const { checkoutItems, setCheckoutItems } = useContext(CheckoutContext);
  const { cart, setCart } = useContext(CartContext);
  const [itemQuantity, setQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(
    checkoutItems.some(item => item.uuid === uuid)
  );

  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedStorage, setSelectedStorage] = useState(storage);

  // Thay đổi số lượng
  const handleChangeQuantity = (operation) => {
    if (operation === '-' && itemQuantity === 1) return setModalVisible(true);
    const newQuantity = operation === '+' ? itemQuantity + 1 : itemQuantity - 1;
    setQuantity(newQuantity);
    setCart(cart.map(item => item.uuid === uuid ? { ...item, quantity: newQuantity } : item));
  };

  const handleStorageSelect = (storage) => {
    if (storage !== selectedStorage) {
      setSelectedStorage(storage);
      // Find the first color for the new storage
      const newColors = colorMap[storage] || [];
      setSelectedColor(newColors[0] || null);
    }
  };
  const handleColorSelect = (color) => {
    const colorObj = availableColors.find(c => c.color === color);
    if (colorObj) setSelectedColor(colorObj);
  };
  // Danh sách tất cả bộ nhớ có trong sản phẩm
  const availableStorageOptions = [...new Set(products.map(p => p.storage))];
  const colorMap = products.reduce((map, product) => {
    const { storage, color, colorBackground } = product;
    if (!map[storage]) map[storage] = [];
    if (!map[storage].some(c => c.color === color)) {
      map[storage].push({ color, colorBackground });
    }
    return map;
  }, {});

  // Danh sách màu theo bộ nhớ đã chọn
  const availableColors = colorMap[selectedStorage] || [];

  // Cập nhật selectedColor nếu không hợp lệ hoặc chưa chọn
  useEffect(() => {
    if (Array.isArray(availableColors) && availableColors.length > 0) {
      setSelectedColor(prev => {
        return availableColors.some(c => c.color === prev?.color) ? prev : availableColors[0];
      });
    } else setSelectedColor(null);
  }, [selectedStorage]);

  // Lấy sản phẩm tương ứng với selectedStorage và selectedColor
  const selectedProduct = products.find(p => p.storage === selectedStorage && p.color === selectedColor?.color);

  // Lấy hình ảnh sản phẩm tương ứng
  const imageUrls = Array.isArray(selectedProduct?.images)
    ? selectedProduct.images.map(img => img.imageUrl)
    : [];
  
  const mainImageUrl = imageUrls.length > 0 ? imageUrls[0] : undefined;
  const newPrice = selectedProduct?.price || price;
  const productId = selectedProduct?.productId || null;
  const sku = selectedProduct?.sku || null;
  const formatPrice = (price) => { return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') };
  
  // Xóa sản phẩm khỏi giỏ hàng
  const removeCartItem = () => {
    setCart(cart.filter(item => !(item.uuid === uuid)));
    setCheckoutItems(checkoutItems.filter(item => !(item.uuid === uuid)));
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
        { uuid: uuid, productId: productId, sku: sku, title: title, image: mainImageUrl, price: newPrice, quantity: itemQuantity, color: selectedColor.color, storage: selectedStorage }
      ]);
    } else {
      setCheckoutItems(
        checkoutItems.filter(item => !(item.uuid === uuid))
      );
    }
  };

  // Cập nhật cart và checkoutItems khi đổi màu hoặc bộ nhớ
  useEffect(() => {
    setCart(cart.map(item =>
      item.uuid === uuid ? { ...item, color: selectedColor.color, storage: selectedStorage } : item
    ));
    if (checked) {
      setCheckoutItems(checkoutItems.map(item =>
        item.uuid === uuid ? { ...item, color: selectedColor.color, storage: selectedStorage, image: mainImageUrl } : item
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
          <Image source={{ uri: mainImageUrl }} style={styles.productImage} />
          <View style={styles.itemInfo}>
            <Text numberOfLines={2} style={styles.itemTitle}>{title} {selectedColor?.color || color?.color || color} {selectedStorage}</Text>
            <Text style={styles.itemPrice}>{formatPrice(price)}đ</Text>
            <Text style={styles.discountNote}>Chưa áp dụng ưu đãi</Text>

            <View style={styles.colorOptions}>
              {availableColors.map((colorOption, index) => {
                const isSelected = selectedColor?.color === colorOption.color;
                return (
                  <TouchableOpacity key={index} onPress={() => handleColorSelect(colorOption.color)} >
                    <View style={[styles.outerColorCircle, isSelected && { borderColor: '#0073FF', borderWidth: 2 }]}> 
                      <View style={[
                        styles.innerColorCircle,
                        { backgroundColor: colorOption.colorBackground },
                        isSelected && { borderColor: '#fff', borderWidth: 2 }
                      ]} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.storageOptions}>
              {availableStorageOptions.map((option, index) => {
                const isSelected = selectedStorage === option;
                return (
                  <TouchableOpacity key={index} style={[styles.storageButton, isSelected ? styles.storageButtonSelected : styles.storageButtonUnselected]} onPress={() => handleStorageSelect(option)} >
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
            <View style={styles.colorOptions}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tổng:  </Text>
              <Text style={styles.totalPrice}>{formatPrice(newPrice * itemQuantity)}đ</Text>
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
    marginTop: 5,
    alignItems: 'center'
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
