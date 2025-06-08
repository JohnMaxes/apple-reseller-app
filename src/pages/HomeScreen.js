import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, FlatList, ScrollView, Platform } from "react-native";
import axios from "axios";
import NewsPreview from "../components/NewsPreview";
import PreviousProductPreview from "../components/PreviousProductPreview";


const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);
    const news = [
        { title: 'Apple Intelligence', description: 'Giúp bạn làm những điều kỳ diệu', image: '../assets/banners/apple-intelligence.png' },
        { title: 'Mac OS 15', description: 'Trang bị Apple Intelligence', image: '../assets/banners/mac-os'},
        { title: 'Apple Intelligence X', description: 'Giúp bạn làm những điều kỳ diệu', image: '../assets/banners/apple-intelligence.png' },
        { title: 'Mac OS 16', description: 'Trang bị Apple Intelligence', image: '../assets/banners/mac-os'},
    ]

    useEffect(() => {
        async function init() {
            try {
                let response = await axios.get('https://fakestoreapi.com/products?limit=4');
                setNewArrivals(response.data);
                setLoading(false);
            }
            catch (error) { console.log(error); }
        }
        init();
    }, []);

    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    const renderProduct = ({ item }) => (
        <PreviousProductPreview title={item.title} image={item.image} price={item.price} description={item.description}
        rating={item.rating.rate} ratingCount={item.rating.count} navigation={navigation} id={item.id}/>    
    )

    return (
    <>
        <ScrollView style={{ margin: 0, padding: 0 }} contentContainerStyle={{ flexGrow: 1, margin: 0, paddingBottom: 90, paddingTop: Platform.select({ ios: 50, android: 30, default: 40 }), backgroundColor: '#F5F5F7' }}>
            <View style={{paddingHorizontal: 20 }}>
                <Image source={require('../assets/icons/reseller-upsized.webp')} style={{width: 200, resizeMode: 'contain'}}/>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 40, width: 300, textAlign: 'center', fontFamily: "Inter", fontWeight: "bold", color: '#1B4C71', marginBottom: 30}}>Welcome to Apple Reseller!</Text>
                <Image source={require('../assets/banners/home-banner.png')}/>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', padding: 20, paddingBottom: 7, borderColor: 'black' }}>
                <Text style={{ flex: 5, fontSize: 21, fontWeight: 'bold', fontFamily: 'Inter' }}>Tin tức Apple</Text>
            </View>
            <FlatList
                data={news} horizontal
                renderItem={({ item, index }) => (
                    <View style={{
                        marginLeft: index === 0 ? 0 : 10,
                        marginRight: index === news.length - 1 ? 0 : 10,
                    }}>
                        <NewsPreview title={item.title} image={item.image} description={item.description} />
                    </View>
                )}
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
            />
            <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 20, paddingBottom: 7, paddingTop: 7, borderColor: 'black' }}>
                <Text style={{ flex: 5, fontSize: 21, fontWeight: 'bold', fontFamily: 'Inter' }}>Hoạt động gần đây của bạn</Text>
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