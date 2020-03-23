'use strict';

import { expect } from 'chai';

export class Assertion {

    checkResponseStructure(response) {
        expect(response).to.have.property("version");
        expect(response.version).to.be.equal("1.0");
        expect(response).to.have.property("response");
    }

    checkOutputSpeach(response) {
        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("outputSpeech");
        expect(r.outputSpeech).to.have.property("type");
        expect(r.outputSpeech.type).to.equal('SSML');
        expect(r.outputSpeech).to.have.property("ssml");

        let os = r.outputSpeech;

        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');
    }

    checkNoOutputSpeach(response) {

        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.not.have.property("outputSpeech");

    }

    checkOutputSpeachContains(response, text) {

        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("outputSpeech");
        expect(r.outputSpeech).to.have.property("type");
        expect(r.outputSpeech.type).to.equal('SSML');
        expect(r.outputSpeech).to.have.property("ssml");

        let os = r.outputSpeech;
        expect(os.ssml).to.contains(text);
        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');
    }

    checkOutputSpeachDoesNotContains(response, text) {

        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("outputSpeech");
        expect(r.outputSpeech).to.have.property("type");
        expect(r.outputSpeech.type).to.equal('SSML');
        expect(r.outputSpeech).to.have.property("ssml");

        let os = r.outputSpeech;
        expect(os.ssml).to.not.contains(text);
        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');
    }

    checkSessionStatus(response, shouldEndSession) {
        let r = response.response;
        expect(r).to.have.property("shouldEndSession");
        if (shouldEndSession) {
            expect(r.shouldEndSession).to.be.true;
        } else {
            expect(r.shouldEndSession).to.be.false;
        }
    }

    checkStandardCard(response) {
        let r = response.response;
        expect(r).to.have.property("card");
        expect(r.card.type).to.equal('Standard');
        expect((r.card).text).to.not.be.equal('');
        expect((r.card).title).to.not.be.equal('');
    }

    checkReprompt(response) {
        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("reprompt");
        expect(r.reprompt).to.have.property("outputSpeech");
        expect(r.reprompt.outputSpeech).to.have.property("type");
        expect(r.reprompt.outputSpeech.type).to.equal('SSML');
        expect(r.reprompt.outputSpeech).to.have.property("ssml");
        let os = r.reprompt.outputSpeech;
        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');

    }

    checkNoReprompt(response) {
        expect(response).to.have.property("response");
        let r = response.response;
        expect(r).to.not.have.property("reprompt");
    }

    checkAudioPlayDirective(response, replace = true) {
        let r = response.response;
        expect(r).to.have.property("directives");
        expect(r.directives).to.have.lengthOf(1);

        let d = r.directives[0];
        expect(d).to.have.property("type");
        expect(d.type).to.equal("AudioPlayer.Play");

        let app = d;
        expect(app).to.have.property("playBehavior");
        if (replace) {
            expect(app.playBehavior).to.be.equal("REPLACE_ALL");
        } else {
            expect(app.playBehavior).to.be.equal("REPLACE_ENQUEUED");
        }
        expect(app).to.have.property("audioItem");
        expect(app.audioItem).to.have.property("stream");
        expect(app.audioItem.stream).to.have.property("url");
        expect(app.audioItem.stream.url).to.match(/^https:\/\//);
        expect(app.audioItem.stream).to.have.property("token");
        expect(app.audioItem.stream).not.to.have.property("expectedPreviousToken");
        expect(app.audioItem.stream).to.have.property("offsetInMilliseconds");
        expect(app.audioItem.stream.offsetInMilliseconds).to.equal(0);

    }

    checkAudioStopDirective(response, replace = true) {
        let r = response.response;
        expect(r).to.have.property("directives");
        expect(r.directives).to.have.lengthOf(1);

        let d = r.directives[0];
        expect(d).to.have.property("type");
        expect(d.type).to.equal("AudioPlayer.Stop");

    }

    checkNoAudioDirective(response, replace = true) {
        let r = response.response;
        expect(r).to.not.have.property("directives");
    }
}