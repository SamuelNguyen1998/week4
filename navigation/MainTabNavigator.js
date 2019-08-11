import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,
        createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CompleteScreen from '../screens/CompleteScreen';
import AllScreen from '../screens/AllScreen';
import ActiveScreen from '../screens/ActiveScreen';
import SingleTodoScreen from '../screens/SingleTodoScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name= 'md-checkbox-outline'
    />
  )
};

CompleteStack.path = '';

const AllStatck = createStackNavigator(
  {
    All: AllScreen,
    SingleTodo: SingleTodoScreen
  },
  config
);

AllStatck.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='md-list' />
  ),
};

AllStatck.path = '';

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon focused={focused} name='md-options' color={tintColor} />
  ),
};

ActiveStack.path = '';

const tabNavigator = createMaterialTopTabNavigator({
  CompleteStack,
  AllStatck,
  ActiveStack,
},
{
  initialRouteName: "AllStatck",
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    shifting: true,
    showIcon: true,
    activeTintColor: '#00bbff',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'white',
    },
    labelStyle: {
      fontWeight: 'bold'
    } 
  },
  
}
);

tabNavigator.path = '';

export default tabNavigator;
