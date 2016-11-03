//可以有无限li自定义滚动  可以添加事件 hover之后停止滚动

(function($){
    var ScrollText = (function(){
        function ScrollText(elm, options){
            this.settings = $.extend(true, $.fn.ScrollText.defaults);
            this.element = elm;
            this.parentNode = elm.parent();
            this.direction = 'up' ? true : false;
            this.items = this.element.children();
            this.init();
            this.currentDate = new Date();
        }
        //此处改为jquery的extend方法
        ScrollText.prototype = {
            init: function(){
                this._scroll();
            },
            changeDirection: function () {
                return this.direction = !this.direction;
            },
            _scroll: function () {
                setTimeout(this._scrollAnimate.bind(this), 5000);
                // this._scrollAnimate.call(this);
            },
            // _scrollAnimate: function(){
            //     var me = this,
            //         firstItem = me.element.children().eq(0),
            //         scrollHeight = firstItem.outerHeight();
            //     var nowDate = new Date();
            //     var gap = (nowDate - me.currentDate)/1000;
            //     console.log(gap + 's');
            //     me.currentDate = nowDate;
            //     me.element[0].style.transitionDuration = '2s';
            //     // me.element[0].style.transitionDelay = '5s';
            //     me.element[0].style.transform = 'translateY(' + (-scrollHeight) + 'px) translateZ(0)';
            //     me.element.on('transitionend', function () {
            //         console.log('transitionend');
            //         this.style.transitionDuration = '0s';
            //         me.element.children()[0].remove();
            //         me.element[0].style.transform = 'translateY(' + 0 + 'px) translateZ(0)';
            //         me.element.append(firstItem);
            //         console.log('append already');
            //         me.element.off('transitionend');
            //     })
            // }
            _scrollAnimate: function(){
                var me = this,
                    firstItem = me.element.children().eq(0),
                    scrollHeight = firstItem.outerHeight();
                var nowDate = new Date();
                var gap = (nowDate - me.currentDate)/1000;
                console.log(gap + 's');
                console.log('li的数量' + me.element.children().length);
                me.currentDate = nowDate;
                me.element[0].style.transitionDuration = '2s';
                // me.element[0].style.transitionDelay = '5s';
                me.element[0].style.transform = 'translateY(' + (-scrollHeight) + 'px) translateZ(0)';
                me.element.on('transitionend', function () {
                    console.log('transitionend');
                    this.style.transitionDuration = '0s';
                    me.element.children()[0].remove();
                    // setTimeout(me.element.children()[0].remove.bind(me.element.children()[0]), 0);
                    console.log('remove执行');
                    me.element[0].style.transform = 'translateY(' + 0 + 'px) translateZ(0)';
                    // setTimeout(me.element.append.bind(me.element, firstItem), 0);
                    me.element.append(firstItem);
                    console.log('append already');
                    me.element.off('transitionend');
                    setTimeout(me._scrollAnimate.bind(me), 5000);
                })
            }
        };
        return ScrollText;
    }());
    $.fn.ScrollText = function(options){
        return this.each(function(index, elm){
            var me = $(this),
                instance = me.data('ScrollText');
            if(!instance){
                instance = new ScrollText(me, options);
                me.data('ScrollText');
            }
            if($.type(options) == 'string') instance[options]();
        })
    }
    $.fn.ScrollText.defaults = {
        direction: 'up', //默认向上滚动
        stopEvent: false
    }
})(jQuery);