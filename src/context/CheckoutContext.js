import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const CheckoutContext = createContext();
const CheckoutProvider = ({children}) => {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [address, setAddress] = useState({});
    const [vouchers, setVouchers] = useState([]);

    return (
        <CheckoutContext.Provider value={{ checkoutItems, setCheckoutItems, address, setAddress, vouchers, setVouchers }}>
            {children}
        </CheckoutContext.Provider>
    )
}

export { CheckoutContext, CheckoutProvider }