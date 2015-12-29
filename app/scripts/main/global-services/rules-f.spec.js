'use strict';

describe('Factory: Rules', function () {
    // load the service's module
    beforeEach(module('cool'));

    // instantiate service
    var Rules;
    beforeEach(inject(function (_Rules_) {
        Rules = _Rules_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});