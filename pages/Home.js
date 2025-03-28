import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Dimensions, Image, FlatList, ScrollView } from "react-native";
import axios from "axios";
import styles from "../styles";
import Carousel from "react-native-reanimated-carousel";
import ProductPreview from "../components/ProductPreview";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "./ProductScreen";


const HStack = createStackNavigator();
const Home = () => {
    return (
        <HStack.Navigator initialRouteName="HomeScreen">
            <HStack.Screen name='HomeScreen' component={HomeScreen}/>
            <HStack.Screen name='ProductScreen' component={ProductScreen}/>
        </HStack.Navigator>
    )
}

const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [hotDeals, setHotDeals] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const carouselData = [
        { uri: "https://earth.org/wp-content/uploads/2022/06/Untitled-1024-×-683px-26-1200x675.jpg", color: '#FF5733' },
        { uri: "https://www.enjoyclothing.co.uk/wp-content/uploads/2023/02/enjoy-retro-clothing-truro-20-scaled.jpg", color: '#33FF57' },
        { uri: "https://ctnbee.com/blog/en/wp-content/uploads/sites/2/2021/07/ubrania-na-lato-1.jpg", color: '#3357FF' },
        { uri: "https://www.enjoyclothing.co.uk/wp-content/uploads/2023/02/enjoy-retro-clothing-truro-03-scaled.jpg", color: '#F3FF33' },
    ];
    const carouselWidth = Dimensions.get('window').width * 0.95;

    useEffect(() => {
        async function init() {
            try {
                let response = await axios.get('https://fakestoreapi.com/products?limit=8');
                
                const newHotDeals = response.data.slice(0, 4);
                const newNewArrivals = response.data.slice(4, 8);
        
                setHotDeals(newHotDeals);
                setNewArrivals(newNewArrivals);
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

    const renderCarousel = () => {
        return (
            <View style={{ height: 300 }}>
                <Carousel
                    loop
                    width={carouselWidth}
                    height={300}
                    data={carouselData}
                    autoPlay={true}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: item.color }}>
                            <Image source={{ uri: item.uri }} style={{ height: '100%', width: '100%' }} />
                        </View>
                    )}
                />
            </View>
        )
    };

    const renderProduct = ({ item }) => {
        return (
            <ProductPreview title={item.title} image={item.image} price={item.price} description={item.description}
            rating={item.rating.rate} ratingCount={item.rating.count} navigation={navigation} id={item.id}/>    
        )
    };

    return (
    <>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ padding: 16 }}>
                <Text style={{
                    fontSize: 30,
                    color: 'dodgerblue',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadowColor: 'cyan',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                }}>
                    fashion is life
                </Text>
                {renderCarousel()}
            </View>
            <View style={{ padding: 5 }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>Hot Deals 🔥</Text>
            </View>
            <FlatList
                data={hotDeals}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }}
            />
            <View style={{ padding: 5 }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>New Arrivals 🔥</Text>
            </View>
            <FlatList
                data={newArrivals}
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

export default Home;