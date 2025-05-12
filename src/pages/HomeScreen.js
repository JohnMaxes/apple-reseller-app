import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Dimensions, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import Carousel from "react-native-reanimated-carousel";
import ProductPreview from "../components/ProductPreview";

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
                const newHotDeals = response.data.slice(0, 4), newNewArrivals = response.data.slice(4, 8);
                setHotDeals(newHotDeals);
                setNewArrivals(newNewArrivals);
                setLoading(false);    
            } catch (error) { console.log(error); }
        }
        init();
    }, []);

    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    const renderCarousel = () => { return (
        <View style={{ height: 300 }}>
            <Carousel loop
            width={carouselWidth} height={300}
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
    )};

    const renderProduct = ({ item }) => {
        return (
            <ProductPreview title={item.title} image={item.image} price={item.price} description={item.description}
            rating={item.rating.rate} ratingCount={item.rating.count} navigation={navigation} id={item.id}/>    
        )
    };

    return (
    <>
        <ScrollView style={{margin: 0, padding: 0}} contentContainerStyle={{ flexGrow: 1, margin: 0, paddingBottom: 75, paddingTop: 50 }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 20, paddingBottom: 7, borderColor: 'black' }}>
                <Text style={{ flex: 5, fontSize: 21, fontWeight: '600', fontFamily: 'Inter' }}>SẢN PHẨM MỚI</Text>
                <TouchableOpacity><Text style={{ flex: 1.5, fontSize: 15, fontWeight: '600', fontFamily: 'Inter',  }}>Xem tất cả</Text></TouchableOpacity>
            </View>
            <FlatList
                data={hotDeals}
                renderItem={renderProduct}
                numColumns={2}
                centerContent={true}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ alignItems: 'center' }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 20, paddingBottom: 7, paddingTop: 7, borderColor: 'black' }}>
                <Text style={{ flex: 5, fontSize: 21, fontWeight: '600', fontFamily: 'Inter' }}>SẢN PHẨM ƯU ĐÃI</Text>
                <Text style={{ flex: 1.5, fontSize: 15, fontWeight: '600', fontFamily: 'Inter' }}>Xem tất cả</Text>
            </View>
            <FlatList
                data={newArrivals}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ alignItems: 'center' }}
            />
        </ScrollView>
    </>
    );
}

export default HomeScreen;