import { faker } from '@faker-js/faker';
describe('Restfull API ', () => {
    it("Create Token Request", () => {
        let token;
        cy.request({
            method: "POST",
            url:  "https://restful-booker.herokuapp.com/auth",
            body: {
                "username": "admin",
                "password": "password123"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("token");
            token = response.body.token;
        })
    });

    it("Create Booking Request", () => {
        let firstname;
        let lastname;
        firstname = faker.person.firstName();
        lastname = faker.person.lastName();
        cy.request({
            method: "POST",
            url:  "https://restful-booker.herokuapp.com/booking",
            body: {
                "firstname" : firstname,
                "lastname" : lastname,
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.booking).to.have.property("firstname");
                expect(response.body.booking).to.have.property("lastname");
                expect(response.body.booking).property('firstname').to.equal(firstname);
                expect(response.body.booking).property('lastname').to.equal(lastname);

        });
    });

    it("Get Token Request", () => {
        cy.request({
            method: "GET",
            url:  "https://restful-booker.herokuapp.com/booking",
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("firstname");
            expect(response.body).to.have.property("lastname");
            expect(response.body).property('firstname').to.equal("Jim");
            expect(response.body).property('lastname').to.equal("Brown");
        })
    });

});
