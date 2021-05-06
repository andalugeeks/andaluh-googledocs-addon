/**
 * Copyleft (c) 2021 Andalugeeks
 *
 * Authors:
 * - J. Félix Ontañón <felixonta@gmail.com>
 *
 */

/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */

// Inspired on the tutorial here: https://developers.google.com/workspace/add-ons/cats-quickstart
// and here: https://www.youtube.com/watch?v=Ma8nR7-erPM
function onHomepage(e) {

  // Generates the entry at add-ons menu
  onOpen(e);

  // And now for the home page card creation
  var findaddonText = CardService.newDecoratedText()
      .setTopLabel("¡Complemento cargado!")
      .setText("Encontrarás Andaluh para Google Docs en el menú Complementos (add-ons)")
      .setWrapText(true);

  var findaddonImage = CardService.newImage()
      .setImageUrl('https://drive.google.com/uc?export=download&id=11i0GuwBGaQRrKYLqXCykj7wze6YFLna4')
      .setAltText('Ir al Menu Complementos')

  var videotutoText = CardService.newDecoratedText()
      .setTopLabel("¿Necesitas más ayuda?")
      .setText("Mira este tutorial en vídeo.")
      .setWrapText(true);

  var videotutoImage = CardService.newImage()
      .setImageUrl('https://drive.google.com/uc?export=download&id=1vK0tTkaVrKlLkATp-9JM2g7JgZcxDfTI')
      .setAltText('Ver tutorial')
      .setOpenLink(CardService.newOpenLink()
      .setUrl('https://www.youtube.com/watch?v=L83zw6-Tzj4'));

  // Create a footer to be shown at the bottom.
  var footer = CardService.newFixedFooter()
      .setPrimaryButton(CardService.newTextButton()
      .setText('Más información')
      .setOpenLink(CardService.newOpenLink()
      .setUrl('https://andaluh.es/google-drive-andaluz')));

  // Assemble the widgets and return the card.
  var findSection = CardService.newCardSection()
      .addWidget(findaddonText)
      .addWidget(findaddonImage);

  var videotutoSection = CardService.newCardSection()
      .addWidget(videotutoText)
      .addWidget(videotutoImage);

  var card = CardService.newCardBuilder()
      .addCardAction(CardService.newCardAction()
        .setText('Transcriptor Online')
        .setOpenLink(CardService.newOpenLink()
        .setUrl('https://andaluh.es/transcriptor'))
      )
      .addCardAction(CardService.newCardAction()
        .setText('Teclado Andaluz')
        .setOpenLink(CardService.newOpenLink()
        .setUrl('https://andaluh.es/teclado-andaluz'))
      )
      .addCardAction(CardService.newCardAction()
        .setText('Acerca de AndaluGeeks')
        .setOpenLink(CardService.newOpenLink()
        .setUrl('https://andaluh.es'))
      )
      .addSection(findSection)
      .addSection(videotutoSection)
      .setFixedFooter(footer);

  return card.build();
}

// From here, the reference for this code was taken from the following tutorial
// https://github.com/googleworkspace/apps-script-samples/tree/master/docs/translate
// There's a pending task to convert this code into a full Google WorkSpace Add-On
// with a native CardService re-implementation

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Transcribir', 'showSidebar')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Andaluh para Google Drive');
  DocumentApp.getUi().showSidebar(ui);
}

/**
 * Gets the text the user has selected. If there is no selection,
 * this function displays an error message.
 *
 * @return {Array.<string>} The selected text.
 */
function getSelectedText() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  var text = [];
  if (selection) {
    var elements = selection.getSelectedElements();
    for (var i = 0; i < elements.length; ++i) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().asText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive();

        text.push(element.getText().substring(startIndex, endIndex + 1));
      } else {
        var element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip images and
        // other non-text elements.
        if (element.editAsText) {
          var elementText = element.asText().getText();
          // This check is necessary to exclude images, which return a blank
          // text element.
          if (elementText) {
            text.push(elementText);
          }
        }
      }
    }
  }
  if (!text.length) throw new Error('Selecciona algún texto, por favor.');
  return text;
}

/**
 * Gets the stored user preferences for the origin and destination languages,
 * if they exist.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @return {Object} The user's origin and destination language preferences, if
 *     they exist.
 */
function getPreferences() {
  var userProperties = PropertiesService.getUserProperties();
  return {
    vaf: userProperties.getProperty('vaf'),
    vvf: userProperties.getProperty('vvf')
  };
}

/**
 * Gets the user-selected text and translates it from the origin language to the
 * destination language. The languages are notated by their two-letter short
 * form. For example, English is 'en', and Spanish is 'es'. The origin language
 * may be specified as an empty string to indicate that Google Translate should
 * auto-detect the language.
 *
 * @param {string} origin The two-letter short form for the origin language.
 * @param {string} dest The two-letter short form for the destination language.
 * @param {boolean} savePrefs Whether to save the origin and destination
 *     language preferences.
 * @return {Object} Object containing the original text and the result of the
 *     translation.
 */
function getTextAndTranslation(vaf, vvf, savePrefs) {
  if (savePrefs) {
    PropertiesService.getUserProperties()
        .setProperty('vaf', vaf)
        .setProperty('vvf', vvf);
  }
  var text = getSelectedText().join('\n');
  return {
    text: text,
    translation: translateText(text, vaf, vvf)
  };
}

/**
 * Replaces the text of the current selection with the provided text, or
 * inserts text at the current cursor location. (There will always be either
 * a selection or a cursor.) If multiple elements are selected, only inserts the
 * translated text in the first element that can contain text and removes the
 * other elements.
 *
 * @param {string} newText The text with which to replace the current selection.
 */
function insertText(newText) {
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var replaced = false;
    var elements = selection.getSelectedElements();
    if (elements.length === 1 && elements[0].getElement().getType() ===
        DocumentApp.ElementType.INLINE_IMAGE) {
      throw new Error('No se puede insertar texto en una imagen.');
    }
    for (var i = 0; i < elements.length; ++i) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().asText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive();
        element.deleteText(startIndex, endIndex);
        if (!replaced) {
          element.insertText(startIndex, newText);
          replaced = true;
        } else {
          // This block handles a selection that ends with a partial element. We
          // want to copy this partial text to the previous element so we don't
          // have a line-break before the last partial.
          var parent = element.getParent();
          var remainingText = element.getText().substring(endIndex + 1);
          parent.getPreviousSibling().asText().appendText(remainingText);
          // We cannot remove the last paragraph of a doc. If this is the case,
          // just remove the text within the last paragraph instead.
          if (parent.getNextSibling()) {
            parent.removeFromParent();
          } else {
            element.removeFromParent();
          }
        }
      } else {
        var element = elements[i].getElement();
        if (!replaced && element.editAsText) {
          // Only translate elements that can be edited as text, removing other
          // elements.
          element.clear();
          element.asText().setText(newText);
          replaced = true;
        } else {
          // We cannot remove the last paragraph of a doc. If this is the case,
          // just clear the element.
          if (element.getNextSibling()) {
            element.removeFromParent();
          } else {
            element.clear();
          }
        }
      }
    }
  } else {
    var cursor = DocumentApp.getActiveDocument().getCursor();
    var surroundingText = cursor.getSurroundingText().getText();
    var surroundingTextOffset = cursor.getSurroundingTextOffset();

    // If the cursor follows or preceds a non-space character, insert a space
    // between the character and the translation. Otherwise, just insert the
    // translation.
    if (surroundingTextOffset > 0) {
      if (surroundingText.charAt(surroundingTextOffset - 1) != ' ') {
        newText = ' ' + newText;
      }
    }
    if (surroundingTextOffset < surroundingText.length) {
      if (surroundingText.charAt(surroundingTextOffset) != ' ') {
        newText += ' ';
      }
    }
    cursor.insertText(newText);
  }
}

/**
 * Given text, translate it from the origin language to the destination
 * language. The languages are notated by their two-letter short form. For
 * example, English is 'en', and Spanish is 'es'. The origin language may be
 * specified as an empty string to indicate that Google Translate should
 * auto-detect the language.
 *
 * @param {string} text text to translate.
 * @param {string} origin The two-letter short form for the origin language.
 * @param {string} dest The two-letter short form for the destination language.
 * @return {string} The result of the translation, or the original text if
 *     origin and dest languages are the same.
 */

var epa = new EPA();

function translateText(text, vaf, vvf) {
  return epa.transcript(text, vaf, vvf, true);
}