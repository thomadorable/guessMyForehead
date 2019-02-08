import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ThemeForeheadScreen from '../screens/ThemeForeheadScreen';
import HangmanScreen from '../screens/HangmanScreen';
import SnakeScreen from '../screens/SnakeScreen';
import MemoryScreen from '../screens/MemoryScreen';
import QuizzScreen from '../screens/QuizzScreen';
import OptionsScreen from '../screens/OptionsScreen';
import Z048Screen from '../screens/Z048Screen';

import Header from '../components/Header'
import Colors from '../constants/Colors';

const ForeheadStack = createStackNavigator({
    Home: ThemeForeheadScreen
});

ForeheadStack.navigationOptions = {
    tabBarLabel: 'Guess',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
        />
    ),
};

const HangmanStack = createStackNavigator({
    Links: HangmanScreen,
});

HangmanStack.navigationOptions = {
    tabBarLabel: 'Pendu',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-man' : 'md-man'}
        />
    ),
};

const SnakeStack = createStackNavigator({
    Snake: SnakeScreen,
});

SnakeStack.navigationOptions = {
    tabBarLabel: 'Snake',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-paw' : 'md-paw'}
        />
    ),
};

const MemoryStack = createStackNavigator({
    Memory: MemoryScreen,
});

MemoryStack.navigationOptions = {
    tabBarLabel: 'Memory',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-card' : 'md-card'}
        />
    )
};

const QuizzStack = createStackNavigator({
    Quizz: {
        screen: QuizzScreen,
    }
});

QuizzStack.navigationOptions = {
    tabBarLabel: 'Quizz',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-help' : 'md-help'}
        />
    )
};

const Z048Stack = createStackNavigator({
    Z049: {
        screen: Z048Screen,
    }
});

Z048Stack.navigationOptions = {
    tabBarLabel: '2048',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-infinite' : 'md-infinite'}
        />
    )
};

var TabNav = createBottomTabNavigator({
    Z048Stack,
    SnakeStack,
    ForeheadStack,
    HangmanStack,
    MemoryStack,
    QuizzStack,
}, {
    tabBarOptions: {
        activeTintColor: Colors.tabIconSelected
    }
});


const StacksOverTabs = createStackNavigator({
    Root: {
      screen: TabNav,
      navigationOptions: {
        header: props => <Header {...props} />,
    }
    },
    Settings: {
        screen: OptionsScreen,
        navigationOptions: {
            title: 'Notifications',
            header: props => <Header {...props} hideOptions={true} />,
        },
    },
  });
  
  export default StacksOverTabs;