import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GuessForeheadScreen from '../screens/GuessForeheadScreen';
import LinksScreen from '../screens/HangmanScreen';
import SnakeScreen from '../screens/SnakeScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  GuessForehead: GuessForeheadScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Guess',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Hangman',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
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
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SnakeStack,
});
