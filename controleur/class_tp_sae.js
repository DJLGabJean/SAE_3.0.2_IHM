//TODO fix modification d'abonnement, il se duplique bizarrement et se fix avec un ajout
//TODO Partie de Nico à faire s'il veut bien
//TODO supprimer théme Doublon et fix bug d'array peut-être un for dans un for
import { LesAbonnements } from "../modele/data_abonnement";
import { UnAbonnement } from "../modele/data_abonnement";
import { UnTheme } from "../modele/data_theme";
import { LesThemes } from "../modele/data_theme";
import { LesThemesByAbonnement } from "../modele/data_theme";
import { UnThemeByAbonnement } from "../modele/data_theme";
import { LesAdherents } from "../modele/data_adherent";
import { LesCsps } from "../modele/data_csp";
class VueTpSae {
    init(form) {
        this._indexIncrementation = 0;
        this._form = form;
        this._grille = new GrilleTabulaire;
        this._grilleTotalAbonnement = new GrilleTabulaire;
        this._data = [];
        this._dataTheme = {};
        this._dataStockageAjoutTheme = {};
        this._dataThemeGrille = [];
        const lesThemes = new LesThemes();
        this._dataTousThemes = lesThemes.all();
        this._dataTousThemesGrille = lesThemes.toArray(this._dataTousThemes);
        const lesAbonnements = new LesAbonnements;
        this._data = lesAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
        this._dataAdherent = [];
        const tousAdherent = new LesAdherents;
        this._stockageTousLesAdherents = tousAdherent.all();
        this._dataAdherent = tousAdherent.toArray(this._stockageTousLesAdherents);
        this.form.divPageAbonnement.hidden = true;
        this.form.edtTexteInvisible.value = "0";
        this.form.edtTexteInvisible.hidden = true;
        this.form.chkModifierTheme.hidden = true;
        this.form.divNombreTotal.innerHTML = "0.00 €";
    }
    get form() { return this._form; }
    get data() { return this._data; }
    get dataTheme() { return this._dataTheme; }
    get dataStockageAjoutTheme() { return this._dataStockageAjoutTheme; }
    get dataThemeGrille() { return this._dataThemeGrille; }
    get dataAdherent() { return this._dataAdherent; }
    get dataTousThemes() { return this._dataTousThemes; }
    get dataTousThemesGrille() { return this._dataTousThemesGrille; }
    get stockageTousLesAdherents() { return this._stockageTousLesAdherents; }
    get grille() { return this._grille; }
    get grilleAbonnement() { return this._grilleTotalAbonnement; }
    get cléTheme() { return this._cléTheme; }
    supprimerClick() {
        if (this._grille.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression salle", "Confirmez-vous la suppression de cette abonnement ? ", vueTpSaeClass, "supprimerAbonnement()");
        }
    }
    supprimerAbonnement() {
        const lesAbonnements = new LesAbonnements;
        const lesThemesByAbo = new LesThemesByAbonnement;
        lesAbonnements.delete(this.grille.getIdSelect());
        lesThemesByAbo.delete(this.grille.getIdSelect());
        this._grille.delSelectLine();
    }
    affiGrille(idGrille) {
        const lesThemesParAbo = new LesThemesByAbonnement;
        const idAbonNum = lesThemesParAbo.byAbonNum(idGrille);
        this._dataThemeGrille = lesThemesParAbo.toArray(idAbonNum);
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._dataThemeGrille, 'themeNum', false);
    }
    affiGrilleAjout() {
        this.form.tableTotalAbonnement.hidden = false;
        const lesThemesParAbo = new LesThemesByAbonnement;
        let totalAbonnement = lesThemesParAbo.getTotal(this._dataStockageAjoutTheme);
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €";
        this._dataThemeGrille = lesThemesParAbo.toArray(this._dataStockageAjoutTheme);
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._dataThemeGrille, 'themeNum', false);
    }
    recupererInfoAbonn(idGrille) {
        const lesAbonnements = new LesAbonnements();
        const abonAffich = lesAbonnements.byAbonNum(idGrille);
        this.form.edtIdentificationAdh.value = abonAffich.abonNum;
        this.form.edtNumAdh.value = abonAffich.adhNum;
        this.form.dateNumDate.value = abonAffich.abonDate;
        this.form.textareaCommentaireAdh.value = abonAffich.abonComment;
        //
        let divInfoAbonnement = "";
        const lesAdherents = new LesAdherents;
        const unAdherents = lesAdherents.byAdhNum(abonAffich.adhNum);
        divInfoAbonnement += "Adherent <br>";
        divInfoAbonnement += unAdherents.adhCiv + " " + unAdherents.adhNom + " " + unAdherents.adhPrenom + "<br>";
        divInfoAbonnement += unAdherents.adhMel + "<br>";
        if (unAdherents.adhAdr === null) { //si l'adresse est null
            divInfoAbonnement += "" + "<br>";
        }
        else {
            divInfoAbonnement += unAdherents.adhAdr + "<br>";
        }
        if (unAdherents.adhCp === null || unAdherents.adhVille === null) {
            if (unAdherents.adhCp === null) {
                divInfoAbonnement += "" + " ";
            }
            if (unAdherents.adhVille === null) {
                divInfoAbonnement += "";
            }
        }
        else {
            divInfoAbonnement += unAdherents.adhCp + " " + unAdherents.adhVille;
        }
        this.form.divInformationAdherent.innerHTML = divInfoAbonnement;
        //
        const lesCsp = new LesCsps;
        const idCsp = lesCsp.byCspNum(unAdherents.cspNum);
        let divInfoCSP = "";
        divInfoCSP += "Catégories SocioProfessionelle <br>";
        divInfoCSP += idCsp.cspLib;
        this.form.divInformationAbonnement.innerHTML = divInfoCSP;
        //
        const lesThemes = new LesThemesByAbonnement();
        this._dataTheme = lesThemes.byAbonNum(idGrille);
        let totalAbonnement = lesThemes.getTotal(this._dataTheme);
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €";
    }
    afficherDetail() {
        if (this._grille.getIdSelect() !== "") {
            let grilleId = this.grille.getIdSelect();
            this.recupererInfoAbonn(grilleId);
            this.affiGrille(grilleId);
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
        this.form.tableTotalAbonnement.hidden = true;
        this.form.divAbonnementTitre.innerHTML = "Ajout d'un abonnement";
        //
        const lesAbonnements = new LesAbonnements();
        let numéroAbonnement = lesAbonnements.getNouveauNumero();
        this.form.edtIdentificationAdh.value = numéroAbonnement;
    }
    afficherModifier() {
        if (this._grille.getIdSelect() !== "") {
            const lesThemesByAbo = new LesThemesByAbonnement;
            let grilleId = this.grille.getIdSelect();
            this.recupererInfoAbonn(grilleId);
            this.affiGrille(grilleId);
            this._dataStockageAjoutTheme = lesThemesByAbo.byAbonNum(this._grille.getIdSelect());
            //
            this.form.edtTexteInvisible.value = "3";
            this.form.divPageAbonnement.hidden = false;
            this.form.divSelectionThemes.hidden = true;
            this.form.divListeAbonnement.hidden = true;
            this.form.btnAbonnementRetour.hidden = true;
            this.form.edtIdentificationAdh.disabled = true;
            this.form.dateNumDate.disabled = true;
            this.form.edtNumAdh.disabled = true;
            this.form.textareaCommentaireAdh.disabled = true; //Check si les boutons désactiver sont nécessaires
            this.form.divAbonnementTitre.innerHTML = "Modification d'un abonnement"; //Pour afficher le bon Titre
        }
    }
    refreshNuméroAdhérent() {
        if (this.verifieurExistenceNumAdh() === true) {
            let indiceAdhérent = 0;
            for (let i = 0; i < this._dataAdherent.length; i++) {
                if (this.form.edtNumAdh.value === this._dataAdherent[i].adhNum) {
                    indiceAdhérent = i;
                }
            }
            let divInfoAbonnement = "";
            divInfoAbonnement += "Adherent <br>";
            divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhCiv + " " + this._dataAdherent[indiceAdhérent].adhNom + " " + this._dataAdherent[indiceAdhérent].adhPrenom + "<br>";
            divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhMel + "<br>";
            if (this._dataAdherent[indiceAdhérent].adhAdr === null) { //si l'adresse est null
                divInfoAbonnement += "" + "<br>";
            }
            else {
                divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhAdr + "<br>";
            }
            if (this._dataAdherent[indiceAdhérent].adhCp === null || this._dataAdherent[indiceAdhérent].adhVille === null) {
                if (this._dataAdherent[indiceAdhérent].adhCp === null) {
                    divInfoAbonnement += "" + " ";
                }
                if (this._dataAdherent[indiceAdhérent].adhVille === null) {
                    divInfoAbonnement += "";
                }
            }
            else {
                divInfoAbonnement += this._dataAdherent[indiceAdhérent].adhCp + " " + this._dataAdherent[indiceAdhérent].adhVille;
            }
            this.form.divInformationAdherent.innerHTML = divInfoAbonnement;
            //
            const lesCsp = new LesCsps;
            const idCsp = lesCsp.byCspNum(this._dataAdherent[indiceAdhérent].cspNum);
            let divInfoCSP = "";
            divInfoCSP += "Catégories SocioProfessionelle <br>";
            divInfoCSP += idCsp.cspLib;
            this.form.divInformationAbonnement.innerHTML = divInfoCSP;
        }
        else if (this.verifieurExistenceNumAdh() === false) {
            this.form.divInformationAdherent.innerHTML = "Adherent";
            this.form.divInformationAbonnement.innerHTML = "Catégories SocioProfessionelle";
        }
    }
    ajouterDepuisTheme() {
        this.form.divSelectionThemes.hidden = false;
        this.form.btnThemeAjouter.disabled = true;
        this.form.btnThemeModifier.disabled = true;
        this.form.btnThemeSupprimer.disabled = true;
        this.afficherSelectionTheme();
    }
    ajouterClick() {
        this.form.edtTexteInvisible.value = "0";
        let abonnement = new UnAbonnement;
        let desAbonnements = new LesAbonnements;
        abonnement.abonNum = this.form.edtIdentificationAdh.value;
        abonnement.abonDate = this.form.dateNumDate.value;
        abonnement.abonComment = this.form.textareaCommentaireAdh.value;
        abonnement.adhNum = this.form.edtNumAdh.value;
        console.log(abonnement, "aprés Insertion");
        desAbonnements.insert(abonnement);
        //
        const lesThemesByAbon = new LesThemesByAbonnement;
        lesThemesByAbon.insert(this.form.edtIdentificationAdh.value, this._dataStockageAjoutTheme);
        console.log(this._dataStockageAjoutTheme, "avant vidage");
        this._dataStockageAjoutTheme = {};
        this.form.divNombreTotal.innerHTML = "0.00 €";
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
    }
    modifierTheme() {
        if (this.grilleAbonnement.getIdSelect() !== "") {
            this.form.chkModifierTheme.checked = true;
            this.form.divSelectionThemes.hidden = false;
            this.form.btnThemeAjouter.disabled = true;
            this.form.btnThemeModifier.disabled = true;
            this.form.btnThemeSupprimer.disabled = true;
            this.afficherModificationTheme();
        }
    }
    supprimerTheme() {
        if (this.grilleAbonnement.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression Theme", "Confirmez-vous la suppression de ce théme ? ", vueTpSaeClass, "suppressionTheme()");
        }
    }
    labelErreur() {
        //if (this.form.edtIdentificationAdh.value === "0") {
        //}
        //if (this.form.edtNumAdh.value === "") {
        //}
        this.form.lblErreurAdh.innerHTML = "Veuillez saisir le numéro d'adhérent !";
    }
    afficherSelectionTheme() {
        const lesThemes = new LesThemes;
        const lesThemesByAbo = new LesThemesByAbonnement;
        let stockageAbonnementActuel = lesThemesByAbo.toArray(this._dataStockageAjoutTheme);
        let data = {};
        data = lesThemes.all();
        let dataArray = lesThemes.toArray(data);
        console.log(dataArray);
        console.log(stockageAbonnementActuel);
        if (stockageAbonnementActuel.length === 0) {
            for (let i in dataArray) {
                const item = dataArray[i];
                const id = item.themeNum;
                console.log(id);
                this.form.selectThemes.options.add(new Option(item.themeLib, id));
            }
        }
        else {
            for (let i = 0, j = 0; i < dataArray.length; i++) {
                const item = dataArray[i];
                console.log(item, "item");
                const id = item.themeNum;
                console.log(stockageAbonnementActuel[j].themeNum, "themeNum");
                console.log(id, "id");
                if (stockageAbonnementActuel[j].themeNum != id) {
                    console.log("ajout");
                    this.form.selectThemes.options.add(new Option(item.themeLib, id));
                }
                if (j === stockageAbonnementActuel.length - 1) {
                    console.log("rien putain");
                    //rien
                }
                else if (stockageAbonnementActuel[j].themeNum === id) {
                    console.log("incrémentation");
                    j++;
                }
            }
        }
    }
    afficherModificationTheme() {
        let grilleId = this.grilleAbonnement.getIdSelect();
        const lesThemes = new LesThemes;
        let dataUnTheme = new UnTheme;
        dataUnTheme = lesThemes.byThemeNum(grilleId);
        let dataArray;
        dataArray = dataUnTheme.toArray();
        this.form.selectThemes.options.add(new Option(dataArray.themeLib, dataArray.themeNum));
    }
    modificationAbonnement() {
        const lesThemesAbo = new LesThemesByAbonnement;
        lesThemesAbo.delete(this.form.edtIdentificationAdh.value);
        lesThemesAbo.insert(this.form.edtIdentificationAdh.value, this._dataStockageAjoutTheme);
        this.form.divPageAbonnement.hidden = true;
        this.form.divSelectionThemes.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.dateNumDate.disabled = false;
        this.form.edtNumAdh.disabled = false;
        this.form.textareaCommentaireAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
        const lesAbonnements = new LesAbonnements();
        this._data = lesAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
    }
    suppressionTheme() {
        delete this._dataStockageAjoutTheme[Number(this.grilleAbonnement.getIdSelect())];
        this.grilleAbonnement.delSelectLine();
        console.log(this._dataStockageAjoutTheme);
        //
        let totalAbonnement = "";
        let nombreString = 0;
        for (let i = 0; i < this._dataThemeGrille.length; i++) {
            nombreString += parseInt(this._dataThemeGrille[i].montant);
        }
        totalAbonnement = String(nombreString);
        console.log(this._dataTheme);
        console.log(this._dataThemeGrille);
        console.log(totalAbonnement);
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €";
    }
    annulerAjoutTheme() {
        if (this.form.btnThemeAnnuler.click) {
            this.form.divSelectionThemes.hidden = true;
            this.form.btnThemeAjouter.disabled = false;
            this.form.btnThemeModifier.disabled = false;
            this.form.btnThemeSupprimer.disabled = false;
            //
            const liste = this.form.selectThemes;
            let noLigne = liste.options.length;
            while (noLigne > 0) {
                liste.remove(--noLigne);
            }
        }
    }
    validerAjoutTheme() {
        if (this.form.selectThemes.selectedIndex >= 0) {
            for (let i = 0; i < this._dataTousThemesGrille.length; i++) {
                if (this.form.selectThemes.value === this._dataTousThemesGrille[i].themeNum) {
                    this._cléTheme = this._dataTousThemesGrille[i].themeNum;
                }
            }
            const lesThemes = new LesThemes;
            let unTheme = lesThemes.byThemeNum(this.cléTheme);
            let versioPapierBool = "";
            if (this.form.chkVersionPapier.checked === true) {
                versioPapierBool = "1";
            }
            const leTheme = new UnThemeByAbonnement(unTheme, versioPapierBool);
            if (this.form.chkModifierTheme.checked === true) {
                const lesThemsParAbonNum = new LesThemesByAbonnement;
                let tableauStockage = lesThemsParAbonNum.toArray(this._dataStockageAjoutTheme);
                let conserveurIndex = 0;
                for (let i = 0; i < tableauStockage.length; i++) {
                    if (leTheme.unTheme.themeNum === tableauStockage[i].themeNum) {
                        conserveurIndex = 0;
                    }
                }
                this._dataStockageAjoutTheme[conserveurIndex] = leTheme;
                this.form.chkVersionPapier.checked = false;
            }
            else {
                this._dataStockageAjoutTheme[this._indexIncrementation] = leTheme;
                this._indexIncrementation++;
            }
            this.form.chkVersionPapier.checked = false;
            this.affiGrilleAjout();
            this.annulerAjoutTheme();
        }
    }
    verifierAjoutAbonnement() {
        if (this.form.edtTexteInvisible.value === "3") {
            this.form.edtTexteInvisible.value = "0";
            this.modificationAbonnement();
        }
        else {
            if (this.verifieurAjout() === false) {
                this.messageErreur();
            }
            else {
                this.ajouterClick();
            }
        }
    }
    verifieurAjout() {
        const nombreIdentification = parseInt(this.form.edtIdentificationAdh.value);
        const nombreAdherent = parseInt(this.form.edtNumAdh.value);
        const lesThemesByAbo = new LesThemesByAbonnement;
        if (this.form.edtIdentificationAdh.value === "" || isNaN(nombreIdentification) || this.verifieurDuplicationNumAbon() === true) {
            return false;
        }
        if (this.form.edtNumAdh.value === "" || isNaN(nombreAdherent) || this.verifieurExistenceNumAdh() === false) {
            return false;
        }
        if (this.form.dateNumDate.value === "") {
            return false;
        }
        if (lesThemesByAbo.getTotal(this._dataStockageAjoutTheme) === 0) {
            return false;
        }
        return true;
    }
    verifieurDuplicationNumAbon() {
        let dataVerifieur;
        let tousAbonnement = new LesAbonnements;
        dataVerifieur = [];
        dataVerifieur = tousAbonnement.listAll();
        for (let i = 0; i < dataVerifieur.length; i++) {
            if (this.form.edtIdentificationAdh.value === dataVerifieur[i].abon_num) {
                return true;
            }
        }
        return false;
    }
    verifieurExistenceNumAdh() {
        for (let i = 0; i < this._dataAdherent.length; i++) {
            if (this.form.edtNumAdh.value === this._dataAdherent[i].adhNum) {
                return true;
            }
        }
        return false;
    }
    messageErreur() {
        const lesThemesByAbo = new LesThemesByAbonnement;
        let erreurMsg = "Erreur : élément manquant \n";
        if (this.form.edtIdentificationAdh.value === "") {
            erreurMsg += "Le numéro d'abonnement n'a pas été renseigné. \n";
        }
        else if (this.verifieurDuplicationNumAbon() === true) {
            erreurMsg += "Le numéro d'abonnement existe déja. \n";
        }
        if (this.form.dateNumDate.value === "") {
            erreurMsg += "La date d'ajout de l'abonnement n'a pas été renseignée.\n";
        }
        if (this.form.edtNumAdh.value === "") {
            erreurMsg += "Le numéro d'adhésion de l'abonné n'est pas renseigné. \n";
        }
        else if (this.verifieurExistenceNumAdh() === false) {
            erreurMsg += "Le numéro d'adhésion n'existe pas. \n";
        }
        if (lesThemesByAbo.getTotal(this._dataStockageAjoutTheme) === 0) {
            erreurMsg += "Veuillez choisir un théme. \n";
        }
        //ajouter thème
        alert(erreurMsg);
    }
    retourOuAnnulerAbonnement() {
        this._dataStockageAjoutTheme = {};
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        if (this.form.edtTexteInvisible.value === "1") { //Si l'utilisateur à cliquer sur détail
            this.form.edtTexteInvisible.value = "0";
            this.viderChamps();
            return this.retourAfficherDetail();
        }
        else if (this.form.edtTexteInvisible.value === "2") { //Si l'utilisateur à clique sur ajout
            this.form.edtTexteInvisible.value = "0";
            this.viderChamps();
            return this.annulerAjoutAbonnement();
        }
        else if (this.form.edtTexteInvisible.value === "3") { //si l'utilisateur à cliquer sur modifier
            this.form.edtTexteInvisible.value = "0";
            this.viderChamps();
            return this.annulerModifierAbonnement();
        }
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
    annulerAjoutAbonnement() {
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
        this.form.tableTotalAbonnement.hidden = false;
    }
    annulerModifierAbonnement() {
        this.form.divPageAbonnement.hidden = true;
        this.form.divSelectionThemes.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
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
        this.form.divNombreTotal.innerHTML = "0.00 €";
    }
}
let vueTpSaeClass = new VueTpSae;
export { vueTpSaeClass };
//# sourceMappingURL=class_tp_sae.js.map