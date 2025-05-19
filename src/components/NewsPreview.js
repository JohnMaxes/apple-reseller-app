import { View, Text, Dimensions, ImageBackground } from "react-native";
import { StyleSheet } from 'react-native';
const width = Dimensions.get('window').width * 0.7;
const NewsPreview = ({ title, image, description }) => {
    return (
        <View style={{width: width, height: width, marginBottom: 5, }}>
            <View style={styles.card}>
                <ImageBackground
                    source={require('../assets/banners/apple-intelligence.png')}
                    resizeMode="cover"
                    style={styles.imageContainer}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                    <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{description}</Text>
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    card: {
        width: width,
        height: width,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        overflow: 'hidden'
    },
    imageContainer: {
        flex: 4.5,
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    titleContainer: {
        flex: 2,
        height: 70, 
        justifyContent: 'center', 
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    }
})


export default NewsPreview;