import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/navigation/BottomNavigation';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import {configureReanimatedLogger,ReanimatedLogLevel} from 'react-native-reanimated';
import Authentication from './src/navigation/Authentication';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <CartProvider>
                    <MainContent/>
                </CartProvider>
            </AuthProvider>
        </NavigationContainer>
    );
};

const MainStack = createStackNavigator();
const MainContent = () => {    
    return (
        <MainStack.Navigator initialRouteName='BottomTab' screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='BottomTab' component={BottomTabNavigation}/>
            <MainStack.Screen name='Authentication' component={Authentication} options={{ presentation: 'modal' }}/>
        </MainStack.Navigator>
    );
};
export default App;