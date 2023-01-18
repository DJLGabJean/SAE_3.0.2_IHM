import { connexion } from "../modele/connexion";
class UnAdherent {
    constructor(adh_num = "", adh_civ = "", adh_nom = "", adh_prenom = "", adh_adr = "", adh_cp = "", adh_ville = "", adh_mel = "", csp_num = "") {
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
    get adhNum() { return this._adhNum; }
    get adhCiv() { return this._adhCiv; }
    get adhNom() { return this._adhNom; }
    get adhPrenom() { return this._adhPrenom; }
    get adhAdr() { return this._adhAdr; }
    get adhCp() { return this._adhCp; }
    get adhVille() { return this._adhVille; }
    get adhMel() { return this._adhMel; }
    get cspNum() { return this._cspNum; }
    set adhNum(adh_num) { this._adhNum = adh_num; }
    set adhCiv(adh_civ) { this._adhCiv = adh_civ; }
    set adhNom(adh_nom) { this._adhNom = adh_nom; }
    set adhPrenom(adh_prenom) { this._adhPrenom = adh_prenom; }
    set adhAdr(adh_adr) { this._adhAdr = adh_adr; }
    set adhCp(adh_cp) { this._adhCp = adh_cp; }
    set adhVille(adh_ville) { this._adhVille = adh_ville; }
    set adhMel(adh_mel) { this._adhMel = adh_mel; }
    set cspNum(csp_num) { this._cspNum = csp_num; }
    toArray() {
        const tableau = { 'adhNum': this._adhNum, 'adhCiv': this._adhCiv, 'adhNom': this._adhNom, 'adhPrenom': this._adhPrenom, 'adhAdr': this._adhAdr, 'adhCp': this._adhCp, 'adhVille': this._adhVille, 'adhMel': this._adhMel, 'cspNum': this._cspNum };
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesAdherents {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnAdherent
        let adherents = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const adherent = new UnAdherent(item['adh_num'], item['adh_civ'], item['adh_nom'], item['adh_prenom'], item['adh_adr'], item['adh_cp'], item['adh_ville'], item['adh_mel'], item['csp_num']);
            adherents[adherent.adhNum] = adherent; // clé d’un élément du tableau : adhNum
        }
        return adherents;
    }
    prepare(where) {
        let sql;
        sql = "SELECT	adh_num, adh_civ, adh_nom, adh_prenom, adh_adr, adh_cp, adh_ville, adh_mel, csp_num ";
        sql += " FROM	adherent";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    }
    byAdhNum(adh_num) {
        let adherent = new UnAdherent;
        const adherents = this.load(APIpageWeb.SQLloadData(this.prepare("adh_num = ?"), [adh_num]));
        const lesCles = Object.keys(adherents);
        // affecte les clés du tableau associatif « adherents » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            adherent = adherents[lesCles[0]]; // récupérer le 1er élément du tableau associatif « adherents »
        }
        return adherent;
    }
    toArray(adherents) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in adherents) {
            T.push(adherents[id].toArray());
        }
        return T;
    }
}
export { connexion };
export { UnAdherent };
export { LesAdherents };
//# sourceMappingURL=data_adherent.js.map