import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

const MAX_RECENT = 4;
const STORAGE_KEY_PREFIX = 'recently_viewed_';

const RecentContext = createContext();
export const RecentProvider = ({ children }) => {
    const [recentSet, setRecentSet] = useState(new Set());
    const {token} = useContext(AuthContext)
    useEffect(() => {
        const loadRecent = async () => {
        if (!userId) {
            setRecentSet(new Set());
            return;
        }
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY_PREFIX + userId);
            if (data) {
            setRecentSet(new Set(JSON.parse(data)));
            } else {
            setRecentSet(new Set());
            }
        } catch (e) {
            setRecentSet(new Set());
        }
        };
        loadRecent();
    }, [token]);

    useEffect(() => {
        if (!userId) return;
        AsyncStorage.setItem(
        STORAGE_KEY_PREFIX + userId,
        JSON.stringify(Array.from(recentSet))
        );
    }, [recentSet, userId]);

    const addRecent = useCallback((item) => {
        setRecentSet(prev => {
        const arr = Array.from(prev);
        const filtered = arr.filter(i => i !== item);
        filtered.unshift(item);
        return new Set(filtered.slice(0, MAX_RECENT));
        });
    }, []);

    const clearRecent = useCallback(() => {
        setRecentSet(new Set());
    }, []);

    return (
        <RecentContext.Provider value={{ recent: Array.from(recentSet), addRecent, clearRecent }}>
            {children}
        </RecentContext.Provider>
    );
};
