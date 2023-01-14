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
        this.form.divSelectionThemes.hidden = true;
        this.form.btnAbonnementSupprimer.disabled = true;
        this.form.btnAbonnementDetail.disabled = true;
        this.form.btnAbonnementModifier.disabled = true;
        this.form.btnAbonnementAnnuler.disabled = false;
        this.form.btnAbonnementValider.disabled = false;
        this.form.btnAbonnementAnnuler.disabled = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this.afficherTheme();
    }
    
    messageErreur(): void {
       let erreurMsg = "Erreur : élément manquant";
       if (this.form.edtIdentificationAdh.value === "") {
        erreurMsg += this.form.lblErreurIdendification.innerHTML = "Le numéro d'identification n'a pas été renseigné.\n"
       }
       if (this.form.edtNumDate.value === "") {
        erreurMsg += this.form.edtNumDate.innerHTML = "La date d'ajout de l'abonnement n'a pas été renseignée.\n"
       }
       if (this.form.edtNumAdh.value === "") {
        erreurMsg += this.form.edtNumAdh.innerHTML = "Le numéro d'adhésion de l'abonné n'est pas renseigné.\n";
       }
    }

    afficherTheme(): void {
        if (this.form.btnThemeAjouter.click || this.form.btnThemeModifier.click) {
            this.form.divSelectionThemes.hidden = false;
        }
    }
}
