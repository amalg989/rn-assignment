import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import LoginPage from '../../components/login';
import HomeScreen from '../../components/home';
import ProfileScreen from '../../components/profile';
import ExpertsScreen from '../../components/explorer/experts';
import ServicesScreen from '../../components/explorer/services';

import {NAVIGATION} from '../constants';
import {Header} from 'react-native-elements';
import {Alert, Text} from 'react-native';

export const INITIAL_PAGE = NAVIGATION.LOGIN;

const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen(props: any) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => null,
          headerTitle: () => (
            <Header
              containerStyle={{marginHorizontal: -20, marginBottom: 20}}
              leftComponent={{
                icon: 'menu',
                color: '#fff',
                onPress: () => Alert.alert(JSON.stringify(props)),
              }}
              centerComponent={{text: 'Home'}}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Settings"
        component={TabExplore}
        options={{
          headerLeft: () => null,
          headerTitle: props => (
            <Header
              containerStyle={{marginHorizontal: -20, marginBottom: 20}}
              leftComponent={{
                icon: 'menu',
                color: '#fff',
                onPress: () => Alert.alert(JSON.stringify(props)),
              }}
              centerComponent={{text: 'Explore'}}
            />
          ),
        }}
      />
    </ExploreStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={NAVIGATION.HOME.PROFILE}
        component={ProfileScreen}
        options={{
          headerLeft: () => null,
          headerTitle: props => (
            <Header
              containerStyle={{marginHorizontal: -20, marginBottom: 20}}
              leftComponent={{
                icon: 'menu',
                color: '#fff',
                onPress: () => Alert.alert(JSON.stringify(props)),
              }}
              centerComponent={{text: 'Profile'}}
            />
          ),
        }}
      />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TabHome = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Explore" component={ExploreStackScreen} />
    <Tab.Screen name="Profile" component={ProfileStackScreen} />
  </Tab.Navigator>
);

const TabExplore = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Experts" component={ExpertsScreen} />
    <TopTab.Screen name="Services" component={ServicesScreen} />
  </TopTab.Navigator>
);

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        RN Assignment
      </Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() =>
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: NAVIGATION.LOGIN}],
            }),
          )
        }
      />
    </DrawerContentScrollView>
  );
};

const DrawerHome = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabHome} />
  </Drawer.Navigator>
);

export const Screens: any = {
  LOGIN: {
    name: NAVIGATION.LOGIN,
    component: LoginPage,
    options: {
      headerTitle: () => null,
      headerShown: false,
    },
  },
  HOME_MAIN: {
    name: NAVIGATION.HOME.MAIN,
    component: DrawerHome,
    options: {
      headerTitle: () => null,
      headerShown: false,
    },
  },
};
