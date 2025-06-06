import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENTLY_VIEWED_KEY = 'recently_viewed_products';
const MAX_RECENT = 4;

export const addRecentlyViewed = async (product) => {
  try {
    const json = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    let recent = json ? JSON.parse(json) : [];
    // Remove if already exists
    recent = recent.filter(item => item.sku !== product.sku);
    // Add to front
    recent.unshift(product);
    // Limit to MAX_RECENT
    if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
    await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent));
  } catch (e) {
    console.log('Error updating recently viewed:', e);
  }
};

export const getRecentlyViewed = async () => {
  try {
    const json = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};