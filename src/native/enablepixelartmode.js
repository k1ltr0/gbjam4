

function enablePixelArt()
{
    var game=BBHtml5Game.Html5Game();
    var canvas=game.GetCanvas();
    var gc=canvas.getContext( '2d' );
    gc.imageSmoothingEnabled = false;
}

