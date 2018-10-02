import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import MovieTile from '../../components/MovieControls/MovieTile';
import MovieHeader from '../../components/MovieControls/MovieHeader';
import '../../styles/movie.css';

class MoviesPlan extends Component{

    componentWillMount(){
        this.props.loadMovies();
    }
    
    renderMovies = (movies) => {
        return movies.map((movie)=>{
            return <MovieTile key={movie.movie_id} title={movie.movie_name} days={movie.days}></MovieTile>
        })
        
    }

    render(){
        return(
        <div className='movie-container'>
            <MovieHeader caption='Online Cinema Ticket' pref='wibas eterate'></MovieHeader>
            {this.renderMovies(this.props.allMovies)}
        </div>
        );
    }

}

const mapStateToProps = state =>{
    return {
        allMovies : state.movie.movies
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        loadMovies : () => dispatch(actionCreators.loadMovies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPlan);
