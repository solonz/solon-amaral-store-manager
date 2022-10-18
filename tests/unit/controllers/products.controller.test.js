const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const connection = require('../../../src/models/connection');
const productsController = require('../../../src/controllers/products.controller')
const productsService = require('../../../src/services/products.service');
const { products, productFound } = require('../mock/products.mock');

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
      sinon.stub(productsService, 'doesFindByIdWorks').resolves({ type: null, message: productFound });
      
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