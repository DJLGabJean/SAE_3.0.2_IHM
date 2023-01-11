import {connexion} from "../modele/connexion"
class UnCsp {
	private _cspNum : string; 
	private _cspLib : string; 


	constructor(csp_num ="", csp_lib ="") {
		this._cspNum = csp_num; 
		this._cspLib = csp_lib; 
		
	}
	
	get cspNum():string 	 { return this._cspNum; } 
	get cspLib():string 	 { return this._cspLib; } 
	
	set cspNum(csp_num) 	 { this._cspNum = csp_num; } 
	set cspLib(csp_lib) 	 { this._cspLib = csp_lib; } 
	
	
	toArray():TtabAsso {
		const tableau : TtabAsso = {'cspNum':this._cspNum, 'cspLib':this._cspLib};
		return tableau;
	}
}
type TCsps = {[key : string] : UnCsp }; // tableau d’objets UnCsp
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesCsps { // définition de la classe gérant les données de la table csp
	constructor () {
		// rien
	}
	
	private load(result : TdataSet) : TCsps {
	// à partir d’un TdataSet, conversion en tableau d’objets UnCsp
		let csps : TCsps = {};
		for (let i=0; i<result.length; i++) {
			const item:TtabAsso = result[i];
			const csp = new UnCsp(item['csp_num'], item['csp_lib']);
			csps[csp.cspNum] = csp;	// clé d’un élément du tableau : cspNum
		}
		return csps;
	}
	
	private prepare(where:string):string {	// préparation de la requête avec ou sans restriction (WHERE)
		let sql : string;
		sql	= "SELECT	csp_num, csp_lib ";
		sql += " FROM	csp";
		if (where !== "")
		{
			sql	+= " WHERE " +where;
		}
		return sql;
	}

	all() : TCsps {	// renvoie le tableau d’objets contenant tous les csps 
		return this.load(APIpageWeb.SQLloadData(this.prepare(""),[]));
	}

	byCspNum ( csp_num : string) : UnCsp	{ // renvoie l’objet correspondant à csp csp_num
		let csp = new UnCsp;
		const csps : TCsps = this.load(APIpageWeb.SQLloadData(this.prepare("csp_num = ?"),[csp_num]));
		const lesCles: string[] = Object.keys(csps);
		// affecte les clés du tableau associatif « csps » dans le tableau de chaines « lesCles »
		if ( lesCles.length > 0) {
			csp = csps[lesCles[0]];	// récupérer le 1er élément du tableau associatif « csps »
		}
		return csp;
	}

	toArray(csps : TCsps) : TdataSet {	// renvoie le tableau d’objets sous la forme 
	//	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
		let T:TdataSet = [];
		for (let id in csps) {
			T.push(csps[id].toArray());
		}	 
		return T;			 
	}
}
	
export {connexion} 
export {UnCsp}
export {TCsps}
export {LesCsps}
 