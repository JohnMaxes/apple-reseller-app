import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const order_vouchers = [
  { id: 1, title: "VOUCHER Giảm 15%", type: 'ratio', value: 0.15 },
  { id: 2, title: "VOUCHER Giảm 20%", type: 'ratio', value: 0.2 },
  { id: 3, title: "VOUCHER Giảm 500K", type: 'static', value: 50 },
  { id: 4, title: "VOUCHER Giảm 30%", type: 'ratio', value: 0.3 },
];

const ship_vouchers = [
  { id: 1, title: "FREESHIP 30/04", value: 1 },
]

const CheckoutContext = createContext();
const CheckoutProvider = ({children}) => {
  const [isInit, setIsInit] = useState(false);

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(addresses !== null ? addresses.find(address => address.isDefault) : null);

  const [shipVouchers, setShipVouchers] = useState(ship_vouchers);
  const [selectedShipVoucher, setSelectedShipVoucher] = useState(null);

  const [orderVouchers, setOrderVouchers] = useState(order_vouchers);
  const [selectedOrderVoucher, setSelectedOrderVoucher] = useState(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const ship = 50;
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

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
    }
    else {
      setSubtotal(0);
      setTotal(0);
    } 
    console.log('checkoutItems hook');
  }, [checkoutItems]);

  useEffect(() => {
    if(isInit) {
      console.log('vouchers hook');
      if(!selectedShipVoucher && !selectedOrderVoucher) return setTotal(subtotal + ship);
      let newShip = ship, deduction = 0;
      if(selectedShipVoucher) newShip = newShip * (1 - selectedShipVoucher.value)
      if(selectedOrderVoucher) {
        if(selectedOrderVoucher.type == 'ratio') deduction = subtotal * selectedOrderVoucher.value;
        if(selectedOrderVoucher.type == 'static') deduction = selectedOrderVoucher.value;
      }
      setTotal(subtotal + newShip - deduction);
    }
  }, [selectedShipVoucher, selectedOrderVoucher])

  const checkout = async () => {
    // checkout API call
  }
  
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
      subtotal, total
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export { CheckoutContext, CheckoutProvider }