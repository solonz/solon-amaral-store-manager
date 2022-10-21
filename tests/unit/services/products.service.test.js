const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model')
const productsService = require('../../../src/services/products.service');
const { products, productFound } = require('../mock/products.mock');

describe('Service tests', function () {
  afterEach(sinon.restore);

  describe('Tests service functions', function () {
    it('must return all products', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const result = await productsService.findAll();
      expect(result.message).to.deep.equal(products);
    })

    describe('Tests findById', function () {
      it('Must return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(productFound);
        const result = await productsService.findById(1);
        expect(result.type).to.equal(null);
      })
    })

    describe('Tests findById fails', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(null);
        const result = await productsService.findById(99);
        expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      })
    })

    describe('Tests findById fails 2', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(undefined);
        const result = await productsService.findById(99);
        expect(result.message).to.equal('Product not found');
      })
    })

    describe('Tests findById fails 3', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(true);
        const result = await productsService.findById(10);
        expect(result.message).to.be.deep.equal(true);
      })
    })

    describe('Tests findById fails 4', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves('INVALID_PRODUCT');
        const result = await productsService.findById('Asad');
        expect(result.type).to.equal('INVALID_VALUE');
      })
    })
    describe('Tests createProduct', function () {
      it('Must create 1', async function () {
        const newProductData = {id: 4, name: 'Manopla de Thanos'}
        sinon.stub(productsModel, 'createProduct').resolves(4);
        sinon.stub(productsModel, 'findById').resolves(newProductData);
        const result = await productsService.createProduct('Manopla de Thanos');
        expect(result.type).to.equal(null);
      })
    })
    describe('Tests createProduct', function () {
      it('Must fail create', async function () {
        sinon.stub(productsModel, 'createProduct').resolves({id: 1, name: 'Martelo de Thor' });
        const result = await productsService.createProduct({ name: 'Martelo de Thor' });
        expect(result.type).to.be.equal('INVALID_VALUE');
        expect(result.type).to.be.equal('INVALID_VALUE');
      })
    })
    describe('Tests createProduct', function () {
      it('Must fail create', async function () {
        sinon.stub(productsModel, 'createProduct').resolves('a');
        const result = await productsService.findById('a');
        expect(result.type).equal('INVALID_VALUE');
        expect(result.message).equal('"id" must be a number');
      })
    })
  })
});
