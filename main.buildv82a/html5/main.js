
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CONFIG="release";
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
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
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
	this.m__lastSceneId=0;
	this.implments={c_iDrawable:1};
}
c_Game.prototype=extend_class(c_App);
c_Game.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_Game.m__instance=null;
c_Game.prototype.p_Create=function(){
}
c_Game.prototype.p_PostCreate=function(){
	var t_=this.m__currentScene.p_GetChildren().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_l=t_.p_NextObject();
		t_l.p_Create();
	}
	var t_2=this.m__currentScene.p_GetGui().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_l2=t_2.p_NextObject();
		t_l2.p_Create();
	}
}
c_Game.prototype.p_OnCreate=function(){
	c_Game.m__instance=this;
	this.m__loadingTween=c_lpTween.m_CreateLinear(0.0,1.0,300.0,false);
	var t_defCamera=c_lpCamera.m_new.call(new c_lpCamera,0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()),0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	this.m__currentCamera=t_defCamera;
	this.p_Create();
	if(this.m__currentScene==null){
		error("Debes crear una escena, implementa 'Method GetScene:Scene(id:Int)'");
	}
	if(0>=this.m__currentScene.p_Cameras().p_Length2()){
		this.m__currentScene.p_AddCamera(t_defCamera);
	}
	if(this.m__currentScene.p_AutoCreate()){
		this.p_PostCreate();
	}
	return 0;
}
c_Game.prototype.p_Update=function(){
}
c_Game.prototype.p_OnUpdate=function(){
	c_Time.m_OnUpdate();
	if(this.m__loadingState==bb_game_LONLOADING){
		this.m__currentScene.p_SetLoadingState(this.m__currentScene.p_Loading());
	}
	if(this.m__loadingState==bb_game_LONPLAYING){
		if(this.m__showPopup){
			this.m__currentPopup.p_Update();
		}else{
			this.m__currentScene.p_Update();
			this.p_Update();
		}
		bb_asyncevent_UpdateAsyncEvents();
	}
	return 0;
}
c_Game.prototype.p_OnLoading=function(){
	return 0;
}
c_Game.prototype.p_OnBack=function(){
	if(this.m__showPopup){
		this.m__currentPopup.p_Back();
	}
	return this.m__currentScene.p_Back();
}
c_Game.prototype.p_OnSuspend=function(){
	this.m__currentScene.p_Suspend();
	return 0;
}
c_Game.prototype.p_Render=function(){
}
c_Game.prototype.p_ToastRender=function(){
	if(this.m_toast_tail!=null && this.m_toast_tail.p_Count()>0){
		var t_alpha=0.0;
		var t_color=bb_graphics_GetColor();
		var t_1=this.m_toast_state_machine;
		if(t_1==3){
			this.m_toast_state_machine=0;
		}else{
			if(t_1==2){
				this.m_toast_timer+=c_Time.m_Delta();
				t_alpha=1.0-(this.m_toast_timer)/((this.m_toast_animation_time)*0.2);
				if((this.m_toast_timer)>=(this.m_toast_animation_time)*0.2){
					this.m_toast_state_machine=3;
					this.m_toast_timer=0;
					this.m_toast_tail.p_RemoveLast();
					t_alpha=0.0;
				}
			}else{
				if(t_1==1){
					this.m_toast_timer+=c_Time.m_Delta();
					if((this.m_toast_timer)>=(this.m_toast_animation_time)*0.6){
						this.m_toast_state_machine=2;
						this.m_toast_timer=0;
					}
					t_alpha=1.0;
				}else{
					if(t_1==0){
						this.m_toast_timer+=c_Time.m_Delta();
						t_alpha=(this.m_toast_timer)/((this.m_toast_animation_time)*0.2);
						if((this.m_toast_timer)>=(this.m_toast_animation_time)*0.2){
							this.m_toast_state_machine=1;
							this.m_toast_timer=0;
							t_alpha=1.0;
						}
					}
				}
			}
		}
		if(this.m_toast_state_machine!=3){
			bb_graphics_PushMatrix();
			if(this.m_toast_font!=null){
				bb_graphics_SetAlpha(t_alpha);
				bb_graphics_SetColor(0.0,0.0,0.0);
				bb_graphics_DrawRect(10.0,(bb_app_DeviceHeight()-80),(bb_app_DeviceWidth()-20),(this.m_toast_font.p_TextHeight(this.m_toast_tail.p_First())*2));
				bb_graphics_SetColor(t_color[0],t_color[1],t_color[2]);
				this.m_toast_font.p_DrawText(this.m_toast_tail.p_First(),(((bb_app_DeviceWidth())*0.5)|0),bb_app_DeviceHeight()-80,1,0.0);
			}else{
				bb_graphics_SetAlpha(t_alpha);
				bb_graphics_SetColor(0.0,0.0,0.0);
				bb_graphics_DrawRect(10.0,(bb_app_DeviceHeight()-40),(bb_app_DeviceWidth()-20),20.0);
				bb_graphics_SetColor(t_color[0],t_color[1],t_color[2]);
				bb_graphics_DrawText(this.m_toast_tail.p_First(),20.0,(bb_app_DeviceHeight()-35),0.0,0.0);
			}
			bb_graphics_PopMatrix();
		}
	}
}
c_Game.prototype.p_OnRender=function(){
	bb_graphics_Cls(this.m__clsColor.m_r,this.m__clsColor.m_g,this.m__clsColor.m_b);
	if(this.m__loadingState==bb_game_LONENTERLOADING){
		if(!this.m__loadingTween.p_IsRunning()){
			this.m__loadingTween.p_Start();
		}
		this.m__loadingTween.p_Update();
		bb_graphics_SetAlpha(this.m__loadingTween.p_GetCurrentValue());
		this.m__currentScene.p_LoadingRender();
		if(this.m__loadingTween.p_GetCurrentValue()==1.0){
			this.m__loadingState=bb_game_LONLOADING;
		}
		return 0;
	}
	if(this.m__loadingState==bb_game_LONLOADING){
		if(this.m__currentScene.p_GetLoadingState()<=0){
			this.m__loadingState=bb_game_LONENTERSCENE;
			this.m__loadingTween.p_SetValues(1.0,0.0);
		}
		bb_lpresources_lpLoadToVideoMemory();
		this.m__currentScene.p_LoadingRender();
		return 0;
	}
	if(this.m__loadingState==bb_game_LONENTERSCENE){
		if(!this.m__loadingTween.p_IsRunning()){
			this.m__loadingTween.p_Start();
		}
		this.m__loadingTween.p_Update();
		bb_graphics_SetAlpha(this.m__loadingTween.p_GetCurrentValue());
		this.m__currentScene.p_LoadingRender();
		if(this.m__loadingTween.p_GetCurrentValue()==0.0){
			this.m__loadingState=bb_game_LONPLAYING;
		}
		return 0;
	}
	var t_=this.m__currentScene.p_Cameras().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_c=t_.p_NextObject();
		bb_graphics_PushMatrix();
		this.m__currentCamera=t_c;
		if(t_c.m_Position.p_Width()!=t_c.m_ViewPort.p_Width() || t_c.m_Position.p_Height()!=t_c.m_ViewPort.p_Height()){
			bb_graphics_Scale(t_c.m_Position.p_Width()/t_c.m_ViewPort.p_Width(),t_c.m_Position.p_Height()/t_c.m_ViewPort.p_Height());
			bb_graphics_Translate(-(t_c.m_ViewPort.p_X2()*bb_graphics_GetMatrix()[0]-t_c.m_Position.p_X2())/bb_graphics_GetMatrix()[0],-(t_c.m_ViewPort.p_Y2()*bb_graphics_GetMatrix()[3]-t_c.m_Position.p_Y2())/bb_graphics_GetMatrix()[3]);
		}else{
			bb_graphics_Translate(-(t_c.m_ViewPort.p_X2()-t_c.m_Position.p_X2())/bb_graphics_GetMatrix()[0],-(t_c.m_ViewPort.p_Y2()-t_c.m_Position.p_Y2())/bb_graphics_GetMatrix()[3]);
		}
		bb_graphics_SetScissor(t_c.m_Position.p_X2(),t_c.m_Position.p_Y2(),t_c.m_Position.p_Width(),t_c.m_Position.p_Height());
		this.m__currentScene.p_Render();
		this.p_Render();
		bb_graphics_PopMatrix();
	}
	var t_2=this.m__currentScene.p_GetGui().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_gui=t_2.p_NextObject();
		bb_graphics_PushMatrix();
		bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
		t_gui.p_Render();
		bb_graphics_PopMatrix();
	}
	if(this.m__showPopup){
		bb_graphics_PushMatrix();
		bb_graphics_Scale((bb_app_DeviceWidth())/this.m__currentPopup.p_ViewPort().p_X2(),(bb_app_DeviceHeight())/this.m__currentPopup.p_ViewPort().p_Y2());
		bb_graphics_SetAlpha(this.m__currentPopup.p_GetBakgroundAlpha());
		bb_graphics_SetColor(0.0,0.0,0.0);
		bb_graphics_DrawRect(0.0,0.0,(bb_app_DeviceWidth()*3),(bb_app_DeviceHeight())/bb_graphics_GetMatrix()[3]);
		bb_graphics_SetColor(255.0,255.0,255.0);
		bb_graphics_SetAlpha(1.0);
		this.m__currentPopup.p_Render();
		bb_graphics_PopMatrix();
	}
	this.p_ToastRender();
	lp.ResetValues();
	return 0;
}
c_Game.prototype.p_HidePopup=function(){
	this.m__showPopup=false;
}
c_Game.prototype.p_GetScene=function(t_id){
}
c_Game.prototype.p_SetScene=function(t_id,t_parameters){
	this.p_HidePopup();
	if(this.m__lastSceneId!=t_id){
		bb_lpresources_lpFreeMemory();
	}
	this.m__lastSceneId=t_id;
	this.m__loadingState=bb_game_LONENTERLOADING;
	this.m__loadingTween.p_SetValues(0.0,1.0);
	this.m__loadingTween.p_Start();
	this.m__currentScene=this.p_GetScene(t_id);
	if(null!=t_parameters){
		this.m__currentScene.p_Parameters(t_parameters);
	}
	var t_defCamera=c_lpCamera.m_new.call(new c_lpCamera,0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()),0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	this.m__currentCamera=t_defCamera;
	this.m__currentScene.p_Create();
	if(0>=this.m__currentScene.p_Cameras().p_Length2()){
		this.m__currentScene.p_AddCamera(t_defCamera);
	}
}
c_Game.m_Instance=function(){
	return c_Game.m__instance;
}
c_Game.prototype.p_GetCurrentCamera=function(){
	return this.m__currentCamera;
}
function c_GBNova(){
	c_Game.call(this);
	this.implments={c_iDrawable:1};
}
c_GBNova.prototype=extend_class(c_Game);
c_GBNova.m_new=function(){
	c_Game.m_new.call(this);
	return this;
}
c_GBNova.prototype.p_Create=function(){
	bb_app_SetUpdateRate(0);
	enablePixelArt();
	this.p_SetScene(0,null);
}
c_GBNova.prototype.p_GetScene=function(t_scene){
	var t_1=t_scene;
	if(t_1==0){
		return (c_GameScene.m_new.call(new c_GameScene));
	}
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
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_GBNova.m_new.call(new c_GBNova);
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
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
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
c_Image.prototype.p_Frames=function(){
	return this.m_frames.length;
}
c_Image.prototype.p_Discard=function(){
	if(((this.m_surface)!=null) && !((this.m_source)!=null)){
		this.m_surface.Discard();
		this.m_surface=null;
	}
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
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
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
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
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
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set(t_key,t_value);
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
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
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
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
	this.m__function=t_funct;
	this.m__initialValue=t_initValue;
	this.m__currentValue=t_initValue;
	this.m__endValue=t_endValue;
	this.m__time=t_time;
	this.m__easing=t_easing;
	this.m__loop=t_loop;
	return this;
}
c_lpTween.m_new2=function(){
	return this;
}
c_lpTween.m_CreateLinear=function(t_initValue,t_endValue,t_time,t_loop){
	return c_lpTween.m_new.call(new c_lpTween,0,t_initValue,t_endValue,t_time,((t_loop)?1:0),false);
}
c_lpTween.prototype.p_IsRunning=function(){
	return this.m__running;
}
c_lpTween.prototype.p_Start=function(){
	this.m__beginTime=(bb_app_Millisecs());
	this.m__running=true;
	this.m__currentValue=this.m__initialValue;
}
c_lpTween.prototype.p_LinearUpdate=function(t_t,t_b,t_c,t_d){
	this.m__currentValue=t_c*t_t/t_d+t_b;
}
c_lpTween.prototype.p_QuadUpdate=function(t_easing,t_t,t_b,t_c,t_d){
	var t_2=t_easing;
	if(t_2==0){
		t_t/=t_d;
		this.m__currentValue=t_c*t_t*t_t+t_b;
	}else{
		if(t_2==1){
			t_t/=t_d;
			this.m__currentValue=-t_c*t_t*(t_t-2.0)+t_b;
		}else{
			if(t_2==2){
				t_t/=t_d/2.0;
				if(t_t<1.0){
					this.m__currentValue=t_c/2.0*t_t*t_t+t_b;
				}
				t_t=t_t-1.0;
				this.m__currentValue=-t_c/2.0*(t_t*(t_t-2.0)-1.0)+t_b;
			}
		}
	}
}
c_lpTween.prototype.p_CubicUpdate=function(t_easing,t_t,t_b,t_c,t_d){
	var t_3=t_easing;
	if(t_3==0){
		t_t/=t_d;
		this.m__currentValue=t_c*t_t*t_t*t_t+t_b;
	}else{
		if(t_3==1){
			t_t/=t_d;
			t_t=t_t-1.0;
			this.m__currentValue=t_c*(t_t*t_t*t_t+1.0)+t_b;
		}else{
			if(t_3==2){
				t_t/=t_d/2.0;
				if(t_t<1.0){
					this.m__currentValue=t_c/2.0*t_t*t_t*t_t+t_b;
				}
				t_t=t_t-2.0;
				this.m__currentValue=t_c/2.0*(t_t*t_t*t_t+2.0)+t_b;
			}
		}
	}
}
c_lpTween.prototype.p_BackUpdate=function(t_easing,t_t,t_b,t_c,t_d){
	var t_4=t_easing;
	if(t_4==0){
		var t_s=1.70158;
		t_t/=t_d;
		this.m__currentValue=t_c*t_t*t_t*((t_s+1.0)*t_t-t_s)+t_b;
	}else{
		if(t_4==1){
			var t_s2=1.70158;
			t_t=t_t/t_d-1.0;
			this.m__currentValue=t_c*(t_t*t_t*((t_s2+1.0)*t_t+t_s2)+1.0)+t_b;
		}else{
			if(t_4==2){
				var t_s3=1.70158;
				t_s3*=1.525;
				if(t_t<1.0){
					t_t/=t_d/2.0;
					this.m__currentValue=t_c/2.0*(t_t*t_t*((t_s3+1.0)*t_t-t_s3))+t_b;
				}else{
					t_t=t_t-2.0;
					this.m__currentValue=t_c/2.0*(t_t*t_t*((t_s3+1.0)*t_t+t_s3)+2.0)+t_b;
				}
			}
		}
	}
}
c_lpTween.prototype.p_SetInitialValue=function(t_v){
	this.m__initialValue=t_v;
	this.m__currentValue=t_v;
}
c_lpTween.prototype.p_SetEndValue=function(t_v){
	this.m__endValue=t_v;
}
c_lpTween.prototype.p_SetValues=function(t_v1,t_v2){
	this.p_SetInitialValue(t_v1);
	this.p_SetEndValue(t_v2);
}
c_lpTween.prototype.p_Update=function(){
	var t_currentTime=0.0;
	if(this.m__running){
		t_currentTime=(bb_app_Millisecs())-this.m__beginTime;
		var t_1=this.m__function;
		if(t_1==0){
			this.p_LinearUpdate(t_currentTime,this.m__initialValue,this.m__endValue-this.m__initialValue,this.m__time);
		}else{
			if(t_1==1){
				this.p_QuadUpdate(this.m__easing,t_currentTime,this.m__initialValue,this.m__endValue-this.m__initialValue,this.m__time);
			}else{
				if(t_1==2){
					this.p_CubicUpdate(this.m__easing,t_currentTime,this.m__initialValue,this.m__endValue-this.m__initialValue,this.m__time);
				}else{
					if(t_1==3){
						this.p_BackUpdate(this.m__easing,t_currentTime,this.m__initialValue,this.m__endValue-this.m__initialValue,this.m__time);
					}
				}
			}
		}
	}
	if(t_currentTime>=this.m__time){
		this.m__currentValue=this.m__endValue;
		this.m__running=false;
		if(this.m__loop){
			print("llega");
			this.p_SetValues(this.m__initialValue,this.m__endValue);
			this.p_Start();
		}
	}
}
c_lpTween.prototype.p_GetCurrentValue=function(){
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
	this.m_Position=c_Rectangle.m_new3.call(new c_Rectangle,t_px,t_py,t_pw,t_ph);
	this.m_ViewPort=c_Rectangle.m_new3.call(new c_Rectangle,t_vx,t_vy,t_vw,t_vh);
	this.m__firstViewPort=c_Rectangle.m_new3.call(new c_Rectangle,t_vx,t_vy,t_vw,t_vh);
}
c_lpCamera.m_new=function(t_px,t_py,t_pw,t_ph,t_vx,t_vy,t_vw,t_vh){
	this.p__init(t_px,t_py,t_pw,t_ph,t_vx,t_vy,t_vw,t_vh);
	return this;
}
c_lpCamera.prototype.p_Create=function(){
}
c_lpCamera.prototype.p_Render=function(){
}
c_lpCamera.prototype.p_Update=function(){
}
function c_ShapeBase(){
	Object.call(this);
}
c_ShapeBase.m_new=function(){
	return this;
}
c_ShapeBase.prototype.p_Render=function(){
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
	c_ShapeBase.m_new.call(this);
	this.m__x=0.0;
	this.m__y=0.0;
	return this;
}
c_Point.m_new2=function(t_x,t_y){
	c_ShapeBase.m_new.call(this);
	this.m__x=t_x;
	this.m__y=t_y;
	return this;
}
c_Point.prototype.p_X=function(t_x){
	this.m__x=t_x;
	return this.m__x;
}
c_Point.prototype.p_X2=function(){
	return this.m__x;
}
c_Point.prototype.p_Y=function(t_y){
	this.m__y=t_y;
	return this.m__y;
}
c_Point.prototype.p_Y2=function(){
	return this.m__y;
}
c_Point.prototype.p_Render=function(){
	bb_graphics_DrawCircle(this.p_X2(),this.p_Y2(),10.0);
}
c_Point.prototype.p_GetType=function(){
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
	this.m_mmax.p_X(t_w);
	return 0;
}
c_Rectangle.prototype.p_Width=function(){
	return this.m_mmax.p_X2();
}
c_Rectangle.prototype.p_Height2=function(t_h){
	this.m_mmax.p_Y(t_h);
	return 0;
}
c_Rectangle.prototype.p_Height=function(){
	return this.m_mmax.p_Y2();
}
c_Rectangle.prototype.p__init2=function(){
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
	this.m__points_stack.p_Push4(c_Point.m_new.call(new c_Point));
}
c_Rectangle.m_new=function(){
	c_Point.m_new2.call(this,0.0,0.0);
	this.p_Width2(0.0);
	this.p_Height2(0.0);
	this.p__init2();
	return this;
}
c_Rectangle.m_new2=function(t_avoidpoly){
	c_Point.m_new2.call(this,0.0,0.0);
	this.p_X(0.0);
	this.p_Y(0.0);
	this.p_Width2(0.0);
	this.p_Height2(0.0);
	return this;
}
c_Rectangle.m_new3=function(t_x,t_y,t_width,t_height){
	c_Point.m_new2.call(this,t_x,t_y);
	this.p_Width2(t_width);
	this.p_Height2(t_height);
	this.p__init2();
	return this;
}
c_Rectangle.prototype.p_GetType=function(){
	return 3;
}
c_Rectangle.prototype.p_PointStack=function(){
	return this.m__points_stack;
}
c_Rectangle.prototype.p_Vertices=function(){
	this.p_PointStack().p_Get(0).p_X(this.p_X2());
	this.p_PointStack().p_Get(0).p_Y(this.p_Y2());
	this.p_PointStack().p_Get(1).p_X(this.p_X2()+this.p_Width());
	this.p_PointStack().p_Get(1).p_Y(this.p_Y2());
	this.p_PointStack().p_Get(2).p_X(this.p_X2()+this.p_Width());
	this.p_PointStack().p_Get(2).p_Y(this.p_Y2()+this.p_Height());
	this.p_PointStack().p_Get(3).p_X(this.p_X2());
	this.p_PointStack().p_Get(3).p_Y(this.p_Y2()+this.p_Height());
	return this.m__points_stack;
}
c_Rectangle.prototype.p_Min=function(t_m){
	this.m_min=t_m;
}
c_Rectangle.prototype.p_Min2=function(){
	return this.m_min;
}
c_Rectangle.prototype.p_Max=function(t_m){
	this.m_max=t_m;
}
c_Rectangle.prototype.p_Max2=function(){
	return this.m_max;
}
c_Rectangle.prototype.p_CenterX=function(){
	return this.p_X2()+this.p_Width()/2.0;
}
c_Rectangle.prototype.p_CenterY=function(){
	return this.p_Y2()+this.p_Height()/2.0;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack2.m_NIL=null;
c_Stack2.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack2.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack2.prototype.p_Length2=function(){
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
	return this.m__cameras;
}
c_Scene.prototype.p_AddCamera=function(t_camera){
	this.m__cameras.p_Push7(t_camera);
}
c_Scene.prototype.p_AutoCreate=function(){
	return this.m__autocreate;
}
c_Scene.prototype.p_GetChildren=function(){
	return this.m__children;
}
c_Scene.prototype.p_GetGui=function(){
	return this.m__gui;
}
c_Scene.prototype.p_Loading=function(){
}
c_Scene.prototype.p_SetLoadingState=function(t_state){
	this.m__loadingState=t_state;
}
c_Scene.prototype.p_Update=function(){
	if(!this.m__pause){
		var t_=this.m__children.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_layer=t_.p_NextObject();
			t_layer.p_Update();
		}
	}
	if(!this.m__pausegui){
		var t_2=this.m__gui.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_gui=t_2.p_NextObject();
			t_gui.p_Update();
		}
	}
}
c_Scene.prototype.p_Back=function(){
	return 0;
}
c_Scene.prototype.p_Suspend=function(){
}
c_Scene.prototype.p_LoadingRender=function(){
}
c_Scene.prototype.p_GetLoadingState=function(){
	return this.m__loadingState;
}
c_Scene.prototype.p_Render=function(){
	var t_=this.m__children.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_layer=t_.p_NextObject();
		t_layer.p_Render();
	}
}
c_Scene.prototype.p_Parameters=function(t_m){
	this.m__parameters=t_m;
}
c_Scene.prototype.p_Parameters2=function(){
	return this.m__parameters;
}
c_Scene.prototype.p_Create=function(){
}
c_Scene.m_new=function(){
	return this;
}
c_Scene.prototype.p_AddChild=function(t_layer,t_create){
	this.m__children.p_AddLast(t_layer);
	if(t_create){
		t_layer.p_Create();
	}
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack3.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack3.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack3.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
c_Stack3.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	return c_Node2.m_new.call(new c_Node2,this.m__head,this.m__head.m__pred,t_data);
}
c_List.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast(t_t);
	}
	return this;
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
function c_Node2(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node2.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
function c_HeadNode(){
	c_Node2.call(this);
}
c_HeadNode.prototype=extend_class(c_Node2);
c_HeadNode.m_new=function(){
	c_Node2.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
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
	if(c_Time.m__aux_time>=c_Time.m__frozen_time){
		c_Time.m__frozen=false;
		c_Time.m__aux_time=0;
	}
	c_Time.m__aux_time+=bb_app_Millisecs()-c_Time.m__time_last_update;
	c_Time.m__time_last_update=bb_app_Millisecs();
	c_Time.m__delta=1;
	c_Time.m__delta_secs=0.001;
}
c_Time.m__slow_down=false;
c_Time.m__slow_down_aux_time=0;
c_Time.m__slow_down_time=0;
c_Time.m__slow_down_factor=0;
c_Time.m_processSlowDown=function(){
	if(c_Time.m__slow_down_aux_time>=c_Time.m__slow_down_time){
		c_Time.m__slow_down=false;
		c_Time.m__slow_down_aux_time=0;
	}
	c_Time.m__slow_down_aux_time+=c_Time.m__delta;
	c_Time.m__delta=(((c_Time.m__delta)*c_Time.m__slow_down_factor)|0);
	c_Time.m__delta_secs*=c_Time.m__slow_down_factor;
}
c_Time.m_OnUpdate=function(){
	if(c_Time.m__frozen){
		c_Time.m_processFrozen();
		return;
	}
	c_Time.m__delta=bb_app_Millisecs()-c_Time.m__time_last_update;
	c_Time.m__time_last_update=bb_app_Millisecs();
	c_Time.m__delta_secs=(c_Time.m__delta)/1000.0;
	if(c_Time.m__slow_down){
		c_Time.m_processSlowDown();
		return;
	}
}
c_Time.m_Delta=function(){
	return c_Time.m__delta;
}
c_Time.m_DeltaSecs=function(){
	return c_Time.m__delta_secs;
}
c_Time.m_SlowDown=function(t_factor,t_millis){
	if(!c_Time.m__slow_down){
		c_Time.m__slow_down=true;
		c_Time.m__slow_down_factor=t_factor;
		c_Time.m__slow_down_time=t_millis;
	}
	return 0;
}
c_Time.m_Freeze=function(t_millis){
	if(!c_Time.m__frozen){
		c_Time.m__frozen=true;
		c_Time.m__frozen_time=t_millis;
	}
	return 0;
}
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
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
	print("lpPopup.Back()");
}
c_Popup.prototype.p_ViewPort=function(){
	return this.m_view_port;
}
c_Popup.prototype.p_GetBakgroundAlpha=function(){
	return this.m_backgroundAlpha;
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
	return this;
}
c_Stack4.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack4.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack4.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack4.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
var bb_asyncevent__sources=null;
function bb_asyncevent_UpdateAsyncEvents(){
	if((bb_asyncevent__current)!=null){
		return 0;
	}
	var t_i=0;
	while(t_i<bb_asyncevent__sources.p_Length2()){
		bb_asyncevent__current=bb_asyncevent__sources.p_Get(t_i);
		bb_asyncevent__current.p_UpdateAsyncEvents();
		if((bb_asyncevent__current)!=null){
			t_i+=1;
		}
	}
	bb_asyncevent__current=null;
	return 0;
}
function c_lpColor(){
	Object.call(this);
	this.m_r=.0;
	this.m_g=.0;
	this.m_b=.0;
}
c_lpColor.m_new=function(){
	this.m_r=0.0;
	this.m_g=0.0;
	this.m_b=0.0;
	return this;
}
c_lpColor.m_new2=function(t_r,t_g,t_b){
	this.m_r=t_r;
	this.m_g=t_g;
	this.m_b=t_b;
	return this;
}
c_lpColor.m_Black=function(){
	return c_lpColor.m_new.call(new c_lpColor);
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
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
	this.m_images=c_StringMap.m_new.call(new c_StringMap);
	this.m_pimages=c_StringMap.m_new.call(new c_StringMap);
	this.m_sounds=c_StringMap2.m_new.call(new c_StringMap2);
	this.m_translations=c_StringMap3.m_new.call(new c_StringMap3);
	return this;
}
c_lpResources.m__instance=null;
c_lpResources.m_GetInstance=function(){
	return c_lpResources.m__instance;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Values=function(){
	return c_MapValues.m_new.call(new c_MapValues,this);
}
c_Map2.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map2.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map2.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Set2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map2.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.prototype.p_Discard=function(){
	if((this.m_sample)!=null){
		this.m_sample.Discard();
		this.m_sample=null;
	}
	return 0;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Values=function(){
	return c_MapValues2.m_new.call(new c_MapValues2,this);
}
c_Map3.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map3.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
function c_StringMap2(){
	c_Map3.call(this);
}
c_StringMap2.prototype=extend_class(c_Map3);
c_StringMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map4.prototype.p_Set3=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node12.m_new.call(new c_Node12,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap3(){
	c_Map4.call(this);
}
c_StringMap3.prototype=extend_class(c_Map4);
c_StringMap3.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_MapValues(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues.m_new2=function(){
	return this;
}
c_MapValues.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator.m_new.call(new c_ValueEnumerator,this.m_map.p_FirstNode());
}
function c_ValueEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator.m_new2=function(){
	return this;
}
c_ValueEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
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
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	if(t_sp==bb_graphics_context.m_matrixStack.length){
		bb_graphics_context.m_matrixStack=resize_number_array(bb_graphics_context.m_matrixStack,t_sp*2);
	}
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_lpresources_lpLoadToVideoMemory(){
	var t_r=c_lpResources.m_GetInstance();
	var t_=t_r.m_images.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_i=t_.p_NextObject();
		if((t_i)!=null){
			bb_graphics_DrawImage(t_i,0.0,0.0,0);
		}
	}
}
function c_Enumerator2(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator2.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator2.m_new2=function(){
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator2.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function bb_graphics_GetMatrix(){
	return [bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty];
}
function bb_graphics_GetMatrix2(t_matrix){
	t_matrix[0]=bb_graphics_context.m_ix;
	t_matrix[1]=bb_graphics_context.m_iy;
	t_matrix[2]=bb_graphics_context.m_jx;
	t_matrix[3]=bb_graphics_context.m_jy;
	t_matrix[4]=bb_graphics_context.m_tx;
	t_matrix[5]=bb_graphics_context.m_ty;
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	return 0;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List2.prototype.p_RemoveLast=function(){
	var t_data=this.m__head.m__pred.m__data;
	this.m__head.m__pred.p_Remove();
	return t_data;
}
c_List2.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List2.prototype.p_FindLast=function(t_value,t_start){
	while(t_start!=this.m__head){
		if(this.p_Equals(t_value,t_start.m__data)){
			return t_start;
		}
		t_start=t_start.m__pred;
	}
	return null;
}
c_List2.prototype.p_FindLast2=function(t_value){
	return this.p_FindLast(t_value,this.m__head.m__pred);
}
c_List2.prototype.p_RemoveLast2=function(t_value){
	var t_node=this.p_FindLast2(t_value);
	if((t_node)!=null){
		t_node.p_Remove();
	}
}
c_List2.prototype.p_First=function(){
	return this.m__head.m__succ.m__data;
}
function c_StringList(){
	c_List2.call(this);
}
c_StringList.prototype=extend_class(c_List2);
c_StringList.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
function c_Node4(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data="";
}
c_Node4.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
c_Node4.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode2(){
	c_Node4.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node4);
c_HeadNode2.m_new=function(){
	c_Node4.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function bb_graphics_GetColor(){
	return [bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b];
}
function bb_graphics_GetColor2(t_color){
	t_color[0]=bb_graphics_context.m_color_r;
	t_color[1]=bb_graphics_context.m_color_g;
	t_color[2]=bb_graphics_context.m_color_b;
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
	var t_h=0;
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		var t_asc=t_txt.charCodeAt(t_i);
		var t_ac=this.m__chars.p_Get(t_asc);
		if(t_ac.m_height>t_h){
			t_h=t_ac.m_height;
		}
	}
	return t_h;
}
c_AngelFont.prototype.p_TextWidth=function(t_txt,t_letter_spacing){
	var t_prevChar="";
	var t_width=0;
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		var t_asc=t_txt.charCodeAt(t_i);
		var t_ac=this.m__chars.p_Get(t_asc);
		var t_thisChar=String.fromCharCode(t_asc);
		if(t_ac!=null){
			if(this.m_useKerning){
				var t_key=t_prevChar+"_"+t_thisChar;
				if(this.m_kernPairs.p_Contains2(t_key)){
					t_width+=this.m_kernPairs.p_Get2(t_key).m_amount;
				}
			}
			t_width=(((t_width)+((t_ac.m_xAdvance)+t_letter_spacing))|0);
			t_prevChar=t_thisChar;
		}
	}
	return t_width;
}
c_AngelFont.prototype.p_DrawText=function(t_txt,t_x,t_y,t_align,t_letter_spacing){
	var t_prevChar="";
	this.m_xOffset=0;
	var t_1=t_align;
	if(t_1==1){
		t_x-=((this.p_TextWidth(t_txt,0.0)/2)|0);
	}else{
		if(t_1==2){
			t_x-=this.p_TextWidth(t_txt,0.0);
		}else{
			if(t_1==0){
			}
		}
	}
	for(var t_i=0;t_i<t_txt.length;t_i=t_i+1){
		var t_asc=t_txt.charCodeAt(t_i);
		var t_ac=this.m__chars.p_Get(t_asc);
		var t_thisChar=String.fromCharCode(t_asc);
		if(t_ac!=null){
			if(this.m_useKerning){
				var t_key=t_prevChar+"_"+t_thisChar;
				if(this.m_kernPairs.p_Contains2(t_key)){
					this.m_xOffset+=this.m_kernPairs.p_Get2(t_key).m_amount;
				}
			}
			t_ac.p_Draw(this.m_image,t_x+this.m_xOffset,t_y);
			this.m_xOffset=(((this.m_xOffset)+((t_ac.m_xAdvance)+t_letter_spacing))|0);
			t_prevChar=t_thisChar;
		}
	}
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
	bb_graphics_DrawImageRect(t_fontImage,(t_linex+this.m_xOffset),(t_liney+this.m_yOffset),this.m_x,this.m_y,this.m_width,this.m_height,0);
	return 0;
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	return this;
}
c_Map5.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map5.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_IntMap2(){
	c_Map5.call(this);
}
c_IntMap2.prototype=extend_class(c_Map5);
c_IntMap2.m_new=function(){
	c_Map5.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
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
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map6.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map6.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap4(){
	c_Map6.call(this);
}
c_StringMap4.prototype=extend_class(c_Map6);
c_StringMap4.m_new=function(){
	c_Map6.m_new.call(this);
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,-t_image.m_tx+t_x,-t_image.m_ty+t_y,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	if(!((bb_graphics_context.m_font)!=null)){
		return 0;
	}
	var t_w=bb_graphics_context.m_font.p_Width();
	var t_h=bb_graphics_context.m_font.p_Height();
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	t_y-=Math.floor((t_h)*t_yalign);
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		var t_ch=t_text.charCodeAt(t_i)-bb_graphics_context.m_firstChar;
		if(t_ch>=0 && t_ch<bb_graphics_context.m_font.p_Frames()){
			bb_graphics_DrawImage(bb_graphics_context.m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	return 0;
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
function c_MapValues2(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues2.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues2.m_new2=function(){
	return this;
}
c_MapValues2.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator2.m_new.call(new c_ValueEnumerator2,this.m_map.p_FirstNode());
}
function c_ValueEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator2.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator2.m_new2=function(){
	return this;
}
c_ValueEnumerator2.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator2.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
}
function c_Node7(){
	Object.call(this);
	this.m_left=null;
	this.m_right=null;
	this.m_parent=null;
	this.m_value=null;
}
c_Node7.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function bb_lpresources_lpFreeMemory(){
	var t_r=c_lpResources.m_GetInstance();
	var t_=t_r.m_images.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_i=t_.p_NextObject();
		if((t_i)!=null){
			t_i.p_Discard();
		}
	}
	var t_2=t_r.m_sounds.p_Values().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_i2=t_2.p_NextObject();
		if((t_i2)!=null){
			t_i2.p_Discard();
		}
	}
	t_r.m_images.p_Clear();
	t_r.m_sounds.p_Clear();
}
function c_GameScene(){
	c_Scene.call(this);
	this.m_loading_step=10;
	this.m_game_play_space=null;
	this.implments={c_iDrawable:1};
}
c_GameScene.prototype=extend_class(c_Scene);
c_GameScene.m_new=function(){
	c_Scene.m_new.call(this);
	return this;
}
c_GameScene.prototype.p_Loading=function(){
	this.m_loading_step-=1;
	var t_1=this.m_loading_step;
	if(t_1==9){
		this.p_Cameras().p_Get(0).m_ViewPort.p_Width2(160.0);
		this.p_Cameras().p_Get(0).m_ViewPort.p_Height2(144.0);
	}else{
		if(t_1==8){
			this.m_game_play_space=c_GamePlaySpace.m_new.call(new c_GamePlaySpace);
			this.p_AddChild((this.m_game_play_space),false);
		}
	}
	return this.m_loading_step;
}
c_GameScene.prototype.p_LoadingRender=function(){
	bb_graphics_SetColor((bb_consts2_COLOR_4[0]),(bb_consts2_COLOR_4[1]),(bb_consts2_COLOR_4[2]));
	bb_graphics_DrawRect(0.0,0.0,640.0,576.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
}
c_GameScene.prototype.p_Render=function(){
	bb_graphics_Cls((bb_consts2_COLOR_1[0]),(bb_consts2_COLOR_1[1]),(bb_consts2_COLOR_1[2]));
	c_Scene.prototype.p_Render.call(this);
}
function c_Space(){
	Object.call(this);
	this.m_children=c_Stack5.m_new.call(new c_Stack5);
	this.implments={c_iDrawable:1};
}
c_Space.prototype.p_Create=function(){
}
c_Space.m_new=function(){
	this.p_Create();
	return this;
}
c_Space.prototype.p_Update=function(){
	var t_=this.m_children.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_c=t_.p_NextObject();
		t_c.p_Update();
	}
}
c_Space.prototype.p_Render=function(){
	var t_=this.m_children.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_c=t_.p_NextObject();
		t_c.p_Render();
	}
}
c_Space.prototype.p_AddChild2=function(t_child){
	this.m_children.p_Push10(t_child);
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
	c_Space.m_new.call(this);
	return this;
}
c_GamePlaySpace.prototype.p_AddElements=function(t_objects){
	var t_=t_objects.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_enemy=null;
		if(String(t_o.m_gid)=="200"){
			this.p_AddChild2(c_PowerUp.m_new.call(new c_PowerUp,(t_o)));
		}else{
			if(String(t_o.m_gid)=="4097" || String(t_o.m_gid)=="4098" || String(t_o.m_gid)=="4099"){
				t_enemy=c_Enemy.m_new.call(new c_Enemy,(t_o),String(t_o.m_gid));
			}else{
				if(String(t_o.m_gid)=="4100" || String(t_o.m_gid)=="4101"){
					t_enemy=(c_EnemyTurret.m_new.call(new c_EnemyTurret,(t_o),String(t_o.m_gid)));
				}else{
					if(String(t_o.m_gid)=="4102"){
						t_enemy=(c_EnemyWave.m_new.call(new c_EnemyWave,(t_o)));
					}else{
						if(String(t_o.m_gid)=="4103"){
							t_enemy=(c_EnemyRectLine.m_new.call(new c_EnemyRectLine,(t_o),String(t_o.m_gid)));
						}else{
							if(String(t_o.m_gid)=="4122"){
								this.m_player.m_position.p_X(t_o.p_X2());
								this.m_player.m_position.p_Y(t_o.p_Y2());
								c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort.p_X(this.m_player.m_position.p_X2()-50.0);
							}
						}
					}
				}
			}
		}
		if(t_enemy!=null){
			t_enemy.m_player_position=this.m_player.m_position;
			this.p_AddChild2(t_enemy);
		}
	}
}
c_GamePlaySpace.prototype.p_Create=function(){
	this.m_world=c_World.m_new.call(new c_World);
	this.p_AddChild2(this.m_world);
	this.m_collision_engine=c_CollisionEngine.m_Instance2();
	this.p_AddChild2(this.m_collision_engine);
	this.m_tile_map_collider=c_TileMapCollider.m_new.call(new c_TileMapCollider,this.m_world.p_GetCollisionsLayer());
	this.p_AddChild2(this.m_tile_map_collider);
	this.m_bullets_engine=c_BulletsEngine.m_new.call(new c_BulletsEngine);
	this.p_AddChild2(this.m_bullets_engine);
	this.m_player=c_Player.m_new.call(new c_Player);
	this.p_AddChild2(this.m_player);
	this.p_AddElements(this.m_world.p_RemoveElements().m_objects);
	this.p_AddChild2(this.m_world.p_RemoveForeground());
	this.m_screen_clamp=c_ClampToScreen.m_new.call(new c_ClampToScreen,this.m_player.m_position);
	this.m_screen_clamp.m_camera_viewport=c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort;
	this.p_AddChild2(this.m_screen_clamp);
	this.m_camera_control=c_CameraControl.m_new.call(new c_CameraControl,c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort);
	this.m_camera_control.m_player=this.m_player.m_position;
	this.p_AddChild2(this.m_camera_control);
}
var bb_consts2_COLOR_4=[];
var bb_consts2_COLOR_1=[];
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	return this;
}
c_Stack5.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
c_Stack5.m_NIL=null;
c_Stack5.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack5.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack5.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack5.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack5.prototype.p_Push11=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push10(t_values[t_offset+t_i]);
	}
}
c_Stack5.prototype.p_Push12=function(t_values,t_offset){
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
}
function c_Enumerator3(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator3.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator3.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_World(){
	Object.call(this);
	this.m_tile_map=null;
	this.implments={c_iDrawable:1};
}
c_World.prototype.p_Create=function(){
	this.m_tile_map=c_TileMap.m_new.call(new c_TileMap,"level_1.json");
}
c_World.m_new=function(){
	this.p_Create();
	return this;
}
c_World.prototype.p_GetCollisionsLayer=function(){
	return object_downcast((this.m_tile_map.p_RemoveLayer("collisions")),c_TileLayer);
}
c_World.prototype.p_RemoveElements=function(){
	return object_downcast((this.m_tile_map.p_RemoveLayer("elements")),c_ObjectGroup);
}
c_World.prototype.p_RemoveForeground=function(){
	return this.m_tile_map.p_RemoveLayer("foreground");
}
c_World.prototype.p_Update=function(){
	this.m_tile_map.p_Update();
}
c_World.prototype.p_Render=function(){
	this.m_tile_map.p_Render();
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
	var t_ts=null;
	for(var t_i=0;t_i<this.m_tileSets.p_Length2();t_i=t_i+1){
		if(t_id>=this.m_tileSets.p_Get(t_i).m_firstgid){
			t_ts=this.m_tileSets.p_Get(t_i);
		}
	}
	return t_ts;
}
c_TileMap.prototype.p_LoadTileMap=function(t_tilemapUri){
	this.m_tileSets.p_Clear();
	this.m_layers.p_Clear();
	var t_content=bb_app_LoadString(t_tilemapUri);
	var t_data=c_JSONData.m_ReadJSON(t_content);
	var t_jsonObject=object_downcast((t_data),c_JSONObject);
	this.m_height=parseInt((t_jsonObject.p_GetItem("height").p_ToString()),10);
	this.m_width=parseInt((t_jsonObject.p_GetItem("width").p_ToString()),10);
	this.m_version=(parseInt((t_jsonObject.p_GetItem("version").p_ToString()),10));
	this.m_tileHeight=(parseInt((t_jsonObject.p_GetItem("tileheight").p_ToString()),10));
	this.m_tileWidth=(parseInt((t_jsonObject.p_GetItem("tilewidth").p_ToString()),10));
	var t_jsonArrayT=object_downcast((t_jsonObject.p_GetItem("tilesets")),c_JSONArray);
	var t_=t_jsonArrayT.m_values.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_di=t_.p_NextObject();
		var t_jo=object_downcast((t_di),c_JSONObject);
		var t_ts=c_TileSet.m_new.call(new c_TileSet);
		t_ts.m_firstgid=parseInt((t_jo.p_GetItem("firstgid").p_ToString()),10);
		t_ts.m_image=t_jo.p_GetItem("image").p_ToString();
		t_ts.m_imageHeight=parseInt((t_jo.p_GetItem("imageheight").p_ToString()),10);
		t_ts.m_imageWidth=parseInt((t_jo.p_GetItem("imagewidth").p_ToString()),10);
		t_ts.m_margin=parseInt((t_jo.p_GetItem("margin").p_ToString()),10);
		t_ts.m_name=t_jo.p_GetItem("name").p_ToString();
		t_ts.m_spacing=parseInt((t_jo.p_GetItem("spacing").p_ToString()),10);
		t_ts.m_tileHeight=parseInt((t_jo.p_GetItem("tileheight").p_ToString()),10);
		t_ts.m_tileWidth=parseInt((t_jo.p_GetItem("tilewidth").p_ToString()),10);
		t_ts.p_CalculateTiles();
		this.m_tileSets.p_Push13(t_ts);
	}
	var t_jsonArrayL=object_downcast((t_jsonObject.p_GetItem("layers")),c_JSONArray);
	var t_2=t_jsonArrayL.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_di2=t_2.p_NextObject();
		var t_jo2=object_downcast((t_di2),c_JSONObject);
		if(t_jo2.p_GetItem("type").p_ToString()=="tilelayer"){
			var t_ja=object_downcast((t_jo2.p_GetItem("data")),c_JSONArray);
			var t_tileLayer=c_TileLayer.m_new.call(new c_TileLayer,this);
			t_tileLayer.m_x=t_jo2.p_GetItem("x").p_ToInt();
			t_tileLayer.m_y=t_jo2.p_GetItem("y").p_ToInt();
			t_tileLayer.m_width=t_jo2.p_GetItem("width").p_ToInt();
			t_tileLayer.m_height=t_jo2.p_GetItem("height").p_ToInt();
			t_tileLayer.m_name=t_jo2.p_GetItem("name").p_ToString();
			t_tileLayer.m_opacity=t_jo2.p_GetItem("opacity").p_ToFloat();
			t_tileLayer.m_type=t_jo2.p_GetItem("type").p_ToString();
			t_tileLayer.m_visible=t_jo2.p_GetItem("visible").p_ToBool();
			var t_dataList=c_List4.m_new.call(new c_List4);
			var t_3=t_ja.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				var t_i=t_3.p_NextObject();
				var t_jsonInt=object_downcast((t_i),c_JSONInteger);
				t_dataList.p_AddLast3(t_jsonInt.m_value);
			}
			t_tileLayer.m_data=t_dataList.p_ToArray();
			this.m_layers.p_Push16(t_tileLayer);
		}else{
			var t_ja2=object_downcast((t_jo2.p_GetItem("objects")),c_JSONArray);
			var t_objectGroup=c_ObjectGroup.m_new.call(new c_ObjectGroup,this);
			t_objectGroup.m_x=t_jo2.p_GetItem("x").p_ToInt();
			t_objectGroup.m_y=t_jo2.p_GetItem("y").p_ToInt();
			t_objectGroup.m_width=t_jo2.p_GetItem("width").p_ToInt();
			t_objectGroup.m_height=t_jo2.p_GetItem("height").p_ToInt();
			t_objectGroup.m_name=t_jo2.p_GetItem("name").p_ToString();
			t_objectGroup.m_opacity=t_jo2.p_GetItem("opacity").p_ToFloat();
			t_objectGroup.m_type=t_jo2.p_GetItem("type").p_ToString();
			t_objectGroup.m_visible=t_jo2.p_GetItem("visible").p_ToBool();
			var t_4=t_ja2.p_ObjectEnumerator();
			while(t_4.p_HasNext()){
				var t_dataRect=t_4.p_NextObject();
				var t_jRect=object_downcast((t_dataRect),c_JSONObject);
				var t_rect=c_TileObject.m_new.call(new c_TileObject,t_jRect.p_GetItem("x").p_ToInt(),t_jRect.p_GetItem("y").p_ToInt(),t_jRect.p_GetItem("width").p_ToInt(),t_jRect.p_GetItem("height").p_ToInt());
				t_rect.m_gid=t_jRect.p_GetItem3("gid",0);
				if(t_rect.p_Width()==0.0 && t_rect.p_Height()==0.0){
					var t_tileSet=this.p_GetTileSet(t_rect.m_gid);
					var t_tile=t_tileSet.m_tiles.p_Get(t_rect.m_gid);
					t_rect.p_Width2(t_tile.p_Width());
					t_rect.p_Height2(t_tile.p_Height());
				}
				t_rect.m_properties=c_StringMap3.m_new.call(new c_StringMap3);
				var t_jsonProperties=object_downcast((t_jRect.p_GetItem("properties")),c_JSONObject);
				var t_keys=c_Stack9.m_new.call(new c_Stack9);
				var t_values=c_Stack9.m_new.call(new c_Stack9);
				var t_5=t_jsonProperties.m_values.p_Keys().p_ObjectEnumerator();
				while(t_5.p_HasNext()){
					var t_j=t_5.p_NextObject();
					t_keys.p_Push22(t_j);
				}
				var t_6=t_jsonProperties.m_values.p_Values().p_ObjectEnumerator();
				while(t_6.p_HasNext()){
					var t_v=t_6.p_NextObject();
					t_values.p_Push22(t_v.p_ToString());
				}
				for(var t_i2=0;t_i2<t_keys.p_Length2();t_i2=t_i2+1){
					t_rect.m_properties.p_Set3(t_keys.p_Get(t_i2),t_values.p_Get(t_i2));
				}
				t_rect.m_parent=(t_objectGroup);
				t_objectGroup.m_objects.p_Push19(t_rect);
			}
			this.m_layers.p_Push16(t_objectGroup);
		}
	}
}
c_TileMap.m_new=function(t_tilemapUri){
	c_Space.m_new.call(this);
	this.m_tilemapUri=t_tilemapUri;
	this.m_tileSets=c_Stack6.m_new.call(new c_Stack6);
	this.m_layers=c_Stack7.m_new.call(new c_Stack7);
	this.p_LoadTileMap(this.m_tilemapUri);
	return this;
}
c_TileMap.m_new2=function(){
	c_Space.m_new.call(this);
	return this;
}
c_TileMap.prototype.p_RemoveLayer=function(t_name){
	for(var t_i=0;t_i<this.m_layers.p_Length2();t_i=t_i+1){
		if(this.m_layers.p_Get(t_i).m_name==t_name){
			var t_m=this.m_layers.p_Get(t_i);
			this.m_layers.p_Remove2(t_i);
			return t_m;
		}
	}
	return null;
}
c_TileMap.prototype.p_Update=function(){
	c_Space.prototype.p_Update.call(this);
}
c_TileMap.prototype.p_Render=function(){
	c_Space.prototype.p_Render.call(this);
	var t_=this.m_layers.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_layer=t_.p_NextObject();
		t_layer.p_Render();
	}
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
	return this;
}
c_TileSet.prototype.p_CalculateTiles=function(){
	var t_i=this.m_firstgid;
	this.m_tiles=c_IntMap3.m_new.call(new c_IntMap3);
	this.m_drawableImage=bb_graphics_LoadImage(this.m_image,1,c_Image.m_DefaultFlags);
	for(var t_y=0;t_y<((this.m_imageHeight/this.m_tileHeight)|0);t_y=t_y+1){
		for(var t_x=0;t_x<((this.m_imageWidth/this.m_tileWidth)|0);t_x=t_x+1){
			this.m_tiles.p_Set5(t_i,c_Rectangle.m_new3.call(new c_Rectangle,(t_x*this.m_tileWidth),(t_y*this.m_tileHeight),(this.m_tileWidth),(this.m_tileHeight)));
			t_i=t_i+1;
		}
	}
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	return this;
}
c_Stack6.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack6.m_NIL=null;
c_Stack6.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack6.m_NIL;
	}
	this.m_length=0;
}
c_Stack6.prototype.p_Push13=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack6.prototype.p_Push14=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push13(t_values[t_offset+t_i]);
	}
}
c_Stack6.prototype.p_Push15=function(t_values,t_offset){
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
}
c_Stack6.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack6.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack6.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack6.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
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
	c_Space.m_new.call(this);
	this.m_parent=t_parent;
	return this;
}
c_MidLayer.m_new2=function(){
	c_Space.m_new.call(this);
	return this;
}
function c_Stack7(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack7.m_new=function(){
	return this;
}
c_Stack7.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack7.m_NIL=null;
c_Stack7.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack7.m_NIL;
	}
	this.m_length=0;
}
c_Stack7.prototype.p_Push16=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack7.prototype.p_Push17=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push16(t_values[t_offset+t_i]);
	}
}
c_Stack7.prototype.p_Push18=function(t_values,t_offset){
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
}
c_Stack7.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack7.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack7.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack7.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack7.prototype.p_Remove2=function(t_index){
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		this.m_data[t_i]=this.m_data[t_i+1];
	}
	this.m_length-=1;
	this.m_data[this.m_length]=c_Stack7.m_NIL;
}
c_Stack7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator8.m_new.call(new c_Enumerator8,this);
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function c_JSONDataItem(){
	Object.call(this);
	this.m_dataType=7;
}
c_JSONDataItem.m_new=function(){
	return this;
}
c_JSONDataItem.prototype.p_ToString=function(){
}
c_JSONDataItem.prototype.p_ToInt=function(){
	print("Unsupported conversion to Int for "+this.p_ToString());
	return -1;
}
c_JSONDataItem.prototype.p_ToFloat=function(){
	print("Unsupported conversion to Float for "+this.p_ToString());
	return -1.0;
}
c_JSONDataItem.prototype.p_ToBool=function(){
	print("Unsupported conversion to Bool for "+this.p_ToString());
	return false;
}
function c_JSONData(){
	Object.call(this);
}
c_JSONData.m_GetJSONObject=function(t_tokeniser){
	var t_jsonObject=c_JSONObject.m_new.call(new c_JSONObject);
	var t_data1=null;
	var t_data2=null;
	t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	if(t_data1.m_dataType==9 && object_downcast((t_data1),c_JSONNonData).m_value.m_tokenType==2){
		return (t_jsonObject);
	}
	do{
		if(t_data1.m_dataType!=5){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item name, got "+(t_data1.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data2.m_dataType!=9){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}else{
			if(object_downcast((t_data2),c_JSONNonData).m_value.m_tokenType!=6){
				return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(object_downcast((t_data2),c_JSONNonData).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			}
		}
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data2.m_dataType==-1){
			return t_data2;
		}else{
			if(t_data2.m_dataType==9){
				return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item value, got "+(object_downcast((t_data2),c_JSONNonData).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			}
		}
		t_jsonObject.p_AddItem(object_downcast((t_data1),c_JSONString).m_value,t_data2);
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data2.m_dataType!=9){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}else{
			if(object_downcast((t_data2),c_JSONNonData).m_value.m_tokenType==2){
				break;
			}else{
				if(object_downcast((t_data2),c_JSONNonData).m_value.m_tokenType!=0){
					return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(object_downcast((t_data2),c_JSONNonData).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				}
			}
		}
		t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	}while(!(false));
	return (t_jsonObject);
}
c_JSONData.m_GetJSONArray=function(t_tokeniser){
	var t_jsonArray=c_JSONArray.m_new.call(new c_JSONArray);
	var t_data=null;
	t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	if(t_data.m_dataType==9 && object_downcast((t_data),c_JSONNonData).m_value.m_tokenType==4){
		return (t_jsonArray);
	}
	do{
		if(t_data.m_dataType==9){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected data value, got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}else{
			if(t_data.m_dataType==-1){
				return t_data;
			}
		}
		t_jsonArray.p_AddItem2(t_data);
		t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data.m_dataType==9){
			var t_token=object_downcast((t_data),c_JSONNonData).m_value;
			if(t_token.m_tokenType==0){
				t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
				continue;
			}else{
				if(t_token.m_tokenType==4){
					break;
				}else{
					return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_token.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				}
			}
		}else{
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}
	}while(!(false));
	return (t_jsonArray);
}
c_JSONData.m_HexCharToInt=function(t_char){
	if(t_char>=48 && t_char<=57){
		return t_char-48;
	}else{
		if(t_char>=65 && t_char<=70){
			return t_char-55;
		}else{
			if(t_char>=97 && t_char<=102){
				return t_char-87;
			}
		}
	}
	return 0;
}
c_JSONData.m_UnEscapeUnicode=function(t_hexString){
	var t_charCode=0;
	for(var t_i=0;t_i<4;t_i=t_i+1){
		t_charCode<<=4;
		t_charCode+=c_JSONData.m_HexCharToInt(t_hexString.charCodeAt(t_i));
	}
	return String.fromCharCode(t_charCode);
}
c_JSONData.m_UnEscapeJSON=function(t_input){
	var t_escIndex=t_input.indexOf("\\",0);
	if(t_escIndex==-1){
		return t_input;
	}
	var t_copyStartIndex=0;
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,t_input.length);
	while(t_escIndex!=-1){
		t_retString.p_AddString(t_input.slice(t_copyStartIndex,t_escIndex));
		var t_2=t_input.charCodeAt(t_escIndex+1);
		if(t_2==110){
			t_retString.p_AddString("\n");
		}else{
			if(t_2==34){
				t_retString.p_AddString("\"");
			}else{
				if(t_2==116){
					t_retString.p_AddString("\t");
				}else{
					if(t_2==92){
						t_retString.p_AddString("\\");
					}else{
						if(t_2==47){
							t_retString.p_AddString("/");
						}else{
							if(t_2==114){
								t_retString.p_AddString("\r");
							}else{
								if(t_2==102){
									t_retString.p_AddString(String.fromCharCode(12));
								}else{
									if(t_2==98){
										t_retString.p_AddString(String.fromCharCode(8));
									}else{
										if(t_2==117){
											t_retString.p_AddString(c_JSONData.m_UnEscapeUnicode(t_input.slice(t_escIndex+2,t_escIndex+6)));
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
		t_copyStartIndex=t_escIndex+2;
		t_escIndex=t_input.indexOf("\\",t_copyStartIndex);
	}
	if(t_copyStartIndex<t_input.length){
		t_retString.p_AddString(t_input.slice(t_copyStartIndex));
	}
	return t_retString.p_ToString();
}
c_JSONData.m_GetJSONDataItem=function(t_tokeniser){
	var t_token=t_tokeniser.p_NextToken();
	var t_1=t_token.m_tokenType;
	if(t_1==1){
		return c_JSONData.m_GetJSONObject(t_tokeniser);
	}else{
		if(t_1==3){
			return c_JSONData.m_GetJSONArray(t_tokeniser);
		}else{
			if(t_1==10){
				return (c_JSONString.m_new.call(new c_JSONString,(object_downcast((t_token.m_value),c_StringObject).p_ToString()),false));
			}else{
				if(t_1==11){
					return (c_JSONFloat.m_new.call(new c_JSONFloat,object_downcast((t_token.m_value),c_FloatObject).p_ToFloat()));
				}else{
					if(t_1==12){
						return (c_JSONFloat.m_new2.call(new c_JSONFloat,object_downcast((t_token.m_value),c_StringObject).p_ToString()));
					}else{
						if(t_1==13){
							return (c_JSONInteger.m_new.call(new c_JSONInteger,(object_downcast((t_token.m_value),c_IntObject).p_ToInt())));
						}else{
							if(t_1==7){
								return (c_JSONBool.m_new.call(new c_JSONBool,true));
							}else{
								if(t_1==8){
									return (c_JSONBool.m_new.call(new c_JSONBool,false));
								}else{
									if(t_1==9){
										return (c_JSONNull.m_new.call(new c_JSONNull));
									}else{
										return (c_JSONNonData.m_new.call(new c_JSONNonData,t_token));
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
	var t_tokeniser=c_JSONTokeniser.m_new.call(new c_JSONTokeniser,t_jsonString,false);
	var t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	if(t_data==null){
		return (c_JSONDataError.m_new.call(new c_JSONDataError,"Unknown JSON error.",t_tokeniser.p_GetCurrentSectionString(20,20)));
	}else{
		if(t_data.m_dataType==-1){
			print(t_data.p_ToString());
		}else{
			if(t_data.m_dataType!=1 && t_data.m_dataType!=2){
				return (c_JSONDataError.m_new.call(new c_JSONDataError,"JSON Document malformed. Root node is not an object or an array",t_tokeniser.p_GetCurrentSectionString(20,20)));
			}
		}
	}
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
	if(this.m_stringIndex>=this.m_jsonString.length){
		this.m_char=0;
		return this.m_char;
	}
	this.m_char=this.m_jsonString.charCodeAt(this.m_stringIndex);
	this.m_stringIndex+=1;
	return this.m_char;
}
c_JSONTokeniser.m_new=function(t_jsonString,t_silent){
	this.m_silent=t_silent;
	this.m_jsonString=t_jsonString;
	this.p_NextChar();
	return this;
}
c_JSONTokeniser.m_new2=function(){
	return this;
}
c_JSONTokeniser.prototype.p_SkipWhitespace=function(){
	var t_index=this.m_stringIndex;
	while(this.m_char<=32 && this.m_char!=0){
		this.p_NextChar();
	}
	return this.m_stringIndex-t_index;
}
c_JSONTokeniser.prototype.p_GetCurrentSectionString=function(t_backwards,t_forwards){
	return "Section: "+this.m_jsonString.slice(bb_math_Max(this.m_stringIndex-t_backwards,0),bb_math_Min(this.m_stringIndex+t_forwards,this.m_jsonString.length));
}
c_JSONTokeniser.prototype.p_ParseFailure=function(t_description){
	if(this.m_silent){
		return;
	}
	print("JSON parse error at index: "+String(this.m_stringIndex));
	print(t_description);
	print(this.p_GetCurrentSectionString(20,20));
	this.m_stringIndex=this.m_jsonString.length;
}
c_JSONTokeniser.prototype.p_SkipComments=function(){
	var t_index=this.m_stringIndex;
	if(this.m_char==47){
		this.p_NextChar();
		if(this.m_char==47){
			while(this.m_char!=13 && this.m_char!=10 && this.m_char!=0){
				this.p_NextChar();
			}
		}else{
			if(this.m_char==42){
				do{
					this.p_NextChar();
					if(this.m_char==42){
						this.p_NextChar();
						if(this.m_char==47){
							break;
						}
					}
					if(this.m_char==0){
						this.p_ParseFailure("Unterminated comment");
						break;
					}
				}while(!(false));
			}else{
				this.p_ParseFailure("Unrecognised comment opening");
			}
		}
		this.p_NextChar();
	}
	return this.m_stringIndex-t_index;
}
c_JSONTokeniser.prototype.p_SkipIgnored=function(){
	var t_ignoredCount=0;
	do{
		t_ignoredCount=0;
		t_ignoredCount+=this.p_SkipWhitespace();
		t_ignoredCount+=this.p_SkipComments();
	}while(!(t_ignoredCount==0));
}
c_JSONTokeniser.prototype.p_IsDigit=function(t_char){
	return t_char>=48 && t_char<=58;
}
c_JSONTokeniser.prototype.p_ParseInteger=function(t_str){
	return parseInt((t_str),10);
}
c_JSONTokeniser.prototype.p_ParseNumberToken=function(t_firstChar){
	var t_index=this.m_stringIndex-1;
	while(this.m_char!=32 && this.m_char!=44 && this.m_char!=125 && this.m_char!=93 && this.m_char!=0){
		this.p_NextChar();
	}
	if(this.m_char==0){
		this.p_ParseFailure("Unterminated Number");
		return c_JSONToken.m_CreateToken4(-1,null);
	}
	var t_numberString=this.m_jsonString.slice(t_index,this.m_stringIndex-1);
	if(t_numberString.indexOf(".",0)!=-1 || t_numberString.indexOf("e",0)!=-1 || t_numberString.indexOf("E",0)!=-1){
		return c_JSONToken.m_CreateToken3(12,t_numberString);
	}else{
		var t_value=this.p_ParseInteger(t_numberString);
		return c_JSONToken.m_CreateToken2(13,t_value);
	}
}
c_JSONTokeniser.prototype.p_NextToken=function(){
	var t_retToken=null;
	this.p_SkipIgnored();
	var t_2=this.m_char;
	if(t_2==123){
		t_retToken=c_JSONToken.m_CreateToken3(1,"{");
	}else{
		if(t_2==125){
			t_retToken=c_JSONToken.m_CreateToken3(2,"}");
		}else{
			if(t_2==91){
				t_retToken=c_JSONToken.m_CreateToken3(3,"[");
			}else{
				if(t_2==93){
					t_retToken=c_JSONToken.m_CreateToken3(4,"]");
				}else{
					if(t_2==44){
						t_retToken=c_JSONToken.m_CreateToken3(0,",");
					}else{
						if(t_2==58){
							t_retToken=c_JSONToken.m_CreateToken3(6,":");
						}else{
							if(t_2==116){
								if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"rue")==0){
									this.m_stringIndex+=3;
									t_retToken=c_JSONToken.m_CreateToken3(7,"true");
								}
							}else{
								if(t_2==102){
									if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+4),"alse")==0){
										this.m_stringIndex+=4;
										t_retToken=c_JSONToken.m_CreateToken3(8,"false");
									}
								}else{
									if(t_2==110){
										if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"ull")==0){
											this.m_stringIndex+=3;
											t_retToken=c_JSONToken.m_CreateToken3(9,"null");
										}
									}else{
										if(t_2==34){
											var t_startIndex=this.m_stringIndex;
											var t_endIndex=this.m_jsonString.indexOf("\"",this.m_stringIndex);
											while(t_endIndex!=-1 && this.m_jsonString.charCodeAt(t_endIndex-1)==92){
												t_endIndex=this.m_jsonString.indexOf("\"",t_endIndex+1);
											}
											if(t_endIndex==-1){
												this.p_ParseFailure("Unterminated string");
											}
											t_retToken=c_JSONToken.m_CreateToken3(10,this.m_jsonString.slice(t_startIndex,t_endIndex));
											this.m_stringIndex=t_endIndex+1;
										}else{
											if(this.m_char==45 || this.p_IsDigit(this.m_char)){
												return this.p_ParseNumberToken(this.m_char);
											}else{
												if(this.m_char==0){
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
	if(t_retToken==null){
		this.p_ParseFailure("Unknown token, char: "+String.fromCharCode(this.m_char));
		t_retToken=c_JSONToken.m_CreateToken4(-1,null);
	}else{
		this.p_NextChar();
	}
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
	this.m_tokenType=t_tokenType;
	this.m_value=t_value;
	return this;
}
c_JSONToken.m_new2=function(){
	return this;
}
c_JSONToken.m_reusableToken=null;
c_JSONToken.m_CreateToken=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=(c_FloatObject.m_new2.call(new c_FloatObject,t_value));
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken2=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=(c_IntObject.m_new.call(new c_IntObject,t_value));
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken3=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=(c_StringObject.m_new3.call(new c_StringObject,t_value));
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken4=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=t_value;
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.prototype.p_GetValueString=function(){
	var t_1=this.m_tokenType;
	if(t_1==11){
		return ""+(object_downcast((this.m_value),c_FloatObject).p_ToString());
	}else{
		if(t_1==13){
			return ""+(object_downcast((this.m_value),c_IntObject).p_ToString());
		}else{
			if(t_1==9){
				return "NULL";
			}else{
				if((this.m_value)!=null){
					return (object_downcast((this.m_value),c_StringObject).p_ToString());
				}else{
					return "Null value";
				}
			}
		}
	}
}
c_JSONToken.prototype.p_ToString=function(){
	return "JSONToken - type: "+String(this.m_tokenType)+", value: "+this.p_GetValueString();
}
function bb_math_Min(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	this.m_value=(t_value);
	return this;
}
c_FloatObject.m_new2=function(t_value){
	this.m_value=t_value;
	return this;
}
c_FloatObject.m_new3=function(){
	return this;
}
c_FloatObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_FloatObject.prototype.p_ToFloat=function(){
	return this.m_value;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_IntObject.m_new2=function(t_value){
	this.m_value=((t_value)|0);
	return this;
}
c_IntObject.m_new3=function(){
	return this;
}
c_IntObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_IntObject.prototype.p_ToInt=function(){
	return this.m_value;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new2=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new3=function(t_value){
	this.m_value=t_value;
	return this;
}
c_StringObject.m_new4=function(){
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	return this.m_value;
}
function c_JSONObject(){
	c_JSONDataItem.call(this);
	this.m_values=c_StringMap5.m_new.call(new c_StringMap5);
}
c_JSONObject.prototype=extend_class(c_JSONDataItem);
c_JSONObject.m_new=function(){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=1;
	return this;
}
c_JSONObject.prototype.p_AddItem=function(t_name,t_dataItem){
	this.m_values.p_Set4(t_name,t_dataItem);
}
c_JSONObject.prototype.p_GetItem=function(t_name){
	return this.m_values.p_Get2(t_name);
}
c_JSONObject.prototype.p_GetItem2=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToString());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem3=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToInt());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem4=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToFloat());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem5=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToBool());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_ToString=function(){
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*5+5);
	var t_first=true;
	t_retString.p_AddString("{");
	var t_=this.m_values.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_v=t_.p_NextObject();
		if(t_first){
			t_first=false;
		}else{
			t_retString.p_AddString(",");
		}
		t_retString.p_AddString("\"");
		t_retString.p_AddString(t_v.p_Key());
		t_retString.p_AddString("\":");
		t_retString.p_AddString(t_v.p_Value().p_ToString());
	}
	t_retString.p_AddString("}");
	return t_retString.p_ToString();
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
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=9;
	this.m_value=t_token;
	return this;
}
c_JSONNonData.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONNonData.prototype.p_ToString=function(){
	return "Non Data";
}
function c_JSONDataError(){
	c_JSONDataItem.call(this);
	this.m_value="";
}
c_JSONDataError.prototype=extend_class(c_JSONDataItem);
c_JSONDataError.m_new=function(t_errorDescription,t_location){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=-1;
	this.m_value=t_errorDescription+"\nJSON Location: "+t_location;
	return this;
}
c_JSONDataError.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONDataError.prototype.p_ToString=function(){
	return this.m_value;
}
function c_JSONString(){
	c_JSONDataItem.call(this);
	this.m_value="";
	this.m_jsonReady="";
}
c_JSONString.prototype=extend_class(c_JSONDataItem);
c_JSONString.m_new=function(t_value,t_isMonkeyString){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=5;
	if(!t_isMonkeyString){
		this.m_value=c_JSONData.m_UnEscapeJSON(t_value);
		this.m_jsonReady="\""+t_value+"\"";
	}else{
		this.m_value=t_value;
	}
	return this;
}
c_JSONString.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONString.prototype.p_ToString=function(){
	return this.m_value;
}
function c_Map7(){
	Object.call(this);
	this.m_root=null;
}
c_Map7.m_new=function(){
	return this;
}
c_Map7.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map7.prototype.p_RotateLeft4=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map7.prototype.p_RotateRight4=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map7.prototype.p_InsertFixup4=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight4(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft4(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map7.prototype.p_Set4=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node8.m_new.call(new c_Node8,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup4(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map7.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map7.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map7.prototype.p_Keys=function(){
	return c_MapKeys.m_new.call(new c_MapKeys,this);
}
c_Map7.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map7.prototype.p_Values=function(){
	return c_MapValues3.m_new.call(new c_MapValues3,this);
}
c_Map7.prototype.p_Count=function(){
	if((this.m_root)!=null){
		return this.m_root.p_Count2(0);
	}
	return 0;
}
c_Map7.prototype.p_ObjectEnumerator=function(){
	return c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
}
function c_StringMap5(){
	c_Map7.call(this);
}
c_StringMap5.prototype=extend_class(c_Map7);
c_StringMap5.m_new=function(){
	c_Map7.m_new.call(this);
	return this;
}
c_StringMap5.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
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
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node8.m_new2=function(){
	return this;
}
c_Node8.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
c_Node8.prototype.p_Count2=function(t_n){
	if((this.m_left)!=null){
		t_n=this.m_left.p_Count2(t_n);
	}
	if((this.m_right)!=null){
		t_n=this.m_right.p_Count2(t_n);
	}
	return t_n+1;
}
c_Node8.prototype.p_Key=function(){
	return this.m_key;
}
c_Node8.prototype.p_Value=function(){
	return this.m_value;
}
function c_JSONArray(){
	c_JSONDataItem.call(this);
	this.m_values=c_List3.m_new.call(new c_List3);
}
c_JSONArray.prototype=extend_class(c_JSONDataItem);
c_JSONArray.m_new=function(){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=2;
	return this;
}
c_JSONArray.prototype.p_AddItem2=function(t_dataItem){
	this.m_values.p_AddLast2(t_dataItem);
}
c_JSONArray.prototype.p_ObjectEnumerator=function(){
	return this.m_values.p_ObjectEnumerator();
}
c_JSONArray.prototype.p_ToString=function(){
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*2+5);
	var t_first=true;
	t_retString.p_AddString("[");
	var t_=this.m_values.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_v=t_.p_NextObject();
		if(t_first){
			t_first=false;
		}else{
			t_retString.p_AddString(",");
		}
		t_retString.p_AddString(t_v.p_ToString());
	}
	t_retString.p_AddString("]");
	return t_retString.p_ToString();
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	return this;
}
c_List3.prototype.p_AddLast2=function(t_data){
	return c_Node9.m_new.call(new c_Node9,this.m__head,this.m__head.m__pred,t_data);
}
c_List3.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast2(t_t);
	}
	return this;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator4.m_new.call(new c_Enumerator4,this);
}
c_List3.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
function c_Node9(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node9.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node9.m_new2=function(){
	return this;
}
function c_HeadNode3(){
	c_Node9.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node9);
c_HeadNode3.m_new=function(){
	c_Node9.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_StringBuilder(){
	Object.call(this);
	this.m_retStrings=[];
	this.m_index=0;
}
c_StringBuilder.m_new=function(t_initialSize){
	if(t_initialSize<1){
		t_initialSize=1;
	}
	this.m_retStrings=new_string_array(t_initialSize);
	return this;
}
c_StringBuilder.prototype.p_AddString=function(t_add){
	if(this.m_index==this.m_retStrings.length){
		this.m_retStrings=resize_string_array(this.m_retStrings,this.m_retStrings.length*2);
	}
	this.m_retStrings[this.m_index]=t_add;
	this.m_index+=1;
}
c_StringBuilder.prototype.p_ToString=function(){
	if(this.m_index<2){
		return this.m_retStrings[0];
	}else{
		return this.m_retStrings.slice(0,this.m_index).join("");
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
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=3;
	this.m_value=t_value;
	return this;
}
c_JSONFloat.m_new2=function(t_unparsedStr){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=3;
	this.m_unparsedStr=t_unparsedStr;
	this.m_unparsed=true;
	return this;
}
c_JSONFloat.m_new3=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONFloat.prototype.p_Parse=function(){
	if(this.m_unparsed){
		this.m_value=parseFloat(this.m_unparsedStr);
		this.m_unparsed=false;
	}
}
c_JSONFloat.prototype.p_ToInt=function(){
	this.p_Parse();
	return ((this.m_value)|0);
}
c_JSONFloat.prototype.p_ToFloat=function(){
	this.p_Parse();
	return this.m_value;
}
c_JSONFloat.prototype.p_ToString=function(){
	this.p_Parse();
	return String(this.m_value);
}
function c_JSONInteger(){
	c_JSONDataItem.call(this);
	this.m_value=0;
}
c_JSONInteger.prototype=extend_class(c_JSONDataItem);
c_JSONInteger.m_new=function(t_value){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=4;
	this.m_value=t_value;
	return this;
}
c_JSONInteger.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONInteger.prototype.p_ToInt=function(){
	return this.m_value;
}
c_JSONInteger.prototype.p_ToFloat=function(){
	return (this.m_value);
}
c_JSONInteger.prototype.p_ToString=function(){
	return String(this.m_value);
}
function c_JSONBool(){
	c_JSONDataItem.call(this);
	this.m_value=false;
}
c_JSONBool.prototype=extend_class(c_JSONDataItem);
c_JSONBool.m_new=function(t_value){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=6;
	this.m_value=t_value;
	return this;
}
c_JSONBool.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONBool.prototype.p_ToBool=function(){
	return this.m_value;
}
c_JSONBool.prototype.p_ToString=function(){
	if(this.m_value){
		return "True";
	}else{
		return "False";
	}
}
function c_JSONNull(){
	c_JSONDataItem.call(this);
}
c_JSONNull.prototype=extend_class(c_JSONDataItem);
c_JSONNull.m_new=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONNull.prototype.p_ToString=function(){
	this.m_dataType=7;
	return "NULL";
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator4.m_new2=function(){
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator4.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Map8(){
	Object.call(this);
	this.m_root=null;
}
c_Map8.m_new=function(){
	return this;
}
c_Map8.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map8.prototype.p_RotateLeft5=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map8.prototype.p_RotateRight5=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map8.prototype.p_InsertFixup5=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight5(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft5(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map8.prototype.p_Set5=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node10.m_new.call(new c_Node10,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map8.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map8.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_IntMap3(){
	c_Map8.call(this);
}
c_IntMap3.prototype=extend_class(c_Map8);
c_IntMap3.m_new=function(){
	c_Map8.m_new.call(this);
	return this;
}
c_IntMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
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
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node10.m_new2=function(){
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
	c_MidLayer.m_new.call(this,t_parent);
	return this;
}
c_TileLayer.m_new2=function(){
	c_MidLayer.m_new2.call(this);
	return this;
}
c_TileLayer.prototype.p_Render=function(){
	c_Space.prototype.p_Render.call(this);
	if(this.m_visible){
		bb_graphics_PushMatrix();
		bb_graphics_SetAlpha(this.m_opacity);
		this.m_camera=c_Game.m_Instance().p_GetCurrentCamera();
		var t_minCounterX=((this.m_camera.m_ViewPort.p_X2()/this.m_parent.m_tileWidth)|0);
		var t_maxCounterX=(((this.m_camera.m_ViewPort.p_X2()+this.m_camera.m_ViewPort.p_Width())/this.m_parent.m_tileWidth+1.0)|0);
		var t_minCounterY=((this.m_camera.m_ViewPort.p_Y2()/this.m_parent.m_tileHeight)|0);
		var t_maxCounterY=(((this.m_camera.m_ViewPort.p_Y2()+this.m_camera.m_ViewPort.p_Height())/this.m_parent.m_tileHeight+1.0)|0);
		t_minCounterX=bb_math_Clamp(t_minCounterX,0,this.m_width);
		t_maxCounterX=bb_math_Clamp(t_maxCounterX,0,this.m_width);
		t_minCounterY=bb_math_Clamp(t_minCounterY,0,this.m_height);
		t_maxCounterY=bb_math_Clamp(t_maxCounterY,0,this.m_height);
		var t_tx=0;
		var t_ty=0;
		for(t_ty=t_minCounterY;t_ty<t_maxCounterY;t_ty=t_ty+1){
			for(t_tx=t_minCounterX;t_tx<t_maxCounterX;t_tx=t_tx+1){
				var t_index=t_tx+this.m_width*t_ty;
				if(this.m_data[t_index]>0){
					var t_tileSet=this.m_parent.p_GetTileSet(this.m_data[t_index]);
					var t_tile=t_tileSet.m_tiles.p_Get(this.m_data[t_index]);
					this.m_final_position[0]=(this.m_x)+(t_tile.p_Width()-(t_tileSet.m_margin)+(t_tileSet.m_spacing))*(t_tx);
					this.m_final_position[1]=(this.m_y)+(t_tile.p_Height()-(t_tileSet.m_margin)+(t_tileSet.m_spacing))*(t_ty);
					bb_graphics_DrawImageRect(t_tileSet.m_drawableImage,this.m_final_position[0],this.m_final_position[1],((t_tile.p_X2())|0),((t_tile.p_Y2())|0),((t_tile.p_Width())|0),((t_tile.p_Height())|0),0);
				}
			}
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_PopMatrix();
	}
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	return this;
}
c_List4.prototype.p_AddLast3=function(t_data){
	return c_Node11.m_new.call(new c_Node11,this.m__head,this.m__head.m__pred,t_data);
}
c_List4.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast3(t_t);
	}
	return this;
}
c_List4.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator5.m_new.call(new c_Enumerator5,this);
}
c_List4.prototype.p_ToArray=function(){
	var t_arr=new_number_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Node11(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=0;
}
c_Node11.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node11.m_new2=function(){
	return this;
}
function c_HeadNode4(){
	c_Node11.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node11);
c_HeadNode4.m_new=function(){
	c_Node11.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator5(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator5.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator5.m_new2=function(){
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator5.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_ObjectGroup(){
	c_MidLayer.call(this);
	this.m_objects=null;
	this.implments={c_iDrawable:1};
}
c_ObjectGroup.prototype=extend_class(c_MidLayer);
c_ObjectGroup.m_new=function(t_parent){
	c_MidLayer.m_new.call(this,t_parent);
	this.m_objects=c_Stack8.m_new.call(new c_Stack8);
	return this;
}
c_ObjectGroup.m_new2=function(){
	c_MidLayer.m_new2.call(this);
	return this;
}
c_ObjectGroup.prototype.p_Render=function(){
	c_Space.prototype.p_Render.call(this);
	bb_graphics_SetAlpha(this.m_opacity);
	if(this.m_visible && c_Game.m_Instance().p_GetCurrentCamera()!=null){
		var t_=this.m_objects.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_ob=t_.p_NextObject();
			t_ob.p_Render();
		}
	}
	bb_graphics_SetAlpha(1.0);
}
function c_TileObject(){
	c_Rectangle.call(this);
	this.m_gid=0;
	this.m_properties=null;
	this.m_parent=null;
}
c_TileObject.prototype=extend_class(c_Rectangle);
c_TileObject.m_new=function(t_x,t_y,t_w,t_h){
	c_Rectangle.m_new3.call(this,(t_x),(t_y),(t_w),(t_h));
	return this;
}
c_TileObject.m_new2=function(){
	c_Rectangle.m_new.call(this);
	return this;
}
c_TileObject.prototype.p_Render=function(){
	if(this.m_gid>0){
		var t_tileSet=this.m_parent.m_parent.p_GetTileSet(this.m_gid);
		var t_tile=t_tileSet.m_tiles.p_Get(this.m_gid);
		var t_finalPosition=c_Vec2.m_new.call(new c_Vec2,(this.m_parent.m_x)+this.p_X2(),(this.m_parent.m_y)+this.p_Y2()-t_tile.p_Height());
		var t_correctedPosition=t_finalPosition;
		bb_graphics_DrawImageRect(t_tileSet.m_drawableImage,((t_correctedPosition.m_X)|0),((t_correctedPosition.m_Y)|0),((t_tile.p_X2())|0),((t_tile.p_Y2())|0),((t_tile.p_Width())|0),((t_tile.p_Height())|0),0);
	}else{
	}
}
function c_Stack8(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack8.m_new=function(){
	return this;
}
c_Stack8.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack8.prototype.p_Push19=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack8.prototype.p_Push20=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push19(t_values[t_offset+t_i]);
	}
}
c_Stack8.prototype.p_Push21=function(t_values,t_offset){
	this.p_Push20(t_values,t_offset,t_values.length-t_offset);
}
c_Stack8.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator7.m_new.call(new c_Enumerator7,this);
}
c_Stack8.m_NIL=null;
c_Stack8.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack8.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack8.prototype.p_Length2=function(){
	return this.m_length;
}
function c_Stack9(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack9.m_new=function(){
	return this;
}
c_Stack9.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack9.prototype.p_Push22=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_string_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack9.prototype.p_Push23=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push22(t_values[t_offset+t_i]);
	}
}
c_Stack9.prototype.p_Push24=function(t_values,t_offset){
	this.p_Push23(t_values,t_offset,t_values.length-t_offset);
}
c_Stack9.m_NIL="";
c_Stack9.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack9.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_string_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack9.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack9.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys.m_new2=function(){
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator.m_new2=function(){
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_MapValues3(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues3.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues3.m_new2=function(){
	return this;
}
c_MapValues3.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator3.m_new.call(new c_ValueEnumerator3,this.m_map.p_FirstNode());
}
function c_ValueEnumerator3(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator3.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator3.m_new2=function(){
	return this;
}
c_ValueEnumerator3.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator3.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
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
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node12.m_new2=function(){
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
	this.m_objects=c_Stack10.m_new.call(new c_Stack10);
	this.m_static_objects=c_Stack10.m_new.call(new c_Stack10);
	this.m_delegates=c_Stack11.m_new.call(new c_Stack11);
}
c_CollisionEngine.m_new=function(){
	this.p_Create();
	return this;
}
c_CollisionEngine.m_Instance2=function(){
	if(c_CollisionEngine.m_instance==null){
		c_CollisionEngine.m_instance=c_CollisionEngine.m_new.call(new c_CollisionEngine);
	}
	return c_CollisionEngine.m_instance;
}
c_CollisionEngine.prototype.p_RegisterDelegate=function(t_collision_engine){
	t_collision_engine.m_objects=this.m_objects;
	t_collision_engine.m_static_objects=this.m_static_objects;
	this.m_delegates.p_Push28(t_collision_engine);
}
c_CollisionEngine.prototype.p_AddBody=function(t_body){
	this.m_objects.p_Push25(t_body);
}
c_CollisionEngine.prototype.p_AddStaticBody=function(t_body){
	this.m_static_objects.p_Push25(t_body);
	return 0;
}
c_CollisionEngine.prototype.p_Update=function(){
	var t_collision_count=0;
	var t_=this.m_objects.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_2=this.m_objects.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_other=t_2.p_NextObject();
			if(t_o!=t_other){
				if(c_Collision.m_AABBIntersects(t_o.p_GetBox(),t_other.p_GetBox())){
					t_o.p_OnCollide(t_other.p_GetName());
				}
			}
		}
	}
	var t_3=this.m_objects.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_o2=t_3.p_NextObject();
		var t_4=this.m_static_objects.p_ObjectEnumerator();
		while(t_4.p_HasNext()){
			var t_other2=t_4.p_NextObject();
			if(c_Collision.m_AABBIntersects(t_o2.p_GetBox(),t_other2.p_GetBox())){
				t_o2.p_OnCollide(t_other2.p_GetName());
				t_other2.p_OnCollide(t_o2.p_GetName());
			}
		}
	}
}
c_CollisionEngine.prototype.p_Render=function(){
}
c_CollisionEngine.prototype.p_Destroy=function(t_element){
	this.m_objects.p_RemoveEach(t_element);
	this.m_static_objects.p_RemoveEach(t_element);
}
c_CollisionEngine.prototype.p_DestroyAll=function(){
	this.m_objects.p_Clear();
	this.m_static_objects.p_Clear();
}
function c_Stack10(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack10.m_new=function(){
	return this;
}
c_Stack10.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack10.prototype.p_Push25=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack10.prototype.p_Push26=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push25(t_values[t_offset+t_i]);
	}
}
c_Stack10.prototype.p_Push27=function(t_values,t_offset){
	this.p_Push26(t_values,t_offset,t_values.length-t_offset);
}
c_Stack10.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator9.m_new.call(new c_Enumerator9,this);
}
c_Stack10.m_NIL=null;
c_Stack10.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack10.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack10.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack10.prototype.p_Equals2=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_Stack10.prototype.p_RemoveEach=function(t_value){
	var t_i=0;
	var t_j=this.m_length;
	while(t_i<this.m_length){
		if(!this.p_Equals2(this.m_data[t_i],t_value)){
			t_i+=1;
			continue;
		}
		var t_b=t_i;
		var t_e=t_i+1;
		while(t_e<this.m_length && this.p_Equals2(this.m_data[t_e],t_value)){
			t_e+=1;
		}
		while(t_e<this.m_length){
			this.m_data[t_b]=this.m_data[t_e];
			t_b+=1;
			t_e+=1;
		}
		this.m_length-=t_e-t_b;
		t_i+=1;
	}
	t_i=this.m_length;
	while(t_i<t_j){
		this.m_data[t_i]=c_Stack10.m_NIL;
		t_i+=1;
	}
}
c_Stack10.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack10.m_NIL;
	}
	this.m_length=0;
}
function c_Stack11(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack11.m_new=function(){
	return this;
}
c_Stack11.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack11.prototype.p_Push28=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack11.prototype.p_Push29=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push28(t_values[t_offset+t_i]);
	}
}
c_Stack11.prototype.p_Push30=function(t_values,t_offset){
	this.p_Push29(t_values,t_offset,t_values.length-t_offset);
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
	c_CollisionEngine.m_new.call(this);
	c_CollisionEngine.m_Instance2().p_RegisterDelegate(this);
	this.m_tile_layer=t_tile_layer;
	this.m_view_port=c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort;
	this.m_tile_position=c_Rectangle.m_new.call(new c_Rectangle);
	this.m_aux_sat=c_Vec2.m_new2.call(new c_Vec2);
	return this;
}
c_TileMapCollider.m_new2=function(){
	c_CollisionEngine.m_new.call(this);
	return this;
}
c_TileMapCollider.prototype.p_GetTileGridPosition=function(t_cx,t_cy){
	this.m_tile_grid_position[0]=((Math.floor((t_cx)/this.m_tile_layer.m_parent.m_tileWidth))|0);
	this.m_tile_grid_position[1]=((Math.floor((t_cy)/this.m_tile_layer.m_parent.m_tileHeight))|0);
	return this.m_tile_grid_position;
}
c_TileMapCollider.prototype.p_GetTileID=function(t_cx,t_cy){
	var t_tile_position=this.p_GetTileGridPosition(t_cx,t_cy);
	var t_index=t_tile_position[0]+this.m_tile_layer.m_width*t_tile_position[1];
	if(t_index<this.m_tile_layer.m_data.length-1 && t_index>0){
		return this.m_tile_layer.m_data[t_index];
	}
	return 0;
}
c_TileMapCollider.prototype.p_GetTileDataPosition=function(t_cx,t_cy){
	this.m_tile_position.p_Width2(this.m_tile_layer.m_parent.m_tileWidth);
	this.m_tile_position.p_Height2(this.m_tile_layer.m_parent.m_tileHeight);
	this.m_tile_position.p_X(Math.floor((t_cx)/this.m_tile_position.p_Width())*this.m_tile_layer.m_parent.m_tileWidth);
	this.m_tile_position.p_Y(Math.floor((t_cy)/this.m_tile_position.p_Height())*this.m_tile_layer.m_parent.m_tileHeight);
	return this.m_tile_position;
}
c_TileMapCollider.prototype.p_Update=function(){
	var t_=this.m_objects.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		for(var t_x=Math.floor(t_o.p_GetBox().p_X2()/this.m_tile_layer.m_parent.m_tileWidth);t_x<=Math.floor((t_o.p_GetBox().p_X2()+t_o.p_GetBox().p_Width())/this.m_tile_layer.m_parent.m_tileWidth);t_x=t_x+1.0){
			for(var t_y=Math.floor(t_o.p_GetBox().p_Y2()/this.m_tile_layer.m_parent.m_tileHeight);t_y<=Math.floor((t_o.p_GetBox().p_Y2()+t_o.p_GetBox().p_Height())/this.m_tile_layer.m_parent.m_tileHeight);t_y=t_y+1.0){
				var t_tile=this.p_GetTileID(((this.m_tile_layer.m_parent.m_tileWidth*t_x)|0),((this.m_tile_layer.m_parent.m_tileHeight*t_y)|0));
				if(t_tile!=0){
					t_o.p_OnCollide("wall");
					var t_tile_position=this.p_GetTileDataPosition(((this.m_tile_layer.m_parent.m_tileWidth*t_x)|0),((this.m_tile_layer.m_parent.m_tileHeight*t_y)|0));
					c_SAT.m_Collide(t_o.p_GetBox(),t_tile_position,this.m_aux_sat);
					if((t_tile==4103 || t_tile==4102 || t_tile==4104 || t_tile==4108) && this.m_aux_sat.m_Y>0.0){
						var t_2=t_o.p_GetBox();
						t_o.p_GetBox().p_Y(t_2.p_Y2()-this.m_aux_sat.m_Y);
					}
					if((t_tile==4105 || t_tile==4106 || t_tile==4107 || t_tile==4108) && this.m_aux_sat.m_Y<0.0){
						var t_3=t_o.p_GetBox();
						t_o.p_GetBox().p_Y(t_3.p_Y2()-this.m_aux_sat.m_Y);
					}
					if((t_tile==4102 || t_tile==4105 || t_tile==4109 || t_tile==4108) && this.m_aux_sat.m_X>0.0){
						var t_4=t_o.p_GetBox();
						t_o.p_GetBox().p_X(t_4.p_X2()-this.m_aux_sat.m_X);
					}
					if((t_tile==4104 || t_tile==4110 || t_tile==4111 || t_tile==4108) && this.m_aux_sat.m_X<0.0){
						var t_5=t_o.p_GetBox();
						t_o.p_GetBox().p_X(t_5.p_X2()-this.m_aux_sat.m_X);
					}
				}
			}
		}
	}
}
c_TileMapCollider.prototype.p_Render=function(){
}
function c_Vec2(){
	Object.call(this);
	this.m_X=.0;
	this.m_Y=.0;
}
c_Vec2.m_new=function(t_x,t_y){
	this.m_X=t_x;
	this.m_Y=t_y;
	return this;
}
c_Vec2.m_new2=function(){
	return this;
}
c_Vec2.m_Zero=function(){
	return c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
}
c_Vec2.prototype.p_Perp=function(t_rtn){
	if(t_rtn==null){
		this.m_X=-this.m_Y;
		this.m_Y=this.m_X;
		return this;
	}
	t_rtn.m_X=-this.m_Y;
	t_rtn.m_Y=this.m_X;
	return t_rtn;
}
c_Vec2.m_Dot=function(t_x1,t_y1,t_x2,t_y2){
	return t_x1*t_x2+t_y1*t_y2;
}
c_Vec2.m_Dot2=function(t_v1,t_v2){
	return c_Vec2.m_Dot(t_v1.m_X,t_v1.m_Y,t_v2.m_X,t_v2.m_Y);
}
c_Vec2.prototype.p_Dot=function(t_other){
	return c_Vec2.m_Dot(this.m_X,this.m_Y,t_other.m_X,t_other.m_Y);
}
c_Vec2.m_DotSquared=function(t_x1,t_y1){
	return t_x1*t_x1+t_y1*t_y1;
}
c_Vec2.prototype.p_Magnitude=function(){
	return Math.sqrt(Math.pow(this.m_X,2.0)+Math.pow(this.m_Y,2.0));
}
c_Vec2.prototype.p_UnitVector=function(t_rtn){
	var t_magnitude=this.p_Magnitude();
	if(t_rtn==null){
		this.m_X/=t_magnitude;
		this.m_Y/=t_magnitude;
		return this;
	}
	t_rtn.m_X=this.m_X/t_magnitude;
	t_rtn.m_Y=this.m_Y/t_magnitude;
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
	this.m_bullets=c_List5.m_new.call(new c_List5);
	this.m_discard_list=c_List5.m_new.call(new c_List5);
}
c_BulletsEngine.m_new=function(){
	c_BulletsEngine.m_instance=this;
	this.p_Create();
	return this;
}
c_BulletsEngine.prototype.p_Update=function(){
	var t_=this.m_bullets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_b=t_.p_NextObject();
		var t_2=t_b.m_Position;
		t_b.m_Position.p_X(t_2.p_X2()+(t_b.m_speed)*c_Time.m_DeltaSecs()*t_b.m_direction.m_X);
		var t_3=t_b.m_Position;
		t_b.m_Position.p_Y(t_3.p_Y2()+(t_b.m_speed)*c_Time.m_DeltaSecs()*t_b.m_direction.m_Y);
		t_b.m_current_live_time+=c_Time.m_DeltaSecs();
		if(t_b.m_max_live_time<=t_b.m_current_live_time){
			t_b.p_Destroy2();
			this.m_discard_list.p_AddLast4(t_b);
		}
	}
	var t_4=this.m_discard_list.p_ObjectEnumerator();
	while(t_4.p_HasNext()){
		var t_db=t_4.p_NextObject();
		this.m_bullets.p_RemoveEach2(t_db);
	}
	this.m_discard_list.p_Clear();
}
c_BulletsEngine.prototype.p_Render=function(){
	var t_=this.m_bullets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_b=t_.p_NextObject();
		if(t_b.m_visible){
			t_b.p_Render();
		}else{
			t_b.p_Destroy2();
			this.m_discard_list.p_AddLast4(t_b);
		}
	}
}
c_BulletsEngine.m_Instance2=function(){
	return c_BulletsEngine.m_instance;
}
c_BulletsEngine.prototype.p_AddBullet=function(t_bullet){
	this.m_bullets.p_AddLast4(t_bullet);
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
}
c_lpImage.prototype.p__init3=function(t_img,t_position,t_margin){
	this.m__img=t_img;
	if((this.m__img)!=null){
		this.m_Position=c_Rectangle.m_new3.call(new c_Rectangle,t_position.m_X,t_position.m_Y,(this.m__img.p_Width())-t_margin,(this.m__img.p_Height())-t_margin);
		this.m_DiscardThread=c_DiscardProcess.m_new.call(new c_DiscardProcess,this.m__img);
		this.p_Create();
	}
}
c_lpImage.m_new=function(t_image,t_position,t_l){
	var t_img=bb_lpresources_lpLoadImage(t_image,1,c_Image.m_DefaultFlags);
	this.p__init3(t_img,t_position,0.0);
	return this;
}
c_lpImage.m_new2=function(t_image,t_position){
	this.p__init3(t_image,t_position,0.0);
	return this;
}
c_lpImage.m_new3=function(t_image,t_position,t_margin){
	var t_img=bb_lpresources_lpLoadImage(t_image,1,c_Image.m_DefaultFlags);
	this.p__init3(t_img,t_position,t_margin);
	return this;
}
c_lpImage.m_new4=function(t_image,t_position,t_margin){
	this.p__init3(t_image,t_position,t_margin);
	return this;
}
c_lpImage.m_new5=function(t_other){
	this.m__img=t_other.m__img;
	this.m__scaled=t_other.m__scaled;
	this.m__scalex=t_other.m__scalex;
	this.m__scaley=t_other.m__scaley;
	this.m__flipped=t_other.m__flipped;
	this.m__angle=t_other.m__angle;
	this.m__rotated=t_other.m__rotated;
	this.m__rotationPivot.m_X=t_other.m__rotationPivot.m_X;
	this.m__rotationPivot.m_Y=t_other.m__rotationPivot.m_Y;
	this.m_did=t_other.m_did;
	this.m_Debug=t_other.m_Debug;
	this.m_isDestroyed=t_other.m_isDestroyed;
	this.m_Position=c_Rectangle.m_new.call(new c_Rectangle);
	this.m_Position.p_X(t_other.m_Position.p_X2());
	this.m_Position.p_Y(t_other.m_Position.p_Y2());
	this.m_Position.p_Width2(t_other.m_Position.p_Width());
	this.m_Position.p_Height2(t_other.m_Position.p_Height());
	this.m_correctPosition=c_Rectangle.m_new.call(new c_Rectangle);
	this.m_correctPosition.p_X(t_other.m_correctPosition.p_X2());
	this.m_correctPosition.p_Y(t_other.m_correctPosition.p_Y2());
	this.m_correctPosition.p_Width2(t_other.m_correctPosition.p_Width());
	this.m_correctPosition.p_Height2(t_other.m_correctPosition.p_Height());
	return this;
}
c_lpImage.m_new6=function(){
	return this;
}
c_lpImage.prototype.p_Render=function(){
	if(!this.m_isDestroyed){
		var t_flipCorrection=0.0;
		bb_graphics_PushMatrix();
		t_flipCorrection=this.m_Position.p_Width();
		if(this.m__rotated){
			t_flipCorrection=0.0;
			bb_graphics_Translate(this.m_correctPosition.p_X2()+this.m__rotationPivot.m_X,this.m_correctPosition.p_Y2()+this.m__rotationPivot.m_Y);
			this.m__img.p_SetHandle(this.m_correctPosition.p_X2()+this.m__rotationPivot.m_X,this.m_correctPosition.p_Y2()+this.m__rotationPivot.m_Y);
		}
		if(this.m__flipped){
			bb_graphics_DrawImage2(this.m__img,this.m_Position.p_X2()+t_flipCorrection,this.m_Position.p_Y2(),this.m__angle,-this.m__scalex,this.m__scaley,0);
		}else{
			bb_graphics_DrawImage2(this.m__img,this.m_Position.p_X2(),this.m_Position.p_Y2(),this.m__angle,this.m__scalex,this.m__scaley,0);
		}
		bb_graphics_PopMatrix();
	}
}
c_lpImage.prototype.p_Update=function(){
}
c_lpImage.prototype.p_SetRotation=function(t_angle){
	this.m__angle=t_angle;
	this.m__rotated=true;
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
	c_CollisionEngine.m_Instance2().p_Destroy(this);
	this.m_visible=false;
}
c_EnemyBullet.prototype.p_GetBox=function(){
	return this.m_Position;
}
c_EnemyBullet.prototype.p_OnCollide=function(t_name){
	if(t_name=="wall" || t_name=="player"){
		this.p_Destroy2();
	}
}
c_EnemyBullet.prototype.p_GetName=function(){
	return "enemy_bullet";
}
c_EnemyBullet.m_new=function(t_position,t_direction){
	c_lpImage.m_new.call(this,"bullet_enemy.png",t_position,0);
	this.m_direction=t_direction;
	c_CollisionEngine.m_Instance2().p_AddBody(this);
	c_BulletsEngine.m_Instance2().p_AddBullet(this);
	return this;
}
c_EnemyBullet.m_new2=function(){
	c_lpImage.m_new6.call(this);
	return this;
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	return this;
}
c_List5.prototype.p_AddLast4=function(t_data){
	return c_Node13.m_new.call(new c_Node13,this.m__head,this.m__head.m__pred,t_data);
}
c_List5.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast4(t_t);
	}
	return this;
}
c_List5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator10.m_new.call(new c_Enumerator10,this);
}
c_List5.prototype.p_Equals3=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List5.prototype.p_RemoveEach2=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals3(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List5.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
function c_Node13(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node13.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node13.m_new2=function(){
	return this;
}
c_Node13.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode5(){
	c_Node13.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node13);
c_HeadNode5.m_new=function(){
	c_Node13.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
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
	this.m_state=0;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_Player.prototype.p_Create=function(){
	this.m_position=c_Rectangle.m_new3.call(new c_Rectangle,30.0,60.0,23.0,8.0);
	this.m_box=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,10.0,4.0);
	this.m_sprite=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"ship.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),23.0,8.0,1,0.0);
	this.m_sprite.p_AddSequence("fly",[0]);
	this.m_sprite.p_PlaySequence("fly",83,true);
	this.m_control=c_SpaceShooterControl.m_new.call(new c_SpaceShooterControl,(this.m_position));
	this.m_cannon=c_SpaceShooterCannon.m_new.call(new c_SpaceShooterCannon,(this.m_position));
	this.m_cannon.p_Offset().p_X(25.0);
	this.m_cannon.p_Offset().p_Y(4.0);
	this.m_cannon.p_AddSprite("bullet_level_0.png");
	this.m_cannon.p_AddSprite("bullet_level_1.png");
	this.m_cannon.p_AddSprite("bullet_level_2.png");
	this.m_cannon.p_AddSprite("bullet_level_3.png");
	this.m_particles_emitter=c_ParticleEmitter.m_new.call(new c_ParticleEmitter,null,0);
	this.m_particles_emitter.p_LoadFromJson(bb_app_LoadString("ship_booster.json"));
	this.m_particles_emitter.m_Position.p_X(0.0);
	this.m_particles_emitter.m_Position.p_Y(0.0);
	c_CollisionEngine.m_Instance2().p_AddBody(this);
	this.m_explosion=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"explosion.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),9.0,9.0,14,0.0);
	this.m_explosion.p_AddSequence("explode",[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
}
c_Player.m_new=function(){
	this.p_Create();
	return this;
}
c_Player.prototype.p_Update=function(){
	if(this.m_state==0){
		this.m_sprite.p_Update();
		this.m_control.p_Update();
		this.m_cannon.p_Update();
		this.m_particles_emitter.p_Update();
		if(this.m_control.p_Shot()){
			this.m_cannon.p_Shot();
		}
		this.m_box.p_X(this.m_position.p_X2()+10.0);
		this.m_box.p_Y(this.m_position.p_Y2()+2.0);
		this.m_particles_emitter.m_Position.p_X(this.m_position.p_X2()+7.0);
		this.m_particles_emitter.m_Position.p_Y(this.m_position.p_Y2()+this.m_position.p_Height()/2.0);
	}else{
		if(this.m_state==1){
			this.m_explosion.p_Update();
			if(this.m_explosion.p_IsLastFrame()){
				c_Game.m_Instance().p_SetScene(0,null);
			}
		}
	}
}
c_Player.prototype.p_Render=function(){
	if(this.m_state==0){
		this.m_particles_emitter.p_Render();
		bb_graphics_PushMatrix();
		bb_graphics_Translate(this.m_position.p_X2(),this.m_position.p_Y2());
		this.m_sprite.p_Render();
		bb_graphics_PopMatrix();
		this.m_cannon.p_Render();
	}else{
		if(this.m_state==1){
			this.m_explosion.p_Render();
		}
	}
}
c_Player.prototype.p_GetBox=function(){
	return this.m_box;
}
c_Player.prototype.p_Die=function(){
	c_CollisionEngine.m_Instance2().p_Destroy(this);
	c_CollisionEngine.m_Instance2().p_DestroyAll();
	this.m_state=1;
	this.m_explosion.m_Position.p_X(this.m_position.p_X2()+10.0);
	this.m_explosion.m_Position.p_Y(this.m_position.p_Y2());
	this.m_explosion.p_PlaySequence("explode",100,true);
	c_Time.m_SlowDown(0.5,1000);
}
c_Player.prototype.p_OnCollide=function(t_name){
	if(t_name=="powerup"){
		this.m_cannon.p_LevelUp();
	}else{
		if(t_name=="enemy" || t_name=="enemy_bullet"){
			if(this.m_cannon.m_level==0){
				this.p_Die();
			}else{
				this.m_cannon.p_LevelDown();
				c_Time.m_Freeze(200);
			}
		}else{
			if(t_name=="wall"){
				this.p_Die();
			}
		}
	}
}
c_Player.prototype.p_GetName=function(){
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
	this.p__init3(t_img,t_position,0.0);
	this.m__margin=t_margin;
	this.m__maxIndex=t_frames;
	this.m__currentIndex=0;
	this.m_Pause=true;
	this.m__sequences=c_StringMap6.m_new.call(new c_StringMap6);
}
c_AnimatedSprite.m_new=function(t_image,t_position,t_tileW,t_tileH,t_frames,t_margin){
	c_lpImage.m_new6.call(this);
	var t_img=bb_lpresources_lpLoadImage2(t_image,((t_tileW)|0),((t_tileH)|0),t_frames,c_Image.m_DefaultFlags);
	this.p__initialize(t_img,t_position,((t_margin)|0),(t_frames));
	return this;
}
c_AnimatedSprite.m_new2=function(t_img,t_position,t_frames,t_margin){
	c_lpImage.m_new6.call(this);
	this.p__initialize(t_img,t_position,((t_margin)|0),(t_frames));
	return this;
}
c_AnimatedSprite.m_new3=function(){
	c_lpImage.m_new6.call(this);
	return this;
}
c_AnimatedSprite.prototype.p_AddSequence=function(t_name,t_seq){
	if(t_name!=this.m__currentSequenceName){
		var t_stack=c_IntStack.m_new2.call(new c_IntStack);
		var t_=t_seq;
		var t_2=0;
		while(t_2<t_.length){
			var t_i=t_[t_2];
			t_2=t_2+1;
			t_stack.p_Push31(t_i);
		}
		this.m__sequences.p_Set6(t_name,t_stack);
	}
}
c_AnimatedSprite.prototype.p_PlaySequence=function(t_name,t_frameTime,t_looped){
	if(this.m__currentSequenceName!=t_name){
		this.m__currentSequence=this.m__sequences.p_Get2(t_name);
		this.m__maxIndex=this.m__currentSequence.p_Length2();
		this.m_Pause=false;
		this.m__frameTime=t_frameTime;
		this.m__currentSequenceName=t_name;
		this.m__lastSequenceName=t_name;
		this.m__currentIndex=0;
		this.m__looped=t_looped;
	}
}
c_AnimatedSprite.prototype.p_IsLastFrame=function(){
	if(this.m__maxIndex-1==this.m__currentIndex){
		return true;
	}
	return false;
}
c_AnimatedSprite.prototype.p_Update=function(){
	if(!this.m_Pause){
		this.m__elapsedTime=c_Time.m_Delta()+this.m__elapsedTime;
		if(this.m__elapsedTime>this.m__frameTime){
			if(!this.m_Pause){
				if(this.p_IsLastFrame()){
					this.m__currentIndex=0;
				}else{
					this.m__currentIndex=this.m__currentIndex+1;
				}
			}
			this.m__elapsedTime=0;
		}
	}
	if(!this.m__looped){
		if(this.p_IsLastFrame()){
			this.m_Pause=true;
			this.m__currentIndex=this.m__maxIndex;
		}
	}
}
c_AnimatedSprite.prototype.p_Render=function(){
	if(!this.m_isDestroyed && this.m__currentSequenceName!=""){
		var t_flipCorrection=0.0;
		bb_graphics_PushMatrix();
		t_flipCorrection=this.m_Position.p_Width();
		if(this.m__rotated){
			t_flipCorrection=0.0;
			bb_graphics_Translate(this.m_correctPosition.p_X2()+this.m__rotationPivot.m_X,this.m_correctPosition.p_Y2()+this.m__rotationPivot.m_Y);
			this.m__img.p_SetHandle(this.m_correctPosition.p_X2()+this.m__rotationPivot.m_X,this.m_correctPosition.p_Y2()+this.m__rotationPivot.m_Y);
		}
		if(this.m__flipped){
			bb_graphics_DrawImage2(this.m__img,this.m_Position.p_X2()+t_flipCorrection,this.m_Position.p_Y2(),this.m__angle,-this.m__scalex,this.m__scaley,this.m__currentSequence.p_Get(this.m__currentIndex));
		}else{
			bb_graphics_DrawImage2(this.m__img,this.m_Position.p_X2(),this.m_Position.p_Y2(),this.m__angle,this.m__scalex,this.m__scaley,this.m__currentSequence.p_Get(this.m__currentIndex));
		}
		bb_graphics_PopMatrix();
	}
}
function bb_lpresources_lpLoadImage(t_path,t_frameCount,t_flags){
	var t_lkey=""+t_path+String(t_frameCount)+String(t_flags);
	var t_r=c_lpResources.m_GetInstance();
	if(!t_r.m_images.p_Contains2(t_lkey)){
		t_r.m_images.p_Set2(t_lkey,bb_graphics_LoadImage(t_path,t_frameCount,t_flags));
	}
	return t_r.m_images.p_Get2(t_lkey);
}
function bb_lpresources_lpLoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_lkey=""+t_path+String(t_frameCount)+String(t_frameWidth)+String(t_frameHeight)+String(t_frameCount)+String(t_flags);
	var t_r=c_lpResources.m_GetInstance();
	if(!t_r.m_images.p_Contains2(t_lkey)){
		t_r.m_images.p_Set2(t_lkey,bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags));
	}
	return t_r.m_images.p_Get2(t_lkey);
}
function c_DiscardProcess(){
	Object.call(this);
	this.m_img=null;
}
c_DiscardProcess.m_new=function(t_i){
	this.m_img=t_i;
	return this;
}
c_DiscardProcess.m_new2=function(){
	return this;
}
function c_Stack12(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack12.m_new=function(){
	return this;
}
c_Stack12.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack12.prototype.p_Push31=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack12.prototype.p_Push32=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push31(t_values[t_offset+t_i]);
	}
}
c_Stack12.prototype.p_Push33=function(t_values,t_offset){
	this.p_Push32(t_values,t_offset,t_values.length-t_offset);
}
c_Stack12.m_NIL=0;
c_Stack12.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack12.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_number_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack12.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack12.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
function c_IntStack(){
	c_Stack12.call(this);
}
c_IntStack.prototype=extend_class(c_Stack12);
c_IntStack.m_new=function(t_data){
	c_Stack12.m_new2.call(this,t_data);
	return this;
}
c_IntStack.m_new2=function(){
	c_Stack12.m_new.call(this);
	return this;
}
function c_Map9(){
	Object.call(this);
	this.m_root=null;
}
c_Map9.m_new=function(){
	return this;
}
c_Map9.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map9.prototype.p_RotateLeft6=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map9.prototype.p_RotateRight6=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map9.prototype.p_InsertFixup6=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight6(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft6(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map9.prototype.p_Set6=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node14.m_new.call(new c_Node14,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup6(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map9.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map9.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap6(){
	c_Map9.call(this);
}
c_StringMap6.prototype=extend_class(c_Map9);
c_StringMap6.m_new=function(){
	c_Map9.m_new.call(this);
	return this;
}
c_StringMap6.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
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
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node14.m_new2=function(){
	return this;
}
function c_SpaceShooterControl(){
	Object.call(this);
	this.m_target=null;
	this.m_shot=false;
	this.m_speed=50;
}
c_SpaceShooterControl.m_new=function(t_target){
	this.m_target=t_target;
	return this;
}
c_SpaceShooterControl.m_new2=function(){
	return this;
}
c_SpaceShooterControl.prototype.p_Update=function(){
	this.m_shot=false;
	if(((bb_input_KeyDown(38))!=0) || ((bb_input_KeyDown(87))!=0)){
		var t_=this.m_target;
		this.m_target.p_Y(t_.p_Y2()-(this.m_speed)*c_Time.m_DeltaSecs());
	}
	if(((bb_input_KeyDown(40))!=0) || ((bb_input_KeyDown(83))!=0)){
		var t_2=this.m_target;
		this.m_target.p_Y(t_2.p_Y2()+(this.m_speed)*c_Time.m_DeltaSecs());
	}
	if(((bb_input_KeyDown(37))!=0) || ((bb_input_KeyDown(65))!=0)){
		var t_3=this.m_target;
		this.m_target.p_X(t_3.p_X2()-(this.m_speed)*c_Time.m_DeltaSecs());
	}
	if(((bb_input_KeyDown(39))!=0) || ((bb_input_KeyDown(68))!=0)){
		var t_4=this.m_target;
		this.m_target.p_X(t_4.p_X2()+(this.m_speed)*c_Time.m_DeltaSecs());
	}
	if(((bb_input_KeyHit(32))!=0) || ((bb_input_KeyHit(88))!=0)){
		this.m_shot=true;
	}
}
c_SpaceShooterControl.prototype.p_Shot=function(){
	return this.m_shot;
}
function c_SpaceShooterCannon(){
	Object.call(this);
	this.m_target=null;
	this.m_offset=null;
	this.m_bullets=null;
	this.m_discard_list=null;
	this.m_camera_fx=null;
	this.m_sprites=[];
	this.m_level=0;
	this.implments={c_iDrawable:1,c_iOnDestroy:1};
}
c_SpaceShooterCannon.prototype.p_Create=function(){
	this.m_offset=c_Point.m_new2.call(new c_Point,0.0,0.0);
	this.m_bullets=c_List6.m_new.call(new c_List6);
	this.m_discard_list=c_List6.m_new.call(new c_List6);
	this.m_camera_fx=c_CameraFX.m_new.call(new c_CameraFX,c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort);
}
c_SpaceShooterCannon.m_new=function(t_target){
	this.m_target=t_target;
	this.p_Create();
	return this;
}
c_SpaceShooterCannon.m_new2=function(){
	return this;
}
c_SpaceShooterCannon.prototype.p_Offset=function(){
	return this.m_offset;
}
c_SpaceShooterCannon.prototype.p_AddSprite=function(t_sprite_name){
	var t_imgs=c_List7.m_new2.call(new c_List7,this.m_sprites);
	t_imgs.p_AddLast6(bb_lpresources_lpLoadImage(t_sprite_name,1,c_Image.m_DefaultFlags));
	this.m_sprites=t_imgs.p_ToArray();
}
c_SpaceShooterCannon.prototype.p_LevelUp=function(){
	this.m_level+=1;
	if(this.m_sprites.length<=this.m_level){
		this.m_level=this.m_sprites.length-1;
	}
}
c_SpaceShooterCannon.prototype.p_LevelDown=function(){
	this.m_level-=1;
	if(this.m_level<0){
		this.m_level=0;
	}
}
c_SpaceShooterCannon.prototype.p_Update=function(){
	var t_=this.m_bullets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_b=t_.p_NextObject();
		t_b.p_Update();
	}
	var t_2=this.m_discard_list.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_db=t_2.p_NextObject();
		this.m_bullets.p_RemoveEach3(t_db);
	}
	this.m_discard_list.p_Clear();
	if((bb_input_KeyHit(81))!=0){
		this.p_LevelUp();
	}
	if((bb_input_KeyHit(69))!=0){
		this.p_LevelDown();
	}
	this.m_camera_fx.p_Update();
}
c_SpaceShooterCannon.prototype.p_Shot=function(){
	var t_img=c_Bullet.m_new.call(new c_Bullet,this.m_sprites[this.m_level],c_Vec2.m_new.call(new c_Vec2,this.m_target.p_X2()+this.m_offset.p_X2(),this.m_target.p_Y2()+this.m_offset.p_Y2()));
	t_img.p_OnDestroyListener(this);
	this.m_bullets.p_AddLast5(t_img);
	this.m_camera_fx.p_Recoil();
}
c_SpaceShooterCannon.prototype.p_Render=function(){
	var t_=this.m_bullets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_b=t_.p_NextObject();
		if(t_b.m_visible){
			t_b.p_Render();
		}
	}
	this.m_camera_fx.p_Render();
}
c_SpaceShooterCannon.prototype.p_OnDestroy=function(t_e){
	this.m_discard_list.p_AddLast5(object_downcast((t_e),c_Bullet));
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
	this.m_destroy_listener.p_OnDestroy(this);
}
c_Bullet.prototype.p_Update=function(){
	c_AnimatedSprite.prototype.p_Update.call(this);
	if(this.m_state==0){
		var t_=this.m_Position;
		this.m_Position.p_X(t_.p_X2()+(this.m_speed)*c_Time.m_DeltaSecs());
		if(this.m_max_live_time*(1+this.m_level)<=this.m_current_live_time){
			c_CollisionEngine.m_Instance2().p_Destroy(this);
			this.p_Destroy2();
		}
	}else{
		if(this.m_state==1){
			if(this.m_max_live_time<=this.m_current_live_time){
				this.m_visible=false;
				this.p_Destroy2();
			}
		}
	}
	this.m_current_live_time+=c_Time.m_DeltaSecs();
}
c_Bullet.m_new=function(t_img,t_position){
	c_AnimatedSprite.m_new.call(this,"bullet_level_0.png",t_position,8.0,4.0,2,0.0);
	this.p_AddSequence("shot",[0]);
	this.p_AddSequence("explode",[1]);
	this.p_PlaySequence("shot",100,true);
	c_CollisionEngine.m_Instance2().p_AddBody(this);
	return this;
}
c_Bullet.m_new2=function(){
	c_AnimatedSprite.m_new3.call(this);
	return this;
}
c_Bullet.prototype.p_OnDestroyListener=function(t_l){
	this.m_destroy_listener=t_l;
}
c_Bullet.prototype.p_GetBox=function(){
	return this.m_Position;
}
c_Bullet.prototype.p_OnCollide=function(t_name){
	if(t_name=="wall" || t_name=="enemy"){
		this.m_state=1;
		c_CollisionEngine.m_Instance2().p_Destroy(this);
		this.p_PlaySequence("explode",100,true);
		this.m_current_live_time=0.0;
		this.m_max_live_time=0.1;
	}
}
c_Bullet.prototype.p_GetName=function(){
	return "player_bullet";
}
function c_List6(){
	Object.call(this);
	this.m__head=(c_HeadNode6.m_new.call(new c_HeadNode6));
}
c_List6.m_new=function(){
	return this;
}
c_List6.prototype.p_AddLast5=function(t_data){
	return c_Node15.m_new.call(new c_Node15,this.m__head,this.m__head.m__pred,t_data);
}
c_List6.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast5(t_t);
	}
	return this;
}
c_List6.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator11.m_new.call(new c_Enumerator11,this);
}
c_List6.prototype.p_Equals4=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List6.prototype.p_RemoveEach3=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals4(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List6.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
function c_Node15(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node15.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node15.m_new2=function(){
	return this;
}
c_Node15.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode6(){
	c_Node15.call(this);
}
c_HeadNode6.prototype=extend_class(c_Node15);
c_HeadNode6.m_new=function(){
	c_Node15.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
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
	this.m_camera_view=t_value;
}
c_CameraFX.prototype.p_CameraView2=function(){
	return this.m_camera_view;
}
c_CameraFX.m_new=function(t_camera_view){
	if(t_camera_view!=null){
		this.p_CameraView(t_camera_view);
	}
	return this;
}
c_CameraFX.prototype.p_Update=function(){
	if(this.m_state==1){
		if(this.m_timer<this.m_time){
			this.m_timer+=c_Time.m_Delta();
			var t_v_x=c_Math.m_Round(bb_random_Rnd2(-this.m_force_x,this.m_force_x));
			var t_v_y=c_Math.m_Round(bb_random_Rnd2(-this.m_force_y,this.m_force_y));
			this.m_correction_x+=t_v_x;
			this.m_correction_y+=t_v_y;
			var t_=this.m_camera_view;
			this.m_camera_view.p_X(t_.p_X2()+t_v_x);
			var t_2=this.m_camera_view;
			this.m_camera_view.p_Y(t_2.p_Y2()+t_v_y);
		}else{
			var t_3=this.m_camera_view;
			this.m_camera_view.p_X(t_3.p_X2()-this.m_correction_x);
			var t_4=this.m_camera_view;
			this.m_camera_view.p_Y(t_4.p_Y2()-this.m_correction_y);
			this.m_correction_x=0.0;
			this.m_correction_y=0.0;
			this.m_state=0;
		}
	}
	if(this.m_recoil_fx>0.0){
		var t_5=this.m_camera_view;
		this.m_camera_view.p_X(t_5.p_X2()-this.m_recoil_fx);
		this.m_recoil_fx-=0.5;
	}
}
c_CameraFX.prototype.p_Recoil=function(){
	this.m_recoil_fx=0.5;
	var t_=this.m_camera_view;
	this.m_camera_view.p_X(t_.p_X2()+0.5);
	return 0;
}
c_CameraFX.prototype.p_Render=function(){
}
function c_List7(){
	Object.call(this);
	this.m__head=(c_HeadNode7.m_new.call(new c_HeadNode7));
}
c_List7.m_new=function(){
	return this;
}
c_List7.prototype.p_AddLast6=function(t_data){
	return c_Node16.m_new.call(new c_Node16,this.m__head,this.m__head.m__pred,t_data);
}
c_List7.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast6(t_t);
	}
	return this;
}
c_List7.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator6.m_new.call(new c_Enumerator6,this);
}
c_List7.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Node16(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node16.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node16.m_new2=function(){
	return this;
}
function c_HeadNode7(){
	c_Node16.call(this);
}
c_HeadNode7.prototype=extend_class(c_Node16);
c_HeadNode7.m_new=function(){
	c_Node16.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator6(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator6.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator6.m_new2=function(){
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator6.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
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
	var t_c=null;
	if(this.m_ColorStack.p_Length2()>0){
		t_c=this.m_ColorStack.p_Get((bb_random_Rnd2(0.0,(this.m_ColorStack.p_Length2())))|0);
	}else{
		t_c=this.m_BaseColor;
	}
	var t_positionX=0;
	var t_positionY=0;
	if(this.m_EmitterType==c_ParticleEmitter.m_TYPE_CIRCLE){
		t_positionX=((bb_random_Rnd2(this.m_Position.p_X2()-this.m_Radius/2.0,this.m_Position.p_X2()+this.m_Radius/2.0))|0);
		t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2()-this.m_Radius/2.0,this.m_Position.p_Y2()+this.m_Radius/2.0))|0);
	}else{
		t_positionX=((bb_random_Rnd2(this.m_Position.p_X2(),this.m_Position.p_X2()+this.m_Position.p_Width()))|0);
		t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2(),this.m_Position.p_Y2()+this.m_Position.p_Height()))|0);
	}
	this.m__unused.p_Push34(c_Particle.m_new.call(new c_Particle,(t_positionX),(t_positionY),bb_random_Rnd2(this.m_minParticleRadius,this.m_maxParticleRadius),t_c,this.m_LifeTime,this.m_Force.m_X,this.m_Force.m_Y,this.m_AlphaChannel,this,c_Vec2.m_new.call(new c_Vec2,bb_random_Rnd2(this.m_xminVelocity,this.m_xmaxVelocity),bb_random_Rnd2(this.m_yminVelocity,this.m_ymaxVelocity)),this.m_ColorType,this.m_ParticleType,this.m_DrawableImage));
}
c_ParticleEmitter.prototype.p_SetMaxAllocations=function(t_maxAllocation){
	this.m__maxAllocations=t_maxAllocation;
	if(t_maxAllocation<=0){
		return;
	}
	this.m__unused.p_Clear();
	this.m__tail.p_Clear();
	for(var t_i=0;t_i<this.m__maxAllocations;t_i=t_i+1){
		this.p__addParticle();
	}
}
c_ParticleEmitter.prototype.p_Create=function(){
	this.m_Position=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,0.0,0.0);
	this.m_BaseColor=c_Color.m_White();
	this.m__tail=c_Stack13.m_new.call(new c_Stack13);
	this.m__unused=c_Stack13.m_new.call(new c_Stack13);
	this.m_ColorStack=c_Stack14.m_new.call(new c_Stack14);
	this.m_Force=c_Vec2.m_Zero();
}
c_ParticleEmitter.m_new=function(t_img,t_PRELOADED){
	this.m_DrawableImage=null;
	this.p_SetMaxAllocations(t_PRELOADED);
	this.p_Create();
	return this;
}
c_ParticleEmitter.prototype.p_SetAutoEmit=function(t_a){
	this.m_autoEmit=t_a;
}
c_ParticleEmitter.prototype.p_LoadFromJson=function(t_json_string){
	var t_json_object=object_downcast((c_JSONData.m_ReadJSON(t_json_string)),c_JSONObject);
	var t_json_position=object_downcast((t_json_object.p_GetItem("position")),c_JSONObject);
	var t_json_color_stack=object_downcast((t_json_object.p_GetItem("color_stack")),c_JSONArray);
	this.p_SetMaxAllocations(t_json_object.p_GetItem("max_allocations").p_ToInt());
	if((t_json_object.p_GetItem("auto_emmit").p_ToInt())==1){
		this.p_SetAutoEmit(true);
	}else{
		this.p_SetAutoEmit(false);
	}
	if((t_json_object.p_GetItem("fade_inout").p_ToInt())==1){
		this.m_FadeInOut=true;
	}else{
		this.m_FadeInOut=false;
	}
	this.m_AlphaChannel=(t_json_object.p_GetItem("aplha_cannel").p_ToFloat());
	this.m_SpanTime=(t_json_object.p_GetItem("span_time").p_ToInt());
	this.m_SpanAmount=(t_json_object.p_GetItem("span_amount").p_ToFloat());
	this.m_Radius=(t_json_object.p_GetItem("radius").p_ToFloat());
	this.m_minParticleRadius=(t_json_object.p_GetItem("min_particle_radius").p_ToFloat());
	this.m_maxParticleRadius=(t_json_object.p_GetItem("max_particle_radius").p_ToFloat());
	this.m_yminVelocity=(t_json_object.p_GetItem("y_min_velocity").p_ToFloat());
	this.m_ymaxVelocity=(t_json_object.p_GetItem("y_max_velocity").p_ToFloat());
	this.m_xminVelocity=(t_json_object.p_GetItem("x_min_velocity").p_ToFloat());
	this.m_xmaxVelocity=(t_json_object.p_GetItem("x_max_velocity").p_ToFloat());
	this.m_LifeTime=(t_json_object.p_GetItem("life_time").p_ToFloat());
	this.m_ColorType=(t_json_object.p_GetItem("color_type").p_ToInt());
	this.m_BaseColor=c_Color.m_White();
	this.m_Position.p_X(t_json_position.p_GetItem("x").p_ToFloat());
	this.m_Position.p_Y(t_json_position.p_GetItem("y").p_ToFloat());
	this.m_Position.p_Width2(t_json_position.p_GetItem("width").p_ToFloat());
	this.m_Position.p_Height2(t_json_position.p_GetItem("height").p_ToFloat());
	this.m_ParticleType=(t_json_object.p_GetItem("particle_type").p_ToInt());
	this.m_blend=(t_json_object.p_GetItem("blending").p_ToInt());
	var t_=t_json_color_stack.m_values.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_json_color=t_.p_NextObject();
		var t_json_color_obj=object_downcast((t_json_color),c_JSONObject);
		this.m_ColorStack.p_Push37(c_Color.m_new2.call(new c_Color,(t_json_color_obj.p_GetItem("r").p_ToFloat()),(t_json_color_obj.p_GetItem("g").p_ToFloat()),(t_json_color_obj.p_GetItem("b").p_ToFloat()),1.0));
	}
}
c_ParticleEmitter.prototype.p__recycle=function(){
	if(this.m__unused.p_Length2()>0){
		var t_c=null;
		if(this.m_ColorStack.p_Length2()>0){
			t_c=this.m_ColorStack.p_Get((bb_random_Rnd2(0.0,(this.m_ColorStack.p_Length2())))|0);
		}else{
			t_c=this.m_BaseColor;
		}
		var t_positionX=0;
		var t_positionY=0;
		if(this.m_EmitterType==c_ParticleEmitter.m_TYPE_CIRCLE){
			t_positionX=((bb_random_Rnd2(this.m_Position.p_X2()-this.m_Radius/2.0,this.m_Position.p_X2()+this.m_Radius/2.0))|0);
			t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2()-this.m_Radius/2.0,this.m_Position.p_Y2()+this.m_Radius/2.0))|0);
		}else{
			t_positionX=((bb_random_Rnd2(this.m_Position.p_X2(),this.m_Position.p_X2()+this.m_Position.p_Width()))|0);
			t_positionY=((bb_random_Rnd2(this.m_Position.p_Y2(),this.m_Position.p_Y2()+this.m_Position.p_Height()))|0);
		}
		var t_p=this.m__unused.p_Get(0);
		t_p.m_Position.p_X(t_positionX);
		t_p.m_Position.p_Y(t_positionY);
		t_p.m_Radius=bb_random_Rnd2(this.m_minParticleRadius,this.m_maxParticleRadius);
		t_p.m_color=t_c;
		t_p.m_Velocity.m_X=bb_random_Rnd2(this.m_xminVelocity,this.m_xmaxVelocity);
		t_p.m_Velocity.m_Y=bb_random_Rnd2(this.m_yminVelocity,this.m_ymaxVelocity);
		t_p.m_DrawableImage=this.m_DrawableImage;
		t_p.m_LifeTime=this.m_LifeTime;
		t_p.m_type=this.m_ParticleType;
		t_p.m_Forcex=this.m_Force.m_X;
		t_p.m_Forcey=this.m_Force.m_Y;
		t_p.m_InitAlpha=this.m_AlphaChannel;
		t_p.m_ColorType=this.m_ColorType;
		t_p.m_ParentEmitter=this;
		t_p.m_RotationSpeed=bb_random_Rnd2(this.m_RotationSpeedMin,this.m_RotationSpeedMax);
		t_p.m_FadeInOut=this.m_FadeInOut;
		if(t_p.m_DrawableImage!=null){
			t_p.m__scale=t_p.m_Radius*2.0/t_p.m_DrawableImage.m_Position.p_Width();
		}
		if(this.m__updaterEnabled){
			this.m__updater.p_SetParticle(t_p);
		}
		t_p.m__life=t_p.m_LifeTime;
		this.m__tail.p_Push34(t_p);
		this.m__unused.p_Remove2(0);
	}
}
c_ParticleEmitter.prototype.p_Emit=function(t_amount){
	if(t_amount==-1){
		t_amount=((this.m_SpanAmount)|0);
	}
	for(var t_i=0;t_i<t_amount;t_i=t_i+1){
		this.p__recycle();
	}
}
c_ParticleEmitter.prototype.p_Update=function(){
	if(this.m__maxAllocations<=0){
		error("you must use SetMaxAllocations() to set allocation number");
		return;
	}
	if(this.m_autoEmit){
		this.m__counter=this.m__counter+(c_Time.m_Delta());
		if(this.m__counter>=(this.m_SpanTime)){
			this.p_Emit(-1);
			this.m__counter=0.0;
		}
	}
	for(var t_i=0;t_i<this.m__tail.p_Length2();t_i=t_i+1){
		var t_current_particle=this.m__tail.p_Get(t_i);
		t_current_particle.p_Update();
		if(this.m__updaterEnabled){
			this.m__updater.p_Update2(t_current_particle,c_Time.m_Delta());
		}
		if(this.m__tail.p_Get(t_i).m_LifeTime<=0.0){
			this.m__unused.p_Push34(t_current_particle);
			this.m__tail.p_Remove2(t_i);
			t_i-=1;
		}
	}
}
c_ParticleEmitter.prototype.p_Render=function(){
	bb_graphics_PushMatrix();
	bb_graphics_SetBlend(this.m_blend);
	bb_graphics_SetColor(this.m_BaseColor.m_r,this.m_BaseColor.m_g,this.m_BaseColor.m_b);
	var t_=this.m__tail.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_t.p_Render();
	}
	bb_graphics_SetBlend(0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_PopMatrix();
	bb_graphics_SetColor(255.0,255.0,255.0);
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
	this.m_Position=c_Rectangle.m_new3.call(new c_Rectangle,0.0,0.0,0.0,0.0);
	this.m_Position.p_X(t_x);
	this.m_Position.p_Y(t_y);
	this.m_Radius=t_rad;
	this.m_Velocity=t_vel;
	this.m_color=t_c;
	this.m_LifeTime=t_lt;
	this.m__life=t_lt;
	this.m_type=t_t;
	this.m_DrawableImage=t_img;
	this.m_InitAlpha=t_alpha;
	this.m_Forcex=t_forcex;
	this.m_Forcey=t_forcey;
	if(this.m_DrawableImage!=null){
		this.m__scale=t_rad*2.0/this.m_DrawableImage.m_Position.p_Width();
	}
	this.m_ColorType=t_colorT;
	this.m_ParentEmitter=t_parent;
	return this;
}
c_Particle.m_new2=function(){
	return this;
}
c_Particle.prototype.p_Update=function(){
	var t_=this.m_Position;
	this.m_Position.p_X(t_.p_X2()+this.m_Velocity.m_X*c_Time.m_DeltaSecs());
	var t_2=this.m_Position;
	this.m_Position.p_Y(t_2.p_Y2()+this.m_Velocity.m_Y*c_Time.m_DeltaSecs());
	this.m_Velocity.m_X+=this.m_Forcex*c_Time.m_DeltaSecs();
	this.m_Velocity.m_Y+=this.m_Forcey*c_Time.m_DeltaSecs();
	if(this.m_Forcex!=0.0){
		this.m_Forcex-=this.m_Forcex*c_Time.m_DeltaSecs();
	}
	if(this.m_Forcey!=0.0){
		this.m_Forcey-=this.m_Forcey*c_Time.m_DeltaSecs();
	}
	this.m_LifeTime=this.m_LifeTime-(c_Time.m_Delta());
	if(!this.m_FadeInOut){
		this.m__alpha=this.m_InitAlpha*(this.m_LifeTime/this.m__life);
	}else{
		var t_hlife=this.m__life*0.5;
		if(this.m_LifeTime>t_hlife){
			this.m__alpha=this.m__life*this.m_InitAlpha/this.m_LifeTime-this.m_InitAlpha;
		}else{
			this.m__alpha=this.m_InitAlpha*(this.m_LifeTime/t_hlife);
		}
	}
	if(this.m_RotationSpeed!=0.0){
		this.m_Angle+=this.m_RotationSpeed*c_Time.m_DeltaSecs();
	}
}
c_Particle.prototype.p_Render=function(){
	bb_graphics_PushMatrix();
	if(this.m_ColorType==c_ParticleEmitter.m_COLOR_RANDOM){
		bb_graphics_SetColor(this.m_color.m_r,this.m_color.m_g,this.m_color.m_b);
	}else{
		var t_colorIndex=((this.m_LifeTime/(this.m__life/(this.m_ParentEmitter.m_ColorStack.p_Length2())))|0);
		t_colorIndex=bb_math_Max(0,bb_math_Min(t_colorIndex,this.m_ParentEmitter.m_ColorStack.p_Length2()-1));
		var t_col=this.m_ParentEmitter.m_ColorStack.p_Get(t_colorIndex);
		bb_graphics_SetColor(t_col.m_r,t_col.m_g,t_col.m_b);
	}
	bb_graphics_SetAlpha(this.m__alpha);
	if(this.m_DrawableImage==null){
		if(this.m_type==0){
			bb_graphics_DrawCircle(this.m_Position.p_X2(),this.m_Position.p_Y2(),this.m_Radius);
		}else{
			bb_graphics_DrawRect(this.m_Position.p_X2()-this.m_Radius,this.m_Position.p_Y2()-this.m_Radius,this.m_Radius*2.0,this.m_Radius*2.0);
		}
	}else{
		bb_graphics_Scale(this.m__scale,this.m__scale);
		this.m_DrawableImage.p_SetRotation(this.m_Angle);
		this.m_DrawableImage.m_Position.p_X((this.m_Position.p_X2()-this.m_Radius)/this.m__scale);
		this.m_DrawableImage.m_Position.p_Y((this.m_Position.p_Y2()-this.m_Radius)/this.m__scale);
		this.m_DrawableImage.p_Render();
	}
	bb_graphics_SetAlpha(1.0);
	bb_graphics_PopMatrix();
}
c_Particle.prototype.p_Create=function(){
}
function c_Stack13(){
	Object.call(this);
	this.m_length=0;
	this.m_data=[];
}
c_Stack13.m_NIL=null;
c_Stack13.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack13.m_NIL;
	}
	this.m_length=0;
}
c_Stack13.prototype.p_Push34=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack13.prototype.p_Push35=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push34(t_values[t_offset+t_i]);
	}
}
c_Stack13.prototype.p_Push36=function(t_values,t_offset){
	this.p_Push35(t_values,t_offset,t_values.length-t_offset);
}
c_Stack13.m_new=function(){
	return this;
}
c_Stack13.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack13.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack13.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack13.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack13.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack13.prototype.p_Remove2=function(t_index){
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		this.m_data[t_i]=this.m_data[t_i+1];
	}
	this.m_length-=1;
	this.m_data[this.m_length]=c_Stack13.m_NIL;
}
c_Stack13.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator12.m_new.call(new c_Enumerator12,this);
}
function c_Color(){
	Object.call(this);
	this.m_r=.0;
	this.m_g=.0;
	this.m_b=.0;
	this.m_a=.0;
}
c_Color.m_new=function(){
	this.m_r=0.0;
	this.m_g=0.0;
	this.m_b=0.0;
	this.m_a=1.0;
	return this;
}
c_Color.m_new2=function(t_r,t_g,t_b,t_a){
	this.m_r=t_r;
	this.m_g=t_g;
	this.m_b=t_b;
	this.m_a=t_a;
	return this;
}
c_Color.m_White=function(){
	return c_Color.m_new2.call(new c_Color,255.0,255.0,255.0,1.0);
}
function c_Stack14(){
	Object.call(this);
	this.m_length=0;
	this.m_data=[];
}
c_Stack14.m_NIL=null;
c_Stack14.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack14.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack14.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack14.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack14.m_new=function(){
	return this;
}
c_Stack14.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack14.prototype.p_Push37=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack14.prototype.p_Push38=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push37(t_values[t_offset+t_i]);
	}
}
c_Stack14.prototype.p_Push39=function(t_values,t_offset){
	this.p_Push38(t_values,t_offset,t_values.length-t_offset);
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function c_Enumerator7(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator7.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator7.m_new2=function(){
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator7.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_Enemy(){
	Object.call(this);
	this.m_position=null;
	this.m_type="";
	this.m_animated_sprite=null;
	this.m_cannon=null;
	this.m_ai=null;
	this.m_explosion=null;
	this.m_player_position=null;
	this.m_visible=true;
	this.m_state=0;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_Enemy.prototype.p_CreateSprite=function(){
	this.m_animated_sprite=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"enemies.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),9.0,9.0,6,0.0);
	this.m_animated_sprite.p_AddSequence("4097",[0]);
	this.m_animated_sprite.p_AddSequence("4098",[1]);
	this.m_animated_sprite.p_AddSequence("4099",[2]);
	this.m_animated_sprite.p_AddSequence("4100",[3]);
	this.m_animated_sprite.p_AddSequence("4101",[4]);
	this.m_animated_sprite.p_AddSequence("play",[5]);
	this.m_animated_sprite.p_PlaySequence(this.m_type,100,true);
}
c_Enemy.prototype.p_Create=function(){
	this.p_CreateSprite();
	c_CollisionEngine.m_Instance2().p_AddStaticBody(this);
	this.m_cannon=c_EnemyCannon.m_new.call(new c_EnemyCannon);
	this.m_ai=c_SimpleShotAI.m_new.call(new c_SimpleShotAI,this);
	this.m_explosion=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"explosion.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),9.0,9.0,14,0.0);
	this.m_explosion.p_AddSequence("explode",[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
}
c_Enemy.m_new=function(t_position,t_type){
	this.m_position=t_position;
	var t_=this.m_position;
	this.m_position.p_Y(t_.p_Y2()-t_position.p_Height());
	this.m_type=t_type;
	this.p_Create();
	return this;
}
c_Enemy.m_new2=function(){
	return this;
}
c_Enemy.prototype.p_AAShot=function(){
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2()-1.0)|0),((this.m_position.p_Y2())|0));
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2()+1.0)|0),((this.m_position.p_Y2())|0));
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2())|0),((this.m_position.p_Y2()-1.0)|0));
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2())|0),((this.m_position.p_Y2()+1.0)|0));
}
c_Enemy.prototype.p_XShot=function(){
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2()-1.0)|0),((this.m_position.p_Y2()-1.0)|0));
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2()+1.0)|0),((this.m_position.p_Y2()+1.0)|0));
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2()+1.0)|0),((this.m_position.p_Y2()-1.0)|0));
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_position.p_X2()-1.0)|0),((this.m_position.p_Y2()+1.0)|0));
}
c_Enemy.prototype.p_Shot=function(){
	if(this.m_type=="4097"){
		this.p_AAShot();
	}else{
		if(this.m_type=="4098"){
			this.p_AAShot();
			this.p_XShot();
		}else{
			if(this.m_type=="4099"){
				this.p_XShot();
			}
		}
	}
}
c_Enemy.prototype.p_Update=function(){
	if(!this.m_visible){
		return;
	}
	if(this.m_state==0){
		this.m_animated_sprite.p_Update();
		this.m_ai.p_Update();
		this.m_cannon.p_Update();
	}else{
		if(this.m_state==1){
			this.m_explosion.p_Update();
			if(this.m_explosion.p_IsLastFrame()){
				this.m_state=2;
			}
		}else{
			if(this.m_state==2){
				this.m_visible=false;
			}
		}
	}
}
c_Enemy.prototype.p_Render=function(){
	if(!this.m_visible){
		return;
	}
	if(this.m_state==0){
		bb_graphics_PushMatrix();
		bb_graphics_Translate(this.m_position.p_X2(),this.m_position.p_Y2());
		this.m_animated_sprite.p_Render();
		bb_graphics_PopMatrix();
		this.m_cannon.p_Render();
	}else{
		if(this.m_state==1){
			this.m_explosion.p_Render();
		}
	}
}
c_Enemy.prototype.p_GetBox=function(){
	return this.m_position;
}
c_Enemy.prototype.p_OnCollide=function(t_name){
	if(t_name=="player" || t_name=="player_bullet"){
		c_Time.m_Freeze(100);
		this.m_explosion.p_PlaySequence("explode",70,true);
		this.m_explosion.m_Position.p_X(this.m_position.p_X2());
		this.m_explosion.m_Position.p_Y(this.m_position.p_Y2());
		this.m_state=1;
		this.m_cannon.p_Destroy2();
		c_CollisionEngine.m_Instance2().p_Destroy(this);
	}
}
c_Enemy.prototype.p_GetName=function(){
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
	var t_=this.m_position;
	this.m_position.p_X(t_.p_X2()+3.0);
	var t_2=this.m_position;
	this.m_position.p_Y(t_2.p_Y2()+2.0);
	this.m_sprite=c_lpImage.m_new.call(new c_lpImage,"powerup.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),0);
	c_CollisionEngine.m_Instance2().p_AddStaticBody(this);
}
c_PowerUp.m_new=function(t_position){
	this.m_position=t_position;
	this.p_Create();
	return this;
}
c_PowerUp.m_new2=function(){
	return this;
}
c_PowerUp.prototype.p_Update=function(){
}
c_PowerUp.prototype.p_Render=function(){
	if(!this.m_visible){
		return;
	}
	bb_graphics_PushMatrix();
	bb_graphics_Translate(this.m_position.p_X2(),this.m_position.p_Y2());
	this.m_sprite.p_Render();
	bb_graphics_PopMatrix();
}
c_PowerUp.prototype.p_GetBox=function(){
	return this.m_position;
}
c_PowerUp.prototype.p_Destroy2=function(){
	this.m_visible=false;
	c_CollisionEngine.m_Instance2().p_Destroy(this);
}
c_PowerUp.prototype.p_OnCollide=function(t_name){
	if(t_name=="player"){
		this.p_Destroy2();
	}
}
c_PowerUp.prototype.p_GetName=function(){
	return "powerup";
}
function c_EnemyCannon(){
	Object.call(this);
	this.m_visible=true;
	this.implments={c_iDrawable:1};
}
c_EnemyCannon.prototype.p_Create=function(){
}
c_EnemyCannon.m_new=function(){
	this.p_Create();
	return this;
}
c_EnemyCannon.prototype.p_Shot2=function(t_ox,t_oy,t_dx,t_dy){
	var t_v=c_Vec2.m_new.call(new c_Vec2,(t_dx-t_ox),(t_dy-t_oy));
	c_EnemyBullet.m_new.call(new c_EnemyBullet,c_Vec2.m_new.call(new c_Vec2,(t_ox),(t_oy)),t_v.p_UnitVector(null));
}
c_EnemyCannon.prototype.p_Update=function(){
}
c_EnemyCannon.prototype.p_Render=function(){
}
c_EnemyCannon.prototype.p_Destroy2=function(){
	this.m_visible=false;
}
function c_SimpleShotAI(){
	Object.call(this);
	this.m_parent=null;
	this.m_shot_timer=0;
	this.m_shot_time=2000;
	this.implments={c_iDrawable:1};
}
c_SimpleShotAI.prototype.p_Create=function(){
}
c_SimpleShotAI.m_new=function(t_parent){
	this.m_parent=t_parent;
	this.p_Create();
	return this;
}
c_SimpleShotAI.m_new2=function(){
	return this;
}
c_SimpleShotAI.prototype.p_Update=function(){
	this.m_shot_timer+=c_Time.m_Delta();
	if(this.m_shot_timer>=this.m_shot_time){
		this.m_shot_timer=0;
		this.m_parent.p_Shot();
	}
}
c_SimpleShotAI.prototype.p_Render=function(){
}
function c_EnemyTurret(){
	c_Enemy.call(this);
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_EnemyTurret.prototype=extend_class(c_Enemy);
c_EnemyTurret.m_new=function(t_position,t_gid){
	c_Enemy.m_new.call(this,t_position,t_gid);
	return this;
}
c_EnemyTurret.m_new2=function(){
	c_Enemy.m_new2.call(this);
	return this;
}
c_EnemyTurret.prototype.p_Create=function(){
	c_Enemy.prototype.p_Create.call(this);
	c_CollisionEngine.m_Instance2().p_AddStaticBody(this);
	this.m_cannon=c_EnemyCannon.m_new.call(new c_EnemyCannon);
}
c_EnemyTurret.prototype.p_Shot=function(){
	this.m_cannon.p_Shot2(((this.m_position.p_X2())|0),((this.m_position.p_Y2())|0),((this.m_player_position.p_CenterX())|0),((this.m_player_position.p_CenterY())|0));
}
function c_EnemyWave(){
	c_Enemy.call(this);
	this.m_active=null;
	this.m_wavymovement=null;
	this.implments={c_iDrawable:1,c_iOnCollide:1};
}
c_EnemyWave.prototype=extend_class(c_Enemy);
c_EnemyWave.m_new=function(t_position){
	c_Enemy.m_new.call(this,t_position,"play");
	this.m_position=t_position;
	this.m_active=c_ActiveOnCamera.m_new.call(new c_ActiveOnCamera,this.m_position);
	this.m_wavymovement=c_WavyMovement.m_new.call(new c_WavyMovement,this.m_position);
	this.p_Create();
	return this;
}
c_EnemyWave.m_new2=function(){
	c_Enemy.m_new2.call(this);
	return this;
}
c_EnemyWave.prototype.p_Update=function(){
	c_Enemy.prototype.p_Update.call(this);
	this.m_active.p_Update();
	if(!this.m_active.p_IsActive()){
		return;
	}
	this.m_animated_sprite.p_Update();
	this.m_wavymovement.p_Update();
}
c_EnemyWave.prototype.p_Shot=function(){
}
function c_ActiveOnCamera(){
	Object.call(this);
	this.m_target=null;
	this.m_viewport=null;
	this.m_active=false;
	this.implments={c_iDrawable:1};
}
c_ActiveOnCamera.m_new=function(t_target){
	this.m_target=t_target;
	this.m_viewport=c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort;
	return this;
}
c_ActiveOnCamera.m_new2=function(){
	return this;
}
c_ActiveOnCamera.prototype.p_Update=function(){
	if(c_Collision.m_AABBIntersects(this.m_target,this.m_viewport)){
		this.m_active=true;
	}else{
		this.m_active=false;
	}
}
c_ActiveOnCamera.prototype.p_IsActive=function(){
	return this.m_active;
}
c_ActiveOnCamera.prototype.p_Create=function(){
}
c_ActiveOnCamera.prototype.p_Render=function(){
}
function c_WavyMovement(){
	Object.call(this);
	this.m_target=null;
	this.m_initial_y=0;
	this.m_speed=-25;
	this.implments={c_iDrawable:1};
}
c_WavyMovement.m_new=function(t_target){
	this.m_target=t_target;
	this.m_initial_y=((this.m_target.p_Y2())|0);
	return this;
}
c_WavyMovement.m_new2=function(){
	return this;
}
c_WavyMovement.prototype.p_Update=function(){
	var t_=this.m_target;
	this.m_target.p_X(t_.p_X2()+(this.m_speed)*c_Time.m_DeltaSecs());
	this.m_target.p_Y((this.m_initial_y)+Math.sin((this.m_target.p_X2() % 45.0*8.0)*D2R)*7.0);
}
c_WavyMovement.prototype.p_Create=function(){
}
c_WavyMovement.prototype.p_Render=function(){
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
	c_Enemy.m_new.call(this,t_position,t_gid);
	return this;
}
c_EnemyRectLine.m_new2=function(){
	c_Enemy.m_new2.call(this);
	return this;
}
c_EnemyRectLine.prototype.p_CreateSprite=function(){
	this.m_animated_sprite=c_AnimatedSprite.m_new.call(new c_AnimatedSprite,"rectline_enemy.png",c_Vec2.m_new.call(new c_Vec2,0.0,0.0),25.0,10.0,1,0.0);
	this.m_animated_sprite.p_AddSequence(this.m_type,[0]);
	this.m_animated_sprite.p_PlaySequence(this.m_type,100,true);
}
c_EnemyRectLine.prototype.p_Update=function(){
	c_Enemy.prototype.p_Update.call(this);
	if(c_Collision.m_AABBIntersects(c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort,this.m_position)){
		if(this.m_shot_state==0){
			this.m_position.p_X(c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort.p_X2()+c_Game.m_Instance().p_GetCurrentCamera().m_ViewPort.p_Width()-10.0);
			if(this.m_wait_timer>=this.m_wait_time){
				this.m_shot_state=1;
				this.m_wait_timer=0;
			}
			this.m_wait_timer+=c_Time.m_Delta();
		}else{
			if(this.m_shot_state==1){
				var t_=this.m_position;
				this.m_position.p_X(t_.p_X2()-100.0*c_Time.m_DeltaSecs());
			}
		}
	}
}
c_EnemyRectLine.prototype.p_Shot=function(){
}
function c_ClampToScreen(){
	Object.call(this);
	this.m_target=null;
	this.m_camera_viewport=null;
	this.implments={c_iDrawable:1};
}
c_ClampToScreen.m_new=function(t_target){
	this.m_target=t_target;
	return this;
}
c_ClampToScreen.m_new2=function(){
	return this;
}
c_ClampToScreen.prototype.p_Update=function(){
	if(this.m_target.p_X2()<this.m_camera_viewport.p_X2()){
		this.m_target.p_X(this.m_camera_viewport.p_X2());
	}
	if(this.m_target.p_Y2()<this.m_camera_viewport.p_Y2()){
		this.m_target.p_Y(this.m_camera_viewport.p_Y2());
	}
	if(this.m_target.p_X2()+this.m_target.p_Width()>this.m_camera_viewport.p_X2()+this.m_camera_viewport.p_Width()){
		this.m_target.p_X(this.m_camera_viewport.p_X2()+this.m_camera_viewport.p_Width()-this.m_target.p_Width());
	}
	if(this.m_target.p_Y2()+this.m_target.p_Height()>this.m_camera_viewport.p_Y2()+this.m_camera_viewport.p_Height()){
		this.m_target.p_Y(this.m_camera_viewport.p_Y2()+this.m_camera_viewport.p_Height()-this.m_target.p_Height());
	}
}
c_ClampToScreen.prototype.p_Create=function(){
}
c_ClampToScreen.prototype.p_Render=function(){
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
	this.m_target=t_target;
	return this;
}
c_CameraControl.m_new2=function(){
	return this;
}
c_CameraControl.prototype.p_Update=function(){
	if(this.m_target.p_X2()+this.m_target.p_Width()>=(this.m_max_x)){
		this.m_target.p_X((this.m_max_x)-this.m_target.p_Width());
	}else{
		var t_=this.m_target;
		this.m_target.p_X(t_.p_X2()+this.m_x_speed*c_Time.m_DeltaSecs());
		var t_2=this.m_target;
		this.m_target.p_Y(t_2.p_Y2()+this.m_y_speed*c_Time.m_DeltaSecs());
		var t_3=this.m_player;
		this.m_player.p_X(t_3.p_X2()+this.m_x_speed*c_Time.m_DeltaSecs());
	}
}
c_CameraControl.prototype.p_Create=function(){
}
c_CameraControl.prototype.p_Render=function(){
}
function c_Enumerator8(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator8.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator8.m_new2=function(){
	return this;
}
c_Enumerator8.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator8.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_NodeEnumerator.m_new2=function(){
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t;
}
function bb_math_Clamp(t_n,t_min,t_max){
	if(t_n<t_min){
		return t_min;
	}
	if(t_n>t_max){
		return t_max;
	}
	return t_n;
}
function bb_math_Clamp2(t_n,t_min,t_max){
	if(t_n<t_min){
		return t_min;
	}
	if(t_n>t_max){
		return t_max;
	}
	return t_n;
}
function bb_graphics_DrawCircle(t_x,t_y,t_r){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawOval(t_x-t_r,t_y-t_r,t_r*2.0,t_r*2.0);
	return 0;
}
function c_Enumerator9(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator9.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator9.m_new2=function(){
	return this;
}
c_Enumerator9.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator9.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_Collision(){
	Object.call(this);
}
c_Collision.m_AABBIntersects=function(t_r1,t_r2){
	if(t_r1.p_X2()+t_r1.p_Width()<t_r2.p_X2() || t_r1.p_Y2()+t_r1.p_Height()<t_r2.p_Y2() || t_r1.p_X2()>t_r2.p_X2()+t_r2.p_Width() || t_r1.p_Y2()>t_r2.p_Y2()+t_r2.p_Height()){
		return false;
	}
	return true;
}
function c_SAT(){
	Object.call(this);
}
c_SAT.m_RectVsRect=function(t_r1,t_r2,t_rtn){
	var t_horizontalOverlap=.0;
	var t_horizontalDirection=.0;
	var t_verticalOverlap=.0;
	var t_verticalDirection=.0;
	var t_r1hw=t_r1.p_Width()/2.0;
	var t_r2hw=t_r2.p_Width()/2.0;
	var t_r1hh=t_r1.p_Height()/2.0;
	var t_r2hh=t_r2.p_Height()/2.0;
	t_rtn.m_X=0.0;
	t_rtn.m_Y=0.0;
	t_horizontalOverlap=t_r1hw+t_r2hw-bb_math_Abs2(t_r1.p_X2()+t_r1hw-(t_r2.p_X2()+t_r2hw));
	if(t_horizontalOverlap<=0.0){
		return false;
	}
	t_verticalOverlap=t_r1hh+t_r2hh-bb_math_Abs2(t_r1.p_Y2()+t_r1hh-(t_r2.p_Y2()+t_r2hh));
	if(t_verticalOverlap<=0.0){
		return false;
	}
	if(t_horizontalOverlap<t_verticalOverlap){
		t_horizontalDirection=bb_math_Sgn2(t_r1.p_X2()+t_r1hw-(t_r2.p_X2()+t_r2hw));
		t_rtn.m_X+=t_horizontalOverlap*t_horizontalDirection*-1.0;
	}else{
		t_verticalDirection=bb_math_Sgn2(t_r1.p_Y2()+t_r1hh-(t_r2.p_Y2()+t_r2hh));
		t_rtn.m_Y+=t_verticalOverlap*t_verticalDirection*-1.0;
	}
	return true;
}
c_SAT.m_info=null;
c_SAT.m_edge=null;
c_SAT.m_axis=null;
c_SAT.m_calculateInterval=function(t_r1,t_axis){
	t_r1.p_Min(c_Vec2.m_Dot(t_r1.p_PointStack().p_Get(0).p_X2(),t_r1.p_PointStack().p_Get(0).p_Y2(),t_axis.m_X,t_axis.m_Y));
	t_r1.p_Max(c_Vec2.m_Dot(t_r1.p_PointStack().p_Get(0).p_X2(),t_r1.p_PointStack().p_Get(0).p_Y2(),t_axis.m_X,t_axis.m_Y));
	for(var t_i=1;t_i<t_r1.p_PointStack().p_Length2();t_i=t_i+1){
		var t_d=c_Vec2.m_Dot(t_r1.p_PointStack().p_Get(t_i).p_X2(),t_r1.p_PointStack().p_Get(t_i).p_Y2(),t_axis.m_X,t_axis.m_Y);
		if(t_d<t_r1.p_Min2()){
			t_r1.p_Min(t_d);
		}else{
			if(t_d>t_r1.p_Max2()){
				t_r1.p_Max(t_d);
			}
		}
	}
}
c_SAT.m_mina=0;
c_SAT.m_maxa=0;
c_SAT.m_minb=0;
c_SAT.m_maxb=0;
c_SAT.m_sep=null;
c_SAT.m_separatedByAxis=function(t_r1,t_r2,t_axis){
	c_SAT.m_calculateInterval(t_r1,t_axis);
	c_SAT.m_mina=t_r1.p_Min2();
	c_SAT.m_maxa=t_r1.p_Max2();
	c_SAT.m_calculateInterval(t_r2,t_axis);
	c_SAT.m_minb=t_r2.p_Min2();
	c_SAT.m_maxb=t_r2.p_Max2();
	var t_d0=c_SAT.m_maxb-c_SAT.m_mina;
	var t_d1=c_SAT.m_minb-c_SAT.m_maxa;
	if(t_d0<0.0 || t_d1>0.0){
		return true;
	}
	var t_overlap=0.0;
	if(t_d0<-t_d1){
		t_overlap=t_d0;
	}else{
		t_overlap=t_d1;
	}
	var t_axis_length_squared=c_Vec2.m_DotSquared(t_axis.m_X,t_axis.m_Y);
	if(!(t_axis_length_squared>0.00000000001)){
		error("axis_length_squared: no puede ser menor a 0.00000000001");
	}
	c_SAT.m_sep.m_X=t_axis.m_X*(t_overlap/t_axis_length_squared);
	c_SAT.m_sep.m_Y=t_axis.m_Y*(t_overlap/t_axis_length_squared);
	var t_sep_length_squared=c_Vec2.m_DotSquared(c_SAT.m_sep.m_X,c_SAT.m_sep.m_Y);
	if(t_sep_length_squared<c_SAT.m_info.m_LengthSquared || c_SAT.m_info.m_LengthSquared<0.0){
		c_SAT.m_info.m_LengthSquared=t_sep_length_squared;
		c_SAT.m_info.m_mtd.m_X=c_SAT.m_sep.m_X;
		c_SAT.m_info.m_mtd.m_Y=c_SAT.m_sep.m_Y;
	}
	return false;
}
c_SAT.m_PolyVsPoly=function(t_r1,t_r2,t_rtn){
	if(t_rtn!=null){
		t_rtn.m_X=0.0;
		t_rtn.m_Y=0.0;
	}
	c_SAT.m_info.m_mtd.m_X=0.0;
	c_SAT.m_info.m_mtd.m_Y=0.0;
	c_SAT.m_info.m_LengthSquared=-1.0;
	c_SAT.m_info.m_overlap=true;
	var t_j=t_r1.p_Vertices().p_Length2()-1;
	for(var t_i=0;t_i<t_r1.p_Vertices().p_Length2();t_i=t_i+1){
		var t_v0=t_r1.p_Vertices().p_Get(t_j);
		var t_v1=t_r1.p_Vertices().p_Get(t_i);
		c_SAT.m_edge.m_X=t_v1.p_X2()-t_v0.p_X2();
		c_SAT.m_edge.m_Y=t_v1.p_Y2()-t_v0.p_Y2();
		c_SAT.m_edge.p_Perp(c_SAT.m_axis);
		if(c_SAT.m_separatedByAxis(t_r1,t_r2,c_SAT.m_axis)){
			c_SAT.m_info.m_overlap=false;
		}
		t_j=t_i;
	}
	t_j=t_r2.p_Vertices().p_Length2()-1;
	for(var t_i2=0;t_i2<t_r2.p_Vertices().p_Length2();t_i2=t_i2+1){
		var t_v02=t_r2.p_Vertices().p_Get(t_j);
		var t_v12=t_r2.p_Vertices().p_Get(t_i2);
		c_SAT.m_edge.m_X=t_v12.p_X2()-t_v02.p_X2();
		c_SAT.m_edge.m_Y=t_v12.p_Y2()-t_v02.p_Y2();
		c_SAT.m_edge.p_Perp(c_SAT.m_axis);
		if(c_SAT.m_separatedByAxis(t_r1,t_r2,c_SAT.m_axis)){
			c_SAT.m_info.m_overlap=false;
		}
		t_j=t_i2;
	}
	if(c_SAT.m_info.m_overlap && t_rtn!=null){
		t_rtn.m_X=-c_SAT.m_info.m_mtd.m_X;
		t_rtn.m_Y=-c_SAT.m_info.m_mtd.m_Y;
	}
	return c_SAT.m_info.m_overlap;
}
c_SAT.m_Collide=function(t_r1,t_r2,t_rtn){
	if(t_r1.p_GetType()==3 && t_r2.p_GetType()==3){
		return c_SAT.m_RectVsRect(t_r1,t_r2,t_rtn);
	}else{
		if(c_Collision.m_AABBIntersects(t_r1,t_r2)){
			return c_SAT.m_PolyVsPoly(t_r1,t_r2,t_rtn);
		}
	}
	return false;
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Sgn(t_x){
	if(t_x<0){
		return -1;
	}
	return ((t_x>0)?1:0);
}
function bb_math_Sgn2(t_x){
	if(t_x<0.0){
		return -1.0;
	}
	if(t_x>0.0){
		return 1.0;
	}
	return 0.0;
}
function c_lpCollisionInfo(){
	Object.call(this);
	this.m_mtd=c_Vec2.m_new.call(new c_Vec2,0.0,0.0);
	this.m_LengthSquared=0.0;
	this.m_overlap=false;
}
c_lpCollisionInfo.m_new=function(){
	return this;
}
function c_Enumerator10(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator10.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator10.m_new2=function(){
	return this;
}
c_Enumerator10.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator10.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_input_KeyDown(t_key){
	return ((bb_input_device.p_KeyDown(t_key))?1:0);
}
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function c_Enumerator11(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator11.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator11.m_new2=function(){
	return this;
}
c_Enumerator11.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator11.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Math(){
	Object.call(this);
}
c_Math.m_Round=function(t_N){
	var t_int_part=((t_N)|0);
	if(t_N-(t_int_part)>=0.5){
		t_int_part+=1;
	}
	return (t_int_part);
}
function c_Enumerator12(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator12.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator12.m_new2=function(){
	return this;
}
c_Enumerator12.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator12.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
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
}
//${TRANSCODE_END}
