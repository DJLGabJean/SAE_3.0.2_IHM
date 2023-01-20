import { LesAbonnements } from "../modele/data_abonnement";
import { UnAbonnement } from "../modele/data_abonnement";
import { LesThemesByAbonnement } from "../modele/data_theme";
import { LesAdherents } from "../modele/data_adherent";
import { LesCsps } from "../modele/data_csp";
class VueTpSae {
    init(form) {
        this._form = form;
        this._grille = new GrilleTabulaire;
        this._grilleTotalAbonnement = new GrilleTabulaire;
        this._data = [];
        const lesAbonnements = new LesAbonnements;
        this._data = lesAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
        this.form.divPageAbonnement.hidden = true;
        this.form.edtTexteInvisible.value = "0";
        this.form.edtTexteInvisible.hidden = true;
        this.form.divNombreTotal.innerHTML = "0.00 €";
    }
    get form() { return this._form; }
    get data() { return this._data; }
    get grille() { return this._grille; }
    get grilleAbonnement() { return this._grilleTotalAbonnement; }
    supprimerClick() {
        if (this._grille.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression salle", "Confirmez-vous la suppression de cette abonnement ? ", vueTpSaeClass, "supprimerAbonnement()");
        }
    }
    supprimerAbonnement() {
        // instance pour la gestion des données de la table comprenant la liste des équipements par salle
        const lesAbonnements = new LesAbonnements;
        lesAbonnements.delete(this.grille.getIdSelect()); // suppression dans la base de la salle
        this._grille.delSelectLine();
    }
    affiGrille() {
        let dataTheme;
        const lesThemesParAbo = new LesThemesByAbonnement;
        const idAbonNum = lesThemesParAbo.byAbonNum(this.grille.getIdSelect());
        let tab_adherent = lesThemesParAbo.toArray(idAbonNum);
        dataTheme = tab_adherent;
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, dataTheme, 'abon_num', true);
        //
    }
    recupererInfoAbonn() {
        const lesAbonnements = new LesAbonnements();
        const abonAffich = lesAbonnements.byAbonNum(this.grille.getIdSelect());
        this.form.edtIdentificationAdh.value = abonAffich.abonNum;
        this.form.edtNumAdh.value = abonAffich.adhNum;
        this.form.dateNumDate.value = abonAffich.abonDate;
        this.form.textareaCommentaireAdh.value = abonAffich.abonComment;
        //
        let divInfoAbonnement = "";
        const lesAdherents = new LesAdherents;
        const unAdherents = lesAdherents.byAdhNum(this.grille.getIdSelect());
        divInfoAbonnement += "Adherent <br>";
        divInfoAbonnement += unAdherents.adhCiv + unAdherents.adhNom + unAdherents.adhPrenom + "<br>";
        divInfoAbonnement += unAdherents.adhMel + "<br>";
        divInfoAbonnement += unAdherents.adhAdr + "<br>";
        divInfoAbonnement += unAdherents.adhCp + unAdherents.adhVille;
        this.form.divInformationAdherent.innerHTML = divInfoAbonnement;
        //
        const lesCsp = new LesCsps;
        const idCsp = lesCsp.byCspNum(unAdherents.cspNum);
        let divInfoCSP = "";
        divInfoCSP += "Catégories SocioProfessionelle <br>";
        divInfoCSP += idCsp.cspLib;
        this.form.divInformationAbonnement.innerHTML = divInfoCSP;
    }
    afficherDetail() {
        if (this._grille.getIdSelect() !== "") {
            this.recupererInfoAbonn();
            this.affiGrille();
            //
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
            this.form.dateNumDate.disabled = true;
            this.form.edtNumAdh.disabled = true;
            this.form.textareaCommentaireAdh.disabled = true; //Pour désactiver les boutons
            this.form.divAbonnementTitre.innerHTML = "Détail d'un abonnement"; //Pour afficher le bon Titre
        }
    }
    ajouterAbonnement() {
        this.form.edtTexteInvisible.value = "2";
        this.form.divListeAbonnement.hidden = true;
        this.form.divPageAbonnement.hidden = false;
        this.form.divSelectionThemes.hidden = true;
        this.form.btnAbonnementRetour.hidden = true;
        this.form.divAbonnementTitre.innerHTML = "Ajout d'un abonnement";
    }
    annulerAjoutAbonnement() {
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
    }
    afficherTheme() {
        this.form.divSelectionThemes.hidden = false;
        this.form.btnThemeAjouter.disabled = true;
        this.form.btnThemeModifier.disabled = true;
        this.form.btnThemeSupprimer.disabled = true;
        //this.afficherSelectionTheme()
    }
    /*afficherSelectionTheme(): void {
        const lesThemes = new LesThemes;
        this._theme = lesThemes.all();
        const themeslist : string[] = this._params.elts;
        for (let i in this._theme) {
            const item : UnTheme = this._theme[i];
            const id = item.themeNum;
        }
    }*/
    annulerAjoutTheme() {
        if (this.form.btnThemeAnnuler.click) {
            this.form.divSelectionThemes.hidden = true;
            this.form.btnThemeAjouter.disabled = false;
            this.form.btnThemeModifier.disabled = false;
            this.form.btnThemeSupprimer.disabled = false;
        }
    }
    verifierAjoutAbonnement() {
        if (this.verifieurAjout() === false) {
            this.messageErreur();
        }
        else {
            alert("good work !");
            //fonction pour ajouter
        }
    }
    verifieurAjout() {
        const nombreIdentification = parseInt(this.form.edtIdentificationAdh.value);
        const nombreAdherent = parseInt(this.form.edtNumAdh.value);
        if (this.form.edtIdentificationAdh.value === "" || isNaN(nombreIdentification)) {
            return false;
        }
        if (this.form.edtNumAdh.value === "" || isNaN(nombreAdherent)) {
            return false;
        }
        if (this.form.dateNumDate.value === "") {
            return false;
        }
        return true;
    }
    messageErreur() {
        let erreurMsg = "Erreur : élément manquant \n";
        if (this.form.edtIdentificationAdh.value === "") {
            erreurMsg += "Le numéro d'identification n'a pas été renseigné. \n";
        }
        else {
            erreurMsg += "La saisie d'identification est incorrecte. \n";
        }
        if (this.form.dateNumDate.value === "") {
            erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.\n";
        }
        else {
            erreurMsg += "La saisie de la date est incorrecte. \n";
        }
        if (this.form.edtNumAdh.value === "") {
            erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné. \n";
        }
        else {
            erreurMsg += "La saisie d'adhésion est incorrecte. \n";
        }
        //ajouter thème
        alert(erreurMsg);
    }
    retourAfficherAbonnement() {
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
        this.viderChamps();
    }
    retourAfficherDetail() {
        this.form.divPageAbonnement.hidden = true;
        this.form.divSelectionThemes.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.hidden = false;
        this.form.btnThemeModifier.hidden = false;
        this.form.btnThemeSupprimer.hidden = false;
        this.form.btnAbonnementValider.hidden = false;
        this.form.btnAbonnementAnnuler.hidden = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.dateNumDate.disabled = false;
        this.form.edtNumAdh.disabled = false;
        this.form.textareaCommentaireAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
    }
    viderChamps() {
        this.form.edtIdentificationAdh.value = "";
        this.form.edtNumAdh.value = "";
        this.form.dateNumDate.value = "";
        this.form.textareaCommentaireAdh.value = "";
        this.form.divInformationAbonnement.innerHTML = "";
        this.form.divInformationAdherent.innerHTML = "";
    }
    ajouterClick() {
        let abonnement = new UnAbonnement;
        let desAbonnements = new LesAbonnements;
        abonnement.abonNum = this.form.edtIdentificationAdh.value;
        abonnement.abonDate = this.form.dateNumDate.value;
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
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
    }
}
let vueTpSaeClass = new VueTpSae;
export { vueTpSaeClass };
//# sourceMappingURL=class_tp_sae.js.map