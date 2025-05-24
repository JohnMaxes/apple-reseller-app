import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, Button, TouchableOpacity, Platform } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../context/AuthContext";

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
        <View style={{paddingTop: Platform.select({ ios: 50, android: 30, default: 40 }), paddingHorizontal: 20}}>
            <View style={{flexDirection:'row', marginBottom: 10, alignItems:'center'}}>
                <Image source={{uri: 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466'}}
                style={{height: 100, width: 100, borderRadius: 50}}/>
                <Text style={{fontWeight:'bold', fontSize: 25, paddingLeft: 10}}>{userInfo.name.firstname + ' ' + userInfo.name.lastname}</Text>
                <TouchableOpacity style={{marginLeft: '15%'}} onPress={handleUserEdit}>
                    <Icon name='create-outline' color='black' size={40}/>
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Name:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.name.firstname + ' ' + userInfo.name.lastname}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Username:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.username}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Email:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.email}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Phone:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>{userInfo.phone}</Text>
            <Text style={{fontWeight:'bold', fontSize: 18}}>Address:</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>
                {userInfo.address.number + ', ' + userInfo.address.street + ', ' + userInfo.address.city}
            </Text>
            <Button title='Log out' onPress={handleLogout}/>
        </View>
    )
}

export default UserViewScreen;