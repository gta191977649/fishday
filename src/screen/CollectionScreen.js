import React, { Component } from 'react'
import { ScrollView,View } from 'react-native'
import { Thumbnail,List, ListItem,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import fish from "../res/fish.png"
export default class CollectionScreen extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {

        //this.setState({collection:this.props.route.params.collection})
    }
    renderItems() {
        const items = this.props.collections.map((item,idx) =>
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
          <Left>
            <Button transparent onPress={this.props.navigation.openDrawer}>
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
            <Content contentContainerStyle={{ flex: 1,paddingLeft: 5,paddingRight: 5}}>
                <ScrollView>
                    {this.props.collections.length > 0 ? this.renderItems() : <Text> No item</Text>}
                </ScrollView>
            </Content>
            
        </Container>
        )
    }
}
