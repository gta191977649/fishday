import React from 'react';
import { Button, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Activites
import HomeScreen from "./src/screen/HomeScreen"
import TimerScreen from "./src/screen/TimerScreen"


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
const Stack = createStackNavigator();

function DraweContainer () {
  return (
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
  )
}
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator headerMode="none">
       <Stack.Screen name="Main" component={DraweContainer}/>
       <Stack.Screen name="TimerScreen" component={TimerScreen} />

     </Stack.Navigator>
      
    </NavigationContainer>
  );
}