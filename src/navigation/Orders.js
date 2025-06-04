import { createStackNavigator } from "@react-navigation/stack";
import OrdersScreen from "../pages/OrdersScreen";
import OrderDetailScreen from "../pages/OrderDetailScreen";

const OrdersStack = createStackNavigator();
const Orders = () => {
    return (
        <OrdersStack.Navigator initialRouteName="OrdersScreen" screenOptions={{headerShown: false}}>
            <OrdersStack.Screen name="OrdersScreen" component={OrdersScreen}/>
            <OrdersStack.Screen name="OrderDetailsScreen" component={OrderDetailScreen}/>
        </OrdersStack.Navigator>
    )
}

export default Orders;