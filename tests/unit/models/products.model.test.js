const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { products, productFound, createProduct } = require('../mock/products.mock');

describe('Model tests', function () {
  afterEach(sinon.restore);

  describe('Tests findAll', function () {
    it('must return all products', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(products);
    })

    describe('Tests findById', function () {
      it('Must return one product', async function () {
        sinon.stub(connection, 'execute').resolves([productFound]);
        const result = await productsModel.findById(1);
        expect([result]).to.be.deep.equal(productFound);
      })
    })
    describe('Tests createProduct', function () {
      it('Must create', async function () {
        sinon.stub(connection, 'execute').resolves([{insertId: 4}]);
        const result = await productsModel.createProduct(createProduct[0].name);
        expect(result).to.be.deep.equal(4);
      })
    })
  })
});
