import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../pages/ProductScreen";
import CategoriesScreen from "../pages/CategoriesScreen";

const CategoriesStack = createStackNavigator();
const Categories = () => {
    return (
        <CategoriesStack.Navigator initialRouteName="CategoriesScreen">
            <CategoriesStack.Screen name='CategoriesScreen' component={CategoriesScreen} options={{headerTitle: ''}}/>
            <CategoriesStack.Screen name='ProductScreen' component={ProductScreen}/>
        </CategoriesStack.Navigator>
    )
}

export default Categories;