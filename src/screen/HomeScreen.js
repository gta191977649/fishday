import React, { Component } from 'react';
import {View} from "react-native"
import Modal from 'react-native-modal';

import {Picker,Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      timer:30,
      showSetTimerScreen:false
    }
  }
  setTimer(timer) {
    this.setState({timer: timer})
  }
 /*
  setTimerScreen() {
    return (
      <Modal isVisible={this.state.showSetTimerScreen} style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"white" }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize:40,marginTop:20}}>TIMER SET</Text>
          <Item style={{height:60,marginTop:30}} regular>
          <Input style={{textAlign:"center",fontSize:30}} keyboardType={'numeric'} placeholder="Timer" onChangeText={ (val) =>{ this.setState({timer:val}) }}>{this.state.timer}</Input>
          </Item>
            <Text style={{textAlign:"center",marginTop:10}}>Minutes</Text>
            <Button style={{alignSelf:"center",marginTop:"auto",marginBottom:20}}
             onPress={()=>{
              this.setState({showSetTimerScreen:false})
             }}>
              <Text>SET</Text>
            </Button>
        </View>
    
      </Modal>
    )

  }
*/
  render() {
    return (
      <Container>
         
        <Header transparent>
          <Left>
            <Button transparent >
              <Icon name='menu' style={{color: "black"}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: "black"}}>Fish Day</Title>
          </Body>
          <Right >
          <Text>$0 LV:1 EXP: 0%</Text>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button style={{alignSelf:'center',marginTop:"50%" }} onPress={() =>{ this.props.navigation.navigate("TimerScreen",{timer:this.state.timer}) }} bordered large>
            <Text>START</Text>
          </Button>
          <Button style={{alignSelf:'center',marginTop:10  }} bordered >
            <Text>TAG</Text>
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