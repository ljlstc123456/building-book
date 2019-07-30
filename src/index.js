import 'babel-polyfill'

import ReactDOM from 'react-dom';
//import 'swiper/dist/css/swiper.min.css'
import './index.css'
//import 'animate.css/animate.min.css'
import Root from './router.jsx';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
