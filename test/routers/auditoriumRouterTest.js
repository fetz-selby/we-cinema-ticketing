const assert = require('chai').assert;
const axios = require('axios');
const appConfig = require('../../config');

const baseUrl = 'http://127.0.0.1:'+appConfig.config.SERVER_PORT+'/wibas-etarate/ticket/api/v1/';

console.log('baseUrl => '+baseUrl);

let auditorium = {};

describe('List Auditoria API', function(){
    it('show auditoria has success', function(next){
        axios.get(baseUrl+'auditoria').then((res)=>{
            if(res.data){

                assert.exists(res.data.success, 'success exist');
                next();
            }
        })
    })

    it('show auditoria success should be true', function(next){
        axios.get(baseUrl+'auditoria').then((res)=>{
            if(res.data){

                assert.equal(res.data.success, true);
                next();
            }
        })
    })

    it('show auditoria has result', function(next){
        axios.get(baseUrl+'auditoria').then((res)=>{
            if(res.data){

                assert.exists(res.data.result, 'result exist');
                next();
            }
        })
    })

    it('show auditoria has result an is Array', function(next){
        axios.get(baseUrl+'auditoria').then((res)=>{
            if(res.data){

                assert(Array.isArray(res.data.result));

                //Grab an object from the list
                auditorium = res.data.result[0];
                next();
            }
        })
    })

    it('auditorium should have auditorium.auditorium_id', function(){
        assert.exists(auditorium.auditorium_id);
    })

    it('auditorium should have auditorium.movie_id', function(){
        assert.exists(auditorium.movie_id);
    })

    it('auditorium should have auditorium.movie_name', function(){
        assert.exists(auditorium.movie_name);
    })

    it('auditorium should have auditorium.day', function(){
        assert.exists(auditorium.day);
    })

    it('auditorium should have auditorium.time', function(){
        assert.exists(auditorium.time);
    })

    it('auditorium should have auditorium.size', function(){
        assert.exists(auditorium.size);
    })

    it('auditorium should have auditorium.price', function(){
        assert.exists(auditorium.price);
    })

    it('auditorium should have auditorium.seats', function(){
        assert.exists(auditorium.seats);
    })

    it('auditorium should have seats as array', function(){
        assert(Array.isArray(auditorium.seats));
    })
})


describe('Single Auditorium API', function(){
    it('show auditorium has success', function(next){
        axios.get(baseUrl+'auditoria/'+auditorium.auditorium_id).then((res)=>{
            if(res.data){

                assert.exists(res.data.success, 'success exist');
                next();
            }
        })
    })

    it('show auditorium success should be true', function(next){
        axios.get(baseUrl+'auditoria/'+auditorium.auditorium_id).then((res)=>{
            if(res.data){

                assert.equal(res.data.success, true);
                next();
            }
        })
    })

    it('show auditorium has result', function(next){
        axios.get(baseUrl+'auditoria/'+auditorium.auditorium_id).then((res)=>{
            if(res.data){

                assert.exists(res.data.result, 'result exist');
                next();
            }
        })
    })

    it('show auditorium has result an is Array', function(next){
        axios.get(baseUrl+'auditoria/'+auditorium.auditorium_id).then((res)=>{
            if(res.data){

                assert(Array.isArray(res.data.result));
                auditorium = res.data.result[0];
                next();
            }
        })
    })

    it('auditorium should have auditorium.auditorium_id', function(){
        assert.exists(auditorium.auditorium_id);
    })

    it('auditorium should have auditorium.movie_id', function(){
        assert.exists(auditorium.movie_id);
    })

    it('auditorium should have auditorium.movie_name', function(){
        assert.exists(auditorium.movie_name);
    })

    it('auditorium should have auditorium.day', function(){
        assert.exists(auditorium.day);
    })

    it('auditorium should have auditorium.time', function(){
        assert.exists(auditorium.time);
    })

    it('auditorium should have auditorium.size', function(){
        assert.exists(auditorium.size);
    })

    it('auditorium should have auditorium.price', function(){
        assert.exists(auditorium.price);
    })

    it('auditorium should have auditorium.seats', function(){
        assert.exists(auditorium.time);
    })

    it('auditorium should have auditorium.seats as array', function(){
        assert(Array.isArray(auditorium.seats));
    })
})