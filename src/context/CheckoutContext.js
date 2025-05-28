import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialAddresses = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    phone: '0909123456',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0987654321',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    isDefault: false,
  },
];

const CheckoutContext = createContext();
const CheckoutProvider = ({children}) => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(initialAddresses.find(address => address.isDefault));

  const [vouchers, setVouchers] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState([]);

  const [selectedPaymentMethod, setSelectwedPaymentMethod] = useState([]);
  
  const [total, setTotal] = useState(0);

  useState(() => {
      async function init(){
        let onDeviceAddress = await AsyncStorage.get('addresses');
        if(onDeviceAddress) setAddresses(onDeviceAddress);
        else {
          // init address fetch to fill out addresses
        }
        // init voucher fetch to fill out vouchers
      }
      init()
  }, [])

  useState(() => {
    // API to update addreses
    setSelectedAddress(addresses.find(address => address.isDefault));
    AsyncStorage.setItem('addresses', addresses);
  }, [addresses])

  useState(() => {
    let tempTotal = 0;
    checkoutItems.forEach(item => tempTotal += item.price)
    setTotal(tempTotal);
  }, [checkoutItems]);

  const checkout = async () => {
    // checkout API call
  }
  
  return (
      <CheckoutContext.Provider value={{ 
        checkoutItems, setCheckoutItems, 
        addresses, setAddresses, 
        selectedAddress, setSelectedAddress, 
        vouchers, setVouchers,
        selectedPaymentMethod, setSelectwedPaymentMethod 
      }}>
        {children}
      </CheckoutContext.Provider>
  )
}

export { CheckoutContext, CheckoutProvider }