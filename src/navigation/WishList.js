import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WishListScreen from '../pages/Vi/WishListScreen'

const Stack = createStackNavigator();

const WishListStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WishList"
      component={WishListScreen}
      options={{ title: 'Danh sách yêu thích', headerShown: true }}
    />
  </Stack.Navigator>
);

export default WishListStack;