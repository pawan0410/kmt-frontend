/* © AIG Business. See LICENSE file for full copyright & licensing details. */

/**
 * Console log with context and pretty colors.
 * @function prettyConsoleLog
 * @param    {String}  message Message to send to the console.
 * @param    {String}  context User provided, used to know where the log came from.
 * @param    {Number}  colorId To colors the context.
 * @returns  {Boolean} return true if the log was posted, false if not.
 */
function prettyConsoleLog( message, context, colorId ) {

    /**
     * We want to send the raw message to the console
     * Usefule when debugging objects.
     */
    if( context === -1 )

        /* eslint-disable no-console */
        return console.log( message );

    let colors = [ "#0097ef", "#ff0055" ],
        color = colorId ? colors[ colorId ] : colors[ 0 ];

    /* eslint-disable no-console */
    /* Apply pretty formatting. */
    console.log(
        "%c%s: %c%s", "color: " + color + ";font-weight: bold;",
        context || "GLOBAL",
        "color: black;", message
    );
}

export default prettyConsoleLog;
