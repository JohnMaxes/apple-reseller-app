import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Categories from './Categories';
import Cart from './Cart';

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import LoadingScreen from '../pages/LoadingScreen';
import Profile from './Profile';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const BottomTab = createBottomTabNavigator();
const CustomTabIcon = ({ name, focused }) => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center"}}>
            {focused && (
                <View style={{
                    position: "absolute",
                    width: 55,
                    height: 55,
                    backgroundColor: "#0073FF",
                    borderRadius: 55/2,
                    alignItems: "center",
                    justifyContent: "center",
                }} />
            )}
            <Icon name={name} color={focused ? "white" : "black"} size={26} style={{ position: "absolute" }} />
        </View>
    );
};

const CustomTabIconWithIndicator = ({ name, focused, quantity }) => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            {focused && (
                <View style={{
                    position: "absolute",
                    width: 55,
                    height: 55,
                    backgroundColor: "#0073FF",
                    borderRadius: 55 / 2,
                    alignItems: "center",
                    justifyContent: "center",
                }} />
            )}
            <Icon
                name={name}
                color={focused ? "white" : "black"}
                size={26}
                style={{ position: "absolute" }}
            />
            {typeof quantity === 'number' && quantity > 0 && (
                <View
                    style={{
                        position: "absolute",
                        left: 2.5,
                        bottom: 2.5,
                        minWidth: 16,
                        height: 16,
                        backgroundColor: "#FF3B30",
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 5,
                        zIndex: 2,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 10 }}>
                        {quantity}
                    </Text>
                </View>
            )}
        </View>
    );
};

const BottomTabNavigation = () => {
    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'), 
    });
    const { cart } = useContext(CartContext)
    const cart_count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    if(!fontsLoaded) return <LoadingScreen/>
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    paddingHorizontal: '10%',
                    paddingTop: 20,
                    position: 'absolute'
                },
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        activeOpacity={1}
                    />
                ),
                tabBarShowLabel: false,
                headerShown: false,
                animation: 'shift',
                tabBarHideOnKeyboard: true,
            }}
        >
            <BottomTab.Screen 
                name='Home' 
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="home-outline" focused={focused}/>,
                    headerShown: false,
                }} 
            />
            <BottomTab.Screen 
                name='Categories' 
                component={Categories} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="phone-portrait-outline" focused={focused} />,
                }} 
            />
            <BottomTab.Screen 
                name='Cart' 
                component={Cart} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIconWithIndicator name="cart-outline" focused={focused} quantity={cart_count} />,
                }} 
            />
            <BottomTab.Screen 
                name='User' 
                component={Profile} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="person-circle-outline" focused={focused} />,
                    headerShown: false,
                }} 
            />
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigation;
