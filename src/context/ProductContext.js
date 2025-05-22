import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const ProductContext = createContext();
const ProductContextProvider = () => {

}

export { ProductContext, ProductContextProvider }