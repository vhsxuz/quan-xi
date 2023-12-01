import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const root = document.getElementById('root');

const theme = extendTheme({
  colors: {
    brand: {
      100: '#0A2647',
      200: '#144272',
    },
    greenteal: {
      '100': '#176B87',
      '200': '#64CCC5',
    },
    orangeyellow: {
      '100': '#FCC203',
      '200': '#FCE303',
    }
  }
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ChakraProvider>,
  root
);

reportWebVitals();
