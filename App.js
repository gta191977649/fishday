import React from 'react';
import { Button, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Activites

import HomeScreen from "./src/screen/HomeScreen"



function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={navigation.openDrawer}
        title="Open navigation drawer"
      />
      <Button
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
      return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Exit" onPress={() => props.navigation.navigate("Login")} />
      </DrawerContentScrollView>
      )
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}