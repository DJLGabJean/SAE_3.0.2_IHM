import {LesAbonnements} from "../modele/data_abonnement"
import { UnAbonnement } from "../modele/data_abonnement"
import { LesThemes, UnTheme } from "../modele/data_theme"
import { UnAdherent } from "../modele/data_adherent"
import { LesAdherents } from "../modele/data_adherent"
import {TAdherents} from "../modele/data_adherent"
import { TThemes } from "../modele/data_theme"

type TpSAEForm = {
    tableInfoAbonnement : HTMLTableElement //Partie qui doit afficher la bdd
    , tableTotalAbonnement: HTMLTableElement
    , btnAbonnementDetail : HTMLInputElement
    , btnAbonnementAjouter : HTMLInputElement
    , btnAbonnementModifier: HTMLInputElement
    , btnAbonnementSupprimer: HTMLInputElement
    , btnThemeAjouter: HTMLInputElement
    , btnThemeModifier: HTMLInputElement
    , btnThemeSupprimer: HTMLInputElement
    , btnThemeValider: HTMLInputElement
    , btnThemeAnnuler: HTMLInputElement
    , btnAbonnementRetour: HTMLInputElement //Bouton en bas à droite
    , btnAbonnementValider: HTMLInputElement //Bouton en bas à droite
    , btnAbonnementAnnuler: HTMLInputElement //Bouton en bas à droite
    , dateNumDate : HTMLInputElement
    , edtIdentificationAdh : HTMLInputElement
    , edtNumAdh : HTMLInputElement
    , edtTexteInvisible: HTMLInputElement //Utiliser pour mémoriser quel bouton à été appuyer dans la page principale
    , textareaCommentaireAdh: HTMLTextAreaElement
    , chkMiniAlbum: HTMLInputElement
    , divListeAbonnement: HTMLElement //Fenetre principale
    , divPageAbonnement: HTMLElement //Fenetre pour ajouter un abonnée
    , divAbonnementTitre: HTMLElement //Pour afficher un titre en fonction du bouton que on clique (rappel: .innerHTML)
    , divInformationAdherent: HTMLElement //Pour afficher les infos de l'adhérent en fonction de celui qu'on choisi
    , divInformationAbonnement: HTMLElement //Pour afficher sa catégorie professionelle
    , divNombreTotal: HTMLElement //Afficher le nombre total du cout en euros une fois qu'il a choisis ses thémes
    , divSelectionThemes: HTMLElement //pour faire apparaitre ou disparaitre la boite à droite en bas
    , lblErreurIdendification: HTMLLabelElement //Pour afficher une erreur si les informations d'identifiants sont incorrectes
    , lblErreurAdh: HTMLLabelElement //s'il n'a pas de numéro d'adhérent renseigner et s'enlève si choisis
    , lblErreurSelectionTheme: HTMLLabelElement //Si aucun théme n'est pris et s'enlève si un théme est choisie
    , lblErreurSelectThemes: HTMLLabelElement //Si aucun théme n'est pris mais pour la boite de droite
    , selectThemes: HTMLSelectElement
    , chkVersionPapier: HTMLInputElement
}

class VueTpSae {
    private _form: TpSAEForm
    private _grille: GrilleTabulaire
    private _data: TdataSet
    private _adherent: TAdherents
    private _theme: TThemes
    private _params: Tparams
    init(form : TpSAEForm) : void {
        this._form = form
        this._grille = new GrilleTabulaire
        this._data = []
        this._adherent = {}
        this._theme = {}
        const lesAbonnements = new LesAbonnements
        this._data = lesAbonnements.listAll()
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true)
        this.form.divPageAbonnement.hidden = true
        this.form.edtTexteInvisible.value = "0"
        this.form.edtTexteInvisible.hidden = true
        this.form.divNombreTotal.innerHTML = "0.00 €"
    }

    get form() : TpSAEForm { return this._form }
    get data() :TdataSet { return this._data }
    get adherent() :TAdherents { return this._adherent }
    get theme() :TThemes { return this._theme }
    get grille() :GrilleTabulaire { return this._grille }

    supprimerClick():void {
        if ( this._grille.getIdSelect() !== "") {
        APIpageWeb.confirmation("Suppression salle","Confirmez-vous la suppression de cette abonnement ? ", vueTpSaeClass, "supprimerAbonnement()")
        }
    }

    supprimerAbonnement():void {
        // instance pour la gestion des données de la table comprenant la liste des équipements par salle
        const lesAbonnements = new LesAbonnements;
        lesAbonnements.delete(this.grille.getIdSelect()); // suppression dans la base de la salle
        this._grille.delSelectLine();
    }

    affiGrille():void {
        const lesAdherents = new LesAdherents
        const id_adh = lesAdherents.byAdhNum(this.grille.getIdSelect())
        let tab_asso = [id_adh.toArray()]
        this._data = tab_asso
        const array = lesAdherents.toArray(this.adherent)
        this._grille = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._data , 'theme_num', false);
    }

    afficherDetail(): void {
        if (this._grille.getIdSelect() !== "") {
            this.affiGrille()
            //
            this.form.edtTexteInvisible.value = "1"
            this.form.divPageAbonnement.hidden = false
            this.form.divSelectionThemes.hidden = true
            this.form.divListeAbonnement.hidden = true
            this.form.btnThemeAjouter.hidden = true
            this.form.btnThemeModifier.hidden = true
            this.form.btnThemeSupprimer.hidden = true
            this.form.btnAbonnementValider.hidden = true
            this.form.btnAbonnementAnnuler.hidden = true //Pour rendre invisible les boutons non nécessaires
            this.form.edtIdentificationAdh.disabled = true
            this.form.dateNumDate.disabled = true
            this.form.edtNumAdh.disabled = true
            this.form.textareaCommentaireAdh.disabled = true //Pour désactiver les boutons
            this.form.divAbonnementTitre.innerHTML = "Détail d'un abonnement" //Pour afficher le bon Titre
        }
    }

    ajouterAbonnement(): void {
        this.form.edtTexteInvisible.value = "2";
        this.form.divListeAbonnement.hidden = true;
        this.form.divPageAbonnement.hidden = false;
        this.form.divSelectionThemes.hidden = true;
        this.form.btnAbonnementRetour.hidden = true;
        this.form.divAbonnementTitre.innerHTML = "Ajout d'un abonnement";
    }

    annulerAjoutAbonnement(): void {
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
    }

    afficherTheme(): void {
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

    annulerAjoutTheme(): void {
        if (this.form.btnThemeAnnuler.click) {
            this.form.divSelectionThemes.hidden = true;
            this.form.btnThemeAjouter.disabled = false;
            this.form.btnThemeModifier.disabled = false;
            this.form.btnThemeSupprimer.disabled = false;
        }
    }

    verifierAjoutAbonnement(): void {
        if (this.verifieurAjout() === false) {
            this.messageErreur()       
        }
        else {
            alert("good work !")
            //fonction pour ajouter
        }
    }

    verifieurAjout(): boolean {
        const nombreIdentification = parseInt(this.form.edtIdentificationAdh.value)
        const nombreAdherent = parseInt(this.form.edtNumAdh.value)
        if (this.form.edtIdentificationAdh.value === "" || isNaN(nombreIdentification) ) {
            return false
        }
        if (this.form.edtNumAdh.value === "" || isNaN(nombreAdherent) ) {
            return false
        }
        if (this.form.dateNumDate.value === "") {
            return false
        }
        return true
    }
    

    messageErreur(): void {
        let erreurMsg = "Erreur : élément manquant \n";
        if (this.form.edtIdentificationAdh.value === "") {
         erreurMsg += "Le numéro d'identification n'a pas été renseigné. \n"
        }
        else {
            erreurMsg += "La saisie d'identification est incorrecte. \n"
        }
        if (this.form.dateNumDate.value === "") {
         erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.\n"
        }
        else {
            erreurMsg += "La saisie de la date est incorrecte. \n"
        }
        if (this.form.edtNumAdh.value === "") {
         erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné. \n";
        }
        else {
            erreurMsg += "La saisie d'adhésion est incorrecte. \n"
        }
        //ajouter thème
        alert(erreurMsg)
    }

    retourAfficherAbonnement(): void {
        if (this.form.edtTexteInvisible.value === "1") { //Si l'utilisateur à cliquer sur détail
            this.form.edtTexteInvisible.value = "0"
            return this.retourAfficherDetail()
        }
        else if (this.form.edtTexteInvisible.value === "2") { //Si l'utilisateur à clique sur ajout
            this.form.edtTexteInvisible.value = "0"
            return this.annulerAjoutAbonnement()
        }
        else {

        }
    }

    retourAfficherDetail(): void {
        this.form.divPageAbonnement.hidden = true
        this.form.divSelectionThemes.hidden = false
        this.form.divListeAbonnement.hidden = false
        this.form.btnThemeAjouter.hidden = false
        this.form.btnThemeModifier.hidden = false
        this.form.btnThemeSupprimer.hidden = false
        this.form.btnAbonnementValider.hidden = false
        this.form.btnAbonnementAnnuler.hidden = false
        this.form.edtIdentificationAdh.disabled = false
        this.form.dateNumDate.disabled = false
        this.form.edtNumAdh.disabled = false
        this.form.textareaCommentaireAdh.disabled = false
        this.form.divAbonnementTitre.innerHTML = ""
    }

    ajouterClick(): void {
        let abonnement = new UnAbonnement
        let desAbonnements = new LesAbonnements
        abonnement.abonNum = this.form.edtIdentificationAdh.value
        abonnement.abonDate = this.form.dateNumDate.value
        abonnement.abonComment = this.form.textareaCommentaireAdh.value
        abonnement.adhNum = this.form.edtNumAdh.value
        desAbonnements.insert(abonnement)
        //
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true)
    }
}

let vueTpSaeClass = new VueTpSae
export {vueTpSaeClass}