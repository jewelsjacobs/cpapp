angular.module('rs.UI.table', [])

  .run(function($templateCache) {

	var template = '<table class="table">'+
	'<thead>'+
	'	<tr>'+
	'		<th ng-if="options.status" class="rs-table-status"></th>'+
	'		<th ng-if="options.checkbox" class="rs-table-checkbox"></th>'+
	'		<th ng-if="options.cog" class="rs-table-cog"></th>'+
	'		<th ng-repeat="col in options.columns">{{col.title}}</th>'+
	'	</tr>'+
	'</thead>'+
	'<tbody>'+
	'	<tr ng-repeat="row in options.rows">'+
	'		<td ng-if="options.status" rs-table-status></td>'+
	'		<td ng-if="options.checkbox" rs-table-checkbox></td>'+
	'		<td ng-if="options.cog" rs-table-cog></td>'+
	'		<td ng-repeat="item in row.items">{{item.content}}</td>'+
	'	</tr>'+
	'</tbody>'+
'</table>'+
'<div ng-hide="options.rows.length>0" class="rs-table-overlay rs-table-overlay-loading">'+
'  <div class="rs-table-overlay-content">'+
'    <div class="rs-table-overlay-message">Loading&hellip;</div>'+
'  </div>'+
'</div>';

    $templateCache.put('$rsTable.tpl', template);


    //checkbox
	var checkbox = '<input type="checkbox" />';

    $templateCache.put('$rsTable.checkbox.tpl', checkbox);    

    //cog
	var cog = '<span class="glyphicon glyphicon-cog"></span>';

    $templateCache.put('$rsTable.cog.tpl', cog); 

  })

  .provider('$rsTable', function() {

	var defaults = this.defaults = {
		animation: 'animation-fade',
		options: {
			columns: [
			{
				title:'Name'
			},
			{
				title:'URL'
			},
			{
				title:'User'
			}                
			],
			rows: [
			{
				title:'row 1',
				items:[
				{
					content:'My Name'
				},
				{
					content:'http://mysite.com'
				},
				{
					content:'username'
				}
				]
			}      
			],
			cog:"",
			checkbox:"",
			status:""
		},
		template: '$rsTable.tpl'
	};

    this.$get = function() {
      return {defaults: defaults};
    };

  })

  .directive('rsTable', function($window, $animate, $rsTable) {

    var defaults = $rsTable.defaults;

    return {
      restrict: 'EAC',
      scope: true,
      require: '?ngModel',
      templateUrl: function(element, attr) {
        return attr.template || defaults.template;
      },
      link: function postLink(scope, element, attr, controller) {
        // Directive options
		// model -> view
		
		if(controller) {
			controller.$render = function() {

				angular.forEach(controller.$modelValue.rows, function(value, key) {
					var items = [];
					var v = value;
					angular.forEach(controller.$modelValue.columns, function(value, key){
						items.push({
							content:v[value.content]
						});
					});
					value.items = items;

				});

				
				scope.options = controller.$modelValue;
			};
		}

      }
    };

  })













.provider('$rsTableCheckbox', function() {

	var defaults = this.defaults = {
		template: '$rsTable.checkbox.tpl'
	};

	this.$get = function() {
		return {defaults: defaults};
	};

})
.directive('rsTableCheckbox', function($window, $animate, $rsTableCheckbox) {

	var defaults = $rsTableCheckbox.defaults;

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

.provider('$rsTableStatus', function() {

	var defaults = this.defaults = {
		template: ''
	};

	this.$get = function() {
		return {defaults: defaults};
	};

})
.directive('rsTableStatus', function($window, $animate, $rsTableStatus) {

	var defaults = $rsTableStatus.defaults;

	return {
		restrict: 'EA',
		require: '?ngModel',
		templateUrl: function(element, attr) {
			return '';
		},
		link: function postLink(scope, element, attr, controller) {
			element.css({
				width:'10px',
				background:'##00a96d'
			});

		}
	};

})
;
