'use strict';

import React from 'react';

import {
    View,
    StyleSheet,
} from 'react-native';
import ImageMove from "./ImageMove";


export default class extends React.Component {

    static defaultProps = {
        images: [],
        style: null,
        renderItem: function (item, index) { },
        moveStart: function (index) { },
        moveEnd: function (old_index, new_index, e) { },
    }

    constructor(props) {
        super(props);
        this.state = {
            images: props.images,
        }
    }
    render() {
        return <View style={this.props.style}>
            <View style={styles.container}>
                {this.state.images.map((item, index) => <View key={index}>
                    <ImageMove
                        moveEnd={e => this.moveEnd(index, e)}
                        moveStart={() => this.props.moveStart(index)}
                        renderItem={() => this.props.renderItem(item, index)} />
                </View>)}
            </View>
            {this.props.children}
        </View>
    }

    moveEnd(index, e) {
        let imgs = this.state.images;
        let old = [index % 3, index / 3 >> 0];
        let len = px(224);
        let curr_x = +(e.x / len).toFixed(0);
        let curr_y = +(e.y / len).toFixed(0);
        old[0] = old[0] + curr_x;
        old[1] = old[1] + curr_y;
        if (old[0] < 0) old[0] = 0;
        if (old[0] > 3) old[0] = 3;
        if (old[1] < 0) old[1] = 0;
        if (old[1] > 3) old[1] = 3;
        let curr = old[1] * 3 + old[0];
        if (curr >= imgs.length) curr = imgs.length - 1;
        let cur_img = imgs.splice(index, 1);
        imgs.splice(curr, 0, ...cur_img);
        this.setState({ images: imgs })
        this.props.moveEnd(index, curr, e);
    }
    getImages() {
        return this.state.images;
    }
    componentWillReceiveProps(pp) {
        this.setState({ images: pp.images })
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
})