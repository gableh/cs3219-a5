setTimeout(function(){ 

	$("iframe").each(function(index, frame) {
		frame.contentWindow.postMessage('{' +
			'"body": {"background": "transparent"},' +
			'"#chart-container": {"height": "450px", "margin":"0"},' +
			'"select": {"-webkit-appearance": "button",' +
						'"-webkit-border-radius": "0px",' +  
						'"-webkit-box-shadow": "0px 1px 3px rgba(0, 0, 0, 0.1)",' +
						'"-webkit-padding-end": "20px",' +  
						'"-webkit-padding-start": "2px",' +  
						'"-webkit-user-select": "none",' +  
						'"background-image": "url(http://i62.tinypic.com/15xvbd5.png)",' +  
						'"background-position": "97% center",' +  
						'"background-repeat": "no-repeat",' +  
						'"color": "#555",' +
						'"font-size": "inherit",' +
						'"margin": "0px 10px 0px 10px",' +
						'"overflow": "hidden",' +
						'"padding": "5px 10px",' +
						'"text-overflow": "ellipsis",' +
						'"white-space": "nowrap",' +
						'"width": "50%",' +
						'"display": "inline-block",' +
						'"border": "1px solid #AAA"},' +
			'"#styles": {"margin-top": "20px"},' + 
			'"#options": {"text-align": "center"},' +
			'"#options select": {"width": "110px"},' +
			'"input": {"width": "200px"},' +
			'"#center-input": {"width": "350px"},' +
			'"#distance-input": {"width": "100px"},' +
			'"#raphael-paper-5": {"background-color": "transparent !important"},' +
			'".form-group": {"text-align": "center"},' +
			'"#submit": {"display": "inline-block", "margin-left":"10px", "background-color":"rgba(0, 0, 0, 0.3)" }' +
		    '}', '*');
	});

}, 3000);