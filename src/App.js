import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

import Header from './Components/header';
import Main from './Components/main';
function App() {
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>


      <Header />
      <Main />
    </>
  );
}

export default App;
