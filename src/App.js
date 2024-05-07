import './App.css';
import ThemeProvider from './theme';
import Router from './routes/Router';



const App = () => {
  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
