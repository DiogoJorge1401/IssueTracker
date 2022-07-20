import chaiHttp from "chai-http";
import chai from "chai";
const assert = chai.assert;
import server from "../src/server";
import { suite, test } from "mocha";

chai.use(chaiHttp);

let id1 = "",
  id2 = "";

suite("Functional Tests", () => {
  suite("POST /api/issues/{project} => Create issue", () => {
    test("should create an issue with valid fields", (done) => {
      chai
        .request(server)
        .post("/api/issues/test1")
        .send({
          issue_title: "issue_title_test1",
          issue_text: "issue_title_test1",
          created_by: "created_by_test1",
          assigned_to: "assigned_to_test1",
          status_text: "status_text_test1",
        })
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.project, "test1");
          assert.isOk(res.body._id);
          assert.isOk(res.body.created_on);
          assert.isOk(res.body.updated_on);
          assert.isTrue(res.body.open);
          id1 = res.body._id;
          done();
        });
    });

    test("should create an issue with only required fields", (done) => {
      chai
        .request(server)
        .post("/api/issues/test2")
        .send({
          issue_title: "issue_title_test2",
          issue_text: "issue_title_test2",
          created_by: "created_by_test2",
        })
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.project, "test2");
          assert.isOk(res.body._id);
          assert.isOk(res.body.created_on);
          assert.isOk(res.body.updated_on);
          assert.isTrue(res.body.open);
          id2 = res.body._id;
          done();
        });
    });

    test("should fail to create an issue with missing required fields", (done) => {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({})
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "required field(s) missing");
          done();
        });
    });
  });

  suite("GET /api/issues/{project} => View issues", () => {
    test("should view isssues", (done) => {
      // assert.fail()
      // done()
    });

    test("should view isssues with one filter", (done) => {
      // assert.fail()
      // done()
    });

    test("should view isssues with multiple filter", (done) => {
      // assert.fail()
      // done()
    });
  });

  suite("PUT /api/issues/{project} => Update issue", () => {
    test("should update one field on an issue", (done) => {
      // assert.fail()
      // done()
    });

    test("should update multiple fields on an issue", (done) => {
      // assert.fail()
      // done()
    });

    test("should update an issue with missing _id", (done) => {
      // assert.fail()
      // done()
    });

    test("should update an issue with no field to update", (done) => {
      // assert.fail()
      // done()
    });

    test("should update an issue with an invalid _id", (done) => {
      // assert.fail()
      // done()
    });
  });

  suite("DELETE /api/issues/{project} => Delete issue", () => {
    test("should delete an issue", (done) => {
      // assert.fail()
      // done()
    });

    test("should delete an issue with an invalid _id", (done) => {
      // assert.fail()
      // done()
    });

    test("should delete an issue with missing _id", (done) => {
      // assert.fail()
      // done()
    });
  });
});
