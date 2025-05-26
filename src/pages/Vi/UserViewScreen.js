import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, Button, TouchableOpacity, Platform, ScrollView } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../context/AuthContext";
import { StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";

const UserViewScreen = ({navigation}) => {
    const { loggedIn, id, logOut, setUserInfo, userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function initUser() {
            try {
                const response = await axios.get('https://fakestoreapi.com/users/' + id);
                setUserInfo(response.data);
                setLoading(false);
            }
            catch (error) { console.log('Error getting user info: ' + error) }
        }
        initUser()
    }, []);
    const handleUserEdit = () => navigation.navigate('UserEdit');
    const handleLogout = () => { navigation.navigate('Home'); logOut() }
    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
    return (
        <ScrollView style={{paddingTop: Platform.select({ ios: 50, android: 30, default: 40 })}}>
            <View style={styles.topBackground}></View>
            <View style={[ {flexDirection:'column', marginBottom: 10, alignItems:'center'}]}>
                <Image source={{uri: 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466'}}
                style={{height: 100, width: 100, borderRadius: 50, marginTop: 130}}/>
                <Text style={{fontWeight:'bold', fontSize: 25, paddingLeft: 10}}>{userInfo.name.firstname + ' ' + userInfo.name.lastname}</Text>
            </View>
            
            <TouchableOpacity style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 20}]} onPress={handleUserEdit}>
                <Icon name='person-outline' color='black' size={25} />
                <Text style={{fontWeight:'medium', fontSize: 18, flex: 1}}>Thông tin cá nhân</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 20}]}>
                <Icon name='settings-outline' color='black' size={26} />
                <Text style={{fontWeight:'medium', fontSize: 18, flex: 1}}>Cài đặt</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 20}]}>
                <Icon name='bookmark-outline' color='black' size={26} />
                <Text style={{fontWeight:'medium', fontSize: 18, flex:1}}>Đã lưu</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 20}]}>
                <Icon name='help-circle-outline' color='black' size={26} />
                <Text style={{fontWeight:'medium', fontSize: 18, flex:1}}>Hỗ trợ</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 20}]}>
                <Icon name='shield-outline' color='black' size={26} />
                <Text style={{fontWeight:'medium', fontSize: 18, flex:1}}>Chính sách</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style = {[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 20}]}>
                <Icon name="log-out-outline" color='black' size={25} />
                <Text style={{color: '#FF0000', fontWeight:'medium', fontSize: 18}} onPress={handleLogout}>Đăng xuất</Text> 
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
    UserRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
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
export default UserViewScreen;