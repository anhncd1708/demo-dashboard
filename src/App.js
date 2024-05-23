import './App.css';
import ThemeProvider from './theme';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style



const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
