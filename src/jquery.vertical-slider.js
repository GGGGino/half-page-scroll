/*
 * vertical-slider
 * https://github.com/ggggino/vertical-slider
 *
 * Copyright (c) 2014 David Ginanni
 * Licensed under the MIT license.
 */

(function($) {

  $.fn.reverseChildren = function() {
    return this.each(function(){
      var $this = $(this);
      $this.children().each(function(){
        $this.prepend(this);
      });
    });
  };

  // Static method.
  $.homeSlide = function(oggetto, options) {
    var invertito = oggetto.children().children(),
        questo = this;

    this.sezioneAttuale = 0;
    this.sezioniTot = $('.leftPart .contRow .contOutSez').length;
    this.isAnimating = false;
    this.options = $.extend(opzioni, options);
    this.keys = {37: 1, 38: 1, 39: 1, 40: 1}

    this.prepare();

    invertito = oggetto.html().replace("leftPart", "rightPart");
    oggetto.html(oggetto.html()+invertito);

    $('.rightPart .contRow').reverseChildren();
    
    this.resizePage();

    //eventi vari
    function handleScroll(e) {
      return;
      oggetto[0].removeEventListener('DOMMouseScroll',handleScroll,false);
      oggetto[0].removeEventListener('mousewheel',    handleScroll,false);

      if (e.wheelDelta > 0 && !questo.isAnimating){
        questo.prevSection();
      }else{
        questo.nextSection();
      }

      setTimeout(function(){
        oggetto[0].addEventListener('DOMMouseScroll',handleScroll,false);
        oggetto[0].addEventListener('mousewheel',    handleScroll,false);
      }, questo.options.duration);
    }

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();

        if( questo.isAnimating ){
          return false;
        }

        if (e.wheelDelta > 0 || e.keyCode === 38){
          questo.prevSection();
        }

        if (e.wheelDelta < 0|| e.keyCode === 40){
          questo.nextSection();
        }

        e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (questo.keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }
    
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;

    $( window ).resize(function() {
      questo.resizePage();
    });
  };

  // Static method default options.
  var opzioni = {
    selector: 'div.ruoli',
    duration: 2000
  };

  // methods.
  $.homeSlide.prototype = {
    prepare: function() {
      $('.contOutSez').css("background-image", "url(" + $('.contOutSez').data('image') + ")");
    },
    getHeightPage: function() {
      return $(window).height();
    },
    getWidthPage: function() {
      return $(window).width();
    },
    resizePage: function() {
      $('.contOutSez').height(this.getHeightPage());
      $('.contOutSez').width(this.getWidthPage());
      $('.rightPart .contContRow').css({
        marginTop: (($('.rightPart .contRow .contOutSez').length-1)*this.getHeightPage())*-1+"px"
      });
      $('.leftPart .contRow').css({
        marginTop: this.getHeightPage()*this.sezioneAttuale*-1+"px"
      });
      $('.rightPart .contRow').css({
        marginTop: this.getHeightPage()*this.sezioneAttuale+"px"
      });
      return this;
    },
    muoviPagina: function(sezione) {
        return sezione;
    },
    nextSection: function() {
      var questo = this;
      if ( this.sezioneAttuale < this.sezioniTot - 1 ){
        this.sezioneAttuale++;
        this.isAnimating = true;

        $('.leftPart .contRow').animate({
          marginTop: ( this.getHeightPage()*this.sezioneAttuale )*-1+"px"
        }, this.options.duration);
        $('.rightPart .contRow').animate({
          marginTop: ( this.getHeightPage()*this.sezioneAttuale )+"px"
        }, this.options.duration, function() {
          questo.isAnimating = false;
        });
      }
    },
    prevSection: function() {
      var questo = this;
      if ( this.sezioneAttuale > 0 ){
        this.sezioneAttuale--;
        this.isAnimating = true;
        console.log('entraa');
        console.log(this.sezioneAttuale);

        $('.leftPart .contRow').animate({
          marginTop: ( this.getHeightPage()*this.sezioneAttuale )*-1+"px",
        }, this.options.duration);
        $('.rightPart .contRow').animate({
          marginTop: ( this.getHeightPage()*this.sezioneAttuale )+"px",
        }, this.options.duration, function() {
          questo.isAnimating = false;
        });
      }
    },
    centraCitazione: function() {
      $('.citazione').css({
        marginTop: (this.getHeightPage()/2)-($('.citazione').height()/2)
      });
    }
  };

  // Collection method.
  $.fn.homeSlide = function(options) {
    var questo = $(this);
    options = options || {};
    if( $('.contenitoreHome').length > 0 ){
      return new $.homeSlide(questo, options);
    }else{
      return false;
    }
  };

}(jQuery));