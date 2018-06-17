import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import reducers from './redux/reducers'
import MoviesList from './client/components/moviesList'
import MoviesItem from './client/components/moviesItem'


const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
);

const history = syncHistoryWithStore(browserHistory, store);

const App = () => <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={MoviesList} />
        <Route path="/moviesItem/:movieName" component={MoviesItem}/>
    </Router>
</Provider>;

ReactDOM.render(<App />, document.querySelector('#container'));
