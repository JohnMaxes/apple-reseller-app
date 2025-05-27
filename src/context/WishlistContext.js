import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const WishlistContext = createContext();
const WishlistProvider = ({children}) => {
    const { token } = useContext(AuthContext);
    
    const [wishlistLoading, setWishlistLoading] = useState(true);
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

    const wishlist = async (item) => {
        try {
            const newItems = [...wishlistItems, item];
            setWishlistItems(newItems);
            await AsyncStorage.setItem('wishlistItems', JSON.stringify(newItems));
            // await syncWishlist()
        } catch (e) {
            console.log("Error adding to wishlist:", e);
        }
    };

    const unwishlist = async (item) => {
        try {
            const updatedItems = wishlistItems.filter((i) => i.id !== item.id);
            setWishlistItems(updatedItems);
            await AsyncStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
            /*
            if (token) {
            await axios.delete(`your-api-endpoint/${item.id}`, {
                headers: { Authorization: token }
            });
            }
            */
        } catch (error) {
            console.log("Failed to unwishlist item:", error);
            // Revert logic / breadcrumbs
        }
    };


    return (
        <WishlistContext.Provider value={{ wishlistItems, wishlist, unwishlist, wishlistLoading }}>
            {children}
        </WishlistContext.Provider>
    ); 
}

export { WishlistContext, WishlistProvider }