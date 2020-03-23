var expect = require('chai').expect;
const IhelloWorld = require('../intentHandlers/HelloWorldIntentHandler');

describe('helloWorldIntent', function () {
    it('check if work', function () {

        // 1. ARRANGE
        let requestEnvelope = require('./requests/intent_request_helloWorld');

        let handlerInput = {
            requestEnvelope
        }

        // 2. ACT
        let canHandle = IhelloWorld.canHandle(handlerInput);
        // let handle=IhelloWorld.handle(handlerInput);
        // console.log('handle: ', handle);
        // 3. ASSERT
        expect(canHandle).to.be.equal(true);

    });
});