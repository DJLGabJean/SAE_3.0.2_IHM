import { vueTpSaeClass } from "./class_tp_sae";
vueTpSaeClass.init({
    tableInfoAbonnement: document.querySelector("[id=table_infoAbonnement]"),
    tableTotalAbonnement: document.querySelector("[id=table_totalAbonnement]"),
    btnAbonnementDetail: document.querySelector("[id=btn_abonnementDetail]"),
    btnAbonnementAjouter: document.querySelector("[id=btn_abonnementAjouter]"),
    btnAbonnementModifier: document.querySelector("[id=btn_abonnementModifier]"),
    btnAbonnementSupprimer: document.querySelector("[id=btn_abonnementSupprimer]"),
    btnThemeAjouter: document.querySelector("[id=btn_theme_ajouter]"),
    btnThemeModifier: document.querySelector("[id=btn_theme_modifier]"),
    btnThemeSupprimer: document.querySelector("[id=btn_theme_supprimer]"),
    btnThemeValider: document.querySelector("[id=btn_theme_valider]"),
    btnThemeAnnuler: document.querySelector("[id=btn_theme_annuler]"),
    btnAbonnementRetour: document.querySelector("[id=btn_abonnement_retour]"),
    btnAbonnementValider: document.querySelector("[id=btn_abonnement_valider]"),
    btnAbonnementAnnuler: document.querySelector("[id=btn_abonnement_annuler]"),
    edtIdentificationAdh: document.querySelector("[id=edt_identification_adh"),
    dateNumDate: document.querySelector("[id=date_num_date]"),
    edtNumAdh: document.querySelector("[id=edt_num_adh]"),
    edtTexteInvisible: document.querySelector("[id=edt_texte_invisible]"),
    textareaCommentaireAdh: document.querySelector("[id=textarea_commentaire_adh]"),
    divListeAbonnement: document.querySelector("[id=div_liste_abonnement]"),
    divPageAbonnement: document.querySelector("[id=div_page_abonnement]"),
    divAbonnementTitre: document.querySelector("[id=div_abonnement_titre]"),
    divInformationAdherent: document.querySelector("[id=div_informationAdherent]"),
    divInformationAbonnement: document.querySelector("[id=div_informationAbonnement]"),
    divNombreTotal: document.querySelector("[id=div_nombre_total]"),
    divSelectionThemes: document.querySelector("[id=div_selectionThemes]"),
    lblErreurIdendification: document.querySelector("[id=lbl_erreur_idendification]"),
    lblErreurAdh: document.querySelector("[id=lbl_erreur_ADH]"),
    lblErreurSelectionTheme: document.querySelector("[id=lbl_erreur_selectionTheme]"),
    lblErreurSelectThemes: document.querySelector("[id=lbl_erreur_select_themes]"),
    selectThemes: document.querySelector("[id=select_themes]"),
    chkVersionPapier: document.querySelector("[id=chk_versionPapier]"),
    chkModifierTheme: document.querySelector("[id=chk_modifierTheme]")
});
vueTpSaeClass.form.btnAbonnementDetail.addEventListener("click", function () { vueTpSaeClass.afficherDetail(); });
vueTpSaeClass.form.btnAbonnementModifier.addEventListener("click", function () { vueTpSaeClass.afficherModifier(); });
vueTpSaeClass.form.btnAbonnementAjouter.addEventListener("click", function () { vueTpSaeClass.ajouterAbonnement(); });
vueTpSaeClass.form.btnAbonnementSupprimer.addEventListener("click", function () { vueTpSaeClass.supprimerClick(); });
vueTpSaeClass.form.btnAbonnementRetour.addEventListener("click", function () { vueTpSaeClass.retourOuAnnulerAbonnement(); });
vueTpSaeClass.form.btnAbonnementAnnuler.addEventListener("click", function () { vueTpSaeClass.retourOuAnnulerAbonnement(); });
vueTpSaeClass.form.btnAbonnementValider.addEventListener("click", function () { vueTpSaeClass.verifierAjoutAbonnement(); });
vueTpSaeClass.form.btnThemeAjouter.addEventListener("click", function () { vueTpSaeClass.ajouterDepuisTheme(); });
vueTpSaeClass.form.btnThemeModifier.addEventListener("click", function () { vueTpSaeClass.modifierTheme(); });
vueTpSaeClass.form.btnThemeSupprimer.addEventListener("click", function () { vueTpSaeClass.supprimerTheme(); });
vueTpSaeClass.form.btnThemeAnnuler.addEventListener("click", function () { vueTpSaeClass.annulerAjoutTheme(); });
vueTpSaeClass.form.btnThemeValider.addEventListener("click", function () { vueTpSaeClass.validerAjoutTheme(); });
vueTpSaeClass.form.edtNumAdh.addEventListener("change", function () { vueTpSaeClass.refreshNuméroAdhérent(); });
//# sourceMappingURL=tp_sae.js.map