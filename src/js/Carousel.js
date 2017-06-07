    var Carousel = (function(){
        function _Carousel($ct){
        this.$ct = $ct;
        this.init();
        this.bind()
    }
    _Carousel.prototype.init = function(){
        var $imgCt = this.$imgCt = this.$ct.find(".img-ct"),
        $imgWidth = this.$imgWidth = this.$imgCt.find('li').width(),
        $firstImg = this.$firstImg = $imgCt.find("li").first(),
        $lastImg = this.lastImg = $imgCt.find("li").last(),
        $nextBtn = this.$nextBtn = this.$ct.parent().find('.next-slide'),
        $preBtn = this.$preBtn = this.$ct.parent().find('.pre-button'),
        $loadNumber = this.$loadNumber = this.$ct.parent().find('.load-number')

        this.curPageIndex = 0
        this.imgLength = $imgCt.children().length
        this.isAnimate = false

        $imgCt.prepend(this.lastImg.clone());
        $imgCt.append(this.$firstImg.clone());

        $imgCt.width(this.$firstImg.width() * $imgCt.children().length);
        $imgCt.css('left',-this.$imgWidth)


    }
    _Carousel.prototype.bind = function(){
        var _this =this;
        this.$nextBtn.on('click',function(){
            _this.$nextBtn.parent().animate({left:'260px'},1000)
            _this.$loadNumber.children('p').animate({width:'260px'},1000)
            _this.$loadNumber.children('p').css('opacity','1')
           _this.addNumber()
            _this.$nextBtn.animate({opacity:0},300)
            setTimeout(function(){
                _this.playNext()
            },1200)
        })
        this.$preBtn.on('click',function(){
            console.log(1)
            _this.playPre()
        })
    }
    _Carousel.prototype.playPre = function(){
        var _this = this;
        this.curPageIndex=this.curPageIndex||0;
        if(this.isAnimate) return;
        this.isAnimate = true;
        this.$imgCt.animate({
            left:"+="+this.$imgWidth
        },function(){
            _this.curPageIndex--;
            if (_this.curPageIndex < 0){
                _this.$imgCt.css("left", -(_this.imgLength * _this.$imgWidth));
                _this.curPageIndex = _this.imgLength - 1;
            }
        })
        this.isAnimate = false;
    }
    _Carousel.prototype.playNext = function(){
            this.curPageIndex=this.curPageIndex||0;
            var _this = this;
            if(this.isAnimate) return;
            this.isAnimate = true;
            this.$nextBtn.parent().animate({left:'0'},500)
            _this.$loadNumber.children('p').animate({width:'10px'},500)
            _this.$nextBtn.css('opacity',1)
            this.$imgCt.animate({
                left:"-="+this.$imgWidth
            },1500,function(){
                _this.$loadNumber.children('p').html(0)
                _this.curPageIndex++;
                if(_this.curPageIndex === _this.imgLength){
                    _this.$imgCt.css({
                        "left":-_this.$imgWidth
                    })
                    _this.curPageIndex = 0;
                }
            })
            _this.isAnimate = false;
        }
    _Carousel.prototype.addNumber = function(){
        var _this = this;
        var p = parseInt(this.$loadNumber.children('p').html())
        var SetTime=setInterval(function(){
            p++
            if(p >= 101){
               _this.$loadNumber.children('p').css('opacity','0')
               clearInterval(SetTime)
            }
            _this.$loadNumber.children('p').html(p)
        },10)
    }
    return{
        init: function($ct){
            $ct.each(function(index,node){
                new _Carousel($(node));
            })
        }
    }
    })()

    Carousel.init($(".carousel"));
    Carousel.init($(".photo-show"));
