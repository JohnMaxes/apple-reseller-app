import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckoutFinalScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <View style={styles.iconBackground}>
                <Icon name="checkmark" size={50} color="#007bff" />
                </View>
            </View>
            <Text style={styles.text}>Đặt hàng{'\n'}thành công</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomTab', { screen: 'Home', params: { screen: 'HomeScreen' } }) }>
                <Text style={styles.buttonText}>Về trang chủ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: '#d6ebff',
    padding: 25,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#007bff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutFinalScreen;
