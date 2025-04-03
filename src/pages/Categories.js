import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, ScrollView } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import ProductPreview from "../components/ProductPreview";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CTopTab = createMaterialTopTabNavigator();
const CategoriesScreen = () => {
    const url = 'https://fakestoreapi.com';
    return (
        <CTopTab.Navigator 
            initialRouteName="All" 
            screenOptions={{
                tabBarStyle: { height: 80, paddingHorizontal: 10 },
                tabBarItemStyle: { width: 100 },
                scrollEnabled: true,
            }}
        >
            <CTopTab.Screen 
                name="All" 
                options={{ tabBarIcon: ({ color }) => <Icon name="list" size={20} color={color} /> }}
            >
                {({ navigation, route }) => (
                    <CategoriesAll url={url} navigation={navigation} route={route} />
                )}
            </CTopTab.Screen>

            <CTopTab.Screen 
                name="Electronics" 
                options={{ tabBarIcon: ({ color }) => <Icon name="laptop" size={20} color={color} /> }}
            >
                {({ navigation, route }) => (
                    <CategoriesElectronics url={url} navigation={navigation} route={route} />
                )}
            </CTopTab.Screen>

            <CTopTab.Screen 
                name="Jewelery" 
                options={{ tabBarIcon: ({ color }) => <Icon name="diamond" size={20} color={color} /> }}
            >
                {({ navigation, route }) => (
                    <CategoriesJewelery url={url} navigation={navigation} route={route} />
                )}
            </CTopTab.Screen>

            <CTopTab.Screen 
                name="Men's Clothing" 
                options={{ tabBarIcon: ({ color }) => <Icon name="shirt" size={20} color={color} /> }}
            >
                {({ navigation, route }) => (
                    <CategoriesMen url={url} navigation={navigation} route={route} />
                )}
            </CTopTab.Screen>

            <CTopTab.Screen 
                name="Women's Clothing" 
                options={{ tabBarIcon: ({ color }) => <Icon name="woman" size={20} color={color} /> }}
            >
                {({ navigation, route }) => (
                    <CategoriesWomen url={url} navigation={navigation} route={route} />
                )}
            </CTopTab.Screen>
        </CTopTab.Navigator>
    );
};

const CategoriesAll = ({navigation, url}) => {
    const [products, setProducts] = useState([]);
    const newUrl = url + '/products';
    return (<CategoriesRender products={products} setProducts={setProducts} url={newUrl} navigation={navigation}/>)
}

const CategoriesElectronics = ({navigation, url}) => {
    const [products, setProducts] = useState([]);
    const newUrl = url + '/products/category/electronics';
    return (<CategoriesRender products={products} setProducts={setProducts} url={newUrl} navigation={navigation}/>)
}

const CategoriesJewelery = ({navigation, url}) => {
    const [products, setProducts] = useState([]);
    const newUrl = url + '/products/category/jewelery';
    return (<CategoriesRender products={products} setProducts={setProducts} url={newUrl} navigation={navigation}/>)
}

const CategoriesMen = ({navigation, url}) => {
    const [products, setProducts] = useState([]);
    const newUrl = url + "/products/category/men's%20clothing";
    return (<CategoriesRender products={products} setProducts={setProducts} url={newUrl} navigation={navigation}/>)
}

const CategoriesWomen = ({navigation, url}) => {
    const [products, setProducts] = useState([]);
    const newUrl = url + "/products/category/women's%20clothing";
    return (<CategoriesRender products={products} setProducts={setProducts} url={newUrl} navigation={navigation}/>)
}

const CategoriesRender = ({navigation, products, setProducts, url}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function init() {
            try {
                let response = await axios.get(url);
                setProducts(response.data);
                setLoading(false);    
            } catch (error) {
                console.log(error);
            }
        }
        init();
    }, []);
    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    const renderProduct = ({ item }) => {
        return (
            <ProductPreview title={item.title} image={item.image} price={item.price} description={item.description}
            rating={item.rating.rate} ratingCount={item.rating.count} navigation={navigation} id={item.id}/>    
        )
    };

    return (
    <>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }}
            />
        </ScrollView>
    </>
    );
}

export default CategoriesScreen;