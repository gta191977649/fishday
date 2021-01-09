import React, { Component } from 'react';
import {Picker,Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Header transparent>
        <Left>
          <Button transparent onPress={this.props.nav.openDrawer}>
            <Icon name='menu' style={{color: "black"}}/>
          </Button>
        </Left>
        <Body>
          <Title style={{color: "black"}}>{this.props.title}</Title>
        </Body>
        <Right>
        <Text>${this.props.player.cost} LV:{this.props.player.level} EXP: {this.props.player.exp}%</Text>
        </Right>
      </Header>
    );
  }
}
