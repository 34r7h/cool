'use strict';

describe('Directive: card', function ()
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
        element = $compile('<card></card>');
        expect(true).toBe(true);
    }));
});