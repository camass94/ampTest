(function () {
    var _self = {};
    _self.isMobile = false;

    _self.getData = function(url, fn) {
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
                fn(obj);
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
                infinite: true,
                dots: true,
                arrow: false,
                slick: true,
                modal: false,
                arrowClass: {
                    wrap: 'carousel-controller'
                    ,prev : 'btn-prev'
                    ,next : 'btn-next'
                },
                initialSlide : 0
            };
            // _this.options = Object.assign(_this.options, op);
            for (var attrname in op) { _this.options[attrname] = op[attrname]; }
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

            _this.runSlide();
        },
        runSlide : function() {
            var _this = _self.sliderJS;
            _this.itemWidth = window.innerWidth;
            _this.itemWrapWidth = _this.itemWidth*_this.items.length;
            for( var i = 0; i < _this.size; ++i ) {
                _this.items[i].style.width= _this.itemWidth + 'px';
                _this.items[i].style.left = (i*_this.itemWidth) + 'px';
            }
            _this.wrapper[0].style.width = _this.itemWrapWidth + 'px';
            _this.setActiceSlide();
        },
        setActiceSlide : function(i) {
           var _this = this,
            idx = (i==undefined||typeof i == "boolean")?_this.options.initialSlide:parseInt(i);
            if(typeof i == "boolean") {
                if(i == true) {
                    if(_options.infinite) {
                        idx = (idx+1>=_this.size) ? 0 : idx+1;
                    }else {
                        idx = (idx+1>=_this.size) ? _this.size-1 : idx+1;
                    }
                }else if(i == false) {
                    if(_options.infinite) {
                        idx = (idx-1<0) ? _this.size-1 : idx-1;
                    }else {
                        idx = (idx-1<0) ? 0 : idx-1;
                    }
                }
            }

            if(_options.dots) {
                var dots = _this.el.querySelectorAll( ".dot" );
            }
            for( var j = 0; j < _this.size; ++j ) {
               _this.items[j].classList.remove("active");
                if(_options.dots) {dots[j].classList.remove("active");}
            }
            _this.wrapper[0].style.left = _this.itemWidth*idx*(-1) + 'px';
            _this.items[idx].classList.add("active");
            if(_options.dots) {dots[idx].classList.add("active");}
            _options.initialSlide = idx;
        },
        addEvents : function(event, el, fn) {
            var _this = this;
            if (window.addEventListener) {
                el.addEventListener(event, fn, false); 
            }else if (window.attachEvent) {
                el.attachEvent("on"+event, fn);
            }else { 
                el["on"+event]= fn; 
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
            + ' <a href="#prev" class="'+_options.arrowClass.prev+'"><span>prev</span></a>'
            + ' <a href="#next" class="'+_options.arrowClass.next+'"><span>next</span></a> </div>';
            _this.el.innerHTML += html;
        }
    };
    document.addEventListener( "DOMContentLoaded", function() {
        var _this = _self.sliderJS;
        if(_options.dots) {
            var dot = _this.el.querySelectorAll( ".dot" );
            for( var i = 0; i < _this.size; ++i ) {
                _this.addEvents("click", dot[i], function(e) {
                    _this.setActiceSlide(e.currentTarget.getAttribute("data-dot-index"));
                });
            }
        }
        if(_options.arrow) {
            var prev = _this.el.querySelector('.'+_options.arrowClass.prev);
            var next = _this.el.querySelector('.'+_options.arrowClass.next);
            _this.addEvents("click", prev, function(e) {
                    return _this.setActiceSlide(false);
                });
            _this.addEvents("click", next, function(e) {
                    return _this.setActiceSlide(true);
                });
        }
        var prevX, currentX, currentLeft, onslide;
        _this.addEvents("mousedown", _this.wrapper[0], function(e) {
            prevX = onslide = e.screenX;
            currentLeft = parseInt(_this.wrapper[0].style.left)
        });
        if(_options.slick) {
            _this.addEvents("mousemove", _this.wrapper[0], function(e) {
                if(prevX != undefined && prevX != null) {
                    _this.wrapper[0].style.left = currentLeft-(prevX-e.screenX) + 'px';
                }
            });
            _this.addEvents("mouseleave", _this.wrapper[0], function(e) {
                _this.setActiceSlide();
                prevX = null;
            });
            _this.addEvents("mouseup", _this.wrapper[0], function(e) {
                currentX = e.screenX;
                if(prevX>currentX) {
                    _this.setActiceSlide(true);
                }else if(prevX<currentX) {
                    _this.setActiceSlide(false);
                }
                prevX = null;
            });
        }

        if(_options.modal) {
            _this.addEvents("click", _this.wrapper[0], function(e) {
                if(onslide == e.screenX) {
                    var imgHtml = '<img src="' + e.target.currentSrc + '" alt="">';
                    //var html = '<div class="overlayWrap"><div class="overlay">'+imgHtml+'</div></div>';
                    document.body.classList.add("activeOverlay");
                    _this.el.querySelector('.overlay').innerHTML += imgHtml;
                    _this.addEvents("click", _this.el.querySelector('.overlay'), function (e) {
                        document.body.classList.remove("activeOverlay");
                        _this.el.querySelector('.overlay').innerHTML = '';
                    });
                }
            });
        }
        _this.addEvents("resize",window, _this.runSlide);
    });
    if (typeof ampJS == 'undefined') {
        window.ampJS = {};
    }
    ampJS = _self;
})();

