import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../pages/ProductScreen";
import CategoriesScreen from "../pages/CategoriesScreen";
import AllProductScreen from "../pages/AllProductScreen";
import AllAccessoryScreen from "../pages/AllAccessoryScreen";
import { TouchableOpacity, View, Platform, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ProductFilterScreen from "../pages/ProductFilterScreen";


const CategoriesStack = createStackNavigator();
const Categories = ({navigation}) => {
    return (
        <CategoriesStack.Navigator initialRouteName="CategoriesScreen">
            <CategoriesStack.Screen name="CategoriesScreen"component={CategoriesScreen}
                options={({ navigation }) => ({
                    header: () => (
                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }), paddingHorizontal: 10,paddingVertical: 10 }}>
                        <View style={{ flex: 1 }}/>
                        <View style={{ flex: 3 }}>
                            <Text style={{ fontSize: 25, fontFamily: 'Inter', fontWeight: "bold", textAlign: "center"}}>SẢN PHẨM</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('AllProduct')}>
                            <Icon name="search" size={25} color="black" style={{ marginRight: 20 }}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )
                })}
            />
            <CategoriesStack.Screen name='AllProduct' component={AllProductScreen} options={{headerShown: false}}/>
            <CategoriesStack.Screen name='ProductFilterScreen' component={ProductFilterScreen} options={{headerShown: false}}/>
            <CategoriesStack.Screen name='AllAccessory' component={AllAccessoryScreen} options={{headerShown: false}}/>
            <CategoriesStack.Screen name='ProductScreen' component={ProductScreen} options={{headerShown: false}}/>
        </CategoriesStack.Navigator>
    )
}

export default Categories;