'use strict';

describe('app module', function() {

    beforeEach(module('app'));

    describe('app MainController', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var MainController = $controller('MainController');
            expect(MainController).toBeDefined();
        }));

    });
});