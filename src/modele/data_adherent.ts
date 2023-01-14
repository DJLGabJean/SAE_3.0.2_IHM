import {connexion} from "../modele/connexion"
class UnAdherent {
	private _adhNum : string; 
	private _adhCiv : string; 
	private _adhNom : string; 
	private _adhPrenom : string; 
	private _adhAdr : string; 
	private _adhCp : string; 
	private _adhVille : string; 
	private _adhMel : string; 
	private _cspNum : string; 


	constructor(adh_num ="", adh_civ ="", adh_nom ="", adh_prenom ="", adh_adr ="", adh_cp ="", adh_ville ="", adh_mel ="", csp_num ="") {
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
	
	get adhNum():string 	 { return this._adhNum; } 
	get adhCiv():string 	 { return this._adhCiv; } 
	get adhNom():string 	 { return this._adhNom; } 
	get adhPrenom():string 	 { return this._adhPrenom; } 
	get adhAdr():string 	 { return this._adhAdr; } 
	get adhCp():string 	 	 { return this._adhCp; } 
	get adhVille():string 	 { return this._adhVille; } 
	get adhMel():string 	 { return this._adhMel; } 
	get cspNum():string 	 { return this._cspNum; } 

	set adhNum(adh_num) 	 { this._adhNum = adh_num; } 
	set adhCiv(adh_civ) 	 { this._adhCiv = adh_civ; } 
	set adhNom(adh_nom) 	 { this._adhNom = adh_nom; } 
	set adhPrenom(adh_prenom) 	 { this._adhPrenom = adh_prenom; } 
	set adhAdr(adh_adr) 	 { this._adhAdr = adh_adr; } 
	set adhCp(adh_cp) 	 { this._adhCp = adh_cp; } 
	set adhVille(adh_ville) 	 { this._adhVille = adh_ville; } 
	set adhMel(adh_mel) 	 { this._adhMel = adh_mel; } 
	set cspNum(csp_num) 	 { this._cspNum = csp_num; } 

	
	toArray():TtabAsso {
		const tableau : TtabAsso = {'adhNum':this._adhNum, 'adhCiv':this._adhCiv, 'adhNom':this._adhNom, 'adhPrenom':this._adhPrenom, 'adhAdr':this._adhAdr, 'adhCp':this._adhCp, 'adhVille':this._adhVille, 'adhMel':this._adhMel, 'cspNum':this._cspNum};
		return tableau;
	}
}
type TAdherents = {[key : string] : UnAdherent }; // tableau d’objets UnAdherent
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesAdherents { // définition de la classe gérant les données de la table adherent
	constructor () {
		// rien
	}
	
	private load(result : TdataSet) : TAdherents {
	// à partir d’un TdataSet, conversion en tableau d’objets UnAdherent
		let adherents : TAdherents = {};
		for (let i=0; i<result.length; i++) {
			const item:TtabAsso = result[i];
			const adherent = new UnAdherent(item['adh_num'], item['adh_civ'], item['adh_nom'], item['adh_prenom'], item['adh_adr'], item['adh_cp'], item['adh_ville'], item['adh_mel'], item['csp_num']);
			adherents[adherent.adhNum] = adherent;	// clé d’un élément du tableau : adhNum
		}
		return adherents;
	}
	
	private prepare(where:string):string {	// préparation de la requête avec ou sans restriction (WHERE)
		let sql : string;
		sql	= "SELECT	adh_num, adh_civ, adh_nom, adh_prenom, adh_adr, adh_cp, adh_ville, adh_mel, csp_num ";
		sql += " FROM	adherent";
		if (where !== "")
		{
			sql	+= " WHERE " +where;
		}
		return sql;
	}

	all() : TAdherents {	// renvoie le tableau d’objets contenant tous les adherents 
		return this.load(APIpageWeb.SQLloadData(this.prepare(""),[]));
	}

	byAdhNum ( adh_num : string) : UnAdherent	{ // renvoie l’objet correspondant à adherent adh_num
		let adherent = new UnAdherent;
		const adherents : TAdherents = this.load(APIpageWeb.SQLloadData(this.prepare("adh_num = ?"),[adh_num]));
		const lesCles: string[] = Object.keys(adherents);
		// affecte les clés du tableau associatif « adherents » dans le tableau de chaines « lesCles »
		if ( lesCles.length > 0) {
			adherent = adherents[lesCles[0]];	// récupérer le 1er élément du tableau associatif « adherents »
		}
		return adherent;
	}

	toArray(adherents : TAdherents) : TdataSet {	// renvoie le tableau d’objets sous la forme 
	//	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
		let T:TdataSet = [];
		for (let id in adherents) {
			T.push(adherents[id].toArray());
		}	 
		return T;			 
	}

}

export {connexion}
export {UnAdherent}
export {TAdherents}
export {LesAdherents}
	