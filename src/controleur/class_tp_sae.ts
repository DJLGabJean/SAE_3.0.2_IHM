//TODO sale schlag: trigger pour verifier si le mec à pris un thémes, ajoute le truc pour modifier et supprimer les abonnements
//TODO et uncheck la checkbox sale connard
//TODO ET n'oublie pas d'enlever ces commentaires car on sera dans la merde :)
//TODO ne laisse pas les utilisateurs toucher au numéro d'abonement
//TODO et trouve un moyen de refresh le tableau d'affichage
//TODO Partie de Nico à faire s'il veut bien
import {LesAbonnements} from "../modele/data_abonnement"
import { UnAbonnement } from "../modele/data_abonnement"
import { TAbonnements } from "../modele/data_abonnement"
import { UnTheme } from "../modele/data_theme"
import { LesThemes } from "../modele/data_theme"
import { TThemes } from "../modele/data_theme"
import { LesThemesByAbonnement } from "../modele/data_theme"
import { UnThemeByAbonnement } from "../modele/data_theme"
import { TThemesByAbonnement } from "../modele/data_theme"
import { UnAdherent } from "../modele/data_adherent"
import { LesAdherents } from "../modele/data_adherent"
import {TAdherents} from "../modele/data_adherent"
import { UnCsp } from "../modele/data_csp"
import { LesCsps } from "../modele/data_csp"
import { TCsps } from "../modele/data_csp"

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
    private _indexIncrementation: number //Je veux ce nombre pour incrementer mon tableau qui stocke les abonnements et personne n'y touche !
    private _form: TpSAEForm
    private _grille: GrilleTabulaire
    private _grilleTotalAbonnement: GrilleTabulaire
    private _data: TdataSet
    private _dataTheme: TThemesByAbonnement
    private _dataStockageAjoutTheme: TThemesByAbonnement //Permet de stocker les themes dans cet objet
    private _dataAdherent: TdataSet
    private _dataTousThemes: TThemes
    private _dataTousThemesGrille: TdataSet
    private _stockageTousLesAdherents: TAdherents
    private _dataThemeGrille: TdataSet
    private _cléTheme: string
    init(form : TpSAEForm) : void {
        this._indexIncrementation = 0
        this._form = form
        this._grille = new GrilleTabulaire
        this._grilleTotalAbonnement = new GrilleTabulaire
        this._data = []
        this._dataTheme = {}
        this._dataStockageAjoutTheme = {}
        this._dataThemeGrille = []
        const lesThemes = new LesThemes()
        this._dataTousThemes = lesThemes.all()
        this._dataTousThemesGrille = lesThemes.toArray(this._dataTousThemes)
        const lesAbonnements = new LesAbonnements
        this._data = lesAbonnements.listAll()
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true)
        this._dataAdherent = []
        const tousAdherent = new LesAdherents
        this._stockageTousLesAdherents = tousAdherent.all()
        this._dataAdherent = tousAdherent.toArray(this._stockageTousLesAdherents)
        this.form.divPageAbonnement.hidden = true
        this.form.edtTexteInvisible.value = "0"
        this.form.edtTexteInvisible.hidden = true
        this.form.divNombreTotal.innerHTML = "0.00 €"
    }

    get form() : TpSAEForm { return this._form }
    get data() :TdataSet { return this._data }
    get dataTheme() :TThemesByAbonnement { return this._dataTheme }
    get dataStockageAjoutTheme() :TThemesByAbonnement { return this._dataStockageAjoutTheme }
    get dataThemeGrille() :TdataSet { return this._dataThemeGrille }
    get dataAdherent() :TdataSet { return this._dataAdherent }
    get dataTousThemes() :TThemes { return this._dataTousThemes }
    get dataTousThemesGrille() :TdataSet { return this._dataTousThemesGrille }
    get stockageTousLesAdherents() :TAdherents { return this._stockageTousLesAdherents }
    get grille() :GrilleTabulaire { return this._grille }
    get grilleAbonnement() :GrilleTabulaire { return this._grilleTotalAbonnement }
    get cléTheme() :string { return this._cléTheme }

    supprimerClick():void {
        if ( this._grille.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression salle","Confirmez-vous la suppression de cette abonnement ? ", vueTpSaeClass, "supprimerAbonnement()")
        }
    }

    supprimerAbonnement():void {
        // instance pour la gestion des données de la table comprenant la liste des équipements par salle
        const lesAbonnements = new LesAbonnements;
        lesAbonnements.delete(this.grille.getIdSelect())
        this._grille.delSelectLine();
    }

    affiGrille(idGrille: string):void {
        const lesThemesParAbo = new LesThemesByAbonnement
        const idAbonNum = lesThemesParAbo.byAbonNum(idGrille)
        this._dataThemeGrille = lesThemesParAbo.toArray(idAbonNum)
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._dataThemeGrille, 'themeNum', false);
    }

    affiGrilleAjout():void {
        this.form.tableTotalAbonnement.hidden = false
        const lesThemesParAbo = new LesThemesByAbonnement
        let totalAbonnement = lesThemesParAbo.getTotal(this._dataStockageAjoutTheme)
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €"
        this._dataThemeGrille = lesThemesParAbo.toArray(this._dataStockageAjoutTheme)
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._dataThemeGrille, 'themeNum', false);
    }

    recupererInfoAbonn(idGrille: string): void {
        const lesAbonnements = new LesAbonnements()
        const abonAffich = lesAbonnements.byAbonNum(idGrille)
        this.form.edtIdentificationAdh.value = abonAffich.abonNum
        this.form.edtNumAdh.value = abonAffich.adhNum
        this.form.dateNumDate.value = abonAffich.abonDate
        this.form.textareaCommentaireAdh.value = abonAffich.abonComment
        //
        let divInfoAbonnement = ""
        const lesAdherents = new LesAdherents
        const unAdherents = lesAdherents.byAdhNum(abonAffich.adhNum)
        divInfoAbonnement += "Adherent <br>"
        divInfoAbonnement += unAdherents.adhCiv + " " + unAdherents.adhNom + " " +  unAdherents.adhPrenom + "<br>"
        divInfoAbonnement += unAdherents.adhMel + "<br>"
        if (unAdherents.adhAdr === null) { //si l'adresse est null
            divInfoAbonnement += "" + "<br>"
        }
        else {
            divInfoAbonnement += unAdherents.adhAdr + "<br>"
        }
        if (unAdherents.adhCp === null || unAdherents.adhVille === null) {
            if (unAdherents.adhCp === null) {
                divInfoAbonnement += "" + " "
            }
            if (unAdherents.adhVille === null) {
                divInfoAbonnement += ""
            }
        }
        else {
            divInfoAbonnement += unAdherents.adhCp + " " + unAdherents.adhVille
        }
        this.form.divInformationAdherent.innerHTML = divInfoAbonnement
        //
        const lesCsp = new LesCsps
        const idCsp = lesCsp.byCspNum(unAdherents.cspNum)
        let divInfoCSP = ""
        divInfoCSP += "Catégories SocioProfessionelle <br>"
        divInfoCSP += idCsp.cspLib
        this.form.divInformationAbonnement.innerHTML = divInfoCSP
        //
        const lesThemes = new LesThemesByAbonnement()
        this._dataTheme = lesThemes.byAbonNum(idGrille)
        let totalAbonnement = lesThemes.getTotal(this._dataTheme)
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €"
    }

    afficherDetail(): void {
        if (this._grille.getIdSelect() !== "") {
            let grilleId = this.grille.getIdSelect()
            this.recupererInfoAbonn(grilleId)
            this.affiGrille(grilleId)
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
        this.form.tableTotalAbonnement.hidden = true
        this.form.divAbonnementTitre.innerHTML = "Ajout d'un abonnement";
        //
        const lesAbonnements = new LesAbonnements()
        let numéroAbonnement = lesAbonnements.getNouveauNumero()
        this.form.edtIdentificationAdh.value = numéroAbonnement
    }

    afficherModifier(): void {
        if (this._grille.getIdSelect() !== "") {
            let grilleId = this.grille.getIdSelect()
            this.recupererInfoAbonn(grilleId)
            this.affiGrille(grilleId)
            //
            this.form.edtTexteInvisible.value = "3"
            this.form.divPageAbonnement.hidden = false
            this.form.divSelectionThemes.hidden = true
            this.form.divListeAbonnement.hidden = true
            this.form.btnAbonnementRetour.hidden = true
            this.form.edtIdentificationAdh.disabled = true
            this.form.dateNumDate.disabled = true
            this.form.edtNumAdh.disabled = true
            this.form.textareaCommentaireAdh.disabled = true //Check si les boutons désactiver sont nécessaires
            this.form.divAbonnementTitre.innerHTML = "Modification d'un abonnement" //Pour afficher le bon Titre
        }
    }

    refreshNuméroAdhérent(): void {
        if (this.verifieurExistenceNumAdh() === true) {
            let indiceAdhérent = 0
            for (let i = 0; i < this._dataAdherent.length; i++) {
                if (this.form.edtNumAdh.value === this._dataAdherent[i].adhNum) {
                    indiceAdhérent = i
                }
            }
            let divInfoAbonnement = ""
            divInfoAbonnement += "Adherent <br>"
            divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhCiv + " " + this._dataAdherent[indiceAdhérent].adhNom + " " +  this._dataAdherent[indiceAdhérent].adhPrenom + "<br>"
            divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhMel + "<br>"
            if (this._dataAdherent[indiceAdhérent].adhAdr === null) { //si l'adresse est null
                divInfoAbonnement += "" + "<br>"
            }
            else {
                divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhAdr + "<br>"
            }
            if (this._dataAdherent[indiceAdhérent].adhCp === null || this._dataAdherent[indiceAdhérent].adhVille === null) {
                if (this._dataAdherent[indiceAdhérent].adhCp === null) {
                    divInfoAbonnement += "" + " "
                }
                if (this._dataAdherent[indiceAdhérent].adhVille === null) {
                    divInfoAbonnement += ""
                }
            }
            else {
                divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhCp + " " + this._dataAdherent[indiceAdhérent].adhVille
            }
            this.form.divInformationAdherent.innerHTML = divInfoAbonnement
            //
            const lesCsp = new LesCsps
            const idCsp = lesCsp.byCspNum(this._dataAdherent[indiceAdhérent].cspNum)
            let divInfoCSP = ""
            divInfoCSP += "Catégories SocioProfessionelle <br>"
            divInfoCSP += idCsp.cspLib
            this.form.divInformationAbonnement.innerHTML = divInfoCSP
        }
        else if (this.verifieurExistenceNumAdh() === false) {
            this.form.divInformationAdherent.innerHTML = "Adherent"
            this.form.divInformationAbonnement.innerHTML = "Catégories SocioProfessionelle"
        }
    }

    ajouterDepuisTheme(): void {
        this.form.divSelectionThemes.hidden = false;
        this.form.btnThemeAjouter.disabled = true;
        this.form.btnThemeModifier.disabled = true;
        this.form.btnThemeSupprimer.disabled = true;
        this.afficherSelectionTheme()
    }

    ajouterClick(): void {
        let abonnement = new UnAbonnement
        let desAbonnements = new LesAbonnements
        abonnement.abonNum = this.form.edtIdentificationAdh.value
        abonnement.abonDate = this.form.dateNumDate.value
        abonnement.abonComment = this.form.textareaCommentaireAdh.value
        abonnement.adhNum = this.form.edtNumAdh.value
        desAbonnements.insert(abonnement)
        // TODO faire les trucs pour themes
        const lesThemesByAbon = new LesThemesByAbonnement
        lesThemesByAbon.insert(this.form.edtIdentificationAdh.value, this._dataStockageAjoutTheme)
        this._dataStockageAjoutTheme= {}
        //
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        //this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true)
        //
    }

    modifierTheme(): void {
        if (this.grilleAbonnement.getIdSelect() !== "") {
            this.form.divSelectionThemes.hidden = false;
            this.form.btnThemeAjouter.disabled = true;
            this.form.btnThemeModifier.disabled = true;
            this.form.btnThemeSupprimer.disabled = true;
            this.afficherModificationTheme()
        }
    }

    supprimerTheme(): void {
        if (this.grilleAbonnement.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression Theme","Confirmez-vous la suppression de ce théme ? ", vueTpSaeClass, "suppressionTheme()")
        }
    }

    afficherSelectionTheme(): void {
        const lesThemes = new LesThemes;
        let data = {}
        data = lesThemes.all()
        let dataArray = lesThemes.toArray(data)
        for (let i in dataArray) {
            const item = dataArray[i]
            const id = item.themeNum
            this.form.selectThemes.options.add(new Option(item.themeLib, id));
        }
    }

    afficherModificationTheme(): void {
        let grilleId = this.grilleAbonnement.getIdSelect()
        const lesThemes = new LesThemes;
        let dataUnTheme = new UnTheme
        dataUnTheme = lesThemes.byThemeNum(grilleId)
        let dataArray :TtabAsso
        dataArray = dataUnTheme.toArray()
        this.form.selectThemes.options.add(new Option(dataArray.themeLib, dataArray.themeNum));
    }

    suppressionTheme(): void {
        //let data: TThemesByAbonnement = {}
        delete this._dataTheme[Number(this.grilleAbonnement.getIdSelect())];
        this.grilleAbonnement.delSelectLine();
        //
        //const lesThemes = new LesThemesByAbonnement()
        //this._dataTheme = lesThemes.byAbonNum(this.form.edtIdentificationAdh.value)
        //let totalAbonnement = lesThemes.getTotal(this._dataTheme)
        //console.log(this.dataTheme)
        //console.log(this.dataThemeGrille)
        //this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €"
        let totalAbonnement = ""
        let nombreString = 0
        for (let i = 0; i < this._dataThemeGrille.length; i++) {
            nombreString += parseInt(this._dataThemeGrille[i].montant)
        }
        totalAbonnement = String(nombreString)
        console.log(this._dataTheme)
        console.log(this._dataThemeGrille)
        console.log(totalAbonnement)
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €"
    }

    annulerAjoutTheme(): void {
        if (this.form.btnThemeAnnuler.click) {
            this.form.divSelectionThemes.hidden = true;
            this.form.btnThemeAjouter.disabled = false;
            this.form.btnThemeModifier.disabled = false;
            this.form.btnThemeSupprimer.disabled = false;
            //
            const liste = this.form.selectThemes;
            let noLigne : number = liste.options.length;
            while (noLigne > 0) {
                liste.remove(--noLigne);
            }
        }
    }

    validerAjoutTheme(): void { //TODO Stocke tous dans un TThemesByAbonnement global
        if (this.form.selectThemes.selectedIndex >= 0) {
            for (let i = 0; i < this._dataTousThemesGrille.length; i++) {
                if (this.form.selectThemes.value === this._dataTousThemesGrille[i].themeNum) {
                    this._cléTheme = this._dataTousThemesGrille[i].themeNum
                }
            }
            const lesThemes = new LesThemes
            let unTheme = lesThemes.byThemeNum(this.cléTheme)
            let versioPapierBool = ""
            if (this.form.chkVersionPapier.checked === true) {
                versioPapierBool = "1"
            }
            const leTheme = new UnThemeByAbonnement(unTheme, versioPapierBool)
            console.log(this._indexIncrementation, "incrémentation")
            let TTthemesPourAbo: TThemesByAbonnement = {}
            this._dataStockageAjoutTheme[this._indexIncrementation] = leTheme
            this._indexIncrementation ++
            console.log(this._indexIncrementation, "incrémentation2")
            console.log(TTthemesPourAbo)
            this.affiGrilleAjout()
            this.annulerAjoutTheme()
        }
    }

    verifierAjoutAbonnement(): void {
        if (this.verifieurAjout() === false) {
            this.messageErreur()       
        }
        else {
            this.ajouterClick()
        }
    }

    verifieurAjout(): boolean {
        const nombreIdentification = parseInt(this.form.edtIdentificationAdh.value)
        const nombreAdherent = parseInt(this.form.edtNumAdh.value)
        if (this.form.edtIdentificationAdh.value === "" || isNaN(nombreIdentification) || this.verifieurDuplicationNumAbon() === true) {
            return false
        }
        if (this.form.edtNumAdh.value === "" || isNaN(nombreAdherent) || this.verifieurExistenceNumAdh() === false) {
            return false
        }
        if (this.form.dateNumDate.value === "") {
            return false
        }
        return true
    }

    verifieurDuplicationNumAbon(): boolean {
        let dataVerifieur: TdataSet
        let tousAbonnement = new LesAbonnements
        dataVerifieur = []
        dataVerifieur = tousAbonnement.listAll()
        for (let i = 0; i < dataVerifieur.length; i++) {
            if (this.form.edtIdentificationAdh.value === dataVerifieur[i].abon_num) {
                return true
            }
        }
        return false
    }

    verifieurExistenceNumAdh(): boolean {
        for (let i = 0; i < this._dataAdherent.length; i++) {
            if (this.form.edtNumAdh.value === this._dataAdherent[i].adhNum) {
                return true
            }
        }
        return false
    }

    messageErreur(): void {
        let erreurMsg = "Erreur : élément manquant \n";
        if (this.form.edtIdentificationAdh.value === "") {
         erreurMsg += "Le numéro d'abonnement n'a pas été renseigné. \n"
        }
        else if (this.verifieurDuplicationNumAbon() === true) {
            erreurMsg += "Le numéro d'abonnement existe déja. \n"
        }
        if (this.form.dateNumDate.value === "") {
         erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.\n"
        }
        if (this.form.edtNumAdh.value === "") {
         erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné. \n";
        }
        else if (this.verifieurExistenceNumAdh() === false){
            erreurMsg += "Le numéro d'adhésion n'existe pas. \n"
        }
        //ajouter thème
        alert(erreurMsg)
    }

    retourOuAnnulerAbonnement(): void {
        this.form.btnThemeAjouter.disabled = false
        this.form.btnThemeModifier.disabled = false
        this.form.btnThemeSupprimer.disabled = false
        if (this.form.edtTexteInvisible.value === "1") { //Si l'utilisateur à cliquer sur détail
            this.form.edtTexteInvisible.value = "0"
            this.viderChamps()
            return this.retourAfficherDetail()
        }
        else if (this.form.edtTexteInvisible.value === "2") { //Si l'utilisateur à clique sur ajout
            this.form.edtTexteInvisible.value = "0"
            this.viderChamps()
            return this.annulerAjoutAbonnement()
        }
        else if (this.form.edtTexteInvisible.value === "3") { //si l'utilisateur à cliquer sur modifier
            this.form.edtTexteInvisible.value = "0"
            this.viderChamps()
            return this.annulerModifierAbonnement()
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

    annulerAjoutAbonnement(): void {
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this.form.divAbonnementTitre.innerHTML = ""
        this.form.tableTotalAbonnement.hidden = false
    }

    annulerModifierAbonnement(): void {
        this.form.divPageAbonnement.hidden = true
        this.form.divSelectionThemes.hidden = false
        this.form.divListeAbonnement.hidden = false
        this.form.btnAbonnementRetour.hidden = false
        this.form.edtIdentificationAdh.disabled = false
        this.form.dateNumDate.disabled = false
        this.form.edtNumAdh.disabled = false
        this.form.textareaCommentaireAdh.disabled = false
        this.form.divAbonnementTitre.innerHTML = ""
    }

    viderChamps(): void {
        this.form.edtIdentificationAdh.value = ""
        this.form.edtNumAdh.value = ""
        this.form.dateNumDate.value = ""
        this.form.textareaCommentaireAdh.value = ""
        this.form.divInformationAbonnement.innerHTML = ""
        this.form.divInformationAdherent.innerHTML = ""
        this.form.divNombreTotal.innerHTML = "0.00 €"
    }
}

let vueTpSaeClass = new VueTpSae
export {vueTpSaeClass}