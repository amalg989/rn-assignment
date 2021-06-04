import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Screens, INITIAL_PAGE} from './screens';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName={INITIAL_PAGE}
        screenOptions={{gestureEnabled: false}}>
        {Screens &&
          Object.keys(Screens).map(screen => (
            <Stack.Screen
              key={screen}
              name={Screens[screen].name}
              component={Screens[screen].component}
              options={Screens[screen].options}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
