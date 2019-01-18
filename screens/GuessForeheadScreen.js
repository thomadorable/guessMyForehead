import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class GuessForeheadScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    const idTheme = this.props.navigation.state.params.idTheme;
    
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Text>hello !!! Thème = {idTheme}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
