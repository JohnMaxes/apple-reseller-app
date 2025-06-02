import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/navigation/BottomNavigation';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import {configureReanimatedLogger,ReanimatedLogLevel} from 'react-native-reanimated';
import Authentication from './src/navigation/Authentication';
import Checkout from './src/navigation/Checkout';
import { WishlistProvider } from './src/context/WishlistContext';
import { CheckoutProvider } from './src/context/CheckoutContext';

import Toast from 'react-native-toast-message';
import Introduction from './src/navigation/Introduction';
import { useState, useEffect } from 'react';
import LoadingScreen from './src/pages/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const App = () => {
    const [showOnboarding, setShowOnboarding] = useState(null);
    useEffect(() => {
        const checkOnboarding = async () => {
            await AsyncStorage.removeItem('hasOpenedAppBefore');
            const hasOpened = await AsyncStorage.getItem('hasOpenedAppBefore');
            setShowOnboarding(!hasOpened);
        };
        checkOnboarding();
    }, []);
    if(showOnboarding === null) return <LoadingScreen/>
    return (
        <NavigationContainer>
            <CheckoutProvider>
                <AuthProvider>
                    <CartProvider>
                        <WishlistProvider>
                            <MainContent showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />
                            <Toast />
                        </WishlistProvider>
                    </CartProvider>
                </AuthProvider>
            </CheckoutProvider>
        </NavigationContainer>
    );
};

const MainStack = createStackNavigator();
const MainContent = ({ showOnboarding, setShowOnboarding }) => {
    return (
        <MainStack.Navigator
            initialRouteName={showOnboarding ? 'Introduction' : 'BottomTab'}
            screenOptions={{ headerShown: false }}
        >
            <MainStack.Screen name='Introduction'>
                {props => (
                    <Introduction
                        {...props}
                        onDone={async () => {
                            await AsyncStorage.setItem('hasOpenedAppBefore', 'true');
                            setShowOnboarding(false);
                            props.navigation.replace('BottomTab');
                        }}
                    />
                )}
            </MainStack.Screen>
            <MainStack.Screen name='BottomTab' component={BottomTabNavigation} />
            <MainStack.Screen name='Authentication' component={Authentication} options={{ presentation: 'modal' }} />
            <MainStack.Screen name='Checkout' component={Checkout} options={{ presentation: 'modal' }} />
        </MainStack.Navigator>
    );
};
export default App;