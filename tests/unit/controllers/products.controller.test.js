const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const connection = require('../../../src/models/connection');
const productsController = require('../../../src/controllers/products.controller')
const productsService = require('../../../src/services/products.service');
const { products, productFound, createProduct } = require('../mock/products.mock');

describe('Controller tests', function () {
  afterEach(sinon.restore);

  describe('Tests listAllProducts and getProducts', function () {
    it('must return code 200 with all products', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'doesFindByIdWorks').resolves({ type: null, message: products });
      
      await productsController.listAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
    })

    it('must return code 200 with product', async function () {
      const req = { params: { id: 1}, body: {} };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'doesFindByIdWorks').resolves({ type: null, message: createProduct });
      
      await productsController.getProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
    })

    it('must return code 404 with INVALID_PRODUCT', async function () {
      const req = { params: { id: 99}, body: {} };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'doesFindByIdWorks').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'product not found' });
      
      await productsController.getProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
    })
  })
});

describe('Tests createProduct', function () {
  it('must return code 201 with all products', async function () {
    const req = {body: {name: 'Manopla de Thanos'}};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const productCreated = { id: 4, name: 'Manopla de Thanos' }
    sinon.stub(productsService, 'doesCreateProductWorks').resolves({ type: null, message: productCreated });

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreated);
  })
});
