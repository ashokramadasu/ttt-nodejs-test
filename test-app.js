var  chai     = require('chai')
   , chaiHttp = require('chai-http')
   , server   = require('./app')
   , should   = chai.should()

chai.use(chaiHttp);

describe('/test POST', () => {
it('should give a JSON array on /test POST', function(done) {
  var reqBody = {'Number': 100} ;
  chai.request(server)
    .post('/test')
    .send(reqBody)
    .end(function(err, res, body){
      res.should.have.status(200);
      res.should.be.json;
      body.should.be.a('array');
      body[0].should.be.a('object');
      body[0].should.have.property('word');
      body[0].should.have.property('count');
      done();
    });
});

});
