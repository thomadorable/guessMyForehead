import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, LinearGradient } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';
import CustomLoader from './components/CustomLoader';


export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        isFakeLoadingShowing: true
    };

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <AppNavigator />
                    {
                        this.state.isFakeLoadingShowing && <CustomLoader />
                    }
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/forehead/random.jpg'),
                require('./assets/images/forehead/90s.jpg'),
                require('./assets/images/forehead/music.jpg'),
                require('./assets/images/forehead/animals.jpg'),
                require('./assets/images/forehead/blockbuster.jpg'),
                require('./assets/images/forehead/food.jpg'),
                require('./assets/images/forehead/stars.jpg'),
                require('./assets/images/games/guess.jpeg'),
                require('./assets/images/games/pendu.jpeg'),
                require('./assets/images/games/snake.jpeg'),
                require('./assets/images/games/memory.jpeg'),
                require('./assets/images/games/quizz.jpeg'),
                require('./assets/images/games/2048.jpeg'),
                require('./assets/images/games/tictactoe.jpeg')
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'avenir': require('./assets/fonts/Avenir-Roman.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
        setTimeout(() => {
            this.setState({ isFakeLoadingShowing: false });
        }, 800);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey,
    },
});
