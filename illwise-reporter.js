/***
 * the intern - illwise reporter
 * 
 * @description The illwise reporter is an optimized reporter for functional tests using the intern + selenium
 * @author neschkudla patrick
 * @version 1.0
 */

var indent = '    ';
var showTimeout = false;
var error_codes = function(){/*SUCCESS = 0<br />
	NO_SUCH_ELEMENT = 7<br />
	NO_SUCH_FRAME = 8<br />
    UNKNOWN_COMMAND = 9<br />
    STALE_ELEMENT_REFERENCE = 10<br />
    ELEMENT_NOT_VISIBLE = 11<br />
    INVALID_ELEMENT_STATE = 12<br />
    UNKNOWN_ERROR = 13<br />
    ELEMENT_IS_NOT_SELECTABLE = 15<br />
    JAVASCRIPT_ERROR = 17<br />
    XPATH_LOOKUP_ERROR = 19<br />
    TIMEOUT = 21<br />
    NO_SUCH_WINDOW = 23<br />
    INVALID_COOKIE_DOMAIN = 24<br />
    UNABLE_TO_SET_COOKIE = 25<br />
    UNEXPECTED_ALERT_OPEN = 26<br />
    NO_ALERT_OPEN = 27<br />
    SCRIPT_TIMEOUT = 28<br />
    INVALID_ELEMENT_COORDINATES = 29<br />
    IME_NOT_AVAILABLE = 30;<br />
    IME_ENGINE_ACTIVATION_FAILED = 31<br />
    INVALID_SELECTOR = 32<br />
    MOVE_TARGET_OUT_OF_BOUNDS = 34<br />
    INVALID_XPATH_SELECTOR = 51<br />
    INVALID_XPATH_SELECTOR_RETURN_TYPER = 52<br />
    METHOD_NOT_ALLOWED = 405
*/}.toString().slice(14,-3);
    
define(['intern/node_modules/dojo/node!fs'], function (fs) {
	var indent = '    ';
	var html = '';
	
	function writeReportHtml(suite){
		var html = '<html><head><meta http-equiv="refresh" content="5;"><title>'+suite.name+' - Testing Report</title><style>.error-codes{ font-size:10px; } *{ font-family:Helvetica,Tahoma, Arial, sans-serif; }</style></head><body><h1>'+suite.name+'</h1>';
		html += '<h3>'+suite.numFailedTests+' tests have failed</h3>';

		html += '<ul>';
		for(var i = 0; i < suite.tests.length; i++){
			if(!suite.tests[i].hasPassed){
				html += '<li>'+suite.tests[i].name+' failed:';
				html += '<ul><li><pre>'+suite.tests[i].error+'</pre></li></ul>';
				html += '</li>';
			}
		}
		html += '</ul><br /><p class="error-codes">'+error_codes+'</p></body></html>';
		
		fs.writeFile('report.html', html, function (err){
			if(err) throw err;
		});
	}
	
    return {
        '/test/start': function (test) {
        	console.log('');
            console.log("Testcase: "+test.name + ' started ');
            if(showTimeout) console.log(indent+'- Accepting timeout of '+((test.timeout)/1000)+'s');
        },
        '/test/end': function (test) {
            console.log(indent + '- ended with '+((test.hasPassed) ? 'SUCCESS' : 'ERRORS'));
            
            if(!test.hasPassed){
            	console.log(indent+indent+'- '+test.error.name+': '+test.error.message);
            	//console.log(JSON.stringify(test, null, 4));
            }
        	console.log('');
        },
        '/suite/start': function(suite) {
        	if(suite.numTests > 0 && suite.name != 'main'){
            	console.log('');
            	console.log('*************************************************');
        		console.log('Starting Suite "'+suite.name+'" with '+suite.numTests+' tests');
        	}
        },
        '/suite/end': function(suite) {
        	if(suite.numTests > 0 && suite.name != 'main'){
            	console.log('');
        		console.log('Ended Suite "'+suite.name+'" with '+(suite.numTests-suite.numFailedTests)+'/'+suite.numTests+' SUCCESSFUL tests');
        		if(suite.numFailedTests > 0){
        			for(var i = 0; i < suite.tests.length; i++){
        				if(!suite.tests[i].hasPassed)
        					console.log(indent+'- '+suite.tests[i].name+' FAILED');
        			}
        		}
            	console.log('*************************************************');
            	writeReportHtml(suite);
        	}
        }
    };
});


/***
*
* selenium error codes

	SUCCESS = 0
    NO_SUCH_ELEMENT = 7
    NO_SUCH_FRAME = 8
    UNKNOWN_COMMAND = 9
    STALE_ELEMENT_REFERENCE = 10
    ELEMENT_NOT_VISIBLE = 11
    INVALID_ELEMENT_STATE = 12
    UNKNOWN_ERROR = 13
    ELEMENT_IS_NOT_SELECTABLE = 15
    JAVASCRIPT_ERROR = 17
    XPATH_LOOKUP_ERROR = 19
    TIMEOUT = 21
    NO_SUCH_WINDOW = 23
    INVALID_COOKIE_DOMAIN = 24
    UNABLE_TO_SET_COOKIE = 25
    UNEXPECTED_ALERT_OPEN = 26
    NO_ALERT_OPEN = 27
    SCRIPT_TIMEOUT = 28
    INVALID_ELEMENT_COORDINATES = 29
    IME_NOT_AVAILABLE = 30;
    IME_ENGINE_ACTIVATION_FAILED = 31
    INVALID_SELECTOR = 32
    MOVE_TARGET_OUT_OF_BOUNDS = 34
    INVALID_XPATH_SELECTOR = 51
    INVALID_XPATH_SELECTOR_RETURN_TYPER = 52
    METHOD_NOT_ALLOWED = 405
    
*/

