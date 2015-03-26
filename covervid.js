var coverVid = function (elem, options) {
  var width = options.width || elem.width,
      height = options.height || elem.height,
      style = options.style || {
        top: "50%",
        left: "50%",
        "-webkit-transform": "translate(-50%, -50%)",
        "-ms-transform": "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)"
      };

  if (!style.position) style.position = "absolute";


  // Debounce function.
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

  // Call sizeVideo on load and resize.
  $(sizeVideo);
  $(window).on("resize", debounce(sizeVideo, 150));

  // Set styles.
  Object.keys(style).forEach(function(prop) {
    elem.style[prop] = style[prop];
  });


  function sizeVideo() {
    // Get parent element height and width.
    var parentHeight = elem.parentNode.offsetHeight;
    var parentWidth = elem.parentNode.offsetWidth;

    // Get the scale factors.
    var heightScaleFactor = parentHeight / height;
    var widthScaleFactor = parentWidth / width;

    // Based on highest scale factor set width and height.
    if (widthScaleFactor > heightScaleFactor) {
      elem.style.height = "auto";
      elem.style.width = parentWidth+"px";
    } else {
      elem.style.height = parentHeight+"px";
      elem.style.width = "auto";
    }
  }
};

if (window.jQuery) {
  jQuery.fn.extend({
    "coverVid": function (opts) {
      $(this).each(function() {
        coverVid(this, opts);
      });
      return this;
    }
  });
}
