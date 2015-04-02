CoverVid
========
At the core of CoverVid, is the idea of this little CSS snippet being possible...

```css
.selector {
  background-video: url('../foo/bar.mp4 || ../foo/bar.webm');
  background-size: cover;
  background-position: center center;
}
```

Why is it special?
------------------
CoverVid is very lightweight, with only 800 bytes of Javascripts. It is usable
in native Javascript and jQuery. It's logic is parent based, meaning the parent
element can be any size (Not necessarily just a full-screen background).

How do I use it?
----------------

1. First pull the project down from
   [GitHub](http://github.com/stefanerickson/covervid), or install with
   bower running `bower install covervid` and link `covervid.min.js` into your
   site. Make sure it is loaded after jQuery if using it.

2. It is important to note that the video you target will use its' parent
   element to scale. With that in mind, we will create some simple markup and
   add some base styling to size the videos' parent/wrapper element.

```html
<div class="covervid-wrapper">
  <video class="covervid-video" autoplay loop poster="img/video-fallback.png">
    <source src="videos/video.webm" type="video/webm">
    <source src="videos/video.mp4" type="video/mp4">
  </video>
</div>
```
```css
.covervid-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

3. Now, we can simply call

```js
$('.covervid-video').coverVid({
  width: 1920,
  height: 1080
});
```

This will set the video to behave as if it had `background-position: center;`.
You can pass a style option to change the way the video is positioned:

```js
$('.covervid-video').coverVid({
  width: 1920,
  height: 1080,
  style: {
    // anchor bottom left
    bottom: 0,
    left: 0
  }
});
```

Note: `style.position` defaults to `absolute`.
