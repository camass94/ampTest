(function () {
    var _self = {};
    _self.isMobile = false;

    _self.getData = function(url, cFunc) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //Ajax구현부분
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //통신 성공시 구현부분
                var obj =  JSON.parse(xmlhttp.responseText);
                cFunc(obj);
                // console.log(obj)
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    _self.sliderJS = {
        init : function(el, op) {
            var _this = this;
            _this.options = {
                autoplay: false,
                infinite: true,
                dots: true,
                arrow: true,
                arrowClass: {
                    wrap: 'carousel-controller'
                    ,prev : 'btn-prev'
                    ,next : 'btn-next'
                },
                initialSlide : 0
            };
            _this.options = Object.assign(_this.options, op);
            _options = _this.options;
            _this.el = document.querySelector( el );
            _this.wrapper = _this.el.getElementsByClassName( "carousel-wrap-items" );
            _this.items = _this.el.getElementsByClassName( "item" );
            _this.size = _this.items.length;

            if(_options.dots) {
                _this.setNavigate();
            }
            if(_options.arrow) {
                _this.setArrow();
            }

            return _this.runSlide();
        },
        runSlide : function() {
            var _this = this;
            _this.itemWidth = _this.items[0].children[0].offsetWidth;
            _this.itemWrapWidth = _this.itemWidth*_this.items.length;
            for( var i = 0; i < _this.size; ++i ) {
                _this.items[i].style.width= _this.itemWidth + 'px';
                _this.items[i].style.left = (i*_this.itemWidth) + 'px';
            }
            _this.wrapper[0].style.width = _this.itemWrapWidth + 'px';

            _this.setActiceSlide();
        },
        setActiceSlide : function(i, flag) {
           var _this = this,
            idx = (i==undefined)?_this.options.initialSlide:i;
            if(flag == true) {
                if(_options.infinite) {
                    idx = (idx+1>=_this.size) ? 0 : idx+1;
                }else {
                    idx = (idx+1>=_this.size) ? _this.size-1 : idx+1;
                }
            }else if(flag == false) {
                if(_options.infinite) {
                    idx = (idx-1<0) ? _this.size-1 : idx-1;
                }else {
                    idx = (idx-1<0) ? 0 : idx-1;
                }
            }

            for( var i = 0; i < _this.size; ++i ) {
               _this.items[i].classList.remove("active");
            }
            _this.wrapper[0].style.left = _this.itemWidth*idx*(-1) + 'px';
            _this.items[idx].classList.add("active");
            _options.initialSlide = idx;
        },
        addEvent : function(el, idx) {
            var _this = this;
            if(typeof idx == "boolean") {
                var flag = idx;
                idx = undefined;
            }
            if (window.addEventListener) {
                el.addEventListener("click", function(e) {
                    return _this.setActiceSlide(idx, flag);
                }, false); 
            }else if (window.attachEvent) {
                el.attachEvent("onclick", function(e) {
                    return _this.setActiceSlide(idx, flag);
                });
            }else { 
                el["onclick"]= function(e) {
                    return _this.setActiceSlide(idx, flag);
                }; 
            }
        },
        setNavigate : function() {
            var _this = this,
            html = '<div class="carousel-wrap-dots">';
            if (_this.el.querySelector('.carousel-wrap-dots')!=null) return;
            for( var i = 0; i < _this.size; ++i ) {
                html += '<a href="#item'+i+'" class="dot" data-dot-index="'+i+'"><span>item '+i+'</span></a>'
            }
            html += '</div>';
            _this.el.innerHTML += html;
        },
        setArrow : function() {
            var _this = this;
            if(_this.el.querySelector('.'+_options.arrowClass.wrap)!=null) return;
            var html = '<div class="'+_options.arrowClass.wrap+'">'
            + ' <a href="#prev" class="'+_options.arrowClass.prev+'">prev</a>'
            + ' <a href="#next" class="'+_options.arrowClass.next+'">next</a> </div>';
            _this.el.innerHTML += html;
        }
    }
    document.addEventListener( "DOMContentLoaded", function() {
        var _this = _self.sliderJS;
        if(_options.dots) {
            var dot = _this.el.querySelectorAll( ".dot" );
            for( var i = 0; i < _this.size; ++i ) {
                _this.addEvent(dot[i], i);
            }
        }
        if(_options.arrow) {
            var prev = _this.el.querySelector('.'+_options.arrowClass.prev);
            var next = _this.el.querySelector('.'+_options.arrowClass.next);
            _this.addEvent(prev, false);
            _this.addEvent(next, true);
        }
    });
    if (typeof ampJS == 'undefined') {
        window.ampJS = {};
    }
    ampJS = _self;
})();

