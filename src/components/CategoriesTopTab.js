import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoriesTopTab = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
            options.tabBarLabel !== undefined ? options.tabBarLabel : 
            options.title !== undefined ? options.title: route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
            <TouchableOpacity key={route.key} onPress={onPress} style={[ styles.tab, isFocused && styles.tabFocused ]}>
                <Text style={[styles.text, isFocused && styles.textFocused]}>{label}</Text>
            </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 25,
    },
    tab: {
        flex: 1,
        paddingVertical: 7,
        margin: 3,
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: 'transparent',
    },
    tabFocused: {
        backgroundColor: '#007AFF',
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    textFocused: {
        color: 'white',
    },
});

export default CategoriesTopTab;
