'use strict';

//Npm testing Modules
var  chai     = require('chai')
   , chaiHttp = require('chai-http')
   , server   = require('./app')
   , should   = chai.should()

chai.use(chaiHttp);

// no of records in output is 367 . I am  testing for 100, 10000, -100, ashok values

// This test for 100 which is less than 367
it('For 100 it should give correct result on /test POST', function(done) {
  let reqBody = {'Number': 100} ;
  chai.request(server)
    .post('/test')
    .send(reqBody)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('word');
      res.body[0].should.have.property('count');
      done();
    });

});

// This test for 10000 which is greater than 367. It is warning case
it('For 10000 it shouldnot give correct result on /test POST', function(done) {
  let reqBody = {'Number': 10000} ;
  chai.request(server)
    .post('/test')
    .send(reqBody)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('string');
      res.body.should.equal('The result array contains 367 records . Please enter a Number between 1 to 367')
      res.body[0].should.not.be.a('object');
      res.body[0].should.not.have.property('word');
      res.body[0].should.not.have.property('count');
      done();
    });

});

// This test for -100 which is negative number . It will give empty array
it('For -100 it should give empt array on /test POST', function(done) {
  let reqBody = {'Number': -100 } ;
  chai.request(server)
    .post('/test')
    .send(reqBody)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(0);
      done();
    });

});

// This test for ashok which is String value . It will give empty array
it('For ashok it should give empty array on on /test POST', function(done) {
  let reqBody = {'Number': 'ashok'} ;
  chai.request(server)
    .post('/test')
    .send(reqBody)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(0);
      done();
    });

});
