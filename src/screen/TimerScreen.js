import React, { Component } from 'react';
import { View,AppState} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        coutDownMins: 1,
        timer:null,
        appState: AppState.currentState,
        status:"idle"
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.timer )
    this.setState({coutDownMins:this.props.route.params.timer *60,status:"inprogress"})
    //开始计时
    let parent = this
    
    let timer = setInterval(()=> {
      parent.setState({coutDownMins:parent.state.coutDownMins-1})
    },1000)
    this.setState({timer:timer})
    AppState.addEventListener('change', this._handleAppStateChange);

  }
  componentWillUnmount() {
    
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      clearInterval(this.state.timer)
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
        onPress={() =>{ this.props.navigation.navigate("Home") }}
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
          <Header transparent>
            <Left/>
            <Body/>
            <Right>
                <Text>$0</Text>
            </Right>

          </Header>
          <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {this.state.status === "inprogress" ? InProgressScreen : FailScreen}
          </Content>
      </Container>
    );
  }
}
