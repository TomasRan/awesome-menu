# awesome-menu

[![bitHound Overall Score](https://www.bithound.io/github/TomasRan/awesome-menu/badges/score.svg)](https://www.bithound.io/github/TomasRan/awesome-menu)
[![bitHound Dependencies](https://www.bithound.io/github/TomasRan/awesome-menu/badges/dependencies.svg)](https://www.bithound.io/github/TomasRan/awesome-menu/master/dependencies/npm)
[![Code Climate](https://codeclimate.com/github/TomasRan/awesome-menu/badges/gpa.svg)](https://codeclimate.com/github/TomasRan/awesome-menu)
[![Issue Count](https://codeclimate.com/github/TomasRan/awesome-menu/badges/issue_count.svg)](https://codeclimate.com/github/TomasRan/awesome-menu)

## Description
Good Compalibility.
It supports UMD rules.<br/>
It supports unlimited level.<br/>
It supports custom style. You can customize different style for each level.<br/>
It supports customized submenu expansion style. All what you should do is passing a kind of expansion event, or a kind of fold event.<br/>
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

	var options = {...};
	var menu = new Menu(options);

	$('xxx').append(menu.render());
```

### Options
> menuId
the most outside container's id
> menuClass
the most outside container's class


## License
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
