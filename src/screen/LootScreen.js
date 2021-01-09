import React, { Component } from 'react'
import { View,ScrollView  } from 'react-native'
import { Thumbnail,List, ListItem,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import fish from "../res/fish.png"
import AppHeader from  "./Header"

export default class LootScreen extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  renderItems() {
    const items = this.props.route.params.rewards.map((item,idx) =>
        <ListItem avatar key={idx}>
            <Left>
                <Thumbnail source={fish} />
            </Left>
            <Body>
                <Text>{item.name}</Text>
                <Text note>${item.cost}</Text>
            </Body>
           
        </ListItem>
    )
    return <List>{items}</List> 
  }
    render() {
        return (
            <Container>
         
            <Header transparent>

            </Header>
            <Content contentContainerStyle={{ flex: 1 }}>
                <Text style={{fontSize:22, alignSelf:"center"}} large>Loot Items</Text>
                <ScrollView style={{width:"100%"}}>
                  {this.renderItems()}
                </ScrollView>
                <Button style={{ alignSelf:"center",bottom:15}} onPress={()=> this.props.navigation.navigate("Home")}>
                  <Text>Back</Text>
                </Button>
            </Content>
            </Container>
        )
    }
}
