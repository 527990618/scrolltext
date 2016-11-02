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
                setInterval(this._scrollAnimate.bind(this), 5000);
            },
            _scrollAnimate: function(){
                var me = this,
                    firstItem = me.element.children().eq(0),
                    scrollHeight = firstItem.outerHeight();
                me.element[0].style.transform = 'translateY(' + (-scrollHeight) + 'px) translateZ(0)';
                me.element.on('transitionend', function () {
                    this.style.transitionDuration = '0s';
                    me.element.children()[0].remove();
                    me.element[0].style.transform = 'translateY(' + 0 + 'px) translateZ(0)';
                    me.element.append(firstItem);
                    // this.style.transitionDuration = '2s';
                    me.element.off('transitionend');
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