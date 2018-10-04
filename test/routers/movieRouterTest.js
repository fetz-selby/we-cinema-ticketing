const assert = require('chai').assert;
const axios = require('axios');
const appConfig = require('../../config');

const baseUrl = 'http://127.0.0.1:'+appConfig.config.SERVER_PORT+'/wibas-eterate/ticket/api/v1/';


let movie = {};
let days = [];
let times = [];

describe('List Movies API', function(){
    it('show movies has success', function(next){
        axios.get(baseUrl+'movies').then((res)=>{
            if(res.data){

                assert.exists(res.data.success, 'success exist');
                next();
            }
        })
    })

    it('show movies success should be true', function(next){
        axios.get(baseUrl+'movies').then((res)=>{
            if(res.data){

                assert.equal(res.data.success, true);
                next();
            }
        })
    })

    it('show movies has result', function(next){
        axios.get(baseUrl+'movies').then((res)=>{
            if(res.data){

                assert.exists(res.data.result, 'result exist');
                next();
            }
        })
    })

    it('show movies has result an is Array', function(next){
        axios.get(baseUrl+'movies').then((res)=>{
            if(res.data){

                assert(Array.isArray(res.data.result));

                //Grab an object from the list

                movie = res.data.result[0];
                next();
            }
        })
    })

    it('movie should have movie.movie_id', function(){
        assert.exists(movie.movie_id);
    })

    it('movie should have movie.movie_name', function(){
        assert.exists(movie.movie_name);
    })

    it('movie should have movie.days', function(){
        assert.exists(movie.days);
    })

    it('movie should have movie.days as Array', function(){
        assert.exists(Array.isArray(movie.days));
        days = movie.days;
    })

    it('movie should have movie.days[0].day ', function(){
        assert.exists(days[0].day);
    })

    it('movie should have movie.days[0].times ', function(){
        assert.exists(days[0].times);
    })

    it('movie should have movie.days[0].times as Array', function(){
        assert(Array.isArray(days[0].times));
        times = days[0].times[0];
    })

    it('movie should have movie.days[0].times[0].auditorium_id', function(){
        assert.exists(times.auditorium_id);
    })

    it('movie should have movie.days[0].times[0].auditorium_name', function(){
        assert.exists(times.auditorium_name);
    })

    it('movie should have movie.days[0].times[0].time', function(){
        assert.exists(times.time);
    })

    it('movie should have movie.days[0].times[0].x_size', function(){
        assert.exists(times.x_size);
    })

    it('movie should have movie.days[0].times[0].y_size', function(){
        assert.exists(times.y_size);
    })

    it('movie should have movie.days[0].times[0].price ', function(){
        assert.exists(times.price);
    })
    
})


describe('Single Movie API', function(){
    it('show movie has success', function(next){
        axios.get(baseUrl+'movies/'+movie.movie_id).then((res)=>{
            if(res.data){

                assert.exists(res.data.success, 'success exist');
                next();
            }
        })
    })

    it('show movies success should be true', function(next){
        axios.get(baseUrl+'movies/'+movie.movie_id).then((res)=>{
            if(res.data){

                assert.equal(res.data.success, true);
                next();
            }
        })
    })

    it('show movies has result', function(next){
        axios.get(baseUrl+'movies/'+movie.movie_id).then((res)=>{
            if(res.data){

                assert.exists(res.data.result, 'result exist');
                next();
            }
        })
    })

    it('show movies has result an is Array', function(next){
        axios.get(baseUrl+'movies/'+movie.movie_id).then((res)=>{
            if(res.data){

                assert(Array.isArray(res.data.result));

                //Grab an object from the list

                movie = res.data.result[0];
                next();
            }
        })
    })

    it('movie should have movie.movie_id', function(){
        assert.exists(movie.movie_id);
    })

    it('movie should have movie.movie_name', function(){
        assert.exists(movie.movie_name);
    })

    it('movie should have movie.days', function(){
        assert.exists(movie.days);
    })

    it('movie should have movie.days as Array', function(){
        assert.exists(Array.isArray(movie.days));
        days = movie.days;
    })

    it('movie should have movie.days[0].day ', function(){
        assert.exists(days[0].day);
    })

    it('movie should have movie.days[0].times ', function(){
        assert.exists(days[0].times);
    })

    it('movie should have movie.days[0].times as Array', function(){
        assert(Array.isArray(days[0].times));
        times = days[0].times[0];
    })

    it('movie should have movie.days[0].times[0].auditorium_id', function(){
        assert.exists(times.auditorium_id);
    })

    it('movie should have movie.days[0].times[0].auditorium_name', function(){
        assert.exists(times.auditorium_name);
    })

    it('movie should have movie.days[0].times[0].time', function(){
        assert.exists(times.time);
    })

    it('movie should have movie.days[0].times[0].x_size', function(){
        assert.exists(times.x_size);
    })

    it('movie should have movie.days[0].times[0].y_size', function(){
        assert.exists(times.y_size);
    })

    it('movie should have movie.days[0].times[0].price ', function(){
        assert.exists(times.price);
    })
    
})