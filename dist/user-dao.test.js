"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const user_dao_1 = require("./user-dao");
const tsmongo_1 = require("tsmongo");
const expect = chai.expect;
describe('UserDAO', () => {
    tsmongo_1.setupTests.connectTestToDatabase();
    it('should be able to create user (only once)', function (done) {
        const user = {
            email: 'hans'
        };
        user_dao_1.userDAO.create(user, '1234', (dbResponse) => {
            expect(dbResponse.error).to.be.null;
            expect(dbResponse.data.uid).to.exist;
            user_dao_1.userDAO.create(user, '1234', (innerDbResponse) => {
                expect(innerDbResponse.error).to.exist;
                expect(innerDbResponse.error.message).to.equal('User already exists');
                done();
            });
        });
    });
});
