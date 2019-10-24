<h1> Installation </h1>
<blockquote>No additional libraries required</blockquote>
<h3>Using dist</h3>
You can include the compiled ooima.min.js from ./dist directory and use it within your application as

```
<script src="ooima.min.js"></script>
```

<h3> Using CDN  </h3>
```
<script src="https://cdn.jsdelivr.net/gh/gokuney/ooima-js@master/dist/ooima.min.js" async></script>
```

<h1> Usage </h1>
The bare basic setup requires passing just the element selector for the UL tag.

<h3>HTML</h3>

```
<ul id="ooima-list">
  <li> Item 1 </li>
  <li> Item 2 </li>
  <li> Item 3 </li>
  <li> Item 4 </li>
  <li> Item 5 </li>  
</ul>
```

<h3>Javascript</h3>
<blockquote>Ensure that the code is executed on body load/DOM ready</blockquote>
```javascript
const ooimaApp = new ooima('#ooima-list');
```

<h1>Options</h1>
The `ooima` constructor accepts an optional seconds parameter as JSON of settings. 
~~~
const ooimaApp = new ooima('#ooima-list', { optionKey: optionValue });
~~~

<h1> API </h1>
You can use the `ooima` instance to interact with the plugin instance 

~~~
ooimaApp.selectedItems()
~~~
