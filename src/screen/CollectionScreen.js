import React, { Component } from 'react'
import { ScrollView,View } from 'react-native'
import { Card, CardItem,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class CollectionScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            collection: [
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
              {name:"aa",cost:1},
            ]
        }

    }
    componentDidMount() {

        //this.setState({collection:this.props.route.params.collection})
    }
    renderItems() {
        const items = this.state.collection.map((item,idx) =>
            <Card key={idx}>
                <CardItem>
                    <Body>
                        <Text>
                            {item.name}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        )
        return items
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
                    {this.state.collection.length > 0 ? this.renderItems() : <Text> No item</Text>}
                </ScrollView>
            </Content>
            
        </Container>
        )
    }
}
