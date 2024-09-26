/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
    const ignoreWarns = [
        'Require cycle:',
        'componentWillReceiveProps has been renamed',
    ];

    const warn = console.warn;
    console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
            if (arg[0].startsWith(warning)) {
                return;
            }
        }
        warn(...arg);
    };

    LogBox.ignoreLogs(ignoreWarns);
}

AppRegistry.registerComponent(appName, () => App);
