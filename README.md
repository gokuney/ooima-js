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

<a href="https://gokuney.1mb.site/" target="_blank"> VIEW DEMO </a>

<h1>Options</h1>
The `ooima` constructor accepts an optional seconds parameter as JSON of settings. 
~~~javascript
const ooimaApp = new ooima('#ooima-list', 
      { optionKey: optionValue });
~~~

<table>
  <thead>
    <tr>
      <th style="text-align: center">Option</th>
      <th style="text-align: center">Type</th>
      <th style="text-align: center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center">listClassSelector</td>
      <td style="text-align: center"> String </td>
      <td style="text-align: center"> Class name that gets appended to the child "li" items. <strong>Default: ooima-list-item</strong> </td>
    </tr>
    
    <tr>
      <td style="text-align: center"> hotkey </td>
      <td style="text-align: center"> Number </td>
      <td style="text-align: center"> KeyCode that enables multi-select. <strong>Default 17 (Control Key) </strong> </td>
    </tr>
    
    <tr>
      <td style="text-align: center">selectedBG</td>
      <td style="text-align: center"> String </td>
      <td style="text-align: center"> Background color when an item is selected. <strong>Default: #00ff00</strong> </td>
    </tr>
    
    <tr>
      <td style="text-align: center"> animation </td>
      <td style="text-align: center"> String </td>
      <td style="text-align: center"> Name of the animation that is used for touch based multi-select. <strong>Default: ''</strong>. It accepts all animation values from <a href="https://daneden.github.io/animate.css/" target="_blank">animate.css</a> </td>
    </tr>
    
    <tr>
      <td style="text-align: center">listStyle</td>
      <td style="text-align: center"> JSON Object </td>
      <td style="text-align: center"> Additional styling that gets appended to the list items. <strong>Default: `{}`</strong> </td>
    </tr>

  </tbody>
</table>

<h1> Getting selected items </h1>
You can use the `ooima` instance to interact with the plugin instance. As in the examples above, we'll use `ooimaApp` instance.

<h3>Getting list values</h3>
Following example will return an `array` of list values (Eg. `["Item 1", "Item 2"]`)
```javascript
ooimaApp.choosenItems()
```

If you want to get the `array` of list DOM objects, pass `true` to the `choosenItems` as: 
```javascript
ooimaApp.choosenItems(true)
```
Above will return `[ "<li> Item 1 </li>", "<li> Item 2 </li>" ]`


~~~
ooimaApp.selectedItems()
~~~
