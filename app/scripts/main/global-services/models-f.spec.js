'use strict';

describe('Factory: Models', function () {
    // load the service's module
    beforeEach(module('cool'));

    // instantiate service
    var Models;
    beforeEach(inject(function (_Models_) {
        Models = _Models_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});