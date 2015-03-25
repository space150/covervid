var coverVid = function (elem, options) {
  console.log(options);
  var width = options.width,
      height = options.height,
      style = options.style || {
        top: '50%',
        left: '50%',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-ms-transform': 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)'
      };

  if (!style.position) style.position = 'absolute';

  // call sizeVideo on load
  document.addEventListener('DOMContentLoaded', sizeVideo);

  // debounce for resize function
  function debounce(fn, delay) {
    var timer = null;

    return function () {
      var context = this,
        args = arguments;

      window.clearTimeout(timer);

      timer = window.setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  // call sizeVideo on resize
  window.onresize = function () {
    debounce(sizeVideo(), 50);
  };

  // Set styles
  Object.keys(style).forEach(function(prop) {
    console.log(prop);
    elem.style[prop] = style[prop];
  });

  // Set overflow hidden on parent element
  elem.parentNode.style.overflow = 'hidden';


  // Define the attached selector
  function sizeVideo() {

    // Get parent element height and width
    var parentHeight = elem.parentNode.offsetHeight;
    var parentWidth = elem.parentNode.offsetWidth;

    // Get native video width and height
    var nativeWidth = width;
    var nativeHeight = height;

    // Get the scale factors
    var heightScaleFactor = parentHeight / nativeHeight;
    var widthScaleFactor = parentWidth / nativeWidth;

    // Based on highest scale factor set width and height
    if (widthScaleFactor > heightScaleFactor) {
      elem.style.height = 'auto';
      elem.style.width = parentWidth+'px';
    } else {
      elem.style.height = parentHeight+'px';
      elem.style.width = 'auto';
    }

  }
};

if (window.jQuery) {
  jQuery.fn.extend({
    'coverVid': function (opts) {
      $(this).each(function() {
        coverVid(this, opts);
      });
      return this;
    }
  });
}
