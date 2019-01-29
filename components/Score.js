import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors'

export default class Score extends React.Component {
    constructor(props) {
        super(props);
    }

    _showUnit = () => {
        if (this.props.unit) {
            const plurial = (this.props.units) ? this.props.units : this.props.unit + 's';
            const unit = (this.props.value > 1) ? plurial : this.props.unit;

            return (
                <Text style={styles.ptsText}>{unit}</Text>
            )
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.ptsLabel}>{this.props.label}</Text>
                <Text style={styles.pts}>{this.props.value}</Text>
                {this._showUnit()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pts: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 80,
        color: Colors.blue,
        
    },
    ptsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: -10,
        color: Colors.green,
        opacity: 0.7,
    },
    ptsLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: Colors.black,
        // marginBottom: 10,
        // textTransform: 'uppercase'
    }
});
