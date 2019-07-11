import React, {Component} from 'react';

class PhoneInfo extends Component {
  static defaultProps={
    info:{
      name: '이름',
      phone: '010-0000-0000',
      id:0
    }
  }

  state = {
    // 수정 시 editing=true로 변경, input박스로 변경
    editing: false,
    // input값 유동적으로 담기 위함
    name: '',
    phone: ''
  }
  handleRemove = ()=>{
    // 삭제 버튼 클릭 시 onRemove에 id 넣어 호출
    const {info, onRemove} = this.props;
    onRemove(info.id);
  }
  handleToggleEdit = () => {
    const {editing} = this.state;
    this.setState({editing: !editing})
  }
  handleChange = (e)=>{
    const{name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState){
    // editing 값 바뀔 때 처리할 로직.
    const{info, onUpdate} = this.props;
    if(!prevState.editing && this.state.editing){
      // editing이 false -> true로 바뀔 때 state 변경
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }
    if (prevState.editing && !this.state.editing){
      // editing이 true -> flase로 바뀔 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if(!this.state.editing
        && !nextState.editing
        && nextProps.info === this.props.info){
      return false;
    }
    else return true;
  }
  render() {
    console.log('render PhoneInfo' + this.props.info.id);
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    // 수정모드
    if (editing){
      return (
        <div style={style}>
          <div>
            <input 
              value = {this.state.name}
              name = "name"
              placeholder = "이름"
              onChange = {this.handleChange}>
            </input>
          </div>
          <div>
            <input
              value = {this.state.phone}
              name = "phone"
              placeholder = "전화번호"
              onChange = {this.handleChange}>
            </input>
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }
    else{
      // 일반모드
      const {
        name, phone
      } = this.props.info;
  
      return (
        <div style={style}>
          <div><b>{name}</b></div>
          <div>{phone}</div>
          <button onClick={this.handleToggleEdit}>수정</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }
  }
}

export default PhoneInfo;