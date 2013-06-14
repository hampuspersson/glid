GLID.JS
=======

Glid is a tiny slider plugin for jQuery.

# USAGE
The slider needs to be an ul-element with child li's. Each li should hold on slide, which can be made up of images, text or other HTML elements.

```html
<ul class="glid" id="glid">
	<li>
		<img src="http://placekitten.com/g/200/300" alt="Cute kitten" />
	</li>
	<li>
		<p>Lorem ipsum dolor sit amet, consectetur adipi*scing elit. Nunc in purus eni*m, eget posuere urna. Donec pharetra mollis enim, et vehicula ante ornare ut. Pellentesque hendrerit consectetur eros ut posuere. Praesent risus mauris, venenatis volutpat pellentesque interdum, auctor a ante. </p>
	</li>
	<li>
		<ul>
			<li>A list in a slider</li>
			<li>A list in a slider</li>
		</ul>
	</li>
</ul>
```

Include jQuery and Glid

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="jquery.glid.js"></script>
```

And finally call for Glid to set up your <ul>.

```html
<script>
	$('#glid').glid();
</script>
```

Glid will add a wrapper div, some classes and commence the sliding.