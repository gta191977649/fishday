import React, { Component } from 'react'
import { ScrollView,View } from 'react-native'
import { Thumbnail,List, ListItem,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import fish from "../res/fish.png"
import AppHeader from  "./Header"

export default class CollectionScreen extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {

        //this.setState({collection:this.props.route.params.collection})
    }
    renderItems() {
        const items = this.props.collections.map((item,idx) =>
            <ListItem button={true} onPress={()=>{this.props.navigation.navigate("FishDetail",{fish:item})}} avatar key={idx}>
                <Left>
                    <Thumbnail source={fish} />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note>${item.cost} qty:{item.qty}</Text>
                </Body>
               
            </ListItem>
        )
        return <List>{items}</List> 
    }
    render() {
        
        return (
            <Container>
           <AppHeader player={this.props.player} title={"Collections"} nav={this.props.navigation}/>
            <Content contentContainerStyle={{ flex: 1,paddingLeft: 5,paddingRight: 5}}>
                <ScrollView>
                    {this.props.collections.length > 0 ? this.renderItems() : <Text> No item</Text>}
                </ScrollView>
            </Content>
            
        </Container>
        )
    }
}
