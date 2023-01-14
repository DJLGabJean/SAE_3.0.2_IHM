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
    , edtIdentificationAdh : HTMLInputElement
    , edtNumDate : HTMLInputElement
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
    init(form : TpSAEForm) : void {
        this._form = form
        this.form.divPageAbonnement.hidden = true
        this.form.edtTexteInvisible.value = "0"
        this.form.edtTexteInvisible.hidden = true
    }

    get form() : TpSAEForm { return this._form }

    afficherDetail(): void {
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
        this.form.edtNumDate.disabled = true
        this.form.edtNumAdh.disabled = true
        this.form.textareaCommentaireAdh.disabled = true //Pour désactiver les boutons
    }

    retourAfficherAbonnement(): void {
        if (this.form.edtTexteInvisible.value === "1") { //Si l'utilisateur à cliquer sur détail
            return this.retourAfficherDetail()
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
        this.form.edtNumDate.disabled = false
        this.form.edtNumAdh.disabled = false
        this.form.textareaCommentaireAdh.disabled = false
    }

    ajouterAbonnement(): void {
        this.form.divPageAbonnement.hidden = false;
        this.form.divSelectionThemes.hidden = true;
        this.form.btnAbonnementSupprimer.disabled = true;
        this.form.btnAbonnementDetail.disabled = true;
        this.form.btnAbonnementModifier.disabled = true;
        this.form.btnAbonnementDetail.disabled = true;
        this.form.btnAbonnementAnnuler.disabled = false;
        this.form.btnAbonnementValider.disabled = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
    }
    
    messageErreur(): void {
       let erreurMsg = "Erreur : élément manquant";
       if (this.form.edtIdentificationAdh.value === "") {
        erreurMsg += "Le numéro d'identification n'a pas été renseigné.\n"
       }
       if (this.form.edtNumDate.value === "") {
        erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.\n"
       }
       if (this.form.edtNumAdh.value === "") {
        erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné.\n";
       }
    }

    afficherTheme(): void {
        if (this.form.btnThemeAjouter.click || this.form.btnThemeModifier.click) {
            this.form.divSelectionThemes.hidden = false;
        }
    }

    annulerAjoutAbonnement(): void {
        if (this.form.btnAbonnementAnnuler.click || this.form.btnAbonnementRetour.click) {
            this.form.divPageAbonnement.hidden = true;
        }
    }
}

let vueTpSaeClass = new VueTpSae
export {vueTpSaeClass}