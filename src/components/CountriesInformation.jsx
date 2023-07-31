import {
    StyleSheet, Text, View,
} from 'react-native'
import React from 'react'
import { GET_COUNTRIES } from './schema'

import { useLazyQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';

const CountriesInformation = () => {
    const [getCountryName, { loading, error, data }] = useLazyQuery(GET_COUNTRIES);

    const route = useRoute();
    const { name, capital, currency, phone, languages, continent } = route.params;

    React.useEffect(() => {
        getCountryName();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    if (!data) {
        return <Text>No data found</Text>;
    }

    const languageNames = languages.map((language) => language.name).join(', ');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Country Detail</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Capital:</Text>
                <Text style={styles.value}>{capital}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Currency:</Text>
                <Text style={styles.value}>{currency}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{phone}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Languages:</Text>
                <Text style={styles.value}>{languageNames}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Continent:</Text>
                <Text style={styles.value}>{continent.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 120,
    },
    value: {
        fontSize: 16,
    },
});

export default CountriesInformation;




