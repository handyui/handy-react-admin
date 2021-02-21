// IE polyfill
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
// import 'babel-polyfill'
import '@babel/polyfill'
import './polyfill';
import 'core-js/es';
import 'mutation-observer';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import App from './router/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store/index'
import "antd/dist/antd.css"
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
// 新版的antd的中文语言包里的年月日星期的翻译被去掉了，所以要加moment
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn")

ReactDOM.render(
<ConfigProvider locale={zhCN}>
    <Provider store={store}>
        <App />
    </Provider>
</ConfigProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
