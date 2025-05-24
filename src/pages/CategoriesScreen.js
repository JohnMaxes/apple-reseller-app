import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductCatalogPreview from "../components/ProductCatalogPreview";
import LoadingScreen from "./LoadingScreen";
import CategoriesTopTab from "../components/CategoriesTopTab";

const CTopTab = createMaterialTopTabNavigator();
const BASE_URL = 'https://fakestoreapi.com';



const CategoriesScreen = () => {
  return (
    <CTopTab.Navigator initialRouteName="iPhone" tabBar={props => <CategoriesTopTab {...props} />}>
      <CTopTab.Screen name="iPhone" component={CategoriesAll} />
      <CTopTab.Screen name="iPad" component={CategoriesElectronics} />
      <CTopTab.Screen name="Mac" component={CategoriesJewelery} />
      <CTopTab.Screen name="Airpod" component={CategoriesMen} />
    </CTopTab.Navigator>
  )
};

const createCategoryScreen = (endpoint) => ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function getUrl() { axios.get(BASE_URL + endpoint).then(res => setProducts(res.data)).catch(console.log).finally(() => setLoading(false))};
      getUrl();
    }, [endpoint]);
    if (loading) return <LoadingScreen/>;
    return <CategoriesRender products={products} navigation={navigation} />;
};

const CategoriesAll = createCategoryScreen('/products');
const CategoriesElectronics = createCategoryScreen('/products/category/electronics');
const CategoriesJewelery = createCategoryScreen('/products/category/jewelery');
const CategoriesMen = createCategoryScreen("/products/category/men's%20clothing");

const CategoriesRender = ({ navigation, products }) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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

export default CategoriesScreen;