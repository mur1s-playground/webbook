var MainMenu_Static_toggle_menu = function(id) {
                var menu_elem = document.getElementById(id + "_menu");
                if (menu_elem.style.display == "inline") {
                        menu_elem.style.display = "none";
			if (selected_controls_id != null) {
				MainMenu_Static_toggle_controls(selected_controls_id);
			}
                } else {
                        menu_elem.style.display = "inline";
                }
}


var MainMenu_Static_toggle_controls = function(id, expand = true) {
	var menu = document.getElementById(main_menu.id + "_menu");

	var parent = document.getElementById(id);
        var controls = document.getElementById(id + "_controls");
	if (controls != null) {
        	if (controls.style.display == "inline" || !expand) {
                	controls.style.display = "none";
			selected_controls_id = null;
        	} else {
			if (selected_controls_id != null) {
				MainMenu_Static_toggle_controls(selected_controls_id);
			}
			selected_controls_id = id;
               		controls.style.display = "inline";
			parent.style.right = menu.offsetWidth + controls.offsetWidth;
        	}
	}
}

var MainMenu = function() {
	this.pos = [0, 0];
	this.vel = [0, 0];
	this.acc = [0, 0];

	this.dim = [10, 50];
	this.bg = '#ffffff';

	this.changed = true;
	this.item_ids = [];

	this.add_item = function(id, title) {
		this.item_ids.push(id);
		var item = document.createElement("a");
		item.style.display = "block";
		item.style.borderBottom = "1px solid black";
                item.appendChild(document.createTextNode(title));
                item.setAttribute('onclick',"javascript:MainMenu_Static_toggle_controls(" + id + ", true)");
		var menu = document.getElementById(this.id + "_menu");
                menu.appendChild(item);
	}

	this.pos_set = function(x, y) {
		this.pos = [x, y];
		this.changed = true;
	}

	this.dim_set = function(w, h) {
		this.dim = [w, h];
		this.changed = true;
	}

	this.bg_set = function(c) {
		this.bg = c;
		this.changed = true;
	}

	this.acc_set = function(x, y) {
		this.acc = [x, y];
		this.changed = true;
	}

	this.draw = function() {
		if (this.changed) {
			var element = document.getElementById(this.id);
			element.style.position = 'fixed';
			element.style.right = 0;
			element.style.top = 0;
			element.style.backgroundColor = this.bg;
			element.style.fontSize = "40px";
			element.style.zIndex = 255;
			if (!this.is_init) {
				var main = document.createElement("a");
				main.style.border = "1px solid black";
				main.parent_id = this.id;
				main.appendChild(document.createTextNode(String.fromCodePoint(0x2630)));
				main.setAttribute('onclick', "javascript:MainMenu_Static_toggle_menu(" + this.id + ")");
				element.appendChild(main);

				var menu = document.createElement("div");
				menu.id = this.id + "_menu";
				menu.style.position = "absolute";
				menu.style.right = 0;
				menu.style.top = main.offsetHeight;
				menu.style.display = "none";
				menu.style.fontSize = "30px";
				menu.style.textAlign = "right";
				menu.style.backgroundColor = this.bg;
				menu.style.padding = "5px";
				menu.style.border = "1px solid black";
				menu.style.borderTopLeftRadius = "5px";
				menu.style.borderBottomLeftRadius = "5px";

				element.appendChild(menu);

				this.is_init = true;
			}
			this.changed = false;
		}
	}

	this.update = function() {
		this.vel[0] += this.acc[0];
		this.acc[0] = 0;
		this.pos[0] += this.vel[0];

		this.vel[1] += this.acc[1];
		this.acc[1] = 0;
		this.pos[1] += this.vel[1];

		this.changed = true;
	}
}
