var PhotoSource = function(url) {
	this.pos = [0, 0];
	this.vel = [0, 0];
	this.acc = [0, 0];

	this.dim = [10, 50];
	this.bg = '#ffffff';

	this.changed = true;

	this.is_init = false;
	this.url = url;

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
			element.style.position = 'absolute';
			element.style.left = this.pos[0];
			element.style.top = this.pos[1];
			element.width = this.dim[0];
			element.height = this.dim[1];
			element.style.overflow = "hidden";
			element.style.backgroundColor = this.bg;
			if (!this.is_init) {
				element.style.zIndex = 1;
				element.setAttribute('onclick' , "javascript:set_selected_id(this.id)");
                                element.style.borderTopLeftRadius = "0px";
                                element.style.borderTopRightRadius = "0px";
                                element.style.borderBottomLeftRadius = "0px";
                                element.style.borderBottomRightRadius = "0px";

				var ps = document.createElement("img");
				ps.id = this.id + "_content";
				ps.parent_id = this.id;
				ps.style.color = "#000000";
				ps.style.position = "relative";
				ps.style.top = 0;
				ps.style.left = 0;
				ps.style.marginLeft = 0;
				ps.style.marginRight = 0;
				ps.style.marginTop = 0;
				ps.style.marginBottom = 0;
				element.appendChild(ps);

				ps.src = this.url;
		                ps.onload = function(){
                		        ps.style.height = ps.height;
                          		ps.style.width = ps.width;
                        		var ps_d = document.getElementById(this.parent_id);
					main_app.components[this.parent_id].dim_set(parseInt(ps.width, 10), parseInt(ps.height, 10));
		                        ps_d.style.width = ps.width;
                		        ps_d.style.height = ps.height;
					main_app.update();
					main_app.draw();
				}

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
