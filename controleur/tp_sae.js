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
    chkMiniAlbum: document.querySelector("[id=chk_miniAlbum]"),
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
});
vueTpSaeClass.form.btnAbonnementDetail.addEventListener("click", function () { vueTpSaeClass.afficherDetail(); });
vueTpSaeClass.form.btnAbonnementRetour.addEventListener("click", function () { vueTpSaeClass.retourAfficherAbonnement(); });
vueTpSaeClass.form.btnAbonnementAjouter.addEventListener("click", function () { vueTpSaeClass.ajouterAbonnement(); });
vueTpSaeClass.form.btnAbonnementValider.addEventListener("click", function () { vueTpSaeClass.ajouterClick(); });
vueTpSaeClass.form.btnAbonnementSupprimer.addEventListener("click", function () { vueTpSaeClass.supprimerClick(); });
vueTpSaeClass.form.btnAbonnementValider.addEventListener("click", function () { vueTpSaeClass.verifierAjoutAbonnement(); });
vueTpSaeClass.form.btnThemeAjouter.addEventListener("click", function () { vueTpSaeClass.afficherTheme(); });
vueTpSaeClass.form.btnThemeModifier.addEventListener("click", function () { vueTpSaeClass.afficherTheme(); }); //TODO Peut-être à changer 
vueTpSaeClass.form.btnAbonnementAnnuler.addEventListener("click", function () { vueTpSaeClass.annulerAjoutAbonnement(); });
vueTpSaeClass.form.btnThemeAnnuler.addEventListener("click", function () { vueTpSaeClass.annulerAjoutTheme(); });
//# sourceMappingURL=tp_sae.js.map