import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({ placeholder, placeholderTextColor, secureTextEntry, iconName, onChangeText, value, keyboardType, minLength, maxLength }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.inputContainer}>
        {iconName && (
          <Icon name={iconName} size={20} color="black" style={styles.inputIcon}/>
        )}
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

export default CustomInput;