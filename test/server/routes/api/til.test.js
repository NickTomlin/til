'use strict';

var models = require('../../../../server/models');
var monky = require('../../support/factories');

describe('/api/til', function () {
  beforeEach(function (done) {
    this.validTil = {
      text: '#supertest is a great way to test api endpoints in #express'
    };

    models.user.findOne().then(function (user) {
      this.validTil.user = user._id;
      done();
    }.bind(this));
  });

  it('includes clientId in response if one exists', function (done) {
    this.validTil.clientId = 'myClientId';

    api
      .post('/api/til')
      .send(this.validTil)
      .expect(201)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body.til.text).to.eql(this.validTil.text);
        expect(res.body.til.clientId).to.eql('myClientId');
        done();
      }.bind(this));
  });

  it('does not persist clientId to DB', function (done) {
    this.validTil.clientId = 'myClientId';

    api
      .post('/api/til')
      .send(this.validTil)
      .expect(201)
      .end(function (err, res) {
        if (err) { done(err); }
        models.til
          .findOne({_id: res.body.til._id})
          .exec(function (findErr, savedTil) {
            if (err) { done(err); }
            expect(savedTil).to.not.have.property('clientId');
            done();
          });
      });
  });

  it('adds comments to a til', function (done) {
    models.til
      .findOne({})
      .exec(function (err, til) {
        api
        .put('/api/til/comments')
        .send({
          tilId: til._id,
          userId: til.user,
          text: '#mocha is great'
        })
        .expect(201, function (respError, res) {
          if (respError) { done(respError); }

          expect(JSON.stringify(res.body.til.comments)).to.contain('#mocha is great');
          done();
        });
      });
  });

  it('includes til users on top level of response', function (done) {
    api
      .get('/api/til')
      .expect(200, function (respError, res) {
        expect(res.body.user[0]).to.have.property('displayName');
        done();
      });
  });

  it('includes a userId on til', function (done) {
    api
      .get('/api/til')
      .expect(200, function (respError, res) {
        expect(res.body.til[0]).to.have.property('userId');
        done();
      });
  });

  it('includes comments in til results', function (done) {
    monky.buildList('comment', 3, function (createErr, createdComments) {
      monky.create('til', {
        comments: createdComments
      }).then(function (til) {
        api
          .get('/api/til')
          .expect(200, function (err, res) {
            if (err) { done(err); }
            var comments = res.body.til.filter(function (t) {
              return t._id == til._id; // eslint-disable-line eqeqeq
            })[0].comments;

            expect(comments.length).to.be.above(1);
            done();
          });
      });
    });
  });

  describe('error handling', function () {
    beforeEach(function () {
      this.invalidTil = {
        foo: 'bar',
        clientId: 'client-id'
      };
    });

    it('does not allow creation of invalid models', function (done) {
      api
      .post('/api/til')
      .send(this.invalidTil)
      .expect(400, function (err, res) {
        if (err) { done(err); }
        expect(res.body).to.have.property('errors');
        expect(res.body.clientId).to.equal(this.invalidTil.clientId);
        done();
      }.bind(this));
    });

    it('purposefully rejects tils with a text value of fail', function (done) {
      this.validTil.text = 'fail';
      api
        .post('/api/til')
        .send(this.validTil)
        .expect(400, function (err, res) {
          if (err) { done(err); }
          expect(res.body.errors.text.message).to.match(/purposefully/i);
          done();
        });
    });
  });
});
