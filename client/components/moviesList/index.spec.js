import React from 'react';
import {mount} from 'enzyme';
import MoviesList from './index.tsx';
import reducers from '../../../redux/reducers';
import {combineReducers, createStore} from 'redux';
import {routerReducer} from 'react-router-redux';
import {updateList} from '../../../redux/actions';

let store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer
	})
);

store.dispatch(updateList([{Title: 'Test Title1'}, {Title: 'Test Title2'}]));

describe('Movies List Component', () => {
	it('should render List of movies', () => {
		const wrapper = mount(<MoviesList store={store}/>);

		expect(wrapper).toMatchSnapshot();
	});
});