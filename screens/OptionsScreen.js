import React from 'react';
import { View, StyleSheet, Text, TextInput, Image, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AsyncStorage } from "react-native"
import { ImagePicker } from 'expo';

import Back from '../components/Back'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors';

export default class OptionsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        this._getUser();
    }

    _setUser = async () => {
        try {
            await AsyncStorage.setItem('@GuessMyForehead:user', JSON.stringify(this.state.user));
        } catch (error) {
            // Error saving data
        }
    }

    _getUser = async () => {
        try {
          const user = await AsyncStorage.getItem('@GuessMyForehead:user');
            if (user) {
                this.setState({
                    user: JSON.parse(user)
                })
            }
        } catch (error) {
        //    console.log('error get')
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: 'Images',
            base64: true,
            quality: 0
        });
    
        if (!result.cancelled) {
            this._updateImage('data:image/png;base64,' + result.base64);
        }
    }

    _updateImage = (image) => {
        let user = this.state.user;
        user.image = image;
        this.setState({ user }, () => {
            this._setUser();
        });
    }

    _checkCameraPermissions = async () => {
        Keyboard.dismiss();
        const { Location, Permissions } = Expo;
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            this._pickImage();
        }
    }

    render() {
        const imageUri = (this.state.user.image && this.state.user.image.length > 0) ? {uri: this.state.user.image} : require('../assets/images/avatar.png');
        return (
            <View style={[Layout.container, {justifyContent: 'space-between', paddingTop: 50}]}>
                <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 250}}>
                        <Text style={styles.label}>Choisis ton pseudo </Text>
                        <TextInput
                            style={Layout.input}
                            placeholder="Pseudo"
                            textContentType="username"
                            returnKeyType="send"
                            blurOnSubmit={false}
                            onChangeText={(pseudo) => {
                                let user = this.state.user;
                                user.pseudo = pseudo;
                                this.setState({
                                    user: user
                                })

                                this._setUser();
                            }}
                            value={this.state.user.pseudo}
                            onEndEditing={() => {
                                Keyboard.dismiss()
                            }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />


                        <TouchableWithoutFeedback onPress={this._checkCameraPermissions}>
                            <View>
                                <Image source={imageUri} style={{width: 250, height: 250, backgroundColor: 'black'}}/>

                                <View style={styles.absoluteCenter}>
                                    <Text style={styles.textUpdate}>Modifier</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <Button onPress={() => {
                            this._updateImage('');
                        }} title="Supprimer la photo"/>


                        <TouchableOpacity style={{backgroundColor: Colors.false, padding: 20, marginTop: 30, color: 'white', borderRadius: 5}} onPress={() => {
                            AsyncStorage.clear();
                            this.setState({
                                user: {}
                            });
                        }} >
                            <Text style={{color: 'white'}}>Supprimer toutes mes données</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <Text style={{fontWeight: 'bold', fontStyle: 'italic', padding: 30, textAlign: 'center'}}> * Les données sont enregistrées automatiquement à chaque modifications.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    absoluteCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textUpdate: {
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 16,
        color: 'white'
    }
});
