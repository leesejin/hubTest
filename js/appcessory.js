$app = appcessory = {

	objects : { },
	triggers : [ ],
	actionSet : { },

	initialize : function() {
		var self = this;
		document.addEventListener("DOMContentLoaded", function() {
			self.translateActionSets();
			self.translateTriggers();
			self.bindTriggers();
		});
	},


	bindTriggers : function() {
		if (this.triggers instanceof Array) {
			for (var i = 0; i < this.triggers.length; i++)
				this.bindTrigger(this.triggers[i]);
		}
	},


	bindTrigger : function(trigger) {
		var sender = $("#" + trigger.sender);
		$("#" + trigger.sender).bind(trigger.event, function(ev) {
			for (var i = 0; i < trigger.actions.actions.length; i++) {
				var context = trigger.actions.context;
				var args = trigger.actions.actions[i].args;
				if (args.args.interfaceparam)
				{
					if (args.args.interfaceparam == true)
						args.args = ev;
				}
				context.trigger = trigger;
				context.event = ev;
				trigger.actions.execute(null, args);
			}
		});
	},


	translateActionSets : function() {
		for (var name in this.actionSet) {
			var value = this.actionSet[name];
			if (value instanceof Array) {	// ie. action defintion list
				var actions = [ ];
				for (var i = 0; i < value.length; i++) {
					actions[i] = this.translateActionDef(value[i]);
				}
				this.actionSet[name] = new ActionSet(actions);
			}
		}
	},


	translateTriggers : function() {
		for (var i = 0; i < appcessory.triggers.length; i++) {
			var trigger = appcessory.triggers[i];
			if (trigger.actions instanceof Array) {
				var actions = [ ];
				for (var j = 0; j < trigger.actions.length; j++) {
					actions[j] = this.translateActionDef(trigger.actions[j]);
				}
				trigger.actions = new ActionSet(actions);
			}
		}
	},


	translateActionDef : function(actionDef) {
		var args = actionDef;
		for (var key in args) {
			var value = args[key];
			if (value instanceof Array) {	// ie. action defintion list
				var subActions = [ ];
				for (var i = 0; i < value.length; i++) {
					subActions[i] = this.translateActionDef(value[i]);
				}
				args[key] = new ActionSet(subActions);
			}
		}
		return new Action(args);
	},
	
	receiveCallBackFunc: function(args, type){
		/* 
			받은 type에 따라 처리를 분리하여
			argument에 대해 처리하도록 한다.
		*/
	},

	getTriggerObjects: function(eventName) {
		var evtObjs = new Array();
		
		var nIdx = 0;
		for (var i = 0; i < appcessory.triggers.length; i++)
		{
			if (appcessory.triggers[i].event == eventName)
			{
				evtObjs[nIdx] = "#" + appcessory.triggers[i].sender;
			}
		}
		return evtObjs;
	}
};

//------------------------------------------------------------------------------
// Action

function Action(args) {
	this.func = args.name;
	this.args = args;
	this.userfunc = args.userfunc;
}

Action.prototype = {
	execute : function(context, args) {
		var func = eval(context.name);		
		if (typeof(func) === "function"){
			func(args[0], args[1], args[2], args[3], args[4]);			
		}
	},

	executeParam : function(context, args) {
		var func = eval(context.name);		
		if (typeof(func) === "function"){
			func(args);	
		}
	}

};


//------------------------------------------------------------------------------
// ActionSet

function ActionSet(actions) {
	this.actions = actions;
	this.context = {
		params : { }
	};
}

ActionSet.prototype = {

	execute : function(context, params) {
		this.context._parent = context;
		for (var key in params){
			this.context[key] = params[key];
		}

		var interfaceparam = false;
		if (params.args.interfaceparam)
		{
			interfaceparam = params.args.interfaceparam;
		}

		if (interfaceparam == true)
		{
			this.actions[0].executeParam(this.context, params.args);
		}
		else
		{
			var args = this.setArgument(params.args);
			this.actions[0].execute(this.context, args);
		}

		/*for (var i = 0; i < this.actions.length; i++){
			var args = this.setArgument(params.args);
			this.actions[i].execute(this.context, args);
		}*/
	},
	
	setArgument: function(context){		
		var newArg = [];
		for( var key in  context  ){	
			var value;
			if (key == "custom_value"){
				value = context[key];
			} else if ( key.split("_")[0] === "user" ){
				value = context[key];
			}else if ( key === "radioGroup" ){
				value = $app.utils.selectedGroupV(context[key].split(",")[0], context[key].split(",")[1]);
			}
			else {
				var valueType = context[key];
				var widgetName = $("#"+key).data("role");
				
				if(valueType === "text"){
					value = $("#"+key)[widgetName]("text");
				} else if(valueType === "checked") {
					value = $("#"+key)[widgetName]("checked");
				} else if(valueType === "value") {
					value = $("#"+key)[widgetName]("value");
				} else if(valueType === "currentItem") {
					value = $("#"+key)[widgetName]("currentItem");
				}
			}			
			newArg.push(value);
		}
		return newArg;	
	}

};



//------------------------------------------------------------------------------
// action list

BasicActions = { };








//------------------------------------------------------------------------------
// jQuery mobile Component

// TODO:





