import React, { Component } from 'react';
import { View,Image } from 'react-native';
import { Thumbnail,List, ListItem,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import fishImg from "../res/fish.png"

export default class FishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const fish = this.props.route.params.fish
    return (
      <Container>
           <Header transparent >
            <Body>
                <Title style={{color: "black",alignSelf:"center"}}>{fish.name}</Title>
            </Body>
               
            </Header>
          <Content Content contentContainerStyle={{ flex: 1,justifyContent:"center",alignItems:"center",paddingLeft: 5,paddingRight: 5}}>
            <Image source={fishImg}/>
            <Text>Cost: ${fish.cost}</Text>
            <Text>Rear: {fish.rear}</Text>
            <Text>Type: {fish.type}</Text>
            <Text>Date: {fish.time}</Text>
           
          </Content>
          <Button style={{ alignSelf:"center",bottom:15}} onPress={()=> this.props.navigation.goBack()}>
                  <Text>Back</Text>
            </Button>
      </Container>
    );
  }
}
