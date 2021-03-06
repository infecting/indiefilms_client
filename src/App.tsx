import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import CreateMovie from './pages/CreateMovie';
import Home from './pages/Home';
import Login from './pages/Login';
import MoviePlayer from './pages/MoviePlayer';
import Movies from './pages/Movies';
import Register from './pages/Register';
import Admin from './pages/Admin'

export function App() {
  return (
    <>
    <Router>
    <Nav />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/movies" exact component={Movies}/>
        <Route path="/movies/new" exact component={CreateMovie}/>
        <Route path="/movies/:id" exact component={MoviePlayer}/>
        <Route path="/admin" exact component={Admin}/>
      </Switch>
    </Router>
    </>
  );
}


