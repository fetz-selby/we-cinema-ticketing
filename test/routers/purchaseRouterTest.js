const assert = require('chai').assert;
const axios = require('axios');
const appConfig = require('../../config');

const baseUrl = 'http://127.0.0.1:'+appConfig.config.SERVER_PORT+'/wibas-eterate/ticket/api/v1/';

console.log('baseUrl => '+baseUrl);

let movies = {};
let movie_id = 0;
let auditorium_id = 0;
let seats = [];
let selected_seats = [];
let gen_code = '';

//Grab a movie first
describe('Secure and Purchase seat(s)', function(){

    it('fetch for movies', function(next){
        axios.get(baseUrl+'movies').then((res)=>{
            if(res.data){
    
                assert.equal(res.data.success, true);
                movies = res.data;
                movie_id = movies.result[0].movie_id;
                next();
            }
        })
    })

    it('movie has auditorium_id', function(next){
        axios.get(baseUrl+'movies/'+movie_id).then((res)=>{
            if(res.data){
    
                auditorium_id = res.data.result[0].days[0].times[0].auditorium_id;
                assert.isAbove(auditorium_id, 0);
                next();
            }
        })
        
    })

    it('auditorium_id should have seats', function(next){
        axios.get(baseUrl+'auditoria/'+auditorium_id).then((res)=>{
            if(res.data){
    
                seats = res.data.result[0].seats;
                assert.isNotNull(seats);
                next();
            }
        })
    })

    it('seats should be an Array', function(){

        assert(Array.isArray(seats));

    })

    it('selected seats should be 2', function(){
        selected_seats.push(seats[0].id);
        selected_seats.push(seats[1].id);

        assert.equal(selected_seats.length, 2)
    })
    

    //Secure the seats
    it('secure seats for purchase', function(next){
        axios.post(baseUrl+'secure_ticket/', {seats : selected_seats}).then((res)=>{
            if(res.data.success){
                gen_code = res.data.result.code;
                assert.isNotNull(gen_code);
                assert.equal(gen_code.length, 6);
                next();
            }
        })
    })

    it('purchase secured seats', function(next){
        const fullname = 'John Doe';
        const card = '1234567890987654';
        const code = '789';
        const expire_month = '12';
        const expire_year = '2020';

        axios.post(baseUrl+'purchase_ticket', {fullname,code,card,expire_month,expire_year,gen_code,seat: selected_seats}).then((res)=>{
            if(res.data){
                assert.isNotNull(res.data);
                next();
            }
        }).catch((err)=>{
            console.log(err);
        })
    })

   
})