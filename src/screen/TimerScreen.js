import React, { Component } from 'react';
import moment from 'moment'; 

import { Alert,View,AppState} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import AppHeader from  "./Header"

import Config from "../../GameConfig.json"
export default class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        coutDownMins: 1,
        timer:null,
        expTimer:null,
        appState: AppState.currentState,
        status:"idle",
        time: 0,
        lootFish: [],
    };
  }
  //当时间到了，随机给玩家钓上鱼
  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  } 
  giveFish() {
    
    const fish = [
      { "name":"Fish Type 1", cost: 1 },
      { "name":"Fish Type 2", cost: 2 },
      { "name":"Fish Type 3", cost: 3 },
      { "name":"Fish Type 4", cost: 4 },
    ]

    let idx = this.randomIntFromInterval(0,3)
    console.log(idx)
    let reward = fish[idx]

    this.props.addCollection(reward)
    this.setState({ lootFish: [...this.state.lootFish,reward]})

  }
  
  componentDidMount() {
    console.log(this.props.route.params.timer )
    this.setState({coutDownMins:this.props.route.params.timer *60,status:"inprogress"})
    //开始计时
    let parent = this
    
    let expTimer = setInterval(()=> {
      this.props.addExp(Config["30MinsExpRate"])
      this.giveFish()
      
    },1000*60*30)

    let timer = setInterval(()=> {
      if(parent.state.coutDownMins <= 0 ){ 
        clearInterval(timer)
        clearInterval(expTimer)
        
        //debug
        this.giveFish()
        //enddebug

        let totalOwn = 0
        for(let i =0; i < this.state.lootFish.length; i++) {
          totalOwn += this.state.lootFish[i].cost
        }
        this.props.addRecord( {time: this.props.route.params.timer,success:true,type:this.props.route.params.tag,own: totalOwn,date:moment().format("lll")})
        
        
        this.props.navigation.pop()
        this.props.navigation.navigate("LootScreen",{rewards:this.state.lootFish})
        
        return
      }
      parent.setState({coutDownMins:parent.state.coutDownMins-1,time: this.state.time+1})
    },1000)

    //每30 Mins给玩家 Exp
  

    this.setState({timer:timer,expTimer:expTimer})
    AppState.addEventListener('change', this._handleAppStateChange);

  }
  componentWillUnmount() {
    
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      clearInterval(this.state.timer)
      clearInterval(this.state.expTimer)
      this.props.addRecord( {time: this.props.route.params.timer,success:false,type:this.props.route.params.tag,own: 0,date:moment().format("lll")})
      this.setState({status:"fail"})
    }
    this.setState({appState: nextAppState});
  }
  renderTiemrFormat(s) {
    s = s * 1000
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60  > 10 ? s % 60 : `0${s % 60}`
    s = (s - secs) / 60;
    var mins = s % 60 > 10 ? s % 60 : `0${s % 60}`;
    var hrs = (s - mins) / 60 > 10 ? (s - mins) / 60  : `0${(s - mins) / 60 }`;
  
    return hrs + ':' + mins + ':' + secs;
  }
  render() {
    const InProgressScreen = <React.Fragment>
      <Text style={{ fontSize:50,marginTop:20 }}>{this.renderTiemrFormat(this.state.coutDownMins)}</Text>
      <Text>{this.props.route.params.tag}</Text>
      <Button style={{alignSelf:'center',marginTop:10,marginTop:"auto",marginBottom:20  }}
        onPress={() =>{ 
          Alert.alert(
            "Give up",
            "Are you sure?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Sure", onPress: () => this.props.navigation.navigate("Home")  }
            ],
            { cancelable: false }
          );
          
        }}
      bordered>
        <Text>
          Give Up
        </Text>
      </Button>
    </React.Fragment>
    const FailScreen = <React.Fragment>
    <Text style={{ fontSize:50,marginTop:20 }}>FAIL :(</Text>
    <Text>{this.props.route.params.tag}</Text>
    <Button style={{alignSelf:'center',marginTop:10,marginTop:"auto",marginBottom:20  }}
      onPress={() =>{ this.props.navigation.navigate("Home") }}
    bordered>
      <Text>
        Back
      </Text>
    </Button>
  </React.Fragment>
    return (
      <Container>
          <AppHeader player={this.props.player} title={"Timer"} nav={this.props.navigation}/>
          <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {this.state.status === "inprogress" ? InProgressScreen : FailScreen}
          </Content>
      </Container>
    );
  }
}
