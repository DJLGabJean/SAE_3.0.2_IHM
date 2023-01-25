import { connexion } from "../modele/connexion";
var UnTheme = /** @class */ (function () {
    function UnTheme(theme_num, theme_lib, theme_tarif) {
        if (theme_num === void 0) { theme_num = ""; }
        if (theme_lib === void 0) { theme_lib = ""; }
        if (theme_tarif === void 0) { theme_tarif = ""; }
        this._themeNum = theme_num;
        this._themeLib = theme_lib;
        this._themeTarif = theme_tarif;
    }
    Object.defineProperty(UnTheme.prototype, "themeNum", {
        get: function () { return this._themeNum; },
        set: function (theme_num) { this._themeNum = theme_num; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTheme.prototype, "themeLib", {
        get: function () { return this._themeLib; },
        set: function (theme_lib) { this._themeLib = theme_lib; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTheme.prototype, "themeTarif", {
        get: function () { return this._themeTarif; },
        set: function (theme_tarif) { this._themeTarif = theme_tarif; },
        enumerable: false,
        configurable: true
    });
    UnTheme.prototype.toArray = function () {
        var tableau = { 'themeNum': this._themeNum, 'themeLib': this._themeLib, 'themeTarif': this._themeTarif };
        return tableau;
    };
    return UnTheme;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesThemes = /** @class */ (function () {
    function LesThemes() {
        // rien
    }
    LesThemes.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTheme
        var themes = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var theme = new UnTheme(item['theme_num'], item['theme_lib'], item['theme_tarif']);
            themes[theme.themeNum] = theme; // clé d’un élément du tableau : themeNum
        }
        return themes;
    };
    LesThemes.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT	theme_num, theme_lib, theme_tarif ";
        sql += " FROM	theme";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesThemes.prototype.all = function () {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    };
    LesThemes.prototype.byThemeNum = function (theme_num) {
        var theme = new UnTheme;
        var themes = this.load(APIpageWeb.SQLloadData(this.prepare("theme_num = ?"), [theme_num]));
        var lesCles = Object.keys(themes);
        // affecte les clés du tableau associatif « themes » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            theme = themes[lesCles[0]]; // récupérer le 1er élément du tableau associatif « themes »
        }
        return theme;
    };
    LesThemes.prototype.toArray = function (themes) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in themes) {
            T.push(themes[id].toArray());
        }
        return T;
    };
    return LesThemes;
}());
// Classe représentant la relation « adhesion » 
// Le nom de la classe sera composée des noms des relations détail – maître,
// pour notre cas « UnThemeBySalle ». 
// Cela indique que l’accès aux données de la relation détail « theme » 
// se fait par l’identifiant « abon_num » de la relation maître « abonnement »
var UnThemeByAbonnement = /** @class */ (function () {
    function UnThemeByAbonnement(unTheme, envoi_papier) {
        if (unTheme === void 0) { unTheme = null; }
        if (envoi_papier === void 0) { envoi_papier = ''; }
        this._unTheme = unTheme;
        this._envoiPapier = envoi_papier;
        this._montant = this._unTheme.themeTarif;
        if (this.envoiPapier === '1') {
            this.montant = (Number(this.montant) * 2).toFixed(2);
        }
    }
    Object.defineProperty(UnThemeByAbonnement.prototype, "envoiPapier", {
        // définition des « getters » et des « setters » pour les attributs privés de la classe
        get: function () { return this._envoiPapier; },
        set: function (envoi_papier) { this._envoiPapier = envoi_papier; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnThemeByAbonnement.prototype, "montant", {
        get: function () { return this._montant; },
        set: function (montant) { this._montant = montant; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnThemeByAbonnement.prototype, "unTheme", {
        get: function () { return this._unTheme; },
        set: function (unTheme) { this._unTheme = unTheme; },
        enumerable: false,
        configurable: true
    });
    UnThemeByAbonnement.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = this.unTheme.toArray(); // appel de la méthode « toArray » de « UnTheme »
        tableau['envoiPapier'] = 'N';
        if (this.envoiPapier === '1') {
            tableau['envoiPapier'] = 'O';
        }
        tableau['montant'] = this.montant.replace('.', ',');
        return tableau;
    };
    return UnThemeByAbonnement;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesThemesByAbonnement = /** @class */ (function () {
    function LesThemesByAbonnement() {
        // rien
    }
    LesThemesByAbonnement.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnThemeByAbonnement
        var themesByAbonnement = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var themeByAbonnement = new UnThemeByAbonnement(new UnTheme(item['theme_num'], item['theme_lib'], item['theme_tarif']), item['envoi_papier']);
            themesByAbonnement[themeByAbonnement.unTheme.themeNum] = themeByAbonnement;
        }
        return themesByAbonnement;
    };
    LesThemesByAbonnement.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT theme.theme_num as theme_num, theme.theme_lib as theme_lib, theme.theme_tarif as theme_tarif, envoi_papier";
        sql += " FROM adhesion JOIN theme ON adhesion.theme_num=theme.theme_num";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesThemesByAbonnement.prototype.byAbonNum = function (abon_num) {
        // renvoie le tableau d’objets contenant tous de abonnement abon_num
        return this.load(APIpageWeb.SQLloadData(this.prepare("abon_num = ?"), [abon_num]));
    };
    LesThemesByAbonnement.prototype.byAbonNumThemeNum = function (abon_num, theme_num) {
        // renvoie l’objet de theme_num contenu dans abonnement abon_num
        var themeByAbonnement = new UnThemeByAbonnement;
        var themesByAbonnement = this.load(APIpageWeb.SQLloadData(this.prepare("adhesion.abon_num = ? and adhesion.theme_num = ?"), [abon_num, theme_num]));
        if (!themesByAbonnement[0] === undefined) {
            themeByAbonnement = themesByAbonnement[0];
        }
        return themeByAbonnement;
    };
    LesThemesByAbonnement.prototype.toArray = function (themesByAbonnement) {
        var T = [];
        for (var id in themesByAbonnement) {
            T.push(themesByAbonnement[id].toArray());
        }
        return T;
    };
    LesThemesByAbonnement.prototype["delete"] = function (abon_num) {
        var sql;
        sql = "DELETE	FROM	adhesion	WHERE	abon_num = ?";
        return APIpageWeb.SQLexec(sql, [abon_num]); // requête de manipulation : utiliser SQLexec
    };
    LesThemesByAbonnement.prototype.insert = function (abon_num, themesByAbonnement) {
        // requête d’ajout dans « adhesion » pour abonnement abon_num
        var sql;
        var separateur = "";
        sql = "INSERT INTO adhesion(abon_num, theme_num, envoi_papier) VALUES  ";
        for (var cle in themesByAbonnement) {
            sql += separateur + "('" + abon_num + "','" + themesByAbonnement[cle].unTheme.themeNum + "','" + themesByAbonnement[cle].envoiPapier + "')";
            separateur = ",";
        }
        return APIpageWeb.SQLexec(sql, []);
    };
    LesThemesByAbonnement.prototype.update = function (abon_num, themeByAbonnement) {
        // requête de modification de la table « adhesion »
        var sql;
        sql = "UPDATE adhesion SET envoi_papier = ?";
        sql += " WHERE abon_num = ? AND theme_num = ?";
        return APIpageWeb.SQLexec(sql, [themeByAbonnement.envoiPapier, abon_num, themeByAbonnement.unTheme.themeNum]);
    };
    LesThemesByAbonnement.prototype.getTotal = function (themes) {
        var mt = 0;
        for (var id in themes) {
            mt += Number(themes[id].montant);
        }
        return mt;
    };
    return LesThemesByAbonnement;
}());
export { connexion };
export { UnTheme };
export { LesThemes };
export { UnThemeByAbonnement };
export { LesThemesByAbonnement };
//# sourceMappingURL=data_theme.js.map