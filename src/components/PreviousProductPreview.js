import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const width = Dimensions.get('window').width * 0.45;
const PreviousProductPreview = ({ id, title, image, price, navigation }) => {
  const navigateToItem = () => navigation.navigate('ProductScreen', { productName: title });
  const formatPrice = (price) => { return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') };

  return (
    <TouchableOpacity activeOpacity={1} onPress={navigateToItem}style={styles.container}>
      <View style={styles.card}>
        <View style={styles.recentlyViewed}>
            <Icon size={16} name={'eye'} color={'#4DB355'}/>  
            <Text style={{fontSize: 14, marginLeft: 5}}>Đã xem gần đây</Text>            
        </View>
        <Image source={{ uri: image }} style={styles.image}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <Text style={styles.price}>{formatPrice(price)}đ</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: 215, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center',  
        transform: [{ scale: 0.95 }], 
        marginLeft: 5, 
        marginRight: 5, 
        marginBottom: 5
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        padding: 10,
        shadowRadius: 5,
        elevation: 6,
        fontFamily: 'Inter'
    },
    image: {
        alignSelf: 'center',
        width: 110, 
        height: 130,
        resizeMode: 'contain',
        marginTop: 5,
    },
    title: {
        fontSize: 14, 
        fontWeight: 600,
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: 400,
        textAlign: 'center',
        marginTop: 5,
    },
    recentlyViewed: {
        flexDirection:'row',
        alignItems: 'center',
        marginLeft: 5
    }
});

export default PreviousProductPreview;