//=====================================================================================
//
// The Tesseris Free License
//
// Copyright(c) 2014 Tesseris Pro LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this 
// software and associated documentation files(the "Software"), to deal in the Software 
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and / or sell copies of the Software, and to 
// permit persons to whom the Software is furnished to do so, subject to the following
// conditions:
  
// 1. The above copyright notice and this permission notice shall be included in all 
//    copies or substantial portions of the Software.
//
// 2. Any software that fully or partially contains or uses materials covered by 
//    this license shall notify users about this notice and above copyright.The 
//    notification can be made in "About box" and / or site main web - page footer.The 
//    notification shall contain name of Tesseris Pro company and name of the Software 
//    covered by current license.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
// PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//=====================================================================================


module TesserisPro.TGrid {

    export class AngularFilterPopupViewModel implements IFilterPopupViewModel {
        private $scope: any;

        container: HTMLElement;
        path: string;
        value: string;
        condition: FilterCondition;
        columnInfo: ColumnInfo;
        caseSensitive: boolean;
        availableConditions: Array<any>;

        public angularModuleName: string;

        public setScope(scope: any) {
            this.$scope = scope;
            this.$scope.path = this.path;
            this.$scope.value = this.value;
            this.$scope.condition = this.condition;
            this.$scope.caseSensitive = this.caseSensitive;
            this.$scope.availableConditions = this.availableConditions;
            this.$scope.onApply = () => this.onApply();
            this.$scope.onClear = () => this.onClear();
            this.$scope.onClose = () => this.onClose();
        }

        constructor(container: HTMLElement, onCloseFilterPopup:(container:HTMLElement) => void) {
            this.container = container;
            this.onCloseFilterPopup = onCloseFilterPopup;
            this.path = "";
            this.value = "";
            this.caseSensitive = false;
            this.condition = FilterCondition.Contains;

            this.availableConditions = [];
            for (var i in FilterCondition) {
                if (!isNaN(i)) {
                    continue;
                }

                this.availableConditions.push({
                    name: i,
                    value: FilterCondition[i]
                });
            }
        }

        public onCloseFilterPopup(container: HTMLElement) {
           
        }

        public onApply() {
            var grid = Grid.getGridObject(this.container);
            if (this.$scope.value.toString().trim() != "") {
                grid.options.filterDescriptor.removeChildByPath(this.$scope.path);
                grid.options.filterDescriptor.addChild(new FilterDescriptor(this.$scope.path, this.$scope.value, this.$scope.caseSensitive, this.$scope.condition));                
                grid.applyFilters();

                hideElement(this.container);
                this.onCloseFilterPopup(this.container);
            } else {
                this.onClear();
            }
        }

        public onClear() {
            var grid = Grid.getGridObject(this.container);
            grid.options.filterDescriptor.removeChildByPath(this.$scope.path);
            grid.applyFilters();

            hideElement(this.container);
            this.onCloseFilterPopup(this.container);
        }

        public onClose() {
            hideElement(this.container);
            this.onCloseFilterPopup(this.container);
        }

        public onOpen(options: Options, column: ColumnInfo) {
            this.columnInfo = column;
            this.$scope.path = column.filterMemberPath;
            for (var i = 0; i < options.filterDescriptor.children.length; i++) {
                if (options.filterDescriptor.children[i].path == column.filterMemberPath) {
                    this.$scope.value=options.filterDescriptor.children[i].value;
                    this.$scope.caseSensitive = options.filterDescriptor.children[i].caseSensitive;
                    this.$scope.condition = options.filterDescriptor.children[i].condition;
                    this.$scope.$apply();
                    return;
                }
            }

            this.$scope.value = "";
            this.$scope.caseSensitive = false;
            this.$scope.condition = FilterCondition.Contains;
            this.$scope.$apply();
        }

        public getColumnInfo(): ColumnInfo {
            return this.columnInfo;
        }
    }
}