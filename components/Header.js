import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import color from '../constants/Colors'
import { AsyncStorage } from "react-native"
import { LinearGradient } from 'expo';

export default class CustomHeader extends React.Component {
    _getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('@GuessMyForehead:user');
            if (user) {
                const json = JSON.parse(user);

                if (json.image) {
                    this.setState({
                        image: json.image
                    })
                }
            }
        } catch (error) {
           console.log('error get')
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            image: ''
        }
    }

    componentWillMount() {
        this._getUser();
    }

    _showOptions = () => {
        if (!this.props.hideOptions) {
            const imageUri = (this.state.image.length > 0) ? {uri: this.state.image} : require('../assets/images/avatar.png');
            return (
                <TouchableOpacity style={styles.options} onPress={() => {
                    this.props.navigation.navigate("NotifSettings")
                }}>
                    <Image source={imageUri} style={{width: 40, height: 40, backgroundColor: 'black', borderRadius: 20}}/>
                </TouchableOpacity>
            )
        }
    }

    render() {

        
        return (
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.container}
            >
                <Text style={styles.title}>Guess My GAME</Text>
                {
                    this._showOptions()
                }
                
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: color.blue,
        flexDirection: 'column'
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        letterSpacing: 2
    },
    options: {
        position: 'absolute',
        right: 20,
        top: 30
    }
});