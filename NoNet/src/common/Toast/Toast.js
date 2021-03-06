// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Modal, 
  TouchableOpacity, 
  TouchableHighlight 
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';
import { TitleColor } from '../../utils/UIUtils';

class Toast extends Component {

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  
  //==================== 动画 ====================//
  show(time) {
    this.setState({
      modalVisible: true
    })
    if (time) {
      this.timer = setTimeout(() => {
        this.hide()
      }, time);
    }
  }
  hide(callBack) {
    this.setState({
      modalVisible: false
    })
  }

  //==================== 点击 ====================//
  _onPress=()=>{
    this.props.onPress()
    if (this.props.isAllowHide == true) {
      this.hide()
    }
  }
  
  //==================== 控件 ====================//
  hud() {
    return (
      <View style={styles.hud}>
        <Text style={styles.hudText}>{this.props.text}</Text>
      </View>
    )
  }
  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'none'}
        transparent = {true}
        onRequestClose={()=> this.onRequestClose()}
      >
        <TouchableOpacity 
          style={{flex: 1}} 
          onPress={()=>this._onPress()} 
          activeOpacity={1}
        >
          <View style={styles.container}>
            {this.hud()}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hud: {
    backgroundColor: TitleColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  hudText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 13,
  }
});

Toast.defaultProps = {
  onPress: ()=>{},
  text: '',
  isAllowHide: false,
}
Toast.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isAllowHide: PropTypes.bool.isRequired,
}

export default Toast;
