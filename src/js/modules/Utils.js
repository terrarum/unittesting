/**
 * UTILITAHS
 */

define(function(require) {

    /**
     * Generates a string based on rules.
     *
     * @returns {string}
     * @private
     */
    var _GUID = function () {
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return id;
    };

    return {
        GUID: function() {
            return _GUID();
        }
    };

});