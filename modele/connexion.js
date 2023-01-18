var Connexion = /** @class */ (function () {
    function Connexion() {
        this.init();
    }
    Connexion.prototype.init = function () {
        APIpageWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr', '3306', 'nae1u_IHM', 'nae1u_appli', '', 'utf8');
    };
    return Connexion;
}());
// eslint-disable-next-line no-var
var connexion = new Connexion;
export { connexion };
//# sourceMappingURL=connexion.js.map