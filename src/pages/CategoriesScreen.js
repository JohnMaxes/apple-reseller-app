import React, { useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import ProductPreview from "../components/ProductPreview";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CTopTab = createMaterialTopTabNavigator();

const CategoriesScreen = () => {
    const url = 'https://fakestoreapi.com';
    return (
        <CTopTab.Navigator initialRouteName="All" screenOptions={{ swipeEnabled: true }}>
            <CTopTab.Screen name="All">
                {({ navigation }) => <CategoriesRender url={`${url}/products`} navigation={navigation} />}
            </CTopTab.Screen>
            <CTopTab.Screen name="Electronics">
                {({ navigation }) => <CategoriesRender url={`${url}/products/category/electronics`} navigation={navigation} />}
            </CTopTab.Screen>
            <CTopTab.Screen name="Jewelery">
                {({ navigation }) => <CategoriesRender url={`${url}/products/category/jewelery`} navigation={navigation} />}
            </CTopTab.Screen>
            <CTopTab.Screen name="Men's Clothing">
                {({ navigation }) => <CategoriesRender url={`${url}/products/category/${encodeURIComponent("men's clothing")}`} navigation={navigation} />}
            </CTopTab.Screen>
        </CTopTab.Navigator>
    );
};

const CategoriesRender = ({ url, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };
    
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const fetchData = async () => {
                if (isActive) await fetchProducts();
            };
            fetchData();
            return () => { isActive = false; };
        }, [url])
    );

    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );    

    const renderProduct = ({ item }) => {
        return (
            <ProductPreview
                title={item.title}
                image={item.image}
                price={item.price}
                description={item.description}
                rating={item.rating.rate}
                ratingCount={item.rating.count}
                navigation={navigation}
                id={item.id}
            />
        );
    };

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }}
        />
    );
};

export default CategoriesScreen;