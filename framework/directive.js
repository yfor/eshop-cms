define(["ui-router","amaze"],function(router,zmaze){
	var mod = angular.module("ui.router");




	


	mod.directive("amCounts",function(){
		return {
			restrict:"ECA",
			scope:{
				production:"="
			},
			link:function(scope,element,attr){
				var parent = scope.$parent;
				scope.production.status = "pending"
				scope.production.productEdit = false;
				var initNum = scope.production.amount;
				scope.production.edit = function(num){
					scope.production.productEdit = !scope.production.productEdit;
					
					if (num) {
						// check num equal
						if (initNum != scope.production.amount) {
							parent.changebagListNum(scope.production.amount,scope.production.id,initNum).then(function(data){

								console.log(data)
							},function(err){
								scope.production.amount = initNum;
								alert("编辑失败，请重新操作！");
								console.log(err)
							})
							
						};
					};
				}

				scope.production.increase = function(){
					scope.production.amount++;
				}
				scope.production.reduce = function(){
					
					if (scope.production.amount == 1) {

					}else{
						scope.production.amount--;
					};
				}
				scope.production.changStatus = function(){
					if (scope.production.status == "pending") {
						scope.production.status = "done";
					}else{
						scope.production.status = "pending";
					};
				}
			}
		}
	});

	mod.directive("amStrickyDtv",function(){
		return {
			restrict:"ECA",
			scope:{
				num:"="
			},
			link:function(scope,element,attr){
				$(element[0]).sticky({
					top: scope.num || 0,
					animation:"slide-top"
				})

			}
		}
	});

	mod.directive("amShow",function(){
		return {
			restrict:"EAC",
			link:function(scope,element,attr){
				$(element[0]).css('visibility','hidden'); 
				setTimeout(function(){
					$(element[0]).css('visibility','visible'); 
				},1800);
			}
		}
	});


	mod.directive('lazySrc', ['$window', '$document','$timeout','$interval', function($window, $document,$timeout,$interval){
	    var doc = $document[0],
	        body = doc.body,
	        win = $window,
	        $win = angular.element(win),
	        uid = 0,
	        elements = {};

	    function getUid(el){
	        return el.__uid || (el.__uid = '' + ++uid);
	    }

	    function getWindowOffset(){
	        var t,
	            pageXOffset = (typeof win.pageXOffset == 'number') ? win.pageXOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollLeft == 'number' ? t : body).ScrollLeft,
	            pageYOffset = (typeof win.pageYOffset == 'number') ? win.pageYOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollTop == 'number' ? t : body).ScrollTop;
	        return {
	            offsetX: pageXOffset,
	            offsetY: pageYOffset
	        };
	    }

	    function isVisible(iElement){
	        var elem = iElement[0],
	            elemRect = elem.getBoundingClientRect(),
	            windowOffset = getWindowOffset(),
	            winOffsetX = windowOffset.offsetX,
	            winOffsetY = windowOffset.offsetY,
	            elemWidth = elemRect.width,
	            elemHeight = elemRect.height,
	            elemOffsetX = elemRect.left + winOffsetX,
	            elemOffsetY = elemRect.top + winOffsetY,
	            viewWidth = Math.max(doc.documentElement.clientWidth, win.innerWidth || 0),
	            viewHeight = Math.max(doc.documentElement.clientHeight, win.innerHeight || 0),
	            xVisible,
	            yVisible;
			
	        if(elemOffsetY <= winOffsetY){
	            if(elemOffsetY + elemHeight >= winOffsetY){
	                yVisible = true;
	            }
	        }else if(elemOffsetY >= winOffsetY){
	            if(elemOffsetY <= winOffsetY + viewHeight){
	                yVisible = true;
	            }
	        }

	        if(elemOffsetX <= winOffsetX){
	            if(elemOffsetX + elemWidth >= winOffsetX){
	                xVisible = true;
	            }
	        }else if(elemOffsetX >= winOffsetX){
	            if(elemOffsetX <= winOffsetX + viewWidth){
	                xVisible = true;
	            }
	        }
			
			//console.log(iElement.attr('alt') + ":" + iElement.parent().parent().parent().parent().css('display'));
			//picture is visible and the attribute is block can be true visible(only in our project)
	        return xVisible && yVisible && (iElement.parent().parent().parent().parent().css('display') == 'block');
	    };

	    function checkImage(){
			Object.keys(elements).forEach(function(key){
	            var obj = elements[key],
	                iElement = obj.iElement,
	                $scope = obj.$scope;
	            if(isVisible(iElement)){
	                iElement.attr('src', $scope.lazySrc);
	                // $('.container-gallery').masonry();
	            }
	        });
	    }

	    $win.bind('scroll', checkImage);
	    $win.bind('resize', checkImage);
	    function onLoad(){
	        var $el = angular.element(this),
	            uid = getUid($el);

	        $el.css('opacity', 1);

	        if(elements.hasOwnProperty(uid)){
	            delete elements[uid];
	        }
	    }

	    return {
	        restrict: 'A',
	        scope: {
	            lazySrc: '@'
	        },
	        link: function($scope, iElement,attr){
	            iElement.bind('mouseup', function () {
	                if("goTop"==iElement.attr('id')){
	                    $win.unbind('scroll', checkImage);
	                    $interval(function () {
	                        if(document.body.scrollTop == 0){
	                            $win.bind('scroll', checkImage);
	                            //console.log("true")
	                        }
	                    },200,10);
	                }
	            });
	            iElement.bind('load', onLoad);

	            $scope.$watch('lazySrc', function(){
	                //alert(iElement.parent().parent().parent().parent().attr('ng-show'));
	                if(isVisible(iElement)){
	                    iElement.attr('src', $scope.lazySrc);
	                }else{
	                    var uid = getUid(iElement);
	                    iElement.css({
	                        'background-color': '#fff',
	                        'opacity': 0,
	                        '-webkit-transition': 'opacity 1s',
	                        'transition': 'opacity 1s'
	                    });
	                    elements[uid] = {
	                        iElement: iElement,
	                        $scope: $scope
	                    };
	                }
	            });
	            $scope.$on('$destroy', function(){
	                iElement.unbind('load');
	            });
	        }
	    };
	}]);




	mod.directive('fileModel', ['$parse', function ($parse) {
		return {
		   restrict: 'A',
		   link: function(scope, element, attrs) {
			  var model = $parse(attrs.fileModel);
			  var modelSetter = model.assign;
			  
			  element.bind('change', function(){
				 scope.$apply(function(){
					modelSetter(scope, element[0].files);
				 });
			  });
		   }
		};
	 }]);
	return mod;
});