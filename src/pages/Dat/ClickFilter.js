import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

const FilterScreen = ({ navigation }) => {
    const [selectedFilters, setSelectedFilters] = useState({
        price: [],
        memory: [],
        release: []
    });

    const priceOptions = ["2 - 4 Triệu", "4 - 10 Triệu", "10 - 16 Triệu", "Trên 20 Triệu"];
    const memoryOptions = ["128GB", "256GB", "512GB", "1T"];
    const releaseOptions = ["Mới nhất trước", "Cũ nhất trước", "Ra mắt năm 2025", "Ra mắt từ 2025 về trước"];

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
            {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-back" size={24} color="#000" />
            </TouchableOpacity> */}
            <Text style={styles.header}>LỌC</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 30
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
        marginBottom:0,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 15,
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

export default FilterScreen;