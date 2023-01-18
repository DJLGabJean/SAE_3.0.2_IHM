import { connexion } from "../modele/connexion";
class UnCsp {
    constructor(csp_num = "", csp_lib = "") {
        this._cspNum = csp_num;
        this._cspLib = csp_lib;
    }
    get cspNum() { return this._cspNum; }
    get cspLib() { return this._cspLib; }
    set cspNum(csp_num) { this._cspNum = csp_num; }
    set cspLib(csp_lib) { this._cspLib = csp_lib; }
    toArray() {
        const tableau = { 'cspNum': this._cspNum, 'cspLib': this._cspLib };
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesCsps {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnCsp
        let csps = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const csp = new UnCsp(item['csp_num'], item['csp_lib']);
            csps[csp.cspNum] = csp; // clé d’un élément du tableau : cspNum
        }
        return csps;
    }
    prepare(where) {
        let sql;
        sql = "SELECT	csp_num, csp_lib ";
        sql += " FROM	csp";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    }
    byCspNum(csp_num) {
        let csp = new UnCsp;
        const csps = this.load(APIpageWeb.SQLloadData(this.prepare("csp_num = ?"), [csp_num]));
        const lesCles = Object.keys(csps);
        // affecte les clés du tableau associatif « csps » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            csp = csps[lesCles[0]]; // récupérer le 1er élément du tableau associatif « csps »
        }
        return csp;
    }
    toArray(csps) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in csps) {
            T.push(csps[id].toArray());
        }
        return T;
    }
}
export { connexion };
export { UnCsp };
export { LesCsps };
//# sourceMappingURL=data_csp.js.map