async function json_filter_service(args) {
/*
description("REST API Call server side function")
base_component_id("json_filter_service")
load_once_from_file(true)
only_run_on_server(true)
*/

 function pathToString(pp) {
    var s = ""
    for (  var aa = 0  ;  aa < pp.length  ;  aa ++  ) {
        if (isNaN(parseInt(pp[aa]))) {
            s += pp[aa]
        } else {
            s += "[]"
        }
        if (aa < pp.length -1) {
            s += "."
        }
    }
    return s
}

    console.log("** json_filter_service **")
    //console.log(JSON.stringify(args,null,2))
    //var tt = traverse(args.input).paths()
    var paths=new Object()
    var scrubbed = traverse(args.input).map(function (x) {
        if (this.circular) this.remove()
        var rt = pathToString(this.path)
        paths[rt]=true
        if (!args.filter[rt]) {
            this.remove()
        }
    });

    console.log("** json_filter_service **")
    return scrubbed
}
