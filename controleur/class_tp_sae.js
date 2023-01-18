import { LesAbonnements } from "../modele/data_abonnement";
import { UnAbonnement } from "../modele/data_abonnement";
var VueTpSae = /** @class */ (function () {
    function VueTpSae() {
    }
    VueTpSae.prototype.init = function (form) {
        this._form = form;
        this._grille = new GrilleTabulaire;
        this._data = [];
        var lesAbonnements = new LesAbonnements;
        this._data = lesAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
        this.form.divPageAbonnement.hidden = true;
        this.form.edtTexteInvisible.value = "0";
        this.form.edtTexteInvisible.hidden = true;
        this.form.divNombreTotal.innerHTML = "0.00 €";
    };
    Object.defineProperty(VueTpSae.prototype, "form", {
        get: function () { return this._form; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueTpSae.prototype, "data", {
        get: function () { return this._data; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueTpSae.prototype, "grille", {
        get: function () { return this._grille; },
        enumerable: false,
        configurable: true
    });
    VueTpSae.prototype.supprimerClick = function () {
        if (this._grille.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression salle", "Confirmez-vous la suppression de cette abonnement ? ", vueTpSaeClass, "supprimerSalle()");
        }
    };
    VueTpSae.prototype.supprimerSalle = function () {
        // instance pour la gestion des données de la table comprenant la liste des équipements par salle
        var lesAbonnements = new LesAbonnements;
        lesAbonnements["delete"](this.grille.getIdSelect()); // suppression dans la base de la salle
        this._grille.delSelectLine();
    };
    VueTpSae.prototype.afficherDetail = function () {
        if (this._grille.getIdSelect() !== "") {
            //this.form.tableInfoAbonnement
            this.form.edtTexteInvisible.value = "1";
            this.form.divPageAbonnement.hidden = false;
            this.form.divSelectionThemes.hidden = true;
            this.form.divListeAbonnement.hidden = true;
            this.form.btnThemeAjouter.hidden = true;
            this.form.btnThemeModifier.hidden = true;
            this.form.btnThemeSupprimer.hidden = true;
            this.form.btnAbonnementValider.hidden = true;
            this.form.btnAbonnementAnnuler.hidden = true; //Pour rendre invisible les boutons non nécessaires
            this.form.edtIdentificationAdh.disabled = true;
            this.form.date_numDate.disabled = true;
            this.form.edtNumAdh.disabled = true;
            this.form.textareaCommentaireAdh.disabled = true; //Pour désactiver les boutons
            this.form.divAbonnementTitre.innerHTML = "Détail d'un abonnement"; //Pour afficher le bon Titre
        }
    };
    VueTpSae.prototype.ajouterAbonnement = function () {
        this.form.edtTexteInvisible.value = "2";
        this.form.divListeAbonnement.hidden = true;
        this.form.divPageAbonnement.hidden = false;
        this.form.divSelectionThemes.hidden = true;
        this.form.btnAbonnementRetour.hidden = true;
    };
    VueTpSae.prototype.afficherTheme = function () {
        this.form.divSelectionThemes.hidden = false;
        this.form.btnThemeAjouter.disabled = true;
        this.form.btnThemeModifier.disabled = true;
        this.form.btnThemeSupprimer.disabled = true;
    };
    VueTpSae.prototype.messageErreur = function () {
        var erreurMsg = "Erreur : élément manquant";
        if (this.form.edtIdentificationAdh.value === "") {
            erreurMsg += "Le numéro d'identification n'a pas été renseigné.<br>";
        }
        if (this.form.date_numDate.value === "") {
            erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.<br>";
        }
        if (this.form.edtNumAdh.value === "") {
            erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné.<br>";
        }
    };
    VueTpSae.prototype.retourAfficherAbonnement = function () {
        if (this.form.edtTexteInvisible.value === "1") { //Si l'utilisateur à cliquer sur détail
            this.form.edtTexteInvisible.value = "0";
            return this.retourAfficherDetail();
        }
        else if (this.form.edtTexteInvisible.value === "2") { //Si l'utilisateur à clique sur ajout
            this.form.edtTexteInvisible.value = "0";
            return this.annulerAjoutAbonnement();
        }
        else {
        }
    };
    VueTpSae.prototype.retourAfficherDetail = function () {
        this.form.divPageAbonnement.hidden = true;
        this.form.divSelectionThemes.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.hidden = false;
        this.form.btnThemeModifier.hidden = false;
        this.form.btnThemeSupprimer.hidden = false;
        this.form.btnAbonnementValider.hidden = false;
        this.form.btnAbonnementAnnuler.hidden = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.date_numDate.disabled = false;
        this.form.edtNumAdh.disabled = false;
        this.form.textareaCommentaireAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
    };
    VueTpSae.prototype.annulerAjoutAbonnement = function () {
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
    };
    VueTpSae.prototype.ajouterClick = function () {
        var abonnement = new UnAbonnement;
        var desAbonnements = new LesAbonnements;
        abonnement.abonNum = this.form.edtIdentificationAdh.value;
        abonnement.abonDate = this.form.date_numDate.value;
        abonnement.abonComment = this.form.textareaCommentaireAdh.value;
        abonnement.adhNum = this.form.edtNumAdh.value;
        desAbonnements.insert(abonnement);
        //
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this._data = desAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
    };
    return VueTpSae;
}());
var vueTpSaeClass = new VueTpSae;
export { vueTpSaeClass };
//# sourceMappingURL=class_tp_sae.js.map