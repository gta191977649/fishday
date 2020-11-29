import React,{Component} from 'react';
import { Button, View,Text } from 'react-native';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={this.props.navigation.openDrawer}
          title="Open navigation drawer"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
}


