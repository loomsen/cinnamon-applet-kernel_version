const Applet = imports.ui.applet;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;
const COMMAND = "uname -r";

function KernelVersion(orientation, panel_height) {
    this._init(orientation, panel_height);
}

KernelVersion.prototype = {
    __proto__: Applet.TextApplet.prototype,

    _init: function(orientation, panel_height) {
        Applet.TextApplet.prototype._init.call(this, orientation, panel_height);
        try {
          let ver = GLib.spawn_command_line_sync(COMMAND, null, null, null, null);
          let version = ver[1].toString();
          this.set_applet_label(_("Kernel: " + version));
          this.set_applet_tooltip(_("running kernel version"));
        }
        catch (initerror) {
          global.logError("init error:");
          global.logError(initerror);
                          
       }
    }

//    _getKernelVersion: function() {
//      let [res, pid, stdin, stdout, stderr] = GLib.spawn_async_with_pipes(null,['uname', '-r'], null, GLib.SpawnFlags.SEARCH_PATH, null );
//    }
};

function main(metadata, orientation, panel_height) {
    return new KernelVersion(orientation, panel_height);
}
