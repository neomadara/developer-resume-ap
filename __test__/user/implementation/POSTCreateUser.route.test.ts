import request from "supertest"
import app from "../../../app"
import * as Repository from "../../../src/user/repository"

afterEach(() => {
  jest.resetAllMocks();
});

describe('POST Create User', () => {
  it('Should register a user successfully',  async () => {
    const spyRepository = jest
      .spyOn(Repository, "CreateUser")
      .mockResolvedValue({message: 'user was created successfully'})

    const res = await request(app)
      .post("/user/register").send({
        email: "instanciageek@gmail.com",
        password: "123456"
      })

    expect(spyRepository).toHaveBeenCalled()
    expect(spyRepository).toHaveBeenCalledWith("instanciageek@gmail.com", "123456")
    expect(res.status).toEqual(201)
    expect(res.body).toEqual({
      message: 'user was created successfully'
    })
  })
});
