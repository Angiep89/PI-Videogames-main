import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import VideogameCreate from './components/VideogameCreate/VideogameCreate'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/'  component={LandingPage}/>
        <Route path = '/home' exact component={Home}/>
        <Route path = '/videogames' exact component ={VideogameCreate} />
        <Route  path= '/videogames/:id' exact component={Details}/>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
