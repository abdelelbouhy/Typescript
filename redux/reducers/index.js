const moviesList = (state = {data: []}, action) => {
	switch (action.type) {
	case 'UPDATE_MOVIES_LIST':
		return Object.assign({}, state, {
			data: action.data
		});
	default:
		return state;
	}
};

const movieItem = (state = {data: {}}, action) => {
	switch (action.type) {
	case 'UPDATE_MOVIE_ITEM':
		return Object.assign({}, state, {
			data: action.data
		});
	default:
		return state;
	}
};

const reducers = {
	moviesList,
	movieItem
};

export default reducers;
