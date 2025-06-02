import { useContext } from "react";
import { View, Text, Image, TouchableOpacity, Platform, ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../context/AuthContext";

const UserViewScreen = ({navigation}) => {
    const { logOut, userInfo } = useContext(AuthContext);

    // Kiểm tra userInfo có tồn tại không
    if (!userInfo) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Không có thông tin người dùng.</Text>
            </View>
        );
    }

    // Lấy thông tin từ userInfo
    const avatar = userInfo.avatar || 'https://images.immediate.co.uk/production/volatile/sites/3/2022/07/val-kilmer-batman-forever-cb74c7d.jpg?quality=90&fit=700,466';
    const fullName = userInfo.fullName || '';
    const email = userInfo.email || '';
    const phone = userInfo.phone || '';

    const handleUserEdit = () => navigation.navigate('UserEdit');
    const handleLogout = () => { navigation.navigate('Home'); logOut(); }

    return (
        <ScrollView style={{ paddingTop: Platform.select({ ios: 50, android: 30, default: 40 }) }}>
            <View style={styles.topBackground}/>
            <View style={{flexDirection:'column', marginBottom: 20, alignItems:'center'}}>
                <Image source={{uri: avatar}}
                    style={{height: 100, width: 100, borderRadius: 50, marginTop: 130}}/>
                <Text style={{fontWeight:'bold', fontSize: 25, paddingLeft: 10, marginTop: 10}}>{fullName}</Text>
                <Text style={{fontSize: 16, color: 'gray', marginTop: 4}}>{email}</Text>
                {phone ? <Text style={{fontSize: 16, color: 'gray', marginTop: 2}}>{phone}</Text> : null}
            </View>
            <TouchableOpacity style={[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 30}]} onPress={handleUserEdit}>
                <Icon name='person-outline' color='black' size={25} />
                <Text style={{fontWeight:'500', fontSize: 18, flex: 1}}>Thông tin cá nhân</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 30}]}>
                <Icon name='settings-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex: 1}}>Cài đặt</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 30}]}>
                <Icon name='bookmark-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex:1}}>Đã lưu</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 30}]}>
                <Icon name='help-circle-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex:1}}>Hỗ trợ</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 30}]}>
                <Icon name='shield-outline' color='black' size={26} />
                <Text style={{fontWeight:'500', fontSize: 18, flex:1}}>Chính sách</Text>
                <Icon name='chevron-forward-outline' color='black' size={20}/>
            </View>
            <View style={styles.divider} />
            <View style={[styles.UserRow, {flexDirection:'row', alignItems:'center', marginBottom: 10, gap: 10, paddingHorizontal: 30}]}>
                <Icon name="log-out-outline" color='black' size={25} />
                <Text style={{color: '#FF0000', fontWeight:'500', fontSize: 18}} onPress={handleLogout}>Đăng xuất</Text> 
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