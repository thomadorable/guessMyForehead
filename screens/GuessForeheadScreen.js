import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout'

import Back from '../components/Back'
import Colors from '../constants/Colors';

export default class GuessForeheadScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        
        // Use slice to duplicate array and avoid updating default datas
        this.values = this.props.navigation.state.params.data.values.slice(0);

        this.state = {
            value: 'vide',
            pts: 0,
            timer: 60
        };
    }

    componentWillMount() {
        this.selectValue();

        this.interval = setInterval(() => {
            if (this.state.timer <= 1) {
                this.endGame()
            } else {
                this.setState({
                    timer: this.state.timer - 1
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    selectValue = () => {
        if (this.values.length > 0) {
            const value = this.values.splice(Math.floor(Math.random() * this.values.length), 1);
            this.setState({
                value
            })
        } else {
            this.endGame()
        }
    }

    endGame = () => {
        clearInterval(this.interval);
        alert('Terminé  ! ' + this.state.pts + ' points ');
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={Layout.container}>
                <Back navigation={this.props.navigation} />

                <View style={styles.guessContainer}>
                    <Text style={styles.guess}>{this.state.value}</Text>
                        <Text style={styles.timer}>{this.state.timer}s | {this.state.pts}</Text>
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: Colors.true}]}
                        onPress={() => {
                            this.setState({
                                pts: this.state.pts + 1
                            }, this.selectValue)
                        }}
                        >
                        <Text style={styles.textBtn}>Gagné</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.selectValue();
                        }}
                        >
                        <Text style={styles.textBtn}>Perdu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    guessContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guess: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: '#2c63b7'
    },
    timer: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#555'
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 30,
        justifyContent: 'space-between'
    },
    btn: {
        padding: 20,
        paddingHorizontal: 50,
        backgroundColor: Colors.false,
        borderRadius: 5
    },
    textBtn: {
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1
    }
});
