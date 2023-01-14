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
    , btnAbonnementRetour: HTMLInputElement
    , btnAbonnementValider: HTMLInputElement
    , btnAbonnementAnnuler: HTMLInputElement
    , edtIdentificationAdh : HTMLInputElement
    , edtNumDate : HTMLInputElement
    , edtNumAdh : HTMLInputElement
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
    init(form : TpSAEForm) : void {
        this._form = form
        this.form.divPageAbonnement.hidden = true
    }

    get form() : TpSAEForm { return this._form }

    ajouterAbonnement(): void {
        this.form.divPageAbonnement.hidden = false;
        this.form.btnAbonnementSupprimer.disabled = true;
        this.form.btnAbonnementDetail.disabled = true;
        this.form.btnAbonnementModifier.disabled = true;
        this.form.btnAbonnementAnnuler.disabled = false;
        this.form.btnAbonnementValider.disabled = false;
        this.form.btnAbonnementAnnuler.disabled = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeAnnuler.disabled = false;
    }
    
    messageErreur(): void {
       let erreurMsg = "Erreur : élément manquant";
       erreurMsg as this.form.lblErreurAdh;
       if (this.form.edtIdentificationAdh === "") {
        erreurMsg += this.form.lblErreurIdendification = "Le numéro d'identification n'a pas été renseigné.\n"
       }
       if (this.form.edtNumDate === "") {
        let erreurAdh =
        erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.\n" as this.form.lblErreurAdh
       }
       if (this.form.edtNumAdh === "") {
        erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné.\n"
       }
    }
}
