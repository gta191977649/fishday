import React from 'react';
import moment from 'moment'; 

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
import FishDetail from "./src/screen/FishDetail"
import History from "./src/screen/History"
//Redux
import { Provider,connect } from 'react-redux';
import { createStore,combineReducers } from 'redux';
import { AppReducer } from "./src/reducer/Reducer"


const initialState = {
  collecitons: [],
  player:{
    level: 1,
    exp: 0.0,
    cost: 0,
  },
  records:{
    focus: [
      {time: 10,success:true,type:"Study",own: 5,date:"1/2/2021"},
      
    ]
  },
  test: "Redux Test",
}

const reducer = (state = initialState,action)=> {
  function calcCost(collection) {
    let cost = 0
    for(let i = 0; i < collection.length; i++) {
      if(collection[i].qty > 1) {
        cost += collection[i].cost * collection[i].qty-1
      }
      
    }
    return cost
  }
  switch(action.type) {
    case "ADD_COLLECTION": {
      let newFish = { 
        "name":action.payload.name,
        "cost":action.payload.cost,
        "rear":"Default",
        "type":"normal fish",
        "qty": 1,
        "time": moment().format("DD/MM/YYYY")
      }
      //check if fish exist
      for(let i = 0; i < state.collecitons.length; i++) {
        if(state.collecitons[i].name == action.payload.name) {
          state.collecitons[i].qty += 1
          state.player.cost = calcCost(state.collecitons)
          return state
        }
      }
      
      state.player.cost = calcCost(state.collecitons)
      return { ...state, collecitons:[...state.collecitons,newFish] }
    }
    case "ADD_EXP":{
      if(state.player.exp + action.payload >= 100) {
        state.player.exp = 0 
        state.player.level += 1
      } else {
        state.player.exp += action.payload
      }
      return state
    }
    case "ADD_RECORD":{
      state.records.focus.push(action.payload)
      return state
    }
  }
  return state
}
const store = createStore(reducer)

const mapStateToProps = (state) => {
  return {
    collections: state.collecitons,
    test: state.test,
    player: state.player,
    focus: state.records.focus
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    addCollection : (fish) => dispatch({
      type:"ADD_COLLECTION",
      payload:fish
    }),
    addExp : (rate) => dispatch({
      type: "ADD_EXP",
      payload: rate,
    }),
    addRecord:(record) => dispatch({
      type:"ADD_RECORD",
      payload:record
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
  const Historycal = connect(mapStateToProps,mapDispatchToProps)(History)
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
        <Drawer.Screen name="History" component={Historycal} />
        
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
      <Stack.Screen name="FishDetail" component={FishDetail} />
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App