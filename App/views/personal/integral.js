import React, { Component } from 'react';
import { AppRegistry,StyleSheet, ListView, Text, View,Image,  TouchableOpacity,InteractionManager} from 'react-native';

export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {'id':1,'item':'200积分','topic':'随机小礼物一个',},
        {'id':2,'item':'500积分','topic':'京东购物券100'},
        {'id':3,'item':'1000积分','topic':'现金100元'},
        {'id':4,'item':'2000积分','topic':'现金250元'},
        {'id':5,'item':'5000积分','topic':'现金600元'}
      ])
    };
  }
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#F5F5D5'}}>
        <View style={{height:48,backgroundColor:'#51a1e6',flexDirection:'row'}}>
              <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'white'}}>返回</Text>
              </TouchableOpacity>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>积分兑换</Text>
              </View>
              <View style={{width:48,height:48}}/>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.item}>
              <View style={styles.authorItem}>
                    <Text style={styles.author}>{rowData.item}</Text>
              </View>
              <View style={styles.authorItem}>
                    <Text style={styles.topicItem}>{rowData.topic}</Text>
              </View>
            </View>}
        />
        <View style={styles.authorItem}>
              <Text style={styles.topicItem}>请联系客服qq进行兑换</Text>
        </View>
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
        width:30,
        height:30,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    author:{
        fontSize:18,
        marginLeft:10,
        lineHeight:30
    },
    topicItem:{
        fontSize:16
    },
    likeItem:{
        flexDirection: 'column',
        height: 40,
        flexDirection: 'row',
        marginRight:10
    },
    like:{
        marginLeft:10,
        lineHeight:30
    }
});
