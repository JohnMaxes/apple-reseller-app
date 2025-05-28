import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const FilterContext = createContext();
const FilterProvider = ({children}) => {
    const [filters, setSelectedFilters] = useState(true);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        async function init() {
            if(token) {
                let items = await AsyncStorage.getItem('wishlistItems');
                if(items) setWishlistItems(JSON.parse(items))
            }
            /*
            else try {
                const response = await axios.get('endpoint to fetch wishlisted items', {
                    headers: { Authorization: token }
                });
                console.log(response.wishlist_items);
                await AsyncStorage.setItem('wishlistItems', JSON.stringify(response.wishlist_items));
            }
            catch (error) { console.log(error) }
            */
           setWishlistLoading(false);
        }
        init()
    }, [])

    
    useEffect(() => {
        const syncWishlist = async () => {
            if (!token) return;
            setWishlistLoading(true);
            try {
                const response = await axios.get('endpoint to fetch wishlisted items', {
                    headers: { Authorization: token },
                });
                const items = response.data.wishlist_items;
                setWishlistItems(items);
                await AsyncStorage.setItem('wishlistItems', JSON.stringify(items));
            } catch (e) {
                console.log("Failed to sync wishlist:", e);
            } finally { setWishlistLoading(false) } 
        };
        syncWishlist();
    }, [token]);

    const syncWishlist = async () => {
        if (!token) return;
        try {
            const response = await axios.get('endpoint to fetch wishlisted items', {
                headers: { Authorization: token },
            });
            const items = response.data.wishlist_items;
            setWishlistItems(items);
            await AsyncStorage.setItem('wishlistItems', JSON.stringify(items));
        } catch (e) {
            console.log("Failed to sync wishlist:", e);
        }
    };

    return (
        <FilterContext.Provider value={{ wishlistItems, wishlist, unwishlist, wishlistLoading }}>
            {children}
        </FilterContext.Provider>
    ); 
}

export { FilterContext, FilterProvider }