import React, { Component } from 'react';
import { View} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        coutDownMins: 1,
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.timer )
    this.setState({coutDownMins:this.props.route.params.timer *60})
    //开始计时
    let parent = this
    
    setInterval(()=> {
      parent.setState({coutDownMins:parent.state.coutDownMins-1})
      
    },1000)
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
    return (
      <Container>
          <Header transparent>
            <Left/>
            <Body/>
            <Right>
                <Text>$0</Text>
            </Right>

          </Header>
          <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize:50,marginTop:20 }}>{this.renderTiemrFormat(this.state.coutDownMins)}</Text>
            <Button style={{alignSelf:'center',marginTop:10,marginTop:"auto",marginBottom:20  }}
              onPress={() =>{ this.props.navigation.navigate("Home") }}
            bordered>
              <Text>
                Give Up
              </Text>
            </Button>
          </Content>
      </Container>
    );
  }
}
