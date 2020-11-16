async function excel_sql(args) {
/*
description("`excel db driver")
base_component_id("excel_server")
load_once_from_file(true)
only_run_on_server(true)
*/
    let noexcel = require("XLSX");

    var promise = new Promise(async function(returnFn) {

        try {
            //console.log("Loading Excel :" + args.path)

            let workbook = noexcel.readFile(args.path)



            //
            // get tables
            //
            if (args.get_tables) {

                let ret = workbook.SheetNames
                returnFn(ret)




            //
            // get columns
            //
            } else if (args.get_data) {

                console.log("SHEET: " + args.table)
                let ret = workbook.Sheets[args.table]
                console.log("ret: " + JSON.stringify(ret,null,2))
                returnFn(ret)



            //
            // get columns
            //
            } else if (args.get_columns) {

                let ret = noexcel.getColumns(args.table)
                returnFn(ret)



            //
            // are we connected?
            //
            } else if (args.connect) {

                returnFn({connected: true})


            //
            // execute SQL
            //
            } else {


            }


        } catch(catchErr) {
            console.log(JSON.stringify(catchErr,null,2))
            returnFn({err: catchErr})

        }









    })

    var ret = await promise
    let tables =  ret
    return  tables
}
