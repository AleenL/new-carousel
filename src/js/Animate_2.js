function _Animate($ct){
		this.$ct = $ct;
		this.init();
		this.bind();
	}
	_Animate.prototype.init = function(){
		$nextBtn = this.$nextBtn = this.$ct.find('.next-button'),
        $preBtn = this.$preBtn =this.$ct.find('.pre-button'),
        $showIng = this.$showIng=this.$ct.find('.showing-photo'),
        $showPt = this.$showPt =this.$ct.find('.photo-show'),
        $backSha = this.$backSha =this.$ct.find('.back-shadow'),
        $allPt = this.$allPt =this.$ct.find('.all-photo'),
        $seePt = this.$seePt =this.$ct.find('.see-all'),
        $PtWidth = this.$PtWidth =this.$ct.find('.carousel .img-ct'),
        $littlePtWidth = this.$littlePtWidth =this.$ct.find('.little-carousel .img-ct'),
        $FloatBtn = this.$FloatBtn = this.$ct.find('.empty'),
        $PageTitle = this.$PageTitle = this.$ct.find('.title')

        this.open = false

        $PageTitle.css('top','50%')
	}

	_Animate.prototype.bind = function(){
		var _this = this
		this.$nextBtn.on('mouseover',function(){
        	$(this).css({opacity:0,fontSize:'12px'})
        	_this.$showPt.css('right',0)
        	_this.Mouseout(_this.$showPt)
    	})

    	this.$allPt.on('click',function(){
	        $(this).css('width','220px')
	        _this.Mouseout(_this.$allPt)
	    })

	    this.$seePt.on('click',function(){
	    	_this.$PtWidth.css({'width':'1600px','left':"0"})
	    	_this.$PageTitle.css('top','950px')
	        _this.$nextBtn.css('right','-70px')
	        _this.$preBtn.css('left','-70px')
	        _this.$showPt.css('right','-330px')
	       	_this.$PtWidth.find('img').addClass('change-little')
	       	_this.$FloatBtn.css('display','block')
	       	_this.getMove(_this.$FloatBtn)
	    })

	    this.$PtWidth.find('li').on('click',function(){
        	var idx = $(this).index()
        	_this.$PageTitle.css('top','50%')
			_this.$PtWidth.css({width:'7200px','height':'100%','left':-idx*1200+'px'})
        	_this.$littlePtWidth.css({'left': -idx*300+'px'})
        	_this.$FloatBtn.css('display','none')
        	_this.$nextBtn.css('right','70px')
        	_this.$preBtn.css('left','70px')
      		_this.$PtWidth.find('img').removeClass('change-little')
   		})
    	
	}
	_Animate.prototype.getMove = function(obj){
		var _this = this;
		obj.on('mouseover',function(e){
			if($(e.target).hasClass('play-left')){
				_this.$PtWidth.animate({left:"0px"})
			}else{
				_this.$PtWidth.animate({left:"-400px"})
			}
		})
	}

	_Animate.prototype.Mouseout = function(obj){
		var _this = this
		if(obj == this.$showPt){
			obj.on('mouseleave',function(){
				$(this).css('right','-330px')
				_this.$nextBtn.css({opacity:1,fontSize:'52px'})
			})
		}
		if(obj == this.$allPt){
			obj.on('mouseleave',function(){
				$(this).css('width','70px')
			})
		}
	}
	var Animate = (function(){
		return{
			init:function($ct){
				$ct.each(function(index,node){
					new _Animate($(node))
				})
			}
		}
	})()

Animate.init($('.layout'));