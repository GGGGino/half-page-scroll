(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#vertical_slider', {
    // This will run before each test in this module.
    setup: function() {
      this.leftElement = $('.leftPart');
      this.rightElement = $('.rightPart');
    }
  });

  test('is same number', function() {
    expect(1);
    var leftChild = this.leftElement.find('.contOutSez'),
        rightChild = this.rightElement.find('.contOutSez');
    // Not a bad test to run on collection methods.
    strictEqual(leftChild.length, rightChild.length, 'Same Number');
  });


}(jQuery));
