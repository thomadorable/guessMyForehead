import { Dimensions } from 'react-native';
import Colors from './Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        // width: 250,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 5
    },
    container: {
        flex: 1,
        backgroundColor: Colors.grey,
        flexDirection: 'column',
        // justifyContent: 'center',
    }
};
