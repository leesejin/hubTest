/*
 * Appcessory Testing Script
 * Author: haejung@sptek.co.kr
 */ 

  /*
  * Implement a ConnectionChangedListener
  * It just pass a state from native library to UI component.
  */
function ConnectionChagnedListener(state) {
	console.log("ConnectionChangedListener: " + state);
	if(state == 'connected')
	{
		// TODO: Trigger an event to the Device Component which named "ConnectionChangedListener" with 'onConnected'
		var evtObjs = $app.getTriggerObjects("onConnected");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "onConnected",
                value: true
           });
        }
	}
	else if(state == 'disconnected')
	{
		// TODO: Trigger an event to the Device Component which named "ConnectionChangedListener" with 'onDisconnected'
		var evtObjs = $app.getTriggerObjects("onDisconnected");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "onDisconnected",
                value: false
           });
        }
	}
	else if(state == 'attached')
	{
		// TODO: Trigger an event to the Device Component which named "ConnectionChangedListener" with 'onAttachedUSB'
		var evtObjs = $app.getTriggerObjects("onAttachedUSB");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "onAttachedUSB",
                value: true
           });
        }
	}
	else if(state == 'detached')
	{
		// TODO: Trigger an event to the Device Component which named "ConnectionChangedListener" with 'onDetachedUSB'
		var evtObjs = $app.getTriggerObjects("onDetachedUSB");
        for (var i = 0; i < evtObjs.length; i++)
        {
            $(evtObjs[i]).trigger({
                interfaceparam: true,
                type: "onDetachedUSB",
                value: false
           });
        }
	}			
}

 /*
  * Implement a InitializeCompleteListener
  * It just notify the board has initialized from native library to UI component.
  */
function BoardInitializeCompleteListener() {
	console.log("BoardInitializeCompleteListener");
	// TODO: Trigger an event to the Device Component which named "InitializeCompleteListener" with 'onInitialized'.
	var evtObjs = $app.getTriggerObjects("onInitialized");
    for (var i = 0; i < evtObjs.length; i++)
    {
        $(evtObjs[i]).trigger({
            interfaceparam: true,
            type: "onInitialized",
            value: true
       });
    }
}

 /*
  * Implement a ReceiveHandler for UI Component
  * Handling all of message from native
  */
var ReceiveHandlerJS = {
	receiveBoardSignData: function(signData) {
		console.log("Receive BoardSign: " + signData);
		// TODO: Trigger an event to the Device Component which Appcessory Base's [receiveBoardSignData]
		var evtObjs = $app.getTriggerObjects("receiveBoardSignData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveBoardSignData",
				index: 0,
				value: signData 
	       });
	    }
	},
	receiveBoardParam: function(paramvalue)	{
		console.log("Receive BoardParam: " + paramvalue);
		// TODO: Trigger an event to the Device Component which Appcessory Base's [receiveBoardParam]
		var evtObjs = $app.getTriggerObjects("receiveBoardParam");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveBoardParam",
				index: 0,
				value: paramvalue 
	       });
	    }
    },
    receiveUserMsgData: function(data) {
    	console.log("Receive UserMsgData: " + data);
		// TODO: Trigger an event to the Device Component which Appcessory Base's [receiveUserMsgData]
        var evtObjs = $app.getTriggerObjects("receiveUserMsgData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveUserMsgData",
				index: 0,
				value: data
	       });
	    }
    },
    changedGPIOSetting: function(indexes, inout)	{
        console.log("Receive GPIOSetting: " + indexes + " - " + inout);
		// TODO: Trigger an event to the Device Component which GPIO's [changedGPIOSetting]
        var evtObjs = $app.getTriggerObjects("changedGPIOSetting");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedGPIOSetting",
				index: indexes,
				value: inout
	       });
	    }
    },
    receiveGPIOData: function(indexes, onoff)	{
    	console.log("Receive GPIOData: " + indexes + " - " + onoff);
		// TODO: Trigger an event to the Device Component which GPIO's [receiveGPIOData]
		var evtObjs = $app.getTriggerObjects("receiveGPIOData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveGPIOData",
				index: indexes,
				value: onoff
	       });
	    }
    },
    changedADCSetting: function(index, samplingrate)	{
        console.log("Receive ADCSetting: " + index + " - " + samplingrate);
		// TODO: Trigger an event to the Device Component which ADC's [changedADCSetting]
        var evtObjs = $app.getTriggerObjects("changedADCSetting");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedADCSetting",
				index: index,
				value: samplingrate
	       });
	    }
    },
    receiveADCData: function(index, value)	{
    	console.log("Receive ADCData: " + index + " - " + value);
		// TODO: Trigger an event to the Device Component which ADC's [receiveADCData]
		var evtObjs = $app.getTriggerObjects("receiveADCData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveADCData",
				index: index,
				value: value
	       });
	    }
	},
	changedUARTSetting: function(index, baudrate, databit, parity, stopbit)	{
    	console.log("Receive UARTSetting: " + index + " - " + baudrate + ", " + databit + ", " + parity + ", " + stopbit);
		// TODO: Trigger an event to the Device Component which UART's [changedUARTSetting]
		var evtObjs = $app.getTriggerObjects("changedUARTBaudRate");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedUARTBaudRate",
				index: index,
				value: baudrate
	       });
	    }
	    evtObjs = $app.getTriggerObjects("changedUARTDataBit");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedUARTDataBit",
				index: index,
				value: databit
	       });
	    }
	    evtObjs = $app.getTriggerObjects("changedUARTParityBit");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedUARTParityBit",
				index: index,
				value: parity
	       });
	    }
	    evtObjs = $app.getTriggerObjects("changedUARTStopBit");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedUARTStopBit",
				index: index,
				value: stopbit
	       });
	    }
    },
    receiveUARTData: function(index, data)	{
        console.log("Receive UARTData: " + index + " - " + data);
		// TODO: Trigger an event to the Device Component which UART's [receiveUARTData]
        var evtObjs = $app.getTriggerObjects("receiveUARTData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveUARTData",
				index: index,
				value: data
	       });
	    }
    },
    changedPWMSetting: function(frequency)	{
    	console.log("Receive PWMSetting: " + frequency);
		// TODO: Trigger an event to the Device Component which PWM's [changedPWMSetting]
		var evtObjs = $app.getTriggerObjects("changedPWMSetting");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedPWMSetting",
				index: 0,
				value: frequency
	       });
	    }
    },
    changedPWMfrequency: function(index, count)	{
    	console.log("Receive PWMfrequency: " + index + " - " + count);
		// TODO: Trigger an event to the Device Component which PWM's [changedPWMfrequency]
		var evtObjs = $app.getTriggerObjects("changedPWMfrequency");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedPWMfrequency",
				index: index,
				value: count
	       });
	    }
    },
    changedSPISetting: function(index, clockHz)	{
    	console.log("Receive SPISetting: " + index + " - " + clockHz);
		// TODO: Trigger an event to the Device Component which SPI's [changedSPISetting]
        var evtObjs = $app.getTriggerObjects("changedSPISetting");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedSPISetting",
				index: index,
				value: clockHz
	       });
	    }
    },
    receiveSPIData: function(index, data)	{
    	console.log("Receive SPIData: " + index + " - " + data);
		// TODO: Trigger an event to the Device Component which SPI's [receiveSPIData]
        var evtObjs = $app.getTriggerObjects("receiveSPIData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveSPIData",
				index: index,
				value: data
	       });
	    }
    },
    changedI2CSetting: function(index, targetClkRate)	{
    	console.log("Receive I2CSetting: " + index + " - " + targetClkRate);
		// TODO: Trigger an event to the Device Component which I2C's [changedI2CSetting]
        var evtObjs = $app.getTriggerObjects("changedI2CSetting");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "changedI2CSetting",
				index: index,
				value: targetClkRate
	       });
	    }
    },
    receiveI2CData: function(index, data)	{
    	console.log("Receive I2CData: " + index + " - " + data);
		// TODO: Trigger an event to the Device Component which I2C's [receiveI2CData]
        var evtObjs = $app.getTriggerObjects("receiveI2CData");
	    for (var i = 0; i < evtObjs.length; i++)
	    {
	        $(evtObjs[i]).trigger({
	            interfaceparam: true,
	            type: "receiveI2CData",
				index: index,
				value: data 
	       });
	    }
    }
};
