/*! Vertical Slider - v0.1.0 - 2016-04-25
* https://github.com/ggggino/vertical-slider
* Copyright (c) 2016 David Ginanni; Licensed MIT */
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
    this.isAnimating = false;
    this.options = $.extend(opzioni, options);

    invertito = oggetto.html().replace("leftPart", "rightPart");
    oggetto.html(oggetto.html()+invertito);

    $('.rightPart .contRow').reverseChildren();
    
    this.resizePage();

    //eventi vari
    function handleScroll(e){
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
    $( window ).resize(function() {
      questo.resizePage();
    });

    oggetto[0].addEventListener('DOMMouseScroll',handleScroll,false);
    oggetto[0].addEventListener('mousewheel',    handleScroll,false);

  };

  // Static method default options.
  var opzioni = {
    selector: 'div.ruoli',
    duration: 2000
  };

  // methods.
  $.homeSlide.prototype = {
    getHeightPage: function(){
      return $(window).height();
    },
    getWidthPage: function(){
      return $(window).width();
    },
    resizePage: function(){
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
      this.centraCitazione();
      return this;
    },
    muoviPagina: function(sezione){
        return sezione;
    },
    nextSection: function(){
      var questo = this;
      if ( questo.sezioneAttuale + 1 <= $('.rightPart .contRow .contOutSez').length - 1 ){
        questo.sezioneAttuale++;

        setTimeout(function(){
          $('.citazione').fadeOut(300);
        }, 100);
        $('.leftPart .contRow').animate({
          marginTop: ( questo.getHeightPage()*questo.sezioneAttuale )*-1+"px"
        }, questo.options.duration);
        $('.rightPart .contRow').animate({
          marginTop: ( questo.getHeightPage()*questo.sezioneAttuale )+"px"
        }, questo.options.duration);
        setTimeout(function(){
          $('.citazione').fadeIn(300);
        }, questo.options.duration);
      }
    },
    prevSection: function(){
      var questo = this;
      if ( questo.sezioneAttuale - 1 >= 0 ){
        questo.sezioneAttuale--;

        setTimeout(function(){
          $('.citazione').fadeOut(300);
        }, 100);
        $('.leftPart .contRow').animate({
          marginTop: ( questo.getHeightPage()*questo.sezioneAttuale )*-1+"px",
        }, questo.options.duration);
        $('.rightPart .contRow').animate({
          marginTop: ( questo.getHeightPage()*questo.sezioneAttuale )+"px",
        }, questo.options.duration);
        setTimeout(function(){
          $('.citazione').fadeIn(300);
        }, questo.options.duration);
      }
    },
    centraCitazione: function(){
      $('.citazione').css({
        marginTop: (this.getHeightPage()/2)-($('.citazione').height()/2),
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