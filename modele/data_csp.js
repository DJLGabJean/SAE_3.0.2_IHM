import { connexion } from "../modele/connexion";
var UnCsp = /** @class */ (function () {
    function UnCsp(csp_num, csp_lib) {
        if (csp_num === void 0) { csp_num = ""; }
        if (csp_lib === void 0) { csp_lib = ""; }
        this._cspNum = csp_num;
        this._cspLib = csp_lib;
    }
    Object.defineProperty(UnCsp.prototype, "cspNum", {
        get: function () { return this._cspNum; },
        set: function (csp_num) { this._cspNum = csp_num; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnCsp.prototype, "cspLib", {
        get: function () { return this._cspLib; },
        set: function (csp_lib) { this._cspLib = csp_lib; },
        enumerable: false,
        configurable: true
    });
    UnCsp.prototype.toArray = function () {
        var tableau = { 'cspNum': this._cspNum, 'cspLib': this._cspLib };
        return tableau;
    };
    return UnCsp;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesCsps = /** @class */ (function () {
    function LesCsps() {
        // rien
    }
    LesCsps.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnCsp
        var csps = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var csp = new UnCsp(item['csp_num'], item['csp_lib']);
            csps[csp.cspNum] = csp; // clé d’un élément du tableau : cspNum
        }
        return csps;
    };
    LesCsps.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT	csp_num, csp_lib ";
        sql += " FROM	csp";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesCsps.prototype.all = function () {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    };
    LesCsps.prototype.byCspNum = function (csp_num) {
        var csp = new UnCsp;
        var csps = this.load(APIpageWeb.SQLloadData(this.prepare("csp_num = ?"), [csp_num]));
        var lesCles = Object.keys(csps);
        // affecte les clés du tableau associatif « csps » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            csp = csps[lesCles[0]]; // récupérer le 1er élément du tableau associatif « csps »
        }
        return csp;
    };
    LesCsps.prototype.toArray = function (csps) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in csps) {
            T.push(csps[id].toArray());
        }
        return T;
    };
    return LesCsps;
}());
export { connexion };
export { UnCsp };
export { LesCsps };
//# sourceMappingURL=data_csp.js.map