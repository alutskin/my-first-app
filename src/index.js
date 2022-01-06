import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { DataContextProvider } from './store/data-context';

ReactDOM.render(<DataContextProvider><App /></DataContextProvider>, document.getElementById('root'));
