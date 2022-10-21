const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const connection = require('../../../src/models/connection');
const productsController = require('../../../src/controllers/products.controller')
const productsService = require('../../../src/services/products.service');
const { products, productFound, createProduct } = require('../mock/products.mock');
const nameValidation = require('../../../src/services/validations/nameValidation');

describe('Controller tests', function () {
  afterEach(sinon.restore);

  describe('Tests listAllProducts and getProducts', function () {
    afterEach(sinon.restore);
    it('must return code 200 with all products', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves({ type: null, message: products });
      
      await productsController.findAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
    })

    it('must return code 200 with product', async function () {
      const req = { params: { id: 1}, body: {} };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves({ type: null, message: createProduct });
      
      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    })

    it('must return code 201 with product 2', async function () {
      const req = { body: {name: 'ewerton'} };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({ type: null, message: createProduct });
      
      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createProduct);
    })

    // it('must return code 404 with product ', async function () {
    //   const req = null;
    //   const res = {};
    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();
    //   sinon.stub(productsService, 'findAll').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found'});
      
    //   await productsController.findAll(req, res);
    //   expect(res.status).to.have.been.calledWith(404);
    //   expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    // })

    it('must return code 404 with INVALID_PRODUCT', async function () {
      const req = { params: { id: 99}, body: {} };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'product not found' });
      
      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    })
  })
});

describe('Tests createProduct', function () {
  it('controll must fail create', async function () {
    const res = {};
    const req = {
      body: { name: 'Ma' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon.stub(productsService, 'createProduct').resolves({ type: 'INVALID_NAME', message: 'Invalid name' });
  
    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    // expect(res.json).to.have.been.calledWith({ response: { message: 'Invalid name' } });
  });
});

describe('Tests nameValidation', function () {
    it('retorna erro se não tem nome', async function () {
      const req = { body: { name: '' } }
      const res = {};
      const message = '"name" is required';

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await nameValidation(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: message });
    }); 
  });
// describe('Tests nameValidation', function () {
//     it('retorna ok se tem nome', async function () {
//       const req = { body: { name: 'a' } }
//       const res = {};
//       const next = sinon.stub().returns();
     
//       res.status = sinon.stub().returns(res);
//       res.json = sinon.stub().returns();

//       await nameValidation(req, res, next);

//       expect(next).to.have.been.called();
//     }); 
//   });

