import {
    StyleSheet, Text, View, TextInput, Pressable, FlatList,
    ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { GET_COUNTRIES } from './schema'
import { useNavigation } from '@react-navigation/native'
import { useLazyQuery } from '@apollo/client';


const CountriesName = () => {
    const [getCountryName, { loading, error, data }] = useLazyQuery(GET_COUNTRIES);
    const [searchCountry, setSearchCountry] = useState('');
    const navigation = useNavigation()
    useEffect(() => {
        getCountryName();
    }, []);

    const renderCountry = ({ item }) => (
        <Pressable style={styles.countryContainer} onPress={() => navigation.navigate('CountriesInformation', {
            name: item.name, capital: item.capital, currency: item.currency,
            phone: item.phone, languages: item.languages, continent: item.continent,
        })}>
            <Text style={styles.countryName}>Country: {item.name}</Text>
            <Text style={styles.capital}>Capital: {item.capital}</Text>
        </Pressable>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    const filteredData = data?.countries.filter((country) =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Countries</Text>
            <TextInput
                style={styles.input}
                value={searchCountry}
                onChangeText={setSearchCountry}
                placeholder="Search Country"
                placeholderTextColor="#777"
            />

            <FlatList
                data={filteredData}
                renderItem={renderCountry}
                keyExtractor={(item) => item.name}
                ListEmptyComponent={() => (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No Data Found</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        color: '#000',
    },
    countryContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    countryName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    capital: {
        fontSize: 16,
        color: '#555',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noDataText: {
        fontSize: 18,
        color: '#555',
    },
});

export default CountriesName;
