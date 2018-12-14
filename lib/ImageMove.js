'use strict';

import React from 'react';

import {
    PanResponder,
    Animated,
} from 'react-native';

export default class extends React.PureComponent {

    static defaultProps = {
        renderItem: function () { },
        moveStart: function () { },
        moveEnd: function () { },
    }

    constructor(props) {
        super(props)
        this.state = {
            offset: new Animated.ValueXY(0, 0),
        }
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.move = true;
                this.props.moveStart()
            },
            onPanResponderMove: (evt, gestureState) => {
                let x = gestureState.moveX - gestureState.x0
                let y = gestureState.moveY - gestureState.y0
                this.state.offset.setValue({ x, y })
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.move = false;
                this.props.moveStart()
                this.props.moveEnd({
                    x: this.state.offset.x._value,
                    y: this.state.offset.y._value,
                });
                this.state.offset.setValue({ x: 0, y: 0 })
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 
            }
        });
    }
    _panResponder;
    move = false;

    render() {
        return <Animated.View {...this._panResponder.panHandlers} style={{
            transform: [{
                translateX: this.state.offset.x,
            }, {
                translateY: this.state.offset.y,
            }]
        }}>
            {this.props.renderItem()}
        </Animated.View>
    }
}