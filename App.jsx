import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountriesName from './src/components/CountriesName';
import { ApolloProvider } from '@apollo/client';
import client from './src/components/appollo';
import CountriesInformation from './src/components/CountriesInformation';




const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>

      <NavigationContainer >
        <Stack.Navigator initialRouteName='CountriesName' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="CountriesName" component={CountriesName} />
          <Stack.Screen name='CountriesInformation' component={CountriesInformation} />

        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;