<?php
class PhotobookController extends Controller {
	function __construct() {
		parent::__construct();
	}

	function viewController() {
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/main.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_add.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_edit.js\"></script>";
                $this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_position_layer.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_size_crop.js\"></script>";
                $this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_color.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_border.js\"></script>";
                $this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_padding.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_animation.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/mainmenu_export.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/box.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/photosource.js\"></script>";
		$this->HEAD[] = "<script type=\"text/javascript\" src=\"" . $this->CONFIG['SITE_URL_FILE'] . "js/pb/textfield.js\"></script>";
	}
}

?>
