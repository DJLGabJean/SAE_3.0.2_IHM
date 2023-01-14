import {connexion} from "../modele/connexion"
class UnTheme {
	private _themeNum : string; 
	private _themeLib : string; 
	private _themeTarif : string; 
 
	constructor(theme_num ="", theme_lib ="", theme_tarif ="") {
		this._themeNum = theme_num; 
		this._themeLib = theme_lib; 
		this._themeTarif = theme_tarif; 
	}
	
	get themeNum():string 	 { return this._themeNum; } 
	get themeLib():string 	 { return this._themeLib; } 
	get themeTarif():string 	 { return this._themeTarif; } 
	
	set themeNum(theme_num) 	 { this._themeNum = theme_num; } 
	set themeLib(theme_lib) 	 { this._themeLib = theme_lib; } 
	set themeTarif(theme_tarif) 	 { this._themeTarif = theme_tarif; } 
	
	toArray():TtabAsso {
		const tableau : TtabAsso = {'themeNum':this._themeNum, 'themeLib':this._themeLib, 'themeTarif':this._themeTarif};
		return tableau;
	}
}
type TThemes = {[key : string] : UnTheme }; // tableau d’objets UnTheme
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemes { // définition de la classe gérant les données de la table theme
	constructor () {
		// rien
	}
	
	private load(result : TdataSet) : TThemes {
	// à partir d’un TdataSet, conversion en tableau d’objets UnTheme
		let themes : TThemes = {};
		for (let i=0; i<result.length; i++) {
			const item : TtabAsso = result[i];
			const theme = new UnTheme(item['theme_num'], item['theme_lib'], item['theme_tarif']);
			themes[theme.themeNum] = theme;	// clé d’un élément du tableau : themeNum
		}
		return themes;
	}
	
	private prepare(where:string):string {	// préparation de la requête avec ou sans restriction (WHERE)
		let sql : string;
		sql	= "SELECT	theme_num, theme_lib, theme_tarif ";
		sql += " FROM	theme";
		if (where !== "")
		{
			sql	+= " WHERE " +where;
		}
		return sql;
	}

	all() : TThemes {	// renvoie le tableau d’objets contenant tous les themes 
		return this.load(APIpageWeb.SQLloadData(this.prepare(""),[]));
	}

	byThemeNum ( theme_num : string) : UnTheme	{ // renvoie l’objet correspondant à theme theme_num
		let theme = new UnTheme;
		const themes : TThemes = this.load(APIpageWeb.SQLloadData(this.prepare("theme_num = ?"),[theme_num]));
		const lesCles: string[] = Object.keys(themes);
		// affecte les clés du tableau associatif « themes » dans le tableau de chaines « lesCles »
		if ( lesCles.length > 0) {
			theme = themes[lesCles[0]];	// récupérer le 1er élément du tableau associatif « themes »
		}
		return theme;
	}

	toArray(themes : TThemes) : TdataSet {	// renvoie le tableau d’objets sous la forme 
	//	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
		let T:TdataSet = [];
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
class UnThemeByAbonnement {	// classe hérite de UnTheme
	private _envoiPapier : string; 
	private _montant	 : string;
	private _unTheme     : UnTheme;

	constructor(unTheme : UnTheme = null, envoi_papier = '' ) 
	{	
		this._unTheme = unTheme;
		this._envoiPapier = envoi_papier; 
		this._montant = this._unTheme.themeTarif;
		if (this.envoiPapier==='1') { 
			this.montant = (Number(this.montant) *2).toFixed(2); 
		}
	}
	// définition des « getters » et des « setters » pour les attributs privés de la classe
	get envoiPapier():string 	 	{ return this._envoiPapier; } 
	set envoiPapier(envoi_papier) 	{ this._envoiPapier = envoi_papier; } 
	get montant():string 			{ return this._montant; } 
	set montant(montant) 	 		{ this._montant = montant; } 
	get unTheme():UnTheme			{ return this._unTheme; }
	set unTheme(unTheme : UnTheme)	{ this._unTheme = unTheme; }

	toArray():TtabAsso	{
	// renvoie l’objet sous la forme d’un tableau associatif 
	// pour un affichage dans une ligne d’un tableau HTML
		let tableau = this.unTheme.toArray();	// appel de la méthode « toArray » de « UnTheme »
		tableau['envoiPapier']  = 'N';
		if (this.envoiPapier==='1') { tableau['envoiPapier']  = 'O';	}
		tableau['montant']  = this.montant.replace('.',',');
		return tableau;
	}
}

type TThemesByAbonnement = {[key: string]: UnThemeByAbonnement };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemesByAbonnement {	 
	constructor () {
		// rien
	}

	private load(result : TdataSet) :	TThemesByAbonnement	{
	// à partir d’un TdataSet, conversion en tableau d’objets UnThemeByAbonnement
		let themesByAbonnement : TThemesByAbonnement = {};
		for (let i=0; i<result.length; i++) {
			const item:TtabAsso = result[i];
			const themeByAbonnement = new UnThemeByAbonnement(new UnTheme(item['theme_num'], item['theme_lib'], item['theme_tarif']), item['envoi_papier']);
            themesByAbonnement[themeByAbonnement.unTheme.themeNum] = themeByAbonnement;		
		}
		return themesByAbonnement;
	}

	private prepare(where:string):string {
		let sql : string;
		sql	= "SELECT theme.theme_num as theme_num, theme.theme_lib as theme_lib, theme.theme_tarif as theme_tarif, envoi_papier";
		sql += " FROM adhesion JOIN theme ON adhesion.theme_num=theme.theme_num";
		if (where.trim() !== "")
		{
			sql	+= " WHERE " +where;
		}
		return sql;
	}
		

	byAbonNum(abon_num : string) : TThemesByAbonnement { 
	// renvoie le tableau d’objets contenant tous de abonnement abon_num
		return this.load(APIpageWeb.SQLloadData(this.prepare("abon_num = ?"),[abon_num]));
	}

	byAbonNumThemeNum(abon_num : string, theme_num : string ) : UnThemeByAbonnement {
	// renvoie l’objet de theme_num contenu dans abonnement abon_num
        let themeByAbonnement = new UnThemeByAbonnement;
		const  themesByAbonnement : TThemesByAbonnement = this.load(APIpageWeb.SQLloadData(
									this.prepare("adhesion.abon_num = ? and adhesion.theme_num = ?"),[abon_num, theme_num]));
		if ( !themesByAbonnement [0] === undefined) {
			themeByAbonnement = themesByAbonnement[0];
		}
		return themeByAbonnement;	
	}

	toArray(themesByAbonnement : TThemesByAbonnement) : TdataSet {
		let T:TdataSet = [];
		for (let id in themesByAbonnement) {
			T.push(themesByAbonnement[id].toArray());
		}
		return T; 
	}

    delete(abon_num : string):boolean { // requête de suppression abonnement dans «adhesion»
		let sql : string;
		sql	= "DELETE	FROM	adhesion	WHERE	abon_num = ?";
		return APIpageWeb.SQLexec(sql,[abon_num]);		// requête de manipulation : utiliser SQLexec
	}
	insert(abon_num : string, themesByAbonnement : TThemesByAbonnement) : boolean {
		// requête d’ajout dans « adhesion » pour abonnement abon_num
		let sql : string;
		let separateur = "";
		sql	= "INSERT INTO adhesion(abon_num, theme_num, envoi_papier) VALUES  ";
		for (let cle in themesByAbonnement) {
			sql += separateur +"('" +abon_num+"','" +themesByAbonnement[cle].unTheme.themeNum+"','" +themesByAbonnement[cle].envoiPapier +"')";
			separateur = ",";
		}
		return APIpageWeb.SQLexec(sql,[]);
	}
	update(abon_num : string,  themeByAbonnement : UnThemeByAbonnement):boolean {
		// requête de modification de la table « adhesion »
		let sql : string;
		sql	= "UPDATE adhesion SET envoi_papier = ?";
        sql += " WHERE abon_num = ? AND theme_num = ?";
		return APIpageWeb.SQLexec(sql,[themeByAbonnement.envoiPapier, abon_num, themeByAbonnement.unTheme.themeNum]);
	}

	getTotal(themes : TThemesByAbonnement) : number {
        let mt = 0;
        for (let id in themes) {
			mt += Number(themes[id].montant);
		}
        return mt;       
    }	
}

export {connexion}
export {UnTheme}
export {TThemes}
export {LesThemes}
export {UnThemeByAbonnement}
export {TThemesByAbonnement}
export {LesThemesByAbonnement}
