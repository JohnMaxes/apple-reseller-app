import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Checkbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.touchable}>
      <View style={[styles.box, value && styles.boxChecked]}>
        {value && <View style={styles.filledBox} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    padding: 4,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledBox: {
    width: 15,
    height: 15,
    backgroundColor: '#007bff',
    borderRadius: 15 / 21 * 4,
  },
});

export default Checkbox;
