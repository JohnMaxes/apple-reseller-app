import { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../context/AuthContext";

const ProfileScreen = ({navigation}) => {
    const { logOut, userInfo } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    if (!userInfo) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Không có thông tin người dùng.</Text>
        </View>
    );
    
    const avatar = userInfo.avatar || 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466';
    const fullName = userInfo.fullName || '';

    const handleProfileEdit = () => navigation.navigate('ProfileEdit');
    const handleWishlist = () => navigation.navigate('WishlistScreen');
    const handleOrders = () => navigation.navigate('Orders');
    const handleLogout = () => { navigation.navigate('Home'); logOut() }
    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
    return (
        <ScrollView>
            <View style={styles.topBackground}/>
            <View style={[ {flexDirection:'column', marginBottom: 20, alignItems:'center'}]}>
                <Image source={{uri: avatar}}
                style={{height: 100, width: 100, borderRadius: 50, marginTop: 130}}/>
                <Text style={{fontWeight:'bold', fontSize: 25, paddingLeft: 10}}>{fullName}</Text>
            </View>
            <TouchableOpacity onPress={handleProfileEdit} style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', gap: 10, paddingHorizontal: 30}]}>
                <Icon name='person-outline' color='black' size={25} />
                <Text style={{fontWeight:'500', fontSize: 18, flex: 1}}>Thông tin cá nhân</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleOrders} style={[styles.UserRow, {flexDirection:'row', alignItems:'center', gap: 10, paddingHorizontal: 30}]}>
                <Icon name='bag-check-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex: 1}}>Đơn hàng</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleWishlist} style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', gap: 10, paddingHorizontal: 30}]}>
                <Icon name='bookmark-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex:1}}>Đã lưu</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', gap: 10, paddingHorizontal: 30}]}>
                <Icon name='help-circle-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex:1}}>Hỗ trợ</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', gap: 10, paddingHorizontal: 30}]}>
                <Icon name='shield-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex:1}}>Chính sách</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', gap: 10, paddingHorizontal: 30}]}>
                <Icon name="log-out-outline" color='black' size={25} />
                <Text style={{color: '#FF0000', fontWeight:'500', fontSize: 18}} onPress={handleLogout}>Đăng xuất</Text> 
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create ({
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 15,
    },
    UserRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    topBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#22538F',
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        height: 180,
        zIndex: -1,
    }
})