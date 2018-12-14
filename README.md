## react-native-image-drag

这是一个为了自由拖动图片而开发的库。

[npm地址](https://www.npmjs.com/package/react-native-image-drag)

![示例](http://resource.guofangchao.com/image-drag.gif)

## ImageContainer介绍

这个组件默认展示一个九宫格的图片框，图片可以在这个框内自由的拖动，根据拖动的结果自动排序图片。

这个组件非常适合类似于编辑发布一批图片的场景。

用户最多上传9张图片，可以自由的排序以及添加删除。

### 使用

使用某个上传组件获取到要上传的图片列表。通过props传递给组件

```javascript
 <ImageContainer ref="container"
    renderItem={this.renderItem.bind(this)}
    moveEnd={this.moveEnd.bind(this)}
    images={this.state.images} >
    <Text style={{ color: "#fff", margin: 10 }}>自定义加入的文字或者组件</Text>
</ImageContainer>

renderItem(item, index) {
    return <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
}
```

如果想要知道最终的结果，可以使用`this.refs.container.getImages()`方法拿到当前的排序结果。

### props介绍

```javascript
static defaultProps = {
    images: [],     //传入的图片列表，这里假设使用组件上传，图片地址使用uri字段
    style: null,    //外部容器的样式，如果没有特殊需求会自动宽，没有高。
    renderItem: function (item, index) { }, //自定义渲染单个项目，参数包括传入个单个数据、角标
    moveStart: function (index) { },        //开始移动之前的钩子，可以设定样式、禁止ScrollView等
    moveEnd: function (old_index, new_index, e) { },    //移动结束，参数：原角标，将要插入的角标，已经移动的x/y
}
```
## ImageMove介绍

这个组件是为了拖拽图片而开发的。

内部根据手势移动图片，只要外部容器允许，图片就可以任意拖动。

### 使用

可以自定义要拖动的内容的样式和具体内容。

```javascript
<ImageMove
    moveEnd={e => this.moveEnd(index, e)}
    moveStart={() => this.props.moveStart(index)}
    renderItem={() => this.props.renderItem(item, index)} />
```

### props介绍

```javascript
static defaultProps = {
    renderItem: function () { },    //渲染自定义内容
    moveStart: function () { },     //拖动开始的事件
    moveEnd: function () { },       //拖动结束的事件
}
```

> 实际的使用可以参考`test`文件夹下的demo文件
> 使用`react-native-syan-image-picker`组件上传图片
> 使用`Button`组件显示按钮，触发事件