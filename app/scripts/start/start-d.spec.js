'use strict';

describe('Directive: start', function ()
{

    // load the directive's module
    beforeEach(module('cool'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope)
    {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function ($compile)
    {
        element = $compile('<start></start>');
        expect(true).toBe(true);
    }));
});