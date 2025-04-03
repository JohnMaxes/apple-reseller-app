import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../styles";

const ProductScreen = ({route}) => {
    const {title, image, description, price, rating, ratingCount} = route.params;
    return (
        <ScrollView contentContainerStyle={[styles.screen, {paddingLeft: 20, paddingRight: 20}]}>
            <Image style={{width: '100%', height: 450}} source={{uri: image}}/>
            <Text numberOfLines={3} style={{fontSize: 25}}>{title}</Text>
            <Text style={{fontSize: 20, color:'red', fontWeight:'bold'}}>{price} $</Text>
            <Text style={{fontSize: 20}}>{rating}⭐{'(' + ratingCount + ')'}</Text>
            <Text style={{fontSize: 17}}>{description}</Text>
        </ScrollView>
    )
}

export default ProductScreen;