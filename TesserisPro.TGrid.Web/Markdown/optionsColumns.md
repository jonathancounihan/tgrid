﻿### Options Columns

The options.columns is the type of  the TesserisPro.TGrid.ColumnInfo[]

A class TesserisPro.TGrid.ColumnInfo:
<!--Start the highlighter-->
<pre class="brush:js">
class ColumnInfo {
    public header: Template;
    public cell: Template;
    public cellDetail: Template;
    public width: string;
    public device: string;
    public sortMemberPath: string;
    public groupMemberPath: string;
    public member: string;
    public resizable: boolean;
    public filterMemberPath: string;
    public notSized: boolean;
    public enableFiltering: boolean;
    public enableSorting: boolean;
    public enableGrouping: boolean;
}
</pre>
####

The column's properties can be changed dynamically after the grid loading.

<script type="text/javascript">
    SyntaxHighlighter.highlight();
</script>