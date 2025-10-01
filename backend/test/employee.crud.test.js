const request = require('supertest');
process.env.NODE_ENV = 'test';
process.env.CONNECT_DB = 'false';
const app = require('../index');

describe('Employee CRUD API', () => {
  it('should create an employee', async () => {
    const res = await request(app)
      .post('/api/v1/employee/createEmployee')
      .send({
        name: 'Alice Doe',
        email: 'alice@example.com',
        position: 'Engineer',
        dateOfJoining: '2024-01-15'
      })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.savedDetails).toBeDefined();
    expect(res.body.savedDetails.email).toBe('alice@example.com');
  });

  it('should list employees', async () => {
    const res = await request(app)
      .get('/api/v1/employee/employeeDetails')
      .expect(200);
    expect(res.body.success).toBe(true);
  });

  it('should get individual employee', async () => {
    const create = await request(app)
      .post('/api/v1/employee/createEmployee')
      .send({ name: 'Bob', email: 'bob@example.com', position: 'HR', dateOfJoining: '2023-05-01' })
      .expect(200);
    const id = create.body.savedDetails._id;

    const res = await request(app)
      .get(`/api/v1/employee/employeeDetails/${id}`)
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(id);
  });

  it('should edit employee', async () => {
    const create = await request(app)
      .post('/api/v1/employee/createEmployee')
      .send({ name: 'Carl', email: 'carl@example.com', position: 'Ops', dateOfJoining: '2022-02-02' })
      .expect(200);
    const id = create.body.savedDetails._id;

    const res = await request(app)
      .put(`/api/v1/employee/editEmployee/${id}`)
      .send({ position: 'Ops Lead' })
      .expect(200);
    expect(res.body.success).toBe(true);
  });

  it('should delete employee', async () => {
    const create = await request(app)
      .post('/api/v1/employee/createEmployee')
      .send({ name: 'Dan', email: 'dan@example.com', position: 'QA', dateOfJoining: '2021-06-10' })
      .expect(200);
    const id = create.body.savedDetails._id;

    const res = await request(app)
      .delete(`/api/v1/employee/deleteEmployee/${id}`)
      .expect(200);
    expect(res.body.success).toBe(true);
  });
});


