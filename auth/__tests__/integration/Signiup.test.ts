import {test, expect} from "@jest/globals";
import UserRepositoryDatabase from '../../src/infra/repository/UserRepositoryDatabase';
import Signup from '../../src/application/usecase/Signup';
import Login from '../../src/application/usecase/Login';
test("Deve fazer um signup", async function () {
   const userRepository = new UserRepositoryDatabase();
   const signup = new Signup(userRepository);
   const input = {
      email: "leo@emaul.com",
      password: "123456",
      date: new Date("2022-03-01T10:00:00")
   }
   await signup.execute(input);
   const login = new Login(userRepository);
   const output = await login.execute(input);
   expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxlb0BlbWF1bC5jb20iLCJpYXQiOjE2NDYxMzk2MDAwMDAsImV4cGlyZXNJbiI6NjA0ODAwMDAwfQ.gIhlF_rMnoNpAYsCXtrshsrafauWy2izCM2GelVepm8");
});