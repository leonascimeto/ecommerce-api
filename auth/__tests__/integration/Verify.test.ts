import {test, expect} from "@jest/globals";
import Verify from "../../src/application/usecase/Verify";

test("Deve verificar o token", async function () {
   const verify = new Verify();
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxlb0BlbWFpbC5jb20iLCJpYXQiOjE2NDYxMzk2MDAwMDAsImV4cGlyZXNJbiI6NjA0ODAwMDAwfQ.MrdpqDGI1NyZojkzgWvthx1kabtMrPboXIK1zjNlGbE"
   const output = await verify.execute(token);
   expect(output.email).toBe("leo@email.com");
})