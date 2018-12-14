'use strict';

import React from 'react';

import {
    View,
    Text,
    Image,
} from 'react-native';

import Button from "./Button"
import SyanImagePicker from 'react-native-syan-image-picker';
import ImageContainer from "../lib/ImageContainer"

export default class extends React.Component {

    constructor(props) {
        super(props, {
            images: [],
            totalHeight: 0,
            video: {
                path: "",
                width: 0,
                height: 0
            }
        });
    }

    render() {
        return <View style={{ width: 300, backgroundColor: "#333" }}>
            <ImageContainer ref="container"
                renderItem={this.renderItem.bind(this)}
                moveEnd={this.moveEnd.bind(this)}
                images={this.state.images} >
                <Text style={{ color: "#fff", margin: 10 }}>自定义加入的文字或者组件</Text>
            </ImageContainer>
            <Button value="上传图片" onPress={this.btn.bind(this)}></Button>
            <Button value="获取图片" onPress={this.btn1.bind(this)}></Button>
        </View>
    }

    renderItem(item, index) {
        return <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
    }

    moveEnd(old, curr, e) {
        console.log(old, curr, e);
        if (e.y > 300) {
            console.log("删除")
        }
    }
    async upPhotos(maxFiles) {
        try {
            const photos = await SyanImagePicker.asyncShowImagePicker({
                imageCount: maxFiles,
                isRecordSelected: true
            });
            return {
                photos: photos,
            };
        } catch (err) {
            return {
                photos: [],
            }
        }
    }
    async btn() {
        let images = await this.upPhotos(9)
        let photos = images.photos;
        this.setState({
            images: photos,
        });
    }
    async btn1() {
        console.log(this.refs.container.getImages())
    }

}
