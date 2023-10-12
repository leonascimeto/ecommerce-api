import TokenGenerator from "../../src/domain/entity/TokenGenerator";
import User from "../../src/domain/entity/User";
import {test, expect} from "@jest/globals";

test("deve assinar um token", function () {
   const tokenGenerator = new TokenGenerator("secret");
   const user = User.create("leo@email.com", "123456");
   const token = tokenGenerator.sign(user, new Date("2023-03-01T10:00:00"));
   expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxlb0BlbWFpbC5jb20iLCJpYXQiOjE2Nzc2NzU2MDAwMDAsImV4cGlyZXNJbiI6NjA0ODAwMDAwfQ.Ueat-bJV7mNQsbZHPVz4lYakE_h4yJsMDWcTlNAqGPA")
});

test("deve verificar um token", function () {
   const tokenGenerator = new TokenGenerator("secret");
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxlb0BlbWFpbC5jb20iLCJpYXQiOjE2Nzc2NzU2MDAwMDAsImV4cGlyZXNJbiI6NjA0ODAwMDAwfQ.Ueat-bJV7mNQsbZHPVz4lYakE_h4yJsMDWcTlNAqGPA";
   const output = tokenGenerator.verify(token);
   expect(output.email).toBe("leo@email.com")
});