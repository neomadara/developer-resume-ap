import bcrypt from "bcrypt";
import app from "../../../app";
import * as Repository from "../../../src/user/repository";
import request from "supertest";

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true)
}));

const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

afterEach(() => {
  jest.resetAllMocks();
});

describe('POST Login User', () => {
  it('Should login successfully if user and password are correct', async () => {
    const userMock = {
      _id: 'userId',
      email: 'instanciageek@gmail.com',
      password: 'hashedPassword',
      isAdmin: false
    };

    const spyRepository = jest
      .spyOn(Repository, "FindUserByEmail")
      .mockResolvedValue(userMock);

    const res = await request(app)
      .post("/user/login")
      .send({
        email: "instanciageek@gmail.com",
        password: "123456"
      });

    expect(spyRepository).toHaveBeenCalled();
    expect(spyRepository).toHaveBeenCalledWith("instanciageek@gmail.com");
    expect(bcryptMock.compare).toHaveBeenCalledWith("123456", "hashedPassword");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
