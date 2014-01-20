angular.module('rs.UI.cog', [])
.run(function($templateCache){
    //cog
	var cog = '<span class="glyphicon glyphicon-cog" rs-table-cog-popover></span>';

    $templateCache.put('$rsTable.cog.tpl', cog); 
})

.provider('$rsTableCog', function() {

	var defaults = this.defaults = {
		template: '$rsTable.cog.tpl'
	};

	this.$get = function() {
		return {defaults: defaults};
	};

})
.directive('rsTableCog', function($window, $animate, $rsTableCog) {

	var defaults = $rsTableCog.defaults;

	return {
		restrict: 'EA',
		require: '?ngModel',
		templateUrl: function(element, attr) {
			return attr.template || defaults.template;
		},
		link: function postLink(scope, element, attr, controller) {

		}
	};

})
.directive('rsTableCogPopover', function($window, $animate) {

	return {
		restrict: 'EA',
		require: '?ngModel',
		link: function postLink(scope, element, attr, controller) {
			element.click(function(){
				console.log('click');
				var content = '<div class=" clearfix"><ul id="menu1" class="dropdown-menu" style="display:block; position:static; margin:0;" role="menu" aria-labelledby="drop4">'+
'            <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Action</a></li>'+
'            <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Another action</a></li>'+
'            <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Something else here</a></li>'+
'            <li role="presentation" class="divider"></li>'+
'            <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Separated link</a></li>'+
'          </ul></div>';
				$(this).popover({
					html:true,
					placement:'right',
					content:content,
					container:'body'
				});
			});
		}
	};

})

;
