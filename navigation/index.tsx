/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalCreatePostScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import { useContext } from 'react';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import RegisterScreen from '../screens/RegisterScreen';

import {AuthContext} from '../context/index'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {


  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>


      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  
  const {user} = useContext(AuthContext)


  return (
    <Stack.Navigator>
        
        {user ? (
          <>
          
            
          
             <Stack.Group screenOptions={{ presentation: 'modal' }}>
             <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
             <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
             <Stack.Screen name="ModalCreatePost"  component={ModalCreatePostScreen}  options={{ title: 'Tạo nhật kí'}} />    
           </Stack.Group>
              
          </>
        ):
        <>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
        }
      
   


    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator initialRouteName="Home"
      screenOptions={{
       
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor:'#53b8bb',
        tabBarInactiveTintColor:'#fff',
        tabBarItemStyle:{
          paddingBottom:6
        },
        headerShown: false,
        tabBarStyle: {borderTopStartRadius:30,borderTopEndRadius:30,minHeight:70
        ,shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
          backgroundColor:'#003638',
          overflow:'hidden',
        elevation: 5,
        },
      }}
      >
        
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // <FontAwesome name="newspaper-o" size={24} color="black" />
          title:'Trang nhật kí',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Hú',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
          <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Thống kê',
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -10, }} {...props} />;
}
