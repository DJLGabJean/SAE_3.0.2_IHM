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
    , edtIdentifiactionAdh : HTMLInputElement
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
        this.form.edtIdentifiactionAdh.disabled = true
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
        this.form.edtIdentifiactionAdh.disabled = false
        this.form.edtNumDate.disabled = false
        this.form.edtNumAdh.disabled = false
        this.form.textareaCommentaireAdh.disabled = false
    }
}

let vueTpSaeClass = new VueTpSae
export {vueTpSaeClass}