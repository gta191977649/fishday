import React, { Component } from 'react'
import { View,Dimensions } from 'react-native'
import {Card,Container,Button, Header, Title, Content, CardItem, Body, Text,Picker ,Icon  } from 'native-base';
import { LineChart,PieChart,BarChart } from "react-native-chart-kit"
export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "History"
        };
    }
    componentDidMount() {
        console.log(this.props.focus)
    }
    renderHistoryViews() {
        const CardList = this.props.focus.map((item,idx)=> 
            <Card idx={idx}>
                <CardItem>
                    
                <Body style={{ alignItems:"center" }}> 
                    <Button style={{right:0,position:'absolute'}} bordered>
                        <Text>Share</Text>
                    </Button>
                    <Text style={{fontSize:40}}>
                        {item.time} Mins
                    </Text>
                    <Text>
                        {item.date}
                    </Text>
                    <Text>
                        {item.success ? "Success":"Fail"}
                    </Text>
                    <Text>
                        +${item.own}
                    </Text>
                </Body>
                
                </CardItem>
            </Card>
        )
        return CardList
    }
    renderChart(type,data) {
        switch(type) {
            case "Line": {
                return <LineChart
                data={data}
                width={Dimensions.get("window").width-50} // from react-native
                height={220}
                yAxisSuffix=" Mins"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `#27ae60`,
                    labelColor: (opacity = 1) => `#34495e`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#27ae60"
                    }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            }
            case "Pie":{
                return <PieChart
                data={data}
                width={Dimensions.get("window").width-50}
                height={220}
                chartConfig={{
                    backgroundColor: '#2ed573',
                    backgroundGradientFrom: '#43a047',
                    backgroundGradientTo: '#2ed573',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                    borderRadius: 16
                    }
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"0"}
                center={[0, 0]}
                absolute
                />
            }
            case "Bar":{
                return <BarChart
                width={Dimensions.get("window").width-50}
                height={220}
                data={data}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: '#2ed573',
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    color: (opacity = 1) => `#27ae60`,
                    labelColor: (opacity = 1) => `#34495e`,
                    style: {
                    borderRadius: 16
                    }
                }}
                
              />
            }
        }
    }

    RenderfocusTime() {
        let x = [], y = []
        for(let i =0; i < this.props.focus.length; i++) {
            x.push(i)
            y.push(this.props.focus[i].time)
        }
        return this.renderChart("Line",{
            labels: x,
            datasets: [{data: y}]
        })
    }
    RenderSuccessChart() {
        let numSuccess = 0, numFail = 0
        for(let i =0; i < this.props.focus.length; i++) {
            if(this.props.focus[i].success) numSuccess++
            else numFail++
        }
        const pieChartData = [
            { name: 'Success', population: numSuccess, color: '#2ed573', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Fail', population: numFail, color: '#ff6348', legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]
        
        return this.renderChart("Pie",pieChartData)
    }
    RenderEventTypeChart() {
        let type = []
        let y = []

        for(let i =0; i < this.props.focus.length; i++) {
            if(!type.includes(this.props.focus[i].type)) type.push(this.props.focus[i].type)
        }
        
        for(let i =0; i < type.length; i++) {
            let count = 0
            for(let j =0; j < this.props.focus.length; j++) {
                if(type[i] === this.props.focus[j].type) count++
            }
            y.push(count)
        }
        return this.renderChart("Bar",{
            labels: type,
            datasets: [{data: y}]
        })
    }
    renderDiagramView() {
        
        const View = <React.Fragment>
            <Card idx={0}>
                <CardItem>
                    <Body> 
                    <Text>Focus Time</Text>
                        {this.RenderfocusTime()} 

                    </Body>
                </CardItem>
            </Card>
            <Card idx={1}>
                <CardItem>
                    <Body> 
                    <Text>Successful Rate</Text>
                        {this.RenderSuccessChart()}
                    </Body>
                </CardItem>
            </Card>
            <Card idx={2}>
                <CardItem>
                    <Body> 
                    <Text>Event Type</Text>
                        {this.RenderEventTypeChart()}
                    </Body>
                </CardItem>
            </Card>
            <Card idx={3}>
                <CardItem>
                    <Body> 
                    <Text>Total Own</Text>
                    <Text style={{alignSelf:"center",fontSize:30,color:"#2ed573"}}>${this.props.player.cost}</Text>
                    </Body>
                </CardItem>
            </Card>

        </React.Fragment>
        return View
    }
    renderMainView() {
        switch (this.state.selected) {
            case "History":{
                return this.renderHistoryViews()
            }
            case "Diagram":{
                return this.renderDiagramView()
            }
        }
    }
    render() {
        
        return (
            <Container>
                <Header  transparent>
                <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.selected}
              onValueChange={(val)=>{
                this.setState({selected:val})
              }}
              >
              <Picker.Item label="History" value="History" />
              <Picker.Item label="Diagram" value="Diagram" />
                </Picker>
              
                </Header>
                <Content   style={{ paddingLeft:10,paddingRight:10 }}>
                { this.renderMainView() }
                
                </Content>
            </Container>
        )
    }
}
