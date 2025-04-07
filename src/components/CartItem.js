import React, { useContext, useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../../styles";
import { CartContext } from "../context/CartContext";

const products = [
  {
    id: 1,
    title: "Iphone 16 Pro Titan Trắn 512GB",
    price: 37999000,
    quantity: 1,
    image: "https://clickbuy.com.vn/uploads/pro/iphone-14-lock-128gb-khong-zin-tang-may-lg-197432.jpg",
  },
  {
    id: 2,
    title: "Iphone 16 Xanh Mòng Kết 256GB",
    price: 25999000,
    quantity: 1,
    image: "https://tanvienthanh.com/wp-content/uploads/2024/10/555248352.jpeg",
  },
  {
    id: 3,
    title: "Iphone 16 Pro Titan Tự nhiên 1T",
    price: 43999000,
    quantity: 1,
    image: "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/12/03/iphone-14-xanh-1.png",
  },
];

const CartItem = ({ title, image, price, id, quantity }) => {
  const [itemQuantity, setQuantity] = useState(quantity);
  const [modalVisible, setModalVisible] = useState(false);
  const { cart, setCart, cartTotal, setCartTotal } = useContext(CartContext);

  const handleChangeQuantity = (operation) => {
    if (operation == 'x' || (operation == '-' && itemQuantity == 1)) {
      setCartTotal(previousTotal => Math.floor(previousTotal - price * itemQuantity));
      let newCart = cart.filter(item => item.id !== id);
      setCart(newCart);
      return;
    } else if (operation == '+') {
      setCartTotal(previousTotal => Math.floor(previousTotal + price));
      setQuantity(previousQuantity => previousQuantity + 1);
    } else if (operation == '-') {
      setCartTotal(previousTotal => Math.floor(previousTotal - price));
      setQuantity(previousQuantity => previousQuantity - 1);
    }
    const updatedItems = cart.map(item =>
      item.id === id ? { ...item, quantity: itemQuantity } : item
    );
    setCart(updatedItems);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to remove this item?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: '#4CAF50',
                  marginHorizontal: 5,
                }}
                onPress={() => handleChangeQuantity('x')}
              >
                <Text style={{ color: 'white' }}>Confirm</Text>
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
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ width: Dimensions.get('window').width * 0.93, backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <View style={{ height: 18, width: 18, borderRadius: 4, borderWidth: 1, borderColor: '#000' }} />
          </TouchableOpacity>

          <Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: 10 }} />

          <View style={{ flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
            <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
            <Text style={{ fontSize: 15, color: '#333' }}>{price.toLocaleString()}đ</Text>
            <Text style={{ fontSize: 13, color: 'gray' }}>(Chưa áp dụng ưu đãi)</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#ccc', marginRight: 5 }} />
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#000', marginRight: 5 }} />
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#007bff', marginRight: 5 }} />
            </View>
            <Text style={{ color: 'green', fontSize: 13, marginTop: 4 }}>Tình trạng: Còn hàng</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <TouchableOpacity onPress={() => handleChangeQuantity('-')}>
                <Text style={{ fontSize: 22, paddingHorizontal: 10 }}>−</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16 }}>{itemQuantity}</Text>
              <TouchableOpacity onPress={() => handleChangeQuantity('+')}>
                <Text style={{ fontSize: 22, paddingHorizontal: 10 }}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
              Tổng: {(price * itemQuantity).toLocaleString()}đ
            </Text>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ paddingLeft: 8 }}>
            <Icon name='close-outline' size={24} color='#888' />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const ShoppingCartScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 50, paddingBottom: 120, alignItems: 'center' }}>
      {products.map((item) => (
        <CartItem
          key={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          id={item.id}
          quantity={item.quantity}
        />
      ))}

      <TouchableOpacity style={{ position: 'absolute', bottom: 20, backgroundColor: '#007bff', padding: 15, borderRadius: 25, width: '90%' }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ShoppingCartScreen;


// source gốc import React, { useContext, useState } from "react";
// import { View, Text, Dimensions, Image, TouchableOpacity, Modal, Button } from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons';
// import styles from "../../styles";
// import { CartContext } from "../context/CartContext";

// const CartItem = ({title, image, price, id, quantity}) => {
//     const [itemQuantity, setQuantity] = useState(quantity);
//     const [modalVisible, setModalVisible] = useState(false);
//     const {cart, setCart, cartTotal, setCartTotal} = useContext(CartContext);
//     const handleChangeQuantity = (operation) => {
//         console.log(id);
//         if(operation == 'x' || (operation == '-' && itemQuantity == 1)) {
//             setCartTotal(previousTotal => Math.floor(previousTotal - price * itemQuantity));
//             let newCart = cart.filter(item => item.id !== id);
//             console.log(newCart);
//             setCart(newCart);
//             return;
//         }
//         else if(operation == '+') {
//             setCartTotal(previousTotal => Math.floor(previousTotal + price));
//             setQuantity(previousQuantity => previousQuantity + 1);
//         }
//         else if(operation == '-') {
//             setCartTotal(previousTotal =>  Math.floor(previousTotal - price));
//             setQuantity(previousQuantity => previousQuantity - 1);
//         }
//         const updatedItems = cart.map(item =>
//             item.id === id ? { ...item, quantity: itemQuantity } : item
//         );
//         setCart(updatedItems);
//     }

//     return (
//     <>
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}
//         >
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <Text>Are you sure you want to remove this item?</Text>
//                     <View style={{alignContent:'center', justifyContent:'center', flexDirection:'row'}}>
//                     <TouchableOpacity 
//                         style={{
//                             padding: 10,
//                             borderRadius: 5,
//                             backgroundColor: '#4CAF50',
//                             marginHorizontal: 5,
//                         }} 
//                         onPress={() => handleChangeQuantity('x')}
//                     >
//                         <Text style={{ color: 'white', textAlign: 'center' }}>Confirm</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                         style={{
//                             padding: 10,
//                             borderRadius: 5,
//                             backgroundColor: '#f44336',
//                             marginHorizontal: 5,
//                         }} 
//                         onPress={() => setModalVisible(false)}
//                     >
//                         <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal> 
        
//         <View style={{width: Dimensions.get('window').width * 0.93, borderColor:'grey', borderWidth: 1, height: 135, marginBottom: 15, padding: 7, borderRadius: 10}}>
//             <View style ={{height: '25%'}}>
//                 <Text numberOfLines={1} style={{fontSize: 17}}>{title}</Text>
//             </View>
//             <View style={{flexDirection:'row', height: '75%'}}>
//                 <View style={{flex: 1, height: 'auto', width: 100}}>
//                     <Image source={{uri: image}} style={{height:'100%', width:'100%'}}/>
//                 </View>
//                 <View style={{flex: 1.3, flexDirection:'column', alignItems:'center', justifyContent:'center', paddingLeft: 10}}>
//                     <View style={{justifyContent:'center'}}>
//                         <Text style={{fontSize: 19}}>{price}$</Text>
//                     </View>
//                     <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', borderColor:'black', borderWidth:2}}>
//                         <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center'}} onPress={() => handleChangeQuantity('-')}>
//                             <Text style={{fontSize: 25}}>—</Text>
//                         </TouchableOpacity>
//                         <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
//                             <Text style={{fontSize: 20}}>{itemQuantity}</Text>
//                         </View>
//                         <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center'}} onPress={() => handleChangeQuantity('+')}>
//                             <Text style={{fontSize: 30}}>+</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={{flex: 2, alignItems:'center', justifyContent:'center'}}>
//                     <Text style={{fontSize:20, fontWeight:'bold'}}>Total: {price * itemQuantity}$</Text>
//                 </View>
//                 <TouchableOpacity style={{flex: 0.7, alignItems:'center', justifyContent:'center'}} onPress={() => setModalVisible(true)}>
//                     <Icon name='close-circle-outline' size={35}/>
//                 </TouchableOpacity>
//             </View>
//         </View> 
//      </>
//      )
//  }

//  export default CartItem; 