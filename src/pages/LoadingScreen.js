import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native";

const LoadingScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Loading</Text>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default LoadingScreen;
