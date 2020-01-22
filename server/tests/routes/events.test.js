import request from "supertest";
import server from "../../server";
// The following import prevents 'expected 200 "OK", got 415 "Unsupported Media Type"' bug on post req tests.
// Bug is caused by lazy loading on jests' part.
// https://stackoverflow.com/questions/49141927/express-body-parser-utf-8-error-in-test?rq=1
import "../../../node_modules/iconv-lite/encodings";
// TEST DATA
import eventData from "../data/eventData";
const testUserID = "testUserID";
const testEventName = "testName";

eventData.creator_uid = testUserID;
eventData.name = testEventName;

describe("Should test / Route", () => {
  it.only("should GET JSON and 200 response.", done => {
    return request(server)
      .get("/events/")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

describe("Should test /get_event_by_id Route", () => {
  it.only("Should POST id and Recieve JSON Object with 200 response", done => {
    const eventId = "5dfc32c652af8b4116985149";
    return request(server)
      .post("/events/get_event_by_id")
      .send({
        event_id: eventId
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body._id).toEqual(eventId);
        done();
      });
  });

  it.only("Should POST incorrect id and recieve incorrect id back and 404 response.", done => {
    const wrongId = "wrong ID";
    return request(server)
      .post("/events/get_event_by_id")
      .send({
        event_id: wrongId
      })
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body._id).toEqual(wrongId);
        done();
      });
  });
});

describe("Should test /create_event Route", () => {
  it.only("Should POST new event object data and recieve status 200, creator_uid, and name.", done => {
    return request(server)
      .post("/events/create_event")
      .send(eventData)
      .set("Accept", "application/json")
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.creator_uid).toEqual(testUserID);
        done();
      });
  });

  // TODO: #77 - Reimplement this after setting rules on event data in the model
  //
  // it.only("Should POST invalid new event data and recieve status 500", done => {
  //   return request(server)
  //     .post("/events/create_event")
  //     .send({})
  //     .set("Accept", "application/json")
  //     .expect(500)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       done();
  //     });
  // });
});

describe("Should test /my_events route", () => {
  it.only("Should POST user id and recieve status 200 and user's events as an array of objects", done => {
    return request(server)
      .post("/events/my_events")
      .send({
        spotify_uid: testUserID
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  // TODO: #78
  // it.only("Should POST incorrect user id and recieve 500", () => {
  //   const wrongId = "Wrong ID";
  //   return request(server)
  //     .post("/events/my_events")
  //     .send({
  //       spotify_uid: wrongId
  //     })
  //     .set("Accept", "application/json")
  //     .expect(500)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       done();
  //     });
  // });
});

// describe("Should test /follow_event and /unfollow_event route", () => {
//   it.only("Should POST to /follow_event user id and event id to recieve 200 and follow identifier", done => {
//     const eventID = "5dfc32b152af8b4116985139";
//     request(server)
//       .post("/events/follow_event")
//       .send({
//         spotify_uid: testUserID,
//         event_id: eventID
//       })
//       .set("Accept", "application/json")
//       .expect(201)
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       });
//   });

//   it.only("Should POST to /unfollow_event user id and event id to recieve 200", done => {
//     const eventID = "5dfc32b152af8b4116985139";
//     request(server)
//       .post("/events/unfollow_event")
//       .send({
//         spotify_uid: testUserID,
//         event_id: eventID
//       })
//       .set("Accept", "application/json")
//       .expect(200)
//       .end((err, res) => {
//         console.log(res.body);

//         if (err) throw err;
//         console.log(res.body);
//         done();
//       });
//   });
// });
