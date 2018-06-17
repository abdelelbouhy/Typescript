import * as React from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {debounce, forOwn, findIndex} from 'lodash';
import {Link} from 'react-router';
import {updateList} from '../../../redux/actions';
import {updateSearchValue} from '../../../redux/actions';
import './index.scss';
import {type} from "os";

interface MoviesListState {
    queryString: string;
    moviesList: Array<object>;
    addSearchCriteria: boolean;
    deafaultSearchCriterias: Array<object>;
    ['s']: any;
    ['type']: any;
    ['y']: any
}

interface MoviesListProps {
    updateMoviesList: (moviesList) => {};
    moviesList: any;
}

class MoviesList extends React.Component<MoviesListProps, MoviesListState> {
    state: any = {
        queryString: '',
        deafaultSearchCriterias: [
            {
                title: 'Title',
                name: 's',
                id: 'title'
            }
        ],
        s: '',
        type: '',
        y: ''
    };

    private url: string;

    private searchCriterias: any[] = [
        {
            title: 'Type',
            name: 'type',
            id: 'type'
        },
        {
            title: 'Year',
            name: 'y',
            id: 'year'
        }
    ];

    private queryObj: object = {

    };

    constructor(props: any) {
        super(props);

        this.url = '/getMoviesList';
    }

    handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const input = event.target as HTMLInputElement;
        const name = input.name;
        let queryString = '';

        this.queryObj[name] = input.value;
        this.state[name] = input.value;

        forOwn(this.queryObj, (val, key) => {
            queryString += `&${key}=${val}`;
        });

        this.setState({queryString:  queryString}, debounce(() => {
            this.getMoviesList().then((res: any) => {
                this.props.updateMoviesList(res.data.Search)

            })
        }, 300))
    };

    getMoviesList = (): Promise<object> => {
        return axios.post<object>(this.url, {
            payload: {queryString: this.state.queryString}
        });

    };

    hanleOnClick = () => {
        this.setState({addSearchCriteria: true})
    };

    updateDefaultSearchCriterias = (event) => {
        const text = event.target.innerText;
        const index = findIndex(this.searchCriterias, obj => obj.title === text);
        const deafaultSearchCriterias = [...this.state.deafaultSearchCriterias, ...this.searchCriterias.splice(index, 1)];

        this.setState({deafaultSearchCriterias, addSearchCriteria: !!this.searchCriterias.length})
    };

    render (): any {
        const {data} = this.props.moviesList;

        return (
            <div className='movies_list-wrapper'>
                <h1 className='movies_list-wrapper-heading'>Search Movies By</h1>
                <form className='movies_list-wrapper-search_form'>
                    {
                        this.state.deafaultSearchCriterias.map((val) => {
                            return (
                                <div className='movies_list-wrapper-search_form-field' key={`${val.id}`}>
                                    <label
                                        htmlFor='movies_list-wrapper-search_form-search'
                                        className='movies_list-wrapper-search_form-label'
                                    >
                                        {val.title}:
                                    </label>

                                    <input
                                        type='text'
                                        placeholder={`Please enter a movie ${val.title.toLowerCase()}`}
                                        id={val.id}
                                        name={val.name}
                                        onChange={this.handleOnChange}
                                        className='movies_list-wrapper-search_form-search_input'
                                        value={this.state[val.name]}
                                    />
                                </div>

                            )
                        })
                    }
                </form>

                {data && <div className={!!data.length ? 'movies_list-wrapper-movies_list' : ''}>
                    {data.map((movie, idx) => {
                        return <div className='movies_list-wrapper-movies_list-movie' key={`${movie.imdbID}_${idx}`}>
                            <Link to={`/moviesItem/${movie.Title}`} className='movies_list-wrapper-movies_list-movie-link'>{movie.Title}</Link>
                        </div>
                    })}
                </div>}

                <div className='clear-fix'></div>

                <div className='movies_list-wrapper-add_search_criteria' onClick={this.hanleOnClick}>Add Search Criteria</div>
                <div className='clear-fix'></div>

                {this.state.addSearchCriteria && (
                    <div className='movies_list-wrapper-search_criteria_list'>
                        {this.searchCriterias.map((val) => {
                            return <div
                                className='movies_list-wrapper-search_criteria_list-item'
                                onClick={this.updateDefaultSearchCriterias}
                                key={val.id}
                            >
                                {val.title}
                            </div>
                        })}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        moviesList: state.moviesList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateMoviesList: moviesList => {
            dispatch(updateList(moviesList));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
