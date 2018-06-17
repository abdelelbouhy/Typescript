import * as React from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {updateItem} from '../../../redux/actions';
import './index.scss';

interface MovieItemProps {
    updateMovieItem: (movieItem) => {};
    movieItem: any;
    params: any
}


class MovieItem extends React.Component<MovieItemProps, {}> {
    private url: string;

    constructor(props: any) {
        super(props);

        this.url = '/getMovieItem';
        this.getMovieItem().then((res: any) => {
            this.props.updateMovieItem(res.data.Search[0])

        })
    }

    getMovieItem(): Promise<object>{
        return axios.post<object>(this.url, {
            payload: {queryString: this.props.params.movieName}
        });

    }

    render (): any {
        const {data} = this.props.movieItem;

        return !!data && (
            <div className='movie_item_wrapper'>
                <div className='movie_item_wrapper-title'>Title: {data.Title}</div>
                <div className='movie_item_wrapper-poster'><img src={data.Poster} className='movie_item_wrapper-poster-img' /></div>
                <div className='movie_item_wrapper-description'>
                    <div className='movie_item_wrapper-description-type'>Type: {data.Type}</div>
                    <div className='movie_item_wrapper-description-year'>Year: {data.Year}</div>
                    <div className='movie_item_wrapper-description-imdbID'>ImdbID: {data.imdbID}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieItem: state.movieItem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateMovieItem: movieItem => {
            dispatch(updateItem(movieItem));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
