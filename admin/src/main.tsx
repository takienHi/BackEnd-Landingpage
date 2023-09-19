import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../src/assets/scss/app.scss';
import './main.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'regenerator-runtime';
import { AppProvider } from './contexts/app.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </BrowserRouter>
);
