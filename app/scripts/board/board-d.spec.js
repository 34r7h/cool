'use strict';

describe('Directive: board', function ()
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
        element = $compile('<board></board>');
        expect(true).toBe(true);
    }));
});