import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../pages/Vi/ProductScreen";
import HomeScreen from "../pages/HomeScreen";


const HomeStack = createStackNavigator();
const Home = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='HomeScreen' component={HomeScreen}/>
            <HomeStack.Screen name='ProductScreen' component={ProductScreen}/>
        </HomeStack.Navigator>
    )
}

export default Home;