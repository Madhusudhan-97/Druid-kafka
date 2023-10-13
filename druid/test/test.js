var chai = require('chai')
var spies = require('chai-spies')
const { describe } = require('mocha')
chai.use(spies)
var expect = chai.expect;
const nock = require('nock')
var should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { app, request1 } = require('/home/madhusudhangs/kafkajs/druid/api');
const request = require('supertest');
describe('POST /create', () => {
    it('datasource created', async () => {
        const ingestionSpec = {}
        const scope = nock('http://localhost:8888')
            .post('/druid/indexer/v1/supervisor', ingestionSpec)
            .reply(200, { success: true });

        const res = await request(app)
            .post('/createdatasource')
        expect(res.status).to.equal(200);
        res.body.should.be.an("object");
        scope.isDone().should.be.true;
    });
    
    it('should return 400 with response', async () => {
        const ingestionSpec = {} ;
        const scope = nock('http://localhost:8888')
          .post('/druid/indexer/v1/supervisor', ingestionSpec)
          .reply(400, "Bad Request");
    
        const res = await request(app)
          .post('/createdatasource');
          res.body.statusCode.should.be.equal(400);
           res.body.should.be.an("object");
          scope.isDone().should.be.true;
    
       
      });
      it('should return a 500 error if there is an error with the request', async () => {
        const ingestionSpec = {  };
        const druidUrl = 'http://localhost:8888';
        nock(druidUrl)
          .post('/druid/indexer/v1/supervisor',ingestionSpec)
          .replyWithError('Something went wrong');
    
        const res = await request(app)
          .post('/createdatasource')
          .send(ingestionSpec);
          
        expect(res.statusCode).to.equal(500);
      });
    })


describe('query', () => {
    it('data retrieved', async () => {
        const query = {}
        const scope = nock('http://localhost:8888')
            .post('/druid/v2/sql', query)
            .reply(200, { success: true });

        const res = await request(app)
            .post('/query')
        expect(res.status).to.equal(200);
        res.body.should.be.an("object");
         scope.isDone().should.be.true;
    });


    it('error', async () => {
        const query = {}
        const scope = nock('http://localhost:8888')
            .post('/druid/v2/sql', query)
            .reply(500, "error");

        const res = await request(app)
            .post('/query')
            expect(res.status).to.equal(500);
            res.body.should.be.an("object");
           scope.isDone().should.be.true;
    });

})
describe('native query', () => {
    it('data retrieved', async () => {
        const nquery = {}
        const scope = nock('http://localhost:8888')
            .post('/druid/v2/?pretty', nquery)
            .reply(200, { success: true });

        const res = await request(app)
            .post('/nativequery')
        expect(res.status).to.equal(200);
        res.body.should.be.an("object");
         scope.isDone().should.be.true;
    });
    it('error', async () => {
        const nquery = {}
        const scope = nock('http://localhost:8888')
            .post('/druid/v2/?pretty', nquery)
            .reply(500, "error");

        const res = await request(app)
            .post('/nativequery')
        expect(res.status).to.equal(500);
        res.body.should.be.an("object");
         scope.isDone().should.be.true;
    });

    

})