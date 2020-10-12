var Main = function() {
	this.ids = [];
	
	this.dim = [500, 400];
	this.components = {};
	this.base_name = "main";
	
	this.get_id = function() {
		var id = Math.random();
		var i = this.ids.length;
		var doublet = false;
		while (i--) {
			if (id == this.ids[i]) {
				doublet = true;
				break;
			}
		}
		if (doublet) return this.get_id();
		this.ids[this.ids.length] = id;
		return id;
	}
	
	this.component_add = function(c, parent) {
		var id = this.get_id();
		c.parent = parent;
		c.id = id;
		this.components[id] = c;
	}
	
	this.component_remove = function(id) {
		var i = this.ids.length;
		var found = false;
		while (i--) {
			if (id == this.ids[i]) {
				found = true;
				for (var j = i; j+1 < this.ids.length; j++) {
					this.ids[j] = this.ids[j+1];
				}
				delete this.ids[this.ids.length-1];
				break;
			}
		}
		if (found) delete this.components[id];
	}
	
	this.create_body = function() {
		var found_undef = true;
		while (found_undef) {
			found_undef = false;
			for (var i = 0; i < this.ids.length; i++) {
				var element = this.components[this.ids[i]];
				if (document.getElementById(element.id) == undefined) {
					found_undef = true;
					var parent_element = document.getElementById(element.parent);
					if (parent_element != undefined) {
						var node = document.createElement("DIV");
						node.id = this.ids[i];
						parent_element.appendChild(node);
					}
				}
			}
		}
	}
	
	this.draw = function() {
		var element = document.getElementById(this.base_name);
		element.style.position = 'relative';
		element.style.left = 0;
		element.style.top = 0;
		element.zIndex = 1;
		for (var i = 0; i < this.ids.length; i++) {
			this.components[this.ids[i]].draw();
		}
	}
	
	this.update = function() {
		for (var i = 0; i < this.ids.length; i++) {
			if (this.components[this.ids[i]].update != undefined) {
				this.components[this.ids[i]].update();
			}
		}
	}
	
	this.colliding = function(a, b) {
		var t;
		if (b.vel[0]-a.vel[0] == 0) {
			if (Math.abs(a.pos[0] - b.pos[0]) < Math.max(a.dim[0], b.dim[0])) {
				t = 0;
			} else {
				return false;
			}
		} else {
			t = (a.pos[0] - b.pos[0])/(b.vel[0]-a.vel[0]);
		}
		if (t > 1 || t < 0) return false;
		var a_y = a.pos[1]+(t*a.vel[0]);
		var b_y = b.pos[1]+(t*b.vel[0]);
		if (Math.abs(b_y + (b.dim[1]/2) - a_y - (a.dim[1]/2)) < Math.max(b.dim[1]/2, a.dim[1]/2)) {
			return true;
		}
		return false;
	}
}
