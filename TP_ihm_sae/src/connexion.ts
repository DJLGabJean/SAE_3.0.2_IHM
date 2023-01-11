class Connexion {
	constructor() {
		this.init();
    }
	init() : void {
		APIpageWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','toto3u_bdclub','toto3u','', 'utf8');
	}
  }
  // eslint-disable-next-line no-var
let connexion = new Connexion;

export {connexion}