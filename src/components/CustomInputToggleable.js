import { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInputToggleable = ({ placeholder, placeholderTextColor, secureTextEntry, iconName, onChangeText, value, keyboardType, minLength, maxLength }) => {
    const [isVisible, setVisible] = useState(true);
    secureTextEntry = isVisible;
    const toggle = () => setVisible((prev) => !prev);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.inputContainer}>
                {iconName ? <Icon name={iconName} size={20} color="black" style={styles.inputIcon}/> : null }
                <TextInput
                    style={{ flex: 1, fontFamily:'Inter-Regular' }}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />
                <TouchableOpacity onPress={toggle}>
                    <Icon name={ isVisible ? 'eye-off-outline' : 'eye-outline' } size={20} color="gray" style={{marginRight: 20}}/>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: 60,
        borderRadius: 15,
        marginHorizontal: "5%",
        marginVertical: 10,
        paddingLeft: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
});

export default CustomInputToggleable;