import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  iconUri,
  onChangeText,
  value,
  keyboardType,
  minLength,
  maxLength,
  showToggleEye,
  style
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry || false);

  return (
    <View style={[styles.inputContainer, { backgroundColor: "#F7F4F4", borderRadius: 30, borderWidth: 1, padding: 15}, style]}>
      {iconUri && (
        <Icon
          name={iconUri}
          size={20}
          color="grey"
          style={styles.inputIcon}
        />
      )}
      <TextInput
        style={{ flex: 1, fontFamily: 'Inter-Regular' }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={hidePassword}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {showToggleEye && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="grey"
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
});

export default CustomInput;