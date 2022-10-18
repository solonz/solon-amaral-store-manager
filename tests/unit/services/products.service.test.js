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
      const result = await productsService.doesFindAllWorks();
      expect(result.message).to.deep.equal(products);
    })

    describe('Tests findById', function () {
      it('Must return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(productFound);
        const result = await productsService.doesFindByIdWorks(1);
        expect(result.type).to.equal(null);
      })
    })

    describe('Tests findById fails', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(null);
        const result = await productsService.doesFindByIdWorks(99);
        expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      })
    })

    describe('Tests findById fails 2', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(undefined);
        const result = await productsService.doesProductExist(99);
        expect(result.message).to.equal('Invalid product');
      })
    })

    describe('Tests findById fails 3', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves(true);
        const result = await productsService.doesProductExist(10);
        expect(result).to.be.deep.equal(true);
      })
    })

    describe('Tests findById fails 4', function () {
      it('Must not return one product', async function () {
        sinon.stub(productsModel, 'findById').resolves('INVALID_PRODUCT');
        const result = await productsService.doesProductExist('Asad');
        expect(result.type).to.equal('INVALID_PRODUCT');
      })
    })
  })
});
