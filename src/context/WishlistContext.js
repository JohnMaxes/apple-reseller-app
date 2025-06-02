import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const WishlistContext = createContext();
const WishlistProvider = ({children}) => {
    const { token } = useContext(AuthContext);
    
    const [wishlistInit, setWishlistInit] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        async function init() {
            setWishlistItems([]);
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
           setWishlistInit(true);
           console.log('wishlist mount');
        }
        init()
    }, [])
    
    useEffect(() => {
        const syncWishlist = async () => {
            console.log('syncing');
            if (!token) return;
            try {
                const response = await axios.get('endpoint to fetch wishlisted items', {
                    headers: { Authorization: token },
                });
                const items = response.data.wishlist_items;
                setWishlistItems(items);
            } catch (e) {
                console.log("Failed to sync wishlist:", e);
            }
        };
        syncWishlist();
    }, [token]);

    useEffect(() => {
        if(wishlistInit) {
            if(wishlistItems.length == 0) AsyncStorage.removeItem('wishlistItems').catch(console.log);
            else AsyncStorage.setItem('wishlistItems', JSON.stringify(wishlistItems)).catch(console.log);
        }
    }, [wishlistItems])

    const syncWishlist = async () => {
        if (!token) return;
        try {
            const response = await axios.get('endpoint to fetch wishlisted items', {
                headers: { Authorization: token },
            });
            const items = response.data.wishlist_items;
            setWishlistItems(items);
        } catch (e) {
            console.log("Failed to sync wishlist:", e);
        }
    };

    const wishlist = async (item) => {
        try {
            setWishlistItems(prev => [...prev, item]);
            // await syncWishlist()
        } catch (e) {
            console.log("Error adding to wishlist:", e);
        }
    };

    const unwishlist = async (item) => {
        try {
            setWishlistItems(prev => prev.filter(i => i.id !== item.id));
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
        <WishlistContext.Provider value={{ wishlistItems, wishlist, unwishlist, wishlistInit }}>
            {children}
        </WishlistContext.Provider>
    ); 
}

export { WishlistContext, WishlistProvider }