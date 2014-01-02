 /// <reference path="../scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Options.ts"/>

module TGrid.Angular {
    export function Directive(): any {
        var directive: any = {};
        directive.restrict = 'E';
        directive.link = function (scope, element, attrs) {
            var options = new TesserisPro.TGrid.Options(element[0], 1 /* Angular */);
            options.parentViewModel = scope;
            if (attrs["groupby"] != undefined) {
                var groupBy = attrs["groupby"].split(' ');
                if (groupBy.length > 0 && groupBy[0] != "") {
                    for (var i = 0; i < groupBy.length; i++) {
                        options.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(groupBy[i], true));
                    }
                }
            }

            if (attrs["enablepaging"] == undefined) {
                options.enablePaging = false;
            } else {
                options.enablePaging = attrs["enablepaging"] == "true" ? true : false;
            }

            var pageSizeAtt = attrs["pagesize"];
            if (pageSizeAtt != undefined) {
                options.pageSize = parseInt(pageSizeAtt);
                if (this.isEnablePaging) {
                    options.pageSize = (isNaN(this.pageSize) || this.pageSize < 1) ? 10 : this.pageSize;
                }
            }

            var pageSlideAttr = attrs["pageslide"];
            options.pageSlide = parseInt(pageSlideAttr);
            if (this.isEnablePaging) {
                options.pageSlide = (isNaN(this.pageSlide) || this.pageSlide < 1) ? 1 : this.pageSlide;
            }

            var selectionModeAtt = attrs["selectionmode"];
            if (selectionModeAtt == "multi") {
                options.selectionMode = 2 /* Multi */;
            }

            if (selectionModeAtt == undefined || selectionModeAtt == "single") {
                options.selectionMode = 1 /* Single */;
            }

            if (selectionModeAtt == "none") {
                options.selectionMode = 0 /* None */;
            }

            if (attrs["enablevirtualscroll"] == undefined) {
                options.enableVirtualScroll = false;
            } else {
                options.enableVirtualScroll = attrs["enablevirtualscroll"] == "true" ? true : false;
            }

            if (attrs["enablecollapsing"] == undefined) {
                options.enableCollapsing = false;
            } else {
                options.enableCollapsing = attrs["enablecollapsing"] == "true" ? true : false;
            }

            if (attrs["enablesorting"] == undefined) {
                options.enableSorting = false;
            } else {
                options.enableSorting = attrs["enablesorting"] == "true" ? true : false;
            }

            if (attrs["enablegrouping"] == undefined) {
                options.enableGrouping = false;
            } else {
                options.enableGrouping = attrs["enablegrouping"] == "true" ? true : false;
            }

            if (attrs["showdetailsonselection"] == undefined) {
                options.openDetailsOnSelection = false;
            } else {
                options.openDetailsOnSelection = attrs["showdetailsonselection"] == "true" ? true : false;
            }

            if (attrs["enablefiltering"] == undefined) {
                options.enableFiltering = false;
            } else {
                options.enableFiltering = attrs["enablefiltering"] == "true" ? true : false;
            }

            var grid = new TesserisPro.TGrid.Grid(element[0], options, scope[attrs["provider"]]);
        };

        return directive;
    }

    export function registerTGrid(appModule: any) {

    }
}

