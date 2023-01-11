import {connexion} from "../modele/connexion"
class UnAbonnement {
	private _abonNum : string; 
	private _abonDate : string; 
	private _abonComment : string; 
	private _adhNum : string; 

	constructor(abon_num ="", abon_date ="", abon_comment ="", adh_num ="") {
		this._abonNum = abon_num; 
		this._abonDate = abon_date; 
		this._abonComment = abon_comment; 
		this._adhNum = adh_num; 
	}
	
	get abonNum():string 	 { return this._abonNum; } 
	get abonDate():string 	 { return this._abonDate; } 
	get abonComment():string 	 { return this._abonComment; } 
	get adhNum():string 	 { return this._adhNum; } 
	
	set abonNum(abon_num) 	 { this._abonNum = abon_num; } 
	set abonDate(abon_date) 	 { this._abonDate = abon_date; } 
	set abonComment(abon_comment) 	 { this._abonComment = abon_comment; } 
	set adhNum(adh_num) 	 { this._adhNum = adh_num; } 
	
	toArray():TtabAsso {
		const tableau : TtabAsso = {'abonNum':this._abonNum, 'abonDate':this._abonDate, 'abonComment':this._abonComment, 'adhNum':this._adhNum};
		return tableau;
	}
}
type TAbonnements = {[key : string] : UnAbonnement }; // tableau d’objets UnAbonnement
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesAbonnements { // définition de la classe gérant les données de la table abonnement
	constructor () {
		// rien
	}
	
	private load(result : TdataSet) : TAbonnements {
	// à partir d’un TdataSet, conversion en tableau d’objets UnAbonnement
		let abonnements : TAbonnements = {};
		for (let i=0; i<result.length; i++) {
			const item:TtabAsso = result[i];
			const abonnement = new UnAbonnement(item['abon_num'], item['abon_date'], item['abon_comment'], item['adh_num']);
			abonnements[abonnement.abonNum] = abonnement;	// clé d’un élément du tableau : abonNum
		}
		return abonnements;
	}
	
	private prepare(where:string):string {	// préparation de la requête avec ou sans restriction (WHERE)
		let sql : string;
		sql	= "SELECT	abon_num, abon_date, abon_comment, adh_num ";
		sql += " FROM	abonnement";
		if (where !== "")
		{
			sql	+= " WHERE " +where;
		}
		return sql;
	}

	all() : TAbonnements {	// renvoie le tableau d’objets contenant tous les abonnements 
		return this.load(APIpageWeb.SQLloadData(this.prepare(""),[]));
	}

	byAbonNum ( abon_num : string) : UnAbonnement	{ // renvoie l’objet correspondant à abonnement abon_num
		let abonnement = new UnAbonnement;
		const abonnements : TAbonnements = this.load(APIpageWeb.SQLloadData(this.prepare("abon_num = ?"),[abon_num]));
		const lesCles: string[] = Object.keys(abonnements);
		// affecte les clés du tableau associatif « abonnements » dans le tableau de chaines « lesCles »
		if ( lesCles.length > 0) {
			abonnement = abonnements[lesCles[0]];	// récupérer le 1er élément du tableau associatif « abonnements »
		}
		return abonnement;
	}

	toArray(abonnements : TAbonnements) : TdataSet {	// renvoie le tableau d’objets sous la forme 
	//	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
		let T:TdataSet = [];
		for (let id in abonnements) {
			T.push(abonnements[id].toArray());
		}	 
		return T;			 
	}

	delete(abon_num : string):boolean {	// requête de suppression abonnement dans la table
		let sql : string;
		sql	= "DELETE	FROM	abonnement	WHERE	abon_num = ?";
		return APIpageWeb.SQLexec(sql,[abon_num]);		// requête de manipulation : utiliser SQLexec
	}

	insert(abonnement : UnAbonnement):boolean {	// requête d’ajout abonnement dans la table
		let sql : string; 					// requête de manipulation : utiliser SQLexec
		sql	= "INSERT	INTO	abonnement (abon_num, abon_date, abon_comment, adh_num) VALUES (?, ?, ?, ?)";
		return APIpageWeb.SQLexec(sql,[abonnement.abonNum, abonnement.abonDate, abonnement.abonComment, abonnement.adhNum]); 	
		}

	update(abonnement : UnAbonnement):boolean {	// requête de modification abonnement dans la table
		let sql : string;
		sql	= "UPDATE abonnement SET abon_date = ?, abon_comment = ?, adh_num = ? ";
		sql += " WHERE	abon_num	= ?"; 					// requête de manipulation : utiliser SQLexec
		return APIpageWeb.SQLexec(sql,[abonnement.abonDate, abonnement.abonComment, abonnement.adhNum, abonnement.abonNum]); 	
	}

	getNouveauNumero() : string {
		return APIpageWeb.SQLloadData("SELECT MAX(abon_num)+1 as num FROM abonnement",[])[0]['num'];	// première ligne, colonne "num"
	}

    private listPrepare(where:string):string {
        let sql : string;
		sql  = "SELECT abonnement.abon_num as abon_num, DATE_FORMAT(abon_date, '%d/%m/%Y') as 'date_abonnement'";
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
		if (where !== "")
        {
            sql += " WHERE " +where;
//-----		version avec amélioration
//			sql += " AND " +where;
// --------------------------------------------
        }
		sql  += " GROUP BY abon_num";
        sql	 += " ORDER BY abonnement.abon_date DESC "; 
        return sql;
    }

    listAll() : TdataSet {
        return APIpageWeb.SQLloadData(this.listPrepare(""),[]);			
    }

}

export {connexion}
export {UnAbonnement}
export {TAbonnements}
export {LesAbonnements}