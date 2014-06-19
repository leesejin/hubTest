/*
 * app Util
 */
$app.utils = {
  /*
  * page 이동
  *
  * @method changePage
  * @param {String} to 페이지 ID
  * @param {String} transition 페이지 전환 효과
  * @param {String} {Bool} 역방향 설정
  *
   */
  changePage: function(to, reverse, transition){
    var $page = $("#"+to);
    var effect;
    if( transition === undefined || transition === ""){
      transition = "none";
    }
    if(reverse === undefined || reverse === ""){
      reverse = false;
    } else {
      if( typeof reverse === "string"){
        reverse = reverse === "true"? true:false;
      }
    }

    $.mobile.changePage($page, {
      transition: transition,
      reverse: reverse,
      changeHash: false
    });
  },
  /*
   * 선택된 radio 그룹명으로 찾기
   *
   * @method groupSelected
   * @param {String} 페이지 ID
   * @param {String} 그룹 명
   *
   */
  selectedGroup: function(pageId, groupName){
    var page = $("#"+pageId);
    var radioButtons = page.find("[data-role='appRadio']");
    var $radios = [];
    var text;
    radioButtons.each(function(){
      var $this = $(this);
      if( $this.appRadio("grouped") === groupName ){
        $radios.push($this);
      }
    });
    for( var i=0; i<$radios.length; i++){
      var $radio = $radios[i];
      if( $radio.appRadio('checked') ){
        return $radio.appRadio('text');
      }
    }
  },
  /*
   * 선택된 radio 그룹명으로 value 찾기
   *
   * @method groupSelectedV
   * @param {String} 페이지 ID
   * @param {String} 그룹 명
   *
   */
  selectedGroupV: function(pageId, groupName){
    var page = $("#"+pageId);
    var radioButtons = page.find("[data-role='appRadio']");
    var $radios = [];
    var text;
    radioButtons.each(function(){
      var $this = $(this);
      if( $this.appRadio("grouped") === groupName ){
        $radios.push($this);
      }
    });
    for( var i=0; i<$radios.length; i++){
      var $radio = $radios[i];
      if( $radio.appRadio('checked') ){
        return $radio.appRadio('value');
      }
    }
  }
};


(function ($, undefined ){
  // component definition
  $.widget ("mobile.appBase", $.mobile.widget, {
    options: {
      enable: true,
      visible: true
    },

    _create: function (){
      var o = this.options;

      this.enable(o.enable);
      this.visible(o.visible);
    },

    _onVMouseDown: function(e) {
    },

    _onVMouseMove: function(e) {
    },

    _onVMouseUp: function(e) {
    },

    _onVClick: function(e) {
    },

    _attachEvent: function() {
      var $el = this.element, self = this;

      $el.bind({
        "vmousedown": function(e) {
          if(self.enable() && self._getAncestorEnable()) {
            return self._onVMouseDown(e);
          }
        },
        "vmousemove": function(e) {
          if(self.enable() && self._getAncestorEnable()) {
            return self._onVMouseMove(e);
          }
        },
        "vmouseup vmousecancel vmouseout": function(e) {
          if(self.enable() && self._getAncestorEnable()) {
            return self._onVMouseUp(e);
          }
        },
        "vclick": function(e) {
          // mouse일 때만 확인하면 됨.
          if(!(self.enable() && self._getAncestorEnable())) {
            e.stopImmediatePropagation();
            return;
          }
          return self._onVClick(e);
        }
      });
    },
    _getAncestorEnable: function() {
      var $el = this.element;
      var ret = true;

      $el.parents("[data-role^='app']").each(function() {
        if($(this).hasClass("app-base-disabled")) {
          ret = false;
          return false;
        }
      });
      return ret;
    },

    enhanceWithin: function( target, useKeepNative ) {
      this.enhance( $( this.options.initSelector, $( target )), useKeepNative );
    },

    enhance: function( targets, useKeepNative ) {
      var page, keepNative, $widgetElements = $( targets ), self = this;
      $widgetElements[ this.widgetName ]();
    },

    /**
     * 위젯의 활성화 여부를 설정하거나 조회한다.
     *
     * @method enable
     * @param {Boolean} enable 위젯의 활성화를 설정할 값
     * @return {Boolean} 위젯에 설정된 활성화 값
     */
    enable: function( enable ) {
      var o = this.options;
      if ( arguments[0] !== undefined ) {
        o.enable = enable;
        if(enable === true) {
          this.element.removeClass("app-base-disabled");
        }
        else {
          this.element.addClass("app-base-disabled");
        }
      }
      else {
        return o.enable;
      }
      return this;
    },

    /**
     * 위젯의 보여짐/숨김 여부를 설정하거나 조회한다.
     *
     * @method visible
     * @param {Boolean} visible 위젯의 보여짐/숨김 여부를 설정할 값
     * @return {Boolean} 위젯에 설정된 보여짐/숨김 여부
     */
    visible: function( visible ) {
      var $el = this.element, self = this, o = this.options, cls = this.classes;
      if ( arguments[0] !== undefined ) {
        o.visible = visible;
        if(visible === true) {
          this.element.removeClass("app-base-hidden");
        }
        else {
          this.element.addClass("app-base-hidden");
        }
      }
      else {
        return o.visible;
      }
      return this;
    },

    /*
     * 배경 이미지 변경
     *
     * @method backgroundImage
     * @param {String} val 이미지 URL
     * @return {String} 이미지 URL
     *
     */
    backgroundImage: function(val){
      var $el = this.element;
      if( arguments.length ){
        $el.css("backgroundImage", "url('"+val+"')");
      } else {
        return $el.css("backgroundImage");
      }
    },

    /*
     * 배경 색상 변경
     *
     * @method backgroundColor
     * @param {String} val 색상 값
     * @return {String} 색상 값
     *
     */
    backgroundColor: function(val){
      var $el = this.element;
      if( arguments.length ){
        $el.css("backgroundColor", val);
      } else {
        return $el.css("backgroundColor");
      }
    },

    /*
     * 문자열 변경
     *
     * @method text
     * @param {String} text 문자열
     * @return {String} 문자열
     *
     */
    text: function(text){
      var $el = this.element;
      var $child = $el.find(".button-text");
      if( arguments.length ){
        $child.text(text);
      } else {
        return $child.text();
      }
    },

    textColor: function(color){
      var $el = this.element;
      if( arguments.length ){
        $el.css("color", color);
      } else {
        return $el.css("color");
      }
    },

    textSize: function(size){
      var $el = this.element;
      var sizeN = "";
      if( typeof size === "string"){
        sizeN = size.replace("px", "");
      } else {
        sizeN = size;
      }
      if( arguments.length ){
        $el.css("font-size", sizeN);
      } else {
        return $el.css("font-size");
      }
    },

    textAlign: function(align, selector){
      var $el = this.element;

      if( selector === undefined ){
        var role = $el.data().role;
        switch (role){
          case "appLineEdit":
            selector = ".line-edit-text";
            break;
          case "appTextarea":
            selector = "textarea";
            break;
          default :
            selector = ".button-text";
            break;
        }
      }

      var $child = $el.find(selector);
      if( arguments.length ){
        $child.css("textAlign", align);
      } else {
        return $child.css("textAlign");
      }
    },

    //@desecription vertical text align.
    //@param {string} selector
    verticalAlignCenter: function(selector){
      var $el = this.element;
      var $selector = $el.find(selector);
      if( $selector !== undefined ){
        var vHeight = $el.height();
        $selector.css("line-height", vHeight+"px");
      }
    }
  });
}) (jQuery);

/* appcessory button */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appButton", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      initSelector: "[data-role='appButton']"
    },
    _create: function ()
    {
      var $el = this.element, self = this, o = this.options;
      var $child = $("<div></div>");
      $child.addClass("button-text");

      $el.append($child);

      if(o.text === ""){
        o.text = "appButton";
      }
      self.text(o.text);

      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }

      if(o.textSize !== ""){
        self.textSize(o.textSize);
      }

      $el.addClass("app-button-normal");
      self.verticalAlignCenter(".button-text");
      self._attachEvent();
    },

    _onVMouseDown: function(e) {
      var $el = this.element, o = this.options;
      $el.removeClass("app-button-normal").addClass("app-button-press");
      e.preventDefault();
    },

    _onVMouseUp: function(e) {
      var $el = this.element, o = this.options;
      if(e.type !== "vmouseout"){
        $el.removeClass("app-button-press").addClass("app-button-normal");
      }
    },

    _onVClick: function(e) {
      var self = this;
      self._trigger("vclick", e);
      return false;
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appButton.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory ImageButton */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appImageButton", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      normalImage: "",
      pressImage: "",
      initSelector: "[data-role='appImageButton']"
    },

    _create: function ()
    {
      var $el = this.element, self = this, o = this.options;
      var $child = $("<div></div>");
      $child.addClass("button-text");

      $el.append($child);

      if(o.text === ""){
        o.text = "appImageButton";
      }
      self.text(o.text);

      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }

      if(o.textSize !== ""){
        self.textSize(o.textSize);
      }

      if(o.normalImage  === ""){
        $el.addClass("app-button-normal");
      }

      self.verticalAlignCenter(".button-text");
      self._attachEvent();
    },

    _onVMouseDown: function(e) {
      var $el = this.element, o = this.options;
      if(o.pressImage === ""){
        $el.removeClass("app-button-normal").addClass("app-button-press");
      } else {
        $el.css("background-image", o.pressImage);
      }
      e.preventDefault();
    },

    _onVMouseUp: function(e) {
      var $el = this.element, o = this.options;
      if(e.type !== "vmouseout"){
        if(o.normalImage === ""){
          $el.removeClass("app-button-press").addClass("app-button-normal");
        } else {
          $el.css("background-image", o.normalImage);
        }
      }
    },

    _onVClick: function(e) {
      var self = this, o = this.options;
      self._trigger("vclick", e);
      return false;
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appImageButton.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Label */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appLabel", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      textAlign: "left",
      initSelector: "[data-role='appLabel']"
    },

    _create: function(){
      var $el = this.element, self = this, o = this.options;
      var $child = $("<div></div>");
      $child.addClass("button-text");

      $el.append($child);

      if(o.text === ""){
        o.text = "appLabel";
      }
      self.text(o.text);

      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }
      if(o.textSize !== ""){
        self.textSize(o.textSize);
      }
      if(o.textAlign !== ""){
        self.textAlign(o.textAlign, ".button-text");
      }

      self.verticalAlignCenter(".button-text");
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appLabel.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory LineEdit */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appLineEdit", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      textAlign: "left",
      placeholder: "",
      initSelector: "[data-role='appLineEdit']"
    },

    _create: function(){
      var $el = this.element, self = this, o = this.options;
      var $child = $("<input></input>");
      $child.addClass("line-edit-text");

      $el.append($child);

      if(o.text === ""){
        o.text = "appLineEdit";
      }
      self.text(o.text);

      if(o.textColor !== ""){
        $child[0].style.color = o.textColor;
      }
      if(o.textSize !== ""){
        self.textSize(o.textSize);
      }

      if(o.placeholder !== ""){
        self.placeholder(o.placeholder);
      }

      self.textAlign(o.textAlign, ".line-edit-text");
    },

    text: function(text){
      var $el = this.element, o = this.options;
      var $input = $el.find('input');
      if( arguments.length ){
        $input.val(text);
        o.text = text;
      } else {
        return o.text;
      }
    },

    placeholder: function(text){
      var $el = this.element, o = this.options;
      var $input = $el.find('input');
      if( arguments.length ){
        $input.attr("placeholder", text);
        o.placeholder = text;
      } else {
        return o.placeholder;
      }
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appLineEdit.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Checkbox */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appCheckbox", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      textAlign: "left",
      checkable: false,
      initSelector: "[data-role='appCheckbox']"
    },
    _create: function ()
    {
      var $el = this.element, self = this, o = this.options;
      this.$checkbox = $("<input type='checkbox' style='height: 100%;'></input>");
      var $child = $("<label style='height: 100%;'></label>");

      this.$checkbox.attr("id", $el[0].id+"_check");
      $child.attr("for", this.$checkbox[0].id);
      $child.addClass("button-text");

      $el.append(this.$checkbox);
      $el.append($child);

      if(o.text === ""){
        o.text = "checkbox";
      }
      self.text(o.text);

      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }

      if(o.textSize !== ""){
        $child[0].style.fontSize = o.textSize;
      }

      if(o.checkable){
        self.checked(o.checkable);
      }
      $child[0].style.textAlign = o.textAlign;
      self.verticalAlignCenter(".button-text");
      self._attachEvent();
    },

    _attachEvent: function() {
      var $el = this.element, self = this, $checkbox = this.$checkbox, o = this.options;
      $el.change(function(){
        var check = $checkbox.prop("checked");
        self.checked(check);
        return false;
      });
    },

    checked: function(chk){
      var $checkbox = this.$checkbox, o = this.options;
      var boolChk;
      if( chk !== undefined ){
        if( typeof chk === "string"){
          boolChk = (chk === "true");
        } else {
          boolChk = chk;
        }
      }
      if(arguments.length){
        var checked = "checked";
        if( boolChk ){
          $checkbox.prop("checked", true);
        } else {
          $checkbox.removeAttr("checked");
        }
        o.checkable = boolChk;
      } else {
        return o.checkable;
      }
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appCheckbox.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Radio */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appRadio", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      textAlign: "left",
      group: "",
      value: "",
      checkable: false,
      initSelector: "[data-role='appRadio']"
    },
    _create: function ()
    {
      var $el = this.element, self = this, o = this.options;
      this.$radio = $("<input type='radio' style='height: 100%;'></input>");
      var $child = $("<label style='height: 100%;'></label>");

      this.$radio.attr("id", $el[0].id+"_check");
      $child.attr("for", this.$radio[0].id);
      $child.addClass("button-text");

      $el.append(this.$radio);
      $el.append($child);

      if(o.text === ""){
        o.text = "Radio";
      }
      self.text(o.text);
      self.$radio[0].value = o.value;

      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }

      if(o.textSize !== ""){
        $child[0].style.fontSize = o.textSize;
      }

      if(o.group !== ""){
        self.grouped(o.group);
      }

      if(o.checkable){
        this.$radio.attr("checked", "checked");
      }
      $child[0].style.textAlign = o.textAlign;
      self.verticalAlignCenter(".button-text");
      self._attachEvent();
    },

    _attachEvent: function() {
      var $el = this.element, self = this, $radio = this.$radio, o = this.options;
      $el.change(function(){
        var check = $radio[0].checked;
        self.checked(check);
        return false;
      });
    },

    value: function(val){
      var $range = this.$range, o = this.options;
      if( arguments.length ){
        self.$radio[0].value = val;
        o.value = val;
      } else {
        return o.value;
      }
    },

    grouped: function(group){
      var $radio = this.$radio, o = this.options;
      if( arguments.length ){
        $radio.attr("name", group);
        o.group = group;
      } else {
        return o.group;
      }
    },

    checked: function(chk){
      var $radio = this.$radio, o = this.options;
      var boolChk;
      if( chk !== undefined ){
        if( typeof chk === "string"){
          boolChk = (chk === "true");
        } else {
          boolChk = chk;
        }
      }
      if(arguments.length){
        var checked = "checked";
        if( boolChk ){
          $radio.attr("checked", checked);
        } else {
          $radio.removeAttr("checked");
        }
        o.checkable = boolChk;
      } else {
        return $radio[0].checked;
      }
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appRadio.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Slider(jquerymobile slider) */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appSlider", $.mobile.appBase, {
    options:{
      min: 0,
      max: 100,
      value: 50,
      step: 1,
      input: false,
      initSelector: "[data-role='appSlider']"
    },
    _create: function (){
      var $el = this.element, self = this, o = this.options;

      this.$label = $("<label></label>");
      this.$range = $("<input data-type='range' data-mini='true'></input>");

      this.$label.attr("for", $el[0].id+"_slider");
      this.$range.attr("id", $el[0].id+"_slider");
      this.$range.attr("name", $el[0].id+"_slider");

      if(!o.input){
        $el.addClass("full-width-slider");
      }
      this.min(o.min);
      this.max(o.max);
      this.value(o.value);
      this.step(o.step);

      $el.append(this.$label);
      $el.append(this.$range);

      this.$range.slider();
      this._attachEvent();
    },

    _attachEvent: function(){
      var $el = this.element, $range = this.$range, o = this.options;
      $el.on( "slidestop", function(e, ui) {
          var value = $range.val();
          o.value = value;
      });
    },

    min: function(min){
      var $range = this.$range, o = this.options;
      if( arguments.length ){
        $range.attr("min", min);
        o.min = min;
      } else {
        return o.min;
      }
    },
    max: function(max){
      var $range = this.$range, o = this.options;
      if( arguments.length ){
        $range.attr("max", max);
        o.max = max;
      } else {
        return o.max;
      }
    },
    value: function(value){
      var $range = this.$range, o = this.options;
      if( arguments.length ){
        $range.attr("value", value);
        o.value = value;
      } else {
        return o.value;
      }
    },
    step: function(step){
      var $range = this.$range, o = this.options;
      if( arguments.length ){
        $range.attr("step", step);
        o.step = step;
      } else {
        return o.step;
      }
    }

  });
  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appSlider.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Switch */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appSwitch", $.mobile.appBase, {
    options:{
      onText:"ON",
      offText: "OFF",
      checkable: false,
      initSelector: "[data-role='appSwitch']"
    },
    _create: function (){
      var $el = this.element, self = this, o = this.options;

      this.$label = $('<label></label>');
      this.$select = $("<select data-role='range' data-mini='true'></select>");

      this.$label.attr("for", $el[0].id+"_switch");
      this.$select.attr("name", $el[0].id+"_switch");

      this.offText(o.offText);
      this.onText(o.onText);

      $el.append(this.$label);
      $el.append(this.$select);

      this.$select.slider();

      if(typeof o.checkable === "string"){
        o.checkable = (o.checkable === "true")
      }
      if(o.checkable){
        self.checked(o.checkable);
      }

      this._attachEvent();
    },

    _attachEvent: function(){
      var $el = this.element, $select = this.$select, o = this.options;
      $select.on( "slidestop", function(e, ui) {
        var $slider = $(this).data("mobileSlider");
        o.checkable = ($slider.value === 1);
        $el.trigger("change", o.checkable );
      });
    },

    checked: function(chk){
      var $select = this.$select, o = this.options;
      var onText = this.onText().toLowerCase();
      var offText = this.offText().toLowerCase();
      var boolChk;
      if( chk !== undefined ){
        if( typeof chk === "string"){
          boolChk = (chk === "true");
        } else {
          boolChk = chk;
        }
      }
      if(arguments.length){
        var checked = "checked";
        if( boolChk ){
          $select.val(onText).slider('refresh');
        } else {
          $select.val(offText).slider('refresh');
        }
        o.checkable = boolChk;
      } else {
        return o.checkable;
      }
    },
  
    onText: function(text){
      var $select = this.$select, o = this.options;
      if( arguments.length ){
        var $on = $("<option></option>");
        $on.attr("value", text.toLowerCase());
        $on.text(text);
        o.onText = text;
        $select.append($on);
      } else {
        return o.onText;
      }
    },

    offText: function(text){
      var $select = this.$select, o = this.options;
      if( arguments.length ){
        var $off = $("<option></option>");
        $off.attr("value", text.toLowerCase());
        $off.text(text);
        o.offText = text;
        $select.append($off);
      } else {
        return o.offText;
      }
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appSwitch.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Progress */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appProgress", $.mobile.appBase, {
    options:{
      value: 10,
      initSelector: "[data-role='appProgress']"
    },
    _create: function (){
      var $el = this.element, o = this.options;

      $el.progressbar();
      this.value(o.value);
    },

    value: function(value){
      var $el = this.element, o = this.options;
    
      if( arguments.length ){
        $el.progressbar("value", parseInt(value));
        o.value = value;
      } else {
        return o.value;
      }
    }
  });
  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appProgress.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Combo */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appCombo", $.mobile.appBase, {
    options:{
      items:"a\nb\nc",
      currentItem: "c",
      initSelector: "[data-role='appCombo']"
    },
    _create: function (){
      var $el = this.element, self = this, o = this.options;

      this.$range = $("<select data-mini='true'></select>");
      this.$range.attr("id", $el[0].id+"_combo");
      this.$range.attr("name", $el[0].id+"_combo");

      $el.append(this.$range);

      var items = this._stringToArray(o.items);
      for( var i=0; i<items.length; i++){
        var $option = $("<option></option>");
        $option.attr("value", items[i]);
        $option.text(items[i]);
        self.$range.append($option);
      }
      self.currentItem(o.currentItem);
      self._attachEvent();
    },

    _stringToArray: function(string){
      var o = this.options;
      var stringList = [];
      if( arguments.length ){
        stringList = string.split("\n");
      }
      return stringList;
    },
    _attachEvent: function() {
      var $el = this.element, self = this, $range = this.$range, o = this.options;
      $el.change(function(){
        var item = $range.val();
        $range.children().each( function(){
          var $this = $(this);
          $this.removeAttr("selected");
        });
        self.currentItem(item);
        o.currentItem = item;
      });
    },

    currentItem: function(item){
      var $range = this.$range, o = this.options, self = this;
      var items = self._stringToArray(o.items);
      if( arguments.length ){
        var index = items.indexOf(item.toString());
        $range.children().eq(index).attr("selected", "selected");
        o.currentItem = items[index];
      } else {
        return o.currentItem;
      }
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appCombo.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory Textarea */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appTextarea", $.mobile.appBase, {
    options:{
      text: "",
      textSize: "",
      textColor: "",
      textAlign: "left",
	    disabled: "false",
      initSelector: "[data-role='appTextarea']"
    },
    _create: function(){
      var $el = this.element, self = this, o = this.options;
      $el.append("<textarea></textarea>");

      self.text(o.text);
	  
      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }

      if(o.textSize !== ""){
        self.textSize(o.textSize);
      }

      if(o.textAlign !== ""){
        self.textAlign(o.textAlign);
      }

      this.disabled(o.disabled);
      this._attachEvent();
    },

    _attachEvent: function(){
      var $el = this.element, self = this, o = this.options;
      $el.find("textarea").on("focus blur", function(e){
        var $this = $(this);
        self.text($this.val());
      });
    },

    disabled: function(disable){
      var $el = this.element, o = this.options;
      var $child = $el.find("textarea");
      if( arguments.length ){
        var value = (disable === "true");
        $child.prop("readonly", value);
        o.disabled = value;
      } else {
        return o.disabled;
      }
    },

    text: function(text){
      var $el = this.element, o = this.options;
      var $child = $el.find("textarea");
      if( arguments.length ){
        $child.text(text);
        o.text = text;
      } else {
        return o.text;
      }
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appTextarea.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);

/* appcessory ListView */
(function ($, undefined ){
  // component definition
  $.widget ("mobile.appListView", $.mobile.appBase, {
    options:{
      items:"a\nb\nc",
      textSize: "",
      textColor: "",
      textAlign: "left",
      backgroundColor: "",
      currentItem: "",
      initSelector: "[data-role='appListView']"
    },


    _create: function (){
      var $el = this.element, self = this, o = this.options;

      this.$range = $("<div></div>");
      this.$range.attr("id", $el[0].id+"_listview");
      this.$range.attr("name", $el[0].id+"_listview");
      o.itemId = 1;
      o.selectedId = "";
      o.id = $el[0].id;

      $el.append(this.$range);

      if(o.textColor !== ""){
        self.textColor(o.textColor);
      }
      if(o.textSize !== ""){
        self.textSize(o.textSize);
      }

      var items = this._stringToArray(o.items);
      for( var i=0; i<items.length; i++){
        var itemId = this._getNewId();
        this._addItem(itemId, items[i]);
      }

      this.backgroundColor(o.backgroundColor);

      self.currentItem(o.currentItem);
    },

    selectById: function(itemId){
      var self = this;
      //o.selectedId = itemId;
      //console.log("id: " + o.selectedId);

      self._changeSelection(itemId);
    },

    currentItem: function(string) {
      var self = this;
      if( arguments.length ){
        var $children = self.$range.children();
        for (var $i = 0; $i < $children.length; $i++) {
          if ($children[$i].innerText == string)
          {
            self.selectById($children[$i].id);
            break;
          }
        }
      } else {
        return self.getSelection();
      }
    },

    _changeSelection: function(itemId) {
      var o = this.options;

      if (o.selectedId == itemId)
        return;

      if (o.selectedId.length > 0) {
        var $oldSelectedItem = $("#" + o.selectedId);
        if ($oldSelectedItem != null)
          $oldSelectedItem[0].style.backgroundColor = o.backgroundColor;
      }

      o.selectedId = "";
      if (itemId.length <= 0)
        return;

      var $item = $("#" + itemId);
      if ($item != null) {
        $item[0].style.backgroundColor = "lightblue";
        o.selectedId = itemId;
      }

      /*var $children = this.$range.children();
      for (var $i = 0; $i < $children.length; $i++) {
        if ($children[$i].id == o.selectedId)
          $children[$i].style.backgroundColor = "lightblue";
        else
          $children[$i].style.backgroundColor = o.backgroundColor;
      }*/
    },

    _getNewId: function() {
      var o = this.options;
      var $newItemId = o.id + "lvitem" + o.itemId;
      o.itemId++;
      return $newItemId;
    },

    addText: function (string) {
        var o = this.options;

        var itemId = this._getNewId();
        this._addItem(itemId, string);
    },

    clear: function() {
      var self = this;
      self.$range.empty();
    },

    removeByText: function(string) {
      var self = this;

      var $children = self.$range.children();
      for (var $i = 0; $i < $children.length; $i++) {
        if ($children[$i].innerText == string)
        {
          $children[$i].remove();
        }
      }
    },

    getSelection: function() {
      var o = this.options;

      if (o.selectedId.length <= 0)
        return "";
      var $item = $("#" + o.selectedId);
      if ($item == null)
        return "";

      return $item[0].innerText;
    },

    unselectAll: function() {
      var o = this.options;

      o.selectedId = "";
      this._changeSelection("");
    },

    _addItem: function (itemId, string) {
      var self = this;
      var connectParent = "$(\"#\" + $(this).parent()[0].parentNode.id).appListView(\"selectById\", \"" + itemId + "\");";
      var $option = $("<div id='" + itemId + "' style='cursor: hand;' onclick='javascript:" + connectParent + "'></div>");
      $option.text(string);
      self.$range.append($option);
    },

    _stringToArray: function(string){
      var stringList = [];
      if( arguments.length ){
        stringList = string.split("\n");
      }
      return stringList;
    }
  });

  // taking into account of the component when creating the window
  // or at the create event
  $(document).bind ("pagecreate create", function (e) {
    $.mobile.appListView.prototype.enhanceWithin( e.target, true );
  });
}) (jQuery);