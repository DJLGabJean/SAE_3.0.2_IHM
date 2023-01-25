"use strict";
// type contenant les paramètres passés d'une page HTML à une autre :
// statut (rien, ou TeditSatut), iddentifiant, tableau de valeurs sous forme de chaînes de caractères 
var GrilleTabulaire = /** @class */ (function () {
    function GrilleTabulaire() {
    }
    GrilleTabulaire.prototype.show = function (tableId, dataSet, cleId, cleVisible) {
        // afficher une liste sous la forme d'une table : balise <TABLE> en HTML
    };
    GrilleTabulaire.prototype.getIdSelect = function () {
        // renvoie l'identifiant de la ligne sélectionnée dans le tableau
        return "";
    };
    GrilleTabulaire.prototype.getData = function () {
        return this.dataSet['data'];
        // renvoie le tableau de données affichées
    };
    GrilleTabulaire.prototype.addLine = function (tab2) {
        // ajouter des lignes complètes dans la liste
    };
    GrilleTabulaire.prototype.delSelectLine = function () {
        // supprimer la ligne sélectionnée de la liste
    };
    GrilleTabulaire.prototype.count = function () {
        return this.dataSet['data'].length;
        // renovie le nombre de lignes de la liste
    };
    return GrilleTabulaire;
}());
var PageWeb = /** @class */ (function () {
    function PageWeb() {
    }
    PageWeb.prototype.message = function (titre, texte) {
        // affichage boîte de dialogue avec un titre, un texte, et un bouton "Compris"
    };
    PageWeb.prototype.confirmation = function (titre, texte, vue, fctOui, fctNon) {
        if (fctNon === void 0) { fctNon = null; }
        // affichage boite de dialogue avec un titre, un message (une question) et deux boutons "Oui" et "Non"	
        // vue est l'objet contenant les deux fonctions fctOui et fctNon respectivement appelées si réponse "Oui" ou réponse "Non"
    };
    PageWeb.prototype.showArray = function (tableId, dataSet, cleId, cleVisible) {
        if (cleVisible === void 0) { cleVisible = true; }
        // instanciation d'un nouvel objet de la table "grille", appel de la méthode show de "grille" et retour de l'objet grille créé
        return this.grille[tableId];
    };
    PageWeb.prototype.show = function (fichier, id, modal) {
        if (modal === void 0) { modal = false; }
        // affichage de la page HTML de nom "fichier" dans la balise identifie par "id" en mode "modal" ou pas
    };
    PageWeb.prototype.showModal = function (fichier, id) {
        // affichage de la page HTML de nom "fichier" dans la balise identifié par la valeur de "id" en mode "modal"
    };
    PageWeb.prototype.hide = function (id) {
        // cache la fenêtre "id" 
    };
    PageWeb.prototype.close = function () {
        // ferme l'application
    };
    PageWeb.prototype.SQLexec = function (sp, params) {
        // exécute une requête de manipulation (insert, update, delete)
        return true;
    };
    PageWeb.prototype.SQLloadData = function (sp, params, req) {
        if (req === void 0) { req = 'interrogation'; }
        // exécute une requête d'interrogation et retourne le résultat soit un tableau d'objets, soit un tableau de tableaux associatifs
        var resultat = [];
        return resultat;
    };
    PageWeb.prototype.bdOpen = function (host, port, bdname, user, pwd, charset, driver) {
        if (charset === void 0) { charset = 'utf8'; }
        if (driver === void 0) { driver = 'mysql'; }
        // ouvrir une base de données
    };
    return PageWeb;
}());
// eslint-disable-next-line no-var
var APIpageWeb;
//# sourceMappingURL=pageWeb_signature.js.map