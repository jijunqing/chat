/**
 * Created by Jerry on 16/12/12.
 */

import React from "react";

import Avatar from "../avatar";

import { connect } from "react-redux";
@connect( state => ({
    user: state.user,
    messageList : state.messageList,
    currentChatUser: state.currentChatUser }))
export default class MessageList extends React.Component{

    render(){

        const List = this.props.messageList[this.props.currentChatUser._id] || [];

        return <div ref={ node => this._listNode = node } className="dialogue flex">
            <div className="dialogue-middle">
                {
                    List.map( (val, index) => <_Message key={index * 2} message={ val } me={ this.props.user }/>)
                }
            </div>
        </div>
    }

    toBottom(){
        //渲染完毕后 将滚动条拉倒最底部
        this._listNode.scrollTop = this._listNode.scrollHeight;
    }
    componentDidMount(){
        this.toBottom();
    }

    componentDidUpdate(){
        this.toBottom();
    }
}

/**
 * 单条消息
 */
@connect( state => ({ userMap: state.userMap }))
class _Message extends React.Component{

    render(){

        const { message, me } = this.props;
        const isFromMe = message.from === me._id;

        return <div className={`dialogue-${isFromMe ? "right" : "left"} flex`}>

            <Avatar user={ isFromMe? me : this.props.userMap.get(message.from) }/>

            <span className="arrow" />
            <div className="content flex">
                <span>{ message.content }</span>
            </div>
        </div>
    }
}