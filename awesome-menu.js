/*
 *	@Author: tomasran
 *	@Date: 2016-04-12 11:40:32
 *	@Last Modified by: tomasran
 */

/*
 *	@example:
 *		var menu = new Menu({
 *			'menuId': '',							// (optional) id of outermost container
 *			'menuClass': '',						// (optional) class of outermost container
 *			'defaultSelected': '',					// default selected item id
 *			'defaultPosition': '',					// (optional) default position relative to its parent menu
 *			'defaultExpansion': '',					// (optional) whether expand by default
 *			'defaultChildFoldEvent': '',			// (optional) the event type of triggering submenu's folding
 *			'defaultChildExpandEvent': '',			// (optional) the event type of triggering submenu's expansion
 *			'defaultSelectEvent': '',				// (optional) the event type of triggering menu item's selection 
 *			'defaultSelectedClass': '',				// (optional) default class of item selected
 *			'defaultHoverClass': '',				// (optional) default hover class of item
 *			'defaultListClass': '',					// (optional) default class of menu list
 *			'defaultItemClass': '',					// (optional) default class of menu item
 *			'selectedFunc': function(data) {},		// (optional) callback when item is selected
 *													   @return value:
 *															data: {
 *																id: '',			selected item's id
 *																level: 2,		selected item's level
 *															} 
 *			'list' : {
 *				'listClass': '',					// (optional)
 *				'itemClass': '',					// (optional)
 *				'hoverClass': '',					// (optional)
 *				'selectedClass': '',				// (optional)
 *				'selectEvent': 'click',				// (optional)
 *				'position': 'bottom',				// (optional)
 *				'expansion': false,					// (optional)
 *				'childExpandEvent': 'click',		// (optional)
 *				'childFoldEvent': 'click',			// (optional)
 *				'items': [{
 *					'id',							// unique mark 
 *					'itemClass': '',				// (optional)
 *					'content': 'xxx'				// the content of menu item
 *					'list': {						
 *						...
 *					}
 *				}, { ... }]
 *			}
 *		});
 *
 */

var $ = require('teacher:components/common/base/base.js');
var uiClass = require('teacher:components/common/class/class.js');

var createElement = function(tagName) {
	return $(document.createElement(tagName));
};

var extendObject = function(src, dest) {
	if (typeof dest !== 'object') {
		return null;
	}

	for (var prop in src) {
		if (src.hasOwnProperty(prop)) {
			if (dest[prop] === undefined) {
				dest[prop] = src[prop];
			}
		}
	}	
};

var Menu = uiClass().extend({
	START_LEVEL: 1,
	LEVEL_STEP: 1,
	DEFAULT_POSITION: 'bottom',
	DEFAULT_EXPANSION: true,
	DEFAULT_CHILD_FOLD_EVENT: 'click',
	DEFAULT_CHILD_EXPAND_EVENT: 'click',
	DEFAULT_SELECT_EVENT: 'click',
	DEFAULT_SELECTED_CLASS: '',
	DEFAULT_HOVER_CLASS: '',
	DEFAULT_LIST_CLASS: '',
	DEFAULT_ITEM_CLASS: '',
	ITEM_TAG: 'a',
	WRAP_TAG: 'dt',
	LIST_TAG: 'dl',

	init: function(options) {
		this.checkOptions(options);
		this.menu = createElement('menu');
	},

	checkOptions: function(options) {
		this.options = $.extend({
			'selectedFunc': function() {},
			'list': {}
		}, options);


		var defaultExpansion = this.options['defaultExpansion'] === undefined ? this.DEFAULT_EXPANSION : this.options.defaultExpansion;
		this.completeOptions(this.options.list, {
			'position': this.options.defaultPosition || this.DEFAULT_POSITION,
			'expansion': defaultExpansion,
			'childExpandEvent': this.options.defaultChildExpandEvent || this.DEFAULT_CHILD_EXPAND_EVENT,
			'childFoldEvent': this.options.defaultChildFoldEvent || this.DEFAULT_CHILD_FOLD_EVENT,
			'selectEvent': this.options.defaultSelectEvent || this.DEFAULT_SELECT_EVENT,
			'selectedClass': this.options.defaultSelectedClass || this.DEFAULT_SELECTED_CLASS,
			'hoverClass': this.options.defaultHoverClass || this.DEFAULT_HOVER_CLASS,
			'listClass': this.options.defaultListClass || this.DEFAULT_LIST_CLASS,
			'itemClass': this.options.defaultItemClass || this.DEFAULT_ITEM_CLASS
		});
	},

	// complete options 
	completeOptions: function(list, parentList) {
		extendObject(parentList, list);

		$.each(list.items, function(i, item) {
			item.itemClass = item.itemClass || list.itemClass;

			var notExist = $.isEmptyObject(item.list);

			 if (!notExist) {
				item.list.itemClass = item.list.itemClass || item.itemClass;
				this.completeOptions(item.list, list);
			}
		}.bind(this));
	},

	// get the data of selected menu item
	getSelectedItemData: function(item) {
		return {
			'id': item.attr('data-id'),
			'level': item.attr('data-level')
		};
	},

	// clear all selection
	clearSelection: function() {
		var lists = this.menu.find(this.LIST_TAG);

		$.each(lists, function(i, list) {
			var selectedClass = $(list).attr('data-selected-class');

			$(list).children().each(function() {
				var target = $(this).children(this.ITEM_TAG);

				target.removeClass(selectedClass);
			});
		});
	},

	// recursive selection
	recurseSelection: function(id) {
		var target = this.menu.find('[data-id=' + id + ']');

		if (target.length === 0) {
			return null;
		}

		var parentList = target.parent().parent();
		var parentTarget = parentList.siblings(this.ITEM_TAG);
		var selectedClass = parentList.attr('data-selected-class');

		target.addClass(selectedClass);

		if (parentTarget.length === 0) {
			return null;
		} else {
			return this.recurseSelection(parentTarget.attr('data-id'));
		}
	},

	// select menu list
	selectMenuList: function(id) {
		var target = this.menu.find('[data-id=' + id + ']');

		if (target.length === 0) {
			return null;
		}

		this.clearSelection();
		this.recurseSelection(id);
		this.options.selectedFunc({
			'id': target.attr('data-id'),
			'level': target.attr('data-level')
		});
	},

	// handleExpansion 
	handleExpansion: function(id) {
		$.each(this.menu.children().children(), function(i, item) {
			var target = $(item).find('[data-id=' + id + ']');

			if (target.length === 0) {
				$(item).children(this.LIST_TAG).addClass('none');
			}
		}.bind(this));
	},

	getPositionSelector: function() {
		var positionSelector = {
			'top': {
				'position':'absolute',
				'left': 0,
				'bottom': '100%' 
			},
			'bottom': {
				'position':'relative',
				'left': 0,
				'top': 0 
			},
			'right': { 
				'position':'absolute',
				'left': '100%',
				'top': 0
			},
			'left': { 
				'position':'absolute',
				'right': '100%',
				'top': 0
			}
		};

		return positionSelector;
	},

	// construct a submenu
	constructMenuList: function(list) {
		var menuList = createElement(this.LIST_TAG).attr({
			'class': list.listClass,
			'data-selected-class': list.selectedClass,
			'data-expand-event': list.childExpandEvent,
			'data-fold-event': list.childFoldEvent,
		})[list.expansion ? 'removeClass' : 'addClass']('none');

		return menuList;
	},

	// construct single menu item
	constructMenuItem: function(item, level) {
		var menuItem = createElement(this.WRAP_TAG).css({
			'position': 'relative'	
		});
		var menuItemContent = createElement(this.ITEM_TAG);

		menuItemContent.html(item.content).attr({
			'data-id': item.id,
			'data-level': level,
			'class': item.itemClass
		}).appendTo(menuItem);

		return menuItem;
	},

	// set the menu list's relative position
	setMenuListPosition: function(position, target) {
		var positionSelector = this.getPositionSelector();

		target.css(positionSelector[position]);
	},

	// consturct the whole menu
	constructMenu: function(list, level, parentList) {
		if ($.isEmptyObject(list)) {
			return null;
		}

		var menuList = this.constructMenuList(list);

		$.each(list.items, function(i, item) {
			var menuItem = this.constructMenuItem(item, level).appendTo(menuList);

			this.bindHoverEvent(menuItem, list.hoverClass);
			if (item.list) {
				menuItem.append(this.constructMenu(item.list, level + this.LEVEL_STEP, list));
			}
		}.bind(this));

		this.setMenuListPosition(list.position, menuList);

		// bind expansion events
		if (list.childExpandEvent === list.childFoldEvent) {
			menuList.on(list.childExpandEvent, function(e) {
				e.stopPropagation();
				$(e.target).siblings(this.LIST_TAG).toggleClass('none');
			}.bind(this));
		} else {
			this.bindExpansionEvent(menuList, list.childExpandEvent, this.WRAP_TAG, function(e, target) {
				var expandEvent = $(target).parent().attr('data-expand-event');
				
				if (expandEvent === e.type) {
					$(target).children(this.LIST_TAG).removeClass('none');
				}
			}.bind(this));
			this.bindExpansionEvent(menuList, list.childFoldEvent, this.WRAP_TAG, function(e, target) {
				var foldEvent = $(target).parent().attr('data-fold-event');

				if (foldEvent === e.type) {
					$(target).children(this.LIST_TAG).addClass('none');
				}
			}.bind(this));
		}

		// bind select events
		this.bindSelectionEvent(list.selectEvent, menuList.children().children(), function(e) {
			var data = this.getSelectedItemData($(e.target));

			this.handleExpansion(data.id);
			this.selectMenuList(data.id);
		}.bind(this));

		return menuList;
	},

	bindExpansionEvent: function(target, eventType, tag, callback) {
		target.on(eventType, tag, function(e) {
			return callback(e, this);
		});	
	},

	bindHoverEvent: function(target, hoverClass) {
		var self = this;

		target.hover(function(e) {
			if (e.target.nodeName.toLowerCase() === self.ITEM_TAG)	{
				$(this).children(self.ITEM_TAG).addClass(hoverClass);
			}
		}, function(e) {
			if (e.target.nodeName.toLowerCase() === self.ITEM_TAG)	{
				$(this).children(self.ITEM_TAG).removeClass(hoverClass);
			}
		});
	},

	bindSelectionEvent: function(eventType, target, callback) {
		if (!eventType) {
			return {};
		}

		var self = this;
		var elements = target.filter(function() {
			return this.nodeName.toLowerCase() === self.ITEM_TAG;
		});

		elements.on(eventType, function(e) {
			if (e.target.nodeName.toLowerCase() === self.ITEM_TAG) {
				return callback(e);
			}
		});
	},

	render: function() {
		var menuContent = this.constructMenu(this.options.list, this.START_LEVEL, {});

		this.menu.attr({
			'id': this.options.menuId,
			'class': this.options.menuClass
		});

		if (menuContent) {
			menuContent.appendTo(this.menu);
			this.selectMenuList(this.options.defaultSelected);
		}

		return this.menu;
	},

	updateContent: function(id, content) {
		this.menu.find('[data-id='+ id + ']').html(content);
	},

	reset: function(options) {
		this.options = options;
		this.checkOptions();
		this.menu.empty();
		this.render();
	}
});

module.exports = Menu;
