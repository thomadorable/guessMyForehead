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
import TicTacToeScreen from '../screens/TicTacToeScreen';
import GamesScreen from '../screens/GamesScreen';

import Header from '../components/Header'
import Colors from '../constants/Colors';

const GamesStack = createStackNavigator({
    Games: {
        screen: GamesScreen,
    },
    Memory: {
        screen: MemoryScreen,
    },
    Pendu: {
        screen: HangmanScreen,
    },
    Guess: {
        screen: ThemeForeheadScreen
    },
    Snake: {
        screen: SnakeScreen
    },
    Quizz: {
        screen: QuizzScreen
    },
    Z048: {
        screen: Z048Screen
    },
    TicTacToe: {
        screen: TicTacToeScreen
    }
});

GamesStack.navigationOptions = {
    tabBarLabel: 'Jeux',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
        />
    )
};

const OptionsStack = createStackNavigator({
    Options: {
        screen: OptionsScreen,
    }
});

OptionsStack.navigationOptions = {
    tabBarLabel: 'Options',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
        />
    )
};

OptionsStack.navigationOptions = {
    tabBarLabel: 'Profil',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
        />
    )
};


const TabNav = createBottomTabNavigator({
    GamesStack,
    OptionsStack
}, {
    tabBarOptions: {
        activeTintColor: Colors.tabIconSelected
    }
});


export default createStackNavigator({
    Root: {
      screen: TabNav,
      navigationOptions: {
            header: props => <Header {...props} />,
        }
    },
});
