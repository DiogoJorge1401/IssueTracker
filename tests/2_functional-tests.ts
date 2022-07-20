import chaiHttp from 'chai-http';
import chai from 'chai';
const assert = chai.assert;
import server from '../src/server';
import { suite, test } from 'mocha';

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('POST /api/issues/{project} => Create issue', () => {

    test('should create an issue with valid fields', (done) => {
      return chai
        .request(server)
        .get('/api/issues/apitest')
        .send({ issue_title: 'test', issue_text: 'test', created_by: 'test', assigned_to: '', status_text: '' })
        .then(res=>{
          console.log(res.body);
          assert.equal(res.status, 200)
          assert.isOk(res.body._id)
          assert.isOk(res.body.created_on)
          assert.isOk(res.body.updated_on)
          assert.isTrue(res.body.open)
          done()

        })
    })

    test('should create an issue with only required fields', (done) => {
      assert.fail()
      done()
    })

    test('should create an issue with missing required fields', (done) => {
      assert.fail()
      done()
    })
  })

  suite('GET /api/issues/{project} => View issues', () => {

    test('should view isssues', (done) => {
      assert.fail()
      done()
    })

    test('should view isssues with one filter', (done) => {
      assert.fail()
      done()
    })

    test('should view isssues with multiple filter', (done) => {
      assert.fail()
      done()
    })

  })

  suite('PUT /api/issues/{project} => Update issue', () => {

    test('should update one field on an issue', (done) => {
      assert.fail()
      done()
    })

    test('should update multiple fields on an issue', (done) => {
      assert.fail()
      done()
    })

    test('should update an issue with missing _id', (done) => {
      assert.fail()
      done()
    })

    test('should update an issue with no field to update', (done) => {
      assert.fail()
      done()
    })

    test('should update an issue with an invalid _id', (done) => {
      assert.fail()
      done()
    })

  })
  suite('DELETE /api/issues/{project} => Delete issue', () => {

    test('should delete an issue', (done) => {
      assert.fail()
      done()
    })

    test('should delete an issue with an invalid _id', (done) => {
      assert.fail()
      done()
    })

    test('should delete an issue with missing _id', (done) => {
      assert.fail()
      done()
    })

  })
});
