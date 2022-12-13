describe('menu service', function () {

    var menu;
    var $httpBackend;
    var ApiPath;
  
    beforeEach(function () {
      module('common');
  
      inject(function ($injector) {
        menu = $injector.get('MenuService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');

      });
    });
  
    it('should return promise validating dish exists', function() {
        var expectedResponse = {"description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra","name":"Orange Chicken","price_large":9.75,"short_name":"L1"};
        $httpBackend.whenGET(ApiPath + '/menu_items/' + 'L' + '/menu_items/' + '0' + '.json').respond(expectedResponse);
        var testShortDish = {category:"L", menuNumber:"0"};
        menu.getDishDetails(testShortDish).then(function(response) {
            expect(response).not.toBeNull()
            expect(response.data).toEqual(expectedResponse);
        });
        $httpBackend.flush();
    });

    it('should return null values confirming dish does not exist', function() {
      var expectedNullResponse = null;
      $httpBackend.whenGET(ApiPath + '/menu_items/' + 'L' + '/menu_items/' + '000' + '.json').respond(expectedNullResponse);
      var testInvalidShortDish = {category:"L", menuNumber:"000"};
      menu.getDishDetails(testInvalidShortDish).then(function(response) {
          expect(response.data).toBeNull()
      });
    $httpBackend.flush();
  });

  
  });
  