import { connexion } from "../modele/connexion";
var UnAbonnement = /** @class */ (function () {
    function UnAbonnement(abon_num, abon_date, abon_comment, adh_num) {
        if (abon_num === void 0) { abon_num = ""; }
        if (abon_date === void 0) { abon_date = ""; }
        if (abon_comment === void 0) { abon_comment = ""; }
        if (adh_num === void 0) { adh_num = ""; }
        this._abonNum = abon_num;
        this._abonDate = abon_date;
        this._abonComment = abon_comment;
        this._adhNum = adh_num;
    }
    Object.defineProperty(UnAbonnement.prototype, "abonNum", {
        get: function () { return this._abonNum; },
        set: function (abon_num) { this._abonNum = abon_num; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAbonnement.prototype, "abonDate", {
        get: function () { return this._abonDate; },
        set: function (abon_date) { this._abonDate = abon_date; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAbonnement.prototype, "abonComment", {
        get: function () { return this._abonComment; },
        set: function (abon_comment) { this._abonComment = abon_comment; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnAbonnement.prototype, "adhNum", {
        get: function () { return this._adhNum; },
        set: function (adh_num) { this._adhNum = adh_num; },
        enumerable: false,
        configurable: true
    });
    UnAbonnement.prototype.toArray = function () {
        var tableau = { 'abonNum': this._abonNum, 'abonDate': this._abonDate, 'abonComment': this._abonComment, 'adhNum': this._adhNum };
        return tableau;
    };
    return UnAbonnement;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesAbonnements = /** @class */ (function () {
    function LesAbonnements() {
        // rien
    }
    LesAbonnements.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnAbonnement
        var abonnements = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var abonnement = new UnAbonnement(item['abon_num'], item['abon_date'], item['abon_comment'], item['adh_num']);
            abonnements[abonnement.abonNum] = abonnement; // clé d’un élément du tableau : abonNum
        }
        return abonnements;
    };
    LesAbonnements.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT	abon_num, abon_date, abon_comment, adh_num ";
        sql += " FROM	abonnement";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesAbonnements.prototype.all = function () {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    };
    LesAbonnements.prototype.byAbonNum = function (abon_num) {
        var abonnement = new UnAbonnement;
        var abonnements = this.load(APIpageWeb.SQLloadData(this.prepare("abon_num = ?"), [abon_num]));
        var lesCles = Object.keys(abonnements);
        // affecte les clés du tableau associatif « abonnements » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            abonnement = abonnements[lesCles[0]]; // récupérer le 1er élément du tableau associatif « abonnements »
        }
        return abonnement;
    };
    LesAbonnements.prototype.toArray = function (abonnements) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in abonnements) {
            T.push(abonnements[id].toArray());
        }
        return T;
    };
    LesAbonnements.prototype["delete"] = function (abon_num) {
        var sql;
        sql = "DELETE	FROM	abonnement	WHERE	abon_num = ?";
        return APIpageWeb.SQLexec(sql, [abon_num]); // requête de manipulation : utiliser SQLexec
    };
    LesAbonnements.prototype.insert = function (abonnement) {
        var sql; // requête de manipulation : utiliser SQLexec
        sql = "INSERT	INTO	abonnement (abon_num, abon_date, abon_comment, adh_num) VALUES (?, ?, ?, ?)";
        return APIpageWeb.SQLexec(sql, [abonnement.abonNum, abonnement.abonDate, abonnement.abonComment, abonnement.adhNum]);
    };
    LesAbonnements.prototype.update = function (abonnement) {
        var sql;
        sql = "UPDATE abonnement SET abon_date = ?, abon_comment = ?, adh_num = ? ";
        sql += " WHERE	abon_num	= ?"; // requête de manipulation : utiliser SQLexec
        return APIpageWeb.SQLexec(sql, [abonnement.abonDate, abonnement.abonComment, abonnement.adhNum, abonnement.abonNum]);
    };
    LesAbonnements.prototype.getNouveauNumero = function () {
        return APIpageWeb.SQLloadData("SELECT MAX(abon_num)+1 as num FROM abonnement", [])[0]['num']; // première ligne, colonne "num"
    };
    LesAbonnements.prototype.listPrepare = function (where) {
        var sql;
        sql = "SELECT abonnement.abon_num as abon_num, DATE_FORMAT(abon_date, '%d/%m/%Y') as 'date_abonnement'";
        sql += ", CONCAT(adherent.adh_num,' - ',adh_nom,' ', adh_prenom) as 'adherent'";
        sql += ", CONCAT(csp.csp_num,' - ',LEFT(csp_lib,30)) as 'csp'";
        sql += ", COUNT(*) as 'nb'";
        sql += ", REPLACE(CONCAT(SUM(theme_tarif*IF(envoi_papier,2,1)),' €'),'.',',') as 'montant'";
        sql += " FROM abonnement JOIN adherent ON abonnement.adh_num=adherent.adh_num";
        sql += " JOIN csp ON adherent.csp_num=csp.csp_num";
        sql += " JOIN adhesion ON abonnement.abon_num=adhesion.abon_num";
        sql += " JOIN theme ON adhesion.theme_num=theme.theme_num";
        //-----		version avec amélioration		
        //		sql += " RIGHT JOIN tarif ON tarif.code_prest=theme.code_prest";
        //		sql += " WHERE tarif.date = (SELECT MAX(tarif.date) FROM tarif WHERE tarif.code_prest=theme.code_prest AND tarif.date < abonnement.date_interv)";
        // ----------------------------------------------------
        if (where !== "") {
            sql += " WHERE " + where;
            //-----		version avec amélioration
            //			sql += " AND " +where;
            // --------------------------------------------
        }
        sql += " GROUP BY abon_num";
        sql += " ORDER BY abonnement.abon_date DESC ";
        return sql;
    };
    LesAbonnements.prototype.listAll = function () {
        return APIpageWeb.SQLloadData(this.listPrepare(""), []);
    };
    return LesAbonnements;
}());
export { connexion };
export { UnAbonnement };
export { LesAbonnements };
//# sourceMappingURL=data_abonnement.js.map