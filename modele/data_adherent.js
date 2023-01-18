import { connexion } from "../modele/connexion";
var UnAdherent = /** @class */ (function () {
    function UnAdherent(adh_num, adh_civ, adh_nom, adh_prenom, adh_adr, adh_cp, adh_ville, adh_mel, csp_num) {
        if (adh_num === void 0) { adh_num = ""; }
        if (adh_civ === void 0) { adh_civ = ""; }
        if (adh_nom === void 0) { adh_nom = ""; }
        if (adh_prenom === void 0) { adh_prenom = ""; }
        if (adh_adr === void 0) { adh_adr = ""; }
        if (adh_cp === void 0) { adh_cp = ""; }
        if (adh_ville === void 0) { adh_ville = ""; }
        if (adh_mel === void 0) { adh_mel = ""; }
        if (csp_num === void 0) { csp_num = ""; }
        this._adhNum = adh_num;
        this._adhCiv = adh_civ;
        this._adhNom = adh_nom;
        this._adhPrenom = adh_prenom;
        this._adhAdr = adh_adr;
        this._adhCp = adh_cp;
        this._adhVille = adh_ville;
        this._adhMel = adh_mel;
        this._cspNum = csp_num;
    }
    Object.defineProperty(UnAdherent.prototype, "adhNum", {
        get: function () { return this._adhNum; },
        set: function (adh_num) { this._adhNum = adh_num; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhCiv", {
        get: function () { return this._adhCiv; },
        set: function (adh_civ) { this._adhCiv = adh_civ; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhNom", {
        get: function () { return this._adhNom; },
        set: function (adh_nom) { this._adhNom = adh_nom; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhPrenom", {
        get: function () { return this._adhPrenom; },
        set: function (adh_prenom) { this._adhPrenom = adh_prenom; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhAdr", {
        get: function () { return this._adhAdr; },
        set: function (adh_adr) { this._adhAdr = adh_adr; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhCp", {
        get: function () { return this._adhCp; },
        set: function (adh_cp) { this._adhCp = adh_cp; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhVille", {
        get: function () { return this._adhVille; },
        set: function (adh_ville) { this._adhVille = adh_ville; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "adhMel", {
        get: function () { return this._adhMel; },
        set: function (adh_mel) { this._adhMel = adh_mel; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAdherent.prototype, "cspNum", {
        get: function () { return this._cspNum; },
        set: function (csp_num) { this._cspNum = csp_num; },
        enumerable: false,
        configurable: true
    });
    UnAdherent.prototype.toArray = function () {
        var tableau = { 'adhNum': this._adhNum, 'adhCiv': this._adhCiv, 'adhNom': this._adhNom, 'adhPrenom': this._adhPrenom, 'adhAdr': this._adhAdr, 'adhCp': this._adhCp, 'adhVille': this._adhVille, 'adhMel': this._adhMel, 'cspNum': this._cspNum };
        return tableau;
    };
    return UnAdherent;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesAdherents = /** @class */ (function () {
    function LesAdherents() {
        // rien
    }
    LesAdherents.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnAdherent
        var adherents = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var adherent = new UnAdherent(item['adh_num'], item['adh_civ'], item['adh_nom'], item['adh_prenom'], item['adh_adr'], item['adh_cp'], item['adh_ville'], item['adh_mel'], item['csp_num']);
            adherents[adherent.adhNum] = adherent; // clé d’un élément du tableau : adhNum
        }
        return adherents;
    };
    LesAdherents.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT	adh_num, adh_civ, adh_nom, adh_prenom, adh_adr, adh_cp, adh_ville, adh_mel, csp_num ";
        sql += " FROM	adherent";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesAdherents.prototype.all = function () {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    };
    LesAdherents.prototype.byAdhNum = function (adh_num) {
        var adherent = new UnAdherent;
        var adherents = this.load(APIpageWeb.SQLloadData(this.prepare("adh_num = ?"), [adh_num]));
        var lesCles = Object.keys(adherents);
        // affecte les clés du tableau associatif « adherents » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            adherent = adherents[lesCles[0]]; // récupérer le 1er élément du tableau associatif « adherents »
        }
        return adherent;
    };
    LesAdherents.prototype.toArray = function (adherents) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in adherents) {
            T.push(adherents[id].toArray());
        }
        return T;
    };
    return LesAdherents;
}());
export { connexion };
export { UnAdherent };
export { LesAdherents };
//# sourceMappingURL=data_adherent.js.map