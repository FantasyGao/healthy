import React, { Component } from 'react';
import { AppRegistry,StyleSheet, ListView, Text, View,Image,TouchableOpacity,InteractionManager} from 'react-native';

import Content from './content.js'

import config from '../config.js';

const URL = config.URL;
export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        console.log(request.responseText);
        let listData = JSON.parse(request.responseText);
        if(listData.length==0) return
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(listData)
        });
      } else {
        alert('error');
      }
    };

    request.open('GET', URL+'get_info_bytag?tag='+this.props.tag);
    request.send();
  }
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  toDetail(id){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: Content,
            name: 'Content',
            params:{
               _id:id,
               userId:this.props.username
            }
          });
        });
    }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#F5F5D5'}}>
         <View style={{height:45,backgroundColor:'#51a1e6',flexDirection:'row'}}>
             <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                               style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                 <Text style={{color:'white'}}>返回</Text>
             </TouchableOpacity>
             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>{this.props.tag}</Text>
             </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.item}>
              <View style={styles.authorItem}>
                    <Image style={styles.personIcon} source={{uri:rowData.icon}}/>
                    <Text style={styles.author}>{rowData.author}</Text>
              </View>
              <TouchableOpacity onPress={() => {this.toDetail(rowData._id)}}>
                <Text style={styles.topicItem}>{rowData.topic}</Text>
                <View style={styles.likeItem}>
                    <Image style={styles.personIcon} source={require('../images/heat.png')}/>
                    <Text style={styles.like}>{rowData.likeNum}</Text>
                    <Image style={styles.personIcon} source={require('../images/mark.png')}/>
                    <Text style={styles.like}>{rowData.markNum}</Text>
                </View>
              </TouchableOpacity>
            </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        flexDirection: 'column',
        backgroundColor:'white'
    },
    authorItem:{
        padding:10,
        height: 50,
        flexDirection: 'row',
    },
    personIcon:{
        width:28,
        height:28,
        borderWidth: 1,
        marginLeft:20,
        marginTop:5,
        borderColor: '#F5F5F5',
    },
    author:{
        fontSize:18,
        marginLeft:10,
        lineHeight:30
    },
    topicItem:{
        padding:10,
        fontSize:16
    },
    likeItem:{
        flexDirection: 'column',
        height: 40,
        flexDirection: 'row',
        marginRight:10
    },
    like:{
        marginLeft:5,
        lineHeight:30
    }
});
