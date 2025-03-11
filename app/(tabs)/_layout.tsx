import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../../global.css"
import CartItemContext from '../helper/CartItemContext';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  type cart = {
    id:number,
    title:string,
    price:number,
    image:string,
    quantity:number
  }
  const colorScheme = useColorScheme();

  const [cartItem,setCartItem] = useState<cart[]>([])

  return (
    <CartItemContext.Provider value={{cartItem,setCartItem}}>
        <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name='cartitem'
          options={{
            title:"Cart",
            tabBarIcon: ({color}) => <FontAwesome name='shopping-cart' size={23} color={color}/>
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title:"Profile",
            tabBarIcon: ({color}) => <FontAwesome name='user-circle-o' size={23} color={color}/>
          }}
        />
      </Tabs>
    </CartItemContext.Provider>
    
  );
}
