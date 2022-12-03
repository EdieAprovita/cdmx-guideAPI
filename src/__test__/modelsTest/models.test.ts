import userSchema from "../../models/User";

describe('Check Models', () => {
    test('Check User Model', () => {
        expect(userSchema).toBeDefined();
    });

})