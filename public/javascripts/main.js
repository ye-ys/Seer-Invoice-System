$(document).ready(function () {

  // backtotop button
  var $backtotop = $('#backtotop');
  var top = $(window).height() - $backtotop.height() - 200;

  function moveBacktotop() {
    $backtotop.css({ top: top, right: 0});
  }

  $backtotop.click(function () {
    $('html,body').animate({ scrollTop: 0 });
    return false;
  });
  $(window).scroll(function () {
    var windowHeight = $(window).scrollTop();
    if (windowHeight > 200) {
      $backtotop.fadeIn();
    } else {
      $backtotop.fadeOut();
    }
  });

  moveBacktotop();
  $(window).resize(moveBacktotop);

  // calculate the total price
  $('#quantity, #unitPriceDecimal, #unitPrice').blur(function () {
    var unitPrice = $('#unitPrice').val() ? Number($('#unitPrice').val()) : 0;
    var unitPriceDecimal = $('#unitPriceDecimal').val() ? Number($('#unitPriceDecimal').val()) : 0;
    if (unitPriceDecimal < 10) {
      unitPriceDecimal /= 10;
    } else {
      unitPriceDecimal /= 100;
    }
    var price = unitPrice + unitPriceDecimal;
    var quantity = Number($('#quantity').val());
    var totalPrice = price * quantity;
    $('#price').val(price);
    $('#total').val(totalPrice);
    $('#total-temp').val(totalPrice);
  });

  // check date
  $('#submit').click(function(event) {
    var today = new Date();
    var date = $('#date').val() ? new Date($('#date').val()) : null;
    var arrivalDate = $('#arrivalDate').val() ? new Date($('#arrivalDate').val()) : null;
    if (!!date || !!arrivalDate) {
      if (date > today) {
        event.preventDefault();
        alert('申购时间不能晚于今天');
        return;
      }
      if (arrivalDate > today) {
        event.preventDefault();
        alert('到货时间不能晚于今天');
        return;
      }
      if (!!date && !!arrivalDate && (arrivalDate < date)) {
        event.preventDefault();
        alert('到货时间不能早于申购时间');
        return;
      }
    }
  });
});

