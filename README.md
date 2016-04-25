# awesome-menu

[![bitHound Overall Score](https://www.bithound.io/github/TomasRan/awesome-menu/badges/score.svg)](https://www.bithound.io/github/TomasRan/awesome-menu)
[![bitHound Dependencies](https://www.bithound.io/github/TomasRan/awesome-menu/badges/dependencies.svg)](https://www.bithound.io/github/TomasRan/awesome-menu/master/dependencies/npm)
[![Code Climate](https://codeclimate.com/github/TomasRan/awesome-menu/badges/gpa.svg)](https://codeclimate.com/github/TomasRan/awesome-menu)
[![Issue Count](https://codeclimate.com/github/TomasRan/awesome-menu/badges/issue_count.svg)](https://codeclimate.com/github/TomasRan/awesome-menu)

## Description
Good Compalibility.

It supports unlimited level.

It supports custom style. You can customize different style for each level.

It supports customized submenu expansion style. All what you should do is passing a kind of expansion event, or a kind of fold event.

It supports customized selected event. That means any event type can be the one of triggering selected. It depends on which you pass.

It is easy to use. The configuration for each level can be inherited. More specifically, submenu inherits its parent menu's configuration (exclude menu data).

Here are some simple instances:

![](http://cl.ly/312n3m082x1M/25E50F71-4506-4E84-BD2F-13D8392B1845.png)

![](http://cl.ly/0T3W1W0I192K/Snip20160425_3.png)

## Install

```
# use npm
$ npm install awesome-menu

# use bower
$ bower install awesome-menu
```

## Usage

```
	var Menu = require('awesome-menu');

	var menu = new Menu({
		'menuId': 'menu',
		'menuClass': 'menu',
		'defaultSelected': {
			'id': '1',
			'level': '1'
		},
		'levelConfig': {
			'1': {
					'listClass': '',
					'wrapClass': '',
					'itemClass': '',
					'selectedClass': '',
					'hoverClass': '',
					'selectEvent': '',
					'childExpandEvent': '',
					'childFoldEvent': '',
					'position': '',
					'hideAfterSelected': ''
				},
			'3': {
				...	
			}	
		},
		'list': [{
			'id': '1',
			'name': 'xxx',
			'content': 'xxx',
			'list': [{...}, {...}]
		}, {...}]
	});

	$('xxx').append(menu.render());
```

### Options
> menuId

##### type: string

##### description

the most outside container's id

> menuClass

##### type: string

##### description: 

the most outside container's class

> defaultSelected

##### type: object

##### description

default selected item. 

> onlyOneExpansion

##### type: boolean

##### description

 `true` means there is only one expanded in the same level all the time. 

> selectedFunc(data)

##### type: function

##### description

customized callback when one item is selected. The `data` parameter records current selected item's releative info.

> list

##### type: array

##### description

nested list data.

> levelConfig

##### type: object

##### description

configuraiton for each level.

### Methods
> render()

return the generated menu

> reset(options)

reset the whole menu according to the passed parameter

> updateContent(option, content)

update specific item's content

## License
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
