import { useEffect, useState } from "react";
import { FlatList, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductCatalogPreview from "../components/ProductCatalogPreview";
import LoadingScreen from "./LoadingScreen";
import CategoriesTopTab from "../components/CategoriesTopTab";
import { getProductsByCategory } from "../services/product";

const CTopTab = createMaterialTopTabNavigator();

const CategoriesScreen = () => {
  return (
    <CTopTab.Navigator initialRouteName="iPhone" tabBar={props => <CategoriesTopTab {...props} />}>
      <CTopTab.Screen name="iPhone" component={CategoriesIphone} />
      <CTopTab.Screen name="iPad" component={CategoriesIpad} />
      <CTopTab.Screen name="MacBook" component={CategoriesMac} />
      <CTopTab.Screen name="Airpod" component={ComingSoonScreen} />
    </CTopTab.Navigator>
  )
};

const createCategoryScreen = (category, cover_url, accessory_url) => ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                    const response = await getProductsByCategory(category);
                    if (response.data.status === 200) {
                        setProducts(response.data.data);
                    } else {
                        setProducts([]);
                    }
                } catch (error) {
                    console.error(error);
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            }
        fetchProducts();
    }, [category]);
    if (loading) return <LoadingScreen/>;
    return <CategoriesRender products={products} navigation={navigation} cover_url={cover_url} accessory_url={accessory_url} />;
};

const iPhone_cover = 'https://www.cnet.com/a/img/resize/bde1b8ca1b9373b61bbf9d3e113a81ac76297b51/hub/2024/09/13/0df30744-a33f-4c6e-b58c-a90d7a914089/apple-iphone-16-2815.jpg?auto=webp&height=500';
const iPad_cover = 'https://idelta.co.in/assets/img/iPadPro/iPad_pro_banner.jpg';
const Mac_cover = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thegioididong.com%2Fhoi-dap%2Fmacbook-giam-20-kem-uu-dai-1-trieu-cho-hoc-sinh-1488928&psig=AOvVaw0-Or3y2FZBNOoabUQggyQT&ust=1749052774076000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDvsrvP1Y0DFQAAAAAdAAAAABAL'
const accessory = 'https://www.apple.com/v/iphone/home/cb/images/overview/essentials/magsafe__dac2joyve8wi_xlarge_2x.jpg';

const CategoriesIphone = createCategoryScreen('iPhone', iPhone_cover, accessory);
const CategoriesIpad = createCategoryScreen('iPad', iPad_cover, accessory);
const CategoriesMac = createCategoryScreen('MacBook', Mac_cover, accessory);
// const CategoriesAirpod = createCategoryScreen('airpod', airpod_cover, accessory);

const CategoriesRender = ({ navigation, products, cover_url, accessory_url }) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }} showsVerticalScrollIndicator={false}>
    <View style={{alignItems:'center', paddingHorizontal: 20, marginTop: 20,}}>
      <Image source={{uri: cover_url}} style={{width: '100%', height: 200, resizeMode: 'cover', borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
      }}/>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'baseline', padding: 20, paddingBottom: 7, borderColor: 'black' }}>
      <View style={{flex: 1}}>
        <Text style={{ flex: 5, fontSize: 21, fontWeight: 'bold', fontFamily: 'Inter' }}>Tất cả sản phẩm</Text>
      </View>
      <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={{ flex: 5, fontSize: 17, fontWeight: 600, fontFamily: 'Inter', color: '#2364DE' }}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={products.slice(0, 4)}
      renderItem={({ item }) => (
        <ProductCatalogPreview
          title={item.productName}
          image={item.images?.[0]?.imageUrl}
          price={item.price}
          description={item.description || ''}
          navigation={navigation}
          id={item.sku}
        />

      )}
      keyExtractor={(item) => item.sku.toString()}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={{ alignItems: 'flex-start', paddingHorizontal: 20, paddingBottom: 90 }}
    />
    <View style={{ flexDirection: 'row', alignItems: 'baseline', padding: 20, paddingBottom: 7, borderColor: 'black' }}>
      <View style={{flex: 1}}>
        <Text style={{ flex: 5, fontSize: 21, fontWeight: 'bold', fontFamily: 'Inter' }}>Phụ kiện đi kèm</Text>
      </View>
      <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={{ flex: 5, fontSize: 17, fontWeight: 600, fontFamily: 'Inter', color: '#2364DE' }}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
    <View style={{alignItems:'center', paddingHorizontal: 20, marginTop: 10,}}>
      <Image source={{uri: accessory_url}} style={{width: '100%', height: 200, resizeMode: 'cover', borderRadius: 20, marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
      }}/>
    </View>
    {/*
    <FlatList
      data={products.slice(0, 4)}
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
    */}
  </ScrollView>
)


const ComingSoonScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center', padding: 20, }}>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3524/3524388.png' }}
        style={{ width: 100, height: 100, marginBottom: 20, tintColor: '#888' }}
      />
      <Text style={{ fontSize: 28, fontWeight: '600', color: '#444', marginBottom: 10, textAlign: 'center' }}>
        Coming Soon
      </Text>
      <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', maxWidth: 300 }}>
        We're working hard to bring this feature to you. Stay tuned!
      </Text>
    </View>
  );
};

export default CategoriesScreen;