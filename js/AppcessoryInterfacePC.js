// An Interface for providing an interface of the Appcessory
//cordova.define("com.incross.appcessoryInterface.AppcessoryInterface", function(require, exports, module) {
//var exec = require('cordova/exec');

// Utility function
function subFunctionName(szFunction) {
	var szRet = szFunction.toString();
	
	szRet = szRet.substr('function '.length);
	szRet = szRet.substr(0, szRet.indexOf('('));
	
	if(szRet.length > 0) 
		return szRet;
	else
		return szFunction.toString();
}

function convertStringToNumber(inData) {
    if((typeof inData) === 'string') 
        return parseInt(inData);
    else
        return inData;
}

function isArray(obj) {
	return (Object.prototype.toString.call(obj) === '[object Array]');
}

// Default callbacks, The user can change it.
var onSuccess = function(message) { console.log("onSuccess: " + message); }
var onFail = function(message) { console.log('onFail: ' + message); }

// Map for listeners
var mapOnConnectionChangeEventListener = new Object();
var mapOnAppcessoryInitCompleteListener = new Object();

// ReceiveHandler
var receiveHandlerJS = null;

// Exported interfaces
AppcessoryInterface = {
    connectTest: function() {
        var evtObjs = $app.getTriggerObjects("onConnected");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "onConnected",
                value: "message",
                index: 1
           });
        }
        console.log("connectTest");
        //, undefined, $app.triggers
    },
//module.exports = {
	// Notify the event the changed status of connection
	notifyOnConnectionChangeEvent: function(eventType) {
		for(var e in mapOnConnectionChangeEventListener) {
			if(mapOnConnectionChangeEventListener[e] != null && mapOnConnectionChangeEventListener[e] != undefined)
				mapOnConnectionChangeEventListener[e](eventType);
		}
	},
	
	// Notify the event the state of initilize
	notifyOnInitCompleteEvent: function() {
		for(var e in mapOnAppcessoryInitCompleteListener) {
			if(mapOnAppcessoryInitCompleteListener[e] != null && mapOnAppcessoryInitCompleteListener[e] != undefined)
				mapOnAppcessoryInitCompleteListener[e]();
		}
	},
 
    // Set a ReceiveHandler user defined
    setReceiveHanlder: function(handler) {
    	receiveHandlerJS = handler;
    },

    /* 
     * Appcessory Interfaces
     */
    
    // Load a Board XML file for setup environment
    loadBoardXML: function(path, successCallback, errorCallback) {
        console.log("APPCESSORY://loadBoardXML path: " + path + ", successCallback: " + successCallback + ", errorCallback: " + errorCallback);
    	if(successCallback == undefined) successCallback = null;
    	if(errorCallback == undefined) errorCallback = null;
    	//exec(successCallback, errorCallback, "AppcessoryInterface", "loadBoardXML", [path]);
    },
    
    getIsConnect: function(callback) {
        exec(callback, null, "AppcessoryInterface", "getIsConnect", []);
    },
    
    getConnectionState: function(callback)	{
        exec(callback, null, "AppcessoryInterface", "getConnectionState", []);
    },
    
    getBoardState: function(callback) {
        exec(callback, null, "AppcessoryInterface", "getBoardState", []);
    },
    
    getConnectionMethod: function(callback)	{
        exec(callback, null, "AppcessoryInterface", "getConnectionMethod", []);
    },
    
    addOnConnectionChangeEventListener: function(OnConnectionChangeEventListener) {
    	mapOnConnectionChangeEventListener[subFunctionName(OnConnectionChangeEventListener)] = OnConnectionChangeEventListener;
    },
    
    removeOnConnectionChangeEventListener: function(OnConnectionChangeEventListener) {
    	mapOnConnectionChangeEventListener[subFunctionName(OnConnectionChangeEventListener)] = null;
    },

    addOnAppcessoryInitCompleteListener: function(OnAppcessoryInitCompleteListener)	{
    	mapOnAppcessoryInitCompleteListener[subFunctionName(OnAppcessoryInitCompleteListener)] = OnAppcessoryInitCompleteListener;
    },

    removeOnAppcessoryinitCompleteListener: function(OnAppcessoryInitCompleteListener)	{
    	mapOnAppcessoryInitCompleteListener[subFunctionName(OnAppcessoryInitCompleteListener)] = null;
    },

    addConnection: function(type, successCallback, errorCallback) {
        console.log("APPCESSORY://addConnection type: " + type + ", successCallback: " + successCallback + ", errorCallback: " + errorCallback);
    	if(successCallback == undefined) successCallback = null;
    	if(errorCallback == undefined) errorCallback = null;
        //exec(successCallback, errorCallback, "AppcessoryInterface", "addConnection", [type]);
    },
    
    tryConnectbyUSB: function(successCallback, errorCallback)	{
    	if(successCallback == undefined) successCallback = null;
    	if(errorCallback == undefined) errorCallback = null;
        //exec(successCallback, errorCallback, "AppcessoryInterface", "tryConnectbyUSB", []);
        console.log("APPCESSORY// tryConnectbyUSB");
    },

    tryConnectbyBT: function(address, successCallback, errorCallback)	{
        console.log("APPCESSORY://tryConnectbyBT address: " + address + ", successCallback: " + successCallback + ", errorCallback: " + errorCallback);
    	if(successCallback == undefined) successCallback = null;
    	if(errorCallback == undefined) errorCallback = null;
        //exec(successCallback, errorCallback, "AppcessoryInterface", "tryConnectbyBT", [address]);
        var evtObjs = $app.getTriggerObjects("onConnected");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "onConnected",
                value: "tryConnectbyBT",
                index: 1
           });
        }
    },

    tryConnectbyTCPIP: function(ip, port, successCallback, errorCallback) {
    	//console.log("try TCPIP " + ip + " , " + port);
        console.log("APPCESSORY://function ip: " + ip + ", port: " + port + ", successCallback: " + successCallback + ", errorCallback: " + errorCallback);
    	var args = [ip, convertStringToNumber(port)];
    	
    	if(successCallback == undefined) successCallback = null;
    	if(errorCallback == undefined) errorCallback = null;
        //exec(successCallback, errorCallback, "AppcessoryInterface", "tryConnectbyTCPIP", args);

        $.event.trigger({
            type: "onConnected",
            value: "message",
            index: 1
       });
    },

    disconnectBoard: function(successCallback, errorCallback)	{
    	if(successCallback == undefined) successCallback = null;
    	if(errorCallback == undefined) errorCallback = null;
        exec(successCallback, errorCallback, "AppcessoryInterface", "disconnectBoard", []);
    },
  
    assignGPIO: function(moduleIndex, inout) {
    	var args = new Array();
    	if(isArray(moduleIndex)) {
    		for(var nLoop=0; nLoop < moduleIndex.length; nLoop++) {
    			moduleIndex[nLoop] = convertStringToNumber(moduleIndex[nLoop]);
    		}
    		args[0] = moduleIndex;
    	}
    	else {
    		args[0] = [convertStringToNumber(moduleIndex)];
    	}
    	if(isArray(inout)) {
    		args[1] = inout;
    	}
    	else {
    		args[1] = [inout];
    	}
        exec(onSuccess, onFail, "AppcessoryInterface", "assignGPIO", args);
    },

    setGPIOData: function(moduleIndex, onoff) {
    	var args = new Array();
    	if(isArray(moduleIndex)) {
    		for(var nLoop=0; nLoop < moduleIndex.length; nLoop++) {
    			moduleIndex[nLoop] = convertStringToNumber(moduleIndex[nLoop]);
    		}
    		args[0] = moduleIndex;
    	}
    	else {
    		args[0] = [convertStringToNumber(moduleIndex)];
    	}
    	if(isArray(onoff)) {
    		args[1] = onoff;
    	}
    	else {
    		args[1] = [onoff];
    	}
        exec(onSuccess, onFail, "AppcessoryInterface", "setGPIOData", args);
    },

    assignPWM: function(moduleIndex, ratio)	{
        var args = [convertStringToNumber(moduleIndex), convertStringToNumber(ratio)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "assignPWM", args);
        console.log("APPCESSORY// assignPWM>> moduleIndex: " + moduleIndex + ", ratio: " + ratio);
    },

    setPWMMode: function(prescaleValue)	{
        var args = [convertStringToNumber(prescaleValue)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "setPWMMode", args);
        console.log("APPCESSORY// setPWMMode>> prescaleValue: " + prescaleValue);
    },

    assignUART: function(moduleIndex, baudrate, databit, parity, stopbit)	{
        var args = [convertStringToNumber(moduleIndex),
                    convertStringToNumber(baudrate),
                    convertStringToNumber(databit),
                    convertStringToNumber(parity),
                    convertStringToNumber(stopbit)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "assignUART", args);
        console.log("APPCESSORY// assignUART>> moduleIndex: " + moduleIndex + ", baudrate: " + baudrate
             + ", databit: " + databit
              + ", parity: " + parity
               + ", stopbit: " + stopbit);
    },

    sendUARTData : function(moduleIndex, data)	{
        var args = [convertStringToNumber(moduleIndex), data];
        //exec(onSuccess, onFail, "AppcessoryInterface", "sendUARTData", args);
        console.log("APPCESSORY// sendUARTData>> moduleIndex: " + moduleIndex + ", data: " + data);
    },

    assignADC: function(moduleIndex, samplingRate) {
        var args = [convertStringToNumber(moduleIndex), convertStringToNumber(samplingRate)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "assignADC", args);
        console.log("APPCESSORY// assignADC>> moduleIndex: " + moduleIndex + ", samplingRate: " + samplingRate);
    },

    assignI2C: function(moduleIndex, targetclkrate)	{
        var args = [convertStringToNumber(moduleIndex), convertStringToNumber(targetclkrate)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "assignI2C", args);
        console.log("APPCESSORY// assignI2C>> moduleIndex: " + moduleIndex + ", targetclkrate: " + targetclkrate);
    },

    trasmitAndReceiveData: function(moduleIndex, slaveAddress, transData, transDataLen, receiveDataLen)	{
        var args = [convertStringToNumber(moduleIndex),
                    convertStringToNumber(slaveAddress),
                    transData,								// Array
                    convertStringToNumber(transDataLen),
                    convertStringToNumber(receiveDataLen)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "trasmitAndReceiveData", args);
        console.log("APPCESSORY// trasmitAndReceiveData>> moduleIndex: " + moduleIndex + ", slaveAddress: " + slaveAddress
             + ", transData: " + transData
              + ", transDataLen: " + transDataLen
               + ", receiveDataLen: " + receiveDataLen);
    },

    assignSPI: function(moduleIndex, frequency) {
        var args = [convertStringToNumber(moduleIndex), convertStringToNumber(frequency)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "assignSPI", args);
        console.log("APPCESSORY// assignSPI>> moduleIndex: " + moduleIndex + ", frequency: " + frequency);
    },

    readSPIData: function(moduleIndex, length) {
        var args = [convertStringToNumber(moduleIndex), convertStringToNumber(length)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "readSPIData", args);
        console.log("APPCESSORY// readSPIData>> moduleIndex: " + moduleIndex + ", length: " + length);
    },

    writeData: function(moduleIndex, data) {
        var args = [convertStringToNumber(moduleIndex), data];
        //exec(onSuccess, onFail, "AppcessoryInterface", "writeData", args);
        console.log("APPCESSORY// writeData>> moduleIndex: " + moduleIndex + ", data: " + data);
    },

    sendUSERMessage: function(data) {
        var args = [data];
        exec(onSuccess, onFail, "AppcessoryInterface", "sendUSERMessage", args);
    },

    requestBoardSign: function() {
        exec(onSuccess, onFail, "AppcessoryInterface", "requestBoardSign", []);
    },

    requestGetBoardParam : function(boardParam)	{
        var args = [convertStringToNumber(boardParam)];
        //exec(onSuccess, onFail, "AppcessoryInterface", "requestGetBoardParam", args);
        console.log("APPCESSORY// requestGetBoardParam>> boardParam: " + boardParam);
    },

    requestSetBoardParam: function(boardParam, paramValue)	{
        var args = [convertStringToNumber(boardParam), paramValue];
        exec(onSuccess, onFail, "AppcessoryInterface", "requestSetBoardParam", args);
    },

    /*
     * Receive Handler
     */ 
    receiveBoardSignData: function(signdata) {
//        console.log("call receiveBoardSignData");
        if(receiveHandlerJS != null && receiveHandlerJS.receiveBoardSignData != undefined)
        	receiveHandlerJS.receiveBoardSignData(signdata);
    },

    receiveBoardParam: function(paramvalue) {
//        console.log("call receiveBoardParam");
        if(receiveHandlerJS != null && receiveHandlerJS.receiveBoardParam != undefined)
        	receiveHandlerJS.receiveBoardParam(signdata);
    },

    changedGPIOSetting: function(indexes, inout) {
//        console.log("call changedGPIOSetting");
        if(receiveHandlerJS != null && receiveHandlerJS.changedGPIOSetting != undefined)
        	receiveHandlerJS.changedGPIOSetting(indexes, inout);
    },

    receiveGPIOData: function(indexes, onoff) {
//        console.log("call receiveGPIOData");
        if(receiveHandlerJS != null && receiveHandlerJS.receiveGPIOData != undefined)
        	receiveHandlerJS.receiveGPIOData(indexes, onoff);
    },

    changedADCSetting: function(index, samplingrate) {
//        console.log("call changedADCSetting");
        if(receiveHandlerJS != null && receiveHandlerJS.changedADCSetting != undefined)
        	receiveHandlerJS.changedADCSetting(index, samplingrate);
    },

    receiveADCData: function(index, value) {
//        console.log("call receiveADCData");
//        if(receiveHandlerJS != null && receiveHandlerJS.receiveADCData != undefined)
//        	receiveHandlerJS.receiveADCData(index, value);
        var evtObjs = $app.getTriggerObjects("receiveADCData");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "receiveADCData",
                value: "receiveADCData",
                index: 1
           });
        }
    },

    changedUARTSetting: function(index, baudrate, databit, parity, stopbit) {
//        console.log("call changedUARTSetting");
        if(receiveHandlerJS != null && receiveHandlerJS.changedUARTSetting != undefined)
        	receiveHandlerJS.changedUARTSetting(index, baudrate, databit, parity, stopbit);
    },

    receiveUARTData: function(index, data) {
//        console.log("call receiveUARTData");
        if(receiveHandlerJS != null && receiveHandlerJS.receiveUARTData != undefined)
        	receiveHandlerJS.receiveUARTData(index, data);
    },

    changedPWMSetting: function(prequency) {
//        console.log("call changedPWMSetting");
        if(receiveHandlerJS != null && receiveHandlerJS.changedPWMSetting != undefined)
        	receiveHandlerJS.changedPWMSetting(prequency);
    },

    changedPWMfrequency: function(index, count) {
//        console.log("call changedPWMfrequency");
        if(receiveHandlerJS != null && receiveHandlerJS.changedPWMfrequency != undefined)
        	receiveHandlerJS.changedPWMfrequency(index, count);
    },

    changedSPISetting: function(index, clockHz) {
//        console.log("call changedSPISetting");
        if(receiveHandlerJS != null && receiveHandlerJS.changedSPISetting != undefined)
        	receiveHandlerJS.changedSPISetting(index, clockHz);
    },

    receiveSPIData: function(index, data) {
//        console.log("call receiveSPIData");
        if(receiveHandlerJS != null && receiveHandlerJS.index, clockHz != undefined)
        	receiveHandlerJS.index, clockHz(index, data);
    },

    changedI2CSetting: function(index, targetClkRate) {
//        console.log("call changedI2CSetting");
        if(receiveHandlerJS != null && receiveHandlerJS.changedI2CSetting != undefined)
        	receiveHandlerJS.changedI2CSetting(index, targetClkRate);
    },

    receiveI2CData: function(index, data) {
//        console.log("call receiveI2CData");
        if(receiveHandlerJS != null && receiveHandlerJS.receiveI2CData != undefined)
        	receiveHandlerJS.receiveI2CData(index, data);
    },

    receiveUserMsgData: function(data) {
//        console.log("call receiveUserMsgData");
        if(receiveHandlerJS != null && receiveHandlerJS.receiveUserMsgData != undefined)
        	receiveHandlerJS.receiveUserMsgData(data);
    }
    // End
};

//});

