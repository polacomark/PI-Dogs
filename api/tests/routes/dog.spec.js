/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
// const dog = {
//   name: 'Pug',
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Dog.sync({ force: true })
//     .then(() => Dog.create(dog)));
//   describe('GET /dogs', () => {
//     it('should get 200', () =>
//       agent.get('/dogs').expect(200)
//     );
//   });
// });

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

describe('/dogs', function() {//solicito que responda con un estado 200 si se cumple la ruta.
  it('GET respond with a status 200', function(){
    return agent
      .get('/dogs')
      .expect(function(res){
        expect(res.status).equal(200)})
  });
})
describe('/dogs?name=', function() { // respondo si se encuentra el dog por name.
  it('GET responds with a status 200 if it finds a dog', function() {
    return agent 
      .get('/dogs?name=Pug') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
  });
})
});