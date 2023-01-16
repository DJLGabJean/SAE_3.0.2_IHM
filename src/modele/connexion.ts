class Connexion {
	constructor() {
		this.init();
    }
	init() : void {
		APIpageWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','nae1u_bdclub','toto3u_appli','31904250', 'utf8');
	}
  }
  // eslint-disable-next-line no-var
let connexion = new Connexion;

export {connexion}