const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('request');
const legalesign = require('../lib/legalesign');

describe('Legalesign', function() {
  beforeEach(function() {
    this.client = legalesign('testkey', 'testsecret', {
      url: 'testurl'
    });
  });

  describe('resetOptions', function() {
    it('should not reset a custom url', function() {
      this.client.resetOptions();

      expect(this.client.getDefaultURL()).to.equal('testurl');
    });
  });

  describe('send', function() {
    it('should return an error if the response was not 201', function() {
      let stub = sinon.stub(request, 'post').yields(null, { statusCode: 500 }, null);
      let spy = sinon.spy();

      this.client.send({ test: true }, spy);

      let response = spy.getCall(0).args[0];
      expect(response).to.be.an('Error');
      expect(response.message).to.equal(
        'Legalesign Error: Please review Group, Signer(s) and other related document information');

      stub.restore();
    });

    it('should return the body and headers if successful', function() {
      let response = { test: 'test' };
      let headers = { statusCode: 201, headers: response };
      let stub = sinon.stub(request, 'post').yields(null, headers, response);
      let spy = sinon.spy();

      this.client.send({ test: true }, spy);

      expect(spy.calledWith(null, response, response)).to.be.true;

      stub.restore();
    });

    it('should return an error if request yields an error', function() {
      let stub = sinon.stub(request, 'post').yields('error', null, null);
      let spy = sinon.spy();

      this.client.send({ test: true }, spy);

      expect(spy.calledWith('error', null)).to.be.true;

      stub.restore();
    });
  });
});
