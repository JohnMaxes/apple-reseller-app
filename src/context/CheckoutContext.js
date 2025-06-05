import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutContext = createContext();

const CheckoutProvider = ({children}) => {
  const [isInit, setIsInit] = useState(false);

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const [shipVouchers, setShipVouchers] = useState([]);
  const [orderVouchers, setOrderVouchers] = useState([]);
  const [selectedShipVoucher, setSelectedShipVoucher] = useState(null);
  const [selectedOrderVoucher, setSelectedOrderVoucher] = useState(null);

  const ship = 100000; // Giả sử phí vận chuyển là 50.000đ
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const getTotalDiscount = () => {
    let orderDiscount = 0;
    let shippingDiscount = 0;

    // Giảm phí vận chuyển
    if (selectedShipVoucher) {
      const discount = parseFloat(selectedShipVoucher.discountValue);
      const max = parseFloat(selectedShipVoucher.maxDiscountValue || Infinity);

      if (selectedShipVoucher.discountType === 'percent') {
        shippingDiscount = Math.min((ship * discount), max);
      } else if (selectedShipVoucher.discountType === 'fixed') {
        shippingDiscount = discount;
      }

      if (shippingDiscount > ship) shippingDiscount = ship;
    }

    // Giảm từ voucher đơn hàng
    if (selectedOrderVoucher) {
      const discount = parseFloat(selectedOrderVoucher.discountValue);
      const max = parseFloat(selectedOrderVoucher.maxDiscountValue || Infinity);

      if (selectedOrderVoucher.discountType === 'percent') {
        orderDiscount = Math.min((subtotal * discount), max);
      } else if (selectedOrderVoucher.discountType === 'fixed') {
        orderDiscount = discount;
      }

      if (orderDiscount > subtotal) orderDiscount = subtotal;
    }

    return {
      orderDiscount: Math.round(orderDiscount),
      shippingDiscount: Math.round(shippingDiscount),
      totalDiscount: Math.round(orderDiscount + shippingDiscount),
    };
  };

  useEffect(() => {
      async function init() {
        let onDeviceAddress = await AsyncStorage.getItem('addresses', () => {});
        if(onDeviceAddress) setAddresses(JSON.parse(onDeviceAddress));
        else {
          // init address fetch to fill out addresses
        }
        // init voucher fetch to fill out ship and order vouchers (can be merged into one)
        setIsInit(true);
        console.log('context mount');
      }
      init()
  }, [])

  useEffect(() => {
    if(isInit) {
      // API to update addreses
      setSelectedAddress(addresses.find(address => address.isDefault));
    }
    addresses ? AsyncStorage.setItem('addresses', JSON.stringify(addresses)) 
    : AsyncStorage.removeItem('addresses');
  }, [addresses])

  useEffect(() => {
    if(checkoutItems.length > 0) {
      let tempTotal = 0;
      checkoutItems.forEach(item => tempTotal += item.price);
      setSubtotal(tempTotal);
      setTotal(tempTotal + ship);
      AsyncStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
    }
    else {
      setSubtotal(0);
      setTotal(0);
      AsyncStorage.removeItem('checkoutItems', checkoutItems);
    } 
    console.log('checkoutItems hook');
  }, [checkoutItems]);

  useEffect(() => {
    if (!isInit) return;

    console.log('vouchers hook');

    const { orderDiscount, shippingDiscount } = getTotalDiscount();
    const newTotal = Math.max(0, Math.round((subtotal + ship - shippingDiscount - orderDiscount) * 100) / 100);
    setTotal(newTotal);
  }, [selectedShipVoucher, selectedOrderVoucher, subtotal]);

  return (
    <CheckoutContext.Provider value={{ 
      checkoutItems, setCheckoutItems, 
      addresses, setAddresses, 
      selectedAddress, setSelectedAddress, 
      shipVouchers, setShipVouchers,
      orderVouchers, setOrderVouchers,
      selectedShipVoucher, setSelectedShipVoucher,
      selectedOrderVoucher, setSelectedOrderVoucher,
      selectedPaymentMethod, setSelectedPaymentMethod,
      subtotal, total,
      getTotalDiscount
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export { CheckoutContext, CheckoutProvider }