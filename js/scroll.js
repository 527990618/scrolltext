//可以有无限li自定义滚动  可以添加事件 hover之后停止滚动

(function($){
    var ScrollText = (function(){
        function ScrollText(elm, options){
            this.settings = $.extend(true, $.fn.ScrollText.defaults);
            this.element = elm;
            this.parentNode = elm.parent();
            this.direction = 'up' ? true : false;
        }
        //此处改为jquery的extend方法
        ScrollText.prototype = {
            init: function(){

            },
            changeDirection: function () {
                return this.direction = !this.direction;
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
        direction: up, //默认向上滚动
        stopEvent: false
    }
})();