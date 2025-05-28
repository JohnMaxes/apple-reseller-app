import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const ProductFilterScreen = ({ navigation }) => {
    const [selectedFilters, setSelectedFilters] = useState({
        price: [],
        memory: [],
        release: []
    });

    const priceOptions = ["2 - 4 Triệu", "4 - 10 Triệu", "10 - 16 Triệu", "Trên 20 Triệu"];
    const memoryOptions = ["128GB", "256GB", "512GB", "1T"];
    const releaseOptions = ["Mới nhất trước", "Cũ nhất trước", "Ra mắt năm 2025", "Ra mắt từ 2025 về trước"];
    const goBack = () => navigation.goBack();
    const resetFilters = () => {
        setSelectedFilters({
            price: [],
            memory: [],
            release: []
        });
    };

    const toggleFilter = (category, option) => {
        setSelectedFilters((prev) => {
            const newSelection = prev[category].includes(option)
                ? prev[category].filter(item => item !== option)
                : [...prev[category], option];
            return {
                ...prev,
                [category]: newSelection
            };
        });
    };

    const renderOptions = (title, category, options) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {options.map(option => (
                <TouchableOpacity 
                    key={option} 
                    style={styles.optionContainer} 
                    onPress={() => toggleFilter(category, option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                    <Checkbox
                        status={selectedFilters[category].includes(option) ? 'checked' : 'unchecked'}
                        onPress={() => toggleFilter(category, option)}
                        color="#007bff"
                        uncheckedColor="#ccc"
                        style={styles.checkbox}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                        <View style={styles.backIconWrapper}>
                            <Icon name="chevron-back" size={22} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ fontSize: 25, fontFamily: 'Inter', fontWeight: "bold", textAlign: "center"}}>LỌC</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                <Text style={styles.resetText}>Đặt lại</Text>
            </TouchableOpacity>
            {renderOptions("Sắp xếp theo giá", "price", priceOptions)}
            {renderOptions("Sắp xếp theo bộ nhớ", "memory", memoryOptions)}
            {renderOptions("Sắp thêm theo thời gian ra mắt", "release", releaseOptions)}
            <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyText}>Áp dụng</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProductFilterScreen;

const styles = StyleSheet.create({
    backIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 20,
        paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }),
        paddingHorizontal: 20
    },
    backButton: {
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    resetButton: {
        alignSelf: 'flex-start',
        marginBottom: 5
    },
    resetText: {
        color: '#007bff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    section: {
        marginBottom: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
    },
    optionText: {
        flex: 1,
        fontSize: 15,
    },
    checkbox: {
        width: 25,
        height: 25,
    },
    applyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 5,
        borderRadius: 30,
        alignItems: 'center',
        width: '30%',
        alignSelf: 'center',
    },
    applyText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});