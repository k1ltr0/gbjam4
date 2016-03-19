
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_COLOR="A";
CFG_CONFIG="debug";
CFG_HOST="macos";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json;|*.fnt";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[bullet_enemy.png];type=image/png;width=6;height=6;\n[bullet_level_0.png];type=image/png;width=16;height=4;\n[bullet_level_1.png];type=image/png;width=5;height=3;\n[bullet_level_2.png];type=image/png;width=10;height=3;\n[bullet_level_3.png];type=image/png;width=10;height=6;\n[collisions.png];type=image/png;width=24;height=48;\n[enemies.png];type=image/png;width=55;height=9;\n[explosion.png];type=image/png;width=126;height=9;\n[powerup.png];type=image/png;width=4;height=6;\n[rectline_enemy.png];type=image/png;width=25;height=10;\n[ship.png];type=image/png;width=23;height=8;\n[tiles.png];type=image/png;width=512;height=512;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		// if( game.Suspended() ){
		// 	canvas.focus();
		// }
        canvas.focus();
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

/*
gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}
*/

gxtkGraphics.prototype.DrawPoly2=function(pts, texture, srcx, srcy)
{
// 0,0,0,0, 128,50,128,0, 128,250,128,128, 0,300,0,128
    for (var t=0; t<2; t++) {
        var x0, y0, x1, y1, x2, y2;
        var u0,u1,u2, v0,v1,v2;
        
        if (t==0)
        {
	        x0 = pts[0]; x1 = pts[4]; x2 = pts[8];
	        y0 = pts[1]; y1 = pts[5]; y2 = pts[9];
	        u0 = pts[2]; u1 = pts[6]; u2 = pts[10];
	        v0 = pts[3]; v1 = pts[7]; v2 = pts[11];
        } else {
	        x0 = pts[08]; x1 = pts[12]; x2 = pts[0];
	        y0 = pts[09]; y1 = pts[13]; y2 = pts[1];        	
	        u0 = pts[10]; u1 = pts[14]; u2 = pts[2];
	        v0 = pts[11]; v1 = pts[15]; v2 = pts[3];
        }

        // Set clipping area so that only pixels inside the triangle will
        // be affected by the image drawing operation
        this.gc.save(); 
        this.gc.beginPath(); 

        this.gc.moveTo(x0,y0);
        this.gc.lineTo(x1,y1);
        this.gc.lineTo(x2,y2);
        this.gc.lineTo(x0,y0);
        this.gc.closePath(); 
        this.gc.clip();
		  
        // Compute matrix transform
        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;

        // Draw the transformed image
        this.gc.transform(delta_a/delta, delta_d/delta,
                          delta_b/delta, delta_e/delta,
                          delta_c/delta, delta_f/delta);
                      
		  if (this.white) 
		  {                    
	        this.gc.drawImage(texture.image, 0,0);
        } else {
			  this.DrawImageTinted( texture.image,0,0,0,0,texture.swidth,texture.sheight );        
		  }
        this.gc.restore();
    }
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		chan.waSource.stop( 0 );
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		chan.waSource.stop( 0 );
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	chan.waSource.stop( 0 );
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}

var lp = new Object();
var lpscroll = 0.0;
var lpisscrollinit = false;

lp.ScrollInit = function()
{
    var canvas=document.getElementById( "GameCanvas" );
    var mouse_scroll = function(event) 
    {
        lpscroll=event.detail? event.detail*(-120) : event.wheelDelta;
        return false;
    }

    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
    document.addEventListener(mousewheelevt, mouse_scroll, false)

    lpisscrollinit = true;
};

lp.MouseScroll = function() 
{
    if (!lpisscrollinit) 
    {
        lp.ScrollInit()
    }

    return lpscroll;
};

// execute at the end of the stack
lp.ResetValues = function()
{
    lpscroll = 0;
};

lp.Html5Host = function()
{
    return document.location.host;
}


lp.OpenUrl = function( url, target)
{
    window.open(url, target);
}

lp.UrlParams = function( param_name ) {

    try
    {
        qs = document.location.href.split( "?" )[1];
        qs = qs.split("+").join(" ");

        var params = {}, tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])]
                = decodeURIComponent(tokens[2]);
        }

        if (undefined != params[param_name])
            return params[param_name]
    }
    catch(e)
    {
        // nothing here...
    }

    return "";
}


lp.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


function lpGetLanguage()
{
    var language = window.navigator.userLanguage || window.navigator.language;
    return language;
}



var showing_keyboard = false;

var KeyboardHTML5 = function()
{}


function isTouchDevice(){
    return typeof window.ontouchstart !== 'undefined';
}

KeyboardHTML5.Enable = function( text_field )
{
    if (!isTouchDevice())
        return
    if (!showing_keyboard)
    {
        showing_keyboard = true
        var input = document.createElement("input");
        var div = document.createElement("div");


        input.type = "text";
        input.class = "keyboardhtml5-input";

        div.class = "lightbox-input"
        div.appendChild(input);

        div.style.background = "rgba(0,0,0,0.6)";
        div.style.position = "fixed";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.top = "0";
        div.style.left = "0";

        input.style.width = "300px";
        input.style.height = "45px";
        input.style.fontSize = "30px";
        input.style.display = "block";
        input.style.margin = "20px auto";

        input.value = text_field.m_text;

        document.getElementsByTagName('body')[0].appendChild(div);

        setTimeout(function(){
            input.focus();
        }, 500)

        input.onkeydown = function(evt)
        {
            if (evt.keyCode == 13)
            {
                text_field.m_text = input.value;
                KeyboardHTML5.Disable(div, input);
            }
        }

        // div.onclick = function()
        // {
        //     KeyboardHTML5.Disable(this);
        // }
    }
}


KeyboardHTML5.Disable = function(div)
{
    document.getElementsByTagName('body')[0].removeChild(div);
    showing_keyboard = false;

    BBHtml5Game.Html5Game().GetCanvas().focus();
}


KeyboardHTML5.IsEnabled = function()
{
    return showing_keyboard;
}


var lp = new Object();
var lpscroll = 0.0;
var lpisscrollinit = false;

lp.ScrollInit = function()
{
    var canvas=document.getElementById( "GameCanvas" );
    var mouse_scroll = function(event) 
    {
        lpscroll=event.detail? event.detail*(-120) : event.wheelDelta;
        return false;
    }

    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
    document.addEventListener(mousewheelevt, mouse_scroll, false)

    lpisscrollinit = true;
};

lp.MouseScroll = function() 
{
    if (!lpisscrollinit) 
    {
        lp.ScrollInit()
    }

    return lpscroll;
};

// execute at the end of the stack
lp.ResetValues = function()
{
    lpscroll = 0;
};

lp.Html5Host = function()
{
    return document.location.host;
}


lp.OpenUrl = function( url, target)
{
    window.open(url, target);
}

lp.UrlParams = function( param_name ) {

    try
    {
        qs = document.location.href.split( "?" )[1];
        qs = qs.split("+").join(" ");

        var params = {}, tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])]
                = decodeURIComponent(tokens[2]);
        }

        if (undefined != params[param_name])
            return params[param_name]
    }
    catch(e)
    {
        // nothing here...
    }

    return "";
}


lp.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}




function enablePixelArt()
{
    var game=BBHtml5Game.Html5Game();
    var canvas=game.GetCanvas();
    var gc=canvas.getContext( '2d' );
    gc.imageSmoothingEnabled = false;
}


function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<152>";
	if((bb_app__app)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<152>";
		error("App has already been created");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<153>";
	bb_app__app=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<154>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<155>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnResize=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<177>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<181>";
	this.p_OnClose();
	pop_err();
	return 0;
}
function c_Game(){
	c_App.call(this);
	this.m__loadingTween=null;
	this.m__currentCamera=null;
	this.m__currentScene=null;
	this.m__loadingState=bb_game_LONENTERLOADING;
	this.m__showPopup=false;
	this.m__currentPopup=null;
	this.m__clsColor=c_lpColor.m_Black();
	this.m_toast_tail=null;
	this.m_toast_state_machine=3;
	this.m_toast_timer=0;
	this.m_toast_animation_time=1500;
	this.m_toast_font=null;
	this.m__frames_count=0;
	this.m__time_count=0.0;
	this.m__lastSceneId=0;
	this.implments={c_iDrawable:1};
}
c_Game.prototype=extend_class(c_App);
c_Game.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<19>";
	c_App.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<19>";
	pop_err();
	return this;
}
c_Game.m__instance=null;
c_Game.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_Game.prototype.p_PostCreate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<393>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<393>";
	var t_=this.m__currentScene.p_GetChildren().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<393>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<393>";
		var t_l=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<394>";
		t_l.p_Create();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<397>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<397>";
	var t_2=this.m__currentScene.p_GetGui().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<397>";
	while(t_2.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<397>";
		var t_l2=t_2.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<398>";
		t_l2.p_Create();
	}
	pop_err();
}
c_Game.prototype.p_OnCreate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<63>";
	c_Game.m__instance=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<64>";
	this.m__loadingTween=c_lpTween.m_CreateLinear(0.0,1.0,300.0,false);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<65>";
	var t_defCamera=c_lpCamera.m_new.call(new c_lpCamera,0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()),0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<66>";
	dbg_object(this).m__currentCamera=t_defCamera;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<68>";
	this.p_Create();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<70>";
	if(this.m__currentScene==null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<71>";
		error("Debes crear una escena, implementa 'Method GetScene:Scene(id:Int)'");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<74>";
	if(0>=this.m__currentScene.p_Cameras().p_Length2()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<76>";
		this.m__currentScene.p_AddCamera(t_defCamera);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<79>";
	if(this.m__currentScene.p_AutoCreate()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<80>";
		this.p_PostCreate();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<84>";
	pop_err();
	return 0;
}
c_Game.prototype.p_Update=function(){
	push_err();
	pop_err();
}
c_Game.prototype.p_OnUpdate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<89>";
	c_Time.m_OnUpdate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<91>";
	if(this.m__loadingState==bb_game_LONLOADING){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<92>";
		this.m__currentScene.p_SetLoadingState(this.m__currentScene.p_Loading());
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<95>";
	if(this.m__loadingState==bb_game_LONPLAYING){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<98>";
		if(this.m__showPopup){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<99>";
			this.m__currentPopup.p_Update();
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<101>";
			this.m__currentScene.p_Update();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<102>";
			this.p_Update();
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<105>";
		bb_asyncevent_UpdateAsyncEvents();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<108>";
	pop_err();
	return 0;
}
c_Game.prototype.p_OnLoading=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<115>";
	pop_err();
	return 0;
}
c_Game.prototype.p_OnBack=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<125>";
	if(this.m__showPopup){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<126>";
		this.m__currentPopup.p_Back();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<130>";
	var t_=this.m__currentScene.p_Back();
	pop_err();
	return t_;
}
c_Game.prototype.p_OnSuspend=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<134>";
	this.m__currentScene.p_Suspend();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<136>";
	pop_err();
	return 0;
}
c_Game.prototype.p_Render=function(){
	push_err();
	pop_err();
}
c_Game.prototype.p_ToastRender=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<274>";
	if(dbg_object(this).m_toast_tail!=null && dbg_object(this).m_toast_tail.p_Count()>0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<277>";
		var t_alpha=0.0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<278>";
		var t_color=bb_graphics_GetColor();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<281>";
		var t_1=dbg_object(this).m_toast_state_machine;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<282>";
		if(t_1==3){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<284>";
			dbg_object(this).m_toast_state_machine=0;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<285>";
			if(t_1==2){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<286>";
				dbg_object(this).m_toast_timer+=c_Time.m_Delta();
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<287>";
				t_alpha=1.0-(dbg_object(this).m_toast_timer)/((dbg_object(this).m_toast_animation_time)*0.2);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<289>";
				if((dbg_object(this).m_toast_timer)>=(dbg_object(this).m_toast_animation_time)*0.2){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<290>";
					dbg_object(this).m_toast_state_machine=3;
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<291>";
					dbg_object(this).m_toast_timer=0;
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<293>";
					dbg_object(this).m_toast_tail.p_RemoveLast();
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<294>";
					t_alpha=0.0;
				}
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<296>";
				if(t_1==1){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<297>";
					dbg_object(this).m_toast_timer+=c_Time.m_Delta();
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<299>";
					if((dbg_object(this).m_toast_timer)>=(dbg_object(this).m_toast_animation_time)*0.6){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<300>";
						dbg_object(this).m_toast_state_machine=2;
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<301>";
						dbg_object(this).m_toast_timer=0;
					}
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<304>";
					t_alpha=1.0;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<305>";
					if(t_1==0){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<306>";
						dbg_object(this).m_toast_timer+=c_Time.m_Delta();
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<307>";
						t_alpha=(dbg_object(this).m_toast_timer)/((dbg_object(this).m_toast_animation_time)*0.2);
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<309>";
						if((dbg_object(this).m_toast_timer)>=(dbg_object(this).m_toast_animation_time)*0.2){
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<310>";
							dbg_object(this).m_toast_state_machine=1;
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<311>";
							dbg_object(this).m_toast_timer=0;
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<313>";
							t_alpha=1.0;
						}
					}
				}
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<318>";
		if(dbg_object(this).m_toast_state_machine!=3){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<319>";
			bb_graphics_PushMatrix();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<321>";
			if(dbg_object(this).m_toast_font!=null){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<322>";
				bb_graphics_SetAlpha(t_alpha);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<323>";
				bb_graphics_SetColor(0.0,0.0,0.0);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<324>";
				bb_graphics_DrawRect(10.0,(bb_app_DeviceHeight()-80),(bb_app_DeviceWidth()-20),(dbg_object(this).m_toast_font.p_TextHeight(dbg_object(this).m_toast_tail.p_First())*2));
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<325>";
				bb_graphics_SetColor(dbg_array(t_color,0)[dbg_index],dbg_array(t_color,1)[dbg_index],dbg_array(t_color,2)[dbg_index]);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<327>";
				dbg_object(this).m_toast_font.p_DrawText(dbg_object(this).m_toast_tail.p_First(),(((bb_app_DeviceWidth())*0.5)|0),bb_app_DeviceHeight()-80,1,0.0);
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<329>";
				bb_graphics_SetAlpha(t_alpha);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<330>";
				bb_graphics_SetColor(0.0,0.0,0.0);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<331>";
				bb_graphics_DrawRect(10.0,(bb_app_DeviceHeight()-40),(bb_app_DeviceWidth()-20),20.0);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<332>";
				bb_graphics_SetColor(dbg_array(t_color,0)[dbg_index],dbg_array(t_color,1)[dbg_index],dbg_array(t_color,2)[dbg_index]);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<334>";
				bb_graphics_DrawText(dbg_object(this).m_toast_tail.p_First(),20.0,(bb_app_DeviceHeight()-35),0.0,0.0);
			}
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<337>";
			bb_graphics_PopMatrix();
		}
	}
	pop_err();
}
c_Game.prototype.p_OnRender=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<141>";
	bb_graphics_Cls(dbg_object(this.m__clsColor).m_r,dbg_object(this.m__clsColor).m_g,dbg_object(this.m__clsColor).m_b);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<146>";
	if(this.m__loadingState==bb_game_LONENTERLOADING){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<148>";
		if(!this.m__loadingTween.p_IsRunning()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<149>";
			this.m__loadingTween.p_Start();
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<152>";
		this.m__loadingTween.p_Update();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<153>";
		bb_graphics_SetAlpha(this.m__loadingTween.p_GetCurrentValue());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<154>";
		this.m__currentScene.p_LoadingRender();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<156>";
		if(this.m__loadingTween.p_GetCurrentValue()==1.0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<157>";
			this.m__loadingState=bb_game_LONLOADING;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<160>";
		pop_err();
		return 0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<164>";
	if(this.m__loadingState==bb_game_LONLOADING){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<166>";
		if(this.m__currentScene.p_GetLoadingState()<=0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<167>";
			this.m__loadingState=bb_game_LONENTERSCENE;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<168>";
			this.m__loadingTween.p_SetValues(1.0,0.0);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<171>";
		bb_lpresources_lpLoadToVideoMemory();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<172>";
		this.m__currentScene.p_LoadingRender();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<174>";
		pop_err();
		return 0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<177>";
	if(this.m__loadingState==bb_game_LONENTERSCENE){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<179>";
		if(!this.m__loadingTween.p_IsRunning()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<180>";
			this.m__loadingTween.p_Start();
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<183>";
		this.m__loadingTween.p_Update();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<184>";
		bb_graphics_SetAlpha(this.m__loadingTween.p_GetCurrentValue());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<185>";
		this.m__currentScene.p_LoadingRender();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<187>";
		if(this.m__loadingTween.p_GetCurrentValue()==0.0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<188>";
			this.m__loadingState=bb_game_LONPLAYING;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<191>";
		pop_err();
		return 0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<198>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<198>";
	var t_=this.m__currentScene.p_Cameras().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<198>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<198>";
		var t_c=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<199>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<201>";
		this.m__currentCamera=t_c;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<203>";
		if(dbg_object(t_c).m_Position.p_Width()!=dbg_object(t_c).m_ViewPort.p_Width() || dbg_object(t_c).m_Position.p_Height()!=dbg_object(t_c).m_ViewPort.p_Height()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<208>";
			bb_graphics_Scale(dbg_object(t_c).m_Position.p_Width()/dbg_object(t_c).m_ViewPort.p_Width(),dbg_object(t_c).m_Position.p_Height()/dbg_object(t_c).m_ViewPort.p_Height());
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<212>";
			bb_graphics_Translate(-(dbg_object(t_c).m_ViewPort.p_X2()*dbg_array(bb_graphics_GetMatrix(),0)[dbg_index]-dbg_object(t_c).m_Position.p_X2())/dbg_array(bb_graphics_GetMatrix(),0)[dbg_index],-(dbg_object(t_c).m_ViewPort.p_Y2()*dbg_array(bb_graphics_GetMatrix(),3)[dbg_index]-dbg_object(t_c).m_Position.p_Y2())/dbg_array(bb_graphics_GetMatrix(),3)[dbg_index]);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<216>";
			bb_graphics_Translate(-(dbg_object(t_c).m_ViewPort.p_X2()-dbg_object(t_c).m_Position.p_X2())/dbg_array(bb_graphics_GetMatrix(),0)[dbg_index],-(dbg_object(t_c).m_ViewPort.p_Y2()-dbg_object(t_c).m_Position.p_Y2())/dbg_array(bb_graphics_GetMatrix(),3)[dbg_index]);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<219>";
		bb_graphics_SetScissor(dbg_object(t_c).m_Position.p_X2(),dbg_object(t_c).m_Position.p_Y2(),dbg_object(t_c).m_Position.p_Width(),dbg_object(t_c).m_Position.p_Height());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<221>";
		this.m__currentScene.p_Render();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<222>";
		this.p_Render();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<224>";
		bb_graphics_PopMatrix();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<227>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<227>";
	var t_2=this.m__currentScene.p_GetGui().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<227>";
	while(t_2.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<227>";
		var t_gui=t_2.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<228>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<229>";
		bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<230>";
		t_gui.p_Render();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<231>";
		bb_graphics_PopMatrix();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<235>";
	if(this.m__showPopup){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<236>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<239>";
		bb_graphics_Scale((bb_app_DeviceWidth())/this.m__currentPopup.p_ViewPort().p_X2(),(bb_app_DeviceHeight())/this.m__currentPopup.p_ViewPort().p_Y2());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<241>";
		bb_graphics_SetAlpha(this.m__currentPopup.p_GetBakgroundAlpha());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<242>";
		bb_graphics_SetColor(0.0,0.0,0.0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<243>";
		bb_graphics_DrawRect(0.0,0.0,(bb_app_DeviceWidth()*3),(bb_app_DeviceHeight())/dbg_array(bb_graphics_GetMatrix(),3)[dbg_index]);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<244>";
		bb_graphics_SetColor(255.0,255.0,255.0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<245>";
		bb_graphics_SetAlpha(1.0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<246>";
		this.m__currentPopup.p_Render();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<247>";
		bb_graphics_PopMatrix();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<251>";
	this.p_ToastRender();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<255>";
	lp.ResetValues();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<261>";
	dbg_object(this).m__frames_count+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<262>";
	dbg_object(this).m__time_count+=c_Time.m_DeltaSecs();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<264>";
	bb_graphics_DrawText("FPS : "+String((dbg_object(this).m__frames_count)/dbg_object(this).m__time_count),-dbg_array(bb_graphics_GetMatrix(),4)[dbg_index],-dbg_array(bb_graphics_GetMatrix(),5)[dbg_index],0.0,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<268>";
	pop_err();
	return 0;
}
c_Game.prototype.p_HidePopup=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<434>";
	dbg_object(this).m__showPopup=false;
	pop_err();
}
c_Game.prototype.p_GetScene=function(t_id){
}
c_Game.prototype.p_SetScene=function(t_id,t_parameters){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<350>";
	this.p_HidePopup();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<352>";
	if(this.m__lastSceneId!=t_id){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<354>";
		bb_lpresources_lpFreeMemory();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<358>";
	this.m__lastSceneId=t_id;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<360>";
	this.m__loadingState=bb_game_LONENTERLOADING;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<361>";
	this.m__loadingTween.p_SetValues(0.0,1.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<362>";
	this.m__loadingTween.p_Start();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<364>";
	this.m__currentScene=this.p_GetScene(t_id);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<366>";
	if(null!=t_parameters){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<367>";
		this.m__currentScene.p_Parameters(t_parameters);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<370>";
	var t_defCamera=c_lpCamera.m_new.call(new c_lpCamera,0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()),0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<371>";
	dbg_object(this).m__currentCamera=t_defCamera;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<373>";
	this.m__currentScene.p_Create();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<375>";
	if(0>=this.m__currentScene.p_Cameras().p_Length2()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<377>";
		this.m__currentScene.p_AddCamera(t_defCamera);
	}
	pop_err();
}
c_Game.m_Instance=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<446>";
	pop_err();
	return c_Game.m__instance;
}
c_Game.prototype.p_GetCurrentCamera=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/game.monkey<382>";
	pop_err();
	return this.m__currentCamera;
}
function c_GBNova(){
	c_Game.call(this);
	this.implments={c_iDrawable:1};
}
c_GBNova.prototype=extend_class(c_Game);
c_GBNova.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<6>";
	c_Game.m_new.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<6>";
	pop_err();
	return this;
}
c_GBNova.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<9>";
	bb_app_SetUpdateRate(0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<11>";
	enablePixelArt();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<13>";
	this.p_SetScene(0,null);
	pop_err();
}
c_GBNova.prototype.p_GetScene=function(t_scene){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<17>";
	var t_1=t_scene;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<18>";
	if(t_1==0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<19>";
		var t_=(c_GameScene.m_new.call(new c_GameScene));
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<65>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<75>";
	this.m__graphics=(new gxtkGraphics);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<76>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<77>";
	bb_graphics_SetFont(null,32);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<79>";
	this.m__audio=(new gxtkAudio);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<80>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<82>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<83>";
	bb_input_SetInputDevice(this.m__input);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<85>";
	bb_app_ValidateDeviceWindow(false);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<87>";
	bb_app_EnumDisplayModes();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<89>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<93>";
	bb_app__app.p_OnSuspend();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<94>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<98>";
	this.m__audio.Resume();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<99>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<103>";
	bb_app_ValidateDeviceWindow(true);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<104>";
	this.m__input.p_BeginUpdate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<105>";
	bb_app__app.p_OnUpdate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<106>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<110>";
	bb_app_ValidateDeviceWindow(true);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<111>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<112>";
	if((t_mode)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<112>";
		bb_graphics_BeginRender();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<113>";
	if(t_mode==2){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<113>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<113>";
		bb_app__app.p_OnRender();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<114>";
	if((t_mode)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<114>";
		bb_graphics_EndRender();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<115>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<119>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<120>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<121>";
	var t_1=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<122>";
	if(t_1==432){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<123>";
		bb_app__app.p_OnClose();
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<124>";
		if(t_1==416){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<125>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<130>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<134>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<138>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<142>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<26>";
	c_GBNova.m_new.call(new c_GBNova);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/main.monkey<27>";
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<63>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<70>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<114>";
	dbg_object(this).m_tx=t_tx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<115>";
	dbg_object(this).m_ty=t_ty;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<116>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<197>";
	this.m_flags=t_iflags;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<199>";
	if((this.m_flags&2)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<200>";
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<200>";
		var t_=this.m_frames;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<200>";
		var t_2=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<200>";
		while(t_2<t_.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<200>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<200>";
			t_2=t_2+1;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<201>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<203>";
		this.m_width-=2;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<206>";
	if((this.m_flags&4)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<207>";
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<207>";
		var t_3=this.m_frames;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<207>";
		var t_4=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<207>";
		while(t_4<t_3.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<207>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<207>";
			t_4=t_4+1;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<208>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<210>";
		this.m_height-=2;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<213>";
	if((this.m_flags&1)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<214>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<217>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<218>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<143>";
	if((this.m_surface)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<143>";
		error("Image already initialized");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<144>";
	this.m_surface=t_surf;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<146>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<147>";
	this.m_height=this.m_surface.Height();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<149>";
	this.m_frames=new_object_array(t_nframes);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<150>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<151>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<154>";
	this.p_ApplyFlags(t_iflags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<155>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<159>";
	if((this.m_surface)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<159>";
		error("Image already initialized");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<160>";
	this.m_surface=t_surf;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<161>";
	this.m_source=t_src;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<163>";
	this.m_width=t_iwidth;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<164>";
	this.m_height=t_iheight;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<166>";
	this.m_frames=new_object_array(t_nframes);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<168>";
	var t_ix=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<168>";
	var t_iy=t_y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<170>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<171>";
		if(t_ix+this.m_width>t_srcw){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<172>";
			t_ix=0;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<173>";
			t_iy+=this.m_height;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<175>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<176>";
			error("Image frame outside surface");
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<178>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<179>";
		t_ix+=this.m_width;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<182>";
	this.p_ApplyFlags(t_iflags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<183>";
	pop_err();
	return this;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<81>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<85>";
	pop_err();
	return this.m_height;
}
c_Image.prototype.p_Frames=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<93>";
	var t_=this.m_frames.length;
	pop_err();
	return t_;
}
c_Image.prototype.p_Discard=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<120>";
	if(((this.m_surface)!=null) && !((this.m_source)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<121>";
		this.m_surface.Discard();
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<122>";
		this.m_surface=null;
	}
	pop_err();
	return 0;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<29>";
	pop_err();
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<40>";
	if((this.m_matDirty)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<41>";
		bb_graphics_renderDevice.SetMatrix(dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<42>";
		this.m_matDirty=0;
	}
	pop_err();
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/data.monkey<7>";
	var t_i=t_path.indexOf(":/",0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/data.monkey<8>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/data.monkey<8>";
		pop_err();
		return t_path;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/data.monkey<9>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/data.monkey<9>";
		pop_err();
		return t_path;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/data.monkey<10>";
	var t_="monkey://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<23>";
	dbg_object(this).m_x=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<24>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<18>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<239>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<240>";
	if((t_surf)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<240>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<244>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<245>";
	if((t_surf)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<245>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<548>";
	if(!((t_font)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<549>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<550>";
			dbg_object(bb_graphics_context).m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<552>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<553>";
		t_firstChar=32;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<555>";
	dbg_object(bb_graphics_context).m_font=t_font;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<556>";
	dbg_object(bb_graphics_context).m_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<22>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<26>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<27>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState);
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<237>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<238>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<239>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<240>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<189>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<190>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<191>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<191>";
			break;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<192>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<193>";
			var t_key=256+t_i*32+t_j;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<194>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<195>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<196>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<197>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<200>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false;
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<207>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<208>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<210>";
	this.m__keyHitPut=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<211>";
	this.m__charGet=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<212>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<111>";
	var t_1=t_event;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<112>";
	if(t_1==1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<113>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<114>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<115>";
			this.p_PutKeyHit(t_data);
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<116>";
			if(t_data==1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<117>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<118>";
				this.p_PutKeyHit(384);
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<119>";
				if(t_data==384){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<120>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<121>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<124>";
		if(t_1==2){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<125>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<126>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<127>";
				if(t_data==1){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<128>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<129>";
					if(t_data==384){
						err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<130>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false;
					}
				}
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<133>";
			if(t_1==3){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<134>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<135>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<136>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<142>";
	var t_2=t_event;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<143>";
	if(t_2==4){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<144>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<145>";
		if(t_2==5){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<146>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<148>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<152>";
	this.m__mouseX=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<153>";
	this.m__mouseY=t_y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<154>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<155>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y;
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<159>";
	var t_3=t_event;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<160>";
	if(t_3==7){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<161>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<162>";
		if(t_3==8){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<163>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<165>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<169>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<170>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<171>";
	if(t_data==0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<172>";
		this.m__mouseX=t_x;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<173>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<178>";
	var t_4=t_event;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<179>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<183>";
	this.m__accelX=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<184>";
	this.m__accelY=t_y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<185>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<47>";
	if(t_key>0 && t_key<512){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<47>";
		pop_err();
		return dbg_array(this.m__keyDown,t_key)[dbg_index];
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<48>";
	pop_err();
	return false;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<52>";
	if(t_key>0 && t_key<512){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<52>";
		pop_err();
		return dbg_array(this.m__keyHit,t_key)[dbg_index];
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<53>";
	pop_err();
	return 0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/inputdevice.monkey<14>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/input.monkey<22>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<57>";
	var t_w=bb_app__game.GetDeviceWidth();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<58>";
	var t_h=bb_app__game.GetDeviceHeight();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<59>";
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<60>";
	bb_app__devWidth=t_w;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<61>";
	bb_app__devHeight=t_h;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<62>";
	if(t_notifyApp){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<62>";
		bb_app__app.p_OnResize();
	}
	pop_err();
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<192>";
	this.m__width=t_width;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<193>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_DisplayMode.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<189>";
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<239>";
					this.p_RotateRight(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<45>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<146>";
	var t_=this.p_Set(t_key,t_value);
	pop_err();
	return t_;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<534>";
	c_Map.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<18>";
	var t_t=new_object_array(this.m_length);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<22>";
	pop_err();
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<263>";
	pop_err();
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<267>";
	pop_err();
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<33>";
	var t_modes=bb_app__game.GetDisplayModes();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<34>";
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<35>";
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<36>";
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<37>";
		var t_w=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<38>";
		var t_h=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<39>";
		var t_size=t_w<<16|t_h;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<40>";
		if(t_mmap.p_Contains(t_size)){
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<42>";
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height);
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<43>";
			t_mmap.p_Insert(t_size,t_mode);
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<44>";
			t_mstack.p_Push(t_mode);
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<47>";
	bb_app__displayModes=t_mstack.p_ToArray();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<48>";
	var t_mode2=bb_app__game.GetDesktopMode();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<49>";
	if((t_mode2)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<50>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(t_mode2).width,dbg_object(t_mode2).height);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<52>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
	pop_err();
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<312>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<313>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<314>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<315>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<316>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<317>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<318>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<319>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<308>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<254>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<255>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<256>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<257>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<271>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<272>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<280>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<281>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<289>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<290>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<291>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<292>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<293>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<225>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<226>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<227>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<228>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<229>";
	bb_graphics_SetAlpha(1.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<230>";
	bb_graphics_SetBlend(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<231>";
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<235>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<259>";
	error("");
	pop_err();
}
function c_lpTween(){
	Object.call(this);
	this.m__function=0;
	this.m__initialValue=0.0;
	this.m__currentValue=0.0;
	this.m__endValue=0.0;
	this.m__time=0.0;
	this.m__easing=0;
	this.m__loop=false;
	this.m__running=false;
	this.m__beginTime=0.0;
}
c_lpTween.m_new=function(t_funct,t_initValue,t_endValue,t_time,t_easing,t_loop){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<48>";
	this.m__function=t_funct;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<49>";
	this.m__initialValue=t_initValue;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<50>";
	this.m__currentValue=t_initValue;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<51>";
	this.m__endValue=t_endValue;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<52>";
	this.m__time=t_time;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<53>";
	this.m__easing=t_easing;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<54>";
	this.m__loop=t_loop;
	pop_err();
	return this;
}
c_lpTween.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<3>";
	pop_err();
	return this;
}
c_lpTween.m_CreateLinear=function(t_initValue,t_endValue,t_time,t_loop){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<32>";
	var t_=c_lpTween.m_new.call(new c_lpTween,0,t_initValue,t_endValue,t_time,((t_loop)?1:0),false);
	pop_err();
	return t_;
}
c_lpTween.prototype.p_IsRunning=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<183>";
	pop_err();
	return this.m__running;
}
c_lpTween.prototype.p_Start=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<62>";
	dbg_object(this).m__beginTime=(bb_app_Millisecs());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<63>";
	dbg_object(this).m__running=true;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<64>";
	dbg_object(this).m__currentValue=this.m__initialValue;
	pop_err();
}
c_lpTween.prototype.p_LinearUpdate=function(t_t,t_b,t_c,t_d){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<122>";
	this.m__currentValue=t_c*t_t/t_d+t_b;
	pop_err();
}
c_lpTween.prototype.p_QuadUpdate=function(t_easing,t_t,t_b,t_c,t_d){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<126>";
	var t_2=t_easing;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<127>";
	if(t_2==0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<128>";
		t_t/=t_d;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<129>";
		this.m__currentValue=t_c*t_t*t_t+t_b;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<130>";
		if(t_2==1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<131>";
			t_t/=t_d;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<132>";
			this.m__currentValue=-t_c*t_t*(t_t-2.0)+t_b;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<133>";
			if(t_2==2){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<134>";
				t_t/=t_d/2.0;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<135>";
				if(t_t<1.0){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<135>";
					this.m__currentValue=t_c/2.0*t_t*t_t+t_b;
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<136>";
				t_t=t_t-1.0;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<137>";
				this.m__currentValue=-t_c/2.0*(t_t*(t_t-2.0)-1.0)+t_b;
			}
		}
	}
	pop_err();
}
c_lpTween.prototype.p_CubicUpdate=function(t_easing,t_t,t_b,t_c,t_d){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<143>";
	var t_3=t_easing;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<144>";
	if(t_3==0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<145>";
		t_t/=t_d;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<146>";
		this.m__currentValue=t_c*t_t*t_t*t_t+t_b;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<147>";
		if(t_3==1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<148>";
			t_t/=t_d;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<149>";
			t_t=t_t-1.0;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<150>";
			this.m__currentValue=t_c*(t_t*t_t*t_t+1.0)+t_b;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<151>";
			if(t_3==2){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<152>";
				t_t/=t_d/2.0;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<153>";
				if(t_t<1.0){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<153>";
					this.m__currentValue=t_c/2.0*t_t*t_t*t_t+t_b;
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<154>";
				t_t=t_t-2.0;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<155>";
				this.m__currentValue=t_c/2.0*(t_t*t_t*t_t+2.0)+t_b;
			}
		}
	}
	pop_err();
}
c_lpTween.prototype.p_BackUpdate=function(t_easing,t_t,t_b,t_c,t_d){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<160>";
	var t_4=t_easing;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<161>";
	if(t_4==0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<162>";
		var t_s=1.70158;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<163>";
		t_t/=t_d;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<164>";
		this.m__currentValue=t_c*t_t*t_t*((t_s+1.0)*t_t-t_s)+t_b;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<165>";
		if(t_4==1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<166>";
			var t_s2=1.70158;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<167>";
			t_t=t_t/t_d-1.0;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<168>";
			this.m__currentValue=t_c*(t_t*t_t*((t_s2+1.0)*t_t+t_s2)+1.0)+t_b;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<169>";
			if(t_4==2){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<170>";
				var t_s3=1.70158;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<171>";
				t_s3*=1.525;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<172>";
				if(t_t<1.0){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<173>";
					t_t/=t_d/2.0;
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<174>";
					this.m__currentValue=t_c/2.0*(t_t*t_t*((t_s3+1.0)*t_t-t_s3))+t_b;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<176>";
					t_t=t_t-2.0;
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<177>";
					this.m__currentValue=t_c/2.0*(t_t*t_t*((t_s3+1.0)*t_t+t_s3)+2.0)+t_b;
				}
			}
		}
	}
	pop_err();
}
c_lpTween.prototype.p_SetInitialValue=function(t_v){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<68>";
	dbg_object(this).m__initialValue=t_v;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<69>";
	dbg_object(this).m__currentValue=t_v;
	pop_err();
}
c_lpTween.prototype.p_SetEndValue=function(t_v){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<73>";
	dbg_object(this).m__endValue=t_v;
	pop_err();
}
c_lpTween.prototype.p_SetValues=function(t_v1,t_v2){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<77>";
	this.p_SetInitialValue(t_v1);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<78>";
	this.p_SetEndValue(t_v2);
	pop_err();
}
c_lpTween.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<91>";
	var t_currentTime=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<93>";
	if(dbg_object(this).m__running){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<95>";
		t_currentTime=(bb_app_Millisecs())-dbg_object(this).m__beginTime;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<97>";
		var t_1=this.m__function;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<98>";
		if(t_1==0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<99>";
			this.p_LinearUpdate(t_currentTime,dbg_object(this).m__initialValue,this.m__endValue-this.m__initialValue,dbg_object(this).m__time);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<100>";
			if(t_1==1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<101>";
				this.p_QuadUpdate(this.m__easing,t_currentTime,dbg_object(this).m__initialValue,this.m__endValue-this.m__initialValue,dbg_object(this).m__time);
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<102>";
				if(t_1==2){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<103>";
					this.p_CubicUpdate(this.m__easing,t_currentTime,dbg_object(this).m__initialValue,this.m__endValue-this.m__initialValue,dbg_object(this).m__time);
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<104>";
					if(t_1==3){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<105>";
						this.p_BackUpdate(this.m__easing,t_currentTime,dbg_object(this).m__initialValue,this.m__endValue-this.m__initialValue,dbg_object(this).m__time);
					}
				}
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<109>";
	if(t_currentTime>=this.m__time){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<110>";
		this.m__currentValue=this.m__endValue;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<111>";
		dbg_object(this).m__running=false;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<113>";
		if(dbg_object(this).m__loop){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<114>";
			print("llega");
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<115>";
			this.p_SetValues(this.m__initialValue,this.m__endValue);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<116>";
			this.p_Start();
		}
	}
	pop_err();
}
c_lpTween.prototype.p_GetCurrentValue=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lptween.monkey<187>";
	pop_err();
	return this.m__currentValue;
}
function c_lpCamera(){
	Object.call(this);
	this.m_Position=null;
	this.m_ViewPort=null;
	this.m__firstViewPort=null;
	this.implments={c_iDrawable:1};
}
c_lpCamera.prototype.p__init=function(t_px,t_py,t_pw,t_ph,t_vx,t_vy,t_vw,t_vh){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcamera.monkey<14>";
	dbg_object(this).m_Position=c_Rectangle.m_new3.call(new c_Rectangle,t_px,t_py,t_pw,t_ph);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcamera.monkey<15>";
	dbg_object(this).m_ViewPort=c_Rectangle.m_new3.call(new c_Rectangle,t_vx,t_vy,t_vw,t_vh);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcamera.monkey<16>";
	dbg_object(this).m__firstViewPort=c_Rectangle.m_new3.call(new c_Rectangle,t_vx,t_vy,t_vw,t_vh);
	pop_err();
}
c_lpCamera.m_new=function(t_px,t_py,t_pw,t_ph,t_vx,t_vy,t_vw,t_vh){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcamera.monkey<25>";
	this.p__init(t_px,t_py,t_pw,t_ph,t_vx,t_vy,t_vw,t_vh);
	pop_err();
	return this;
}
c_lpCamera.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_lpCamera.prototype.p_Render=function(){
	push_err();
	pop_err();
}
c_lpCamera.prototype.p_Update=function(){
	push_err();
	pop_err();
}
function c_ShapeBase(){
	Object.call(this);
}
c_ShapeBase.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/shapebase.monkey<3>";
	pop_err();
	return this;
}
c_ShapeBase.prototype.p_Render=function(){
	push_err();
	pop_err();
}
c_ShapeBase.prototype.p_GetType=function(){
}
function c_Point(){
	c_ShapeBase.call(this);
	this.m__x=.0;
	this.m__y=.0;
}
c_Point.prototype=extend_class(c_ShapeBase);
c_Point.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<15>";
	c_ShapeBase.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<16>";
	dbg_object(this).m__x=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<17>";
	dbg_object(this).m__y=0.0;
	pop_err();
	return this;
}
c_Point.m_new2=function(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<20>";
	c_ShapeBase.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<21>";
	dbg_object(this).m__x=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<22>";
	dbg_object(this).m__y=t_y;
	pop_err();
	return this;
}
c_Point.prototype.p_X=function(t_x){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<27>";
	dbg_object(this).m__x=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<28>";
	pop_err();
	return dbg_object(this).m__x;
}
c_Point.prototype.p_X2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<37>";
	pop_err();
	return dbg_object(this).m__x;
}
c_Point.prototype.p_Y=function(t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<32>";
	dbg_object(this).m__y=t_y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<33>";
	pop_err();
	return dbg_object(this).m__y;
}
c_Point.prototype.p_Y2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<41>";
	pop_err();
	return dbg_object(this).m__y;
}
c_Point.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<57>";
	bb_graphics_DrawCircle(this.p_X2(),this.p_Y2(),10.0);
	pop_err();
}
c_Point.prototype.p_GetType=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/point.monkey<82>";
	pop_err();
	return 1;
}
function c_Rectangle(){
	c_Point.call(this);
	this.m_mmax=c_Point.m_new.call(new c_Point);
	this.m__points_stack=c_Stack2.m_new.call(new c_Stack2);
	this.m_min=.0;
	this.m_max=.0;
}
c_Rectangle.prototype=extend_class(c_Point);
c_Rectangle.prototype.p_Width2=function(t_w){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<54>";
	dbg_object(this).m_mmax.p_X(t_w);
	pop_err();
	return 0;
}
c_Rectangle.prototype.p_Width=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<62>";
	var t_=dbg_object(this).m_mmax.p_X2();
	pop_err();
	return t_;
}
c_Rectangle.prototype.p_Height2=function(t_h){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<58>";
	dbg_object(this).m_mmax.p_Y(t_h);
	pop_err();
	return 0;
}
c_Rectangle.prototype.p_Height=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<66>";
	var t_=dbg_object(this).m_mmax.p_Y2();
	pop_err();
	return t_;
}
c_Rectangle.prototype.p__init2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<14>";
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<15>";
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<16>";
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<17>";
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	pop_err();
}
c_Rectangle.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<29>";
	c_Point.m_new2.call(this,0.0,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<30>";
	this.p_Width2(0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<31>";
	this.p_Height2(0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<32>";
	this.p__init2();
	pop_err();
	return this;
}
c_Rectangle.m_new2=function(t_avoidpoly){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<36>";
	c_Point.m_new2.call(this,0.0,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<37>";
	this.p_X(0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<38>";
	this.p_Y(0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<39>";
	this.p_Width2(0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<40>";
	this.p_Height2(0.0);
	pop_err();
	return this;
}
c_Rectangle.m_new3=function(t_x,t_y,t_width,t_height){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<45>";
	c_Point.m_new2.call(this,t_x,t_y);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<46>";
	this.p_Width2(t_width);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<47>";
	this.p_Height2(t_height);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<49>";
	this.p__init2();
	pop_err();
	return this;
}
c_Rectangle.prototype.p_GetType=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<205>";
	pop_err();
	return 3;
}
c_Rectangle.prototype.p_PointStack=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<140>";
	pop_err();
	return dbg_object(this).m__points_stack;
}
c_Rectangle.prototype.p_Vertices=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<123>";
	this.p_PointStack().p_Get(0).p_X(this.p_X2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<124>";
	this.p_PointStack().p_Get(0).p_Y(this.p_Y2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<126>";
	this.p_PointStack().p_Get(1).p_X(this.p_X2()+this.p_Width());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<127>";
	this.p_PointStack().p_Get(1).p_Y(this.p_Y2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<129>";
	this.p_PointStack().p_Get(2).p_X(this.p_X2()+this.p_Width());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<130>";
	this.p_PointStack().p_Get(2).p_Y(this.p_Y2()+this.p_Height());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<132>";
	this.p_PointStack().p_Get(3).p_X(this.p_X2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<133>";
	this.p_PointStack().p_Get(3).p_Y(this.p_Y2()+this.p_Height());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<135>";
	pop_err();
	return dbg_object(this).m__points_stack;
}
c_Rectangle.prototype.p_Min=function(t_m){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<103>";
	dbg_object(this).m_min=t_m;
	pop_err();
}
c_Rectangle.prototype.p_Min2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<111>";
	pop_err();
	return dbg_object(this).m_min;
}
c_Rectangle.prototype.p_Max=function(t_m){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<107>";
	dbg_object(this).m_max=t_m;
	pop_err();
}
c_Rectangle.prototype.p_Max2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<115>";
	pop_err();
	return dbg_object(this).m_max;
}
c_Rectangle.prototype.p_CenterX=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<147>";
	var t_=this.p_X2()+this.p_Width()/2.0;
	pop_err();
	return t_;
}
c_Rectangle.prototype.p_CenterY=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/shapes/rectangle.monkey<153>";
	var t_=this.p_Y2()+this.p_Height()/2.0;
	pop_err();
	return t_;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack2.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push4(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack2.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack2.m_NIL=null;
c_Stack2.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack2.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack2.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
function c_Scene(){
	Object.call(this);
	this.m__cameras=c_Stack3.m_new.call(new c_Stack3);
	this.m__autocreate=false;
	this.m__children=c_List.m_new.call(new c_List);
	this.m__gui=c_List.m_new.call(new c_List);
	this.m__loadingState=1;
	this.m__pause=false;
	this.m__pausegui=false;
	this.m__parameters=null;
	this.implments={c_iDrawable:1};
}
c_Scene.prototype.p_Cameras=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<83>";
	pop_err();
	return this.m__cameras;
}
c_Scene.prototype.p_AddCamera=function(t_camera){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<79>";
	this.m__cameras.p_Push7(t_camera);
	pop_err();
}
c_Scene.prototype.p_AutoCreate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<31>";
	pop_err();
	return this.m__autocreate;
}
c_Scene.prototype.p_GetChildren=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<87>";
	pop_err();
	return this.m__children;
}
c_Scene.prototype.p_GetGui=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<91>";
	pop_err();
	return this.m__gui;
}
c_Scene.prototype.p_Loading=function(){
}
c_Scene.prototype.p_SetLoadingState=function(t_state){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<75>";
	dbg_object(this).m__loadingState=t_state;
	pop_err();
}
c_Scene.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<39>";
	if(!this.m__pause){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<40>";
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<40>";
		var t_=dbg_object(this).m__children.p_ObjectEnumerator();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<40>";
		while(t_.p_HasNext()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<40>";
			var t_layer=t_.p_NextObject();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<41>";
			t_layer.p_Update();
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<45>";
	if(!this.m__pausegui){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<46>";
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<46>";
		var t_2=dbg_object(this).m__gui.p_ObjectEnumerator();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<46>";
		while(t_2.p_HasNext()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<46>";
			var t_gui=t_2.p_NextObject();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<47>";
			t_gui.p_Update();
		}
	}
	pop_err();
}
c_Scene.prototype.p_Back=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<61>";
	pop_err();
	return 0;
}
c_Scene.prototype.p_Suspend=function(){
	push_err();
	pop_err();
}
c_Scene.prototype.p_LoadingRender=function(){
	push_err();
	pop_err();
}
c_Scene.prototype.p_GetLoadingState=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<71>";
	pop_err();
	return this.m__loadingState;
}
c_Scene.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<52>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<52>";
	var t_=dbg_object(this).m__children.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<52>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<52>";
		var t_layer=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<53>";
		t_layer.p_Render();
	}
	pop_err();
}
c_Scene.prototype.p_Parameters=function(t_m){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<121>";
	dbg_object(this).m__parameters=t_m;
	pop_err();
}
c_Scene.prototype.p_Parameters2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<125>";
	pop_err();
	return dbg_object(this).m__parameters;
}
c_Scene.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_Scene.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<6>";
	pop_err();
	return this;
}
c_Scene.prototype.p_AddChild=function(t_layer,t_create){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<95>";
	dbg_object(this).m__children.p_AddLast(t_layer);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<97>";
	if(t_create){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/scene.monkey<98>";
		t_layer.p_Create();
	}
	pop_err();
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack3.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack3.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack3.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack3.prototype.p_Push7=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push7(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack3.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator2.m_new.call(new c_Enumerator2,this);
	pop_err();
	return t_;
}
c_Stack3.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<56>";
	if(t_x>t_y){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<56>";
		pop_err();
		return t_x;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<83>";
	if(t_x>t_y){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<83>";
		pop_err();
		return t_x;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<84>";
	pop_err();
	return t_y;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<108>";
	var t_=c_Node2.m_new.call(new c_Node2,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<14>";
		this.p_AddLast(t_t);
	}
	pop_err();
	return this;
}
c_List.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator.m_new.call(new c_Enumerator,this);
	pop_err();
	return t_;
}
function c_Node2(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node2.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
function c_HeadNode(){
	c_Node2.call(this);
}
c_HeadNode.prototype=extend_class(c_Node2);
c_HeadNode.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node2.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function c_Time(){
	Object.call(this);
}
c_Time.m__frozen=false;
c_Time.m__aux_time=0;
c_Time.m__frozen_time=0;
c_Time.m__time_last_update=0;
c_Time.m__delta=0;
c_Time.m__delta_secs=0;
c_Time.m_processFrozen=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<24>";
	if(c_Time.m__aux_time>=c_Time.m__frozen_time){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<25>";
		c_Time.m__frozen=false;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<26>";
		c_Time.m__aux_time=0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<29>";
	c_Time.m__aux_time+=bb_app_Millisecs()-c_Time.m__time_last_update;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<30>";
	c_Time.m__time_last_update=bb_app_Millisecs();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<32>";
	c_Time.m__delta=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<33>";
	c_Time.m__delta_secs=0.001;
	pop_err();
}
c_Time.m__slow_down=false;
c_Time.m__slow_down_aux_time=0;
c_Time.m__slow_down_time=0;
c_Time.m__slow_down_factor=0;
c_Time.m_processSlowDown=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<37>";
	if(c_Time.m__slow_down_aux_time>=c_Time.m__slow_down_time){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<38>";
		c_Time.m__slow_down=false;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<39>";
		c_Time.m__slow_down_aux_time=0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<42>";
	c_Time.m__slow_down_aux_time+=c_Time.m__delta;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<44>";
	c_Time.m__delta=(((c_Time.m__delta)*c_Time.m__slow_down_factor)|0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<45>";
	c_Time.m__delta_secs*=c_Time.m__slow_down_factor;
	pop_err();
}
c_Time.m_OnUpdate=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<52>";
	if(c_Time.m__frozen){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<53>";
		c_Time.m_processFrozen();
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<58>";
	c_Time.m__delta=bb_app_Millisecs()-c_Time.m__time_last_update;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<59>";
	c_Time.m__time_last_update=bb_app_Millisecs();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<62>";
	c_Time.m__delta_secs=(c_Time.m__delta)/1000.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<64>";
	if(c_Time.m__slow_down){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<65>";
		c_Time.m_processSlowDown();
		pop_err();
		return;
	}
	pop_err();
}
c_Time.m_Delta=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<88>";
	pop_err();
	return c_Time.m__delta;
}
c_Time.m_DeltaSecs=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<93>";
	pop_err();
	return c_Time.m__delta_secs;
}
c_Time.m_SlowDown=function(t_factor,t_millis){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<78>";
	if(!c_Time.m__slow_down){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<79>";
		c_Time.m__slow_down=true;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<80>";
		c_Time.m__slow_down_factor=t_factor;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<81>";
		c_Time.m__slow_down_time=t_millis;
	}
	pop_err();
	return 0;
}
c_Time.m_Freeze=function(t_millis){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<71>";
	if(!c_Time.m__frozen){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<72>";
		c_Time.m__frozen=true;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/time/time.monkey<73>";
		c_Time.m__frozen_time=t_millis;
	}
	pop_err();
	return 0;
}
function bb_app_Millisecs(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<233>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
var bb_game_LONENTERLOADING=0;
var bb_game_LONLOADING=0;
var bb_game_LONPLAYING=0;
function c_Popup(){
	Object.call(this);
	this.m_view_port=c_Point.m_new.call(new c_Point);
	this.m_backgroundAlpha=0.5;
	this.implments={c_iDrawable:1};
}
c_Popup.prototype.p_Update=function(){
}
c_Popup.prototype.p_Back=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/popup.monkey<66>";
	print("lpPopup.Back()");
	pop_err();
}
c_Popup.prototype.p_ViewPort=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/popup.monkey<70>";
	pop_err();
	return dbg_object(this).m_view_port;
}
c_Popup.prototype.p_GetBakgroundAlpha=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/popup.monkey<43>";
	pop_err();
	return dbg_object(this).m_backgroundAlpha;
}
c_Popup.prototype.p_Render=function(){
}
c_Popup.prototype.p_Create=function(){
}
var bb_asyncevent__current=null;
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack4.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack4.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack4.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack4.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
var bb_asyncevent__sources=null;
function bb_asyncevent_UpdateAsyncEvents(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<24>";
	if((bb_asyncevent__current)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<24>";
		pop_err();
		return 0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<25>";
	var t_i=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<26>";
	while(t_i<bb_asyncevent__sources.p_Length2()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<27>";
		bb_asyncevent__current=bb_asyncevent__sources.p_Get(t_i);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<28>";
		bb_asyncevent__current.p_UpdateAsyncEvents();
		err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<29>";
		if((bb_asyncevent__current)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<29>";
			t_i+=1;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/brl/asyncevent.monkey<31>";
	bb_asyncevent__current=null;
	pop_err();
	return 0;
}
function c_lpColor(){
	Object.call(this);
	this.m_r=.0;
	this.m_g=.0;
	this.m_b=.0;
}
c_lpColor.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<11>";
	dbg_object(this).m_r=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<12>";
	dbg_object(this).m_g=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<13>";
	dbg_object(this).m_b=0.0;
	pop_err();
	return this;
}
c_lpColor.m_new2=function(t_r,t_g,t_b){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<18>";
	dbg_object(this).m_r=t_r;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<19>";
	dbg_object(this).m_g=t_g;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<20>";
	dbg_object(this).m_b=t_b;
	pop_err();
	return this;
}
c_lpColor.m_Black=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpcolor.monkey<45>";
	var t_=c_lpColor.m_new.call(new c_lpColor);
	pop_err();
	return t_;
}
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<53>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<53>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<378>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<380>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
var bb_game_LONENTERSCENE=0;
function c_lpResources(){
	Object.call(this);
	this.m_images=null;
	this.m_pimages=null;
	this.m_sounds=null;
	this.m_translations=null;
}
c_lpResources.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<54>";
	this.m_images=c_StringMap.m_new.call(new c_StringMap);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<55>";
	this.m_pimages=c_StringMap.m_new.call(new c_StringMap);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<56>";
	this.m_sounds=c_StringMap2.m_new.call(new c_StringMap2);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<57>";
	this.m_translations=c_StringMap3.m_new.call(new c_StringMap3);
	pop_err();
	return this;
}
c_lpResources.m__instance=null;
c_lpResources.m_GetInstance=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<71>";
	pop_err();
	return c_lpResources.m__instance;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map2.prototype.p_Values=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<117>";
	var t_=c_MapValues.m_new.call(new c_MapValues,this);
	pop_err();
	return t_;
}
c_Map2.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<13>";
	this.m_root=null;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft2(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<227>";
				this.p_RotateRight2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<239>";
					this.p_RotateRight2(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Set2=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<45>";
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup2(t_node);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map2.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	c_Map2.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.prototype.p_Discard=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<36>";
	if((this.m_sample)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<37>";
		this.m_sample.Discard();
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<38>";
		this.m_sample=null;
	}
	pop_err();
	return 0;
}
c_Sound.m_new=function(t_sample){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<32>";
	dbg_object(this).m_sample=t_sample;
	pop_err();
	return this;
}
c_Sound.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<29>";
	pop_err();
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map3.prototype.p_Values=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<117>";
	var t_=c_MapValues2.m_new.call(new c_MapValues2,this);
	pop_err();
	return t_;
}
c_Map3.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
c_Map3.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<13>";
	this.m_root=null;
	pop_err();
	return 0;
}
function c_StringMap2(){
	c_Map3.call(this);
}
c_StringMap2.prototype=extend_class(c_Map3);
c_StringMap2.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	c_Map3.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft3=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_RotateRight3=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_InsertFixup3=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft3(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<227>";
				this.p_RotateRight3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<239>";
					this.p_RotateRight3(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map4.prototype.p_Set3=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<45>";
	t_node=c_Node12.m_new.call(new c_Node12,t_key,t_value,-1,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup3(t_node);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
function c_StringMap3(){
	c_Map4.call(this);
}
c_StringMap3.prototype=extend_class(c_Map4);
c_StringMap3.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	c_Map4.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_MapValues(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues.m_new=function(t_map){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<519>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapValues.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<516>";
	pop_err();
	return this;
}
c_MapValues.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<523>";
	var t_=c_ValueEnumerator.m_new.call(new c_ValueEnumerator,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_ValueEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator.m_new=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<481>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_ValueEnumerator.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<478>";
	pop_err();
	return this;
}
c_ValueEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<485>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_ValueEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<489>";
	var t_t=this.m_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<490>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<491>";
	pop_err();
	return dbg_object(t_t).m_value;
}
function c_Node3(){
	Object.call(this);
	this.m_left=null;
	this.m_right=null;
	this.m_parent=null;
	this.m_value=null;
	this.m_key="";
	this.m_color=0;
}
c_Node3.prototype.p_NextNode=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node3.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<452>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<453>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<453>";
		error("Invalid image frame");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<456>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<458>";
	bb_graphics_context.p_Validate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<460>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<461>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<463>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<333>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<334>";
	if(t_sp==dbg_object(bb_graphics_context).m_matrixStack.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<334>";
		dbg_object(bb_graphics_context).m_matrixStack=resize_number_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp*2);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<335>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index]=dbg_object(bb_graphics_context).m_ix;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<336>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index]=dbg_object(bb_graphics_context).m_iy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<337>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index]=dbg_object(bb_graphics_context).m_jx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<338>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index]=dbg_object(bb_graphics_context).m_jy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<339>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index]=dbg_object(bb_graphics_context).m_tx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<340>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]=dbg_object(bb_graphics_context).m_ty;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<341>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<355>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).m_ix+t_iy*dbg_object(bb_graphics_context).m_jx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<356>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).m_iy+t_iy*dbg_object(bb_graphics_context).m_jy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<357>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).m_ix+t_jy*dbg_object(bb_graphics_context).m_jx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<358>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).m_iy+t_jy*dbg_object(bb_graphics_context).m_jy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<359>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).m_ix+t_ty*dbg_object(bb_graphics_context).m_jx+dbg_object(bb_graphics_context).m_tx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<360>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).m_iy+t_ty*dbg_object(bb_graphics_context).m_jy+dbg_object(bb_graphics_context).m_ty;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<361>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<351>";
	bb_graphics_Transform(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<365>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<373>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<369>";
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<345>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp-6;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<346>";
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<347>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<470>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<471>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<471>";
		error("Invalid image frame");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<474>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<476>";
	bb_graphics_PushMatrix();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<478>";
	bb_graphics_Translate(t_x,t_y);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<479>";
	bb_graphics_Rotate(t_rotation);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<480>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<482>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<484>";
	bb_graphics_context.p_Validate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<486>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<487>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,0.0,0.0);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<489>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<492>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_lpresources_lpLoadToVideoMemory(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<116>";
	var t_r=c_lpResources.m_GetInstance();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<118>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<118>";
	var t_=dbg_object(t_r).m_images.p_Values().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<118>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<118>";
		var t_i=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<119>";
		if((t_i)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<120>";
			bb_graphics_DrawImage(t_i,0.0,0.0,0);
		}
	}
	pop_err();
}
function c_Enumerator2(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator2.m_new=function(t_stack){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator2.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function bb_graphics_GetMatrix(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<323>";
	var t_=[dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty];
	pop_err();
	return t_;
}
function bb_graphics_GetMatrix2(t_matrix){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<327>";
	dbg_array(t_matrix,0)[dbg_index]=dbg_object(bb_graphics_context).m_ix;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<327>";
	dbg_array(t_matrix,1)[dbg_index]=dbg_object(bb_graphics_context).m_iy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<328>";
	dbg_array(t_matrix,2)[dbg_index]=dbg_object(bb_graphics_context).m_jx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<328>";
	dbg_array(t_matrix,3)[dbg_index]=dbg_object(bb_graphics_context).m_jy;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<329>";
	dbg_array(t_matrix,4)[dbg_index]=dbg_object(bb_graphics_context).m_tx;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<329>";
	dbg_array(t_matrix,5)[dbg_index]=dbg_object(bb_graphics_context).m_ty;
	pop_err();
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<393>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<395>";
	bb_graphics_context.p_Validate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<396>";
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	pop_err();
	return 0;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.prototype.p_Count=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<42>";
	while(t_node!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).m__succ;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
c_List2.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<50>";
	var t_=dbg_object(this.m__head).m__succ==this.m__head;
	pop_err();
	return t_;
}
c_List2.prototype.p_RemoveLast=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<96>";
	if(this.p_IsEmpty()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<96>";
		error("Illegal operation on empty list");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<98>";
	var t_data=dbg_object(dbg_object(this.m__head).m__pred).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<99>";
	dbg_object(this.m__head).m__pred.p_Remove();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<100>";
	pop_err();
	return t_data;
}
c_List2.prototype.p_Equals=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_List2.prototype.p_FindLast=function(t_value,t_start){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<128>";
	while(t_start!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<129>";
		if(this.p_Equals(t_value,dbg_object(t_start).m__data)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<129>";
			pop_err();
			return t_start;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<130>";
		t_start=dbg_object(t_start).m__pred;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<132>";
	pop_err();
	return null;
}
c_List2.prototype.p_FindLast2=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<124>";
	var t_=this.p_FindLast(t_value,dbg_object(this.m__head).m__pred);
	pop_err();
	return t_;
}
c_List2.prototype.p_RemoveLast2=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<146>";
	var t_node=this.p_FindLast2(t_value);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<147>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<147>";
		t_node.p_Remove();
	}
	pop_err();
}
c_List2.prototype.p_First=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<73>";
	if(this.p_IsEmpty()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<73>";
		error("Illegal operation on empty list");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<75>";
	pop_err();
	return dbg_object(dbg_object(this.m__head).m__succ).m__data;
}
function c_StringList(){
	c_List2.call(this);
}
c_StringList.prototype=extend_class(c_List2);
c_StringList.prototype.p_Equals=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<439>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
function c_Node4(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data="";
}
c_Node4.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node4.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
c_Node4.prototype.p_Remove=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<274>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<274>";
		error("Illegal operation on removed node");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<276>";
	dbg_object(this.m__succ).m__pred=this.m__pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<277>";
	dbg_object(this.m__pred).m__succ=this.m__succ;
	pop_err();
	return 0;
}
function c_HeadNode2(){
	c_Node4.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node4);
c_HeadNode2.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node4.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function bb_graphics_GetColor(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<261>";
	var t_=[dbg_object(bb_graphics_context).m_color_r,dbg_object(bb_graphics_context).m_color_g,dbg_object(bb_graphics_context).m_color_b];
	pop_err();
	return t_;
}
function bb_graphics_GetColor2(t_color){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<265>";
	dbg_array(t_color,0)[dbg_index]=dbg_object(bb_graphics_context).m_color_r;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<266>";
	dbg_array(t_color,1)[dbg_index]=dbg_object(bb_graphics_context).m_color_g;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<267>";
	dbg_array(t_color,2)[dbg_index]=dbg_object(bb_graphics_context).m_color_b;
	pop_err();
	return 0;
}
function c_AngelFont(){
	Object.call(this);
	this.m__chars=c_IntMap2.m_new.call(new c_IntMap2);
	this.m_xOffset=0;
	this.m_useKerning=false;
	this.m_kernPairs=c_StringMap4.m_new.call(new c_StringMap4);
	this.m_image=null;
}
c_AngelFont.prototype.p_TextHeight=function(t_txt){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<395>";
	var t_h=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<396>";
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<397>";
		var t_asc=dbg_charCodeAt(t_txt,t_i);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<398>";
		var t_ac=this.m__chars.p_Get(t_asc);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<399>";
		if(dbg_object(t_ac).m_height>t_h){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<399>";
			t_h=dbg_object(t_ac).m_height;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<401>";
	pop_err();
	return t_h;
}
c_AngelFont.prototype.p_TextWidth=function(t_txt,t_letter_spacing){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<372>";
	var t_prevChar="";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<373>";
	var t_width=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<374>";
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<375>";
		var t_asc=dbg_charCodeAt(t_txt,t_i);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<376>";
		var t_ac=this.m__chars.p_Get(t_asc);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<377>";
		var t_thisChar=String.fromCharCode(t_asc);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<378>";
		if(t_ac!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<379>";
			if(this.m_useKerning){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<380>";
				var t_key=t_prevChar+"_"+t_thisChar;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<381>";
				if(this.m_kernPairs.p_Contains2(t_key)){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<383>";
					t_width+=dbg_object(this.m_kernPairs.p_Get2(t_key)).m_amount;
				}
			}
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<387>";
			t_width=(((t_width)+((dbg_object(t_ac).m_xAdvance)+t_letter_spacing))|0);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<388>";
			t_prevChar=t_thisChar;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<391>";
	pop_err();
	return t_width;
}
c_AngelFont.prototype.p_DrawText=function(t_txt,t_x,t_y,t_align,t_letter_spacing){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<244>";
	var t_prevChar="";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<245>";
	this.m_xOffset=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<247>";
	var t_1=t_align;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<248>";
	if(t_1==1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<249>";
		t_x-=((this.p_TextWidth(t_txt,0.0)/2)|0);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<250>";
		if(t_1==2){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<251>";
			t_x-=this.p_TextWidth(t_txt,0.0);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<252>";
			if(t_1==0){
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<257>";
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<258>";
		var t_asc=dbg_charCodeAt(t_txt,t_i);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<259>";
		var t_ac=this.m__chars.p_Get(t_asc);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<260>";
		var t_thisChar=String.fromCharCode(t_asc);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<261>";
		if(t_ac!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<262>";
			if(this.m_useKerning){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<263>";
				var t_key=t_prevChar+"_"+t_thisChar;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<264>";
				if(this.m_kernPairs.p_Contains2(t_key)){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<265>";
					this.m_xOffset+=dbg_object(this.m_kernPairs.p_Get2(t_key)).m_amount;
				}
			}
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<268>";
			t_ac.p_Draw(this.m_image,t_x+this.m_xOffset,t_y);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<269>";
			this.m_xOffset=(((this.m_xOffset)+((dbg_object(t_ac).m_xAdvance)+t_letter_spacing))|0);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/angelfont.monkey<270>";
			t_prevChar=t_thisChar;
		}
	}
	pop_err();
}
function c_Char(){
	Object.call(this);
	this.m_height=0;
	this.m_xAdvance=0;
	this.m_xOffset=0;
	this.m_yOffset=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
}
c_Char.prototype.p_Draw=function(t_fontImage,t_linex,t_liney){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/angelfont/char.monkey<28>";
	bb_graphics_DrawImageRect(t_fontImage,(t_linex+this.m_xOffset),(t_liney+this.m_yOffset),this.m_x,this.m_y,this.m_width,this.m_height,0);
	pop_err();
	return 0;
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map5.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map5.prototype.p_Get=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_IntMap2(){
	c_Map5.call(this);
}
c_IntMap2.prototype=extend_class(c_Map5);
c_IntMap2.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<534>";
	c_Map5.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node5(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
}
function c_KernPair(){
	Object.call(this);
	this.m_amount=0;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map6.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map6.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_StringMap4(){
	c_Map6.call(this);
}
c_StringMap4.prototype=extend_class(c_Map6);
c_StringMap4.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	c_Map6.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<498>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<499>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<499>";
		error("Invalid image frame");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<500>";
	if(t_srcX<0 || t_srcY<0 || t_srcX+t_srcWidth>dbg_object(t_image).m_width || t_srcY+t_srcHeight>dbg_object(t_image).m_height){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<500>";
		error("Invalid image rectangle");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<503>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<505>";
	bb_graphics_context.p_Validate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<507>";
	bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,-dbg_object(t_image).m_tx+t_x,-dbg_object(t_image).m_ty+t_y,t_srcX+dbg_object(t_f).m_x,t_srcY+dbg_object(t_f).m_y,t_srcWidth,t_srcHeight);
	pop_err();
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<513>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<514>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<514>";
		error("Invalid image frame");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<515>";
	if(t_srcX<0 || t_srcY<0 || t_srcX+t_srcWidth>dbg_object(t_image).m_width || t_srcY+t_srcHeight>dbg_object(t_image).m_height){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<515>";
		error("Invalid image rectangle");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<518>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<520>";
	bb_graphics_PushMatrix();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<522>";
	bb_graphics_Translate(t_x,t_y);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<523>";
	bb_graphics_Rotate(t_rotation);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<524>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<525>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<527>";
	bb_graphics_context.p_Validate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<529>";
	bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,t_srcX+dbg_object(t_f).m_x,t_srcY+dbg_object(t_f).m_y,t_srcWidth,t_srcHeight);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<531>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<577>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<579>";
	if(!((dbg_object(bb_graphics_context).m_font)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<579>";
		pop_err();
		return 0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<581>";
	var t_w=dbg_object(bb_graphics_context).m_font.p_Width();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<582>";
	var t_h=dbg_object(bb_graphics_context).m_font.p_Height();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<584>";
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<585>";
	t_y-=Math.floor((t_h)*t_yalign);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<587>";
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<588>";
		var t_ch=dbg_charCodeAt(t_text,t_i)-dbg_object(bb_graphics_context).m_firstChar;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<589>";
		if(t_ch>=0 && t_ch<dbg_object(bb_graphics_context).m_font.p_Frames()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<590>";
			bb_graphics_DrawImage(dbg_object(bb_graphics_context).m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	pop_err();
	return 0;
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<224>";
	bb_app__updateRate=t_hertz;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<225>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
}
function c_MapValues2(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues2.m_new=function(t_map){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<519>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapValues2.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<516>";
	pop_err();
	return this;
}
c_MapValues2.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<523>";
	var t_=c_ValueEnumerator2.m_new.call(new c_ValueEnumerator2,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_ValueEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator2.m_new=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<481>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_ValueEnumerator2.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<478>";
	pop_err();
	return this;
}
c_ValueEnumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<485>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_ValueEnumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<489>";
	var t_t=this.m_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<490>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<491>";
	pop_err();
	return dbg_object(t_t).m_value;
}
function c_Node7(){
	Object.call(this);
	this.m_left=null;
	this.m_right=null;
	this.m_parent=null;
	this.m_value=null;
}
c_Node7.prototype.p_NextNode=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
function bb_lpresources_lpFreeMemory(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<142>";
	var t_r=c_lpResources.m_GetInstance();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<144>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<144>";
	var t_=dbg_object(t_r).m_images.p_Values().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<144>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<144>";
		var t_i=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<145>";
		if((t_i)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<146>";
			t_i.p_Discard();
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<150>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<150>";
	var t_2=dbg_object(t_r).m_sounds.p_Values().p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<150>";
	while(t_2.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<150>";
		var t_i2=t_2.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<151>";
		if((t_i2)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<152>";
			t_i2.p_Discard();
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<157>";
	dbg_object(t_r).m_images.p_Clear();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<158>";
	dbg_object(t_r).m_sounds.p_Clear();
	pop_err();
}
function c_GameScene(){
	c_Scene.call(this);
	this.m_loading_step=10;
	this.m_game_play_space=null;
	this.implments={c_iDrawable:1};
}
c_GameScene.prototype=extend_class(c_Scene);
c_GameScene.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<5>";
	c_Scene.m_new.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<5>";
	pop_err();
	return this;
}
c_GameScene.prototype.p_Loading=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<12>";
	dbg_object(this).m_loading_step-=1;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<14>";
	var t_1=dbg_object(this).m_loading_step;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<15>";
	if(t_1==9){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<16>";
		dbg_object(this.p_Cameras().p_Get(0)).m_ViewPort.p_Width2(160.0);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<17>";
		dbg_object(this.p_Cameras().p_Get(0)).m_ViewPort.p_Height2(144.0);
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<19>";
		if(t_1==8){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<20>";
			dbg_object(this).m_game_play_space=c_GamePlaySpace.m_new.call(new c_GamePlaySpace);
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<21>";
			this.p_AddChild((dbg_object(this).m_game_play_space),false);
		}
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<24>";
	pop_err();
	return dbg_object(this).m_loading_step;
}
c_GameScene.prototype.p_LoadingRender=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<28>";
	bb_graphics_SetColor((dbg_array(bb_consts2_COLOR_4,0)[dbg_index]),(dbg_array(bb_consts2_COLOR_4,1)[dbg_index]),(dbg_array(bb_consts2_COLOR_4,2)[dbg_index]));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<29>";
	bb_graphics_DrawRect(0.0,0.0,640.0,576.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<30>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	pop_err();
}
c_GameScene.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<34>";
	bb_graphics_Cls((dbg_array(bb_consts2_COLOR_1,0)[dbg_index]),(dbg_array(bb_consts2_COLOR_1,1)[dbg_index]),(dbg_array(bb_consts2_COLOR_1,2)[dbg_index]));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/scenes/gamescene.monkey<35>";
	c_Scene.prototype.p_Render.call(this);
	pop_err();
}
function c_Space(){
	Object.call(this);
	this.m_children=c_Stack5.m_new.call(new c_Stack5);
	this.implments={c_iDrawable:1};
}
c_Space.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_Space.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<15>";
	this.p_Create();
	pop_err();
	return this;
}
c_Space.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<22>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<22>";
	var t_=dbg_object(this).m_children.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<22>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<22>";
		var t_c=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<23>";
		t_c.p_Update();
	}
	pop_err();
}
c_Space.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<29>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<29>";
	var t_=dbg_object(this).m_children.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<29>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<29>";
		var t_c=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<30>";
		t_c.p_Render();
	}
	pop_err();
}
c_Space.prototype.p_AddChild2=function(t_child){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/space.monkey<35>";
	dbg_object(this).m_children.p_Push10(t_child);
	pop_err();
}
function c_GamePlaySpace(){
	c_Space.call(this);
	this.m_world=null;
	this.m_collision_engine=null;
	this.m_tile_map_collider=null;
	this.m_bullets_engine=null;
	this.m_player=null;
	this.m_screen_clamp=null;
	this.m_camera_control=null;
	this.implments={c_iDrawable:1};
}
c_GamePlaySpace.prototype=extend_class(c_Space);
c_GamePlaySpace.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<7>";
	c_Space.m_new.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<7>";
	pop_err();
	return this;
}
c_GamePlaySpace.prototype.p_AddElements=function(t_objects){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<57>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<57>";
	var t_=t_objects.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<57>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<57>";
		var t_o=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<59>";
		var t_enemy=null;
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<61>";
		if(String(dbg_object(t_o).m_gid)=="200"){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<62>";
			this.p_AddChild2(c_PowerUp.m_new.call(new c_PowerUp,(t_o)));
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<63>";
			if(String(dbg_object(t_o).m_gid)=="4097" || String(dbg_object(t_o).m_gid)=="4098" || String(dbg_object(t_o).m_gid)=="4099"){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<65>";
				t_enemy=c_Enemy.m_new.call(new c_Enemy,(t_o),String(dbg_object(t_o).m_gid));
			}else{
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<66>";
				if(String(dbg_object(t_o).m_gid)=="4100" || String(dbg_object(t_o).m_gid)=="4101"){
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<67>";
					t_enemy=(c_EnemyTurret.m_new.call(new c_EnemyTurret,(t_o),String(dbg_object(t_o).m_gid)));
				}else{
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<68>";
					if(String(dbg_object(t_o).m_gid)=="4102"){
						err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<69>";
						t_enemy=(c_EnemyWave.m_new.call(new c_EnemyWave,(t_o)));
					}else{
						err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<70>";
						if(String(dbg_object(t_o).m_gid)=="4103"){
							err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<71>";
							t_enemy=(c_EnemyRectLine.m_new.call(new c_EnemyRectLine,(t_o),String(dbg_object(t_o).m_gid)));
						}else{
							err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<72>";
							if(String(dbg_object(t_o).m_gid)=="4122"){
								err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<73>";
								dbg_object(dbg_object(this).m_player).m_position.p_X(t_o.p_X2());
								err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<74>";
								dbg_object(dbg_object(this).m_player).m_position.p_Y(t_o.p_Y2());
								err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<76>";
								dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort.p_X(dbg_object(dbg_object(this).m_player).m_position.p_X2()-50.0);
							}
						}
					}
				}
			}
		}
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<79>";
		if(t_enemy!=null){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<80>";
			dbg_object(t_enemy).m_player_position=dbg_object(dbg_object(this).m_player).m_position;
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<81>";
			this.p_AddChild2(t_enemy);
		}
	}
	pop_err();
}
c_GamePlaySpace.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<22>";
	dbg_object(this).m_world=c_World.m_new.call(new c_World);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<23>";
	this.p_AddChild2(dbg_object(this).m_world);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<27>";
	dbg_object(this).m_collision_engine=c_CollisionEngine.m_Instance2();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<28>";
	this.p_AddChild2(dbg_object(this).m_collision_engine);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<30>";
	dbg_object(this).m_tile_map_collider=c_TileMapCollider.m_new.call(new c_TileMapCollider,dbg_object(this).m_world.p_GetCollisionsLayer());
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<31>";
	this.p_AddChild2(dbg_object(this).m_tile_map_collider);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<33>";
	dbg_object(this).m_bullets_engine=c_BulletsEngine.m_new.call(new c_BulletsEngine);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<34>";
	this.p_AddChild2(dbg_object(this).m_bullets_engine);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<37>";
	dbg_object(this).m_player=c_Player.m_new.call(new c_Player);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<38>";
	this.p_AddChild2(dbg_object(this).m_player);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<40>";
	this.p_AddElements(dbg_object(dbg_object(this).m_world.p_RemoveElements()).m_objects);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<43>";
	this.p_AddChild2(dbg_object(this).m_world.p_RemoveForeground());
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<46>";
	dbg_object(this).m_screen_clamp=c_ClampToScreen.m_new.call(new c_ClampToScreen,dbg_object(dbg_object(this).m_player).m_position);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<47>";
	dbg_object(dbg_object(this).m_screen_clamp).m_camera_viewport=dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<48>";
	this.p_AddChild2(dbg_object(this).m_screen_clamp);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<51>";
	dbg_object(this).m_camera_control=c_CameraControl.m_new.call(new c_CameraControl,dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<52>";
	dbg_object(dbg_object(this).m_camera_control).m_player=dbg_object(dbg_object(this).m_player).m_position;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/spaces/gameplay.monkey<53>";
	this.p_AddChild2(dbg_object(this).m_camera_control);
	pop_err();
}
var bb_consts2_COLOR_4=[];
var bb_consts2_COLOR_1=[];
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack5.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack5.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator3.m_new.call(new c_Enumerator3,this);
	pop_err();
	return t_;
}
c_Stack5.m_NIL=null;
c_Stack5.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack5.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack5.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack5.prototype.p_Push10=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack5.prototype.p_Push11=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push10(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack5.prototype.p_Push12=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
function c_Enumerator3(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator3.m_new=function(t_stack){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator3.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator3.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_World(){
	Object.call(this);
	this.m_tile_map=null;
	this.implments={c_iDrawable:1};
}
c_World.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<17>";
	dbg_object(this).m_tile_map=c_TileMap.m_new.call(new c_TileMap,"level_1.json");
	pop_err();
}
c_World.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<11>";
	this.p_Create();
	pop_err();
	return this;
}
c_World.prototype.p_GetCollisionsLayer=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<38>";
	var t_=object_downcast((dbg_object(this).m_tile_map.p_GetLayer("collisions")),c_TileLayer);
	pop_err();
	return t_;
}
c_World.prototype.p_RemoveElements=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<33>";
	var t_=object_downcast((dbg_object(this).m_tile_map.p_RemoveLayer("elements")),c_ObjectGroup);
	pop_err();
	return t_;
}
c_World.prototype.p_RemoveForeground=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<29>";
	var t_=dbg_object(this).m_tile_map.p_RemoveLayer("foreground");
	pop_err();
	return t_;
}
c_World.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<21>";
	dbg_object(this).m_tile_map.p_Update();
	pop_err();
}
c_World.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/world.monkey<25>";
	dbg_object(this).m_tile_map.p_Render();
	pop_err();
}
function c_TileMap(){
	c_Space.call(this);
	this.m_tilemapUri="";
	this.m_tileSets=null;
	this.m_layers=null;
	this.m_height=0;
	this.m_width=0;
	this.m_version=.0;
	this.m_tileHeight=.0;
	this.m_tileWidth=.0;
	this.implments={c_iDrawable:1};
}
c_TileMap.prototype=extend_class(c_Space);
c_TileMap.prototype.p_GetTileSet=function(t_id){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<237>";
	var t_ts=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<239>";
	for(var t_i=0;t_i<this.m_tileSets.p_Length2();t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<241>";
		if(t_id>=dbg_object(this.m_tileSets.p_Get(t_i)).m_firstgid){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<242>";
			t_ts=this.m_tileSets.p_Get(t_i);
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<245>";
	pop_err();
	return t_ts;
}
c_TileMap.prototype.p_LoadTileMap=function(t_tilemapUri){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<250>";
	dbg_object(this).m_tileSets.p_Clear();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<251>";
	dbg_object(this).m_layers.p_Clear();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<253>";
	var t_content=bb_app_LoadString(t_tilemapUri);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<254>";
	var t_data=c_JSONData.m_ReadJSON(t_content);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<255>";
	var t_jsonObject=object_downcast((t_data),c_JSONObject);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<257>";
	dbg_object(this).m_height=parseInt((t_jsonObject.p_GetItem("height").p_ToString()),10);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<258>";
	dbg_object(this).m_width=parseInt((t_jsonObject.p_GetItem("width").p_ToString()),10);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<259>";
	dbg_object(this).m_version=(parseInt((t_jsonObject.p_GetItem("version").p_ToString()),10));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<260>";
	dbg_object(this).m_tileHeight=(parseInt((t_jsonObject.p_GetItem("tileheight").p_ToString()),10));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<261>";
	dbg_object(this).m_tileWidth=(parseInt((t_jsonObject.p_GetItem("tilewidth").p_ToString()),10));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<263>";
	var t_jsonArrayT=object_downcast((t_jsonObject.p_GetItem("tilesets")),c_JSONArray);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<265>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<265>";
	var t_=dbg_object(t_jsonArrayT).m_values.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<265>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<265>";
		var t_di=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<266>";
		var t_jo=object_downcast((t_di),c_JSONObject);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<267>";
		var t_ts=c_TileSet.m_new.call(new c_TileSet);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<269>";
		dbg_object(t_ts).m_firstgid=parseInt((t_jo.p_GetItem("firstgid").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<270>";
		dbg_object(t_ts).m_image=t_jo.p_GetItem("image").p_ToString();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<271>";
		dbg_object(t_ts).m_imageHeight=parseInt((t_jo.p_GetItem("imageheight").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<272>";
		dbg_object(t_ts).m_imageWidth=parseInt((t_jo.p_GetItem("imagewidth").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<273>";
		dbg_object(t_ts).m_margin=parseInt((t_jo.p_GetItem("margin").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<274>";
		dbg_object(t_ts).m_name=t_jo.p_GetItem("name").p_ToString();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<275>";
		dbg_object(t_ts).m_spacing=parseInt((t_jo.p_GetItem("spacing").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<276>";
		dbg_object(t_ts).m_tileHeight=parseInt((t_jo.p_GetItem("tileheight").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<277>";
		dbg_object(t_ts).m_tileWidth=parseInt((t_jo.p_GetItem("tilewidth").p_ToString()),10);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<278>";
		t_ts.p_CalculateTiles();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<280>";
		dbg_object(this).m_tileSets.p_Push13(t_ts);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<283>";
	var t_jsonArrayL=object_downcast((t_jsonObject.p_GetItem("layers")),c_JSONArray);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<285>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<285>";
	var t_2=t_jsonArrayL.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<285>";
	while(t_2.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<285>";
		var t_di2=t_2.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<286>";
		var t_jo2=object_downcast((t_di2),c_JSONObject);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<288>";
		if(t_jo2.p_GetItem("type").p_ToString()=="tilelayer"){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<290>";
			var t_ja=object_downcast((t_jo2.p_GetItem("data")),c_JSONArray);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<291>";
			var t_tileLayer=c_TileLayer.m_new.call(new c_TileLayer,this);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<293>";
			dbg_object(t_tileLayer).m_x=t_jo2.p_GetItem("x").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<294>";
			dbg_object(t_tileLayer).m_y=t_jo2.p_GetItem("y").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<295>";
			dbg_object(t_tileLayer).m_width=t_jo2.p_GetItem("width").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<296>";
			dbg_object(t_tileLayer).m_height=t_jo2.p_GetItem("height").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<298>";
			dbg_object(t_tileLayer).m_name=t_jo2.p_GetItem("name").p_ToString();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<299>";
			dbg_object(t_tileLayer).m_opacity=t_jo2.p_GetItem("opacity").p_ToFloat();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<300>";
			dbg_object(t_tileLayer).m_type=t_jo2.p_GetItem("type").p_ToString();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<301>";
			dbg_object(t_tileLayer).m_visible=t_jo2.p_GetItem("visible").p_ToBool();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<303>";
			var t_dataList=c_List4.m_new.call(new c_List4);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<305>";
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<305>";
			var t_3=t_ja.p_ObjectEnumerator();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<305>";
			while(t_3.p_HasNext()){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<305>";
				var t_i=t_3.p_NextObject();
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<306>";
				var t_jsonInt=object_downcast((t_i),c_JSONInteger);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<307>";
				t_dataList.p_AddLast3(dbg_object(t_jsonInt).m_value);
			}
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<310>";
			dbg_object(t_tileLayer).m_data=t_dataList.p_ToArray();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<314>";
			dbg_object(this).m_layers.p_Push16(t_tileLayer);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<317>";
			var t_ja2=object_downcast((t_jo2.p_GetItem("objects")),c_JSONArray);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<318>";
			var t_objectGroup=c_ObjectGroup.m_new.call(new c_ObjectGroup,this);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<320>";
			dbg_object(t_objectGroup).m_x=t_jo2.p_GetItem("x").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<321>";
			dbg_object(t_objectGroup).m_y=t_jo2.p_GetItem("y").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<322>";
			dbg_object(t_objectGroup).m_width=t_jo2.p_GetItem("width").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<323>";
			dbg_object(t_objectGroup).m_height=t_jo2.p_GetItem("height").p_ToInt();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<325>";
			dbg_object(t_objectGroup).m_name=t_jo2.p_GetItem("name").p_ToString();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<326>";
			dbg_object(t_objectGroup).m_opacity=t_jo2.p_GetItem("opacity").p_ToFloat();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<327>";
			dbg_object(t_objectGroup).m_type=t_jo2.p_GetItem("type").p_ToString();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<328>";
			dbg_object(t_objectGroup).m_visible=t_jo2.p_GetItem("visible").p_ToBool();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<330>";
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<330>";
			var t_4=t_ja2.p_ObjectEnumerator();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<330>";
			while(t_4.p_HasNext()){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<330>";
				var t_dataRect=t_4.p_NextObject();
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<331>";
				var t_jRect=object_downcast((t_dataRect),c_JSONObject);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<336>";
				var t_rect=c_TileObject.m_new.call(new c_TileObject,t_jRect.p_GetItem("x").p_ToInt(),t_jRect.p_GetItem("y").p_ToInt(),t_jRect.p_GetItem("width").p_ToInt(),t_jRect.p_GetItem("height").p_ToInt());
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<337>";
				dbg_object(t_rect).m_gid=t_jRect.p_GetItem3("gid",0);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<339>";
				if(t_rect.p_Width()==0.0 && t_rect.p_Height()==0.0){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<340>";
					var t_tileSet=this.p_GetTileSet(dbg_object(t_rect).m_gid);
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<341>";
					var t_tile=dbg_object(t_tileSet).m_tiles.p_Get(dbg_object(t_rect).m_gid);
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<343>";
					t_rect.p_Width2(t_tile.p_Width());
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<344>";
					t_rect.p_Height2(t_tile.p_Height());
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<347>";
				dbg_object(t_rect).m_properties=c_StringMap3.m_new.call(new c_StringMap3);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<349>";
				var t_jsonProperties=object_downcast((t_jRect.p_GetItem("properties")),c_JSONObject);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<350>";
				var t_keys=c_Stack9.m_new.call(new c_Stack9);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<351>";
				var t_values=c_Stack9.m_new.call(new c_Stack9);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<353>";
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<353>";
				var t_5=dbg_object(t_jsonProperties).m_values.p_Keys().p_ObjectEnumerator();
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<353>";
				while(t_5.p_HasNext()){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<353>";
					var t_j=t_5.p_NextObject();
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<354>";
					t_keys.p_Push22(t_j);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<357>";
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<357>";
				var t_6=dbg_object(t_jsonProperties).m_values.p_Values().p_ObjectEnumerator();
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<357>";
				while(t_6.p_HasNext()){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<357>";
					var t_v=t_6.p_NextObject();
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<358>";
					t_values.p_Push22(t_v.p_ToString());
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<361>";
				for(var t_i2=0;t_i2<t_keys.p_Length2();t_i2=t_i2+1){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<362>";
					dbg_object(t_rect).m_properties.p_Set3(t_keys.p_Get(t_i2),t_values.p_Get(t_i2));
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<364>";
				dbg_object(t_rect).m_parent=(t_objectGroup);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<366>";
				dbg_object(t_objectGroup).m_objects.p_Push19(t_rect);
			}
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<371>";
			dbg_object(this).m_layers.p_Push16(t_objectGroup);
		}
	}
	pop_err();
}
c_TileMap.m_new=function(t_tilemapUri){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<194>";
	c_Space.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<195>";
	dbg_object(this).m_tilemapUri=t_tilemapUri;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<196>";
	dbg_object(this).m_tileSets=c_Stack6.m_new.call(new c_Stack6);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<197>";
	dbg_object(this).m_layers=c_Stack7.m_new.call(new c_Stack7);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<199>";
	this.p_LoadTileMap(dbg_object(this).m_tilemapUri);
	pop_err();
	return this;
}
c_TileMap.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<179>";
	c_Space.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<179>";
	pop_err();
	return this;
}
c_TileMap.prototype.p_GetLayer=function(t_name){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<216>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<216>";
	var t_=dbg_object(this).m_layers.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<216>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<216>";
		var t_m=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<217>";
		if(dbg_object(t_m).m_name==t_name){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<217>";
			pop_err();
			return t_m;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<220>";
	pop_err();
	return null;
}
c_TileMap.prototype.p_RemoveLayer=function(t_name){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<225>";
	for(var t_i=0;t_i<dbg_object(this).m_layers.p_Length2();t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<226>";
		if(dbg_object(dbg_object(this).m_layers.p_Get(t_i)).m_name==t_name){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<227>";
			var t_m=dbg_object(this).m_layers.p_Get(t_i);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<228>";
			dbg_object(this).m_layers.p_Remove2(t_i);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<229>";
			pop_err();
			return t_m;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<233>";
	pop_err();
	return null;
}
c_TileMap.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<203>";
	c_Space.prototype.p_Update.call(this);
	pop_err();
}
c_TileMap.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<207>";
	c_Space.prototype.p_Render.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<209>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<209>";
	var t_=dbg_object(this).m_layers.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<209>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<209>";
		var t_layer=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<210>";
		t_layer.p_Render();
	}
	pop_err();
}
function c_TileSet(){
	Object.call(this);
	this.m_firstgid=0;
	this.m_image="";
	this.m_imageHeight=0;
	this.m_imageWidth=0;
	this.m_margin=0;
	this.m_name="";
	this.m_spacing=0;
	this.m_tileHeight=0;
	this.m_tileWidth=0;
	this.m_tiles=null;
	this.m_drawableImage=null;
}
c_TileSet.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<9>";
	pop_err();
	return this;
}
c_TileSet.prototype.p_CalculateTiles=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<25>";
	var t_i=this.m_firstgid;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<26>";
	dbg_object(this).m_tiles=c_IntMap3.m_new.call(new c_IntMap3);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<27>";
	dbg_object(this).m_drawableImage=bb_graphics_LoadImage(dbg_object(this).m_image,1,c_Image.m_DefaultFlags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<29>";
	for(var t_y=0;t_y<((this.m_imageHeight/dbg_object(this).m_tileHeight)|0);t_y=t_y+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<30>";
		for(var t_x=0;t_x<((this.m_imageWidth/dbg_object(this).m_tileWidth)|0);t_x=t_x+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<36>";
			this.m_tiles.p_Set5(t_i,c_Rectangle.m_new3.call(new c_Rectangle,(t_x*this.m_tileWidth),(t_y*this.m_tileHeight),(this.m_tileWidth),(this.m_tileHeight)));
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<37>";
			t_i=t_i+1;
		}
	}
	pop_err();
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack6.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack6.m_NIL=null;
c_Stack6.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack6.m_NIL;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack6.prototype.p_Push13=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack6.prototype.p_Push14=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push13(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack6.prototype.p_Push15=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack6.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack6.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack6.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack6.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
function c_MidLayer(){
	c_Space.call(this);
	this.m_parent=null;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_name="";
	this.m_opacity=.0;
	this.m_type="";
	this.m_visible=false;
	this.m_camera=null;
	this.implments={c_iDrawable:1};
}
c_MidLayer.prototype=extend_class(c_Space);
c_MidLayer.m_new=function(t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<60>";
	c_Space.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<61>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_MidLayer.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<44>";
	c_Space.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<44>";
	pop_err();
	return this;
}
function c_Stack7(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack7.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack7.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack7.m_NIL=null;
c_Stack7.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack7.m_NIL;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack7.prototype.p_Push16=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack7.prototype.p_Push17=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push16(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack7.prototype.p_Push18=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack7.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator6.m_new.call(new c_Enumerator6,this);
	pop_err();
	return t_;
}
c_Stack7.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack7.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack7.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack7.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack7.prototype.p_Remove2=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index];
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack7.m_NIL;
	pop_err();
}
function bb_app_LoadString(t_path){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/app.monkey<220>";
	var t_=bb_app__game.LoadString(bb_data_FixDataPath(t_path));
	pop_err();
	return t_;
}
function c_JSONDataItem(){
	Object.call(this);
	this.m_dataType=7;
}
c_JSONDataItem.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<366>";
	pop_err();
	return this;
}
c_JSONDataItem.prototype.p_ToString=function(){
}
c_JSONDataItem.prototype.p_ToInt=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<371>";
	print("Unsupported conversion to Int for "+this.p_ToString());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<372>";
	pop_err();
	return -1;
}
c_JSONDataItem.prototype.p_ToFloat=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<376>";
	print("Unsupported conversion to Float for "+this.p_ToString());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<377>";
	pop_err();
	return -1.0;
}
c_JSONDataItem.prototype.p_ToBool=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<381>";
	print("Unsupported conversion to Bool for "+this.p_ToString());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<382>";
	pop_err();
	return false;
}
function c_JSONData(){
	Object.call(this);
}
c_JSONData.m_GetJSONObject=function(t_tokeniser){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<131>";
	var t_jsonObject=c_JSONObject.m_new.call(new c_JSONObject);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<132>";
	var t_data1=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<133>";
	var t_data2=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<136>";
	t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<137>";
	if(dbg_object(t_data1).m_dataType==9 && dbg_object(dbg_object(object_downcast((t_data1),c_JSONNonData)).m_value).m_tokenType==2){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<139>";
		var t_=(t_jsonObject);
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<142>";
	do{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<143>";
		if(dbg_object(t_data1).m_dataType!=5){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<144>";
			var t_2=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item name, got "+(t_data1.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_2;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<147>";
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<149>";
		if(dbg_object(t_data2).m_dataType!=9){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<150>";
			var t_3=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_3;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<152>";
			if(dbg_object(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value).m_tokenType!=6){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<153>";
				var t_4=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				pop_err();
				return t_4;
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<157>";
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<159>";
		if(dbg_object(t_data2).m_dataType==-1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<160>";
			pop_err();
			return t_data2;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<161>";
			if(dbg_object(t_data2).m_dataType==9){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<162>";
				var t_5=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item value, got "+(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				pop_err();
				return t_5;
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<165>";
		t_jsonObject.p_AddItem(dbg_object(object_downcast((t_data1),c_JSONString)).m_value,t_data2);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<166>";
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<168>";
		if(dbg_object(t_data2).m_dataType!=9){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<169>";
			var t_6=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_6;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<171>";
			if(dbg_object(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value).m_tokenType==2){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<172>";
				break;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<173>";
				if(dbg_object(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value).m_tokenType!=0){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<174>";
					var t_7=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
					pop_err();
					return t_7;
				}
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<177>";
		t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	}while(!(false));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<180>";
	var t_8=(t_jsonObject);
	pop_err();
	return t_8;
}
c_JSONData.m_GetJSONArray=function(t_tokeniser){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<184>";
	var t_jsonArray=c_JSONArray.m_new.call(new c_JSONArray);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<185>";
	var t_data=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<188>";
	t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<189>";
	if(dbg_object(t_data).m_dataType==9 && dbg_object(dbg_object(object_downcast((t_data),c_JSONNonData)).m_value).m_tokenType==4){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<190>";
		var t_=(t_jsonArray);
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<193>";
	do{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<194>";
		if(dbg_object(t_data).m_dataType==9){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<195>";
			var t_2=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected data value, got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_2;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<196>";
			if(dbg_object(t_data).m_dataType==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<197>";
				pop_err();
				return t_data;
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<199>";
		t_jsonArray.p_AddItem2(t_data);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<201>";
		t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<203>";
		if(dbg_object(t_data).m_dataType==9){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<204>";
			var t_token=dbg_object(object_downcast((t_data),c_JSONNonData)).m_value;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<205>";
			if(dbg_object(t_token).m_tokenType==0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<206>";
				t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<207>";
				continue;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<208>";
				if(dbg_object(t_token).m_tokenType==4){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<209>";
					break;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<211>";
					var t_3=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_token.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
					pop_err();
					return t_3;
				}
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<214>";
			var t_4=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_4;
		}
	}while(!(false));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<218>";
	var t_5=(t_jsonArray);
	pop_err();
	return t_5;
}
c_JSONData.m_HexCharToInt=function(t_char){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<331>";
	if(t_char>=48 && t_char<=57){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<332>";
		var t_=t_char-48;
		pop_err();
		return t_;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<333>";
		if(t_char>=65 && t_char<=70){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<334>";
			var t_2=t_char-55;
			pop_err();
			return t_2;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<335>";
			if(t_char>=97 && t_char<=102){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<336>";
				var t_3=t_char-87;
				pop_err();
				return t_3;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<338>";
	pop_err();
	return 0;
}
c_JSONData.m_UnEscapeUnicode=function(t_hexString){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<342>";
	var t_charCode=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<343>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<344>";
		t_charCode<<=4;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<345>";
		t_charCode+=c_JSONData.m_HexCharToInt(dbg_charCodeAt(t_hexString,t_i));
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<347>";
	var t_=String.fromCharCode(t_charCode);
	pop_err();
	return t_;
}
c_JSONData.m_UnEscapeJSON=function(t_input){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<287>";
	var t_escIndex=t_input.indexOf("\\",0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<289>";
	if(t_escIndex==-1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<290>";
		pop_err();
		return t_input;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<293>";
	var t_copyStartIndex=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<294>";
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,t_input.length);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<296>";
	while(t_escIndex!=-1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<297>";
		t_retString.p_AddString(t_input.slice(t_copyStartIndex,t_escIndex));
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<298>";
		var t_2=dbg_charCodeAt(t_input,t_escIndex+1);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<299>";
		if(t_2==110){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<300>";
			t_retString.p_AddString("\n");
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<301>";
			if(t_2==34){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<302>";
				t_retString.p_AddString("\"");
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<303>";
				if(t_2==116){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<304>";
					t_retString.p_AddString("\t");
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<305>";
					if(t_2==92){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<306>";
						t_retString.p_AddString("\\");
					}else{
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<307>";
						if(t_2==47){
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<308>";
							t_retString.p_AddString("/");
						}else{
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<309>";
							if(t_2==114){
								err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<310>";
								t_retString.p_AddString("\r");
							}else{
								err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<311>";
								if(t_2==102){
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<312>";
									t_retString.p_AddString(String.fromCharCode(12));
								}else{
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<313>";
									if(t_2==98){
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<314>";
										t_retString.p_AddString(String.fromCharCode(8));
									}else{
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<315>";
										if(t_2==117){
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<316>";
											t_retString.p_AddString(c_JSONData.m_UnEscapeUnicode(t_input.slice(t_escIndex+2,t_escIndex+6)));
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<317>";
											t_escIndex+=4;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<319>";
		t_copyStartIndex=t_escIndex+2;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<320>";
		t_escIndex=t_input.indexOf("\\",t_copyStartIndex);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<323>";
	if(t_copyStartIndex<t_input.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<324>";
		t_retString.p_AddString(t_input.slice(t_copyStartIndex));
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<327>";
	var t_=t_retString.p_ToString();
	pop_err();
	return t_;
}
c_JSONData.m_GetJSONDataItem=function(t_tokeniser){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<104>";
	var t_token=t_tokeniser.p_NextToken();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<106>";
	var t_1=dbg_object(t_token).m_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<107>";
	if(t_1==1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<108>";
		var t_=c_JSONData.m_GetJSONObject(t_tokeniser);
		pop_err();
		return t_;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<109>";
		if(t_1==3){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<110>";
			var t_2=c_JSONData.m_GetJSONArray(t_tokeniser);
			pop_err();
			return t_2;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<111>";
			if(t_1==10){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<112>";
				var t_3=(c_JSONString.m_new.call(new c_JSONString,(object_downcast((dbg_object(t_token).m_value),c_StringObject).p_ToString()),false));
				pop_err();
				return t_3;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<113>";
				if(t_1==11){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<114>";
					var t_4=(c_JSONFloat.m_new.call(new c_JSONFloat,object_downcast((dbg_object(t_token).m_value),c_FloatObject).p_ToFloat()));
					pop_err();
					return t_4;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<115>";
					if(t_1==12){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<116>";
						var t_5=(c_JSONFloat.m_new2.call(new c_JSONFloat,object_downcast((dbg_object(t_token).m_value),c_StringObject).p_ToString()));
						pop_err();
						return t_5;
					}else{
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<117>";
						if(t_1==13){
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<118>";
							var t_6=(c_JSONInteger.m_new.call(new c_JSONInteger,(object_downcast((dbg_object(t_token).m_value),c_IntObject).p_ToInt())));
							pop_err();
							return t_6;
						}else{
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<119>";
							if(t_1==7){
								err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<120>";
								var t_7=(c_JSONBool.m_new.call(new c_JSONBool,true));
								pop_err();
								return t_7;
							}else{
								err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<121>";
								if(t_1==8){
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<122>";
									var t_8=(c_JSONBool.m_new.call(new c_JSONBool,false));
									pop_err();
									return t_8;
								}else{
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<123>";
									if(t_1==9){
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<124>";
										var t_9=(c_JSONNull.m_new.call(new c_JSONNull));
										pop_err();
										return t_9;
									}else{
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<126>";
										var t_10=(c_JSONNonData.m_new.call(new c_JSONNonData,t_token));
										pop_err();
										return t_10;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
c_JSONData.m_ReadJSON=function(t_jsonString){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<71>";
	var t_tokeniser=c_JSONTokeniser.m_new.call(new c_JSONTokeniser,t_jsonString,false);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<73>";
	var t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<75>";
	if(t_data==null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<76>";
		var t_=(c_JSONDataError.m_new.call(new c_JSONDataError,"Unknown JSON error.",t_tokeniser.p_GetCurrentSectionString(20,20)));
		pop_err();
		return t_;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<77>";
		if(dbg_object(t_data).m_dataType==-1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<78>";
			print(t_data.p_ToString());
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<79>";
			if(dbg_object(t_data).m_dataType!=1 && dbg_object(t_data).m_dataType!=2){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<80>";
				var t_2=(c_JSONDataError.m_new.call(new c_JSONDataError,"JSON Document malformed. Root node is not an object or an array",t_tokeniser.p_GetCurrentSectionString(20,20)));
				pop_err();
				return t_2;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<83>";
	pop_err();
	return t_data;
}
function c_JSONTokeniser(){
	Object.call(this);
	this.m_silent=false;
	this.m_jsonString="";
	this.m_stringIndex=0;
	this.m_char=0;
}
c_JSONTokeniser.prototype.p_NextChar=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<197>";
	if(this.m_stringIndex>=this.m_jsonString.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<198>";
		this.m_char=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<199>";
		pop_err();
		return this.m_char;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<201>";
	this.m_char=dbg_charCodeAt(this.m_jsonString,this.m_stringIndex);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<202>";
	this.m_stringIndex+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<203>";
	pop_err();
	return this.m_char;
}
c_JSONTokeniser.m_new=function(t_jsonString,t_silent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<120>";
	dbg_object(this).m_silent=t_silent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<121>";
	dbg_object(this).m_jsonString=t_jsonString;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<122>";
	this.p_NextChar();
	pop_err();
	return this;
}
c_JSONTokeniser.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<108>";
	pop_err();
	return this;
}
c_JSONTokeniser.prototype.p_SkipWhitespace=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<252>";
	var t_index=this.m_stringIndex;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<253>";
	while(this.m_char<=32 && this.m_char!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<254>";
		this.p_NextChar();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<256>";
	var t_=this.m_stringIndex-t_index;
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_GetCurrentSectionString=function(t_backwards,t_forwards){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<126>";
	var t_="Section: "+this.m_jsonString.slice(bb_math_Max(this.m_stringIndex-t_backwards,0),bb_math_Min(this.m_stringIndex+t_forwards,this.m_jsonString.length));
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_ParseFailure=function(t_description){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<290>";
	if(this.m_silent){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<293>";
	print("JSON parse error at index: "+String(this.m_stringIndex));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<294>";
	print(t_description);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<295>";
	print(this.p_GetCurrentSectionString(20,20));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<296>";
	this.m_stringIndex=this.m_jsonString.length;
	pop_err();
}
c_JSONTokeniser.prototype.p_SkipComments=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<260>";
	var t_index=this.m_stringIndex;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<261>";
	if(this.m_char==47){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<262>";
		this.p_NextChar();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<263>";
		if(this.m_char==47){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<264>";
			while(this.m_char!=13 && this.m_char!=10 && this.m_char!=0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<265>";
				this.p_NextChar();
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<267>";
			if(this.m_char==42){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<268>";
				do{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<269>";
					this.p_NextChar();
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<270>";
					if(this.m_char==42){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<271>";
						this.p_NextChar();
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<272>";
						if(this.m_char==47){
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<273>";
							break;
						}
					}
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<276>";
					if(this.m_char==0){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<277>";
						this.p_ParseFailure("Unterminated comment");
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<278>";
						break;
					}
				}while(!(false));
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<282>";
				this.p_ParseFailure("Unrecognised comment opening");
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<284>";
		this.p_NextChar();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<286>";
	var t_=this.m_stringIndex-t_index;
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_SkipIgnored=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<243>";
	var t_ignoredCount=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<244>";
	do{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<245>";
		t_ignoredCount=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<246>";
		t_ignoredCount+=this.p_SkipWhitespace();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<247>";
		t_ignoredCount+=this.p_SkipComments();
	}while(!(t_ignoredCount==0));
	pop_err();
}
c_JSONTokeniser.prototype.p_IsDigit=function(t_char){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<239>";
	var t_=t_char>=48 && t_char<=58;
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_ParseInteger=function(t_str){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<230>";
	var t_=parseInt((t_str),10);
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_ParseNumberToken=function(t_firstChar){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<207>";
	var t_index=this.m_stringIndex-1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<210>";
	while(this.m_char!=32 && this.m_char!=44 && this.m_char!=125 && this.m_char!=93 && this.m_char!=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<211>";
		this.p_NextChar();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<213>";
	if(this.m_char==0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<214>";
		this.p_ParseFailure("Unterminated Number");
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<215>";
		var t_=c_JSONToken.m_CreateToken4(-1,null);
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<218>";
	var t_numberString=this.m_jsonString.slice(t_index,this.m_stringIndex-1);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<220>";
	if(t_numberString.indexOf(".",0)!=-1 || t_numberString.indexOf("e",0)!=-1 || t_numberString.indexOf("E",0)!=-1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<221>";
		var t_2=c_JSONToken.m_CreateToken3(12,t_numberString);
		pop_err();
		return t_2;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<223>";
		var t_value=this.p_ParseInteger(t_numberString);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<224>";
		var t_3=c_JSONToken.m_CreateToken2(13,t_value);
		pop_err();
		return t_3;
	}
}
c_JSONTokeniser.prototype.p_NextToken=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<130>";
	var t_retToken=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<131>";
	this.p_SkipIgnored();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<133>";
	var t_2=this.m_char;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<135>";
	if(t_2==123){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<136>";
		t_retToken=c_JSONToken.m_CreateToken3(1,"{");
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<137>";
		if(t_2==125){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<138>";
			t_retToken=c_JSONToken.m_CreateToken3(2,"}");
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<139>";
			if(t_2==91){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<140>";
				t_retToken=c_JSONToken.m_CreateToken3(3,"[");
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<141>";
				if(t_2==93){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<142>";
					t_retToken=c_JSONToken.m_CreateToken3(4,"]");
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<143>";
					if(t_2==44){
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<144>";
						t_retToken=c_JSONToken.m_CreateToken3(0,",");
					}else{
						err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<145>";
						if(t_2==58){
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<146>";
							t_retToken=c_JSONToken.m_CreateToken3(6,":");
						}else{
							err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<147>";
							if(t_2==116){
								err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<148>";
								if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"rue")==0){
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<149>";
									this.m_stringIndex+=3;
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<150>";
									t_retToken=c_JSONToken.m_CreateToken3(7,"true");
								}
							}else{
								err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<152>";
								if(t_2==102){
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<153>";
									if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+4),"alse")==0){
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<154>";
										this.m_stringIndex+=4;
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<155>";
										t_retToken=c_JSONToken.m_CreateToken3(8,"false");
									}
								}else{
									err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<157>";
									if(t_2==110){
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<158>";
										if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"ull")==0){
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<159>";
											this.m_stringIndex+=3;
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<160>";
											t_retToken=c_JSONToken.m_CreateToken3(9,"null");
										}
									}else{
										err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<162>";
										if(t_2==34){
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<163>";
											var t_startIndex=this.m_stringIndex;
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<164>";
											var t_endIndex=this.m_jsonString.indexOf("\"",this.m_stringIndex);
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<165>";
											while(t_endIndex!=-1 && dbg_charCodeAt(this.m_jsonString,t_endIndex-1)==92){
												err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<166>";
												t_endIndex=this.m_jsonString.indexOf("\"",t_endIndex+1);
											}
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<168>";
											if(t_endIndex==-1){
												err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<169>";
												this.p_ParseFailure("Unterminated string");
											}
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<172>";
											t_retToken=c_JSONToken.m_CreateToken3(10,this.m_jsonString.slice(t_startIndex,t_endIndex));
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<173>";
											this.m_stringIndex=t_endIndex+1;
										}else{
											err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<177>";
											if(this.m_char==45 || this.p_IsDigit(this.m_char)){
												err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<178>";
												var t_=this.p_ParseNumberToken(this.m_char);
												pop_err();
												return t_;
											}else{
												err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<179>";
												if(this.m_char==0){
													err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<180>";
													t_retToken=null;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<184>";
	if(t_retToken==null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<185>";
		this.p_ParseFailure("Unknown token, char: "+String.fromCharCode(this.m_char));
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<186>";
		t_retToken=c_JSONToken.m_CreateToken4(-1,null);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<188>";
		this.p_NextChar();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<190>";
	pop_err();
	return t_retToken;
}
function c_ASCIICodes(){
	Object.call(this);
}
function c_JSONToken(){
	Object.call(this);
	this.m_tokenType=0;
	this.m_value=null;
}
c_JSONToken.m_new=function(t_tokenType,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<54>";
	dbg_object(this).m_tokenType=t_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<55>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONToken.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<30>";
	pop_err();
	return this;
}
c_JSONToken.m_reusableToken=null;
c_JSONToken.m_CreateToken=function(t_tokenType,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<61>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<62>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=(c_FloatObject.m_new2.call(new c_FloatObject,t_value));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<63>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken2=function(t_tokenType,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<67>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<68>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=(c_IntObject.m_new.call(new c_IntObject,t_value));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<69>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken3=function(t_tokenType,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<73>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<74>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=(c_StringObject.m_new3.call(new c_StringObject,t_value));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<75>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken4=function(t_tokenType,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<79>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<80>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<81>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.prototype.p_GetValueString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<89>";
	var t_1=this.m_tokenType;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<90>";
	if(t_1==11){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<91>";
		var t_=""+(object_downcast((this.m_value),c_FloatObject).p_ToString());
		pop_err();
		return t_;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<92>";
		if(t_1==13){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<93>";
			var t_2=""+(object_downcast((this.m_value),c_IntObject).p_ToString());
			pop_err();
			return t_2;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<94>";
			if(t_1==9){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<95>";
				pop_err();
				return "NULL";
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<97>";
				if((this.m_value)!=null){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<98>";
					var t_3=(object_downcast((this.m_value),c_StringObject).p_ToString());
					pop_err();
					return t_3;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<100>";
					pop_err();
					return "Null value";
				}
			}
		}
	}
}
c_JSONToken.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/tokeniser.monkey<85>";
	var t_="JSONToken - type: "+String(this.m_tokenType)+", value: "+this.p_GetValueString();
	pop_err();
	return t_;
}
function bb_math_Min(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<51>";
	if(t_x<t_y){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<51>";
		pop_err();
		return t_x;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<52>";
	pop_err();
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<78>";
	if(t_x<t_y){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<78>";
		pop_err();
		return t_x;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<79>";
	pop_err();
	return t_y;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<59>";
	dbg_object(this).m_value=(t_value);
	pop_err();
	return this;
}
c_FloatObject.m_new2=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<63>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_FloatObject.m_new3=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<55>";
	pop_err();
	return this;
}
c_FloatObject.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<75>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
c_FloatObject.prototype.p_ToFloat=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<71>";
	pop_err();
	return this.m_value;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<27>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_IntObject.m_new2=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<31>";
	dbg_object(this).m_value=((t_value)|0);
	pop_err();
	return this;
}
c_IntObject.m_new3=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<23>";
	pop_err();
	return this;
}
c_IntObject.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<43>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
c_IntObject.prototype.p_ToInt=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<35>";
	pop_err();
	return this.m_value;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<92>";
	dbg_object(this).m_value=String(t_value);
	pop_err();
	return this;
}
c_StringObject.m_new2=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<96>";
	dbg_object(this).m_value=String(t_value);
	pop_err();
	return this;
}
c_StringObject.m_new3=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<100>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_StringObject.m_new4=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<88>";
	pop_err();
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/boxes.monkey<104>";
	pop_err();
	return this.m_value;
}
function c_JSONObject(){
	c_JSONDataItem.call(this);
	this.m_values=c_StringMap5.m_new.call(new c_StringMap5);
}
c_JSONObject.prototype=extend_class(c_JSONDataItem);
c_JSONObject.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<663>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<664>";
	this.m_dataType=1;
	pop_err();
	return this;
}
c_JSONObject.prototype.p_AddItem=function(t_name,t_dataItem){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<684>";
	this.m_values.p_Set4(t_name,t_dataItem);
	pop_err();
}
c_JSONObject.prototype.p_GetItem=function(t_name){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<692>";
	var t_=this.m_values.p_Get2(t_name);
	pop_err();
	return t_;
}
c_JSONObject.prototype.p_GetItem2=function(t_name,t_defaultValue){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<704>";
	var t_item=this.m_values.p_Get2(t_name);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<705>";
	if(t_item!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<706>";
		var t_=(t_item.p_ToString());
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<708>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem3=function(t_name,t_defaultValue){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<712>";
	var t_item=this.m_values.p_Get2(t_name);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<713>";
	if(t_item!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<714>";
		var t_=(t_item.p_ToInt());
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<716>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem4=function(t_name,t_defaultValue){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<720>";
	var t_item=this.m_values.p_Get2(t_name);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<721>";
	if(t_item!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<722>";
		var t_=(t_item.p_ToFloat());
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<724>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem5=function(t_name,t_defaultValue){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<728>";
	var t_item=this.m_values.p_Get2(t_name);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<729>";
	if(t_item!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<730>";
		var t_=(t_item.p_ToBool());
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<732>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<758>";
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*5+5);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<759>";
	var t_first=true;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<761>";
	t_retString.p_AddString("{");
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<763>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<763>";
	var t_=this.m_values.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<763>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<763>";
		var t_v=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<764>";
		if(t_first){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<765>";
			t_first=false;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<767>";
			t_retString.p_AddString(",");
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<769>";
		t_retString.p_AddString("\"");
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<770>";
		t_retString.p_AddString(t_v.p_Key());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<771>";
		t_retString.p_AddString("\":");
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<772>";
		t_retString.p_AddString(t_v.p_Value().p_ToString());
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<774>";
	t_retString.p_AddString("}");
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<775>";
	var t_2=t_retString.p_ToString();
	pop_err();
	return t_2;
}
function c_JSONDataType(){
	Object.call(this);
}
function c_JSONNonData(){
	c_JSONDataItem.call(this);
	this.m_value=null;
}
c_JSONNonData.prototype=extend_class(c_JSONDataItem);
c_JSONNonData.m_new=function(t_token){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<408>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<409>";
	this.m_dataType=9;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<410>";
	this.m_value=t_token;
	pop_err();
	return this;
}
c_JSONNonData.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<405>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<405>";
	pop_err();
	return this;
}
c_JSONNonData.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<414>";
	pop_err();
	return "Non Data";
}
function c_JSONDataError(){
	c_JSONDataItem.call(this);
	this.m_value="";
}
c_JSONDataError.prototype=extend_class(c_JSONDataItem);
c_JSONDataError.m_new=function(t_errorDescription,t_location){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<395>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<396>";
	this.m_dataType=-1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<397>";
	this.m_value=t_errorDescription+"\nJSON Location: "+t_location;
	pop_err();
	return this;
}
c_JSONDataError.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<392>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<392>";
	pop_err();
	return this;
}
c_JSONDataError.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<401>";
	pop_err();
	return this.m_value;
}
function c_JSONString(){
	c_JSONDataItem.call(this);
	this.m_value="";
	this.m_jsonReady="";
}
c_JSONString.prototype=extend_class(c_JSONDataItem);
c_JSONString.m_new=function(t_value,t_isMonkeyString){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<489>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<490>";
	this.m_dataType=5;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<491>";
	if(!t_isMonkeyString){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<492>";
		dbg_object(this).m_value=c_JSONData.m_UnEscapeJSON(t_value);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<493>";
		this.m_jsonReady="\""+t_value+"\"";
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<495>";
		dbg_object(this).m_value=t_value;
	}
	pop_err();
	return this;
}
c_JSONString.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<481>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<481>";
	pop_err();
	return this;
}
c_JSONString.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<507>";
	pop_err();
	return this.m_value;
}
function c_Map7(){
	Object.call(this);
	this.m_root=null;
}
c_Map7.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map7.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map7.prototype.p_RotateLeft4=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map7.prototype.p_RotateRight4=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map7.prototype.p_InsertFixup4=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft4(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<227>";
				this.p_RotateRight4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<239>";
					this.p_RotateRight4(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map7.prototype.p_Set4=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<45>";
	t_node=c_Node8.m_new.call(new c_Node8,t_key,t_value,-1,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup4(t_node);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map7.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map7.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map7.prototype.p_Keys=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys.m_new.call(new c_MapKeys,this);
	pop_err();
	return t_;
}
c_Map7.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
c_Map7.prototype.p_Values=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<117>";
	var t_=c_MapValues3.m_new.call(new c_MapValues3,this);
	pop_err();
	return t_;
}
c_Map7.prototype.p_Count=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<17>";
	if((this.m_root)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<17>";
		var t_=this.m_root.p_Count2(0);
		pop_err();
		return t_;
	}
	pop_err();
	return 0;
}
c_Map7.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<121>";
	var t_=c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
	pop_err();
	return t_;
}
function c_StringMap5(){
	c_Map7.call(this);
}
c_StringMap5.prototype=extend_class(c_Map7);
c_StringMap5.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	c_Map7.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap5.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node8(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node8.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node8.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node8.prototype.p_NextNode=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node8.prototype.p_Count2=function(t_n){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<371>";
	if((this.m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<371>";
		t_n=this.m_left.p_Count2(t_n);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<372>";
	if((this.m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<372>";
		t_n=this.m_right.p_Count2(t_n);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<373>";
	var t_=t_n+1;
	pop_err();
	return t_;
}
c_Node8.prototype.p_Key=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<377>";
	pop_err();
	return this.m_key;
}
c_Node8.prototype.p_Value=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<381>";
	pop_err();
	return this.m_value;
}
function c_JSONArray(){
	c_JSONDataItem.call(this);
	this.m_values=c_List3.m_new.call(new c_List3);
}
c_JSONArray.prototype=extend_class(c_JSONDataItem);
c_JSONArray.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<554>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<555>";
	this.m_dataType=2;
	pop_err();
	return this;
}
c_JSONArray.prototype.p_AddItem2=function(t_dataItem){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<575>";
	this.m_values.p_AddLast2(t_dataItem);
	pop_err();
}
c_JSONArray.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<621>";
	var t_=this.m_values.p_ObjectEnumerator();
	pop_err();
	return t_;
}
c_JSONArray.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<601>";
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*2+5);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<602>";
	var t_first=true;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<604>";
	t_retString.p_AddString("[");
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<606>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<606>";
	var t_=this.m_values.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<606>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<606>";
		var t_v=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<607>";
		if(t_first){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<608>";
			t_first=false;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<610>";
			t_retString.p_AddString(",");
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<612>";
		t_retString.p_AddString(t_v.p_ToString());
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<615>";
	t_retString.p_AddString("]");
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<617>";
	var t_2=t_retString.p_ToString();
	pop_err();
	return t_2;
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List3.prototype.p_AddLast2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<108>";
	var t_=c_Node9.m_new.call(new c_Node9,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List3.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<14>";
		this.p_AddLast2(t_t);
	}
	pop_err();
	return this;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator4.m_new.call(new c_Enumerator4,this);
	pop_err();
	return t_;
}
c_List3.prototype.p_Count=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<42>";
	while(t_node!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).m__succ;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
function c_Node9(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node9.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node9.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
function c_HeadNode3(){
	c_Node9.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node9);
c_HeadNode3.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node9.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_StringBuilder(){
	Object.call(this);
	this.m_retStrings=[];
	this.m_index=0;
}
c_StringBuilder.m_new=function(t_initialSize){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<39>";
	if(t_initialSize<1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<40>";
		t_initialSize=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<42>";
	this.m_retStrings=new_string_array(t_initialSize);
	pop_err();
	return this;
}
c_StringBuilder.prototype.p_AddString=function(t_add){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<46>";
	if(this.m_index==this.m_retStrings.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<47>";
		this.m_retStrings=resize_string_array(this.m_retStrings,this.m_retStrings.length*2);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<49>";
	dbg_array(this.m_retStrings,this.m_index)[dbg_index]=t_add;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<50>";
	this.m_index+=1;
	pop_err();
}
c_StringBuilder.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<54>";
	if(this.m_index<2){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<55>";
		pop_err();
		return dbg_array(this.m_retStrings,0)[dbg_index];
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<57>";
		var t_=this.m_retStrings.slice(0,this.m_index).join("");
		pop_err();
		return t_;
	}
}
function c_JSONFloat(){
	c_JSONDataItem.call(this);
	this.m_value=.0;
	this.m_unparsedStr="";
	this.m_unparsed=false;
}
c_JSONFloat.prototype=extend_class(c_JSONDataItem);
c_JSONFloat.m_new=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<423>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<424>";
	this.m_dataType=3;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<425>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONFloat.m_new2=function(t_unparsedStr){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<431>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<432>";
	this.m_dataType=3;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<433>";
	dbg_object(this).m_unparsedStr=t_unparsedStr;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<434>";
	dbg_object(this).m_unparsed=true;
	pop_err();
	return this;
}
c_JSONFloat.m_new3=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<418>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<418>";
	pop_err();
	return this;
}
c_JSONFloat.prototype.p_Parse=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<438>";
	if(this.m_unparsed){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<439>";
		this.m_value=parseFloat(this.m_unparsedStr);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<440>";
		this.m_unparsed=false;
	}
	pop_err();
}
c_JSONFloat.prototype.p_ToInt=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<445>";
	this.p_Parse();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<446>";
	var t_=((this.m_value)|0);
	pop_err();
	return t_;
}
c_JSONFloat.prototype.p_ToFloat=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<450>";
	this.p_Parse();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<451>";
	pop_err();
	return this.m_value;
}
c_JSONFloat.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<455>";
	this.p_Parse();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<456>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
function c_JSONInteger(){
	c_JSONDataItem.call(this);
	this.m_value=0;
}
c_JSONInteger.prototype=extend_class(c_JSONDataItem);
c_JSONInteger.m_new=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<463>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<464>";
	this.m_dataType=4;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<465>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONInteger.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<460>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<460>";
	pop_err();
	return this;
}
c_JSONInteger.prototype.p_ToInt=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<469>";
	pop_err();
	return this.m_value;
}
c_JSONInteger.prototype.p_ToFloat=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<473>";
	var t_=(this.m_value);
	pop_err();
	return t_;
}
c_JSONInteger.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<477>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
function c_JSONBool(){
	c_JSONDataItem.call(this);
	this.m_value=false;
}
c_JSONBool.prototype=extend_class(c_JSONDataItem);
c_JSONBool.m_new=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<515>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<516>";
	this.m_dataType=6;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<517>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONBool.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<512>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<512>";
	pop_err();
	return this;
}
c_JSONBool.prototype.p_ToBool=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<521>";
	pop_err();
	return this.m_value;
}
c_JSONBool.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<525>";
	if(this.m_value){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<526>";
		pop_err();
		return "True";
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<528>";
		pop_err();
		return "False";
	}
}
function c_JSONNull(){
	c_JSONDataItem.call(this);
}
c_JSONNull.prototype=extend_class(c_JSONDataItem);
c_JSONNull.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<542>";
	c_JSONDataItem.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<542>";
	pop_err();
	return this;
}
c_JSONNull.prototype.p_ToString=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<546>";
	this.m_dataType=7;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/json/jsondata.monkey<547>";
	pop_err();
	return "NULL";
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator4.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator4.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function c_Map8(){
	Object.call(this);
	this.m_root=null;
}
c_Map8.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map8.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map8.prototype.p_RotateLeft5=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map8.prototype.p_RotateRight5=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map8.prototype.p_InsertFixup5=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft5(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<227>";
				this.p_RotateRight5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<239>";
					this.p_RotateRight5(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map8.prototype.p_Set5=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<45>";
	t_node=c_Node10.m_new.call(new c_Node10,t_key,t_value,-1,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup5(t_node);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map8.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map8.prototype.p_Get=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_IntMap3(){
	c_Map8.call(this);
}
c_IntMap3.prototype=extend_class(c_Map8);
c_IntMap3.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<534>";
	c_Map8.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node10(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node10.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node10.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function c_TileLayer(){
	c_MidLayer.call(this);
	this.m_data=[];
	this.m_final_position=[0.0,0.0];
	this.implments={c_iDrawable:1};
}
c_TileLayer.prototype=extend_class(c_MidLayer);
c_TileLayer.m_new=function(t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<70>";
	c_MidLayer.m_new.call(this,t_parent);
	pop_err();
	return this;
}
c_TileLayer.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<65>";
	c_MidLayer.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<65>";
	pop_err();
	return this;
}
c_TileLayer.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<74>";
	c_Space.prototype.p_Render.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<76>";
	if(dbg_object(this).m_visible){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<77>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<78>";
		bb_graphics_SetAlpha(dbg_object(this).m_opacity);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<80>";
		dbg_object(this).m_camera=c_Game.m_Instance().p_GetCurrentCamera();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<82>";
		var t_minCounterX=((dbg_object(dbg_object(this).m_camera).m_ViewPort.p_X2()/dbg_object(this.m_parent).m_tileWidth)|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<83>";
		var t_maxCounterX=(((dbg_object(dbg_object(this).m_camera).m_ViewPort.p_X2()+dbg_object(dbg_object(this).m_camera).m_ViewPort.p_Width())/dbg_object(this.m_parent).m_tileWidth+1.0)|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<85>";
		var t_minCounterY=((dbg_object(dbg_object(this).m_camera).m_ViewPort.p_Y2()/dbg_object(this.m_parent).m_tileHeight)|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<86>";
		var t_maxCounterY=(((dbg_object(dbg_object(this).m_camera).m_ViewPort.p_Y2()+dbg_object(dbg_object(this).m_camera).m_ViewPort.p_Height())/dbg_object(this.m_parent).m_tileHeight+1.0)|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<88>";
		t_minCounterX=bb_math_Clamp(t_minCounterX,0,this.m_width);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<89>";
		t_maxCounterX=bb_math_Clamp(t_maxCounterX,0,this.m_width);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<90>";
		t_minCounterY=bb_math_Clamp(t_minCounterY,0,this.m_height);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<91>";
		t_maxCounterY=bb_math_Clamp(t_maxCounterY,0,this.m_height);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<93>";
		var t_tx=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<94>";
		var t_ty=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<96>";
		for(t_ty=t_minCounterY;t_ty<t_maxCounterY;t_ty=t_ty+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<97>";
			for(t_tx=t_minCounterX;t_tx<t_maxCounterX;t_tx=t_tx+1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<98>";
				var t_index=t_tx+this.m_width*t_ty;
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<99>";
				if(dbg_array(this.m_data,t_index)[dbg_index]>0){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<100>";
					var t_tileSet=this.m_parent.p_GetTileSet(dbg_array(this.m_data,t_index)[dbg_index]);
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<102>";
					var t_tile=dbg_object(t_tileSet).m_tiles.p_Get(dbg_array(this.m_data,t_index)[dbg_index]);
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<104>";
					dbg_array(this.m_final_position,0)[dbg_index]=(dbg_object(this).m_x)+(t_tile.p_Width()-(dbg_object(t_tileSet).m_margin)+(dbg_object(t_tileSet).m_spacing))*(t_tx);
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<105>";
					dbg_array(this.m_final_position,1)[dbg_index]=(dbg_object(this).m_y)+(t_tile.p_Height()-(dbg_object(t_tileSet).m_margin)+(dbg_object(t_tileSet).m_spacing))*(t_ty);
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<114>";
					bb_graphics_DrawImageRect(dbg_object(t_tileSet).m_drawableImage,dbg_array(this.m_final_position,0)[dbg_index],dbg_array(this.m_final_position,1)[dbg_index],((t_tile.p_X2())|0),((t_tile.p_Y2())|0),((t_tile.p_Width())|0),((t_tile.p_Height())|0),0);
				}
			}
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<119>";
		bb_graphics_SetAlpha(1.0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<120>";
		bb_graphics_PopMatrix();
	}
	pop_err();
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List4.prototype.p_AddLast3=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<108>";
	var t_=c_Node11.m_new.call(new c_Node11,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List4.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<14>";
		this.p_AddLast3(t_t);
	}
	pop_err();
	return this;
}
c_List4.prototype.p_Count=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<42>";
	while(t_node!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).m__succ;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator5.m_new.call(new c_Enumerator5,this);
	pop_err();
	return t_;
}
c_List4.prototype.p_ToArray=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<19>";
	var t_arr=new_number_array(this.p_Count());
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<19>";
	var t_i=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
	var t_=this.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
		var t_t=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<21>";
		dbg_array(t_arr,t_i)[dbg_index]=t_t;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<22>";
		t_i+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<24>";
	pop_err();
	return t_arr;
}
function c_Node11(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=0;
}
c_Node11.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node11.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
function c_HeadNode4(){
	c_Node11.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node11);
c_HeadNode4.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node11.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_Enumerator5(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator5.m_new=function(t_list){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator5.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator5.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function c_ObjectGroup(){
	c_MidLayer.call(this);
	this.m_objects=null;
	this.implments={c_iDrawable:1};
}
c_ObjectGroup.prototype=extend_class(c_MidLayer);
c_ObjectGroup.m_new=function(t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<163>";
	c_MidLayer.m_new.call(this,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<164>";
	this.m_objects=c_Stack8.m_new.call(new c_Stack8);
	pop_err();
	return this;
}
c_ObjectGroup.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<159>";
	c_MidLayer.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<159>";
	pop_err();
	return this;
}
c_ObjectGroup.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<168>";
	c_Space.prototype.p_Render.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<169>";
	bb_graphics_SetAlpha(dbg_object(this).m_opacity);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<170>";
	if(dbg_object(this).m_visible && c_Game.m_Instance().p_GetCurrentCamera()!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<171>";
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<171>";
		var t_=this.m_objects.p_ObjectEnumerator();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<171>";
		while(t_.p_HasNext()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<171>";
			var t_ob=t_.p_NextObject();
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<172>";
			t_ob.p_Render();
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<175>";
	bb_graphics_SetAlpha(1.0);
	pop_err();
}
function c_TileObject(){
	c_Rectangle.call(this);
	this.m_gid=0;
	this.m_properties=null;
	this.m_parent=null;
}
c_TileObject.prototype=extend_class(c_Rectangle);
c_TileObject.m_new=function(t_x,t_y,t_w,t_h){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<133>";
	c_Rectangle.m_new3.call(this,(t_x),(t_y),(t_w),(t_h));
	pop_err();
	return this;
}
c_TileObject.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<126>";
	c_Rectangle.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<126>";
	pop_err();
	return this;
}
c_TileObject.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<137>";
	if(this.m_gid>0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<138>";
		var t_tileSet=dbg_object(this.m_parent).m_parent.p_GetTileSet(this.m_gid);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<139>";
		var t_tile=dbg_object(t_tileSet).m_tiles.p_Get(this.m_gid);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<141>";
		var t_finalPosition=c_Vec2.m_new.call(new c_Vec2,(dbg_object(this.m_parent).m_x)+this.p_X2(),(dbg_object(this.m_parent).m_y)+this.p_Y2()-t_tile.p_Height());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<142>";
		var t_correctedPosition=t_finalPosition;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<149>";
		bb_graphics_DrawImageRect(dbg_object(t_tileSet).m_drawableImage,((dbg_object(t_correctedPosition).m_X)|0),((dbg_object(t_correctedPosition).m_Y)|0),((t_tile.p_X2())|0),((t_tile.p_Y2())|0),((t_tile.p_Width())|0),((t_tile.p_Height())|0),0);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/tilemap.monkey<150>";
	}
	pop_err();
}
function c_Stack8(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack8.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack8.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack8.prototype.p_Push19=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack8.prototype.p_Push20=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push19(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack8.prototype.p_Push21=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push20(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack8.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator8.m_new.call(new c_Enumerator8,this);
	pop_err();
	return t_;
}
c_Stack8.m_NIL=null;
c_Stack8.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack8.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack8.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
function c_Stack9(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack9.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack9.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack9.prototype.p_Push22=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_string_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack9.prototype.p_Push23=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push22(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack9.prototype.p_Push24=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push23(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack9.m_NIL="";
c_Stack9.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack9.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_string_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack9.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack9.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function c_MapValues3(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues3.m_new=function(t_map){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<519>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapValues3.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<516>";
	pop_err();
	return this;
}
c_MapValues3.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<523>";
	var t_=c_ValueEnumerator3.m_new.call(new c_ValueEnumerator3,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_ValueEnumerator3(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator3.m_new=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<481>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_ValueEnumerator3.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<478>";
	pop_err();
	return this;
}
c_ValueEnumerator3.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<485>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_ValueEnumerator3.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<489>";
	var t_t=this.m_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<490>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<491>";
	pop_err();
	return dbg_object(t_t).m_value;
}
function c_Node12(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value="";
	this.m_color=0;
	this.m_parent=null;
}
c_Node12.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node12.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function c_CollisionEngine(){
	Object.call(this);
	this.m_objects=null;
	this.m_static_objects=null;
	this.m_delegates=null;
	this.implments={c_iDrawable:1};
}
c_CollisionEngine.m_instance=null;
c_CollisionEngine.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<25>";
	dbg_object(this).m_objects=c_Stack10.m_new.call(new c_Stack10);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<26>";
	dbg_object(this).m_static_objects=c_Stack10.m_new.call(new c_Stack10);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<27>";
	dbg_object(this).m_delegates=c_Stack11.m_new.call(new c_Stack11);
	pop_err();
}
c_CollisionEngine.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<20>";
	this.p_Create();
	pop_err();
	return this;
}
c_CollisionEngine.m_Instance2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<84>";
	if(c_CollisionEngine.m_instance==null){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<85>";
		c_CollisionEngine.m_instance=c_CollisionEngine.m_new.call(new c_CollisionEngine);
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<88>";
	pop_err();
	return c_CollisionEngine.m_instance;
}
c_CollisionEngine.prototype.p_RegisterDelegate=function(t_collision_engine){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<77>";
	dbg_object(t_collision_engine).m_objects=dbg_object(this).m_objects;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<78>";
	dbg_object(t_collision_engine).m_static_objects=dbg_object(this).m_static_objects;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<80>";
	dbg_object(this).m_delegates.p_Push28(t_collision_engine);
	pop_err();
}
c_CollisionEngine.prototype.p_AddBody=function(t_body){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<59>";
	dbg_object(this).m_objects.p_Push25(t_body);
	pop_err();
}
c_CollisionEngine.prototype.p_AddStaticBody=function(t_body){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<63>";
	dbg_object(this).m_static_objects.p_Push25(t_body);
	pop_err();
	return 0;
}
c_CollisionEngine.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<32>";
	var t_collision_count=0;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<35>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<35>";
	var t_=dbg_object(this).m_objects.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<35>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<35>";
		var t_o=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<36>";
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<36>";
		var t_2=dbg_object(this).m_objects.p_ObjectEnumerator();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<36>";
		while(t_2.p_HasNext()){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<36>";
			var t_other=t_2.p_NextObject();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<37>";
			if(t_o!=t_other){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<38>";
				if(c_Collision.m_AABBIntersects(t_o.p_GetBox(),t_other.p_GetBox())){
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<39>";
					t_o.p_OnCollide(t_other.p_GetName());
				}
			}
		}
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<45>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<45>";
	var t_3=dbg_object(this).m_objects.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<45>";
	while(t_3.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<45>";
		var t_o2=t_3.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<46>";
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<46>";
		var t_4=dbg_object(this).m_static_objects.p_ObjectEnumerator();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<46>";
		while(t_4.p_HasNext()){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<46>";
			var t_other2=t_4.p_NextObject();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<47>";
			if(c_Collision.m_AABBIntersects(t_o2.p_GetBox(),t_other2.p_GetBox())){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<48>";
				t_o2.p_OnCollide(t_other2.p_GetName());
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<49>";
				t_other2.p_OnCollide(t_o2.p_GetName());
			}
		}
	}
	pop_err();
}
c_CollisionEngine.prototype.p_Render=function(){
	push_err();
	pop_err();
}
c_CollisionEngine.prototype.p_Destroy=function(t_element){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<67>";
	dbg_object(this).m_objects.p_RemoveEach(t_element);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<68>";
	dbg_object(this).m_static_objects.p_RemoveEach(t_element);
	pop_err();
}
c_CollisionEngine.prototype.p_DestroyAll=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<72>";
	dbg_object(this).m_objects.p_Clear();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/collision_engine.monkey<73>";
	dbg_object(this).m_static_objects.p_Clear();
	pop_err();
}
function c_Stack10(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack10.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack10.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack10.prototype.p_Push25=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack10.prototype.p_Push26=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push25(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack10.prototype.p_Push27=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push26(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack10.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator9.m_new.call(new c_Enumerator9,this);
	pop_err();
	return t_;
}
c_Stack10.m_NIL=null;
c_Stack10.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack10.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack10.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack10.prototype.p_Equals2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<26>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_Stack10.prototype.p_RemoveEach=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<151>";
	var t_i=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<151>";
	var t_j=this.m_length;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<152>";
	while(t_i<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<153>";
		if(!this.p_Equals2(dbg_array(this.m_data,t_i)[dbg_index],t_value)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<154>";
			t_i+=1;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<155>";
			continue;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<157>";
		var t_b=t_i;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<157>";
		var t_e=t_i+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<158>";
		while(t_e<this.m_length && this.p_Equals2(dbg_array(this.m_data,t_e)[dbg_index],t_value)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<159>";
			t_e+=1;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<161>";
		while(t_e<this.m_length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<162>";
			dbg_array(this.m_data,t_b)[dbg_index]=dbg_array(this.m_data,t_e)[dbg_index];
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<163>";
			t_b+=1;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<164>";
			t_e+=1;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<166>";
		this.m_length-=t_e-t_b;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<167>";
		t_i+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<169>";
	t_i=this.m_length;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<170>";
	while(t_i<t_j){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<171>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack10.m_NIL;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<172>";
		t_i+=1;
	}
	pop_err();
}
c_Stack10.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack10.m_NIL;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
function c_Stack11(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack11.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack11.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack11.prototype.p_Push28=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack11.prototype.p_Push29=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push28(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack11.prototype.p_Push30=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push29(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
function c_TileMapCollider(){
	c_CollisionEngine.call(this);
	this.m_tile_layer=null;
	this.m_view_port=null;
	this.m_tile_position=null;
	this.m_aux_sat=null;
	this.m_tile_grid_position=[0,0];
	this.implments={c_iDrawable:1};
}
c_TileMapCollider.prototype=extend_class(c_CollisionEngine);
c_TileMapCollider.m_new=function(t_tile_layer){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<17>";
	c_CollisionEngine.m_new.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<18>";
	c_CollisionEngine.m_Instance2().p_RegisterDelegate(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<20>";
	dbg_object(this).m_tile_layer=t_tile_layer;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<21>";
	dbg_object(this).m_view_port=dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<24>";
	dbg_object(this).m_tile_position=c_Rectangle.m_new.call(new c_Rectangle);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<25>";
	dbg_object(this).m_aux_sat=c_Vec2.m_new2.call(new c_Vec2);
	pop_err();
	return this;
}
c_TileMapCollider.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<7>";
	c_CollisionEngine.m_new.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<7>";
	pop_err();
	return this;
}
c_TileMapCollider.prototype.p_GetTileGridPosition=function(t_cx,t_cy){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<43>";
	dbg_array(dbg_object(this).m_tile_grid_position,0)[dbg_index]=((Math.floor((t_cx)/dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth))|0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<44>";
	dbg_array(dbg_object(this).m_tile_grid_position,1)[dbg_index]=((Math.floor((t_cy)/dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight))|0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<46>";
	pop_err();
	return dbg_object(this).m_tile_grid_position;
}
c_TileMapCollider.prototype.p_GetTileID=function(t_cx,t_cy){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<50>";
	var t_tile_position=this.p_GetTileGridPosition(t_cx,t_cy);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<51>";
	var t_index=dbg_array(t_tile_position,0)[dbg_index]+dbg_object(dbg_object(this).m_tile_layer).m_width*dbg_array(t_tile_position,1)[dbg_index];
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<53>";
	if(t_index<dbg_object(dbg_object(this).m_tile_layer).m_data.length-1 && t_index>0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<54>";
		pop_err();
		return dbg_array(dbg_object(dbg_object(this).m_tile_layer).m_data,t_index)[dbg_index];
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<57>";
	pop_err();
	return 0;
}
c_TileMapCollider.prototype.p_GetTileDataPosition=function(t_cx,t_cy){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<33>";
	dbg_object(this).m_tile_position.p_Width2(dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<34>";
	dbg_object(this).m_tile_position.p_Height2(dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<36>";
	dbg_object(this).m_tile_position.p_X(Math.floor((t_cx)/dbg_object(this).m_tile_position.p_Width())*dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<37>";
	dbg_object(this).m_tile_position.p_Y(Math.floor((t_cy)/dbg_object(this).m_tile_position.p_Height())*dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<39>";
	pop_err();
	return dbg_object(this).m_tile_position;
}
c_TileMapCollider.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<61>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<61>";
	var t_=dbg_object(this).m_objects.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<61>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<61>";
		var t_o=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<63>";
		for(var t_x=Math.floor(t_o.p_GetBox().p_X2()/dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth);t_x<=Math.floor((t_o.p_GetBox().p_X2()+t_o.p_GetBox().p_Width())/dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth);t_x=t_x+1.0){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<64>";
			for(var t_y=Math.floor(t_o.p_GetBox().p_Y2()/dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight);t_y<=Math.floor((t_o.p_GetBox().p_Y2()+t_o.p_GetBox().p_Height())/dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight);t_y=t_y+1.0){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<67>";
				var t_tile=this.p_GetTileID(((dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth*t_x)|0),((dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight*t_y)|0));
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<68>";
				if(t_tile!=0){
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<69>";
					t_o.p_OnCollide("wall");
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<74>";
					var t_tile_position=this.p_GetTileDataPosition(((dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileWidth*t_x)|0),((dbg_object(dbg_object(dbg_object(this).m_tile_layer).m_parent).m_tileHeight*t_y)|0));
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<76>";
					c_SAT.m_Collide(t_o.p_GetBox(),t_tile_position,this.m_aux_sat);
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<78>";
					if((t_tile==4103 || t_tile==4102 || t_tile==4104 || t_tile==4108) && dbg_object(this.m_aux_sat).m_Y>0.0){
						err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<79>";
						var t_2=t_o.p_GetBox();
						t_o.p_GetBox().p_Y(t_2.p_Y2()-dbg_object(this.m_aux_sat).m_Y);
					}
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<82>";
					if((t_tile==4105 || t_tile==4106 || t_tile==4107 || t_tile==4108) && dbg_object(this.m_aux_sat).m_Y<0.0){
						err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<83>";
						var t_3=t_o.p_GetBox();
						t_o.p_GetBox().p_Y(t_3.p_Y2()-dbg_object(this.m_aux_sat).m_Y);
					}
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<86>";
					if((t_tile==4102 || t_tile==4105 || t_tile==4109 || t_tile==4108) && dbg_object(this.m_aux_sat).m_X>0.0){
						err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<87>";
						var t_4=t_o.p_GetBox();
						t_o.p_GetBox().p_X(t_4.p_X2()-dbg_object(this.m_aux_sat).m_X);
					}
					err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<90>";
					if((t_tile==4104 || t_tile==4110 || t_tile==4111 || t_tile==4108) && dbg_object(this.m_aux_sat).m_X<0.0){
						err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/tile_map_collider.monkey<91>";
						var t_5=t_o.p_GetBox();
						t_o.p_GetBox().p_X(t_5.p_X2()-dbg_object(this.m_aux_sat).m_X);
					}
				}
			}
		}
	}
	pop_err();
}
c_TileMapCollider.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function c_Enumerator6(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator6.m_new=function(t_stack){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator6.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator6.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Vec2(){
	Object.call(this);
	this.m_X=.0;
	this.m_Y=.0;
}
c_Vec2.m_new=function(t_x,t_y){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<13>";
	dbg_object(this).m_X=t_x;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<14>";
	dbg_object(this).m_Y=t_y;
	pop_err();
	return this;
}
c_Vec2.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<6>";
	pop_err();
	return this;
}
c_Vec2.m_Zero=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<209>";
	var t_=c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
	pop_err();
	return t_;
}
c_Vec2.prototype.p_Perp=function(t_rtn){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<163>";
	if(t_rtn==null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<164>";
		dbg_object(this).m_X=-dbg_object(this).m_Y;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<165>";
		dbg_object(this).m_Y=dbg_object(this).m_X;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<166>";
		pop_err();
		return this;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<169>";
	dbg_object(t_rtn).m_X=-dbg_object(this).m_Y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<170>";
	dbg_object(t_rtn).m_Y=dbg_object(this).m_X;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<171>";
	pop_err();
	return t_rtn;
}
c_Vec2.m_Dot=function(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<184>";
	var t_=t_x1*t_x2+t_y1*t_y2;
	pop_err();
	return t_;
}
c_Vec2.m_Dot2=function(t_v1,t_v2){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<179>";
	var t_=c_Vec2.m_Dot(dbg_object(t_v1).m_X,dbg_object(t_v1).m_Y,dbg_object(t_v2).m_X,dbg_object(t_v2).m_Y);
	pop_err();
	return t_;
}
c_Vec2.prototype.p_Dot=function(t_other){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<175>";
	var t_=c_Vec2.m_Dot(this.m_X,this.m_Y,dbg_object(t_other).m_X,dbg_object(t_other).m_Y);
	pop_err();
	return t_;
}
c_Vec2.m_DotSquared=function(t_x1,t_y1){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<189>";
	var t_=t_x1*t_x1+t_y1*t_y1;
	pop_err();
	return t_;
}
c_Vec2.prototype.p_Magnitude=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<105>";
	var t_=Math.sqrt(Math.pow(dbg_object(this).m_X,2.0)+Math.pow(dbg_object(this).m_Y,2.0));
	pop_err();
	return t_;
}
c_Vec2.prototype.p_UnitVector=function(t_rtn){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<110>";
	var t_magnitude=this.p_Magnitude();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<111>";
	if(t_rtn==null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<112>";
		dbg_object(this).m_X/=t_magnitude;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<113>";
		dbg_object(this).m_Y/=t_magnitude;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<115>";
		pop_err();
		return this;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<118>";
	dbg_object(t_rtn).m_X=dbg_object(this).m_X/t_magnitude;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<119>";
	dbg_object(t_rtn).m_Y=dbg_object(this).m_Y/t_magnitude;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/vec2.monkey<121>";
	pop_err();
	return t_rtn;
}
function c_BulletsEngine(){
	Object.call(this);
	this.m_bullets=null;
	this.m_discard_list=null;
	this.implments={c_iDrawable:1};
}
c_BulletsEngine.m_instance=null;
c_BulletsEngine.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<17>";
	dbg_object(this).m_bullets=c_List5.m_new.call(new c_List5);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<18>";
	dbg_object(this).m_discard_list=c_List5.m_new.call(new c_List5);
	pop_err();
}
c_BulletsEngine.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<11>";
	c_BulletsEngine.m_instance=this;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<12>";
	this.p_Create();
	pop_err();
	return this;
}
c_BulletsEngine.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<22>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<22>";
	var t_=dbg_object(this).m_bullets.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<22>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<22>";
		var t_b=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<23>";
		var t_2=dbg_object(t_b).m_Position;
		dbg_object(t_b).m_Position.p_X(t_2.p_X2()+(dbg_object(t_b).m_speed)*c_Time.m_DeltaSecs()*dbg_object(dbg_object(t_b).m_direction).m_X);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<24>";
		var t_3=dbg_object(t_b).m_Position;
		dbg_object(t_b).m_Position.p_Y(t_3.p_Y2()+(dbg_object(t_b).m_speed)*c_Time.m_DeltaSecs()*dbg_object(dbg_object(t_b).m_direction).m_Y);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<26>";
		dbg_object(t_b).m_current_live_time+=c_Time.m_DeltaSecs();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<28>";
		if(dbg_object(t_b).m_max_live_time<=dbg_object(t_b).m_current_live_time){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<29>";
			t_b.p_Destroy2();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<30>";
			dbg_object(this).m_discard_list.p_AddLast4(t_b);
		}
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<36>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<36>";
	var t_4=dbg_object(this).m_discard_list.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<36>";
	while(t_4.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<36>";
		var t_db=t_4.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<37>";
		dbg_object(this).m_bullets.p_RemoveEach2(t_db);
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<40>";
	dbg_object(this).m_discard_list.p_Clear();
	pop_err();
}
c_BulletsEngine.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<44>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<44>";
	var t_=dbg_object(this).m_bullets.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<44>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<44>";
		var t_b=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<45>";
		if(dbg_object(t_b).m_visible){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<46>";
			t_b.p_Render();
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<48>";
			t_b.p_Destroy2();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<49>";
			dbg_object(this).m_discard_list.p_AddLast4(t_b);
		}
	}
	pop_err();
}
c_BulletsEngine.m_Instance2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<60>";
	pop_err();
	return c_BulletsEngine.m_instance;
}
c_BulletsEngine.prototype.p_AddBullet=function(t_bullet){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/bullets_engine.monkey<56>";
	dbg_object(this).m_bullets.p_AddLast4(t_bullet);
	pop_err();
}
function c_lpImage(){
	Object.call(this);
	this.m__img=null;
	this.m_Position=null;
	this.m_DiscardThread=null;
	this.m__scaled=false;
	this.m__scalex=1.0;
	this.m__scaley=1.0;
	this.m__flipped=false;
	this.m__angle=.0;
	this.m__rotated=false;
	this.m__rotationPivot=c_Vec2.m_Zero();
	this.m_did=false;
	this.m_Debug=false;
	this.m_isDestroyed=false;
	this.m_correctPosition=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,0.0,0.0);
	this.implments={c_iDrawable:1};
}
c_lpImage.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_lpImage.prototype.p__init3=function(t_img,t_position,t_margin){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<25>";
	dbg_object(this).m__img=t_img;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<27>";
	if((dbg_object(this).m__img)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<32>";
		dbg_object(this).m_Position=c_Rectangle.m_new3.call(new c_Rectangle,dbg_object(t_position).m_X,dbg_object(t_position).m_Y,(this.m__img.p_Width())-t_margin,(this.m__img.p_Height())-t_margin);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<34>";
		this.m_DiscardThread=c_DiscardProcess.m_new.call(new c_DiscardProcess,dbg_object(this).m__img);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<36>";
		this.p_Create();
	}
	pop_err();
}
c_lpImage.m_new=function(t_image,t_position,t_l){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<62>";
	var t_img=bb_lpresources_lpLoadImage(t_image,1,c_Image.m_DefaultFlags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<63>";
	this.p__init3(t_img,t_position,0.0);
	pop_err();
	return this;
}
c_lpImage.m_new2=function(t_image,t_position){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<69>";
	this.p__init3(t_image,t_position,0.0);
	pop_err();
	return this;
}
c_lpImage.m_new3=function(t_image,t_position,t_margin){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<75>";
	var t_img=bb_lpresources_lpLoadImage(t_image,1,c_Image.m_DefaultFlags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<76>";
	this.p__init3(t_img,t_position,t_margin);
	pop_err();
	return this;
}
c_lpImage.m_new4=function(t_image,t_position,t_margin){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<82>";
	this.p__init3(t_image,t_position,t_margin);
	pop_err();
	return this;
}
c_lpImage.m_new5=function(t_other){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<91>";
	dbg_object(this).m__img=dbg_object(t_other).m__img;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<92>";
	dbg_object(this).m__scaled=dbg_object(t_other).m__scaled;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<93>";
	dbg_object(this).m__scalex=dbg_object(t_other).m__scalex;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<94>";
	dbg_object(this).m__scaley=dbg_object(t_other).m__scaley;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<95>";
	dbg_object(this).m__flipped=dbg_object(t_other).m__flipped;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<96>";
	dbg_object(this).m__angle=dbg_object(t_other).m__angle;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<97>";
	dbg_object(this).m__rotated=dbg_object(t_other).m__rotated;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<98>";
	dbg_object(dbg_object(this).m__rotationPivot).m_X=dbg_object(dbg_object(t_other).m__rotationPivot).m_X;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<99>";
	dbg_object(dbg_object(this).m__rotationPivot).m_Y=dbg_object(dbg_object(t_other).m__rotationPivot).m_Y;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<100>";
	dbg_object(this).m_did=dbg_object(t_other).m_did;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<101>";
	dbg_object(this).m_Debug=dbg_object(t_other).m_Debug;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<102>";
	dbg_object(this).m_isDestroyed=dbg_object(t_other).m_isDestroyed;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<104>";
	dbg_object(this).m_Position=c_Rectangle.m_new.call(new c_Rectangle);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<105>";
	dbg_object(this).m_Position.p_X(dbg_object(t_other).m_Position.p_X2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<106>";
	dbg_object(this).m_Position.p_Y(dbg_object(t_other).m_Position.p_Y2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<107>";
	dbg_object(this).m_Position.p_Width2(dbg_object(t_other).m_Position.p_Width());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<108>";
	dbg_object(this).m_Position.p_Height2(dbg_object(t_other).m_Position.p_Height());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<110>";
	dbg_object(this).m_correctPosition=c_Rectangle.m_new.call(new c_Rectangle);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<111>";
	dbg_object(this).m_correctPosition.p_X(dbg_object(t_other).m_correctPosition.p_X2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<112>";
	dbg_object(this).m_correctPosition.p_Y(dbg_object(t_other).m_correctPosition.p_Y2());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<113>";
	dbg_object(this).m_correctPosition.p_Width2(dbg_object(t_other).m_correctPosition.p_Width());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<114>";
	dbg_object(this).m_correctPosition.p_Height2(dbg_object(t_other).m_correctPosition.p_Height());
	pop_err();
	return this;
}
c_lpImage.m_new6=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<22>";
	pop_err();
	return this;
}
c_lpImage.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<129>";
	if(!dbg_object(this).m_isDestroyed){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<131>";
		var t_flipCorrection=0.0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<133>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<134>";
		t_flipCorrection=dbg_object(this).m_Position.p_Width();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<136>";
		if(this.m__rotated){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<137>";
			t_flipCorrection=0.0;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<138>";
			bb_graphics_Translate(this.m_correctPosition.p_X2()+dbg_object(this.m__rotationPivot).m_X,this.m_correctPosition.p_Y2()+dbg_object(this.m__rotationPivot).m_Y);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<139>";
			dbg_object(this).m__img.p_SetHandle(this.m_correctPosition.p_X2()+dbg_object(this.m__rotationPivot).m_X,this.m_correctPosition.p_Y2()+dbg_object(this.m__rotationPivot).m_Y);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<142>";
		if(this.m__flipped){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<143>";
			bb_graphics_DrawImage2(dbg_object(this).m__img,dbg_object(this).m_Position.p_X2()+t_flipCorrection,dbg_object(this).m_Position.p_Y2(),this.m__angle,-this.m__scalex,this.m__scaley,0);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<145>";
			bb_graphics_DrawImage2(dbg_object(this).m__img,dbg_object(this).m_Position.p_X2(),dbg_object(this).m_Position.p_Y2(),this.m__angle,this.m__scalex,this.m__scaley,0);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<148>";
		bb_graphics_PopMatrix();
	}
	pop_err();
}
c_lpImage.prototype.p_Update=function(){
	push_err();
	pop_err();
}
c_lpImage.prototype.p_SetRotation=function(t_angle){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<207>";
	this.m__angle=t_angle;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<208>";
	this.m__rotated=true;
	pop_err();
}
function c_EnemyBullet(){
	c_lpImage.call(this);
	this.m_speed=30;
	this.m_direction=null;
	this.m_current_live_time=0.0;
	this.m_max_live_time=5.0;
	this.m_visible=true;
	this.implments={c_iOnCollide:1,c_iDrawable:1};
}
c_EnemyBullet.prototype=extend_class(c_lpImage);
c_EnemyBullet.prototype.p_Destroy2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<35>";
	c_CollisionEngine.m_Instance2().p_Destroy(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<36>";
	dbg_object(this).m_visible=false;
	pop_err();
}
c_EnemyBullet.prototype.p_GetBox=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<23>";
	pop_err();
	return dbg_object(this).m_Position;
}
c_EnemyBullet.prototype.p_OnCollide=function(t_name){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<26>";
	if(t_name=="wall" || t_name=="player"){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<27>";
		this.p_Destroy2();
	}
	pop_err();
}
c_EnemyBullet.prototype.p_GetName=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<31>";
	pop_err();
	return "enemy_bullet";
}
c_EnemyBullet.m_new=function(t_position,t_direction){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<15>";
	c_lpImage.m_new.call(this,"bullet_enemy.png",t_position,0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<17>";
	dbg_object(this).m_direction=t_direction;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<18>";
	c_CollisionEngine.m_Instance2().p_AddBody(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<19>";
	c_BulletsEngine.m_Instance2().p_AddBullet(this);
	pop_err();
	return this;
}
c_EnemyBullet.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<5>";
	c_lpImage.m_new6.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<5>";
	pop_err();
	return this;
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List5.prototype.p_AddLast4=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<108>";
	var t_=c_Node13.m_new.call(new c_Node13,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List5.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<14>";
		this.p_AddLast4(t_t);
	}
	pop_err();
	return this;
}
c_List5.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator10.m_new.call(new c_Enumerator10,this);
	pop_err();
	return t_;
}
c_List5.prototype.p_Equals3=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_List5.prototype.p_RemoveEach2=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<151>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<152>";
	while(t_node!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<153>";
		var t_succ=dbg_object(t_node).m__succ;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<154>";
		if(this.p_Equals3(dbg_object(t_node).m__data,t_value)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<154>";
			t_node.p_Remove();
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<155>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
c_List5.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<36>";
	dbg_object(this.m__head).m__succ=this.m__head;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<37>";
	dbg_object(this.m__head).m__pred=this.m__head;
	pop_err();
	return 0;
}
function c_Node13(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node13.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node13.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
c_Node13.prototype.p_Remove=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<274>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<274>";
		error("Illegal operation on removed node");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<276>";
	dbg_object(this.m__succ).m__pred=this.m__pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<277>";
	dbg_object(this.m__pred).m__succ=this.m__succ;
	pop_err();
	return 0;
}
function c_HeadNode5(){
	c_Node13.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node13);
c_HeadNode5.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node13.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_Player(){
	Object.call(this);
	this.m_position=null;
	this.m_box=null;
	this.m_sprite=null;
	this.m_control=null;
	this.m_cannon=null;
	this.m_particles_emitter=null;
	this.m_explosion=null;
	this.m_explosion_sound=null;
	this.m_state=0;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_Player.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<33>";
	dbg_object(this).m_position=c_Rectangle.m_new3.call(new c_Rectangle,30.0,60.0,23.0,8.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<34>";
	dbg_object(this).m_box=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,10.0,4.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<37>";
	dbg_object(this).m_sprite=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"ship.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),23.0,8.0,1,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<38>";
	dbg_object(this).m_sprite.p_AddSequence("fly",[0]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<39>";
	dbg_object(this).m_sprite.p_PlaySequence("fly",83,true);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<42>";
	dbg_object(this).m_control=c_SpaceShooterControl.m_new.call(new c_SpaceShooterControl,(dbg_object(this).m_position));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<45>";
	dbg_object(this).m_cannon=c_SpaceShooterCannon.m_new.call(new c_SpaceShooterCannon,(dbg_object(this).m_position));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<47>";
	dbg_object(this).m_cannon.p_Offset().p_X(25.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<48>";
	dbg_object(this).m_cannon.p_Offset().p_Y(4.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<50>";
	dbg_object(this).m_cannon.p_AddSprite("bullet_level_0.png");
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<51>";
	dbg_object(this).m_cannon.p_AddSprite("bullet_level_1.png");
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<52>";
	dbg_object(this).m_cannon.p_AddSprite("bullet_level_2.png");
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<53>";
	dbg_object(this).m_cannon.p_AddSprite("bullet_level_3.png");
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<55>";
	dbg_object(this).m_particles_emitter=c_ParticleEmitter.m_new.call(new c_ParticleEmitter,null,0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<56>";
	dbg_object(this).m_particles_emitter.p_LoadFromJson(bb_app_LoadString("ship_booster.json"));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<57>";
	dbg_object(dbg_object(this).m_particles_emitter).m_Position.p_X(0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<58>";
	dbg_object(dbg_object(this).m_particles_emitter).m_Position.p_Y(0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<60>";
	c_CollisionEngine.m_Instance2().p_AddBody(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<63>";
	dbg_object(this).m_explosion=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"explosion.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),9.0,9.0,14,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<64>";
	dbg_object(this).m_explosion.p_AddSequence("explode",[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<66>";
	dbg_object(this).m_explosion_sound=bb_audio_LoadSound("sounds/long_explosion.mp3");
	pop_err();
}
c_Player.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<28>";
	this.p_Create();
	pop_err();
	return this;
}
c_Player.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<71>";
	if(dbg_object(this).m_state==0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<72>";
		dbg_object(this).m_sprite.p_Update();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<73>";
		dbg_object(this).m_control.p_Update();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<74>";
		dbg_object(this).m_cannon.p_Update();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<75>";
		dbg_object(this).m_particles_emitter.p_Update();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<77>";
		if(dbg_object(this).m_control.p_Shot()){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<78>";
			dbg_object(this).m_cannon.p_Shot();
		}
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<81>";
		dbg_object(this).m_box.p_X(dbg_object(this).m_position.p_X2()+10.0);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<82>";
		dbg_object(this).m_box.p_Y(dbg_object(this).m_position.p_Y2()+2.0);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<84>";
		dbg_object(dbg_object(this).m_particles_emitter).m_Position.p_X(dbg_object(this).m_position.p_X2()+7.0);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<85>";
		dbg_object(dbg_object(this).m_particles_emitter).m_Position.p_Y(dbg_object(this).m_position.p_Y2()+dbg_object(this).m_position.p_Height()/2.0);
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<86>";
		if(dbg_object(this).m_state==1){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<87>";
			dbg_object(this).m_explosion.p_Update();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<89>";
			if(dbg_object(this).m_explosion.p_IsLastFrame()){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<90>";
				c_Game.m_Instance().p_SetScene(0,null);
			}
		}
	}
	pop_err();
}
c_Player.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<98>";
	if(dbg_object(this).m_state==0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<99>";
		dbg_object(this).m_particles_emitter.p_Render();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<101>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<102>";
		bb_graphics_Translate(dbg_object(this).m_position.p_X2(),dbg_object(this).m_position.p_Y2());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<103>";
		dbg_object(this).m_sprite.p_Render();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<104>";
		bb_graphics_PopMatrix();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<106>";
		dbg_object(this).m_cannon.p_Render();
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<107>";
		if(dbg_object(this).m_state==1){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<108>";
			dbg_object(this).m_explosion.p_Render();
		}
	}
	pop_err();
}
c_Player.prototype.p_GetBox=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<115>";
	pop_err();
	return dbg_object(this).m_box;
}
c_Player.prototype.p_Die=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<136>";
	c_CollisionEngine.m_Instance2().p_Destroy(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<137>";
	c_CollisionEngine.m_Instance2().p_DestroyAll();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<139>";
	dbg_object(this).m_state=1;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<140>";
	bb_audio_SetChannelVolume(0,1.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<141>";
	bb_audio_PlaySound(dbg_object(this).m_explosion_sound,0,0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<143>";
	dbg_object(dbg_object(this).m_explosion).m_Position.p_X(dbg_object(this).m_position.p_X2()+10.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<144>";
	dbg_object(dbg_object(this).m_explosion).m_Position.p_Y(dbg_object(this).m_position.p_Y2());
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<145>";
	dbg_object(this).m_explosion.p_PlaySequence("explode",100,true);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<147>";
	c_Time.m_SlowDown(0.5,1000);
	pop_err();
}
c_Player.prototype.p_OnCollide=function(t_name){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<119>";
	if(t_name=="powerup"){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<120>";
		dbg_object(this).m_cannon.p_LevelUp();
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<121>";
		if(t_name=="enemy" || t_name=="enemy_bullet"){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<123>";
			if(dbg_object(dbg_object(this).m_cannon).m_level==0){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<124>";
				this.p_Die();
			}else{
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<126>";
				dbg_object(this).m_cannon.p_LevelDown();
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<127>";
				c_Time.m_Freeze(200);
			}
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<129>";
			if(t_name=="wall"){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<130>";
				this.p_Die();
			}
		}
	}
	pop_err();
}
c_Player.prototype.p_GetName=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/player.monkey<152>";
	pop_err();
	return "player";
}
function c_AnimatedSprite(){
	c_lpImage.call(this);
	this.m__margin=.0;
	this.m__maxIndex=0;
	this.m__currentIndex=0;
	this.m_Pause=false;
	this.m__sequences=null;
	this.m__currentSequenceName="";
	this.m__currentSequence=null;
	this.m__frameTime=0;
	this.m__lastSequenceName="";
	this.m__looped=false;
	this.m__elapsedTime=0;
	this.implments={c_ilpAnimation:1,c_iDrawable:1};
}
c_AnimatedSprite.prototype=extend_class(c_lpImage);
c_AnimatedSprite.prototype.p__initialize=function(t_img,t_position,t_frames,t_margin){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<28>";
	this.p__init3(t_img,t_position,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<32>";
	dbg_object(this).m__margin=t_margin;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<34>";
	dbg_object(this).m__maxIndex=t_frames;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<36>";
	dbg_object(this).m__currentIndex=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<37>";
	dbg_object(this).m_Pause=true;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<38>";
	dbg_object(this).m__sequences=c_StringMap6.m_new.call(new c_StringMap6);
	pop_err();
}
c_AnimatedSprite.m_new=function(t_image,t_position,t_tileW,t_tileH,t_frames,t_margin){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<45>";
	c_lpImage.m_new6.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<47>";
	var t_img=bb_lpresources_lpLoadImage2(t_image,((t_tileW)|0),((t_tileH)|0),t_frames,c_Image.m_DefaultFlags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<49>";
	this.p__initialize(t_img,t_position,((t_margin)|0),(t_frames));
	pop_err();
	return this;
}
c_AnimatedSprite.m_new2=function(t_img,t_position,t_frames,t_margin){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<52>";
	c_lpImage.m_new6.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<53>";
	this.p__initialize(t_img,t_position,((t_margin)|0),(t_frames));
	pop_err();
	return this;
}
c_AnimatedSprite.m_new3=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<12>";
	c_lpImage.m_new6.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<12>";
	pop_err();
	return this;
}
c_AnimatedSprite.prototype.p_AddSequence=function(t_name,t_seq){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<60>";
	if(t_name!=this.m__currentSequenceName){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<63>";
		var t_stack=c_IntStack.m_new2.call(new c_IntStack);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<65>";
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<65>";
		var t_=t_seq;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<65>";
		var t_2=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<65>";
		while(t_2<t_.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<65>";
			var t_i=dbg_array(t_,t_2)[dbg_index];
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<65>";
			t_2=t_2+1;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<66>";
			t_stack.p_Push31(t_i);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<69>";
		dbg_object(this).m__sequences.p_Set6(t_name,t_stack);
	}
	pop_err();
}
c_AnimatedSprite.prototype.p_PlaySequence=function(t_name,t_frameTime,t_looped){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<87>";
	if(this.m__currentSequenceName!=t_name){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<89>";
		dbg_object(this).m__currentSequence=dbg_object(this).m__sequences.p_Get2(t_name);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<90>";
		dbg_object(this).m__maxIndex=dbg_object(this).m__currentSequence.p_Length2();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<91>";
		dbg_object(this).m_Pause=false;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<92>";
		dbg_object(this).m__frameTime=t_frameTime;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<94>";
		dbg_object(this).m__currentSequenceName=t_name;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<95>";
		dbg_object(this).m__lastSequenceName=t_name;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<97>";
		dbg_object(this).m__currentIndex=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<99>";
		dbg_object(this).m__looped=t_looped;
	}
	pop_err();
}
c_AnimatedSprite.prototype.p_IsLastFrame=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<173>";
	if(this.m__maxIndex-1==this.m__currentIndex){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<174>";
		pop_err();
		return true;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<177>";
	pop_err();
	return false;
}
c_AnimatedSprite.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<119>";
	if(!this.m_Pause){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<120>";
		this.m__elapsedTime=c_Time.m_Delta()+this.m__elapsedTime;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<122>";
		if(this.m__elapsedTime>dbg_object(this).m__frameTime){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<124>";
			if(!this.m_Pause){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<125>";
				if(this.p_IsLastFrame()){
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<126>";
					dbg_object(this).m__currentIndex=0;
				}else{
					err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<128>";
					dbg_object(this).m__currentIndex=dbg_object(this).m__currentIndex+1;
				}
			}
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<132>";
			this.m__elapsedTime=0;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<137>";
	if(!dbg_object(this).m__looped){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<138>";
		if(this.p_IsLastFrame()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<139>";
			dbg_object(this).m_Pause=true;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<140>";
			dbg_object(this).m__currentIndex=this.m__maxIndex;
		}
	}
	pop_err();
}
c_AnimatedSprite.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<148>";
	if(!dbg_object(this).m_isDestroyed && dbg_object(this).m__currentSequenceName!=""){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<150>";
		var t_flipCorrection=0.0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<152>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<154>";
		t_flipCorrection=dbg_object(this).m_Position.p_Width();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<156>";
		if(this.m__rotated){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<157>";
			t_flipCorrection=0.0;
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<158>";
			bb_graphics_Translate(this.m_correctPosition.p_X2()+dbg_object(this.m__rotationPivot).m_X,this.m_correctPosition.p_Y2()+dbg_object(this.m__rotationPivot).m_Y);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<159>";
			dbg_object(this).m__img.p_SetHandle(this.m_correctPosition.p_X2()+dbg_object(this.m__rotationPivot).m_X,this.m_correctPosition.p_Y2()+dbg_object(this.m__rotationPivot).m_Y);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<162>";
		if(this.m__flipped){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<163>";
			bb_graphics_DrawImage2(dbg_object(this).m__img,dbg_object(this).m_Position.p_X2()+t_flipCorrection,dbg_object(this).m_Position.p_Y2(),this.m__angle,-this.m__scalex,this.m__scaley,this.m__currentSequence.p_Get(this.m__currentIndex));
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<165>";
			bb_graphics_DrawImage2(dbg_object(this).m__img,dbg_object(this).m_Position.p_X2(),dbg_object(this).m_Position.p_Y2(),this.m__angle,this.m__scalex,this.m__scaley,this.m__currentSequence.p_Get(this.m__currentIndex));
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/animatedsprite.monkey<168>";
		bb_graphics_PopMatrix();
	}
	pop_err();
}
function bb_lpresources_lpLoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<91>";
	var t_lkey=""+t_path+String(t_frameCount)+String(t_flags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<92>";
	var t_r=c_lpResources.m_GetInstance();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<94>";
	if(!dbg_object(t_r).m_images.p_Contains2(t_lkey)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<95>";
		dbg_object(t_r).m_images.p_Set2(t_lkey,bb_graphics_LoadImage(t_path,t_frameCount,t_flags));
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<98>";
	var t_=dbg_object(t_r).m_images.p_Get2(t_lkey);
	pop_err();
	return t_;
}
function bb_lpresources_lpLoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<103>";
	var t_lkey=""+t_path+String(t_frameCount)+String(t_frameWidth)+String(t_frameHeight)+String(t_frameCount)+String(t_flags);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<104>";
	var t_r=c_lpResources.m_GetInstance();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<106>";
	if(!dbg_object(t_r).m_images.p_Contains2(t_lkey)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<107>";
		dbg_object(t_r).m_images.p_Set2(t_lkey,bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags));
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpresources.monkey<110>";
	var t_=dbg_object(t_r).m_images.p_Get2(t_lkey);
	pop_err();
	return t_;
}
function c_DiscardProcess(){
	Object.call(this);
	this.m_img=null;
}
c_DiscardProcess.m_new=function(t_i){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<11>";
	this.m_img=t_i;
	pop_err();
	return this;
}
c_DiscardProcess.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/lpimage.monkey<8>";
	pop_err();
	return this;
}
function c_Stack12(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack12.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack12.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack12.prototype.p_Push31=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack12.prototype.p_Push32=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push31(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack12.prototype.p_Push33=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push32(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack12.m_NIL=0;
c_Stack12.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack12.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_number_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack12.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack12.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
function c_IntStack(){
	c_Stack12.call(this);
}
c_IntStack.prototype=extend_class(c_Stack12);
c_IntStack.m_new=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<318>";
	c_Stack12.m_new2.call(this,t_data);
	pop_err();
	return this;
}
c_IntStack.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<315>";
	c_Stack12.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<315>";
	pop_err();
	return this;
}
function c_Map9(){
	Object.call(this);
	this.m_root=null;
}
c_Map9.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map9.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map9.prototype.p_RotateLeft6=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map9.prototype.p_RotateRight6=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map9.prototype.p_InsertFixup6=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft6(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<227>";
				this.p_RotateRight6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<239>";
					this.p_RotateRight6(t_node);
				}
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map9.prototype.p_Set6=function(t_key,t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<45>";
	t_node=c_Node14.m_new.call(new c_Node14,t_key,t_value,-1,t_parent);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup6(t_node);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map9.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map9.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_StringMap6(){
	c_Map9.call(this);
}
c_StringMap6.prototype=extend_class(c_Map9);
c_StringMap6.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	c_Map9.m_new.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap6.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node14(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node14.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node14.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function c_SpaceShooterControl(){
	Object.call(this);
	this.m_target=null;
	this.m_shot=false;
	this.m_speed=50;
}
c_SpaceShooterControl.m_new=function(t_target){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<10>";
	dbg_object(this).m_target=t_target;
	pop_err();
	return this;
}
c_SpaceShooterControl.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<3>";
	pop_err();
	return this;
}
c_SpaceShooterControl.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<14>";
	dbg_object(this).m_shot=false;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<16>";
	if(((bb_input_KeyDown(38))!=0) || ((bb_input_KeyDown(87))!=0)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<17>";
		var t_=dbg_object(this).m_target;
		dbg_object(this).m_target.p_Y(t_.p_Y2()-(dbg_object(this).m_speed)*c_Time.m_DeltaSecs());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<20>";
	if(((bb_input_KeyDown(40))!=0) || ((bb_input_KeyDown(83))!=0)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<21>";
		var t_2=dbg_object(this).m_target;
		dbg_object(this).m_target.p_Y(t_2.p_Y2()+(dbg_object(this).m_speed)*c_Time.m_DeltaSecs());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<24>";
	if(((bb_input_KeyDown(37))!=0) || ((bb_input_KeyDown(65))!=0)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<25>";
		var t_3=dbg_object(this).m_target;
		dbg_object(this).m_target.p_X(t_3.p_X2()-(dbg_object(this).m_speed)*c_Time.m_DeltaSecs());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<28>";
	if(((bb_input_KeyDown(39))!=0) || ((bb_input_KeyDown(68))!=0)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<29>";
		var t_4=dbg_object(this).m_target;
		dbg_object(this).m_target.p_X(t_4.p_X2()+(dbg_object(this).m_speed)*c_Time.m_DeltaSecs());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<32>";
	if(((bb_input_KeyHit(32))!=0) || ((bb_input_KeyHit(88))!=0)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<33>";
		dbg_object(this).m_shot=true;
	}
	pop_err();
}
c_SpaceShooterControl.prototype.p_Shot=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_control.monkey<39>";
	pop_err();
	return dbg_object(this).m_shot;
}
function c_SpaceShooterCannon(){
	Object.call(this);
	this.m_target=null;
	this.m_offset=null;
	this.m_bullets=null;
	this.m_discard_list=null;
	this.m_camera_fx=null;
	this.m_sound=null;
	this.m_sprites=[];
	this.m_level=0;
	this.implments={c_iDrawable:1,c_iOnDestroy:1};
}
c_SpaceShooterCannon.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<121>";
	dbg_object(this).m_offset=c_Point.m_new2.call(new c_Point,0.0,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<122>";
	dbg_object(this).m_bullets=c_List6.m_new.call(new c_List6);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<123>";
	dbg_object(this).m_discard_list=c_List6.m_new.call(new c_List6);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<124>";
	dbg_object(this).m_camera_fx=c_CameraFX.m_new.call(new c_CameraFX,dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<125>";
	dbg_object(this).m_sound=bb_audio_LoadSound("sounds/shot.mp3");
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<126>";
	bb_audio_SetChannelVolume(0,0.2);
	pop_err();
}
c_SpaceShooterCannon.m_new=function(t_target){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<115>";
	dbg_object(this).m_target=t_target;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<116>";
	this.p_Create();
	pop_err();
	return this;
}
c_SpaceShooterCannon.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<99>";
	pop_err();
	return this;
}
c_SpaceShooterCannon.prototype.p_Offset=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<165>";
	pop_err();
	return dbg_object(this).m_offset;
}
c_SpaceShooterCannon.prototype.p_AddSprite=function(t_sprite_name){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<198>";
	var t_imgs=c_List7.m_new2.call(new c_List7,this.m_sprites);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<200>";
	t_imgs.p_AddLast6(bb_lpresources_lpLoadImage(t_sprite_name,1,c_Image.m_DefaultFlags));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<202>";
	this.m_sprites=t_imgs.p_ToArray();
	pop_err();
}
c_SpaceShooterCannon.prototype.p_LevelUp=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<183>";
	dbg_object(this).m_level+=1;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<184>";
	if(dbg_object(this).m_sprites.length<=dbg_object(this).m_level){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<185>";
		dbg_object(this).m_level=dbg_object(this).m_sprites.length-1;
	}
	pop_err();
}
c_SpaceShooterCannon.prototype.p_LevelDown=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<190>";
	dbg_object(this).m_level-=1;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<191>";
	if(dbg_object(this).m_level<0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<192>";
		dbg_object(this).m_level=0;
	}
	pop_err();
}
c_SpaceShooterCannon.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<130>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<130>";
	var t_=dbg_object(this).m_bullets.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<130>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<130>";
		var t_b=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<131>";
		t_b.p_Update();
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<135>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<135>";
	var t_2=dbg_object(this).m_discard_list.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<135>";
	while(t_2.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<135>";
		var t_db=t_2.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<136>";
		dbg_object(this).m_bullets.p_RemoveEach3(t_db);
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<139>";
	dbg_object(this).m_discard_list.p_Clear();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<142>";
	if((bb_input_KeyHit(81))!=0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<143>";
		this.p_LevelUp();
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<146>";
	if((bb_input_KeyHit(69))!=0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<147>";
		this.p_LevelDown();
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<150>";
	dbg_object(this).m_camera_fx.p_Update();
	pop_err();
}
c_SpaceShooterCannon.prototype.p_Shot=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<173>";
	var t_img=c_Bullet.m_new.call(new c_Bullet,dbg_array(this.m_sprites,dbg_object(this).m_level)[dbg_index],c_Vec2.m_new.call(new c_Vec2,dbg_object(this).m_target.p_X2()+dbg_object(this).m_offset.p_X2(),dbg_object(this).m_target.p_Y2()+dbg_object(this).m_offset.p_Y2()));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<174>";
	t_img.p_OnDestroyListener(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<176>";
	dbg_object(this).m_bullets.p_AddLast5(t_img);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<177>";
	dbg_object(this).m_camera_fx.p_Recoil();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<179>";
	bb_audio_PlaySound(dbg_object(this).m_sound,0,0);
	pop_err();
}
c_SpaceShooterCannon.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<155>";
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<155>";
	var t_=dbg_object(this).m_bullets.p_ObjectEnumerator();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<155>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<155>";
		var t_b=t_.p_NextObject();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<156>";
		if(dbg_object(t_b).m_visible){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<157>";
			t_b.p_Render();
		}
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<161>";
	dbg_object(this).m_camera_fx.p_Render();
	pop_err();
}
c_SpaceShooterCannon.prototype.p_OnDestroy=function(t_e){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<206>";
	dbg_object(this).m_discard_list.p_AddLast5(object_downcast((t_e),c_Bullet));
	pop_err();
	return 0;
}
function c_Bullet(){
	c_AnimatedSprite.call(this);
	this.m_state=0;
	this.m_speed=150;
	this.m_max_live_time=0.3;
	this.m_level=0;
	this.m_current_live_time=0.0;
	this.m_destroy_listener=null;
	this.m_visible=true;
	this.implments={c_iOnCollide:1,c_ilpAnimation:1,c_iDrawable:1};
}
c_Bullet.prototype=extend_class(c_AnimatedSprite);
c_Bullet.prototype.p_Destroy2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<91>";
	dbg_object(this).m_destroy_listener.p_OnDestroy(this);
	pop_err();
}
c_Bullet.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<46>";
	c_AnimatedSprite.prototype.p_Update.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<48>";
	if(dbg_object(this).m_state==0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<50>";
		var t_=dbg_object(this).m_Position;
		dbg_object(this).m_Position.p_X(t_.p_X2()+(dbg_object(this).m_speed)*c_Time.m_DeltaSecs());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<51>";
		if(dbg_object(this).m_max_live_time*(1+dbg_object(this).m_level)<=dbg_object(this).m_current_live_time){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<52>";
			c_CollisionEngine.m_Instance2().p_Destroy(this);
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<53>";
			this.p_Destroy2();
		}
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<56>";
		if(dbg_object(this).m_state==1){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<58>";
			if(dbg_object(this).m_max_live_time<=dbg_object(this).m_current_live_time){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<59>";
				dbg_object(this).m_visible=false;
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<60>";
				this.p_Destroy2();
			}
		}
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<65>";
	dbg_object(this).m_current_live_time+=c_Time.m_DeltaSecs();
	pop_err();
}
c_Bullet.m_sound=null;
c_Bullet.m_new=function(t_img,t_position){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<31>";
	c_AnimatedSprite.m_new.call(this,"bullet_level_0.png",t_position,8.0,4.0,2,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<33>";
	this.p_AddSequence("shot",[0]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<34>";
	this.p_AddSequence("explode",[1]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<36>";
	this.p_PlaySequence("shot",100,true);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<38>";
	c_CollisionEngine.m_Instance2().p_AddBody(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<40>";
	if(c_Bullet.m_sound==null){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<41>";
		c_Bullet.m_sound=bb_audio_LoadSound("sounds/hit.mp3");
	}
	pop_err();
	return this;
}
c_Bullet.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<10>";
	c_AnimatedSprite.m_new3.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<10>";
	pop_err();
	return this;
}
c_Bullet.prototype.p_OnDestroyListener=function(t_l){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<95>";
	dbg_object(this).m_destroy_listener=t_l;
	pop_err();
}
c_Bullet.prototype.p_GetBox=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<70>";
	pop_err();
	return dbg_object(this).m_Position;
}
c_Bullet.prototype.p_OnCollide=function(t_name){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<74>";
	if(t_name=="wall" || t_name=="enemy"){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<75>";
		dbg_object(this).m_state=1;
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<77>";
		c_CollisionEngine.m_Instance2().p_Destroy(this);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<78>";
		this.p_PlaySequence("explode",100,true);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<80>";
		dbg_object(this).m_current_live_time=0.0;
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<81>";
		dbg_object(this).m_max_live_time=0.1;
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<83>";
		bb_audio_PlaySound(c_Bullet.m_sound,2,0);
	}
	pop_err();
}
c_Bullet.prototype.p_GetName=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/space_shooter_cannon.monkey<87>";
	pop_err();
	return "player_bullet";
}
function c_List6(){
	Object.call(this);
	this.m__head=(c_HeadNode6.m_new.call(new c_HeadNode6));
}
c_List6.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List6.prototype.p_AddLast5=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<108>";
	var t_=c_Node15.m_new.call(new c_Node15,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List6.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<14>";
		this.p_AddLast5(t_t);
	}
	pop_err();
	return this;
}
c_List6.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator11.m_new.call(new c_Enumerator11,this);
	pop_err();
	return t_;
}
c_List6.prototype.p_Equals4=function(t_lhs,t_rhs){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_List6.prototype.p_RemoveEach3=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<151>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<152>";
	while(t_node!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<153>";
		var t_succ=dbg_object(t_node).m__succ;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<154>";
		if(this.p_Equals4(dbg_object(t_node).m__data,t_value)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<154>";
			t_node.p_Remove();
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<155>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
c_List6.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<36>";
	dbg_object(this.m__head).m__succ=this.m__head;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<37>";
	dbg_object(this.m__head).m__pred=this.m__head;
	pop_err();
	return 0;
}
function c_Node15(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node15.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node15.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
c_Node15.prototype.p_Remove=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<274>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<274>";
		error("Illegal operation on removed node");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<276>";
	dbg_object(this.m__succ).m__pred=this.m__pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<277>";
	dbg_object(this.m__pred).m__succ=this.m__succ;
	pop_err();
	return 0;
}
function c_HeadNode6(){
	c_Node15.call(this);
}
c_HeadNode6.prototype=extend_class(c_Node15);
c_HeadNode6.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node15.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_CameraFX(){
	Object.call(this);
	this.m_camera_view=null;
	this.m_state=0;
	this.m_timer=0;
	this.m_time=100;
	this.m_force_x=100.0;
	this.m_force_y=100.0;
	this.m_correction_x=0.0;
	this.m_correction_y=0.0;
	this.m_recoil_fx=0.0;
}
c_CameraFX.prototype.p_CameraView=function(t_value){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<39>";
	dbg_object(this).m_camera_view=t_value;
	pop_err();
}
c_CameraFX.prototype.p_CameraView2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<43>";
	pop_err();
	return dbg_object(this).m_camera_view;
}
c_CameraFX.m_new=function(t_camera_view){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<32>";
	if(t_camera_view!=null){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<33>";
		this.p_CameraView(t_camera_view);
	}
	pop_err();
	return this;
}
c_CameraFX.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<47>";
	if(dbg_object(this).m_state==1){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<48>";
		if(dbg_object(this).m_timer<dbg_object(this).m_time){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<49>";
			dbg_object(this).m_timer+=c_Time.m_Delta();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<51>";
			var t_v_x=c_Math.m_Round(bb_random_Rnd2(-dbg_object(this).m_force_x,dbg_object(this).m_force_x));
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<52>";
			var t_v_y=c_Math.m_Round(bb_random_Rnd2(-dbg_object(this).m_force_y,dbg_object(this).m_force_y));
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<53>";
			this.m_correction_x+=t_v_x;
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<54>";
			this.m_correction_y+=t_v_y;
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<55>";
			var t_=dbg_object(this).m_camera_view;
			dbg_object(this).m_camera_view.p_X(t_.p_X2()+t_v_x);
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<56>";
			var t_2=dbg_object(this).m_camera_view;
			dbg_object(this).m_camera_view.p_Y(t_2.p_Y2()+t_v_y);
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<59>";
			var t_3=dbg_object(this).m_camera_view;
			dbg_object(this).m_camera_view.p_X(t_3.p_X2()-this.m_correction_x);
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<60>";
			var t_4=dbg_object(this).m_camera_view;
			dbg_object(this).m_camera_view.p_Y(t_4.p_Y2()-this.m_correction_y);
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<62>";
			this.m_correction_x=0.0;
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<63>";
			this.m_correction_y=0.0;
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<64>";
			dbg_object(this).m_state=0;
		}
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<68>";
	if(dbg_object(this).m_recoil_fx>0.0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<69>";
		var t_5=dbg_object(this).m_camera_view;
		dbg_object(this).m_camera_view.p_X(t_5.p_X2()-dbg_object(this).m_recoil_fx);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<70>";
		dbg_object(this).m_recoil_fx-=0.5;
	}
	pop_err();
}
c_CameraFX.prototype.p_Recoil=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<95>";
	dbg_object(this).m_recoil_fx=0.5;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camerafx.monkey<96>";
	var t_=dbg_object(this).m_camera_view;
	dbg_object(this).m_camera_view.p_X(t_.p_X2()+0.5);
	pop_err();
	return 0;
}
c_CameraFX.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function bb_audio_LoadSound(t_path){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<47>";
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<48>";
	if((t_sample)!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<48>";
		var t_=c_Sound.m_new.call(new c_Sound,t_sample);
		pop_err();
		return t_;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<49>";
	pop_err();
	return null;
}
function bb_audio_SetChannelVolume(t_channel,t_volume){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<73>";
	bb_audio_device.SetVolume(t_channel,t_volume);
	pop_err();
	return 0;
}
function c_List7(){
	Object.call(this);
	this.m__head=(c_HeadNode7.m_new.call(new c_HeadNode7));
}
c_List7.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List7.prototype.p_AddLast6=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<108>";
	var t_=c_Node16.m_new.call(new c_Node16,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List7.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<14>";
		this.p_AddLast6(t_t);
	}
	pop_err();
	return this;
}
c_List7.prototype.p_Count=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<42>";
	while(t_node!=this.m__head){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).m__succ;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
c_List7.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator7.m_new.call(new c_Enumerator7,this);
	pop_err();
	return t_;
}
c_List7.prototype.p_ToArray=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<19>";
	var t_arr=new_object_array(this.p_Count());
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<19>";
	var t_i=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
	var t_=this.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<20>";
		var t_t=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<21>";
		dbg_array(t_arr,t_i)[dbg_index]=t_t;
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<22>";
		t_i+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<24>";
	pop_err();
	return t_arr;
}
function c_Node16(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node16.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node16.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
function c_HeadNode7(){
	c_Node16.call(this);
}
c_HeadNode7.prototype=extend_class(c_Node16);
c_HeadNode7.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<310>";
	c_Node16.m_new2.call(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_Enumerator7(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator7.m_new=function(t_list){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator7.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator7.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function c_ParticleEmitter(){
	Object.call(this);
	this.m_DrawableImage=null;
	this.m__maxAllocations=0;
	this.m__unused=null;
	this.m__tail=null;
	this.m_ColorStack=null;
	this.m_BaseColor=null;
	this.m_EmitterType=c_ParticleEmitter.m_TYPE_CIRCLE;
	this.m_Position=null;
	this.m_Radius=25.0;
	this.m_minParticleRadius=5.0;
	this.m_maxParticleRadius=15.0;
	this.m_LifeTime=500.0;
	this.m_Force=null;
	this.m_AlphaChannel=1.0;
	this.m_xminVelocity=0.0;
	this.m_xmaxVelocity=0.0;
	this.m_yminVelocity=0.0;
	this.m_ymaxVelocity=0.0;
	this.m_ColorType=c_ParticleEmitter.m_COLOR_RANDOM;
	this.m_ParticleType=0;
	this.m_autoEmit=false;
	this.m_FadeInOut=false;
	this.m_SpanTime=100;
	this.m_SpanAmount=10.0;
	this.m_blend=1;
	this.m__counter=0.0;
	this.m_RotationSpeedMin=0.0;
	this.m_RotationSpeedMax=0.0;
	this.m__updaterEnabled=false;
	this.m__updater=null;
	this.implments={c_iDrawable:1};
}
c_ParticleEmitter.m_TYPE_CIRCLE=0;
c_ParticleEmitter.m_COLOR_RANDOM=0;
c_ParticleEmitter.prototype.p__addParticle=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<30>";
	var t_c=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<32>";
	if(this.m_ColorStack.p_Length2()>0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<33>";
		t_c=this.m_ColorStack.p_Get((bb_random_Rnd2(0.0,(this.m_ColorStack.p_Length2())))|0);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<35>";
		t_c=dbg_object(this).m_BaseColor;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<38>";
	var t_positionX=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<39>";
	var t_positionY=0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<41>";
	if(dbg_object(this).m_EmitterType==c_ParticleEmitter.m_TYPE_CIRCLE){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<42>";
		t_positionX=((bb_random_Rnd2(this.m_Position.p_X2()-this.m_Radius/2.0,this.m_Position.p_X2()+this.m_Radius/2.0))|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<43>";
		t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2()-this.m_Radius/2.0,this.m_Position.p_Y2()+this.m_Radius/2.0))|0);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<45>";
		t_positionX=((bb_random_Rnd2(this.m_Position.p_X2(),this.m_Position.p_X2()+this.m_Position.p_Width()))|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<46>";
		t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2(),this.m_Position.p_Y2()+this.m_Position.p_Height()))|0);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<63>";
	this.m__unused.p_Push34(c_Particle.m_new.call(new c_Particle,(t_positionX),(t_positionY),bb_random_Rnd2(this.m_minParticleRadius,this.m_maxParticleRadius),t_c,this.m_LifeTime,dbg_object(this.m_Force).m_X,dbg_object(this.m_Force).m_Y,this.m_AlphaChannel,this,c_Vec2.m_new.call(new c_Vec2,bb_random_Rnd2(this.m_xminVelocity,this.m_xmaxVelocity),bb_random_Rnd2(this.m_yminVelocity,this.m_ymaxVelocity)),this.m_ColorType,this.m_ParticleType,this.m_DrawableImage));
	pop_err();
}
c_ParticleEmitter.prototype.p_SetMaxAllocations=function(t_maxAllocation){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<219>";
	dbg_object(this).m__maxAllocations=t_maxAllocation;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<220>";
	if(t_maxAllocation<=0){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<224>";
	this.m__unused.p_Clear();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<225>";
	this.m__tail.p_Clear();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<228>";
	for(var t_i=0;t_i<dbg_object(this).m__maxAllocations;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<229>";
		this.p__addParticle();
	}
	pop_err();
}
c_ParticleEmitter.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<195>";
	this.m_Position=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,0.0,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<196>";
	dbg_object(this).m_BaseColor=c_Color.m_White();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<197>";
	this.m__tail=c_Stack13.m_new.call(new c_Stack13);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<198>";
	this.m__unused=c_Stack13.m_new.call(new c_Stack13);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<199>";
	this.m_ColorStack=c_Stack14.m_new.call(new c_Stack14);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<200>";
	this.m_Force=c_Vec2.m_Zero();
	pop_err();
}
c_ParticleEmitter.m_new=function(t_img,t_PRELOADED){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<187>";
	this.m_DrawableImage=null;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<189>";
	this.p_SetMaxAllocations(t_PRELOADED);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<190>";
	this.p_Create();
	pop_err();
	return this;
}
c_ParticleEmitter.prototype.p_SetAutoEmit=function(t_a){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<238>";
	this.m_autoEmit=t_a;
	pop_err();
}
c_ParticleEmitter.prototype.p_LoadFromJson=function(t_json_string){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<384>";
	var t_json_object=object_downcast((c_JSONData.m_ReadJSON(t_json_string)),c_JSONObject);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<385>";
	var t_json_position=object_downcast((t_json_object.p_GetItem("position")),c_JSONObject);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<386>";
	var t_json_color_stack=object_downcast((t_json_object.p_GetItem("color_stack")),c_JSONArray);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<388>";
	this.p_SetMaxAllocations(t_json_object.p_GetItem("max_allocations").p_ToInt());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<390>";
	if((t_json_object.p_GetItem("auto_emmit").p_ToInt())==1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<391>";
		this.p_SetAutoEmit(true);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<393>";
		this.p_SetAutoEmit(false);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<396>";
	if((t_json_object.p_GetItem("fade_inout").p_ToInt())==1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<397>";
		dbg_object(this).m_FadeInOut=true;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<399>";
		dbg_object(this).m_FadeInOut=false;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<403>";
	dbg_object(this).m_AlphaChannel=(t_json_object.p_GetItem("aplha_cannel").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<404>";
	dbg_object(this).m_SpanTime=(t_json_object.p_GetItem("span_time").p_ToInt());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<405>";
	dbg_object(this).m_SpanAmount=(t_json_object.p_GetItem("span_amount").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<406>";
	dbg_object(this).m_Radius=(t_json_object.p_GetItem("radius").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<407>";
	dbg_object(this).m_minParticleRadius=(t_json_object.p_GetItem("min_particle_radius").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<408>";
	dbg_object(this).m_maxParticleRadius=(t_json_object.p_GetItem("max_particle_radius").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<409>";
	dbg_object(this).m_yminVelocity=(t_json_object.p_GetItem("y_min_velocity").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<410>";
	dbg_object(this).m_ymaxVelocity=(t_json_object.p_GetItem("y_max_velocity").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<411>";
	dbg_object(this).m_xminVelocity=(t_json_object.p_GetItem("x_min_velocity").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<412>";
	dbg_object(this).m_xmaxVelocity=(t_json_object.p_GetItem("x_max_velocity").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<414>";
	dbg_object(this).m_LifeTime=(t_json_object.p_GetItem("life_time").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<415>";
	dbg_object(this).m_ColorType=(t_json_object.p_GetItem("color_type").p_ToInt());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<416>";
	dbg_object(this).m_BaseColor=c_Color.m_White();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<418>";
	dbg_object(this).m_Position.p_X(t_json_position.p_GetItem("x").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<419>";
	dbg_object(this).m_Position.p_Y(t_json_position.p_GetItem("y").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<420>";
	dbg_object(this).m_Position.p_Width2(t_json_position.p_GetItem("width").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<421>";
	dbg_object(this).m_Position.p_Height2(t_json_position.p_GetItem("height").p_ToFloat());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<423>";
	dbg_object(this).m_ParticleType=(t_json_object.p_GetItem("particle_type").p_ToInt());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<426>";
	dbg_object(this).m_blend=(t_json_object.p_GetItem("blending").p_ToInt());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<428>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<428>";
	var t_=dbg_object(t_json_color_stack).m_values.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<428>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<428>";
		var t_json_color=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<429>";
		var t_json_color_obj=object_downcast((t_json_color),c_JSONObject);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<432>";
		dbg_object(this).m_ColorStack.p_Push37(c_Color.m_new2.call(new c_Color,(t_json_color_obj.p_GetItem("r").p_ToFloat()),(t_json_color_obj.p_GetItem("g").p_ToFloat()),(t_json_color_obj.p_GetItem("b").p_ToFloat()),1.0));
	}
	pop_err();
}
c_ParticleEmitter.prototype.p__recycle=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<68>";
	if(this.m__unused.p_Length2()>0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<69>";
		var t_c=null;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<71>";
		if(this.m_ColorStack.p_Length2()>0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<72>";
			t_c=this.m_ColorStack.p_Get((bb_random_Rnd2(0.0,(this.m_ColorStack.p_Length2())))|0);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<74>";
			t_c=dbg_object(this).m_BaseColor;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<77>";
		var t_positionX=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<78>";
		var t_positionY=0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<80>";
		if(dbg_object(this).m_EmitterType==c_ParticleEmitter.m_TYPE_CIRCLE){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<81>";
			t_positionX=((bb_random_Rnd2(this.m_Position.p_X2()-this.m_Radius/2.0,this.m_Position.p_X2()+this.m_Radius/2.0))|0);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<82>";
			t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2()-this.m_Radius/2.0,this.m_Position.p_Y2()+this.m_Radius/2.0))|0);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<84>";
			t_positionX=((bb_random_Rnd2(this.m_Position.p_X2(),this.m_Position.p_X2()+this.m_Position.p_Width()))|0);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<85>";
			t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2(),this.m_Position.p_Y2()+this.m_Position.p_Height()))|0);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<88>";
		var t_p=this.m__unused.p_Get(0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<90>";
		dbg_object(t_p).m_Position.p_X(t_positionX);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<91>";
		dbg_object(t_p).m_Position.p_Y(t_positionY);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<93>";
		dbg_object(t_p).m_Radius=bb_random_Rnd2(this.m_minParticleRadius,this.m_maxParticleRadius);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<94>";
		dbg_object(t_p).m_color=t_c;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<96>";
		dbg_object(dbg_object(t_p).m_Velocity).m_X=bb_random_Rnd2(this.m_xminVelocity,this.m_xmaxVelocity);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<97>";
		dbg_object(dbg_object(t_p).m_Velocity).m_Y=bb_random_Rnd2(this.m_yminVelocity,this.m_ymaxVelocity);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<98>";
		dbg_object(t_p).m_DrawableImage=this.m_DrawableImage;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<99>";
		dbg_object(t_p).m_LifeTime=this.m_LifeTime;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<100>";
		dbg_object(t_p).m_type=this.m_ParticleType;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<101>";
		dbg_object(t_p).m_Forcex=dbg_object(this.m_Force).m_X;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<102>";
		dbg_object(t_p).m_Forcey=dbg_object(this.m_Force).m_Y;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<103>";
		dbg_object(t_p).m_InitAlpha=this.m_AlphaChannel;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<104>";
		dbg_object(t_p).m_ColorType=dbg_object(this).m_ColorType;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<105>";
		dbg_object(t_p).m_ParentEmitter=this;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<106>";
		dbg_object(t_p).m_RotationSpeed=bb_random_Rnd2(dbg_object(this).m_RotationSpeedMin,dbg_object(this).m_RotationSpeedMax);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<107>";
		dbg_object(t_p).m_FadeInOut=dbg_object(this).m_FadeInOut;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<109>";
		if(dbg_object(t_p).m_DrawableImage!=null){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<110>";
			dbg_object(t_p).m__scale=dbg_object(t_p).m_Radius*2.0/dbg_object(dbg_object(t_p).m_DrawableImage).m_Position.p_Width();
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<114>";
		if(this.m__updaterEnabled){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<114>";
			dbg_object(this).m__updater.p_SetParticle(t_p);
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<116>";
		dbg_object(t_p).m__life=dbg_object(t_p).m_LifeTime;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<118>";
		this.m__tail.p_Push34(t_p);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<119>";
		this.m__unused.p_Remove2(0);
	}
	pop_err();
}
c_ParticleEmitter.prototype.p_Emit=function(t_amount){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<250>";
	if(t_amount==-1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<250>";
		t_amount=((dbg_object(this).m_SpanAmount)|0);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<252>";
	for(var t_i=0;t_i<t_amount;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<253>";
		this.p__recycle();
	}
	pop_err();
}
c_ParticleEmitter.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<262>";
	if(this.m__maxAllocations<=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<263>";
		error("you must use SetMaxAllocations() to set allocation number");
		pop_err();
		return;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<267>";
	if(dbg_object(this).m_autoEmit){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<268>";
		this.m__counter=this.m__counter+(c_Time.m_Delta());
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<270>";
		if(this.m__counter>=(this.m_SpanTime)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<271>";
			this.p_Emit(-1);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<272>";
			this.m__counter=0.0;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<276>";
	for(var t_i=0;t_i<this.m__tail.p_Length2();t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<278>";
		var t_current_particle=this.m__tail.p_Get(t_i);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<279>";
		t_current_particle.p_Update();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<281>";
		if(this.m__updaterEnabled){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<281>";
			this.m__updater.p_Update2(t_current_particle,c_Time.m_Delta());
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<283>";
		if(dbg_object(this.m__tail.p_Get(t_i)).m_LifeTime<=0.0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<285>";
			this.m__unused.p_Push34(t_current_particle);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<286>";
			this.m__tail.p_Remove2(t_i);
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<288>";
			t_i-=1;
		}
	}
	pop_err();
}
c_ParticleEmitter.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<298>";
	bb_graphics_PushMatrix();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<299>";
	bb_graphics_SetBlend(this.m_blend);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<300>";
	bb_graphics_SetColor(dbg_object(dbg_object(this).m_BaseColor).m_r,dbg_object(dbg_object(this).m_BaseColor).m_g,dbg_object(dbg_object(this).m_BaseColor).m_b);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<302>";
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<302>";
	var t_=this.m__tail.p_ObjectEnumerator();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<302>";
	while(t_.p_HasNext()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<302>";
		var t_t=t_.p_NextObject();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<303>";
		t_t.p_Render();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<305>";
	bb_graphics_SetBlend(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<306>";
	bb_graphics_SetAlpha(1.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<307>";
	bb_graphics_PopMatrix();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particleemitter.monkey<308>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	pop_err();
}
function c_Particle(){
	Object.call(this);
	this.m_Position=null;
	this.m_Radius=.0;
	this.m_Velocity=c_Vec2.m_Zero();
	this.m_color=null;
	this.m_LifeTime=0.0;
	this.m__life=.0;
	this.m_type=0;
	this.m_DrawableImage=null;
	this.m_InitAlpha=1.0;
	this.m_Forcex=0.0;
	this.m_Forcey=0.0;
	this.m__scale=1.0;
	this.m_ColorType=c_ParticleEmitter.m_COLOR_RANDOM;
	this.m_ParentEmitter=null;
	this.m_RotationSpeed=0.0;
	this.m_FadeInOut=true;
	this.m__alpha=1.0;
	this.m_Angle=0.0;
	this.implments={c_iDrawable:1};
}
c_Particle.m_new=function(t_x,t_y,t_rad,t_c,t_lt,t_forcex,t_forcey,t_alpha,t_parent,t_vel,t_colorT,t_t,t_img){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<58>";
	dbg_object(this).m_Position=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,0.0,0.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<59>";
	dbg_object(this).m_Position.p_X(t_x);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<60>";
	dbg_object(this).m_Position.p_Y(t_y);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<61>";
	dbg_object(this).m_Radius=t_rad;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<62>";
	dbg_object(this).m_Velocity=t_vel;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<63>";
	dbg_object(this).m_color=t_c;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<64>";
	dbg_object(this).m_LifeTime=t_lt;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<65>";
	dbg_object(this).m__life=t_lt;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<67>";
	dbg_object(this).m_type=t_t;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<69>";
	dbg_object(this).m_DrawableImage=t_img;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<70>";
	dbg_object(this).m_InitAlpha=t_alpha;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<72>";
	dbg_object(this).m_Forcex=t_forcex;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<73>";
	dbg_object(this).m_Forcey=t_forcey;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<75>";
	if(dbg_object(this).m_DrawableImage!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<76>";
		dbg_object(this).m__scale=t_rad*2.0/dbg_object(dbg_object(this).m_DrawableImage).m_Position.p_Width();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<79>";
	dbg_object(this).m_ColorType=t_colorT;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<80>";
	dbg_object(this).m_ParentEmitter=t_parent;
	pop_err();
	return this;
}
c_Particle.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<22>";
	pop_err();
	return this;
}
c_Particle.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<91>";
	var t_=dbg_object(this).m_Position;
	dbg_object(this).m_Position.p_X(t_.p_X2()+dbg_object(this.m_Velocity).m_X*c_Time.m_DeltaSecs());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<92>";
	var t_2=dbg_object(this).m_Position;
	dbg_object(this).m_Position.p_Y(t_2.p_Y2()+dbg_object(this.m_Velocity).m_Y*c_Time.m_DeltaSecs());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<94>";
	dbg_object(this.m_Velocity).m_X+=this.m_Forcex*c_Time.m_DeltaSecs();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<95>";
	dbg_object(this.m_Velocity).m_Y+=this.m_Forcey*c_Time.m_DeltaSecs();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<97>";
	if(this.m_Forcex!=0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<97>";
		this.m_Forcex-=this.m_Forcex*c_Time.m_DeltaSecs();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<98>";
	if(this.m_Forcey!=0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<98>";
		this.m_Forcey-=this.m_Forcey*c_Time.m_DeltaSecs();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<100>";
	dbg_object(this).m_LifeTime=dbg_object(this).m_LifeTime-(c_Time.m_Delta());
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<102>";
	if(!dbg_object(this).m_FadeInOut){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<103>";
		dbg_object(this).m__alpha=dbg_object(this).m_InitAlpha*(dbg_object(this).m_LifeTime/dbg_object(this).m__life);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<105>";
		var t_hlife=dbg_object(this).m__life*0.5;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<106>";
		if(dbg_object(this).m_LifeTime>t_hlife){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<107>";
			dbg_object(this).m__alpha=this.m__life*this.m_InitAlpha/this.m_LifeTime-dbg_object(this).m_InitAlpha;
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<109>";
			dbg_object(this).m__alpha=dbg_object(this).m_InitAlpha*(dbg_object(this).m_LifeTime/t_hlife);
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<115>";
	if(this.m_RotationSpeed!=0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<116>";
		dbg_object(this).m_Angle+=this.m_RotationSpeed*c_Time.m_DeltaSecs();
	}
	pop_err();
}
c_Particle.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<121>";
	bb_graphics_PushMatrix();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<122>";
	if(dbg_object(this).m_ColorType==c_ParticleEmitter.m_COLOR_RANDOM){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<123>";
		bb_graphics_SetColor(dbg_object(this.m_color).m_r,dbg_object(this.m_color).m_g,dbg_object(this.m_color).m_b);
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<125>";
		var t_colorIndex=((dbg_object(this).m_LifeTime/(dbg_object(this).m__life/(dbg_object(dbg_object(this).m_ParentEmitter).m_ColorStack.p_Length2())))|0);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<127>";
		t_colorIndex=bb_math_Max(0,bb_math_Min(t_colorIndex,dbg_object(this.m_ParentEmitter).m_ColorStack.p_Length2()-1));
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<129>";
		var t_col=dbg_object(this.m_ParentEmitter).m_ColorStack.p_Get(t_colorIndex);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<130>";
		bb_graphics_SetColor(dbg_object(t_col).m_r,dbg_object(t_col).m_g,dbg_object(t_col).m_b);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<133>";
	bb_graphics_SetAlpha(this.m__alpha);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<135>";
	if(dbg_object(this).m_DrawableImage==null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<136>";
		if(this.m_type==0){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<137>";
			bb_graphics_DrawCircle(this.m_Position.p_X2(),this.m_Position.p_Y2(),this.m_Radius);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<139>";
			bb_graphics_DrawRect(this.m_Position.p_X2()-this.m_Radius,this.m_Position.p_Y2()-this.m_Radius,this.m_Radius*2.0,this.m_Radius*2.0);
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<143>";
		bb_graphics_Scale(this.m__scale,this.m__scale);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<144>";
		dbg_object(this).m_DrawableImage.p_SetRotation(dbg_object(this).m_Angle);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<145>";
		dbg_object(dbg_object(this).m_DrawableImage).m_Position.p_X((this.m_Position.p_X2()-this.m_Radius)/this.m__scale);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<146>";
		dbg_object(dbg_object(this).m_DrawableImage).m_Position.p_Y((this.m_Position.p_Y2()-this.m_Radius)/this.m__scale);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<147>";
		dbg_object(this).m_DrawableImage.p_Render();
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<150>";
	bb_graphics_SetAlpha(1.0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/particlesystem/particle.monkey<151>";
	bb_graphics_PopMatrix();
	pop_err();
}
c_Particle.prototype.p_Create=function(){
	push_err();
	pop_err();
}
function c_Stack13(){
	Object.call(this);
	this.m_length=0;
	this.m_data=[];
}
c_Stack13.m_NIL=null;
c_Stack13.prototype.p_Clear=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack13.m_NIL;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack13.prototype.p_Push34=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack13.prototype.p_Push35=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push34(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack13.prototype.p_Push36=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push35(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack13.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack13.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack13.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack13.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack13.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack13.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack13.prototype.p_Remove2=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index];
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack13.m_NIL;
	pop_err();
}
c_Stack13.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator12.m_new.call(new c_Enumerator12,this);
	pop_err();
	return t_;
}
function c_Color(){
	Object.call(this);
	this.m_r=.0;
	this.m_g=.0;
	this.m_b=.0;
	this.m_a=.0;
}
c_Color.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<12>";
	dbg_object(this).m_r=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<13>";
	dbg_object(this).m_g=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<14>";
	dbg_object(this).m_b=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<15>";
	dbg_object(this).m_a=1.0;
	pop_err();
	return this;
}
c_Color.m_new2=function(t_r,t_g,t_b,t_a){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<20>";
	dbg_object(this).m_r=t_r;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<21>";
	dbg_object(this).m_g=t_g;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<22>";
	dbg_object(this).m_b=t_b;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<23>";
	dbg_object(this).m_a=t_a;
	pop_err();
	return this;
}
c_Color.m_White=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/color.monkey<70>";
	var t_=c_Color.m_new2.call(new c_Color,255.0,255.0,255.0,1.0);
	pop_err();
	return t_;
}
function c_Stack14(){
	Object.call(this);
	this.m_length=0;
	this.m_data=[];
}
c_Stack14.m_NIL=null;
c_Stack14.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack14.m_NIL;
		}
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack14.prototype.p_Length2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack14.prototype.p_Get=function(t_index){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack14.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack14.m_new2=function(t_data){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack14.prototype.p_Push37=function(t_value){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack14.prototype.p_Push38=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<80>";
		this.p_Push37(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack14.prototype.p_Push39=function(t_values,t_offset){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<75>";
	this.p_Push38(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/random.monkey<21>";
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/random.monkey<22>";
	var t_=(bb_random_Seed>>8&16777215)/16777216.0;
	pop_err();
	return t_;
}
function bb_random_Rnd2(t_low,t_high){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/random.monkey<30>";
	var t_=bb_random_Rnd3(t_high-t_low)+t_low;
	pop_err();
	return t_;
}
function bb_random_Rnd3(t_range){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/random.monkey<26>";
	var t_=bb_random_Rnd()*t_range;
	pop_err();
	return t_;
}
function c_Enumerator8(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator8.m_new=function(t_stack){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator8.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator8.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator8.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Enemy(){
	Object.call(this);
	this.m_position=null;
	this.m_type="";
	this.m_animated_sprite=null;
	this.m_cannon=null;
	this.m_ai=null;
	this.m_explosion=null;
	this.m_explosion_sound=null;
	this.m_player_position=null;
	this.m_visible=true;
	this.m_state=0;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_Enemy.prototype.p_CreateSprite=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<74>";
	dbg_object(this).m_animated_sprite=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"enemies.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),9.0,9.0,6,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<75>";
	dbg_object(this).m_animated_sprite.p_AddSequence("4097",[0]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<76>";
	dbg_object(this).m_animated_sprite.p_AddSequence("4098",[1]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<77>";
	dbg_object(this).m_animated_sprite.p_AddSequence("4099",[2]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<78>";
	dbg_object(this).m_animated_sprite.p_AddSequence("4100",[3]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<79>";
	dbg_object(this).m_animated_sprite.p_AddSequence("4101",[4]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<80>";
	dbg_object(this).m_animated_sprite.p_AddSequence("play",[5]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<82>";
	dbg_object(this).m_animated_sprite.p_PlaySequence(dbg_object(this).m_type,100,true);
	pop_err();
}
c_Enemy.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<88>";
	this.p_CreateSprite();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<91>";
	c_CollisionEngine.m_Instance2().p_AddStaticBody(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<94>";
	dbg_object(this).m_cannon=c_EnemyCannon.m_new.call(new c_EnemyCannon);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<96>";
	dbg_object(this).m_ai=c_SimpleShotAI.m_new.call(new c_SimpleShotAI,this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<99>";
	dbg_object(this).m_explosion=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"explosion.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),9.0,9.0,14,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<100>";
	dbg_object(this).m_explosion.p_AddSequence("explode",[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<103>";
	dbg_object(this).m_explosion_sound=bb_audio_LoadSound("sounds/short_explosion.mp3");
	pop_err();
}
c_Enemy.m_new=function(t_position,t_type){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<66>";
	dbg_object(this).m_position=t_position;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<67>";
	var t_=dbg_object(this).m_position;
	dbg_object(this).m_position.p_Y(t_.p_Y2()-t_position.p_Height());
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<68>";
	dbg_object(this).m_type=t_type;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<69>";
	this.p_Create();
	pop_err();
	return this;
}
c_Enemy.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<41>";
	pop_err();
	return this;
}
c_Enemy.prototype.p_AAShot=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<171>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2()-1.0)|0),((dbg_object(this).m_position.p_Y2())|0));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<175>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2()+1.0)|0),((dbg_object(this).m_position.p_Y2())|0));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<179>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2()-1.0)|0));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<183>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2()+1.0)|0));
	pop_err();
}
c_Enemy.prototype.p_XShot=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<189>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2()-1.0)|0),((dbg_object(this).m_position.p_Y2()-1.0)|0));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<193>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2()+1.0)|0),((dbg_object(this).m_position.p_Y2()+1.0)|0));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<197>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2()+1.0)|0),((dbg_object(this).m_position.p_Y2()-1.0)|0));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<201>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_position.p_X2()-1.0)|0),((dbg_object(this).m_position.p_Y2()+1.0)|0));
	pop_err();
}
c_Enemy.prototype.p_Shot=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<206>";
	if(dbg_object(this).m_type=="4097"){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<207>";
		this.p_AAShot();
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<208>";
		if(dbg_object(this).m_type=="4098"){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<209>";
			this.p_AAShot();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<210>";
			this.p_XShot();
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<211>";
			if(dbg_object(this).m_type=="4099"){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<212>";
				this.p_XShot();
			}
		}
	}
	pop_err();
}
c_Enemy.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<107>";
	if(!this.m_visible){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<109>";
	if(dbg_object(this).m_state==0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<111>";
		dbg_object(this).m_animated_sprite.p_Update();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<112>";
		dbg_object(this).m_ai.p_Update();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<113>";
		dbg_object(this).m_cannon.p_Update();
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<115>";
		if(dbg_object(this).m_state==1){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<117>";
			dbg_object(this).m_explosion.p_Update();
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<119>";
			if(dbg_object(this).m_explosion.p_IsLastFrame()){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<119>";
				dbg_object(this).m_state=2;
			}
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<121>";
			if(dbg_object(this).m_state==2){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<123>";
				dbg_object(this).m_visible=false;
			}
		}
	}
	pop_err();
}
c_Enemy.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<129>";
	if(!dbg_object(this).m_visible){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<131>";
	if(dbg_object(this).m_state==0){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<133>";
		bb_graphics_PushMatrix();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<134>";
		bb_graphics_Translate(dbg_object(this).m_position.p_X2(),dbg_object(this).m_position.p_Y2());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<135>";
		dbg_object(this).m_animated_sprite.p_Render();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<136>";
		bb_graphics_PopMatrix();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<138>";
		dbg_object(this).m_cannon.p_Render();
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<140>";
		if(dbg_object(this).m_state==1){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<141>";
			dbg_object(this).m_explosion.p_Render();
		}
	}
	pop_err();
}
c_Enemy.prototype.p_GetBox=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<147>";
	pop_err();
	return dbg_object(this).m_position;
}
c_Enemy.prototype.p_OnCollide=function(t_name){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<151>";
	if(t_name=="player" || t_name=="player_bullet"){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<152>";
		c_Time.m_Freeze(100);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<153>";
		bb_audio_PlaySound(dbg_object(this).m_explosion_sound,1,0);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<154>";
		dbg_object(this).m_explosion.p_PlaySequence("explode",70,true);
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<155>";
		dbg_object(dbg_object(this).m_explosion).m_Position.p_X(dbg_object(this).m_position.p_X2());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<156>";
		dbg_object(dbg_object(this).m_explosion).m_Position.p_Y(dbg_object(this).m_position.p_Y2());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<157>";
		dbg_object(this).m_state=1;
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<159>";
		dbg_object(this).m_cannon.p_Destroy2();
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<160>";
		c_CollisionEngine.m_Instance2().p_Destroy(this);
	}
	pop_err();
}
c_Enemy.prototype.p_GetName=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<165>";
	pop_err();
	return "enemy";
}
function c_PowerUp(){
	Object.call(this);
	this.m_position=null;
	this.m_sprite=null;
	this.m_visible=true;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_PowerUp.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<20>";
	var t_=dbg_object(this).m_position;
	dbg_object(this).m_position.p_X(t_.p_X2()+3.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<21>";
	var t_2=dbg_object(this).m_position;
	dbg_object(this).m_position.p_Y(t_2.p_Y2()+2.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<24>";
	dbg_object(this).m_sprite=c_lpImage.m_new.call(new c_lpImage,"powerup.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<27>";
	c_CollisionEngine.m_Instance2().p_AddStaticBody(this);
	pop_err();
}
c_PowerUp.m_new=function(t_position){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<12>";
	dbg_object(this).m_position=t_position;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<14>";
	this.p_Create();
	pop_err();
	return this;
}
c_PowerUp.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<4>";
	pop_err();
	return this;
}
c_PowerUp.prototype.p_Update=function(){
	push_err();
	pop_err();
}
c_PowerUp.prototype.p_Render=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<35>";
	if(!dbg_object(this).m_visible){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<37>";
	bb_graphics_PushMatrix();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<38>";
	bb_graphics_Translate(dbg_object(this).m_position.p_X2(),dbg_object(this).m_position.p_Y2());
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<39>";
	dbg_object(this).m_sprite.p_Render();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<40>";
	bb_graphics_PopMatrix();
	pop_err();
}
c_PowerUp.prototype.p_GetBox=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<45>";
	pop_err();
	return dbg_object(this).m_position;
}
c_PowerUp.prototype.p_Destroy2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<58>";
	dbg_object(this).m_visible=false;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<59>";
	c_CollisionEngine.m_Instance2().p_Destroy(this);
	pop_err();
}
c_PowerUp.prototype.p_OnCollide=function(t_name){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<48>";
	if(t_name=="player"){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<49>";
		this.p_Destroy2();
	}
	pop_err();
}
c_PowerUp.prototype.p_GetName=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/powerup.monkey<53>";
	pop_err();
	return "powerup";
}
function c_EnemyCannon(){
	Object.call(this);
	this.m_visible=true;
	this.implments={c_iDrawable:1};
}
c_EnemyCannon.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_EnemyCannon.m_new=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<46>";
	this.p_Create();
	pop_err();
	return this;
}
c_EnemyCannon.prototype.p_Shot2=function(t_ox,t_oy,t_dx,t_dy){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<61>";
	var t_v=c_Vec2.m_new.call(new c_Vec2,(t_dx-t_ox),(t_dy-t_oy));
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<62>";
	c_EnemyBullet.m_new.call(new c_EnemyBullet,c_Vec2.m_new.call(new c_Vec2,(t_ox),(t_oy)),t_v.p_UnitVector(null));
	pop_err();
}
c_EnemyCannon.prototype.p_Update=function(){
	push_err();
	pop_err();
}
c_EnemyCannon.prototype.p_Render=function(){
	push_err();
	pop_err();
}
c_EnemyCannon.prototype.p_Destroy2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/enemy_cannon.monkey<67>";
	dbg_object(this).m_visible=false;
	pop_err();
}
function c_SimpleShotAI(){
	Object.call(this);
	this.m_parent=null;
	this.m_shot_timer=0;
	this.m_shot_time=2000;
	this.implments={c_iDrawable:1};
}
c_SimpleShotAI.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_SimpleShotAI.m_new=function(t_parent){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<14>";
	dbg_object(this).m_parent=t_parent;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<16>";
	this.p_Create();
	pop_err();
	return this;
}
c_SimpleShotAI.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<6>";
	pop_err();
	return this;
}
c_SimpleShotAI.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<25>";
	dbg_object(this).m_shot_timer+=c_Time.m_Delta();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<27>";
	if(dbg_object(this).m_shot_timer>=dbg_object(this).m_shot_time){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<28>";
		dbg_object(this).m_shot_timer=0;
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy.monkey<30>";
		dbg_object(this).m_parent.p_Shot();
	}
	pop_err();
}
c_SimpleShotAI.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function c_EnemyTurret(){
	c_Enemy.call(this);
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_EnemyTurret.prototype=extend_class(c_Enemy);
c_EnemyTurret.m_new=function(t_position,t_gid){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<9>";
	c_Enemy.m_new.call(this,t_position,t_gid);
	pop_err();
	return this;
}
c_EnemyTurret.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<6>";
	c_Enemy.m_new2.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<6>";
	pop_err();
	return this;
}
c_EnemyTurret.prototype.p_Create=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<13>";
	c_Enemy.prototype.p_Create.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<16>";
	c_CollisionEngine.m_Instance2().p_AddStaticBody(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<19>";
	dbg_object(this).m_cannon=c_EnemyCannon.m_new.call(new c_EnemyCannon);
	pop_err();
}
c_EnemyTurret.prototype.p_Shot=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_turret.monkey<25>";
	dbg_object(this).m_cannon.p_Shot2(((dbg_object(this).m_position.p_X2())|0),((dbg_object(this).m_position.p_Y2())|0),((dbg_object(this).m_player_position.p_CenterX())|0),((dbg_object(this).m_player_position.p_CenterY())|0));
	pop_err();
}
function c_EnemyWave(){
	c_Enemy.call(this);
	this.m_active=null;
	this.m_wavymovement=null;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_EnemyWave.prototype=extend_class(c_Enemy);
c_EnemyWave.m_new=function(t_position){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<13>";
	c_Enemy.m_new.call(this,t_position,"play");
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<14>";
	dbg_object(this).m_position=t_position;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<16>";
	dbg_object(this).m_active=c_ActiveOnCamera.m_new.call(new c_ActiveOnCamera,dbg_object(this).m_position);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<17>";
	dbg_object(this).m_wavymovement=c_WavyMovement.m_new.call(new c_WavyMovement,dbg_object(this).m_position);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<19>";
	this.p_Create();
	pop_err();
	return this;
}
c_EnemyWave.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<6>";
	c_Enemy.m_new2.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<6>";
	pop_err();
	return this;
}
c_EnemyWave.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<23>";
	c_Enemy.prototype.p_Update.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<24>";
	dbg_object(this).m_active.p_Update();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<26>";
	if(!dbg_object(this).m_active.p_IsActive()){
		pop_err();
		return;
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<28>";
	dbg_object(this).m_animated_sprite.p_Update();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemywave.monkey<29>";
	dbg_object(this).m_wavymovement.p_Update();
	pop_err();
}
c_EnemyWave.prototype.p_Shot=function(){
	push_err();
	pop_err();
}
function c_ActiveOnCamera(){
	Object.call(this);
	this.m_target=null;
	this.m_viewport=null;
	this.m_active=false;
	this.implments={c_iDrawable:1};
}
c_ActiveOnCamera.m_new=function(t_target){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<12>";
	dbg_object(this).m_target=t_target;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<14>";
	dbg_object(this).m_viewport=dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort;
	pop_err();
	return this;
}
c_ActiveOnCamera.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<5>";
	pop_err();
	return this;
}
c_ActiveOnCamera.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<22>";
	if(c_Collision.m_AABBIntersects(dbg_object(this).m_target,dbg_object(this).m_viewport)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<23>";
		dbg_object(this).m_active=true;
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<25>";
		dbg_object(this).m_active=false;
	}
	pop_err();
}
c_ActiveOnCamera.prototype.p_IsActive=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/activeoncamera.monkey<33>";
	pop_err();
	return dbg_object(this).m_active;
}
c_ActiveOnCamera.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_ActiveOnCamera.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function c_WavyMovement(){
	Object.call(this);
	this.m_target=null;
	this.m_initial_y=0;
	this.m_speed=-25;
	this.implments={c_iDrawable:1};
}
c_WavyMovement.m_new=function(t_target){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/wavymovement.monkey<10>";
	dbg_object(this).m_target=t_target;
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/wavymovement.monkey<11>";
	dbg_object(this).m_initial_y=((dbg_object(this).m_target.p_Y2())|0);
	pop_err();
	return this;
}
c_WavyMovement.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/wavymovement.monkey<3>";
	pop_err();
	return this;
}
c_WavyMovement.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/wavymovement.monkey<19>";
	var t_=dbg_object(this).m_target;
	dbg_object(this).m_target.p_X(t_.p_X2()+(dbg_object(this).m_speed)*c_Time.m_DeltaSecs());
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/wavymovement.monkey<20>";
	dbg_object(this).m_target.p_Y((dbg_object(this).m_initial_y)+Math.sin((dbg_object(this).m_target.p_X2() % 45.0*8.0)*D2R)*7.0);
	pop_err();
}
c_WavyMovement.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_WavyMovement.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function c_EnemyRectLine(){
	c_Enemy.call(this);
	this.m_shot_state=0;
	this.m_wait_timer=0;
	this.m_wait_time=1000;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_EnemyRectLine.prototype=extend_class(c_Enemy);
c_EnemyRectLine.m_new=function(t_position,t_gid){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<16>";
	c_Enemy.m_new.call(this,t_position,t_gid);
	pop_err();
	return this;
}
c_EnemyRectLine.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<5>";
	c_Enemy.m_new2.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<5>";
	pop_err();
	return this;
}
c_EnemyRectLine.prototype.p_CreateSprite=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<20>";
	dbg_object(this).m_animated_sprite=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"rectline_enemy.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),25.0,10.0,1,0.0);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<21>";
	dbg_object(this).m_animated_sprite.p_AddSequence(dbg_object(this).m_type,[0]);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<23>";
	dbg_object(this).m_animated_sprite.p_PlaySequence(dbg_object(this).m_type,100,true);
	pop_err();
}
c_EnemyRectLine.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<28>";
	c_Enemy.prototype.p_Update.call(this);
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<30>";
	if(c_Collision.m_AABBIntersects(dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort,dbg_object(this).m_position)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<32>";
		if(dbg_object(this).m_shot_state==0){
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<33>";
			dbg_object(this).m_position.p_X(dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort.p_X2()+dbg_object(c_Game.m_Instance().p_GetCurrentCamera()).m_ViewPort.p_Width()-10.0);
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<35>";
			if(dbg_object(this).m_wait_timer>=dbg_object(this).m_wait_time){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<36>";
				dbg_object(this).m_shot_state=1;
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<37>";
				dbg_object(this).m_wait_timer=0;
			}
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<40>";
			dbg_object(this).m_wait_timer+=c_Time.m_Delta();
		}else{
			err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<41>";
			if(dbg_object(this).m_shot_state==1){
				err_info="/Users/ricardo/git_loadingplay/gbjam4/src/sprites/enemy_rectline.monkey<42>";
				var t_=dbg_object(this).m_position;
				dbg_object(this).m_position.p_X(t_.p_X2()-100.0*c_Time.m_DeltaSecs());
			}
		}
	}
	pop_err();
}
c_EnemyRectLine.prototype.p_Shot=function(){
	push_err();
	pop_err();
}
function c_ClampToScreen(){
	Object.call(this);
	this.m_target=null;
	this.m_camera_viewport=null;
	this.implments={c_iDrawable:1};
}
c_ClampToScreen.m_new=function(t_target){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<10>";
	dbg_object(this).m_target=t_target;
	pop_err();
	return this;
}
c_ClampToScreen.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<4>";
	pop_err();
	return this;
}
c_ClampToScreen.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<14>";
	if(dbg_object(this).m_target.p_X2()<dbg_object(this).m_camera_viewport.p_X2()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<15>";
		dbg_object(this).m_target.p_X(dbg_object(this).m_camera_viewport.p_X2());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<18>";
	if(dbg_object(this).m_target.p_Y2()<dbg_object(this).m_camera_viewport.p_Y2()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<19>";
		dbg_object(this).m_target.p_Y(dbg_object(this).m_camera_viewport.p_Y2());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<22>";
	if(dbg_object(this).m_target.p_X2()+dbg_object(this).m_target.p_Width()>dbg_object(this).m_camera_viewport.p_X2()+dbg_object(this).m_camera_viewport.p_Width()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<23>";
		dbg_object(this).m_target.p_X(dbg_object(this).m_camera_viewport.p_X2()+dbg_object(this).m_camera_viewport.p_Width()-dbg_object(this).m_target.p_Width());
	}
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<26>";
	if(dbg_object(this).m_target.p_Y2()+dbg_object(this).m_target.p_Height()>dbg_object(this).m_camera_viewport.p_Y2()+dbg_object(this).m_camera_viewport.p_Height()){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/clamp_to_screen.monkey<27>";
		dbg_object(this).m_target.p_Y(dbg_object(this).m_camera_viewport.p_Y2()+dbg_object(this).m_camera_viewport.p_Height()-dbg_object(this).m_target.p_Height());
	}
	pop_err();
}
c_ClampToScreen.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_ClampToScreen.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function c_CameraControl(){
	Object.call(this);
	this.m_target=null;
	this.m_player=null;
	this.m_max_x=2400;
	this.m_x_speed=25.0;
	this.m_y_speed=0.0;
	this.implments={c_iDrawable:1};
}
c_CameraControl.m_new=function(t_target){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<14>";
	dbg_object(this).m_target=t_target;
	pop_err();
	return this;
}
c_CameraControl.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<4>";
	pop_err();
	return this;
}
c_CameraControl.prototype.p_Update=function(){
	push_err();
	err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<18>";
	if(dbg_object(this).m_target.p_X2()+dbg_object(this).m_target.p_Width()>=(dbg_object(this).m_max_x)){
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<19>";
		dbg_object(this).m_target.p_X((dbg_object(this).m_max_x)-dbg_object(this).m_target.p_Width());
	}else{
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<21>";
		var t_=dbg_object(this).m_target;
		dbg_object(this).m_target.p_X(t_.p_X2()+dbg_object(this).m_x_speed*c_Time.m_DeltaSecs());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<22>";
		var t_2=dbg_object(this).m_target;
		dbg_object(this).m_target.p_Y(t_2.p_Y2()+dbg_object(this).m_y_speed*c_Time.m_DeltaSecs());
		err_info="/Users/ricardo/git_loadingplay/gbjam4/src/components/camera_control.monkey<24>";
		var t_3=dbg_object(this).m_player;
		dbg_object(this).m_player.p_X(t_3.p_X2()+dbg_object(this).m_x_speed*c_Time.m_DeltaSecs());
	}
	pop_err();
}
c_CameraControl.prototype.p_Create=function(){
	push_err();
	pop_err();
}
c_CameraControl.prototype.p_Render=function(){
	push_err();
	pop_err();
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<437>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_NodeEnumerator.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<434>";
	pop_err();
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<441>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<445>";
	var t_t=this.m_node;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<446>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/map.monkey<447>";
	pop_err();
	return t_t;
}
function bb_math_Clamp(t_n,t_min,t_max){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<61>";
	if(t_n<t_min){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<61>";
		pop_err();
		return t_min;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<62>";
	if(t_n>t_max){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<62>";
		pop_err();
		return t_max;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<63>";
	pop_err();
	return t_n;
}
function bb_math_Clamp2(t_n,t_min,t_max){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<88>";
	if(t_n<t_min){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<88>";
		pop_err();
		return t_min;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<89>";
	if(t_n>t_max){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<89>";
		pop_err();
		return t_max;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<90>";
	pop_err();
	return t_n;
}
function bb_graphics_DrawCircle(t_x,t_y,t_r){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<417>";
	bb_graphics_DebugRenderDevice();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<419>";
	bb_graphics_context.p_Validate();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/graphics.monkey<420>";
	bb_graphics_renderDevice.DrawOval(t_x-t_r,t_y-t_r,t_r*2.0,t_r*2.0);
	pop_err();
	return 0;
}
function c_Enumerator9(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator9.m_new=function(t_stack){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator9.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator9.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator9.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Collision(){
	Object.call(this);
}
c_Collision.m_AABBIntersects=function(t_r1,t_r2){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/functions.monkey<22>";
	if(t_r1.p_X2()+t_r1.p_Width()<t_r2.p_X2() || t_r1.p_Y2()+t_r1.p_Height()<t_r2.p_Y2() || t_r1.p_X2()>t_r2.p_X2()+t_r2.p_Width() || t_r1.p_Y2()>t_r2.p_Y2()+t_r2.p_Height()){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/functions.monkey<23>";
		pop_err();
		return false;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/functions.monkey<26>";
	pop_err();
	return true;
}
function c_SAT(){
	Object.call(this);
}
c_SAT.m_RectVsRect=function(t_r1,t_r2,t_rtn){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<30>";
	var t_horizontalOverlap=.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<31>";
	var t_horizontalDirection=.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<32>";
	var t_verticalOverlap=.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<33>";
	var t_verticalDirection=.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<35>";
	var t_r1hw=t_r1.p_Width()/2.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<36>";
	var t_r2hw=t_r2.p_Width()/2.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<37>";
	var t_r1hh=t_r1.p_Height()/2.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<38>";
	var t_r2hh=t_r2.p_Height()/2.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<40>";
	dbg_object(t_rtn).m_X=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<41>";
	dbg_object(t_rtn).m_Y=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<43>";
	t_horizontalOverlap=t_r1hw+t_r2hw-bb_math_Abs2(t_r1.p_X2()+t_r1hw-(t_r2.p_X2()+t_r2hw));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<45>";
	if(t_horizontalOverlap<=0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<46>";
		pop_err();
		return false;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<49>";
	t_verticalOverlap=t_r1hh+t_r2hh-bb_math_Abs2(t_r1.p_Y2()+t_r1hh-(t_r2.p_Y2()+t_r2hh));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<51>";
	if(t_verticalOverlap<=0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<52>";
		pop_err();
		return false;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<55>";
	if(t_horizontalOverlap<t_verticalOverlap){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<56>";
		t_horizontalDirection=bb_math_Sgn2(t_r1.p_X2()+t_r1hw-(t_r2.p_X2()+t_r2hw));
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<57>";
		dbg_object(t_rtn).m_X+=t_horizontalOverlap*t_horizontalDirection*-1.0;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<59>";
		t_verticalDirection=bb_math_Sgn2(t_r1.p_Y2()+t_r1hh-(t_r2.p_Y2()+t_r2hh));
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<60>";
		dbg_object(t_rtn).m_Y+=t_verticalOverlap*t_verticalDirection*-1.0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<63>";
	pop_err();
	return true;
}
c_SAT.m_info=null;
c_SAT.m_edge=null;
c_SAT.m_axis=null;
c_SAT.m_calculateInterval=function(t_r1,t_axis){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<202>";
	t_r1.p_Min(c_Vec2.m_Dot(t_r1.p_PointStack().p_Get(0).p_X2(),t_r1.p_PointStack().p_Get(0).p_Y2(),dbg_object(t_axis).m_X,dbg_object(t_axis).m_Y));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<206>";
	t_r1.p_Max(c_Vec2.m_Dot(t_r1.p_PointStack().p_Get(0).p_X2(),t_r1.p_PointStack().p_Get(0).p_Y2(),dbg_object(t_axis).m_X,dbg_object(t_axis).m_Y));
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<208>";
	for(var t_i=1;t_i<t_r1.p_PointStack().p_Length2();t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<211>";
		var t_d=c_Vec2.m_Dot(t_r1.p_PointStack().p_Get(t_i).p_X2(),t_r1.p_PointStack().p_Get(t_i).p_Y2(),dbg_object(t_axis).m_X,dbg_object(t_axis).m_Y);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<213>";
		if(t_d<t_r1.p_Min2()){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<214>";
			t_r1.p_Min(t_d);
		}else{
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<215>";
			if(t_d>t_r1.p_Max2()){
				err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<216>";
				t_r1.p_Max(t_d);
			}
		}
	}
	pop_err();
}
c_SAT.m_mina=0;
c_SAT.m_maxa=0;
c_SAT.m_minb=0;
c_SAT.m_maxb=0;
c_SAT.m_sep=null;
c_SAT.m_separatedByAxis=function(t_r1,t_r2,t_axis){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<145>";
	c_SAT.m_calculateInterval(t_r1,t_axis);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<146>";
	c_SAT.m_mina=t_r1.p_Min2();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<147>";
	c_SAT.m_maxa=t_r1.p_Max2();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<148>";
	c_SAT.m_calculateInterval(t_r2,t_axis);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<149>";
	c_SAT.m_minb=t_r2.p_Min2();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<150>";
	c_SAT.m_maxb=t_r2.p_Max2();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<152>";
	var t_d0=c_SAT.m_maxb-c_SAT.m_mina;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<153>";
	var t_d1=c_SAT.m_minb-c_SAT.m_maxa;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<155>";
	if(t_d0<0.0 || t_d1>0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<156>";
		pop_err();
		return true;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<159>";
	var t_overlap=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<161>";
	if(t_d0<-t_d1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<162>";
		t_overlap=t_d0;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<164>";
		t_overlap=t_d1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<167>";
	var t_axis_length_squared=c_Vec2.m_DotSquared(dbg_object(t_axis).m_X,dbg_object(t_axis).m_Y);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<169>";
	if(!(t_axis_length_squared>0.00000000001)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<170>";
		error("axis_length_squared: no puede ser menor a 0.00000000001");
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<173>";
	dbg_object(c_SAT.m_sep).m_X=dbg_object(t_axis).m_X*(t_overlap/t_axis_length_squared);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<174>";
	dbg_object(c_SAT.m_sep).m_Y=dbg_object(t_axis).m_Y*(t_overlap/t_axis_length_squared);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<176>";
	var t_sep_length_squared=c_Vec2.m_DotSquared(dbg_object(c_SAT.m_sep).m_X,dbg_object(c_SAT.m_sep).m_Y);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<178>";
	if(t_sep_length_squared<dbg_object(c_SAT.m_info).m_LengthSquared || dbg_object(c_SAT.m_info).m_LengthSquared<0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<179>";
		dbg_object(c_SAT.m_info).m_LengthSquared=t_sep_length_squared;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<180>";
		dbg_object(dbg_object(c_SAT.m_info).m_mtd).m_X=dbg_object(c_SAT.m_sep).m_X;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<181>";
		dbg_object(dbg_object(c_SAT.m_info).m_mtd).m_Y=dbg_object(c_SAT.m_sep).m_Y;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<184>";
	pop_err();
	return false;
}
c_SAT.m_PolyVsPoly=function(t_r1,t_r2,t_rtn){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<85>";
	if(t_rtn!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<86>";
		dbg_object(t_rtn).m_X=0.0;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<87>";
		dbg_object(t_rtn).m_Y=0.0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<90>";
	dbg_object(dbg_object(c_SAT.m_info).m_mtd).m_X=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<91>";
	dbg_object(dbg_object(c_SAT.m_info).m_mtd).m_Y=0.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<93>";
	dbg_object(c_SAT.m_info).m_LengthSquared=-1.0;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<94>";
	dbg_object(c_SAT.m_info).m_overlap=true;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<96>";
	var t_j=t_r1.p_Vertices().p_Length2()-1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<98>";
	for(var t_i=0;t_i<t_r1.p_Vertices().p_Length2();t_i=t_i+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<100>";
		var t_v0=t_r1.p_Vertices().p_Get(t_j);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<101>";
		var t_v1=t_r1.p_Vertices().p_Get(t_i);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<103>";
		dbg_object(c_SAT.m_edge).m_X=t_v1.p_X2()-t_v0.p_X2();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<104>";
		dbg_object(c_SAT.m_edge).m_Y=t_v1.p_Y2()-t_v0.p_Y2();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<106>";
		c_SAT.m_edge.p_Perp(c_SAT.m_axis);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<108>";
		if(c_SAT.m_separatedByAxis(t_r1,t_r2,c_SAT.m_axis)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<109>";
			dbg_object(c_SAT.m_info).m_overlap=false;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<112>";
		t_j=t_i;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<116>";
	t_j=t_r2.p_Vertices().p_Length2()-1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<118>";
	for(var t_i2=0;t_i2<t_r2.p_Vertices().p_Length2();t_i2=t_i2+1){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<120>";
		var t_v02=t_r2.p_Vertices().p_Get(t_j);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<121>";
		var t_v12=t_r2.p_Vertices().p_Get(t_i2);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<123>";
		dbg_object(c_SAT.m_edge).m_X=t_v12.p_X2()-t_v02.p_X2();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<124>";
		dbg_object(c_SAT.m_edge).m_Y=t_v12.p_Y2()-t_v02.p_Y2();
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<126>";
		c_SAT.m_edge.p_Perp(c_SAT.m_axis);
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<128>";
		if(c_SAT.m_separatedByAxis(t_r1,t_r2,c_SAT.m_axis)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<129>";
			dbg_object(c_SAT.m_info).m_overlap=false;
		}
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<132>";
		t_j=t_i2;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<136>";
	if(dbg_object(c_SAT.m_info).m_overlap && t_rtn!=null){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<137>";
		dbg_object(t_rtn).m_X=-dbg_object(dbg_object(c_SAT.m_info).m_mtd).m_X;
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<138>";
		dbg_object(t_rtn).m_Y=-dbg_object(dbg_object(c_SAT.m_info).m_mtd).m_Y;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<141>";
	pop_err();
	return dbg_object(c_SAT.m_info).m_overlap;
}
c_SAT.m_Collide=function(t_r1,t_r2,t_rtn){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<17>";
	if(t_r1.p_GetType()==3 && t_r2.p_GetType()==3){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<18>";
		var t_=c_SAT.m_RectVsRect(t_r1,t_r2,t_rtn);
		pop_err();
		return t_;
	}else{
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<20>";
		if(c_Collision.m_AABBIntersects(t_r1,t_r2)){
			err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<21>";
			var t_2=c_SAT.m_PolyVsPoly(t_r1,t_r2,t_rtn);
			pop_err();
			return t_2;
		}
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<25>";
	pop_err();
	return false;
}
function bb_math_Abs(t_x){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<46>";
	if(t_x>=0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<46>";
		pop_err();
		return t_x;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<73>";
	if(t_x>=0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<73>";
		pop_err();
		return t_x;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Sgn(t_x){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<41>";
	if(t_x<0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<41>";
		pop_err();
		return -1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<42>";
	var t_=((t_x>0)?1:0);
	pop_err();
	return t_;
}
function bb_math_Sgn2(t_x){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<67>";
	if(t_x<0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<67>";
		pop_err();
		return -1.0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<68>";
	if(t_x>0.0){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<68>";
		pop_err();
		return 1.0;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/math.monkey<69>";
	pop_err();
	return 0.0;
}
function c_lpCollisionInfo(){
	Object.call(this);
	this.m_mtd=c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
	this.m_LengthSquared=0.0;
	this.m_overlap=false;
}
c_lpCollisionInfo.m_new=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/collision/sat.monkey<5>";
	pop_err();
	return this;
}
function c_Enumerator10(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator10.m_new=function(t_list){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator10.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator10.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator10.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function bb_input_KeyDown(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/input.monkey<40>";
	var t_=((bb_input_device.p_KeyDown(t_key))?1:0);
	pop_err();
	return t_;
}
function bb_input_KeyHit(t_key){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/input.monkey<44>";
	var t_=bb_input_device.p_KeyHit(t_key);
	pop_err();
	return t_;
}
function c_Enumerator11(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator11.m_new=function(t_list){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator11.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator11.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator11.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function c_Math(){
	Object.call(this);
}
c_Math.m_Round=function(t_N){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/functions.monkey<17>";
	var t_int_part=((t_N)|0);
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/functions.monkey<19>";
	if(t_N-(t_int_part)>=0.5){
		err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/functions.monkey<20>";
		t_int_part+=1;
	}
	err_info="/Users/ricardo/MonkeyXPro82a/modules_ext/lp2/math/functions.monkey<23>";
	var t_=(t_int_part);
	pop_err();
	return t_;
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<53>";
	if(((t_sound)!=null) && ((dbg_object(t_sound).m_sample)!=null)){
		err_info="/Users/ricardo/MonkeyXPro82a/modules/mojo/audio.monkey<53>";
		bb_audio_device.PlaySample(dbg_object(t_sound).m_sample,t_channel,t_flags);
	}
	pop_err();
	return 0;
}
function c_Enumerator12(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator12.m_new=function(t_stack){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator12.m_new2=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator12.prototype.p_HasNext=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator12.prototype.p_NextObject=function(){
	push_err();
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Users/ricardo/MonkeyXPro82a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	c_Game.m__instance=null;
	c_Stack3.m_NIL=null;
	c_Time.m__frozen=false;
	c_Time.m__aux_time=0;
	c_Time.m__frozen_time=0;
	c_Time.m__time_last_update=0;
	c_Time.m__delta=0;
	c_Time.m__delta_secs=.0;
	c_Time.m__slow_down=false;
	c_Time.m__slow_down_aux_time=0;
	c_Time.m__slow_down_time=0;
	c_Time.m__slow_down_factor=0.0;
	bb_game_LONENTERLOADING=0;
	bb_game_LONLOADING=1;
	bb_game_LONPLAYING=3;
	bb_asyncevent__current=null;
	bb_asyncevent__sources=c_Stack4.m_new.call(new c_Stack4);
	c_Stack4.m_NIL=null;
	bb_game_LONENTERSCENE=2;
	c_lpResources.m__instance=c_lpResources.m_new.call(new c_lpResources);
	bb_app__updateRate=0;
	bb_consts2_COLOR_4=[231,214,156];
	bb_consts2_COLOR_1=[57,57,41];
	c_Stack5.m_NIL=null;
	c_Stack6.m_NIL=null;
	c_Stack7.m_NIL=null;
	c_JSONToken.m_reusableToken=c_JSONToken.m_new.call(new c_JSONToken,-1,null);
	c_Stack9.m_NIL="";
	c_CollisionEngine.m_instance=null;
	c_BulletsEngine.m_instance=null;
	c_Stack12.m_NIL=0;
	c_Stack13.m_NIL=null;
	c_Stack14.m_NIL=null;
	bb_random_Seed=1234;
	c_ParticleEmitter.m_TYPE_CIRCLE=0;
	c_ParticleEmitter.m_COLOR_RANDOM=0;
	c_Stack8.m_NIL=null;
	c_Stack10.m_NIL=null;
	c_SAT.m_info=c_lpCollisionInfo.m_new.call(new c_lpCollisionInfo);
	c_Stack2.m_NIL=null;
	c_SAT.m_edge=c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
	c_SAT.m_axis=c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
	c_SAT.m_mina=.0;
	c_SAT.m_maxa=.0;
	c_SAT.m_minb=.0;
	c_SAT.m_maxb=.0;
	c_SAT.m_sep=c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
	c_Bullet.m_sound=null;
}
//${TRANSCODE_END}
