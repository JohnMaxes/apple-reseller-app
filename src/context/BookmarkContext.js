import React, {useContext, createContext, useState} from 'react'

const BookmarkContext = createContext();
const BookmarkProvider = ({children}) => {
    const [bookmarks, setBookmarks] = useState([]);
    const addBookmark = (product) => {
        setBookmarks((prev) => {
            if (prev.find(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    }
    const removeBookmark = (productId) => {
        setBookmarks((prev) => prev.filter(item => item.id !== productId));
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export { BookmarkContext, BookmarkProvider };
