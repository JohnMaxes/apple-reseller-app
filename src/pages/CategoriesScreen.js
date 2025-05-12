import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, ScrollView, Text, Platform } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductCatalogPreview from "../components/ProductCatalogPreview";

const CTopTab = createMaterialTopTabNavigator();
const BASE_URL = 'https://fakestoreapi.com';

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUrl() { axios.get(url).then(res => setProducts(res.data)).catch(console.log).finally(() => setLoading(false))};
    getUrl();
  }, [url]);
  return { products, loading };
};

const LoadingScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const CategoriesRender = ({ navigation, products }) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductCatalogPreview
          title={item.title}
          image={item.image}
          price={item.price}
          description={item.description}
          rating={item.rating.rate}
          ratingCount={item.rating.count}
          navigation={navigation}
          id={item.id}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={{ alignItems: 'center' }}
    />
  </ScrollView>
);

const createCategoryScreen = (endpoint) => ({ navigation }) => {
    const { products, loading } = useFetchProducts(`${BASE_URL}${endpoint}`);
        if (loading) return <LoadingScreen />;
        return <CategoriesRender products={products} navigation={navigation} />;
};

const CategoriesAll = createCategoryScreen('/products');
const CategoriesElectronics = createCategoryScreen('/products/category/electronics');
const CategoriesJewelery = createCategoryScreen('/products/category/jewelery');
const CategoriesMen = createCategoryScreen("/products/category/men's%20clothing");

const CategoriesScreen = () => (
  <>
    <View style={{backgroundColor: 'black', paddingTop: Platform.OS === 'ios' ? 50 : 30, paddingBottom: 16, paddingHorizontal: 20, }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Categories</Text>
    </View>

    <CTopTab.Navigator initialRouteName="Iphone">
      <CTopTab.Screen name="Iphone" component={CategoriesAll} options={{ tabBarIcon: ({ color }) => <Icon name="list" size={20} color={color} /> }} />
      <CTopTab.Screen name="Ipad" component={CategoriesElectronics} options={{ tabBarIcon: ({ color }) => <Icon name="laptop" size={20} color={color} /> }} />
      <CTopTab.Screen name="Mac" component={CategoriesJewelery} options={{ tabBarIcon: ({ color }) => <Icon name="diamond" size={20} color={color} /> }} />
      <CTopTab.Screen name="Airpods" component={CategoriesMen} options={{ tabBarIcon: ({ color }) => <Icon name="shirt" size={20} color={color} /> }} />
    </CTopTab.Navigator>
  </>
);

export default CategoriesScreen;