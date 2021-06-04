/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigationContainer from '../utilities/router';
import configureStore from '../redux/store';

const {store, persistor} = configureStore({});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigationContainer />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
