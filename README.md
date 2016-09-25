# Half Page scroll

Split your pages in two part with inverse scroll

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/gino/vertical-slider/master/dist/vertical-slider.min.js
[max]: https://raw.github.com/gino/vertical-slider/master/dist/vertical-slider.js

Be sure to put this code inside your page
```html
<body>
  <!-- The div to attach the plugin -->
  <div class="contenitoreHome">
    <!-- Follow this html structure-->
    <div class="leftPart">
      <div class="contContRow">
        <div class="contRow">
          <!-- Here you can insert as many <div class="contOutSez"></div> as you want-->
          <div class="contOutSez">
            <!-- This is the section that is splitted by the plugin, you can insert anything -->
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
```

And at the end of the body...

```html
<script src="jquery.js"></script>
<script src="dist/vertical-slider.min.js"></script>
<script>
jQuery(function($) {
    var homeSlide = $('.contenitoreHome').homeSlide({
        duration: 2000
    });
});
</script>
```

## Configurations

### duration:
`duration` Duration of the slide
