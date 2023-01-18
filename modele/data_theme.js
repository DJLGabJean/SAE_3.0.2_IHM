import { connexion } from "../modele/connexion";
class UnTheme {
    constructor(theme_num = "", theme_lib = "", theme_tarif = "") {
        this._themeNum = theme_num;
        this._themeLib = theme_lib;
        this._themeTarif = theme_tarif;
    }
    get themeNum() { return this._themeNum; }
    get themeLib() { return this._themeLib; }
    get themeTarif() { return this._themeTarif; }
    set themeNum(theme_num) { this._themeNum = theme_num; }
    set themeLib(theme_lib) { this._themeLib = theme_lib; }
    set themeTarif(theme_tarif) { this._themeTarif = theme_tarif; }
    toArray() {
        const tableau = { 'themeNum': this._themeNum, 'themeLib': this._themeLib, 'themeTarif': this._themeTarif };
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemes {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTheme
        let themes = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const theme = new UnTheme(item['theme_num'], item['theme_lib'], item['theme_tarif']);
            themes[theme.themeNum] = theme; // clé d’un élément du tableau : themeNum
        }
        return themes;
    }
    prepare(where) {
        let sql;
        sql = "SELECT	theme_num, theme_lib, theme_tarif ";
        sql += " FROM	theme";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    }
    byThemeNum(theme_num) {
        let theme = new UnTheme;
        const themes = this.load(APIpageWeb.SQLloadData(this.prepare("theme_num = ?"), [theme_num]));
        const lesCles = Object.keys(themes);
        // affecte les clés du tableau associatif « themes » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            theme = themes[lesCles[0]]; // récupérer le 1er élément du tableau associatif « themes »
        }
        return theme;
    }
    toArray(themes) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in themes) {
            T.push(themes[id].toArray());
        }
        return T;
    }
}
// Classe représentant la relation « adhesion » 
// Le nom de la classe sera composée des noms des relations détail – maître,
// pour notre cas « UnThemeBySalle ». 
// Cela indique que l’accès aux données de la relation détail « theme » 
// se fait par l’identifiant « abon_num » de la relation maître « abonnement »
class UnThemeByAbonnement {
    constructor(unTheme = null, envoi_papier = '') {
        this._unTheme = unTheme;
        this._envoiPapier = envoi_papier;
        this._montant = this._unTheme.themeTarif;
        if (this.envoiPapier === '1') {
            this.montant = (Number(this.montant) * 2).toFixed(2);
        }
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get envoiPapier() { return this._envoiPapier; }
    set envoiPapier(envoi_papier) { this._envoiPapier = envoi_papier; }
    get montant() { return this._montant; }
    set montant(montant) { this._montant = montant; }
    get unTheme() { return this._unTheme; }
    set unTheme(unTheme) { this._unTheme = unTheme; }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unTheme.toArray(); // appel de la méthode « toArray » de « UnTheme »
        tableau['envoiPapier'] = 'N';
        if (this.envoiPapier === '1') {
            tableau['envoiPapier'] = 'O';
        }
        tableau['montant'] = this.montant.replace('.', ',');
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemesByAbonnement {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnThemeByAbonnement
        let themesByAbonnement = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const themeByAbonnement = new UnThemeByAbonnement(new UnTheme(item['theme_num'], item['theme_lib'], item['theme_tarif']), item['envoi_papier']);
            themesByAbonnement[themeByAbonnement.unTheme.themeNum] = themeByAbonnement;
        }
        return themesByAbonnement;
    }
    prepare(where) {
        let sql;
        sql = "SELECT theme.theme_num as theme_num, theme.theme_lib as theme_lib, theme.theme_tarif as theme_tarif, envoi_papier";
        sql += " FROM adhesion JOIN theme ON adhesion.theme_num=theme.theme_num";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byAbonNum(abon_num) {
        // renvoie le tableau d’objets contenant tous de abonnement abon_num
        return this.load(APIpageWeb.SQLloadData(this.prepare("abon_num = ?"), [abon_num]));
    }
    byAbonNumThemeNum(abon_num, theme_num) {
        // renvoie l’objet de theme_num contenu dans abonnement abon_num
        let themeByAbonnement = new UnThemeByAbonnement;
        const themesByAbonnement = this.load(APIpageWeb.SQLloadData(this.prepare("adhesion.abon_num = ? and adhesion.theme_num = ?"), [abon_num, theme_num]));
        if (!themesByAbonnement[0] === undefined) {
            themeByAbonnement = themesByAbonnement[0];
        }
        return themeByAbonnement;
    }
    toArray(themesByAbonnement) {
        let T = [];
        for (let id in themesByAbonnement) {
            T.push(themesByAbonnement[id].toArray());
        }
        return T;
    }
    delete(abon_num) {
        let sql;
        sql = "DELETE	FROM	adhesion	WHERE	abon_num = ?";
        return APIpageWeb.SQLexec(sql, [abon_num]); // requête de manipulation : utiliser SQLexec
    }
    insert(abon_num, themesByAbonnement) {
        // requête d’ajout dans « adhesion » pour abonnement abon_num
        let sql;
        let separateur = "";
        sql = "INSERT INTO adhesion(abon_num, theme_num, envoi_papier) VALUES  ";
        for (let cle in themesByAbonnement) {
            sql += separateur + "('" + abon_num + "','" + themesByAbonnement[cle].unTheme.themeNum + "','" + themesByAbonnement[cle].envoiPapier + "')";
            separateur = ",";
        }
        return APIpageWeb.SQLexec(sql, []);
    }
    update(abon_num, themeByAbonnement) {
        // requête de modification de la table « adhesion »
        let sql;
        sql = "UPDATE adhesion SET envoi_papier = ?";
        sql += " WHERE abon_num = ? AND theme_num = ?";
        return APIpageWeb.SQLexec(sql, [themeByAbonnement.envoiPapier, abon_num, themeByAbonnement.unTheme.themeNum]);
    }
    getTotal(themes) {
        let mt = 0;
        for (let id in themes) {
            mt += Number(themes[id].montant);
        }
        return mt;
    }
}
export { connexion };
export { UnTheme };
export { LesThemes };
export { UnThemeByAbonnement };
export { LesThemesByAbonnement };
//# sourceMappingURL=data_theme.js.map