import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class extends React.Component {

    static defaultProps = {
        value: "",
        disabled: false,
        style: null,
        icon: null,
        txtStyle: null,
        width: null,
        round: false,
        onPress: () => { }
    }

    render() {
        const { loading, icon } = this.props;
        return <TouchableOpacity activeOpacity={this.props.disabled ? 1 : 0.5} onPress={() => !this.props.disabled && this.props.onPress()}>
            <View style={[styles.btn, this.props.width ? { width: this.props.width } : null, this.props.round ? { borderRadius: 4 } : null, this.props.style, this.props.disabled ? { backgroundColor: "#ccc" } : null]}>
                <Text style={[styles.txt, this.props.txtStyle]}>{this.props.value}</Text>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#d0648f"
    },
    icon: {
        marginRight: 5,
    },
    txt: {
        fontSize: 17,
        color: "#fff"
    },
    ebtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 2,
        borderColor: "#d0648f",
        borderWidth: 1
    },
    etxt: {
        fontSize: 14,
        color: "#d0648f"
    },
})
