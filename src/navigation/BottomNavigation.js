import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Categories from './Categories';
import Cart from './Cart';

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import LoadingScreen from '../pages/LoadingScreen';
import Profile from './Profile';
import CheckoutScreen from '../pages/CheckoutScreen';
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
const BottomTabNavigation = () => {
    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'), 
    });
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
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="cart-outline" focused={focused} />,
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
            <BottomTab.Screen 
                name='Test' 
                component={Test} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="cart-outline" focused={focused} />,
                    headerShown: false,
                }} 
            />
        </BottomTab.Navigator>
    )
}

const Test = () => {
  return(<CheckoutScreen></CheckoutScreen>)
}

export default BottomTabNavigation;
