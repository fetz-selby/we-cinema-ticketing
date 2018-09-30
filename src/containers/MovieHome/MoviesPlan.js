import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import MovieTile from '../../components/MovieControls/MovieTile';
import '../../styles/movie.css';



class MoviesPlan extends Component{

    
    renderMovies = (movies) => {
        return movies.map((movie)=>{
            return <MovieTile title={movie.title} days={}></MovieTile>
        })
    }

    render(){
        return(
        <div className='movie-container'>
            
        </div>
        );
    }

}

const mapStateToProps = state =>{
    return {
        allMovies : state.movies
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onTimeInvoked : (auditoriumId) => dispatch(actionCreators.showAuditorium(auditoriumId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPlan);
