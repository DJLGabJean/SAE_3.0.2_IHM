//TODO les labels d'erreurs: numéro d'adhésion et verifier si un théme est choisis
import { LesAbonnements } from "../modele/data_abonnement";
import { UnAbonnement } from "../modele/data_abonnement";
import { UnTheme } from "../modele/data_theme";
import { LesThemes } from "../modele/data_theme";
import { LesThemesByAbonnement } from "../modele/data_theme";
import { UnThemeByAbonnement } from "../modele/data_theme";
import { LesAdherents } from "../modele/data_adherent";
import { LesCsps } from "../modele/data_csp";
var VueTpSae = /** @class */ (function () {
    function VueTpSae() {
    }
    VueTpSae.prototype.init = function (form) {
        this._form = form;
        this._grille = new GrilleTabulaire;
        this._grilleTotalAbonnement = new GrilleTabulaire;
        this._data = [];
        this._dataTheme = {};
        this._dataStockageAjoutTheme = {};
        this._dataThemeGrille = [];
        var lesThemes = new LesThemes();
        this._dataTousThemes = lesThemes.all();
        this._dataTousThemesGrille = lesThemes.toArray(this._dataTousThemes);
        var lesAbonnements = new LesAbonnements;
        this._data = lesAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
        this._dataAdherent = [];
        var tousAdherent = new LesAdherents;
        this._stockageTousLesAdherents = tousAdherent.all();
        this._dataAdherent = tousAdherent.toArray(this._stockageTousLesAdherents);
        this.form.divPageAbonnement.hidden = true;
        this.form.edtTexteInvisible.value = "0";
        this.form.edtTexteInvisible.hidden = true;
        this.form.chkModifierTheme.hidden = true;
        this.form.divNombreTotal.innerHTML = "0.00 €";
    };
    Object.defineProperty(VueTpSae.prototype, "form", {
        get: function () { return this._form; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "data", {
        get: function () { return this._data; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "dataTheme", {
        get: function () { return this._dataTheme; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "dataStockageAjoutTheme", {
        get: function () { return this._dataStockageAjoutTheme; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "dataThemeGrille", {
        get: function () { return this._dataThemeGrille; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "dataAdherent", {
        get: function () { return this._dataAdherent; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "dataTousThemes", {
        get: function () { return this._dataTousThemes; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "dataTousThemesGrille", {
        get: function () { return this._dataTousThemesGrille; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "stockageTousLesAdherents", {
        get: function () { return this._stockageTousLesAdherents; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "grille", {
        get: function () { return this._grille; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "grilleAbonnement", {
        get: function () { return this._grilleTotalAbonnement; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(VueTpSae.prototype, "cl\u00E9Theme", {
        get: function () { return this._cléTheme; },
        enumerable: false,
        configurable: true
    });
    ;
    VueTpSae.prototype.supprimerClick = function () {
        if (this._grille.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression salle", "Confirmez-vous la suppression de cette abonnement ? ", vueTpSaeClass, "supprimerAbonnement()");
        }
    };
    VueTpSae.prototype.supprimerAbonnement = function () {
        var lesAbonnements = new LesAbonnements;
        var lesThemesByAbo = new LesThemesByAbonnement;
        lesAbonnements["delete"](this.grille.getIdSelect());
        lesThemesByAbo["delete"](this.grille.getIdSelect());
        this._grille.delSelectLine();
    };
    VueTpSae.prototype.affiGrille = function (idGrille) {
        var lesThemesParAbo = new LesThemesByAbonnement;
        var idAbonNum = lesThemesParAbo.byAbonNum(idGrille);
        this._dataThemeGrille = lesThemesParAbo.toArray(idAbonNum);
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._dataThemeGrille, 'themeNum', false);
    };
    VueTpSae.prototype.affiGrilleAjout = function () {
        this.form.tableTotalAbonnement.hidden = false;
        var lesThemesParAbo = new LesThemesByAbonnement;
        var totalAbonnement = lesThemesParAbo.getTotal(this._dataStockageAjoutTheme);
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €";
        this._dataThemeGrille = lesThemesParAbo.toArray(this._dataStockageAjoutTheme);
        this._grilleTotalAbonnement = APIpageWeb.showArray(this.form.tableTotalAbonnement.id, this._dataThemeGrille, 'themeNum', false);
    };
    VueTpSae.prototype.recupererInfoAbonn = function (idGrille) {
        var lesAbonnements = new LesAbonnements();
        var abonAffich = lesAbonnements.byAbonNum(idGrille);
        this.form.edtIdentificationAdh.value = abonAffich.abonNum;
        this.form.edtNumAdh.value = abonAffich.adhNum;
        this.form.dateNumDate.value = abonAffich.abonDate;
        this.form.textareaCommentaireAdh.value = abonAffich.abonComment;
        //
        var divInfoAbonnement = "";
        var lesAdherents = new LesAdherents;
        var unAdherents = lesAdherents.byAdhNum(abonAffich.adhNum);
        divInfoAbonnement += "Adhérent <br>";
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
        var lesCsp = new LesCsps;
        var idCsp = lesCsp.byCspNum(unAdherents.cspNum);
        var divInfoCSP = "";
        divInfoCSP += "Catégories SocioProfessionelle <br>";
        divInfoCSP += idCsp.cspLib;
        this.form.divInformationAbonnement.innerHTML = divInfoCSP;
        //
        var lesThemes = new LesThemesByAbonnement();
        this._dataTheme = lesThemes.byAbonNum(idGrille);
        var totalAbonnement = lesThemes.getTotal(this._dataTheme);
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €";
    };
    VueTpSae.prototype.afficherDetail = function () {
        if (this._grille.getIdSelect() !== "") {
            var grilleId = this.grille.getIdSelect();
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
    };
    VueTpSae.prototype.ajouterAbonnement = function () {
        var date = new Date();
        this.form.dateNumDate.valueAsDate = date;
        this.form.edtTexteInvisible.value = "2";
        this.form.divListeAbonnement.hidden = true;
        this.form.divPageAbonnement.hidden = false;
        this.form.divSelectionThemes.hidden = true;
        this.form.btnAbonnementRetour.hidden = true;
        this.form.tableTotalAbonnement.hidden = true;
        this.form.edtIdentificationAdh.disabled = true;
        this.form.divAbonnementTitre.innerHTML = "Ajout d'un nouvel abonnement";
        this.form.lblErreurAdh.innerHTML = "Veuillez saisir le numéro d'adhérent";
        this.form.lblErreurSelectionTheme.innerHTML = "Veuillez selectionner un thème";
        //
        var lesAbonnements = new LesAbonnements();
        var numéroAbonnement = lesAbonnements.getNouveauNumero();
        this.form.edtIdentificationAdh.value = numéroAbonnement;
    };
    VueTpSae.prototype.afficherModifier = function () {
        if (this._grille.getIdSelect() !== "") {
            var lesThemesByAbo = new LesThemesByAbonnement;
            var grilleId = this.grille.getIdSelect();
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
            this.form.edtNumAdh.disabled = true; //Check si les boutons désactiver sont nécessaires
            this.form.divAbonnementTitre.innerHTML = "Modification d'un abonnement"; //Pour afficher le bon Titre
        }
    };
    VueTpSae.prototype.refreshNuméroAdhérent = function () {
        if (this.verifieurExistenceNumAdh() === true) {
            var indiceAdhérent = 0;
            for (var i = 0; i < this._dataAdherent.length; i++) {
                if (this.form.edtNumAdh.value === this._dataAdherent[i].adhNum) {
                    indiceAdhérent = i;
                }
            }
            var divInfoAbonnement = "";
            divInfoAbonnement += "Adhérent <br>";
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
            var lesCsp = new LesCsps;
            var idCsp = lesCsp.byCspNum(this._dataAdherent[indiceAdhérent].cspNum);
            var divInfoCSP = "";
            divInfoCSP += "Catégories SocioProfessionelle <br>";
            divInfoCSP += idCsp.cspLib;
            this.form.divInformationAbonnement.innerHTML = divInfoCSP;
        }
        else if (this.verifieurExistenceNumAdh() === false) {
            this.form.divInformationAdherent.innerHTML = "Adhérent";
            this.form.divInformationAbonnement.innerHTML = "Catégories SocioProfessionelle";
        }
    };
    VueTpSae.prototype.ajouterDepuisTheme = function () {
        this.form.divSelectionThemes.hidden = false;
        this.form.btnThemeAjouter.disabled = true;
        this.form.btnThemeModifier.disabled = true;
        this.form.btnThemeSupprimer.disabled = true;
        this.afficherSelectionTheme();
    };
    VueTpSae.prototype.ajouterClick = function () {
        this.form.edtTexteInvisible.value = "0";
        var abonnement = new UnAbonnement;
        var desAbonnements = new LesAbonnements;
        abonnement.abonNum = this.form.edtIdentificationAdh.value;
        abonnement.abonDate = this.form.dateNumDate.value;
        abonnement.abonComment = this.form.textareaCommentaireAdh.value;
        abonnement.adhNum = this.form.edtNumAdh.value;
        desAbonnements.insert(abonnement);
        //
        var lesThemesByAbon = new LesThemesByAbonnement;
        console.log(lesThemesByAbon.insert(this.form.edtIdentificationAdh.value, this._dataStockageAjoutTheme));
        lesThemesByAbon.insert(this.form.edtIdentificationAdh.value, this._dataStockageAjoutTheme);
        this._dataStockageAjoutTheme = {};
        this.form.divNombreTotal.innerHTML = "0.00 €";
        //
        this.form.lblErreurAdh.innerHTML = "";
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this._data = desAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
        this.viderChamps();
    };
    VueTpSae.prototype.modifierTheme = function () {
        if (this.grilleAbonnement.getIdSelect() !== "") {
            this.form.chkModifierTheme.checked = true;
            this.form.divSelectionThemes.hidden = false;
            this.form.btnThemeAjouter.disabled = true;
            this.form.btnThemeModifier.disabled = true;
            this.form.btnThemeSupprimer.disabled = true;
            this.afficherModificationTheme();
        }
    };
    VueTpSae.prototype.supprimerTheme = function () {
        if (this.grilleAbonnement.getIdSelect() !== "") {
            APIpageWeb.confirmation("Suppression Theme", "Confirmez-vous la suppression de ce thème ? ", vueTpSaeClass, "suppressionTheme()");
        }
    };
    VueTpSae.prototype.labelErreurIdentifiant = function () {
        var message = "";
        if (this.form.edtIdentificationAdh.value === "") {
            message += "Veuillez saisir un numéro d'abonnement <br>";
        }
        if (this.form.dateNumDate.value === "") {
            message += "Veuillez saisir une date";
        }
        this.form.lblErreurIdendification.innerHTML = message;
    };
    VueTpSae.prototype.labelErreurNumAdh = function () {
        var message = "";
        if (this.form.edtNumAdh.value === "") {
            message += "Veuillez saisir le numéro d'adhérent";
        }
        this.form.lblErreurAdh.innerHTML = message;
    };
    VueTpSae.prototype.labelErreurThemeTotal = function () {
        var message = "";
        var lesThemesByAbo = new LesThemesByAbonnement();
        if (lesThemesByAbo.getTotal(this._dataStockageAjoutTheme) === 0) {
            message += "Veuillez sélectioner au moins un thème dans la liste !";
        }
        this.form.lblErreurSelectionTheme.innerHTML = message;
    };
    VueTpSae.prototype.labelErreurSelectTheme = function () {
        var message = "";
        if (this.form.selectThemes.selectedIndex >= 0) {
            this.form.lblErreurSelectThemes.innerHTML = message;
        }
        else
            this.form.lblErreurSelectThemes.innerHTML = "Veuillez choisir au moins un thème de la liste !";
    };
    VueTpSae.prototype.afficherSelectionTheme = function () {
        var lesThemes = new LesThemes;
        var lesThemesByAbo = new LesThemesByAbonnement;
        this.form.lblErreurSelectThemes.innerHTML = "Veuillez choisir au moins un thème de la liste !";
        var stockageAbonnementActuel = lesThemesByAbo.toArray(this._dataStockageAjoutTheme);
        var data = {};
        data = lesThemes.all();
        var dataArray = lesThemes.toArray(data);
        if (stockageAbonnementActuel.length === 0) {
            for (var i in dataArray) {
                var item = dataArray[i];
                var id = item.themeNum;
                this.form.selectThemes.options.add(new Option(item.themeLib, id));
            }
        }
        else {
            for (var i = 0, j = 0; i < dataArray.length; i++) {
                var item = dataArray[i];
                var id = item.themeNum;
                if (stockageAbonnementActuel[j].themeNum != id) {
                    // Ajout
                    this.form.selectThemes.options.add(new Option(item.themeLib, id));
                }
                if (j === stockageAbonnementActuel.length - 1) {
                    // Rien
                }
                else if (stockageAbonnementActuel[j].themeNum === id) {
                    // Incrémentation
                    j++;
                }
            }
        }
    };
    VueTpSae.prototype.afficherModificationTheme = function () {
        var grilleId = this.grilleAbonnement.getIdSelect();
        var lesThemes = new LesThemes;
        var dataUnTheme = new UnTheme;
        dataUnTheme = lesThemes.byThemeNum(grilleId);
        var dataArray;
        dataArray = dataUnTheme.toArray();
        this.form.selectThemes.options.add(new Option(dataArray.themeLib, dataArray.themeNum));
    };
    VueTpSae.prototype.modificationAbonnement = function () {
        var lesThemesAbo = new LesThemesByAbonnement;
        var lesAbonnements = new LesAbonnements();
        var unAbonnement = lesAbonnements.byAbonNum(this.form.edtIdentificationAdh.value);
        unAbonnement.abonComment = this.form.textareaCommentaireAdh.value;
        lesAbonnements.update(unAbonnement);
        lesThemesAbo["delete"](this.form.edtIdentificationAdh.value);
        lesThemesAbo.insert(this.form.edtIdentificationAdh.value, this._dataStockageAjoutTheme);
        this.form.divPageAbonnement.hidden = true;
        this.form.divSelectionThemes.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.dateNumDate.disabled = false;
        this.form.edtNumAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
        this._data = lesAbonnements.listAll();
        this._grille = APIpageWeb.showArray(this.form.tableInfoAbonnement.id, this.data, 'abon_num', true);
    };
    VueTpSae.prototype.suppressionTheme = function () {
        delete this._dataStockageAjoutTheme[Number(this.grilleAbonnement.getIdSelect())];
        this.grilleAbonnement.delSelectLine();
        //
        var totalAbonnement = "";
        var nombreString = 0;
        for (var i = 0; i < this._dataThemeGrille.length; i++) {
            nombreString += parseInt(this._dataThemeGrille[i].montant);
        }
        totalAbonnement = String(nombreString);
        this.form.divNombreTotal.innerHTML = String(totalAbonnement) + ",00 €";
    };
    VueTpSae.prototype.annulerAjoutTheme = function () {
        if (this.form.btnThemeAnnuler.click) {
            this.form.divSelectionThemes.hidden = true;
            this.form.btnThemeAjouter.disabled = false;
            this.form.btnThemeModifier.disabled = false;
            this.form.btnThemeSupprimer.disabled = false;
            //
            var liste = this.form.selectThemes;
            var noLigne = liste.options.length;
            while (noLigne > 0) {
                liste.remove(--noLigne);
            }
        }
    };
    VueTpSae.prototype.validerAjoutTheme = function () {
        if (this.form.selectThemes.selectedIndex >= 0) {
            for (var i = 0; i < this._dataTousThemesGrille.length; i++) {
                if (this.form.selectThemes.value === this._dataTousThemesGrille[i].themeNum) {
                    this._cléTheme = this._dataTousThemesGrille[i].themeNum;
                }
            }
            var lesThemes = new LesThemes;
            var unTheme = lesThemes.byThemeNum(this.cléTheme);
            var versioPapierBool = "";
            var leTheme = new UnThemeByAbonnement(unTheme);
            if (this.form.chkVersionPapier.checked === true) {
                versioPapierBool = "1";
                leTheme.envoiPapier = versioPapierBool;
                leTheme.montant = (Number(leTheme.montant) * 2).toFixed(2);
            }
            else {
                versioPapierBool = "0";
                leTheme.envoiPapier = versioPapierBool;
            }
            if (this.form.chkModifierTheme.checked === true) {
                var lesThemsParAbonNum = new LesThemesByAbonnement;
                var tableauStockage = lesThemsParAbonNum.toArray(this._dataStockageAjoutTheme);
                var conserveurIndex = 0;
                for (var i = 0; i < tableauStockage.length; i++) {
                    if (leTheme.unTheme.themeNum === tableauStockage[i].themeNum) {
                        conserveurIndex = i;
                    }
                }
                this._dataStockageAjoutTheme[tableauStockage[conserveurIndex].themeNum] = leTheme;
                this.form.chkVersionPapier.checked = false;
            }
            else {
                this._dataStockageAjoutTheme[this._cléTheme] = leTheme;
            }
            this.form.chkModifierTheme.checked = false;
            this.form.chkVersionPapier.checked = false;
            this.affiGrilleAjout();
            this.annulerAjoutTheme();
        }
    };
    VueTpSae.prototype.verifierAjoutAbonnement = function () {
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
    };
    VueTpSae.prototype.verifieurAjout = function () {
        var nombreIdentification = parseInt(this.form.edtIdentificationAdh.value);
        var nombreAdherent = parseInt(this.form.edtNumAdh.value);
        var lesThemesByAbo = new LesThemesByAbonnement;
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
    };
    VueTpSae.prototype.verifieurDuplicationNumAbon = function () {
        var dataVerifieur;
        var tousAbonnement = new LesAbonnements;
        dataVerifieur = [];
        dataVerifieur = tousAbonnement.listAll();
        for (var i = 0; i < dataVerifieur.length; i++) {
            if (this.form.edtIdentificationAdh.value === dataVerifieur[i].abon_num) {
                return true;
            }
        }
        return false;
    };
    VueTpSae.prototype.verifieurExistenceNumAdh = function () {
        for (var i = 0; i < this._dataAdherent.length; i++) {
            if (this.form.edtNumAdh.value === this._dataAdherent[i].adhNum) {
                return true;
            }
        }
        return false;
    };
    VueTpSae.prototype.messageErreur = function () {
        var lesThemesByAbo = new LesThemesByAbonnement;
        var erreurMsg = "Erreur : élément manquant \n";
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
            erreurMsg += "Veuillez choisir un thème. \n";
        }
        //ajouter thème
        alert(erreurMsg);
    };
    VueTpSae.prototype.retourOuAnnulerAbonnement = function () {
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
        this.form.dateNumDate.disabled = false;
        this.form.edtNumAdh.disabled = false;
        this.form.textareaCommentaireAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
    };
    VueTpSae.prototype.annulerAjoutAbonnement = function () {
        this.form.lblErreurAdh.innerHTML = "";
        this.form.lblErreurSelectionTheme.innerHTML = "";
        this.form.divPageAbonnement.hidden = true;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnThemeAjouter.disabled = false;
        this.form.btnThemeModifier.disabled = false;
        this.form.btnThemeSupprimer.disabled = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
        this.form.tableTotalAbonnement.hidden = false;
    };
    VueTpSae.prototype.annulerModifierAbonnement = function () {
        this.form.divPageAbonnement.hidden = true;
        this.form.divSelectionThemes.hidden = false;
        this.form.divListeAbonnement.hidden = false;
        this.form.btnAbonnementRetour.hidden = false;
        this.form.edtIdentificationAdh.disabled = false;
        this.form.dateNumDate.disabled = false;
        this.form.edtNumAdh.disabled = false;
        this.form.textareaCommentaireAdh.disabled = false;
        this.form.divAbonnementTitre.innerHTML = "";
    };
    VueTpSae.prototype.viderChamps = function () {
        this.form.edtIdentificationAdh.value = "";
        this.form.edtNumAdh.value = "";
        this.form.dateNumDate.value = "";
        this.form.textareaCommentaireAdh.value = "";
        this.form.divInformationAbonnement.innerHTML = "";
        this.form.divInformationAdherent.innerHTML = "";
        this.form.divNombreTotal.innerHTML = "0.00 €";
    };
    return VueTpSae;
}());
var vueTpSaeClass = new VueTpSae;
export { vueTpSaeClass };
//# sourceMappingURL=class_tp_sae.js.map