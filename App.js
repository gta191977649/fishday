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
import CollectionScreen from "./src/screen/CollectionScreen"
import LootScreen from "./src/screen/LootScreen"
//Redux
import { Provider,connect } from 'react-redux';
import { createStore,combineReducers } from 'redux';
import { AppReducer } from "./src/reducer/Reducer"


const initialState = {
  collecitons: [],
  test: "Redux Test",
}


const reducer = (state = initialState,action)=> {
  switch(action.type) {
    case "ADD_COLLECTION": {
      return { ...state, collecitons:[...state.collecitons,action.payload] }
    }
  }
  return state
}
const store = createStore(reducer)

const mapStateToProps = (state) => {
  return {
    collections: state.collecitons,
    test: state.test,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    addCollection : (fish) => dispatch({
      type:"ADD_COLLECTION",
      payload:fish
    })
  }
}

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
  const Home = connect(mapStateToProps,mapDispatchToProps)(HomeScreen)
  const Collection  = connect(mapStateToProps,mapDispatchToProps)(CollectionScreen)
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
      return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Exit" onPress={() => props.navigation.navigate("Login")} />
      </DrawerContentScrollView>
      )
      }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Collection" component={Collection} />
        
      </Drawer.Navigator>
  )
}
 


const App = function App() {
  const Timer = connect(mapStateToProps,mapDispatchToProps)(TimerScreen)
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={DraweContainer}/>
      <Stack.Screen name="TimerScreen" component={Timer} />
      <Stack.Screen name="LootScreen" component={LootScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App