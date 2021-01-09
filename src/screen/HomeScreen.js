import React, { Component } from 'react';
import {View} from "react-native"
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from  "./Header"
import {Picker,Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      timer:30,
      tag:"Study",
      showTagScreen:false,
      user:{
        collection:[
          {"name":"test",cost:1}
        ],
      }
    }
  }
  setTimer(timer) {
    this.setState({timer: timer})
  }
  async storeData (value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('data', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  async getData () {
    try {
      const jsonValue = await AsyncStorage.getItem('data')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  showSetTagScreen() {
    return (
      <View>
        <Modal  isVisible={this.state.showTagScreen}>
          <View style={{ flex: 1,backgroundColor:"white",alignItems:"center" }}>
            <Text style={{fontSize:30,marginTop:20}}>TAG</Text>
            <Button style={{alignSelf:'center',marginTop:10,width:"80%"  }} bordered onPress={()=>{
              this.setState({tag:"Study",showTagScreen:false})
            }}>
              <Text style={{textAlign:"center",width:"100%"}}>Study</Text>
            </Button>
            <Button style={{alignSelf:'center',marginTop:10,width:"80%"  }} bordered onPress={()=>{
              this.setState({tag:"Working",showTagScreen:false})
            }}>
              <Text style={{textAlign:"center",width:"100%"}}>Working</Text>
            </Button>
            <Button style={{alignSelf:'center',marginTop:10,width:"80%"  }} bordered onPress={()=>{
              this.setState({tag:"Sleep",showTagScreen:false})
            }}>
              <Text style={{textAlign:"center",width:"100%"}}>Sleep</Text>
            </Button>
            <Button style={{alignSelf:'center',marginTop:10,width:"80%"  }} bordered onPress={()=>{
              this.setState({tag:"Excerise",showTagScreen:false})
            }}> 
              <Text style={{textAlign:"center",width:"100%"}}>Excerise</Text>
            </Button>
           
          </View>
        </Modal>
      </View>
    )
  }
  render() {
    return (
      <Container>
         <AppHeader player={this.props.player} title={"Fish Day"} nav={this.props.navigation}/>
        
        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {this.showSetTagScreen()}
          <Button style={{alignSelf:'center',marginTop:"50%" }} onPress={() =>{ this.props.navigation.navigate("TimerScreen",{timer:this.state.timer,tag:this.state.tag}) }} large>
            <Text>START</Text>
          </Button>
          <Button style={{alignSelf:'center',marginTop:10  }} bordered onPress={()=>{
            this.setState({ showTagScreen:true})
          }}>
            <Text>{this.state.tag}</Text>
          </Button>
          <Button style={{alignSelf:'center',marginTop:10  }} bordered onPress={()=>{
             this.props.addCollection(
              {name:"Test Fish",cost:1}
             )
             this.props.addExp(5)
              this.forceUpdate()
          }}>
            <Text>Test</Text>
            
          </Button>
          <Button style={{width:140 ,alignSelf:'center',marginTop:10,marginTop:"auto",marginBottom:20}} bordered >
              <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.timer}
              onValueChange={(val)=>{
                this.setState({timer:val})
              }}
              >
              <Picker.Item label="1 Mins" value={0.05} />
              <Picker.Item label="30 Mins" value={30} />
              <Picker.Item label="60 Mins" value={60} />
              <Picker.Item label="90 Mins" value={90} />
              <Picker.Item label="120 Mins" value={120} />
            </Picker>
          </Button>
        
          
        </Content>
       
      </Container>
    );
  }
}