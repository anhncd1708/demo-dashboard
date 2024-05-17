import './App.css';
import ThemeProvider from './theme';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';



const App = () => {
  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
