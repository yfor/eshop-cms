define(["ui-router","amaze"],function(router,zmaze){
	var mod = angular.module("ui.router");


	//https://github.com/miaoyaoyao/AngularJs-UI
	mod.directive('tmPagination',[function(){
		return {
			restrict: 'EA',
			template: '<div class="page-list">' +
				'<ul data-am-widget="pagination" class="am-pagination am-pagination-default" ng-show="conf.totalItems > 0">' +
				'<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>上一页</span></li>' +
				'<li ng-repeat="item in pageList track by $index" ng-class="{\'am-active\': item == conf.currentPage, separate: item == \'...\'}" ' +
				'ng-click="changeCurrentPage(item)">' +
				'<span>{{ item }}</span>' +
				'</li>' +
				'<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>下一页</span></li>' +
				'</ul>' +
				/**
				'<div class="page-total" ng-show="conf.totalItems > 0">' +
				'每页<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
				'/共<strong>{{ conf.totalItems }}</strong>条 ' +
				'跳转至<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>' +
				'</div>' +
				**/
				'<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
				'</div>',
			replace: true,
			scope: {
				conf: '='
			},
			link: function(scope, element, attrs) {
				
				var conf = scope.conf;

				// 默认分页长度
				var defaultPagesLength = 9;

				// 默认分页选项可调整每页显示的条数
				var defaultPerPageOptions = [10, 15, 20, 30, 50];

				// 默认每页的个数
				var defaultPerPage = 15;

				// 获取分页长度
				if(conf.pagesLength) {
					// 判断一下分页长度
					conf.pagesLength = parseInt(conf.pagesLength, 10);

					if(!conf.pagesLength) {
						conf.pagesLength = defaultPagesLength;
					}

					// 分页长度必须为奇数，如果传偶数时，自动处理
					if(conf.pagesLength % 2 === 0) {
						conf.pagesLength += 1;
					}

				} else {
					conf.pagesLength = defaultPagesLength
				}

				// 分页选项可调整每页显示的条数
				if(!conf.perPageOptions){
					conf.perPageOptions = defaultPagesLength;
				}

				// pageList数组
				function getPagination(newValue, oldValue) {
					
					// conf.currentPage
					if(conf.currentPage) {
						conf.currentPage = parseInt(scope.conf.currentPage, 10);
					}

					if(!conf.currentPage) {
						conf.currentPage = 1;
					}

					// conf.totalItems
					if(conf.totalItems) {
						conf.totalItems = parseInt(conf.totalItems, 10);
					}

					// conf.totalItems
					if(!conf.totalItems) {
						conf.totalItems = 0;
						return;
					}
					
					// conf.itemsPerPage 
					if(conf.itemsPerPage) {
						conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
					}
					if(!conf.itemsPerPage) {
						conf.itemsPerPage = defaultPerPage;
					}

					// numberOfPages
					conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);

					// 如果分页总数>0，并且当前页大于分页总数
					if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
						scope.conf.currentPage = scope.conf.numberOfPages;
					}

					// 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
					var perPageOptionsLength = scope.conf.perPageOptions.length;

					// 定义状态
					var perPageOptionsStatus;
					for(var i = 0; i < perPageOptionsLength; i++){
						if(conf.perPageOptions[i] == conf.itemsPerPage){
							perPageOptionsStatus = true;
						}
					}
					// 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
					if(!perPageOptionsStatus){
						conf.perPageOptions.push(conf.itemsPerPage);
					}

					// 对选项进行sort
					conf.perPageOptions.sort(function(a, b) {return a - b});
					

					// 页码相关
					scope.pageList = [];
					if(conf.numberOfPages <= conf.pagesLength){
						// 判断总页数如果小于等于分页的长度，若小于则直接显示
						for(i =1; i <= conf.numberOfPages; i++){
							scope.pageList.push(i);
						}
					}else{
						// 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
						// 计算中心偏移量
						var offset = (conf.pagesLength - 1) / 2;
						if(conf.currentPage <= offset){
							// 左边没有...
							for(i = 1; i <= offset + 1; i++){
								scope.pageList.push(i);
							}
							scope.pageList.push('...');
							scope.pageList.push(conf.numberOfPages);
						}else if(conf.currentPage > conf.numberOfPages - offset){
							scope.pageList.push(1);
							scope.pageList.push('...');
							for(i = offset + 1; i >= 1; i--){
								scope.pageList.push(conf.numberOfPages - i);
							}
							scope.pageList.push(conf.numberOfPages);
						}else{
							// 最后一种情况，两边都有...
							scope.pageList.push(1);
							scope.pageList.push('...');

							for(i = Math.ceil(offset / 2) ; i >= 1; i--){
								scope.pageList.push(conf.currentPage - i);
							}
							scope.pageList.push(conf.currentPage);
							for(i = 1; i <= offset / 2; i++){
								scope.pageList.push(conf.currentPage + i);
							}

							scope.pageList.push('...');
							scope.pageList.push(conf.numberOfPages);
						}
					}

					scope.$parent.conf = conf;
				}

				// prevPage
				scope.prevPage = function() {
					if(conf.currentPage > 1){
						conf.currentPage -= 1;
					}
					getPagination();
					if(conf.onChange) {
						conf.onChange();
					}
				};

				// nextPage
				scope.nextPage = function() {
					if(conf.currentPage < conf.numberOfPages){
						conf.currentPage += 1;
					}
					getPagination();
					if(conf.onChange) {
						conf.onChange();
					}
				};

				// 变更当前页
				scope.changeCurrentPage = function(item) {
					
					if(item == '...'){
						return;
					}else{
						conf.currentPage = item;
						getPagination();
						// conf.onChange()函数
						if(conf.onChange) {    
							conf.onChange();
						}
					}
				};

				// 修改每页展示的条数
				scope.changeItemsPerPage = function() {

					// 一发展示条数变更，当前页将重置为1
					conf.currentPage = 1;

					getPagination();
					// conf.onChange()函数
					if(conf.onChange) {    
						conf.onChange();
					}
				};

				// 跳转页
				scope.jumpToPage = function() {
					num = scope.jumpPageNum;
					if(num.match(/\d+/)) {
						num = parseInt(num, 10);
					
						if(num && num != conf.currentPage) {
							if(num > conf.numberOfPages) {
								num = conf.numberOfPages;
							}

							// 跳转
							conf.currentPage = num;
							getPagination();
							// conf.onChange()函数
							if(conf.onChange) {    
								conf.onChange();
							}
							scope.jumpPageNum = '';
						}
					}
					
				};

				scope.jumpPageKeyUp = function(e) {
					var keycode = window.event ? e.keyCode :e.which;
					
					if(keycode == 13) {
						scope.jumpToPage();
					}
				}

				scope.$watch('conf.totalItems', function(value, oldValue) {
					
					// 在无值或值相等的时候，去执行onChange事件
					if(!value || value == oldValue) {
						
						if(conf.onChange) {    
							conf.onChange();
						}
					}
					getPagination();
				})
				
			}
		};
	}]);
		


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