export const updateList = (data) => {
	return {
		type: 'UPDATE_MOVIES_LIST',
		data
	};
};

export const updateItem = (data) => {
	return {
		type: 'UPDATE_MOVIE_ITEM',
		data
	};
};