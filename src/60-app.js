/* ============================================================
   LANGUAGE
   English is the source text. Other languages are looked up by the
   trimmed English string, so anything missing from the dictionary stays
   in English. Each row is [es, fr, de, pt-BR, it].
   ============================================================ */
const I18N_LANGS = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'it', name: 'Italiano' },
];
const I18N_COL = { es: 0, fr: 1, de: 2, 'pt-BR': 3, it: 4 };
const I18N_DICT = {
  "Donate": ["Donar", "Faire un don", "Spenden", "Doar", "Dona"],
  "Donate on Venmo": ["Donar por Venmo", "Faire un don sur Venmo", "Über Venmo spenden", "Doar pelo Venmo", "Dona su Venmo"],
  "Donate on Venmo (opens in a new tab)": ["Donar por Venmo (se abre en una pestaña nueva)", "Faire un don sur Venmo (s’ouvre dans un nouvel onglet)", "Über Venmo spenden (öffnet in einem neuen Tab)", "Doar pelo Venmo (abre em uma nova aba)", "Dona su Venmo (si apre in una nuova scheda)"],
  "Dawn Patrol is free to use.": ["Dawn Patrol es gratis.", "Dawn Patrol est gratuit.", "Dawn Patrol ist kostenlos.", "O Dawn Patrol é gratuito.", "Dawn Patrol è gratuito."],
  "Dawn Patrol is free to use. Donations help fund future development.": ["Dawn Patrol es gratis. Las donaciones ayudan a financiar el desarrollo futuro.", "Dawn Patrol est gratuit. Les dons aident à financer le développement futur.", "Dawn Patrol ist kostenlos. Spenden helfen, die künftige Entwicklung zu finanzieren.", "O Dawn Patrol é gratuito. As doações ajudam a financiar o desenvolvimento futuro.", "Dawn Patrol è gratuito. Le donazioni aiutano a finanziare lo sviluppo futuro."],
  "Support Dawn Patrol": ["Apoya a Dawn Patrol", "Soutenir Dawn Patrol", "Dawn Patrol unterstützen", "Apoie o Dawn Patrol", "Sostieni Dawn Patrol"],
  "Support development on Venmo": ["Apoya el desarrollo con Venmo", "Soutenir le développement sur Venmo", "Die Entwicklung über Venmo unterstützen", "Apoie o desenvolvimento pelo Venmo", "Sostieni lo sviluppo con Venmo"],
  "Remove": ["Quitar", "Supprimer", "Entfernen", "Remover", "Rimuovi"],
  "Select spots to merge": ["Seleccionar spots para combinar", "Sélectionner des spots à fusionner", "Spots zum Zusammenführen auswählen", "Selecionar spots para mesclar", "Seleziona spot da unire"],
  "Tick two or more spots that are the same place, then merge them.": ["Marca dos o más spots del mismo lugar y luego combínalos.", "Cochez deux spots ou plus situés au même endroit, puis fusionnez-les.", "Markiere zwei oder mehr Spots am selben Ort und führe sie dann zusammen.", "Marque dois ou mais spots do mesmo lugar e depois mescle-os.", "Seleziona due o più spot nello stesso punto, poi uniscili."],
  "Merge": ["Combinar", "Fusionner", "Zusammenführen", "Mesclar", "Unisci"],
  "Remove this spot?": ["¿Quitar este spot?", "Supprimer ce spot ?", "Diesen Spot entfernen?", "Remover este spot?", "Rimuovere questo spot?"],
  "This removes the spot from this device. You can undo for a few seconds.": ["Esto quita el spot de este dispositivo. Puedes deshacerlo durante unos segundos.", "Cela supprime le spot de cet appareil. Vous pouvez annuler pendant quelques secondes.", "Dadurch wird der Spot von diesem Gerät entfernt. Du kannst dies einige Sekunden lang rückgängig machen.", "Isso remove o spot deste dispositivo. Você pode desfazer por alguns segundos.", "Questo rimuove lo spot da questo dispositivo. Puoi annullare per alcuni secondi."],
  "Merge spots": ["Combinar spots", "Fusionner les spots", "Spots zusammenführen", "Mesclar spots", "Unisci spot"],
  "Pick which spot each detail comes from.": ["Elige de qué spot viene cada dato.", "Choisissez le spot d’origine de chaque élément.", "Wähle für jedes Detail den Spot, aus dem es stammt.", "Escolha de qual spot vem cada detalhe.", "Scegli da quale spot viene ogni dettaglio."],
  "Name": ["Nombre", "Nom", "Name", "Nome", "Nome"],
  "Location": ["Ubicación", "Emplacement", "Standort", "Localização", "Posizione"],
  "Beach direction": ["Dirección de la playa", "Orientation de la plage", "Strandausrichtung", "Direção da praia", "Orientamento della spiaggia"],
  "Average of the selected spots": ["Promedio de los spots seleccionados", "Moyenne des spots sélectionnés", "Durchschnitt der ausgewählten Spots", "Média dos spots selecionados", "Media degli spot selezionati"],
  "Notes from all the selected spots are combined. The other spots are removed.": ["Las notas de todos los spots seleccionados se combinan. Los demás spots se quitan.", "Les notes de tous les spots sélectionnés sont combinées. Les autres spots sont supprimés.", "Die Notizen aller ausgewählten Spots werden zusammengeführt. Die anderen Spots werden entfernt.", "As notas de todos os spots selecionados são combinadas. Os outros spots são removidos.", "Le note di tutti gli spot selezionati vengono unite. Gli altri spot vengono rimossi."],
  "Default break depth": ["Profundidad de rompiente predeterminada", "Profondeur de déferlement par défaut", "Standard-Brechtiefe", "Profundidade de arrebentação padrão", "Profondità di frangente predefinita"],
  'Menu': ['Menú', 'Menu', 'Menü', 'Menu', 'Menu'],
  'Close': ['Cerrar', 'Fermer', 'Schließen', 'Fechar', 'Chiudi'],
  'Close help': ['Cerrar ayuda', 'Fermer l\'aide', 'Hilfe schließen', 'Fechar ajuda', 'Chiudi aiuto'],
  'Cancel': ['Cancelar', 'Annuler', 'Abbrechen', 'Cancelar', 'Annulla'],
  'Done': ['Listo', 'Terminé', 'Fertig', 'Concluído', 'Fatto'],
  'Save name': ['Guardar nombre', 'Enregistrer le nom', 'Name speichern', 'Salvar nome', 'Salva nome'],
  'Settings': ['Ajustes', 'Réglages', 'Einstellungen', 'Configurações', 'Impostazioni'],
  'Settings and offline': ['Ajustes y sin conexión', 'Réglages et hors ligne', 'Einstellungen und offline', 'Configurações e offline', 'Impostazioni e offline'],
  'Home': ['Inicio', 'Accueil', 'Start', 'Início', 'Home'],
  'Map': ['Mapa', 'Carte', 'Karte', 'Mapa', 'Mappa'],
  'Map layers': ['Capas del mapa', 'Couches de la carte', 'Kartenebenen', 'Camadas do mapa', 'Livelli della mappa'],
  'Map tools': ['Herramientas del mapa', 'Outils de la carte', 'Kartenwerkzeuge', 'Ferramentas do mapa', 'Strumenti della mappa'],
  'Map style': ['Estilo del mapa', 'Style de carte', 'Kartenstil', 'Estilo do mapa', 'Stile della mappa'],
  'Map. Arrow keys pan. Plus and minus zoom.': ['Mapa. Las flechas desplazan el mapa. Más y menos amplían o reducen.', 'Carte. Les flèches déplacent la carte. Plus et moins zooment.', 'Karte. Pfeiltasten verschieben. Plus und Minus zoomen.', 'Mapa. As setas movem o mapa. Mais e menos ampliam e reduzem.', 'Mappa. Le frecce spostano la mappa. Più e meno ingrandiscono e riducono.'],
  'Zoom in': ['Acercar', 'Zoom avant', 'Vergrößern', 'Aproximar', 'Zoom avanti'],
  'Zoom out': ['Alejar', 'Zoom arrière', 'Verkleinern', 'Afastar', 'Zoom indietro'],
  'Show map': ['Mostrar mapa', 'Afficher la carte', 'Karte anzeigen', 'Mostrar mapa', 'Mostra mappa'],
  'Hide map': ['Ocultar mapa', 'Masquer la carte', 'Karte ausblenden', 'Ocultar mapa', 'Nascondi mappa'],
  'Refresh': ['Actualizar', 'Actualiser', 'Aktualisieren', 'Atualizar', 'Aggiorna'],
  'Open': ['Abrir', 'Ouvrir', 'Öffnen', 'Abrir', 'Apri'],
  'Share': ['Compartir', 'Partager', 'Teilen', 'Compartilhar', 'Condividi'],
  'Share…': ['Compartir…', 'Partager…', 'Teilen…', 'Compartilhar…', 'Condividi…'],
  'Copy link': ['Copiar enlace', 'Copier le lien', 'Link kopieren', 'Copiar link', 'Copia link'],
  'Copy text': ['Copiar texto', 'Copier le texte', 'Text kopieren', 'Copiar texto', 'Copia testo'],
  'Link': ['Enlace', 'Lien', 'Link', 'Link', 'Link'],
  'Find': ['Buscar', 'Rechercher', 'Suchen', 'Buscar', 'Cerca'],
  'Search': ['Buscar', 'Rechercher', 'Suchen', 'Pesquisar', 'Cerca'],
  'Search a beach or town': ['Busca una playa o un pueblo', 'Chercher une plage ou une ville', 'Strand oder Ort suchen', 'Busque uma praia ou cidade', 'Cerca una spiaggia o una città'],
  'Search the help': ['Buscar en la ayuda', 'Rechercher dans l\'aide', 'In der Hilfe suchen', 'Pesquisar na ajuda', 'Cerca nell\'aiuto'],
  'Find a town': ['Buscar un pueblo', 'Trouver une ville', 'Ort finden', 'Encontrar uma cidade', 'Trova una città'],
  'Help': ['Ayuda', 'Aide', 'Hilfe', 'Ajuda', 'Aiuto'],
  'Help and FAQ': ['Ayuda y preguntas frecuentes', 'Aide et FAQ', 'Hilfe und FAQ', 'Ajuda e perguntas frequentes', 'Aiuto e FAQ'],
  'Getting started': ['Primeros pasos', 'Premiers pas', 'Erste Schritte', 'Primeiros passos', 'Primi passi'],
  'Documentation': ['Documentación', 'Documentation', 'Dokumentation', 'Documentação', 'Documentazione'],
  'Source code': ['Código fuente', 'Code source', 'Quellcode', 'Código-fonte', 'Codice sorgente'],
  'Source files': ['Archivos fuente', 'Fichiers source', 'Quelldateien', 'Arquivos-fonte', 'File sorgente'],
  'Terms': ['Términos', 'Conditions', 'Nutzungsbedingungen', 'Termos', 'Termini'],
  'Terms of Service': ['Condiciones del servicio', 'Conditions d\'utilisation', 'Nutzungsbedingungen', 'Termos de Serviço', 'Termini di servizio'],
  'Privacy': ['Privacidad', 'Confidentialité', 'Datenschutz', 'Privacidade', 'Privacy'],
  'Privacy Policy': ['Política de privacidad', 'Politique de confidentialité', 'Datenschutzerklärung', 'Política de Privacidade', 'Informativa sulla privacy'],
  'Legal': ['Legal', 'Mentions légales', 'Rechtliches', 'Jurídico', 'Note legali'],
  'Accessibility': ['Accesibilidad', 'Accessibilité', 'Barrierefreiheit', 'Acessibilidade', 'Accessibilità'],
  'Data and trust': ['Datos y confianza', 'Données et confiance', 'Daten und Vertrauen', 'Dados e confiança', 'Dati e fiducia'],
  'Dark mode': ['Modo oscuro', 'Mode sombre', 'Dunkelmodus', 'Modo escuro', 'Modalità scura'],
  'Display': ['Pantalla', 'Affichage', 'Anzeige', 'Exibição', 'Schermo'],
  'Units': ['Unidades', 'Unités', 'Einheiten', 'Unidades', 'Unità'],
  'Language': ['Idioma', 'Langue', 'Sprache', 'Idioma', 'Lingua'],
  'Feet, mph, °F': ['Pies, mph, °F', 'Pieds, mph, °F', 'Fuß, mph, °F', 'Pés, mph, °F', 'Piedi, mph, °F'],
  'Metres, km/h, °C': ['Metros, km/h, °C', 'Mètres, km/h, °C', 'Meter, km/h, °C', 'Metros, km/h, °C', 'Metri, km/h, °C'],
  'Your surfing level': ['Tu nivel de surf', 'Votre niveau de surf', 'Dein Surflevel', 'Seu nível de surfe', 'Il tuo livello di surf'],
  'Beginner': ['Principiante', 'Débutant', 'Anfänger', 'Iniciante', 'Principiante'],
  'Intermediate': ['Intermedio', 'Intermédiaire', 'Fortgeschritten', 'Intermediário', 'Intermedio'],
  'Advanced': ['Avanzado', 'Avancé', 'Profi', 'Avançado', 'Avanzato'],
  'Your spots': ['Tus spots', 'Vos spots', 'Deine Spots', 'Seus spots', 'I tuoi spot'],
  'Spots shared with you': ['Spots compartidos contigo', 'Spots partagés avec vous', 'Mit dir geteilte Spots', 'Spots compartilhados com você', 'Spot condivisi con te'],
  'Export': ['Exportar', 'Exporter', 'Exportieren', 'Exportar', 'Esporta'],
  'Import': ['Importar', 'Importer', 'Importieren', 'Importar', 'Importa'],
  'Export your spots': ['Exporta tus spots', 'Exporter vos spots', 'Spots exportieren', 'Exportar seus spots', 'Esporta i tuoi spot'],
  'Import spots': ['Importar spots', 'Importer des spots', 'Spots importieren', 'Importar spots', 'Importa spot'],
  'Choose an exported file': ['Elige un archivo exportado', 'Choisir un fichier exporté', 'Exportierte Datei wählen', 'Escolha um arquivo exportado', 'Scegli un file esportato'],
  'Download file': ['Descargar archivo', 'Télécharger le fichier', 'Datei herunterladen', 'Baixar arquivo', 'Scarica file'],
  'Text you can copy': ['Texto que puedes copiar', 'Texte à copier', 'Text zum Kopieren', 'Texto para copiar', 'Testo da copiare'],
  'Replace my current spots': ['Reemplazar lo que tengo', 'Remplacer ce que j\'ai', 'Vorhandene ersetzen', 'Substituir o que tenho', 'Sostituisci quello che ho'],
  'Add to my current spots': ['Añadir a lo que tengo', 'Ajouter à ce que j\'ai', 'Zu Vorhandenem hinzufügen', 'Adicionar ao que tenho', 'Aggiungi a quello che ho'],
  'Share all as a link': ['Compartir todo como enlace', 'Tout partager sous forme de lien', 'Alle als Link teilen', 'Compartilhar tudo como link', 'Condividi tutto come link'],
  'Add spots': ['Añadir spots', 'Ajouter des spots', 'Spots hinzufügen', 'Adicionar spots', 'Aggiungi spot'],
  'Add your first spot': ['Añade tu primer spot', 'Ajoutez votre premier spot', 'Füge deinen ersten Spot hinzu', 'Adicione seu primeiro spot', 'Aggiungi il tuo primo spot'],
  'Drop pin': ['Colocar punto', 'Placer un repère', 'Pin setzen', 'Colocar pino', 'Posiziona pin'],
  'Drop a pin': ['Coloca un punto', 'Placez un repère', 'Setze einen Pin', 'Coloque um pino', 'Posiziona un pin'],
  'Edit spot': ['Editar spot', 'Modifier le spot', 'Spot bearbeiten', 'Editar spot', 'Modifica spot'],
  'Edit layout': ['Editar diseño', 'Modifier la mise en page', 'Layout bearbeiten', 'Editar layout', 'Modifica layout'],
  'Reset layout': ['Restablecer diseño', 'Réinitialiser la mise en page', 'Layout zurücksetzen', 'Redefinir layout', 'Ripristina layout'],
  'Reset': ['Restablecer', 'Réinitialiser', 'Zurücksetzen', 'Redefinir', 'Ripristina'],
  'Page layout': ['Diseño de la página', 'Mise en page', 'Seitenlayout', 'Layout da página', 'Layout della pagina'],
  'Rename': ['Renombrar', 'Renommer', 'Umbenennen', 'Renomear', 'Rinomina'],
  'Remove spot': ['Quitar spot', 'Supprimer le spot', 'Spot entfernen', 'Remover spot', 'Rimuovi spot'],
  'Name this spot': ['Nombra este spot', 'Nommez ce spot', 'Diesen Spot benennen', 'Dê um nome a este spot', 'Dai un nome a questo spot'],
  'Spot name': ['Nombre del spot', 'Nom du spot', 'Spot-Name', 'Nome do spot', 'Nome dello spot'],
  'Spot sections': ['Secciones del spot', 'Sections du spot', 'Spot-Abschnitte', 'Seções do spot', 'Sezioni dello spot'],
  'Send': ['Enviar', 'Envoyer', 'Senden', 'Enviar', 'Invia'],
  'Send a test': ['Enviar una prueba', 'Envoyer un test', 'Test senden', 'Enviar um teste', 'Invia un test'],
  'Send alerts': ['Enviar alertas', 'Envoyer les alertes', 'Warnungen senden', 'Enviar alertas', 'Invia avvisi'],
  'Alerts': ['Alertas', 'Alertes', 'Warnungen', 'Alertas', 'Avvisi'],
  'Webhook addresses, one per line': ['Direcciones de webhook, una por línea', 'Adresses webhook, une par ligne', 'Webhook-Adressen, eine pro Zeile', 'Endereços de webhook, um por linha', 'Indirizzi webhook, uno per riga'],
  'Install': ['Instalar', 'Installer', 'Installieren', 'Instalar', 'Installa'],
  'Install app': ['Instalar app', 'Installer l\'appli', 'App installieren', 'Instalar app', 'Installa app'],
  'Offline': ['Sin conexión', 'Hors ligne', 'Offline', 'Offline', 'Offline'],
  'Report a problem': ['Informar de un problema', 'Signaler un problème', 'Problem melden', 'Relatar um problema', 'Segnala un problema'],
  'Skip': ['Omitir', 'Passer', 'Überspringen', 'Pular', 'Salta'],
  'Skip to the forecast': ['Ir al pronóstico', 'Aller aux prévisions', 'Zur Vorhersage springen', 'Ir para a previsão', 'Vai alle previsioni'],
  'Not now': ['Ahora no', 'Pas maintenant', 'Nicht jetzt', 'Agora não', 'Non ora'],
  'Undo': ['Deshacer', 'Annuler', 'Rückgängig', 'Desfazer', 'Annulla'],
  'Forecast': ['Pronóstico', 'Prévisions', 'Vorhersage', 'Previsão', 'Previsioni'],
  'Full forecast text': ['Texto completo del pronóstico', 'Texte complet des prévisions', 'Vollständiger Vorhersagetext', 'Texto completo da previsão', 'Testo completo delle previsioni'],
  'Forecast accuracy': ['Precisión del pronóstico', 'Précision des prévisions', 'Vorhersagegenauigkeit', 'Precisão da previsão', 'Precisione delle previsioni'],
  'Forecast confidence': ['Confianza del pronóstico', 'Fiabilité des prévisions', 'Vorhersagesicherheit', 'Confiança da previsão', 'Affidabilità delle previsioni'],
  'Charts': ['Gráficos', 'Graphiques', 'Diagramme', 'Gráficos', 'Grafici'],
  'Table': ['Tabla', 'Tableau', 'Tabelle', 'Tabela', 'Tabella'],
  'Hour by hour': ['Hora por hora', 'Heure par heure', 'Stündlich', 'Hora a hora', 'Ora per ora'],
  'Next days': ['Próximos días', 'Jours suivants', 'Nächste Tage', 'Próximos dias', 'Prossimi giorni'],
  'Next day': ['Día siguiente', 'Jour suivant', 'Nächster Tag', 'Dia seguinte', 'Giorno successivo'],
  'Previous day': ['Día anterior', 'Jour précédent', 'Vorheriger Tag', 'Dia anterior', 'Giorno precedente'],
  'Today': ['Hoy', 'Aujourd\'hui', 'Heute', 'Hoje', 'Oggi'],
  'Tonight': ['Esta noche', 'Ce soir', 'Heute Nacht', 'Esta noite', 'Stasera'],
  'Now': ['Ahora', 'Maintenant', 'Jetzt', 'Agora', 'Ora'],
  'Rain': ['Lluvia', 'Pluie', 'Regen', 'Chuva', 'Pioggia'],
  'Contamination note': ['Nota de contaminación', 'Note de contamination', 'Hinweis zur Verunreinigung', 'Nota de contaminação', 'Nota sulla contaminazione'],
  'rising': ['subiendo', 'montante', 'steigend', 'subindo', 'in salita'],
  'falling': ['bajando', 'descendente', 'fallend', 'descendo', 'in discesa'],
  'steady': ['estable', 'stable', 'stabil', 'estável', 'stabile'],
  'Right now': ['Ahora mismo', 'Tout de suite', 'Gerade jetzt', 'Agora mesmo', 'In questo momento'],
  'Best spot today': ['Mejor spot hoy', 'Meilleur spot aujourd\'hui', 'Bester Spot heute', 'Melhor spot hoje', 'Miglior spot di oggi'],
  'Surf score by hour': ['Puntuación de surf por hora', 'Score de surf par heure', 'Surf-Wert pro Stunde', 'Pontuação de surfe por hora', 'Punteggio surf per ora'],
  'Scores right now': ['Puntuaciones ahora', 'Scores maintenant', 'Werte jetzt', 'Pontuações agora', 'Punteggi adesso'],
  'Surf score right now, 0 to 100. Tap for the breakdown.': ['Puntuación de surf ahora, de 0 a 100. Toca para ver el detalle.', 'Score de surf maintenant, de 0 à 100. Touchez pour le détail.', 'Surf-Wert jetzt, 0 bis 100. Tippen für die Aufschlüsselung.', 'Pontuação de surfe agora, de 0 a 100. Toque para ver o detalhe.', 'Punteggio surf adesso, da 0 a 100. Tocca per il dettaglio.'],
  'Details ›': ['Detalles ›', 'Détails ›', 'Details ›', 'Detalhes ›', 'Dettagli ›'],
  'Tap': ['Toca', 'Touchez', 'Tippen', 'Toque', 'Tocca'],
  'Surf height': ['Altura de la ola', 'Hauteur de la houle', 'Wellenhöhe', 'Altura da onda', 'Altezza dell\'onda'],
  'Swell': ['Mar de fondo', 'Houle', 'Dünung', 'Ondulação', 'Mareggiata'],
  'Swell and wind': ['Mar de fondo y viento', 'Houle et vent', 'Dünung und Wind', 'Ondulação e vento', 'Mareggiata e vento'],
  'Swell height': ['Altura del mar de fondo', 'Hauteur de la houle', 'Dünungshöhe', 'Altura da ondulação', 'Altezza della mareggiata'],
  'Swell period': ['Periodo del mar de fondo', 'Période de la houle', 'Dünungsperiode', 'Período da ondulação', 'Periodo della mareggiata'],
  'Primary swell': ['Mar de fondo principal', 'Houle principale', 'Hauptdünung', 'Ondulação principal', 'Mareggiata principale'],
  'Secondary swell': ['Mar de fondo secundario', 'Houle secondaire', 'Nebendünung', 'Ondulação secundária', 'Mareggiata secondaria'],
  'Primary period': ['Periodo principal', 'Période principale', 'Hauptperiode', 'Período principal', 'Periodo principale'],
  'Secondary period': ['Periodo secundario', 'Période secondaire', 'Nebenperiode', 'Período secundário', 'Periodo secondario'],
  'Wind': ['Viento', 'Vent', 'Wind', 'Vento', 'Vento'],
  'Gusts': ['Ráfagas', 'Rafales', 'Böen', 'Rajadas', 'Raffiche'],
  'Wind chop': ['Picado por viento', 'Clapot', 'Windwellen', 'Marola do vento', 'Mare formato dal vento'],
  'Water': ['Agua', 'Eau', 'Wasser', 'Água', 'Acqua'],
  'Water and rain': ['Agua y lluvia', 'Eau et pluie', 'Wasser und Regen', 'Água e chuva', 'Acqua e pioggia'],
  'Air': ['Aire', 'Air', 'Luft', 'Ar', 'Aria'],
  'Air temperature': ['Temperatura del aire', 'Température de l\'air', 'Lufttemperatur', 'Temperatura do ar', 'Temperatura dell\'aria'],
  'Sea temperature': ['Temperatura del mar', 'Température de la mer', 'Meerestemperatur', 'Temperatura do mar', 'Temperatura del mare'],
  'Sea surface temperature': ['Temperatura de la superficie del mar', 'Température de surface de la mer', 'Meeresoberflächentemperatur', 'Temperatura da superfície do mar', 'Temperatura superficiale del mare'],
  'Tide': ['Marea', 'Marée', 'Gezeiten', 'Maré', 'Marea'],
  'Tides ahead': ['Mareas próximas', 'Marées à venir', 'Kommende Gezeiten', 'Marés seguintes', 'Maree future'],
  'Tide (NOAA)': ['Marea (NOAA)', 'Marée (NOAA)', 'Gezeiten (NOAA)', 'Maré (NOAA)', 'Marea (NOAA)'],
  'Tide height (NOAA predictions)': ['Altura de marea (predicciones NOAA)', 'Hauteur de marée (prévisions NOAA)', 'Gezeitenhöhe (NOAA-Vorhersagen)', 'Altura da maré (previsões NOAA)', 'Altezza di marea (previsioni NOAA)'],
  'Above lowest tide (MLLW)': ['Sobre la marea más baja (MLLW)', 'Au-dessus de la marée la plus basse (MLLW)', 'Über dem niedrigsten Gezeitenstand (MLLW)', 'Acima da maré mais baixa (MLLW)', 'Sopra la bassa marea più bassa (MLLW)'],
  'Sunrise': ['Amanecer', 'Lever du soleil', 'Sonnenaufgang', 'Nascer do sol', 'Alba'],
  'Sunset': ['Atardecer', 'Coucher du soleil', 'Sonnenuntergang', 'Pôr do sol', 'Tramonto'],
  'Visibility': ['Visibilidad', 'Visibilité', 'Sicht', 'Visibilidade', 'Visibilità'],
  'Cloud cover': ['Nubosidad', 'Couverture nuageuse', 'Bewölkung', 'Cobertura de nuvens', 'Copertura nuvolosa'],
  'Partly cloudy': ['Parcialmente nublado', 'Partiellement nuageux', 'Teilweise bewölkt', 'Parcialmente nublado', 'Parzialmente nuvoloso'],
  'Chance of rain': ['Probabilidad de lluvia', 'Risque de pluie', 'Regenwahrscheinlichkeit', 'Chance de chuva', 'Probabilità di pioggia'],
  'Barometric pressure': ['Presión atmosférica', 'Pression atmosphérique', 'Luftdruck', 'Pressão atmosférica', 'Pressione atmosferica'],
  'Ocean current': ['Corriente oceánica', 'Courant océanique', 'Meeresströmung', 'Corrente oceânica', 'Corrente oceanica'],
  'Rip current risk': ['Riesgo de corriente de resaca', 'Risque de courant de baïne', 'Rippstromrisiko', 'Risco de corrente de retorno', 'Rischio di correnti di ritorno'],
  'Rip current risk by period': ['Riesgo de corriente por periodo', 'Risque de courant par période', 'Rippstromrisiko nach Zeitraum', 'Risco de corrente por período', 'Rischio correnti per fascia oraria'],
  'Surf zone forecast': ['Pronóstico de la zona de rompientes', 'Prévisions de la zone de déferlement', 'Vorhersage der Brandungszone', 'Previsão da zona de arrebentação', 'Previsioni della zona di frangenza'],
  'Break depth': ['Profundidad de rompiente', 'Profondeur de déferlement', 'Brandungstiefe', 'Profundidade de arrebentação', 'Profondità di frangenza'],
  'Surf size (est.)': ['Tamaño de ola (est.)', 'Taille de la houle (est.)', 'Wellengröße (gesch.)', 'Tamanho da onda (est.)', 'Dimensione dell\'onda (stim.)'],
  'Beach faces': ['La playa mira al', 'La plage fait face au', 'Strand zeigt nach', 'A praia fica voltada para', 'La spiaggia guarda a'],
  'Detect direction': ['Detectar dirección', 'Détecter la direction', 'Richtung erkennen', 'Detectar direção', 'Rileva direzione'],
  'Buoys': ['Boyas', 'Bouées', 'Bojen', 'Bóias', 'Boe'],
  'Seamarks': ['Balizas', 'Balises', 'Seezeichen', 'Marcas náuticas', 'Segnali marittimi'],
  'Ocean': ['Océano', 'Océan', 'Ozean', 'Oceano', 'Oceano'],
  'Model comparison': ['Comparación de modelos', 'Comparaison des modèles', 'Modellvergleich', 'Comparação de modelos', 'Confronto dei modelli'],
  'Live model data': ['Datos de modelos en vivo', 'Données de modèles en direct', 'Live-Modelldaten', 'Dados de modelos ao vivo', 'Dati dei modelli in tempo reale'],
  'Live marine + weather models': ['Modelos marinos y meteorológicos en vivo', 'Modèles marins et météo en direct', 'Live-Meeres- und Wettermodelle', 'Modelos marinhos e meteorológicos ao vivo', 'Modelli marini e meteo in tempo reale'],
  'Score at or above': ['Puntuación igual o superior a', 'Score égal ou supérieur à', 'Wert gleich oder höher als', 'Pontuação igual ou acima de', 'Punteggio uguale o superiore a'],
  'Epic': ['Épico', 'Épique', 'Episch', 'Épico', 'Epico'],
  'Great': ['Genial', 'Excellent', 'Sehr gut', 'Ótimo', 'Ottimo'],
  'Good': ['Bueno', 'Bon', 'Gut', 'Bom', 'Buono'],
  'Fair': ['Regular', 'Passable', 'Mäßig', 'Razoável', 'Discreto'],
  'Poor': ['Malo', 'Mauvais', 'Schlecht', 'Ruim', 'Scarso'],
  'Moderate': ['Moderado', 'Modéré', 'Mäßig', 'Moderado', 'Moderato'],
  'High': ['Alto', 'Élevé', 'Hoch', 'Alto', 'Alto'],
  'Very High': ['Muy alto', 'Très élevé', 'Sehr hoch', 'Muito alto', 'Molto alto'],
  'Low': ['Bajo', 'Faible', 'Niedrig', 'Baixo', 'Basso'],
  'Mid': ['Medio', 'Moyen', 'Mittel', 'Médio', 'Medio'],
  'Light': ['Ligero', 'Léger', 'Leicht', 'Leve', 'Leggero'],
  'Light or offshore': ['Ligero u offshore', 'Léger ou offshore', 'Leicht oder ablandig', 'Leve ou offshore', 'Leggero o offshore'],
  'Offshore only': ['Solo offshore', 'Offshore uniquement', 'Nur ablandig', 'Somente offshore', 'Solo offshore'],
  'Any': ['Cualquiera', 'Tous', 'Beliebig', 'Qualquer', 'Qualsiasi'],
  'Any wind': ['Cualquier viento', 'Tout vent', 'Beliebiger Wind', 'Qualquer vento', 'Qualsiasi vento'],
  'None': ['Ninguno', 'Aucun', 'Keine', 'Nenhum', 'Nessuno'],
  'Night': ['Noche', 'Nuit', 'Nacht', 'Noite', 'Notte'],
  'Falling': ['Bajando', 'En baisse', 'Fallend', 'Caindo', 'In calo'],
  'Rising': ['Subiendo', 'En hausse', 'Steigend', 'Subindo', 'In aumento'],
  'Normal': ['Normal', 'Normal', 'Normal', 'Normal', 'Normale'],
  'Larger': ['Más grande', 'Plus grand', 'Größer', 'Maior', 'Più grande'],
  'Largest': ['El más grande', 'Le plus grand', 'Am größten', 'Maior', 'Il più grande'],
  'Contrast': ['Contraste', 'Contraste', 'Kontrast', 'Contraste', 'Contrasto'],
  'Higher contrast': ['Mayor contraste', 'Contraste plus élevé', 'Höherer Kontrast', 'Maior contraste', 'Contrasto più alto'],
  'Text size': ['Tamaño del texto', 'Taille du texte', 'Textgröße', 'Tamanho do texto', 'Dimensione del testo'],
  'Text spacing': ['Espaciado del texto', 'Espacement du texte', 'Textabstand', 'Espaçamento do texto', 'Spaziatura del testo'],
  'Wider spacing': ['Espaciado amplio', 'Espacement élargi', 'Breiterer Abstand', 'Espaçamento maior', 'Spaziatura più ampia'],
  'Animation': ['Animación', 'Animation', 'Animation', 'Animação', 'Animazione'],
  'Turn all animation off': ['Desactivar toda la animación', 'Désactiver toutes les animations', 'Alle Animationen ausschalten', 'Desativar todas as animações', 'Disattiva tutte le animazioni'],
  'Follow my device': ['Seguir mi dispositivo', 'Suivre mon appareil', 'Gerät folgen', 'Seguir meu dispositivo', 'Segui il dispositivo'],
  'Satellite': ['Satélite', 'Satellite', 'Satellit', 'Satélite', 'Satellite'],
  'Satellite, daily': ['Satélite, diario', 'Satellite, quotidien', 'Satellit, täglich', 'Satélite, diário', 'Satellite, giornaliero'],
  'Extra layer': ['Capa extra', 'Couche supplémentaire', 'Zusatzebene', 'Camada extra', 'Livello extra'],
  'Flow layer': ['Capa de flujo', 'Couche de flux', 'Strömungsebene', 'Camada de fluxo', 'Livello di flusso'],
  'Show swell flow': ['Mostrar flujo del oleaje', 'Afficher le flux de houle', 'Dünungsfluss anzeigen', 'Mostrar fluxo da ondulação', 'Mostra flusso della mareggiata'],
  'Rain radar': ['Radar de lluvia', 'Radar de pluie', 'Regenradar', 'Radar de chuva', 'Radar delle piogge'],
  'Play': ['Reproducir', 'Lecture', 'Abspielen', 'Reproduzir', 'Riproduci'],
  'Play the forecast on the map': ['Reproducir el pronóstico en el mapa', 'Lire les prévisions sur la carte', 'Vorhersage auf der Karte abspielen', 'Reproduzir a previsão no mapa', 'Riproduci le previsioni sulla mappa'],
  'Days shown': ['Días mostrados', 'Jours affichés', 'Angezeigte Tage', 'Dias exibidos', 'Giorni mostrati'],
  'Hours ahead': ['Horas por delante', 'Heures à venir', 'Stunden voraus', 'Horas à frente', 'Ore in anticipo'],
  'Chart range': ['Rango del gráfico', 'Plage du graphique', 'Diagrammbereich', 'Intervalo do gráfico', 'Intervallo del grafico'],
  'Hourly view': ['Vista por horas', 'Vue horaire', 'Stundenansicht', 'Visão por hora', 'Vista oraria'],
  'Filter hours by tide or wind': ['Filtrar horas por marea o viento', 'Filtrer les heures par marée ou vent', 'Stunden nach Gezeiten oder Wind filtern', 'Filtrar horas por maré ou vento', 'Filtra le ore per marea o vento'],
  'Within your comfort range': ['Dentro de tu rango cómodo', 'Dans votre plage de confort', 'Im gewohnten Bereich', 'Dentro da sua faixa de conforto', 'Entro il tuo intervallo di comodità'],
  'Your notes and gear': ['Tus notas y equipo', 'Vos notes et matériel', 'Deine Notizen und Ausrüstung', 'Suas notas e equipamento', 'Le tue note e l\'attrezzatura'],
  'Wind: show details': ['Viento: ver detalles', 'Vent : voir les détails', 'Wind: Details anzeigen', 'Vento: ver detalhes', 'Vento: mostra dettagli'],
  'Tide: show details': ['Marea: ver detalles', 'Marée : voir les détails', 'Gezeiten: Details anzeigen', 'Maré: ver detalhes', 'Marea: mostra dettagli'],
  'Water: show details': ['Agua: ver detalles', 'Eau : voir les détails', 'Wasser: Details anzeigen', 'Água: ver detalhes', 'Acqua: mostra dettagli'],
  'Air: show details': ['Aire: ver detalles', 'Air : voir les détails', 'Luft: Details anzeigen', 'Ar: ver detalhes', 'Aria: mostra dettagli'],
};
const I18N_ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];
const I18N_SKIP = 'SCRIPT,STYLE,NOSCRIPT,TEXTAREA,INPUT,#helpm,.verstamp,.verfoot,[data-no-i18n]';
const I18N = { lang: 'en', text: new WeakMap(), attr: new WeakMap(), obs: null, pending: new Set(), raf: 0 };
function i18nSwap(en) {
  const col = I18N_COL[I18N.lang]; if (col == null) return en;
  const row = I18N_DICT[en.trim()]; if (!row || !row[col]) return en;
  return en.match(/^\s*/)[0] + row[col] + en.match(/\s*$/)[0];
}
function i18nText(node) {
  const cur = node.data, rec = I18N.text.get(node);
  const en = rec && cur === rec.out ? rec.en : cur;
  if (!en.trim()) return;
  const out = i18nSwap(en);
  if (out === cur) return;
  node.data = out;
  if (out === en) I18N.text.delete(node); else I18N.text.set(node, { en: en, out: out });
}
function i18nAttrs(el) {
  let m = I18N.attr.get(el);
  I18N_ATTRS.forEach(a => {
    if (!el.hasAttribute(a)) return;
    const cur = el.getAttribute(a), rec = m && m[a];
    const en = rec && cur === rec.out ? rec.en : cur;
    const out = i18nSwap(en);
    if (out === cur) return;
    el.setAttribute(a, out);
    if (out === en) { if (m) delete m[a]; }
    else { if (!m) { m = {}; I18N.attr.set(el, m); } m[a] = { en: en, out: out }; }
  });
}
function i18nNode(root) {
  if (!root) return;
  if (root.nodeType === 3) { if (!(root.parentElement && root.parentElement.closest(I18N_SKIP))) i18nText(root); return; }
  if (root.nodeType !== 1 || root.closest(I18N_SKIP)) return;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts = []; let n; while ((n = tw.nextNode())) texts.push(n);
  texts.forEach(t => { if (!(t.parentElement && t.parentElement.closest(I18N_SKIP))) i18nText(t); });
  if (root.matches(I18N_ATTR_SEL)) i18nAttrs(root);
  root.querySelectorAll(I18N_ATTR_SEL).forEach(el => { if (!el.closest(I18N_SKIP)) i18nAttrs(el); });
}
const I18N_ATTR_SEL = '[title],[aria-label],[placeholder],[alt]';
function i18nObserve() {
  if (!I18N.obs || !document.body) return;
  I18N.obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: I18N_ATTRS });
}
function i18nFlush() {
  I18N.raf = 0;
  const nodes = Array.from(I18N.pending); I18N.pending.clear();
  if (I18N.obs) I18N.obs.disconnect();
  try { nodes.forEach(i18nNode); } finally { i18nObserve(); }
}
function i18nInit() {
  const saved = store.get('lang', 'en');
  I18N.lang = I18N_LANGS.some(l => l.code === saved) ? saved : 'en';
  document.documentElement.lang = I18N.lang;
  if (I18N.lang !== 'en') i18nNode(document.body);
  if (!I18N.obs && window.MutationObserver) {
    I18N.obs = new MutationObserver(recs => {
      recs.forEach(r => {
        if (r.type === 'childList') r.addedNodes.forEach(n => I18N.pending.add(n));
        else I18N.pending.add(r.target);
      });
      if (I18N.pending.size && !I18N.raf) I18N.raf = requestAnimationFrame(i18nFlush);
    });
  }
  i18nObserve();
}
function i18nSet(code) {
  if (!I18N_LANGS.some(l => l.code === code)) code = 'en';
  I18N.lang = code; store.set('lang', code);
  document.documentElement.lang = code;
  if (I18N.obs) I18N.obs.disconnect();
  I18N.pending.clear();
  i18nNode(document.body);
  i18nObserve();
}
/* ============================================================
   APP
   ============================================================ */
const $ = s => document.querySelector(s);
const store = {
  get(k, d) { try { const v = localStorage.getItem('dp.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('dp.' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
};
const OFF_MAX = 8;
function offlineAll() { return store.get('offline', {}); }
function offlineSave(id, d) {
  if (!d || !d.H || d.mode !== 'live') return;
  try {
    const keep = {}; Object.keys(d).forEach(k => { if (k[0] !== '_' && k !== 'mc' && k !== 'tideN' && k !== 'mode') keep[k] = d[k]; });
    const all = offlineAll(); all[id] = keep;
    const ids = Object.keys(all).sort((a, b) => (all[b].loadedAt || 0) - (all[a].loadedAt || 0));
    ids.slice(OFF_MAX).forEach(k => delete all[k]); store.set('offline', all);
  } catch (e) { /* storage full: skip */ }
}
function offlineLoad(id) { const d = offlineAll()[id]; if (!d || !d.H) return null; d.mode = 'offline'; return d; }
const S = { mergeMode: false, mergeSel: new Set(), layerFail: new Set(),
  mode: 'probe', units: store.get('units', 'imperial'), pins: (Array.isArray(store.get('pins', [])) ? store.get('pins', []) : []).filter(p => p && isFinite(p.lat) && isFinite(p.lon)).slice(0, 24),
  selId: store.get('sel', null), prof: Object.assign({ level: 'intermediate', board: '' }, store.get('prof', {})), notes: store.get('notes', {}), log: [], obs: store.get('obs', {}),
  detail: new Map(), scan: new Map(), when: { kind: 'now' }, view: 'home', range: 7, fview: 'chart', base: 'chart', sea: false, rain: false,
  more: '', pinMode: false, loadErr: null, scanErr: null, scanBusy: false, xopen: false, stab: 'now', fold: store.get('fold', {}) || {}, editOpen: false,
  wins: store.get('wins', {}), layout: store.get('layout', {}), home: validHome(store.get('home', null)), plan: Object.assign({ tide: 'any', wind: 'any' }, store.get('plan', {})),
};
const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;
const spotById = id => (id ? S.pins.find(s => s.id === id) || null : null);
const winOf = sp => { const w = sp && (S.wins[sp.id] || sp.win); return Array.isArray(w) && w.length ? w : null; };
/* Break depth used for the surf estimate: the person's own choice wins, "deep water" is an explicit choice, otherwise the CDIP model depth saved for the spot (California) */
const effDepth = sp => (sp.depth > 0 ? sp.depth : sp.nodepth ? undefined : sp.adepth > 0 ? sp.adepth : undefined);
const SX = sp => mkFace(sp.face, winOf(sp), effDepth(sp));
const AD_FAIL = new Map(); let AD_RUN = false;
const adInCA = p => p.lat > 31.8 && p.lat < 42.6 && p.lon > -125.6 && p.lon < -116.3;
const adNeeds = p => !!p && !p.adtried && !(p.depth > 0) && !p.nodepth && adInCA(p) && Date.now() - (AD_FAIL.get(p.id) || 0) > 600000;
/* Asks the nearest CDIP model cell for its water depth, once per spot, and saves it on the spot. Only California is covered. */
async function autoDepth(pin) {
  try {
    const j = await apiGet('/api/cdip?lat=' + pin.lat + '&lon=' + pin.lon, 30000);
    if (!S.pins.includes(pin)) return;
    pin.adtried = 1;
    const c = j && j.supported && j.cell, d = c && c.depth != null ? Math.abs(c.depth) : 0;
    if (c && d >= 0.5 && d <= 100 && (c.distM == null || c.distM <= 2000)) pin.adepth = Math.round(d * 10) / 10;
    store.set('pins', S.pins);
    if (pin.adepth > 0 && !(pin.depth > 0) && !pin.nodepth) {
      S.scan.delete(pin.id); const D = S.detail.get(pin.id); if (D) D._sc = {};
      if (S.selId === pin.id) { if (D) renderDetail(D, pin); else renderHead(null, pin); }
      scanRegion();
    }
  } catch (e) { AD_FAIL.set(pin.id, Date.now()); }
}
async function autoDepthAll() {
  if (AD_RUN || S.mode !== 'live') return; AD_RUN = true;
  try { let p; while ((p = S.pins.find(adNeeds))) { await autoDepth(p); if (adNeeds(p)) AD_FAIL.set(p.id, Date.now()); } }
  finally { AD_RUN = false; }
}
/* Surfing level: it tailors the score (setSurfLevel) and, for Beginner, adds a caution when the surf could top 4 ft */
function surfV(v, spot, k) {
  const H = v.sH != null ? v.sH : v.wH, T = v.sT != null ? v.sT : v.wT, dir = v.sD != null ? v.sD : v.wD;
  return surfEstimate(H, T, dir, SX(spot), k == null ? calibFactor(S.log, spot.id).k : k);
}
const cautV = (v, spot, k) => S.prof.level === 'beginner' ? cautionFor(surfV(v, spot, k), 'beginner') : null;
const cautLim = () => S.units === 'imperial' ? '4 ft' : '1.2 m';
const CAUT_SVG = '<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" focusable="false"><path d="M8 1.5 15 14H1z" fill="currentColor"/><path d="M8 6v4M8 11.6v.9" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>';
function cautionHtml(e) {
  const c = e && cautionFor(e, S.prof.level); if (!c) return '';
  return '<div class="cbanner" role="note"><b>Respect the ocean and your limits.</b> The surf could reach about ' + rr(c.hiM) + ' ' + lu() + ' here, which is above ' + cautLim() + ' and big for a beginner. Rips, strong currents and heavy sets can turn dangerous fast. Surf with a buddy, stay inside what you are comfortable with, and give it a miss if you are unsure. Forecasts are estimates, and the real waves can be bigger. You can change your level in the Menu.</div>';
}
const cautionShort = c => '<span class="tag on">Caution</span> Surf up to about ' + rr(c.hiM) + ' ' + lu() + ', above ' + cautLim() + '. Respect the ocean and know your limits.';
function applyLevel() { setSurfLevel(S.prof.level); S.detail.forEach(d => { d._sc = {}; }); renderAllLists(); }
const L = m => f1(cvLen(m, S.units)), SP = k => f0(cvSpd(k, S.units)), TP = c => f0(cvTmp(c, S.units));
const lu = () => UNIT[S.units].len, su = () => UNIT[S.units].spd, tu = () => UNIT[S.units].tmp;
const fmtLat = v => Math.abs(v).toFixed(2) + '°' + (v < 0 ? 'S' : 'N');
const fmtLon = v => Math.abs(v).toFixed(2) + '°' + (v < 0 ? 'W' : 'E');
let toastTimer;
function toast(msg, act) {
  const t = $('#toast'); t.textContent = msg;
  if (act) { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn sm'; b.textContent = act.label; b.addEventListener('click', () => { t.hidden = true; act.fn(); }); t.appendChild(b); }
  t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, act ? 8000 : 4200);
}
function renderStatus() {
  const chip = $('#status'), live = S.mode === 'live', off = S.mode === 'offline';
  chip.dataset.m = S.mode; $('#status-t').textContent = S.mode === 'probe' ? 'CHECKING' : live ? 'LIVE' : off ? 'OFFLINE' : 'DEMO DATA';
  $('#status-pop').innerHTML = off
    ? '<h3>Offline</h3><p>There is no connection right now, so you are looking at the last forecast saved on this device for your spots. Check the time it was saved on the spot page: forecasts older than a few hours may be out of date.</p><p><button class="btn pri" id="retry-live" type="button">Try the live connection again</button></p>'
    : live
    ? '<h3>Live model data</h3><p>Waves, swell, tide height and sea temperature come from the Open-Meteo Marine API. Wind, air, UV and sun times come from the Open-Meteo Forecast API. Both are model output on a coarse grid, so treat them as guidance and look at the water before you paddle out.</p><p>For the next 3 days the app also checks wind and swell against <a href="https://www.weatherapi.com/" target="_blank" rel="noopener">WeatherAPI.com</a> and <a href="https://www.visualcrossing.com/" target="_blank" rel="noopener">Weather data by Visual Crossing</a>, blends them into the score, and uses them as a backup if Open-Meteo does not answer. You can switch this off in the Menu.</p>'
    : '<h3>Demo data</h3><p>This view could not reach the live weather services, so every number you see is <b>synthetic</b>. It is only here so you can try the layout. Do not plan a session from it.</p><p>Open the app as a regular web page and it will load real Open-Meteo marine and weather data automatically.</p><p><button class="btn pri" id="retry-live" type="button">Try the live connection again</button></p>';
  $('#brand-sub').textContent = live ? 'Live marine + weather models' : off ? 'Offline: saved forecasts' : S.mode === 'demo' ? 'Demo mode: made-up numbers' : 'Connecting…';
}
async function getDetail(spot, force) {
  const hit = S.detail.get(spot.id);
  if (S.mode === 'offline') { if (hit && hit.mode === 'offline') return hit; const o = offlineLoad(spot.id); if (!o) throw new Error('This spot was not saved for offline use. Reconnect to load it.'); S.detail.set(spot.id, o); return o; }
  if (hit && !force && Date.now() - hit.loadedAt < 30 * 60 * 1000 && hit.mode === S.mode) return hit;
  const d = await loadDetail(spot, S.mode); d.mode = S.mode; S.detail.set(spot.id, d); offlineSave(spot.id, d); fcRecord(d, spot); return d;
}
const scoresBase = (D, spot) => {
  D._sc = D._sc || {}; const note = S.notes[spot.id], act = prefActive(note), c = act ? calibFactor(S.log, spot.id).k : 1;
  const k = (winOf(spot) ? winOf(spot).join('.') + '@' : '') + spot.face + (effDepth(spot) ? '|dp' + effDepth(spot) : '') + (act ?'|' + (note.tide || '') + '|' + (note.size || '') + '|' + c.toFixed(2) + '|' + (D.tideN && D.tideN.supported ? 'n' : 'm') : '');
  return D._sc[k] || (D._sc[k] = act ? applyPrefs(D.H, scoresFor(D.H, SX(spot)), note, tideHourly(D), SX(spot), c) : scoresFor(D.H, SX(spot)));
};
/* the person's own reports of what the surf was really like shift this spot's scores: median gap, trusted more with each report */
const BAND_MID = [15, 37, 60, 77, 92];
function scoreBias(id) {
  const o = (S.obs[id] || []).slice(-12); if (!o.length) return { d: 0, n: 0 };
  const g = o.map(x => x.a - x.m).sort((a, b) => a - b), m = g.length % 2 ? g[(g.length - 1) / 2] : (g[g.length / 2 - 1] + g[g.length / 2]) / 2;
  return { d: clamp(Math.round(m * Math.min(1, 0.25 + o.length * 0.25)), -35, 35), n: o.length };
}
const biasOne = (r, d) => { if (!r || !d) return r; const score = clamp(r.score + d, 0, 100); return Object.assign({}, r, { score, band: bandOf(score), bias: d }); };
const scoresOf = (D, spot) => {
  const d = scoreBias(spot.id).d; if (!d) return scoresBase(D, spot);
  D._sb = D._sb || {}; const base = scoresBase(D, spot);
  if (!D._sb[spot.id] || D._sb[spot.id].src !== base || D._sb[spot.id].d !== d) D._sb[spot.id] = { src: base, d, sc: base.map(r => biasOne(r, d)) };
  return D._sb[spot.id].sc;
};
function rateSpot(spot, band) {
  const D = S.detail.get(spot.id); if (!D || !D.marineOk) return;
  const i = hourIndexNow(D.H, D.off), r = scoresBase(D, spot)[i]; if (!r) return;
  const list = (S.obs[spot.id] || []).filter(x => Date.now() - x.t > 45 * 60000);
  list.push({ t: Date.now(), m: r.score, a: BAND_MID[band] }); S.obs[spot.id] = list.slice(-12); store.set('obs', S.obs);
  const b = scoreBias(spot.id); S.scan.delete(spot.id);
  renderDetail(D, spot); renderRank(); renderMarkers();
  celebrate(); toast(b.d ? 'Thanks. ' + spot.name + ' now scores ' + (b.d > 0 ? b.d + ' higher' : -b.d + ' lower') + ', from ' + plural(b.n, 'report') + ' of yours.' : 'Thanks. The model and your report agree, so the score stays as it is.');
}
function rateHtml(spot, r) {
  const b = scoreBias(spot.id);
  /* closed until tapped, so the check never gets in the way of reading the forecast */
  return '<details class="how rateit" id="rateit"><summary>Was the forecast right?</summary><p class="rq">The app says <b>' + r.score + '</b>. Tap what the surf is really like right now.</p><div class="chips" role="group" aria-label="What the surf is really like right now">' +
    BANDS.map((x, k) => '<button type="button" class="chip" data-rate="' + k + '"' + (k === r.band ? ' aria-current="true"' : '') + '>' + x.name + '</button>').join('') + '</div>' +
    '<p class="note">' + (b.n ? 'Scores for this spot are ' + (b.d >= 0 ? '+' : '−') + Math.abs(b.d) + ' from ' + plural(b.n, 'report') + ' of yours. <button type="button" class="linkbtn" data-act="rate-reset">Reset</button>' : 'Each report adjusts the score for this spot. A few reports at different times work best.') + '</p></details>';
}
let map;
const isDark = () => document.documentElement.dataset.theme === 'dark';
function syncTheme() {
  const dk = isDark(), b = $('#themer'), m = document.querySelector('meta[name="theme-color"]');
  if (b) { b.setAttribute('aria-checked', String(dk)); b.title = dk ? 'Switch to light mode' : 'Switch to dark mode'; }
  if (m) m.setAttribute('content', dk ? '#08141F' : '#FFFFFF');
}
function setTheme(t) { document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light'); store.set('theme', t === 'dark' ? 'dark' : 'light'); syncTheme(); if (map) map.setLayers(mapLayers()); }
const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
const chartProviders = () => [
  { id: 'esri', url: ESRI + 'World_Street_Map/MapServer/tile/{z}/{y}/{x}', attr: 'Map © Esri, HERE, Garmin', maxZ: 19 },
  { id: 'osm', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attr: '© OpenStreetMap contributors', maxZ: 19 },
  { id: 'esritopo', url: ESRI + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}', attr: 'Map © Esri, USGS, NOAA', maxZ: 19 },
  { id: 'topo', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', subs: ['a', 'b', 'c'], attr: '© OpenStreetMap, SRTM, OpenTopoMap', maxZ: 17 },
];
const placeLabels = () => ({ id: 'places', url: ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', attr: 'Labels © Esri', maxZ: 19 });
const oceanLabels = () => ({ id: 'oceanref', url: ESRI + 'Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}', attr: 'Labels © Esri, GEBCO, NOAA', maxZ: 10 });
const GIBS = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/';
function moreLayer() {
  if (S.more === 'noaa') return { id: 'noaa', url: 'https://gis.charttools.noaa.gov/arcgis/rest/services/MCS/NOAAChartDisplay/MapServer/exts/MaritimeChartService/MapServer/export?bbox={bbox}&bboxSR=3857&imageSR=3857&size=256,256&format=png&transparent=true&f=image', opacity: 0.95, attr: 'Charts: NOAA Office of Coast Survey', maxZ: 16 };
  if (S.more === 'sst') return { id: 'sst', url: GIBS + 'GHRSST_L4_MUR_Sea_Surface_Temperature/default/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png', opacity: 0.7, attr: 'Sea temperature: NASA GIBS, MUR', maxZ: 7 };
  if (!S.more) return null;
  const lon = map ? lonOf(map.v.x) : -118;
  if (S.more === 'clouds' && lon > -180 && lon < -30) { const west = lon < -105; return { id: west ? 'goes-w' : 'goes-e', url: GIBS + (west ? 'GOES-West' : 'GOES-East') + '_ABI_GeoColor/default/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.jpg', opacity: 0.85, attr: 'Clouds: NASA GIBS, NOAA GOES', maxZ: 7 }; }
  return { id: 'modis', url: GIBS + 'MODIS_Terra_CorrectedReflectance_TrueColor/default/' + new Date(Date.now() - 86400000).toISOString().slice(0, 10) + '/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg', opacity: 0.9, attr: 'Imagery: NASA GIBS, MODIS Terra (yesterday)', maxZ: 9 };
}
const onSite = () => location.protocol === 'file:' || /(^|\.)casadelfuego\.org$|^localhost$|^127\./.test(location.hostname);
const LAYER_NAMES = { sea: 'Seamarks', rain: 'Rain radar', 'goes-w': 'Live clouds', 'goes-e': 'Live clouds', modis: 'Daily satellite', sst: 'Sea temperature', noaa: 'The NOAA chart', places: 'Place labels', oceanref: 'Ocean labels' };
function mapLayers() {
  const out = []; S.layerFail.clear();
  if (S.base === 'sat') out.push({ id: 'sat', url: ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', attr: 'Imagery © Esri', maxZ: 19, base: true }, placeLabels());
  else if (S.base === 'ocean') out.push({ id: 'ocean', url: ESRI + 'Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', attr: 'Map © Esri, GEBCO, NOAA', maxZ: 10, base: true }, oceanLabels(), placeLabels());
  else out.push({ ...chartProviders()[Math.min(S.chartIdx || 0, 3)], base: true });
  if (S.sea) out.push({ id: 'sea', url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', attr: 'OpenSeaMap', maxZ: 18 });
  const mo = moreLayer(); if (mo) out.push(mo);
  if (S.rain && S.radarPath) out.push({ id: 'rain', url: S.radarHost + S.radarPath + '/256/{z}/{x}/{y}/2/1_1.png', opacity: 0.7, attr: 'Radar: RainViewer', maxZ: 7 });
  return out;
}
function tilesFailed() {
  if (S.base === 'chart' && (S.chartIdx || 0) < 3) { S.chartIdx = (S.chartIdx || 0) + 1; map.setLayers(mapLayers()); return; }
  map.setNote((onSite() ? 'Map imagery isn’t loading here (blocked or offline). Try Ocean or Satellite under Map layers.' : 'Map imagery can’t load in this preview. Open dawnpatrol.casadelfuego.org to see the map and its layers.') + ' Meanwhile this is a rough outline. Your spots, scores and forecasts are not affected.');
}
function initMap() {
  map = new SurfMap($('#map'), {
    onTap: (lat, lon) => { if (S.pinMode) dropPin(lat, lon, null); },
    onMarker: id => { select(id, { fromMap: true }); },
    onTilesFail: tilesFailed,
    onLayerFail: id => { S.layerFail.add(id); layerNote(); },
    onMove: () => { if (map) $('#map').classList.toggle('zl', map.v.z >= 8.5); mpMoved(); layerNote(); },
  });
  map.setLayers(mapLayers()); setTicks();
}
function setTicks() { if (map) map.setTicks(S.pins.map(s => ({ lat: s.lat, lon: s.lon, face: s.face }))); }
async function loadRadar() {
  if (S.mode !== 'live' || S.radarPath) return;
  try { const j = await jget('https://api.rainviewer.com/public/weather-maps.json', 8000); const last = j.radar && j.radar.past && j.radar.past[j.radar.past.length - 1]; if (last) { S.radarHost = j.host; S.radarPath = last.path; map.setLayers(mapLayers()); layerNote(); } } catch (e) { toast('Radar layer unavailable right now.'); S.rain = false; $('#ov-rain').checked = false; }
}
function scoreFor(spot) {
  const sc = S.scan.get(spot.id); if (!sc || !sc.ok) return null;
  const i = scanIndex(sc, S.when); if (i < 0) return null;
  const v = valAt(sc.H, i), r = biasOne(scoreHour(v, SX(spot)), scoreBias(spot.id).d); return r ? { r, v, i } : null;
}
function renderMarkers() {
  if (!map) return;
  map.setMarkers(S.pins.map(s => {
    const x = scoreFor(s), cm = x && cautV(x.v, s);
    return { id: s.id, lat: s.lat, lon: s.lon, title: s.name + (x ? ', score ' + x.r.score + ' ' + BANDS[x.r.band].name : '') + (cm ? ', caution: surf above ' + cautLim() : ''), cls: 'pin' + (s.id === S.selId ? ' sel' : ''), z: s.id === S.selId ? 9 : x ? 2 + x.r.band : 1,
      html: '<span class="dot' + (x ? '' : ' un') + '"' + (x ? ' data-b="' + x.r.band + '"' : '') + '><span>' + (x ? x.r.score : '–') + '</span></span>' + (cm ? '<i class="cmk" aria-hidden="true">!</i>' : '') + '<span class="lab">' + esc(s.name) + '</span>' };
  }));
  setTicks();
}
const emptyStartHtml = () => '<div class="start"><h3>Add your first spot</h3><p>Dawn Patrol forecasts the places you surf. Add one to see its score, tide and a two-week forecast.</p><ol><li><b>Search</b> for a beach or town above and pick a result. A pin drops there.</li><li>Or tap <b>Drop pin</b>, then tap the water where you surf.</li></ol><p><button class="btn pri" type="button" data-act="startpin">Drop a pin</button></p><p class="note">You can keep up to 24 spots. They stay on this device.</p></div>';
/* Best spot today (#21): for each spot, the best three-hour stretch of daylight from this hour to dusk, scored the same way as the spot list. */
function bestTodayFor(spot, tomorrow) {
  const sc = S.scan.get(spot.id); if (!sc || !sc.ok || !sc.H || !sc.H.t || !sc.H.t.length) return null;
  const H = sc.H, now = localStr(Date.now(), sc.off);
  let today = now.slice(0, 10), from = now.slice(0, 13) + ':00';
  if (tomorrow) { const dt = new Date(today + 'T12:00:00Z'); dt.setUTCDate(dt.getUTCDate() + 1); today = dt.toISOString().slice(0, 10); from = today + 'T00:00'; }
  const se = sunEvents(spot.lat, spot.lon, today, sc.off), lo = se && se.dawn ? se.dawn : today + 'T06:00', hi = se && se.dusk ? se.dusk : today + 'T19:00';
  const idx = [];
  for (let i = 0; i < H.t.length; i++) { const t = H.t[i]; if (t.slice(0, 10) === today && t >= from && t >= lo && t <= hi) idx.push(i); }
  const len = Math.min(3, idx.length); if (!len) return null;
  const d = scoreBias(spot.id).d, face = SX(spot);
  const hs = idx.map(i => { const v = valAt(H, i), r = v ? biasOne(scoreHour(v, face), d) : null; return r ? { i, s: r.score } : null; });
  let best = null;
  for (let a = 0; a + len <= hs.length; a++) {
    const seg = hs.slice(a, a + len); if (seg.some(x => !x)) continue;
    const avg = seg.reduce((s, x) => s + x.s, 0) / len;
    if (!best || avg > best.avg) best = { spot, avg, peak: Math.max(...seg.map(x => x.s)), i0: seg[0].i, i1: seg[len - 1].i, from: H.t[seg[0].i], to: H.t[seg[len - 1].i + 1] || H.t[seg[len - 1].i] };
  }
  return best;
}
/* the card at the top of Your spots: the best spot today, with the next two under it */
function bestTodayHtml() {
  if (!S.pins.some(s => { const sc = S.scan.get(s.id); return sc && sc.ok; })) return '';
  const rows = S.pins.map(s => bestTodayFor(s)).filter(Boolean).sort((a, b) => b.avg - a.avg || b.peak - a.peak);
  let h = '<section class="today" style="margin:0 0 14px" aria-labelledby="today-h"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:12px var(--gut) 6px"><h2 id="today-h" style="font:700 17px var(--f-display);margin:0">Best spot today</h2><span style="font:400 11px var(--f-mono);color:var(--ink-3);text-align:right">from now to dusk</span></div>';
  const item = x => { const b = bandOf(x.avg), dr = driveOf(x.spot); return '<button class="row" type="button" data-pick="' + esc(x.spot.id) + '"><span class="chipq" data-b="' + b + '">' + Math.round(x.avg) + '</span><span style="min-width:0"><div class="n">' + esc(x.spot.name) + '</div><div class="m">' + esc(BANDS[b].name + ', ' + fmtHr(x.from) + ' to ' + fmtHr(x.to)) + '</div>' + (dr ? '<div class="m">' + driveText(dr.min) + ' drive</div>' : '') + '</span></button>'; };
  if (!rows.length) h += '<p class="note" style="margin:0 0 8px">No daylight is left today with a forecast for your spots. Each spot page shows the coming days.</p>';
  else {
    h += item(rows[0]);
    if (rows.length > 1) h += '<p class="note" style="margin:8px 0 2px">Also today</p>' + rows.slice(1, 3).map(item).join('');
  }
  const tom = S.pins.map(s => bestTodayFor(s, true)).filter(Boolean).sort((a, b) => b.avg - a.avg || b.peak - a.peak);
  if (tom.length) h += '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:12px var(--gut) 4px"><h3 style="font:700 15px var(--f-display);margin:0">Best spot tomorrow</h3><span style="font:400 11px var(--f-mono);color:var(--ink-3);text-align:right">first to last light</span></div>' + item(tom[0]);
  return h + '</section>';
}
/* Your spots (0.1.21): remove one spot, or merge several spots that are the same place. */
function rowSide(s) {
  if (S.mergeMode) return '<div class="rowside"><input type="checkbox" class="pickbox" data-pickid="' + esc(s.id) + '"' + (S.mergeSel.has(s.id) ? ' checked' : '') + ' aria-label="Select ' + esc(s.name) + ' to merge"></div>';
  return '<div class="rowside"><button class="rmbtn" type="button" data-act="rmrow" data-id="' + esc(s.id) + '" aria-label="Remove ' + esc(s.name) + '">Remove</button></div>';
}
function mergeBarHtml(spots) {
  if (spots.length < 2) { S.mergeMode = false; S.mergeSel = new Set(); return ''; }
  if (!S.mergeMode) return '<div class="rankbar"><button class="btn sm" type="button" data-act="mergemode">Select spots to merge</button></div>';
  const n = S.mergeSel.size;
  return '<div class="rankbar"><span class="note" style="margin:0;flex:1 1 100%">Tick two or more spots that are the same place, then merge them.</span><button class="btn sm" type="button" data-act="mergecancel">Cancel</button><button class="btn sm pri" type="button" data-act="mergego"' + (n < 2 ? ' disabled' : '') + '>Merge<span> (' + n + ')</span></button></div>';
}
function toggleMergePick(id) {
  if (!S.pins.some(p => p.id === id)) return;
  if (S.mergeSel.has(id)) S.mergeSel.delete(id); else S.mergeSel.add(id);
  renderRank();
}
function rankClick(e) {
  const pk = e.target.closest('input.pickbox');
  if (pk) { toggleMergePick(pk.dataset.pickid); return; }
  const act = e.target.closest('[data-act]');
  const a = act ? act.dataset.act : '';
  if (a === 'rmrow') { askRemove(act.dataset.id); return; }
  if (a === 'mergemode') { S.mergeMode = true; S.mergeSel = new Set(); renderRank(); return; }
  if (a === 'mergecancel') { S.mergeMode = false; S.mergeSel = new Set(); renderRank(); return; }
  if (a === 'mergego') { openMerge(); return; }
  if (a === 'rescan') { scanRegion(true); return; }
  const r = e.target.closest('.row');
  if (!r) return;
  if (S.mergeMode) { if (r.dataset.id) toggleMergePick(r.dataset.id); return; }
  select(r.dataset.id || r.dataset.pick, { go: true, fly: true });
}
function askRemove(id) {
  const p = S.pins.find(x => x.id === id); if (!p) return;
  const m = $('#confirmm'); m._id = id;
  $('#confirmm-name').textContent = p.name;
  m.hidden = false; $('#confirmm-no').focus();
}
function openMerge() {
  const srcs = S.pins.filter(p => S.mergeSel.has(p.id));
  if (srcs.length < 2) return;
  const coord = p => p.lat.toFixed(4) + ', ' + p.lon.toFixed(4);
  const depthTxt = p => p.depth ? (S.units === 'metric' ? p.depth + ' m' : Math.round(p.depth * 3.281) + ' ft') : 'Default break depth';
  const opt = (field, p, i, sub) => '<label class="mopt"><input type="radio" name="mf-' + field + '" value="' + esc(p.id) + '"' + (i === 0 ? ' checked' : '') + '><span><b>' + esc(p.name) + '</b><small>' + esc(sub) + '</small></span></label>';
  const grp = (label, rows) => '<fieldset class="mfs"><legend>' + label + '</legend>' + rows + '</fieldset>';
  const avgLat = srcs.reduce((a, p) => a + p.lat, 0) / srcs.length, avgLon = srcs.reduce((a, p) => a + p.lon, 0) / srcs.length;
  const names = srcs.map((p, i) => opt('name', p, i, coord(p))).join('');
  const locs = srcs.map((p, i) => opt('loc', p, i, coord(p))).join('') + '<label class="mopt"><input type="radio" name="mf-loc" value="avg"><span><b>Average of the selected spots</b><small>' + avgLat.toFixed(4) + ', ' + avgLon.toFixed(4) + '</small></span></label>';
  const dirs = srcs.map((p, i) => opt('dir', p, i, dirName(p.face))).join('');
  const deps = srcs.map((p, i) => opt('depth', p, i, depthTxt(p))).join('');
  $('#mergem-body').innerHTML = grp('Name', names) + grp('Location', locs) + grp('Beach direction', dirs) + grp('Break depth', deps) + '<p class="note">Notes from all the selected spots are combined. The other spots are removed.</p>';
  $('#mergem').hidden = false;
  const f = document.querySelector('#mergem-body input'); if (f) f.focus();
}
function doMerge(ids, pick) {
  const srcs = ids.map(id => S.pins.find(p => p.id === id)).filter(Boolean);
  if (srcs.length < 2) return;
  const byId = id => srcs.find(p => p.id === id) || srcs[0];
  const snap = { pins: JSON.parse(JSON.stringify(S.pins)), notes: JSON.parse(JSON.stringify(S.notes)), wins: JSON.parse(JSON.stringify(S.wins)), sel: S.selId, offline: JSON.parse(JSON.stringify(offlineAll())) };
  const keep = srcs[0], nm = byId(pick.name), dr = byId(pick.dir), dp = byId(pick.depth);
  keep.name = nm.name;
  if (pick.loc === 'avg') {
    keep.lat = +(srcs.reduce((a, p) => a + p.lat, 0) / srcs.length).toFixed(4);
    keep.lon = +(srcs.reduce((a, p) => a + p.lon, 0) / srcs.length).toFixed(4);
  } else { const lc = byId(pick.loc); keep.lat = lc.lat; keep.lon = lc.lon; }
  keep.face = dr.face; keep.faceSet = dr.faceSet;
  for (const f of ['depth', 'adepth', 'adtried', 'nodepth']) { if (dp[f] !== undefined) keep[f] = dp[f]; else delete keep[f]; }
  const notes = [...new Set(srcs.map(p => String(S.notes[p.id] || '').trim()).filter(Boolean))].join('\n');
  if (notes) S.notes[keep.id] = notes; else delete S.notes[keep.id];
  const win = S.wins[keep.id] || srcs.map(p => S.wins[p.id]).find(Boolean);
  if (win) S.wins[keep.id] = win;
  const gone = srcs.slice(1);
  for (const p of gone) {
    const i = S.pins.findIndex(x => x.id === p.id); if (i >= 0) S.pins.splice(i, 1);
    delete S.notes[p.id]; delete S.wins[p.id];
    S.detail.delete(p.id); S.scan.delete(p.id); DRV.delete(p.id);
  }
  const all = offlineAll(); for (const p of gone) delete all[p.id]; store.set('offline', all);
  S.detail.delete(keep.id); S.scan.delete(keep.id); DRV.delete(keep.id);
  S.mergeMode = false; S.mergeSel = new Set();
  store.set('pins', S.pins); store.set('notes', S.notes); store.set('wins', S.wins);
  S.selId = keep.id; store.set('sel', S.selId);
  renderMarkers(); renderRank(); Promise.resolve(select(keep.id, { go: true, fly: true })).catch(() => {}); scanRegion();
  toast('Merged ' + srcs.length + ' spots into ' + keep.name + '.', { label: 'Undo', fn: () => {
    S.pins.splice(0, S.pins.length, ...snap.pins); S.notes = snap.notes; S.wins = snap.wins; S.selId = snap.sel;
    store.set('pins', S.pins); store.set('notes', S.notes); store.set('wins', S.wins); store.set('sel', S.selId); store.set('offline', snap.offline);
    S.detail.clear(); S.scan.clear(); DRV.clear();
    renderMarkers(); renderRank(); if (S.selId) Promise.resolve(select(S.selId)).catch(() => {}); scanRegion();
  } });
}
function wireMerge() {
  $('#confirmm-no').addEventListener('click', () => { $('#confirmm').hidden = true; });
  $('#confirmm-yes').addEventListener('click', () => { const m = $('#confirmm'), id = m._id; m.hidden = true; if (id) removePin(id); });
  $('#mergem-cancel').addEventListener('click', () => { $('#mergem').hidden = true; });
  $('#mergem-go').addEventListener('click', () => {
    const pick = {};
    for (const f of ['name', 'loc', 'dir', 'depth']) { const c = document.querySelector('#mergem input[name="mf-' + f + '"]:checked'); pick[f] = c ? c.value : null; }
    const ids = S.pins.map(p => p.id).filter(id => S.mergeSel.has(id));
    $('#mergem').hidden = true; doMerge(ids, pick);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#confirmm').hidden) $('#confirmm').hidden = true;
    else if (!$('#mergem').hidden) $('#mergem').hidden = true;
  });
}
function renderRank() {
  const el = $('#rank'); if (!el) return; const spots = S.pins;
  let h = '<div class="rank-h"><h2>Your spots</h2>' + (spots.length ? '<span>' + esc(S.when.kind === 'now' ? 'Scores right now' : 'Scores for ' + mpLabel(S.when.h)) + '</span>' : '') + '</div>';
  if (!spots.length) { el.innerHTML = h + (isDesktop() ? '<p class="yourpins">No spots yet. Search for a beach or town above, or tap <b>Drop pin</b> and tap the water.</p>' : emptyStartHtml()); return; }
  if (S.mode === 'offline') h += '<div class="demo-note" style="margin:0 0 8px"><b>Offline.</b> You’re seeing forecasts saved on this device. Spots without one show a dash.</div>';
  if (S.scanErr) h += '<div class="empty">Couldn’t load the scores (' + esc(S.scanErr) + '). <button class="btn sm" data-act="rescan" type="button">Retry</button></div>';
  h += bestTodayHtml();
  h += mergeBarHtml(spots);
  const rows = spots.map(s => ({ s, x: scoreFor(s) })).sort((a, b) => (b.x ? b.x.r.score : -1) - (a.x ? a.x.r.score : -1));
  for (const { s, x } of rows) {
    const meta = x ? L(x.v.sH != null ? x.v.sH : x.v.wH) + ' ' + lu() + ' at ' + f0(x.v.sT != null ? x.v.sT : x.v.wT) + ' s ' + dirName(x.v.sD != null ? x.v.sD : x.v.wD) + ', wind ' + SP(x.v.wsp) + ' ' + su() + ' ' + windRel(x.v.wsp, x.v.wdir, s.face).label.toLowerCase() : (S.scanBusy ? 'Loading…' : 'No ocean data at this point');
    h += '<div class="rowwrap"><button class="row" type="button" data-id="' + esc(s.id) + '"' + (s.id === S.selId ? ' aria-current="true"' : '') + '><span class="chipq' + (x ? '' : ' un') + '"' + (x ? ' data-b="' + x.r.band + '"' : '') + '>' + (x ? x.r.score : '–') + '</span><span style="min-width:0"><div class="n">' + esc(s.name) + '</div><div class="m">' + esc(meta) + '</div>' + (x && cautV(x.v, s) ? '<div class="m cwarn">' + CAUT_SVG + 'Caution: surf above ' + cautLim() + '</div>' : '') + (driveOf(s) ? '<div class="m">' + driveText(driveOf(s).min) + ' drive</div>' : '') + '</span>' + (x ? '<span title="Swell window: green is where swell works best, blue dot is the swell now, dark dot is the wind">' + miniRose(SX(s), x.v.sD != null ? x.v.sD : x.v.wD, x.v.wdir) + '</span>' : '<span></span>') + '</button>' + rowSide(s) + '</div>';
  }
  h += '<p class="yourpins">' + (spots.length < 24 ? 'Add more with the search box or <b>Drop pin</b>. ' : 'You have the maximum of 24 spots. ') + spots.length + ' of 24 used.</p>';
  el.innerHTML = h;
  fillDrives();
}
/* Home town and drive times. Only the town position is used and sent: pick a town from the search, not a street. */
function validHome(h) { return h && typeof h.name === 'string' && isFinite(h.lat) && isFinite(h.lon) && Math.abs(h.lat) <= 90 && Math.abs(h.lon) <= 180 ? { name: h.name.slice(0, 80), lat: +h.lat, lon: +h.lon } : null; }
function driveText(min) { return min < 60 ? min + ' min' : Math.floor(min / 60) + ' h' + (min % 60 ? ' ' + (min % 60) + ' min' : ''); }
const DRV = new Map(), DRV_BUSY = new Set();
let HOME_RES = [];
const driveKey = spot => (S.home ? S.home.lat.toFixed(4) + ',' + S.home.lon.toFixed(4) : '') + '|' + spot.lat.toFixed(4) + ',' + spot.lon.toFixed(4);
function driveOf(spot) { const d = DRV.get(spot.id); return d && d.k === driveKey(spot) && d.min != null ? d : null; }
function fillDrives() {
  if (!S.home || !S.pins.length || S.mode === 'demo' || S.mode === 'offline') return;
  const need = S.pins.filter(p => { const d = DRV.get(p.id); return !(d && d.k === driveKey(p)) && !(d && d.err && Date.now() - d.at < 600000); });
  if (!need.length) return;
  const job = need.map(driveKey).join(';');
  if (DRV_BUSY.has(job)) return;
  DRV_BUSY.add(job);
  const h = S.home, ks = need.map(driveKey), to = need.map(p => p.lat.toFixed(4) + ',' + p.lon.toFixed(4)).join('|');
  apiGet('/api/drive?from=' + h.lat.toFixed(4) + ',' + h.lon.toFixed(4) + '&to=' + to, 15000).then(j => {
    need.forEach((p, i) => { const r = j && j.supported && j.rows ? j.rows[i] : null; DRV.set(p.id, r ? { k: ks[i], min: r.min, km: r.km } : { k: ks[i], min: null, err: true, at: Date.now() }); });
  }, () => { need.forEach((p, i) => DRV.set(p.id, { k: ks[i], min: null, err: true, at: Date.now() })); })
  .finally(() => { DRV_BUSY.delete(job); if (need.some(p => driveOf(p))) renderAllLists(); });
}
function homeHtml() {
  const H = S.home;
  return '<div class="msec" id="home-sec"><h4>Home</h4><p class="note">Shows the drive time from home to each spot. Search for a town, or use your location. Your home position is saved on this device and is only sent to the routing service that works out the drive times.</p>' +
    (H ? '<div class="mrow"><span>' + esc(H.name) + '</span><button class="btn sm" type="button" data-menu="home-clear">Clear home</button></div>' : '<p class="note">No home set.</p>') +
    '<div class="mrow"><label for="home-q">Find a town</label><input id="home-q" type="search" placeholder="e.g. Santa Cruz, CA" autocomplete="off"><button class="btn sm" type="button" data-menu="home-find">Find</button></div><div class="mrow"><span>Or use where you are now</span><button class="btn sm" type="button" data-menu="home-gps">Use my location</button></div><div id="home-res"></div></div>';
}
async function homeFind() {
  const q = String(($('#home-q') || {}).value || '').trim(), out = $('#home-res');
  if (q.length < 2 || !out) return;
  out.innerHTML = '<p class="note">Searching…</p>';
  try { HOME_RES = await geocode(q, S.mode); } catch (e) { out.innerHTML = '<p class="note">Town search needs the live connection.</p>'; return; }
  out.innerHTML = HOME_RES.length ? HOME_RES.map((r, i) => '<button class="btn sm" type="button" data-home-pick="' + i + '" style="margin:4px 4px 0 0">' + esc(r.name) + (r.sub ? ', ' + esc(r.sub) : '') + '</button>').join('') : '<p class="note">No town found for ' + esc(q) + '. Try a larger place nearby.</p>';
}
/* Town name for a position, from OpenStreetMap Nominatim. The position is rounded to about 1 km for this lookup. */
async function revName(lat, lon) {
  const ac = new AbortController(), to = setTimeout(() => ac.abort(), 8000);
  try {
    const r = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&addressdetails=1&accept-language=en&lat=' + lat.toFixed(2) + '&lon=' + lon.toFixed(2), { signal: ac.signal });
    if (!r.ok) return '';
    const a = (await r.json()).address || {}, place = a.city || a.town || a.village || a.hamlet || a.suburb || a.municipality || a.county || '', reg = a.state || a.country || '';
    return place ? place + (reg ? ', ' + reg : '') : '';
  } finally { clearTimeout(to); }
}
let HOME_GPS = false;
function homeGps() {
  const say = t => { const o = $('#home-res'); if (o) o.innerHTML = '<p class="note" role="status">' + t + '</p>'; };
  if (!navigator.geolocation) { say('This browser cannot share your location. Search for a town instead.'); return; }
  if (HOME_GPS) return; HOME_GPS = true; say('Finding your location… your browser may ask first.');
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = +pos.coords.latitude.toFixed(5), lon = +pos.coords.longitude.toFixed(5);
    S.home = validHome({ name: 'Current location', lat, lon });
    if (!S.home) { HOME_GPS = false; say('That position could not be used. Search for a town instead.'); return; }
    store.set('home', S.home); renderAllLists(); menuRefresh();
    let name = ''; try { name = await revName(lat, lon); } catch (e) { name = ''; }
    HOME_GPS = false;
    if (S.home && S.home.lat === lat && S.home.lon === lon) { if (name) { S.home = validHome({ name, lat, lon }); store.set('home', S.home); } renderAllLists(); menuRefresh(); toast('Home set to ' + S.home.name + (name ? '' : ' (town name not found)') + '. Drive times show on the spot list.'); }
  }, err => {
    HOME_GPS = false;
    say(err && err.code === 1 ? 'Location is blocked for this site. Allow it in your browser settings, or search for a town instead.' : err && err.code === 3 ? 'Finding your location took too long. Try again, or search for a town.' : 'Your location isn’t available right now. Search for a town instead.');
  }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 });
}
function homePick(i) {
  const r = HOME_RES[i]; if (!r) return;
  S.home = validHome({ name: r.name + (r.sub ? ', ' + r.sub : ''), lat: r.lat, lon: r.lon });
  store.set('home', S.home); HOME_RES = [];
  toast('Home set to ' + S.home.name + '. Drive times show on the spot list.');
  renderAllLists();
}
async function scanRegion(force) {
  autoDepthAll();
  if (S.mode === 'offline') { offlineScan(); return; }
  const spots = S.pins.filter(s => force || !S.scan.has(s.id) || S.scan.get(s.id).mode !== S.mode);
  if (!spots.length) { renderRank(); renderMarkers(); return; }
  S.scanBusy = true; S.scanErr = null; renderRank();
  try {
    for (const part of chunk(spots, 20)) {
      const res = await scanBatch(part, S.mode);
      res.forEach(r => { r.mode = S.mode; S.scan.set(r.id, r); });
      renderRank(); renderMarkers();
    }
  } catch (e) { S.scanErr = e.message || 'network error'; }
  S.scanBusy = false; renderRank(); renderMarkers();
}
function dropPin(lat, lon, name, face) {
  if (S.pins.length >= 24) { toast('You can keep up to 24 spots. Remove one first.'); setPinMode(false); return false; }
  lon = ((lon + 540) % 360 + 360) % 360 - 180;
  const pin = { id: newPinId(), name: name || 'My spot ' + (S.pins.length + 1), lat: +lat.toFixed(4), lon: +lon.toFixed(4), face: face == null ? 270 : face, custom: true };
  S.pins.push(pin); store.set('pins', S.pins); setPinMode(false);
  select(pin.id, { fromMap: true }); scanRegion(); renderMarkers();
  if (S.mode === 'live' && face == null) autoFace(pin, !!name === false);
  if (name) toast('Spot added. Checking which way the beach faces…'); else openNamer(pin, true);
  return true;
}
async function autoFace(pin, quiet) {
  try {
    const f = await detectFacing(pin.lat, pin.lon);
    if (!S.pins.includes(pin)) return false;
    if (!f.ok) { if (!quiet) toast(f.reason || 'No coastline found near this pin. Set the direction by hand.'); return false; }
    pin.face = f.face; pin.faceAuto = true; store.set('pins', S.pins); S.scan.delete(pin.id);
    if (S.selId === pin.id) { const D = S.detail.get(pin.id); if (D) { D._sc = {}; renderDetail(D, pin); } else renderHead(null, pin); }
    scanRegion(); toast('Beach faces ' + dirName(f.face) + ' (' + f.face + '\u00b0), detected from the coastline. Change it if it looks wrong.'); return true;
  } catch (e) { if (!quiet) toast('Direction detection isn’t available right now. Set it by hand.'); return false; }
}
let namerPin = null, namerNew = false;
function openNamer(pin, isNew) {
  namerPin = pin; namerNew = !!isNew;
  $('#namer-h').textContent = isNew ? 'Name this spot' : 'Rename spot';
  $('#namer-sub').textContent = isNew ? 'Give this spot a name so it is easy to find later (' + fmtLat(pin.lat) + ' ' + fmtLon(pin.lon) + ').' : 'Currently "' + pin.name + '".';
  const inp = $('#namer-in'); inp.value = isNew ? '' : pin.name; $('#namer-sug').innerHTML = '';
  $('#namer').hidden = false; setTimeout(() => { inp.focus(); inp.select(); }, 40);
  suggestName(pin);
}
async function suggestName(pin) {
  if (S.mode !== 'live') return;
  try {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 5000);
    const r = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + pin.lat + '&longitude=' + pin.lon + '&localityLanguage=en', { signal: ctl.signal }); clearTimeout(to);
    const j = await r.json(), place = j.locality || j.city || ''; if (!place || namerPin !== pin || $('#namer').hidden) return;
    $('#namer-sug').innerHTML = [place, 'Near ' + place].map(x => '<button type="button" class="chip" data-s="' + esc(x) + '">' + esc(x) + '</button>').join('');
  } catch (e) { /* suggestions are optional */ }
}
function closeNamer(save) {
  const pin = namerPin; $('#namer').hidden = true; namerPin = null; if (!pin) return;
  const v = $('#namer-in').value.trim().slice(0, 40);
  if (save && v) renamePin(pin.id, v);
  if (namerNew) toast(save && v ? 'Saved as "' + v + '".' + (pin.faceAuto ? '' : ' Check which way the beach faces for accurate wind scoring.') : 'Spot added as "' + pin.name + '". You can rename it any time.');
}
function renamePin(id, name) {
  const p = S.pins.find(x => x.id === id); if (!p || !name) return;
  p.name = name; store.set('pins', S.pins); renderMarkers(); renderRank();
  if (S.selId === id) renderHead(S.detail.get(id) || null, p);
}
/* The map starts closed (#25). Show map opens it; Map tools shows the buttons on it (Drop pin, Map layers, zoom). Both collapse again on load. */
const MAPUI = { open: false, tools: false };
function mapInit() {
  const wrap = document.querySelector('.mapwrap'); if (!wrap || $('#map-toggle')) return;
  const bar = document.createElement('div'); bar.className = 'map-bar';
  bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:4px var(--gut) 10px';
  bar.innerHTML = '<button class="btn sm" id="map-toggle" type="button" aria-expanded="false" aria-controls="map-wrap">Show map</button><button class="btn sm" id="map-tools-btn" type="button" aria-expanded="false" hidden>Map tools</button>';
  wrap.parentNode.insertBefore(bar, wrap);
  wrap.id = 'map-wrap';
  $('#map-toggle').addEventListener('click', () => mapSet(!MAPUI.open));
  $('#map-tools-btn').addEventListener('click', () => mapToolsSet(!MAPUI.tools));
  mapSet(false);
}
function mapSet(on) {
  MAPUI.open = !!on; const wrap = $('#map-wrap'); if (!wrap) return;
  wrap.hidden = !MAPUI.open;
  const b = $('#map-toggle'); b.textContent = MAPUI.open ? 'Hide map' : 'Show map'; b.setAttribute('aria-expanded', String(MAPUI.open));
  $('#map-tools-btn').hidden = !MAPUI.open;
  if (!MAPUI.open) { mapToolsSet(false); if (S.pinMode) setPinMode(false); if (!$('#layers').hidden) setLayers(false); }
  else { mapToolsSet(MAPUI.tools); requestAnimationFrame(() => { if (map) map.resize(); }); }
}
function mapToolsSet(on) {
  MAPUI.tools = !!on && MAPUI.open; const t = $('#map-tools-btn');
  if (t) { t.textContent = MAPUI.tools ? 'Hide tools' : 'Map tools'; t.setAttribute('aria-expanded', String(MAPUI.tools)); }
  document.querySelectorAll('#map-wrap .mapfab, #map-wrap .sm-ctl').forEach(el => { el.hidden = !MAPUI.tools; });
}
function setPinMode(on) {
  if (on) { mapSet(true); mapToolsSet(true); }
  S.pinMode = on; const b = $('#pin-btn'); b.setAttribute('aria-pressed', on); b.textContent = on ? 'Cancel' : 'Drop pin';
  map.setHint(on ? 'Tap the water where you surf' : '');
  if (on && !isDesktop() && S.view !== 'home') setView('home');
}
function removePin(id) {
  const i = S.pins.findIndex(p => p.id === id); if (i < 0) return; S.mergeSel.delete(id);
  const pin = S.pins[i], note = S.notes[id], win = S.wins[id], saved = offlineAll()[id];
  S.pins.splice(i, 1); store.set('pins', S.pins); delete S.notes[id]; delete S.wins[id]; store.set('notes', S.notes); store.set('wins', S.wins); S.detail.delete(id); S.scan.delete(id);
  const all = offlineAll(); if (all[id]) { delete all[id]; store.set('offline', all); }
  if (S.selId === id) { S.selId = S.pins.length ? S.pins[0].id : null; store.set('sel', S.selId); }
  renderMarkers(); renderRank();
  if (S.selId) select(S.selId); else renderEmptyDetail();
  if (!isDesktop() || !S.selId) goHome();
  toast('Removed ' + pin.name + '.', { label: 'Undo', fn: () => {
    if (S.pins.length >= 24 || S.pins.some(p => p.id === pin.id)) return;
    S.pins.splice(Math.min(i, S.pins.length), 0, pin); store.set('pins', S.pins);
    if (note) { S.notes[pin.id] = note; store.set('notes', S.notes); } if (win) { S.wins[pin.id] = win; store.set('wins', S.wins); }
    if (saved) { const a = offlineAll(); a[pin.id] = saved; store.set('offline', a); }
    select(pin.id, { fly: true }); scanRegion();
  } });
}
async function select(id, opt) {
  opt = opt || {}; const spot = spotById(id);
  if (!spot) { S.selId = null; store.set('sel', null); renderEmptyDetail(); renderRank(); renderMarkers(); return; }
  if (S.selId !== spot.id) { S.stab = 'now'; S.xopen = false; } S.selId = spot.id; store.set('sel', spot.id); S.loadErr = null;
  renderHead(null, spot); stopAnim(); stopReplay(); stopScenes();
  $('#tab-now').innerHTML = '<div class="skel">Loading conditions for ' + esc(spot.name) + '…</div>'; ['#tab-forecast', '#tab-xnow', '#tab-xfc'].forEach(s => { $(s).innerHTML = ''; })
  renderRank(); renderMarkers();
  if (opt.fromMap || opt.fly) { map.setView(spot.lat, spot.lon, Math.max(map.v.z, 9)); if (S.more === 'clouds') map.setLayers(mapLayers()); }
  if (opt.fromMap || opt.go) setView('spot');
  const row = document.querySelector('.row[data-id="' + CSS.escape(spot.id) + '"]'); if (row && isDesktop()) row.scrollIntoView({ block: 'nearest' });
  try { const D = await getDetail(spot); if (S.selId !== spot.id) return; renderDetail(D, spot); }
  catch (e) { if (S.selId !== spot.id) return; S.loadErr = e.message || 'network error'; renderHead(null, spot); $('#tab-now').innerHTML = '<div class="pane"><div class="err"><b>Couldn’t load conditions.</b><div class="note" style="margin-top:4px">' + esc(S.loadErr) + '</div><p style="margin-top:8px"><button class="btn" data-act="retry" type="button">Try again</button></p></div></div>'; }
}
function renderDetail(D, spot) { cmpStop(); renderHead(D, spot); renderNow(D, spot); renderForecast(D, spot); }
function renderEmptyDetail() {
  S.stab = 'now'; S.xopen = false; $('#detail').dataset.stab = 'now';
  stopAnim(); stopReplay(); stopScenes();
  $('#dhead').innerHTML = ''; ['#tab-forecast', '#tab-xnow', '#tab-xfc'].forEach(s => { $(s).innerHTML = ''; })
  $('#tab-now').innerHTML = '<div class="pane">' + emptyStartHtml() + '</div>';
}
const FACES = [['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315]];
function faceOptions(face) {
  const exact = FACES.some(f => f[1] === face);
  return (exact ? '' : '<option value="' + face + '" selected>' + dirName(face) + ' ' + face + '\u00b0</option>') + FACES.map(f => '<option value="' + f[1] + '"' + (f[1] === face ? ' selected' : '') + '>' + f[0] + '</option>').join('');
}
/* break depth in metres; 0 or missing means deep water (no limit on breaking size) */
const DEPTHS = [0, 1, 1.5, 2, 3, 4.5, 6];
const depthName = (m, units) => !(m > 0) ? 'Deep water, or not known' : units === 'metric' ? 'About ' + (+m.toFixed(1)) + ' m' : 'About ' + Math.round(m * M2FT) + ' ft';
function depthOptions(spot) {
  const d = spot.depth > 0 ? spot.depth : 0, ad = spot.adepth > 0 ? spot.adepth : 0, units = S.units, cur = d ? d : spot.nodepth ? -1 : 0;
  const first = ad ? 'Automatic (CDIP model: ' + depthName(ad, units).replace('About ', 'about ') + ')' : depthName(0, units);
  return '<option value="0"' + (cur === 0 ? ' selected' : '') + '>' + first + '</option>' + (ad ? '<option value="-1"' + (cur === -1 ? ' selected' : '') + '>Deep water (no limit)</option>' : '') +
    (d && !DEPTHS.includes(d) ? '<option value="' + d + '" selected>' + depthName(d, units) + '</option>' : '') +
    DEPTHS.filter(m => m > 0).map(m => '<option value="' + m + '"' + (m === d ? ' selected' : '') + '>' + depthName(m, units) + '</option>').join('');
}
function renderHead(D, spot) {
  let badge = '<div class="badge un"><b>–</b><span>' + (S.loadErr ? 'error' : 'loading') + '</span></div>', meta = fmtLat(spot.lat) + ' ' + fmtLon(spot.lon) + ', beach faces ' + dirName(spot.face) + (winOf(spot) ? ', best swell from ' + swinNames(spot) : '') + (spot.faceAuto || spot.faceSet ? '' : ' <span class="tag warn" title="The beach direction drives the swell and wind scoring">guessed, check it under Edit spot</span>');
  const dr = driveOf(spot); if (S.home && dr) meta += ' · ' + driveText(dr.min) + ' drive from ' + esc(S.home.name);
  if (D) {
    const i = hourIndexNow(D.H, D.off), r = D.marineOk ? scoresOf(D, spot)[i] : null;
    badge = r ? '<div class="badge tap" data-tile="score" tabindex="0" role="button" data-b="' + r.band + '" title="Surf score right now, 0 to 100. Tap for the breakdown."><b>' + r.score + '</b><span>' + BANDS[r.band].name + '</span></div>' : '<div class="badge un"><b>–</b><span>no waves</span></div>';
    meta += '. ' + WD[dow(localStr(Date.now(), D.off))] + ' ' + fmtClock(localStr(Date.now(), D.off)) + ' local time';
  }
  const edit = '<details class="spotedit"' + (S.editOpen ? ' open' : '') + '><summary>Edit spot</summary><div class="picker"><button class="btn sm" data-act="renamepin" type="button">Rename</button><label class="fld" style="flex:0 0 auto"><span>Beach faces</span><select id="pin-face" style="width:auto">' + faceOptions(spot.face) + '</select></label><label class="fld" style="flex:0 0 auto"><span>Break depth</span><select id="pin-depth" style="width:auto">' + depthOptions(spot) + '</select></label><button class="btn sm" data-act="detect" type="button" title="Read the coastline from OpenStreetMap">Detect direction</button><button class="btn sm danger" data-act="delpin" type="button">Remove spot</button></div><p class="note">The beach direction sets how the wind is scored. Detect reads it from the coastline; set it by hand if it looks wrong. Break depth is how deep the water is where waves break. On a shallow reef or sandbar, set it so the forecast doesn’t show waves bigger than the water can hold. If you’re not sure, leave it on deep water.</p>' + swinBlock(spot) + '</details>';
  $('#dhead').innerHTML = '<div class="hd"><button class="btn sm back" data-act="back" type="button">‹ Your spots</button><div class="ttl"><h1>' + esc(spot.name) + '</h1><div class="meta">' + meta + '</div></div></div><div class="scene-wrap">' + sceneSvg(D, spot) + '</div><div class="badge-slot">' + badge + '</div><div class="dbody">' +
    '<div class="picker acts"><button class="btn sm" data-act="refresh" type="button">Refresh</button><button class="btn sm" data-act="share" type="button">Share</button></div>' + edit + '</div>' + stabsHtml();
  $('#detail').dataset.stab = S.stab;
}
let TCTX = null;
function tileArt(tile) {
  const C = TCTX; if (!C) return ''; const { D, i } = C, H = D.H, n = Math.min(H.t.length - 1, i + 24), sl = a => a && a.slice(i, n + 1);
  try {
    if (tile === 'swell1') return sparkSvg(sl(H.sH && H.sH.some(x => x != null) ? H.sH : H.wH));
    if (tile === 'swell2') return sparkSvg(sl(H.s2H));
    if (tile === 'chop') return sparkSvg(sl(H.wwH));
    if (tile === 'sea') return sparkSvg(sl(H.wH));
    if (tile === 'wind') return sparkSvg(sl(H.wsp));
    if (tile === 'tide') { const th = tideHourly(D); return th ? sparkSvg(sl(th)) : ''; }
    if (tile === 'water') return sparkSvg(sl(H.sst));
    if (tile === 'air') return sparkSvg(sl(H.temp));
    if (tile === 'sky') return sparkSvg(sl(H.cloud));
    if (tile === 'pressure') return sparkSvg(sl(H.press));
    if (tile === 'sun') { const P = scenePhase(D); return sunArcSvg(P.ph === 'night' ? (P.f < .5 ? 0 : 1) : P.f); }
    if (tile === 'moon') return '<div class="moonrow" style="margin-top:6px">' + moonSvg(moonInfo(Date.now()).age).replace('width="96" height="96"', 'width="46" height="46"') + '</div>';
  } catch (e) { /* art is optional */ }
  return '';
}
function stat(k, v, unit, sub, wide, tile) { return '<div class="card' + (wide ? ' wide' : '') + (tile ? ' tap t t-' + tile : '') + '"' + (tile ? ' data-tile="' + tile + '" tabindex="0" role="button" aria-label="' + k + ': show details"' : '') + '><div class="k">' + (tile ? tileIcon(tile) : '') + '<span>' + k + '</span></div><div class="v">' + v + (unit ? '<small>' + unit + '</small>' : '') + '</div>' + (sub ? '<div class="s">' + sub + '</div>' : '') + (tile ? tileArt(tile) : '') + '</div>'; }
function upcomingWindow(D, spot, i0) {
  const sc = scoresOf(D, spot); let best = null;
  for (let d = 0; d < 4 && d < D.daily.time.length; d++) {
    const w = bestWindow(D.H, sc, D.daily.time[d], D.daily.sunrise[d], D.daily.sunset[d]); if (w && w.i1 >= i0 && (!best || w.avg > best.avg)) best = w;
  }
  return best;
}
const winText = (D, w) => dayLong(D.H.t[w.i0]) + ', ' + fmtHr(D.H.t[w.i0]).replace(' ', ' ') + '–' + fmtHr(D.H.t[w.i1 + 1] || D.H.t[w.i1]).replace(' ', ' ');
/* flair: weather emoji and the motion class for each condition */
const wxEmoji = c => { if (c == null) return ''; if (c === 0) return '☀️'; if (c === 1 || c === 2) return '⛅'; if (c === 3) return '☁️'; if (c === 45 || c === 48) return '🌫️'; if (c >= 51 && c <= 67) return '🌧️'; if (c >= 71 && c <= 77) return '❄️'; if (c >= 80 && c <= 82) return '🌦️'; if (c >= 85 && c <= 86) return '🌨️'; if (c >= 95) return '⛈️'; return '🌡️'; };
const wxAnim = c => { if (c === 0) return 'sun'; if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return 'rain'; if ((c >= 71 && c <= 77) || (c >= 85 && c <= 86)) return 'snow'; if (c >= 95) return 'storm'; return ''; };
/* confetti burst for a success: skipped when the phone asks for reduced motion */
function celebrate() {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const set = ['🎉', '🌊', '✨', '🏄', '🤙', '🐚', '⭐'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('span');
    el.className = 'confetti'; el.setAttribute('aria-hidden', 'true'); el.textContent = set[i % set.length];
    el.style.setProperty('--x', (5 + Math.random() * 90) + 'vw');
    el.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    el.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    el.style.setProperty('--dur', (1.8 + Math.random() * 1.2) + 's');
    el.style.setProperty('--delay', (Math.random() * 0.4) + 's');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3600);
  }
}
/* a small emoji that matches what its line says: wind for wind, wave for wave height, and so on */
const dpEm = e => '<span class="em" aria-hidden="true">' + e + ' </span>';
const dpWindEm = k => (k == null ? '💨' : k < 8 ? '🍃' : k < 25 ? '💨' : k < 40 ? '🌬️' : '🌪️');
const dpWaterEm = c => (c == null ? '🌡️' : c < 15 ? '🥶' : c < 21 ? '🌡️' : '😎');
function renderNow(D, spot) {
  if (RA.on && RA.spot !== spot.id) raEnd();
  RA.ctx = { D, spot };
  TCTX = { D, i: hourIndexNow(D.H, D.off) };
  const i = hourIndexNow(D.H, D.off), v = valAt(D.H, i), cur = D.current || {}, r = D.marineOk ? scoresOf(D, spot)[i] : null;
  let h = '<div class="pane">';
  if (S.mode === 'demo') h += '<div class="demo-note"><b>Demo data.</b> The live weather services can’t be reached from here, so these numbers are made up. Open the app in a regular browser for the real forecast.</div>';
  if (S.mode === 'offline') { const mins = Math.max(0, Math.round((Date.now() - (D.loadedAt || 0)) / 60000)); h += '<div class="demo-note"><b>Offline.</b> Showing the forecast saved ' + (mins < 90 ? mins + ' minutes' : Math.round(mins / 60) + ' hours') + ' ago. It will refresh when you are back online.</div>'; }
  if (!D.marineOk) h += '<div class="err"><b>No ocean model data here.</b><div class="note" style="margin-top:4px">The spot may be inland or too sheltered for the wave model. Move the pin a little offshore. The weather below is still valid.</div></div>';
  if (raOK()) h += raBar();
  if (r) {
    const sw = r.swell === 1 ? { H: v.s2H, T: v.s2T, D: v.s2D } : { H: v.sH != null ? v.sH : v.wH, T: v.sT != null ? v.sT : v.wT, D: v.sD != null ? v.sD : v.wD };
    const rel = windRel(v.wsp, v.wdir, spot.face), bw = upcomingWindow(D, spot, i);
    h += '<p class="verdict" data-b="' + r.band + '"><b class="vb">' + BANDS[r.band].name + '</b> right now: ' + dpEm('🌊') + L(sw.H) + ' ' + lu() + ' at ' + f0(sw.T) + ' s from the ' + dirName(sw.D) + ', ' + dpEm(dpWindEm(v.wsp)) + 'wind ' + SP(v.wsp) + ' ' + su() + ' ' + rel.label.toLowerCase() + '.' +
      (bw ? '<span class="cond-line" style="display:block;margin-top:6px">' + dpEm('⏰') + 'Best upcoming window: <b>' + winText(D, bw) + '</b> (' + BANDS[bandOf(bw.avg)].name + ', ' + Math.round(bw.avg) + ').</span>' : '') + '<span id="cond-slot"></span></p>';
    h += rateHtml(spot, r);
  }
  h += '<div id="haz">' + hazardsHtml(D, spot, null) + '</div>';
  const e = D.marineOk ? sizeInfo(D, spot, i) : null, sumNow = e && r ? rr(e.lo) + '–' + rr(e.hi) + ' ' + lu() + ', ' + BANDS[r.band].name.toLowerCase() : '';
  h += cautionHtml(e) + '<div class="sec" id="rightnow"' + sumAttr(sumNow) + '><h2>Right now <small>hour starting ' + fmtClock(D.H.t[i]) + '</small></h2><div class="grid">';
  if (e) { const ln = levelNote(e.mid, S.prof.level); h += stat('Surf size (est.)', rr(e.lo) + '–' + rr(e.hi), lu(), 'Rough breaking height from swell, period and beach angle' + (ln ? '<br><span class="tag ' + (ln.tone === 'ok' ? 'off' : ln.tone === 'warn' ? 'cross' : 'on') + '">' + esc(ln.text) + '</span>' : ''), false, 'size'); }
  if (D.marineOk) {
    const pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, pD = v.sD != null ? v.sD : v.wD;
    h += stat('Primary swell', L(pH), lu(), f0(pT) + ' s from ' + dirName(pD) + ' ' + arrowSvg(pD + 180, 14, 'travel direction') + '<br>' + f0(0.4906 * pH * pH * pT) + ' kW/m power', false, 'swell1');
    if (v.s2H != null && v.s2H > 0.1) h += stat('Secondary swell', L(v.s2H), lu(), f0(v.s2T) + ' s from ' + dirName(v.s2D) + ' ' + arrowSvg(v.s2D + 180, 14, 'travel direction'), false, 'swell2');
  }
  const wsp = cur.wind_speed_10m != null ? cur.wind_speed_10m : v.wsp, wdir = cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir, gust = cur.wind_gusts_10m != null ? cur.wind_gusts_10m : v.gust, rel = windRel(wsp, wdir, spot.face);
  h += stat('Wind', SP(wsp), su(), 'from ' + dirName(wdir) + ' ' + arrowSvg(wdir + 180, 14, 'wind direction') + ' gusts ' + SP(gust) + '<br><span class="tag ' + rel.kind + '">' + rel.label + '</span>', false, 'wind');
  const td = D.marineOk ? tideSummary(D.H, i) : null;
  h += '<div id="tide-slot" style="display:contents">';
  if (td) { const nx = [td.nextHigh, td.nextLow].filter(Boolean).sort((a, b) => a.i - b.i); h += stat('Tide (model)', L(td.h), lu(), td.trend + (nx.length ? '<br>' + nx.map(x => (x.type === 'high' ? 'High ' : 'Low ') + fmtClock(x.t) + ' ' + L(x.h) + ' ' + lu()).join('<br>') : ''), false, 'tide'); }
  h += '</div>';
  if (D.marineOk && v.sst != null) h += stat('Water', TP(v.sst), tu(), esc(wetsuit(v.sst) || '') + (v.curV != null ? '<br>Current ' + f1(cvSpd(v.curV, S.units)) + ' ' + su() + ' to ' + dirName(v.curD) : ''), false, 'water');
  h += stat('Air', TP(cur.temperature_2m != null ? cur.temperature_2m : v.temp), tu(), '<span class="wx-ico ' + wxAnim(cur.weather_code != null ? cur.weather_code : v.code) + '" aria-hidden="true">' + wxEmoji(cur.weather_code != null ? cur.weather_code : v.code) + '</span> ' + esc(wxText(cur.weather_code != null ? cur.weather_code : v.code)) + '<br>Feels ' + TP(cur.apparent_temperature != null ? cur.apparent_temperature : v.feels) + tu(), false, 'air');
  const sr = D.daily.sunrise[0], ss = D.daily.sunset[0], se = sunEvents(spot.lat, spot.lon, D.daily.time[0], D.off), first = (se && se.dawn) || (sr ? localStr(epochOf(sr, D.off) * 1000 - 30 * 60000, D.off) : null), last = (se && se.dusk) || (ss ? localStr(epochOf(ss, D.off) * 1000 + 30 * 60000, D.off) : null);
  h += stat('Sunrise', fmtClock(sr), '', 'First light ' + (first ? fmtClock(first) : '–') + '<br>Sunset ' + fmtClock(ss) + ', last light ' + (last ? fmtClock(last) : '–'), false, 'sun');
  h += '</div>' + ringsHtml(D, spot, i, v, cur, e, r, td) + '<p class="note">Tap any tile for its charts and details.</p></div>';
  h += tideSecHtml('tide-now', 'Tide', 'today, step ahead with the arrows', td ? td.trend + (td.nextHigh ? ', next high ' + fmtClock(td.nextHigh.t) : '') : '');
  h += '</div>';
  $('#tab-now').innerHTML = h; raUi(); foldPane($('#tab-now')); fillNowConds(D, spot);
  fillHazards(D, spot); fillTides(D, spot); ensureTides(D, spot);
  if (S.xopen) renderXnow(D, spot); else $('#tab-xnow').innerHTML = '';
}
/* the extra sections for right now, shown under "More detail" */
function renderXnow(D, spot) {
  const i = hourIndexNow(D.H, D.off), v = valAt(D.H, i), cur = D.current || {}, r = D.marineOk ? scoresOf(D, spot)[i] : null;
  let h = '<div class="pane">';
  h += compassSec(D, i, 'cmp');
  if (D.marineOk) h += '<div class="sec" id="swell-arr"><h2>Swell arrival <small>when the next pulse reaches the beach</small></h2><div class="card arr" id="arr-body" data-tile="swell1" tabindex="0" role="button"></div></div>';
  h += '<div class="sec" id="more-cond"><h2>More conditions <small>sea state, sky and moon</small></h2><div class="grid">';
  if (D.marineOk && v.wwH != null) h += stat('Wind chop', L(v.wwH), lu(), f0(v.wwT) + ' s from ' + dirName(v.wwD) + '<br>' + (v.wwH / (v.wH || 1) > 0.5 ? 'Texture likely' : 'Mostly swell'), false, 'chop');
  if (D.marineOk) h += stat('Sea state, total', L(v.wH), lu(), f0(v.wT) + ' s mean period', false, 'sea');
  const uvMax = D.daily.uv_index_max ? D.daily.uv_index_max[0] : null;
  h += stat('Sky and sun', f0(cur.cloud_cover != null ? cur.cloud_cover : v.cloud), '% cloud', 'UV now ' + f1(v.uv) + (uvMax != null ? ', peak ' + f1(uvMax) : '') + '<br>Humidity ' + f0(cur.relative_humidity_2m != null ? cur.relative_humidity_2m : v.hum) + '%', false, 'sky');
  const p3 = i >= 3 && D.H.press[i - 3] != null && D.H.press[i] != null ? D.H.press[i] - D.H.press[i - 3] : null;
  h += stat('Pressure', f0(cur.pressure_msl != null ? cur.pressure_msl : v.press), 'hPa', p3 == null ? '' : (p3 > 0.6 ? 'Rising' : p3 < -0.6 ? 'Falling' : 'Steady') + ' over 3 h', false, 'pressure');
  const mo = moonInfo(Date.now());
  h += stat('Moon', Math.round(mo.illum * 100), '% lit', esc(mo.name) + (mo.springs ? '<br>Spring tides: bigger tidal range' : '<br>Neap-ish: smaller tidal range'), false, 'moon');
  h += '</div></div>';
  h += '<div class="sec" id="buoy-now" hidden></div>';
  if (D.marineOk) h += lineupNowHtml();
  h += '<div class="sec" id="water-adv"><h2>Water and rain <small>runoff, beach advisories and algae</small></h2><div class="card" id="rain-body"><div class="skel">Checking recent rain…</div></div><div id="wq-body"></div><div id="hab-body"></div></div>';
  h += comfortHtml(D, spot, i);
  if (D.marineOk) h += '<div class="sec" id="crowd-now"><h2>Crowd estimate <small>how busy the lineup is likely to be</small></h2><div class="card" id="crowd-body">' + crowdHtml(D, spot) + '</div></div>';
  h += '<div class="sec" id="sources-now"><h2>Forecast confidence <small>do the models agree, and where the data comes from</small></h2><div class="card" id="src-body"></div></div>';
  h += '<div class="sec" id="me-now">' + meNowHtml(D, spot) + '</div>';
  if (r) {
    const p = r.parts, mx1 = { period: 35, size: 25, wind: 30 * WIND_SHARE };
    h += '<div class="sec" id="why-score"><h2>Why this score</h2><div class="card"><div class="parts">' +
      ['period', 'size', 'wind'].map(k => '<div class="part"><span>' + { period: 'Swell period', size: 'Wave size', wind: 'Wind' }[k] + '</span><span class="bar"><i style="width:' + Math.round(p[k] / mx1[k] * 100) + '%"></i></span><span>' + Math.round(p[k]) + '/' + mx1[k] + '</span></div>').join('') +
      '<div class="part"><span>Exposure</span><span class="bar"><i style="width:' + Math.round(p.exposure * 100) + '%"></i></span><span>×' + p.exposure.toFixed(2) + '</span></div>' +
      '<div class="part"><span>Chop</span><span class="bar"><i style="width:' + Math.round(p.chop * 10) + '%"></i></span><span>−' + Math.round(p.chop) + '</span></div></div>' +
      '<div class="s" style="margin-top:8px">' + (winOf(spot) ? 'Exposure is how well the swell direction fits the directions you picked for this spot (' + windowText(SX(spot)) + ').' : 'Exposure is how directly the swell hits a beach facing ' + dirName(spot.face) + '. Change the facing under Edit spot at the top.') + '</div></div>' +
      '' + scoreRadarHtml(r) + '<details class="how"><summary>How the score works</summary><p>Every swell train reaching the beach is combined by its energy, weighted by how squarely it hits this beach (exposure). From the combined swell the app estimates the breaking wave height, using the period, because long-period swell breaks much bigger than its offshore height. Score = swell period (up to 35, times exposure) + wave size from that breaking height (up to 25) + wind quality (up to 15, so swell counts for most of it), minus a penalty for wind chop, scaled to 0–100. Poor under 25, Fair 25–49, Good 50–69, Great 70–84, Epic 85 and up.</p><p>Banks, reefs and local tide effects are not modelled. Set a preferred tide or size under Your notes, and use <b>Is it right?</b> on the spot page to tell the app what it is really like: each report shifts this spot’s scores.</p></details></div>';
  }
  h += '<p class="note">' + xsNote(D) + fmtClock(localStr(D.loadedAt, D.off)) + ' local. The wave model grid is coarse, so a point very close to shore may sample a nearby offshore cell.</p></div>';
  stopScenes(); $('#tab-xnow').innerHTML = h; foldPane($('#tab-xnow'));
  mountLineupNow(D, spot); renderCompass(D, spot, 0); fillArrival(D, spot); fillRain(D, spot); fillBeachWq(D, spot); fillHab(D, spot); fillAir(D, spot); fillSources(D, spot); fillBuoyNow(D, spot);
}
const LEVELS = [['beginner', 'Beginner'], ['intermediate', 'Intermediate'], ['advanced', 'Advanced']];
const rr = m => { const x = cvLen(m, S.units); return x < 3 ? f1(x) : f0(x); };
function sizeInfo(D, spot, i) {
  const v = valAt(D.H, i), H = v.sH != null ? v.sH : v.wH, T = v.sT != null ? v.sT : v.wT, dir = v.sD != null ? v.sD : v.wD, c = calibFactor(S.log, spot.id), e = surfEstimate(H, T, dir, SX(spot), c.k);
  return e && Object.assign(e, { cal: c, H, T, dir, v });
}
function tideHourly(D) {
  if (D.tideN && D.tideN.supported) { const s = tideSeries(D.tideN.hilo, D.H.t.map(x => epochOf(x, D.off))); if (s.some(v => v != null)) return s; }
  return D.marineOk && D.H.tide.some(v => v != null) ? D.H.tide : null;
}
function meNowHtml(D, spot) {
  const i = hourIndexNow(D.H, D.off), pr = S.prof, note = S.notes[spot.id] || {}, e = D.marineOk ? sizeInfo(D, spot, i) : null;
  let h = '<h2>Your notes and gear <small>' + esc((LEVELS.find(l => l[0] === pr.level) || LEVELS[2])[1].toLowerCase()) + ' level, change it in Settings</small></h2><div class="grid">';
  if (e) {
    const sst = e.v.sst, gear = [];
    if (sst != null) gear.push('<b>Suit:</b> ' + esc(wetsuit(sst) || '') + ' (' + TP(sst) + tu() + ')', '<b>Wax:</b> ' + esc(waxFor(sst)));
    const bh = boardHint(e.mid, e.T, pr.level); if (bh) gear.push('<b>Board:</b> ' + esc(bh));
    if (gear.length) h += '<div class="card wide"><div class="k">Gear hints</div><div class="s" style="margin-top:4px;line-height:1.55">' + gear.join('<br>') + '</div></div>';
  }
  const ph = tidePhase(tideHourly(D) || [], i), tm = tideMatch(note.tide, ph);
  h += '<div class="card wide"><div class="k">Your notes for this spot</div><div class="mynote"><label class="fld" style="flex:0 0 auto"><span>Best tide here</span><select id="me-tide">' + TIDE_PREFS.map(t => '<option value="' + t[0] + '"' + ((note.tide || 'any') === t[0] ? ' selected' : '') + '>' + t[1] + '</option>').join('') + '</select></label><label class="fld" style="flex:0 0 auto"><span>Best size here</span><select id="me-size">' + SIZE_PREFS.map(t => '<option value="' + t[0] + '"' + ((note.size || 'any') === t[0] ? ' selected' : '') + '>' + sizePrefName(t[0], S.units) + '</option>').join('') + '</select></label><div class="s">Your tide and size picks nudge this spot’s score: up when they match, down when they do not.</div><div class="s" id="me-tm">' + tideMatchText(note.tide, tm, ph) + '</div><textarea id="me-note" rows="3" maxlength="600" placeholder="Hazards, parking, best swell direction…" aria-label="Notes for this spot">' + esc(note.note || '') + '</textarea></div></div>';
  return h + '</div>';
}
function tideMatchText(pref, tm, ph) {
  if (!pref || pref === 'any') return 'Pick a tide to see when it matches.';
  if (!ph) return 'Tide position not available yet.';
  return '<span class="tag ' + (tm ? 'off' : 'cross') + '">' + (tm ? 'Tide is right now' : 'Not your tide right now') + '</span> ' + Math.round(ph.pct * 100) + '% of today’s range, ' + (ph.rising ? 'rising' : 'falling');
}
function refreshMeNow(D, spot) {
  const box = $('#me-now'); if (!box || S.selId !== spot.id) return; const a = document.activeElement; if (a && a.id === 'me-note') return;
  box.innerHTML = meNowHtml(D, spot);
}
function saveNote(spotId, patch) {
  const n = Object.assign({}, S.notes[spotId] || {}, patch); if ((!n.tide || n.tide === 'any') && (!n.size || n.size === 'any') && !n.note) delete S.notes[spotId]; else S.notes[spotId] = n; store.set('notes', S.notes);
  if ('tide' in patch || 'size' in patch) { const D = S.detail.get(spotId); if (D) D._sc = {}; S.scan.delete(spotId); const sp = spotById(spotId); if (D && sp && S.selId === spotId) renderDetail(D, sp); renderRank(); renderMarkers(); }
}
function windowEvent(m) {
  const { sp, D, w } = m, v = valAt(D.H, w.i0), st = epochOf(D.H.t[w.i0], D.off) * 1000, en = epochOf(D.H.t[w.i1], D.off) * 1000 + 3600000, b = BANDS[bandOf(w.avg)];
  const H = v.sH != null ? v.sH : v.wH, T = v.sT != null ? v.sT : v.wT;
  return { uid: sp.id + '-' + st, start: st, end: en, title: 'Surf ' + sp.name + ' (' + b.name + ' ' + Math.round(w.avg) + ')', desc: 'Dawn Patrol forecast: ' + L(H) + ' ' + lu() + ' at ' + f0(T) + ' s, wind ' + SP(v.wsp) + ' ' + su() + ' ' + windRel(v.wsp, v.wdir, sp.face).label.toLowerCase() + '. Check a cam before you go.', loc: sp.name + ' (' + sp.lat.toFixed(3) + ', ' + sp.lon.toFixed(3) + ')' };
}
function download(name, text, mime) {
  try { const a = document.createElement('a'), u = URL.createObjectURL(new Blob([text], { type: mime })); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); }
  catch (e) { toast('Downloads are blocked in this view. Open the app in a regular browser tab.'); }
}
const safeName = n => String(n).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'surf';
function exportSpotIcs(D, spot) {
  const sc = scoresOf(D, spot), now = hourIndexNow(D.H, D.off), ms = [];
  for (let d = 0; d < Math.min(S.range, D.daily.time.length); d++) { const w = bestWindow(D.H, sc, D.daily.time[d], D.daily.sunrise[d], D.daily.sunset[d]); if (w && w.i1 >= now && w.avg >= 45) ms.push({ sp: spot, D, w }); }
  if (!ms.length) { toast('No Good-or-better daylight windows in the days shown.'); return; }
  download('dawn-patrol-' + safeName(spot.name) + '.ics', icsText(ms.map(windowEvent)), 'text/calendar'); toast(ms.length + ' window' + (ms.length > 1 ? 's' : '') + ' saved to a calendar file.');
}
/* links always point at the public site, so a link made inside a preview or an installed copy still opens for anyone */
const SITE_URL = 'https://dawnpatrol.casadelfuego.org/';
const shareBase = () => (onSite() && /^https?:$/.test(location.protocol) ? location.origin + location.pathname : SITE_URL);
const SHR = {};
function openShare(title, sub, url, from) {
  SHR.url = url; SHR.title = title; SHR.from = from || document.activeElement;
  $('#share-h').textContent = title; $('#share-sub').textContent = sub; $('#share-url').value = url;
  $('#share-native').hidden = !navigator.share; $('#share-msg').textContent = '';
  $('#sharem').hidden = false; $('#share-copy').focus();
}
function closeShare() { $('#sharem').hidden = true; if (SHR.from && SHR.from.focus && document.body.contains(SHR.from)) SHR.from.focus(); }
function shareSpot(spot) {
  const w = winOf(spot), url = shareBase() + shareHash(spot, w);
  openShare('Share ' + spot.name, 'Anyone who opens this link gets ' + spot.name + ' added to their own spots, with its beach direction' + (spot.depth > 0 ? (w ? ', break depth' : ' and break depth') : '') + (w ? ' and the swell directions you picked' : '') + '. Your notes and reports stay private.', url);
}
function shareAllSpots() {
  if (!S.pins.length) return;
  const url = shareBase() + shareListHash(S.pins, S.wins);
  openShare('Share all your spots', 'This link holds all ' + plural(S.pins.length, 'spot') + ' with their beach directions' + (S.pins.some(p => p.depth > 0) ? ' and break depths' : '') + '. Whoever opens it chooses which to add. Your notes and reports stay private.', url);
}
function wireShare() {
  $('#share-close').addEventListener('click', closeShare);
  $('#sharem').addEventListener('click', e => { if (e.target.id === 'sharem') closeShare(); });
  $('#share-url').addEventListener('focus', e => e.target.select());
  $('#share-copy').addEventListener('click', async () => {
    const t = $('#share-url'); let ok = false;
    try { await navigator.clipboard.writeText(SHR.url); ok = true; } catch (e) { t.focus(); t.select(); try { ok = document.execCommand('copy'); } catch (e2) { ok = false; } }
    $('#share-msg').textContent = ok ? 'Link copied. Paste it into a message.' : 'Select the link above and copy it.';
  });
  $('#share-native').addEventListener('click', async () => { try { await navigator.share({ title: 'Dawn Patrol: ' + SHR.title.replace(/^Share /, ''), url: SHR.url }); } catch (e) { if (!e || e.name !== 'AbortError') $('#share-msg').textContent = 'Sharing did not open here. Copy the link instead.'; } });
  $('#recv-close').addEventListener('click', () => { $('#recvm').hidden = true; });
  $('#recvm').addEventListener('click', e => { if (e.target.id === 'recvm') $('#recvm').hidden = true; });
  $('#recv-go').addEventListener('click', addReceived);
  $('#recv-list').addEventListener('change', recvCount);
  document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (!$('#sharem').hidden) closeShare(); if (!$('#recvm').hidden) $('#recvm').hidden = true; });
}
const nearPinOf = p => S.pins.find(x => Math.abs(x.lat - p.lat) < 0.0006 && Math.abs(x.lon - p.lon) < 0.0006);
let RECV = [];
function openReceived(list) {
  RECV = list; const room = 24 - S.pins.length;
  $('#recv-h').textContent = plural(list.length, 'spot') + ' shared with you';
  $('#recv-list').innerHTML = list.map((p, k) => { const ex = nearPinOf(p); return '<label class="chk xrow"><input type="checkbox" data-rk="' + k + '"' + (ex ? ' disabled' : ' checked') + '> <span><b>' + esc(p.name || 'Shared spot') + '</b><small>' + (ex ? 'Already in your spots as ' + esc(ex.name) : fmtLat(p.lat) + ' ' + fmtLon(p.lon) + ', faces ' + dirName(p.face)) + '</small></span></label>'; }).join('');
  recvCount(); $('#recvm').hidden = false; $('#recv-go').focus();
  if (room < list.length) $('#recv-note').textContent = 'You have room for ' + plural(Math.max(0, room), 'more spot') + ' (24 at most).';
}
function recvCount() {
  const n = document.querySelectorAll('#recv-list input:checked').length, room = 24 - S.pins.length;
  $('#recv-go').disabled = !n || room <= 0; $('#recv-go').textContent = n ? 'Add ' + plural(Math.min(n, Math.max(room, 0)), 'spot') : 'Add spots';
  $('#recv-note').textContent = room <= 0 ? 'You already have 24 spots. Remove one first.' : n > room ? 'Only the first ' + room + ' will fit (24 at most).' : '';
}
function addOne(p) {
  const pin = { id: newPinId(), name: p.name || 'Shared spot', lat: +p.lat.toFixed(4), lon: +((p.lon + 540) % 360 - 180).toFixed(4), face: p.face, faceSet: true, custom: true };
  if (p.depth > 0) pin.depth = p.depth;
  S.pins.push(pin); if (p.win) S.wins[pin.id] = p.win; return pin;
}
function addReceived() {
  const ks = [...document.querySelectorAll('#recv-list input:checked')].map(x => +x.dataset.rk); let added = 0, last = null;
  for (const k of ks) { if (S.pins.length >= 24) break; const p = RECV[k]; if (!p || nearPinOf(p)) continue; last = addOne(p); added++; }
  store.set('pins', S.pins); store.set('wins', S.wins); $('#recvm').hidden = true;
  renderAllLists(); renderMarkers(); scanRegion(); fitPins();
  toast(added ? 'Added ' + plural(added, 'spot') + '.' : 'Nothing new to add.');
  if (last && isDesktop()) select(last.id);
}
function applyShare() {
  const sh = parseShare(location.hash); if (!sh) return;
  if (sh.help) { openHelp(); return; }
  if (sh.spot) { if (spotById(sh.spot)) select(sh.spot, { go: true, fly: true }); else toast('That spot is no longer available. Search for it or drop a pin to add it.'); return; }
  if (sh.pin || sh.list) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* the link still works */ } }
  if (sh.list) { openReceived(sh.list); return; }
  if (sh.pin) {
    const ex = nearPinOf(sh.pin);
    if (ex) { select(ex.id, { go: true, fly: true }); toast(ex.name + ' is already in your spots.'); return; }
    if (S.pins.length >= 24) { toast('You can keep up to 24 spots. Remove one first.'); return; }
    const pin = addOne(sh.pin); store.set('pins', S.pins); store.set('wins', S.wins);
    renderAllLists(); renderMarkers(); scanRegion(); map.setView(pin.lat, pin.lon, 11); select(pin.id, { go: true, fly: true });
    celebrate(); toast('Added ' + pin.name + ' to your spots.');
  }
}
const untilTxt = (D, iso) => { const ms = Date.parse(iso || ''); if (!isFinite(ms)) return ''; const l = localStr(ms, D.off); return 'until ' + WD[dow(l)] + ' ' + fmtClock(l); };
function hazardsHtml(D, spot, N) {
  let h = habBannerHtml(D); const i = hourIndexNow(D.H, D.off), li = lightningRisk(D.H, i, 12);
  if (li != null) h += '<div class="alert" data-t="bad"><b>Thunderstorms in the forecast.</b> <span class="note">The model shows thunderstorm conditions around ' + esc(fmtClock(D.H.t[li])) + '. Leave the water at the first rumble or flash.</span></div>';
  if (!N || !N.supported) return h;
  sortAlerts(N.alerts).slice(0, 5).forEach(a => {
    h += '<details class="alert" data-t="' + alertTone(a) + '"><summary><b>' + esc(a.event || 'Alert') + '</b><span>' + esc(untilTxt(D, a.expires)) + (a.sender ? ' \u00b7 ' + esc(a.sender) : '') + '</span></summary><p>' + esc((a.headline ? a.headline + '\n\n' : '') + (a.description || '') + (a.instruction ? '\n\n' + a.instruction : '')) + '</p></details>';
  });
  if (N.alerts && !N.alerts.length && !h) h += '<div class="alert" data-t="ok"><b>No active weather alerts</b> <span class="note">for this point (NWS).</span></div>';
  if (!N.alerts && N.alertsError) h += '<div class="alert" data-t="info"><b>Alerts unavailable.</b> <span class="note">Check <a target="_blank" rel="noopener noreferrer" href="https://www.weather.gov/">weather.gov</a> directly.</span></div>';
  const sg = N.srf && N.srf.segment;
  if (sg) {
    const pills = [['Rip current risk', sg.rip, ripTone(sg.rip)], ['Surf height', sg.surf, 'info'], ['Water', sg.waterTemp, 'info'], ['UV', sg.uv, 'info']].filter(x => x[1]).map(x => '<span class="pill" data-t="' + x[2] + '"><b>' + x[0] + '</b> ' + esc(x[1]) + '</span>').join('');
    const iss = N.srf.issued ? localStr(Date.parse(N.srf.issued), D.off) : null;
    const per = (sg.periods || []).filter(x => x.rip), ripRow = per.length > 1 ? '<div class="note" style="margin:10px 0 4px"><b>Rip current risk by period</b></div><div class="tags rip-days" style="margin-top:0">' + per.map(x => '<span class="pill" data-t="' + ripTone(x.rip) + '"><b>' + esc(x.label) + '</b> ' + esc(x.rip) + (x.surf ? ' \u00b7 ' + esc(x.surf) : '') + '</span>').join('') + '</div>' : '';
    h += '<div class="sec srf"><h2>Surf zone forecast <small>NWS ' + esc(N.office || '') + (iss ? ' \u00b7 issued ' + esc(WD[dow(iss)] + ' ' + fmtClock(iss)) : '') + '</small></h2><div class="card"><div class="tags" style="margin-top:0">' + pills + '</div>' + ripRow +
      '<details class="how"><summary>Full forecast text</summary><pre>' + esc(sg.text || '') + '</pre></details></div><p class="note">Official US National Weather Service text for the nearest surf zone. <a target="_blank" rel="noopener noreferrer" href="' + esc(N.srfUrl || 'https://www.weather.gov/') + '">Open the original</a></p></div>';
  } else if (N.srfUrl) h += '<p class="note">Official surf zone forecast: <a target="_blank" rel="noopener noreferrer" href="' + esc(N.srfUrl) + '">NWS ' + esc(N.office || '') + '</a></p>';
  return h;
}
async function fillHazards(D, spot) {
  if (S.mode !== 'live' || !$('#haz')) return;
  try { const N = await getHazards(spot); if (S.selId !== spot.id || !$('#haz')) return; $('#haz').innerHTML = hazardsHtml(D, spot, N); } catch (e) { /* outside the US or service down: stay quiet */ }
}
async function ensureTides(D, spot) {
  if (S.mode !== 'live') return;
  if (D.tideN === undefined) { try { D.tideN = await getTides(spot); } catch (e) { D.tideN = null; } }
  if (S.selId !== spot.id || !D.tideN || !D.tideN.supported) return;
  applyTides(D, spot); fillTides(D, spot);
  if ($('#tides-fc') && !D._tideChart) renderXfc(D, spot);
  refreshMeNow(D, spot);
}
function applyTides(D, spot) {
  const slot = $('#tide-slot'), T = D.tideN; if (!slot || !T || !T.supported) return;
  if (S.notes[spot.id] && S.notes[spot.id].tide) D._sc = {};
  const info = tideNowInfo(T.hilo, Math.floor(Date.now() / 1000)); if (!info) return;
  const tm = e => fmtClock(localStr(e.t * 1000, D.off));
  slot.innerHTML = stat('Tide (NOAA)', L(info.h), lu(), esc(info.trend) + info.next.map(e => '<br>' + (e.type === 'H' ? 'High ' : 'Low ') + tm(e) + ' ' + L(e.v) + ' ' + lu()).join('') + '<br>' + esc(T.station.name) + ' \u00b7 ' + distTxt(T.station.km) + '<br>Above lowest tide (MLLW)', false, 'tide');
}
const TVIEW = { now: 0 };
const dayStartEp = (D, d) => epochOf(D.daily.time[d] + 'T00:00', D.off);
const tClock = (D, t) => fmtClock(localStr(t * 1000, D.off));
const tideSecHtml = (id, title, sub, sum) => '<div class="sec" id="' + id + '"' + sumAttr(sum) + '><h2>' + title + ' <small>' + sub + '</small></h2><div class="card tide-card" id="' + id + '-body"><div class="skel">Loading the tide…</div></div></div>';
function noTideHtml(spot) {
  const q = encodeURIComponent('tide times ' + String(spot.name || '').replace(/\s*\(.*?\)/g, ''));
  return '<p class="note" style="margin:0 0 8px"><b>No tide data for this point.</b> The ocean model has no usable sea level here (it may be inland or in a sheltered bay) and there is no NOAA tide station within 250 km. Drop the pin a little offshore, or check a local tide table.</p>' +
    '<div class="chips"><a class="chip" href="https://www.google.com/search?q=' + q + '" target="_blank" rel="noopener">Tide times search</a><a class="chip" href="https://tidesandcurrents.noaa.gov/map/index.html" target="_blank" rel="noopener">NOAA tide map</a></div>';
}
const tideEvChip = (D, e, nowS) => '<span class="tg-ev ' + (e.type === 'H' ? 'h' : 'l') + (e.t < nowS ? ' past' : '') + '"><b>' + (e.type === 'H' ? 'High' : 'Low') + '</b> ' + tClock(D, e.t) + ' <i>' + L(e.v) + ' ' + lu() + '</i></span>';
function fillTides(D, spot) {
  if (!D || !spot || S.selId !== spot.id) return;
  D._tm = tideModelFor(D);
  tideFillOne('tide-now', D, spot, 'now'); tideFillOne('tides-fc', D, spot, 'fc');
}
function tideFillOne(id, D, spot, mode) {
  const body = $('#' + id + '-body'); if (!body) return;
  const TM = D._tm, nowS = Math.floor(Date.now() / 1000), nd = Math.min(D.daily.time.length, 14);
  if (!TM || nd < 1) { body.innerHTML = noTideHtml(spot); return; }
  let t0, t1, days, d = 0;
  if (mode === 'now') { d = clamp(TVIEW.now, 0, nd - 1); TVIEW.now = d; t0 = dayStartEp(D, d); t1 = t0 + 86400; days = 1; }
  else { days = Math.min(S.range, nd); t0 = dayStartEp(D, 0); t1 = t0 + days * 86400; }
  let h = '';
  if (mode === 'now') {
    h += '<div class="tg-nav"><button class="btn sm" type="button" data-tg="prev" aria-label="Previous day"' + (d <= 0 ? ' disabled' : '') + '>‹</button><b>' + (d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dayLong(D.daily.time[d])) + '<small>' + dayLong(D.daily.time[d]) + '</small></b><button class="btn sm" type="button" data-tg="next" aria-label="Next day"' + (d >= nd - 1 ? ' disabled' : '') + '>›</button>' + (d ? '<button class="btn sm" type="button" data-tg="today">Back to today</button>' : '') + '</div>';
    if (d === 0) {
      const cur = TM.at(nowS), tr = tideTrendAt(TM, nowS), nx = tideNextAfter(TM, nowS);
      if (cur != null) h += '<div class="tg-big"><b>' + L(cur) + '</b> ' + lu() + ' <span class="tag ' + (tr === 'rising' ? 'off' : tr === 'falling' ? 'cross' : '') + '">' + (tr === 'rising' ? 'Rising' : tr === 'falling' ? 'Falling' : 'Slack') + '</span></div>' +
        '<p class="tg-sub">' + (nx.first ? 'Next ' + (nx.first.type === 'H' ? 'high' : 'low') + ' ' + tClock(D, nx.first.t) + ' (in ' + tideIn(nx.first.t - nowS) + '), ' + L(nx.first.v) + ' ' + lu() : '') + '</p>';
    } else {
      const r = tideDayRange(TM, t0, t1); if (r) h += '<p class="tg-sub">Tidal range ' + L(r.range) + ' ' + lu() + ' (low ' + L(r.lo) + ', high ' + L(r.hi) + ' ' + lu() + ')</p>';
    }
  }
  if (mode === 'fc') h += '<div class="chips" role="group" aria-label="Days shown" style="margin-bottom:6px">' + [3, 5, 7, 10, 14].map(n => '<button type="button" class="chip" data-r="' + n + '" aria-pressed="' + (n === S.range) + '">' + n + ' days</button>').join('') + '</div>';
  h += '<div class="tidebox" id="' + id + '-fig"><div class="svgh"></div><div class="tip" hidden></div><div class="sr-only sr-live" role="status" aria-live="polite"></div></div>';
  const sc = D.marineOk ? scoresOf(D, spot) : null;
  h += '<div class="legend tg-leg"><span><i style="background:var(--water)"></i>Tide</span><span><i style="background:var(--accent)"></i>Now</span><span><i style="background:var(--ink);opacity:.18"></i>Night</span>' + (TM.obs && TM.obs.length ? '<span><i style="background:var(--ink-2)"></i>Measured</span>' : '') + (sc ? '<span><i style="background:linear-gradient(90deg,var(--q1),var(--q2),var(--q3))"></i>Surf score by hour</span>' : '') + '</div>';
  if (mode === 'now') {
    const ev = tideEventsIn(TM, t0, t1);
    h += ev.length ? '<div class="tg-evs">' + ev.map(e => tideEvChip(D, e, nowS)).join('') + '</div>' : '<p class="note">No high or low falls on this day in the predictions.</p>';
  } else {
    let mxr = 0; const rows = [];
    for (let k = 0; k < days; k++) { const a = dayStartEp(D, k), r = tideDayRange(TM, a, a + 86400); rows.push({ k, a, r, ev: tideEventsIn(TM, a, a + 86400) }); if (r && r.range > mxr) mxr = r.range; }
    h += '<div class="tg-days">' + rows.map(x => '<div class="tg-day"><div class="d"><b>' + dayLabel(D.daily.time[x.k]) + '</b>' + (x.k === 0 ? '<small>today</small>' : '') + '</div><div class="e">' + (x.ev.length ? x.ev.map(e => tideEvChip(D, e, nowS)).join('') : '<span class="note">No predictions</span>') + '</div>' +
      '<div class="r" title="Tidal range">' + (x.r ? '<span class="bar"><i style="width:' + Math.round(x.r.range / (mxr || 1) * 100) + '%"></i></span><span>' + L(x.r.range) + ' ' + lu() + '</span>' : '') + '</div></div>').join('') + '</div>';
  }
  const src = TM.kind === 'noaa' ? 'NOAA tide predictions' + (TM.station ? ' for ' + esc(TM.station.name) + ', ' + distTxt(TM.station.km) + ' away' : '') + '. Heights are ' + TM.datum + '.' : 'Estimated from the ocean model’s sea level (' + TM.datum + '). The model grid is coarse, so highs and lows can be off by an hour or more near shore and in bays: treat the times as a guide and check a local tide table.';
  if (sndOK()) h += '<div class="tg-snd"><button type="button" class="btn sm snd" data-snd="tide" data-fig="' + id + '-fig" aria-pressed="false">\u266a Hear the tide curve</button><span class="sr-only snd-live" role="status" aria-live="polite"></span></div>';
  h += '<p class="note" style="margin-top:8px">' + src + (D.tideN && D.tideN.supported ? '' : ' Highs and lows are the turning points of the hourly curve.') + (mode === 'fc' ? ' Spring tides (new and full moon) have the biggest range.' : '') + '</p>';
  body.innerHTML = h;
  const box = $('#' + id + '-fig'); if (!box) return;
  box._tc = { TM, D, spot, t0, t1, nowS, labels: days <= 3, sc, hIdx: null };
  drawTide(box); tideObs.observe(box);
}
const tideObs = typeof ResizeObserver === 'function' ? new ResizeObserver(es => { for (const e of es) { const b = e.target; if (b._tc && Math.abs((b._w || 0) - b.clientWidth) > 2) { b._w = b.clientWidth; requestAnimationFrame(() => drawTide(b)); } } }) : { observe() {} };
let TIDE_UID = 0;
function drawTide(box) {
  const c = box._tc; if (!c) return; box._w = box.clientWidth;
  const { TM, D, t0, t1, nowS, labels, sc } = c, host = box.querySelector('.svgh');
  const W = Math.max(280, box.clientWidth - 24), Ht = W < 420 ? 214 : 244, m = { l: 40, r: 12, t: 24, b: sc ? 44 : 30 }, pw = W - m.l - m.r, ph = Ht - m.t - m.b;
  const span = t1 - t0, X = t => m.l + (t - t0) / span * pw;
  const cur = tideCurve(TM, t0, t1, span > 4 * 86400 ? 1800 : 900);
  if (cur.length < 2) { host.innerHTML = '<p class="note" style="padding:12px 4px">The tide predictions do not reach this period yet.</p>'; return; }
  const cv = v => cvLen(v, S.units), fy = x => String(+x.toFixed(1));
  let lo = Infinity, hi = -Infinity; cur.forEach(p => { const y = cv(p[1]); if (y < lo) lo = y; if (y > hi) hi = y; });
  const rng = Math.max(0.3, hi - lo); lo -= rng * (labels ? 0.3 : 0.12); hi += rng * (labels ? 0.26 : 0.12);
  const ticks = niceTicks(lo, hi, 4); lo = Math.min(lo, ticks[0]); hi = Math.max(hi, ticks[ticks.length - 1]);
  const Y = y => m.t + ph - (y - lo) / (hi - lo || 1) * ph, uid = ++TIDE_UID, off = D.off || 0;
  let g = '';
  // night
  let prevSet = -Infinity; const nights = [];
  for (let d = 0; d < D.daily.time.length; d++) { const sr = D.daily.sunrise && D.daily.sunrise[d], ss = D.daily.sunset && D.daily.sunset[d]; if (sr) nights.push([prevSet, epochOf(sr, off)]); if (ss) prevSet = epochOf(ss, off); }
  nights.push([prevSet, Infinity]);
  nights.forEach(n => { const a = X(Math.max(n[0], t0)), b = X(Math.min(n[1], t1)); if (b - a > 0.5) g += '<rect x="' + a.toFixed(1) + '" y="' + m.t + '" width="' + (b - a).toFixed(1) + '" height="' + ph + '" fill="var(--ink)" opacity=".08"/>'; });
  // grid and axis
  ticks.forEach(tk => { const y = Y(tk); if (y < m.t - 1 || y > m.t + ph + 1) return; g += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="var(--line)" stroke-width="1" ' + (tk === 0 ? '' : 'stroke-dasharray="2 4"') + '/><text x="' + (m.l - 6) + '" y="' + (y + 3.5).toFixed(1) + '" text-anchor="end" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + fy(tk) + '</text>'; });
  g += '<text x="' + (m.l - 6) + '" y="' + (m.t - 10) + '" text-anchor="end" font-size="10" font-family="var(--f-mono)" fill="var(--ink-3)">' + lu() + '</text>';
  const axisY = m.t + ph + (sc ? 22 : 16), mid0 = Math.ceil((t0 + off) / 86400) * 86400 - off;
  if (span <= 36 * 3600) { for (let t = Math.ceil((t0 + off) / 21600) * 21600 - off; t <= t1; t += 21600) { const hr = Math.floor((((t + off) % 86400) + 86400) % 86400 / 3600), lab = hr === 0 ? '12 AM' : hr === 12 ? '12 PM' : (hr % 12) + (hr < 12 ? ' AM' : ' PM'); g += '<text x="' + X(t).toFixed(1) + '" y="' + axisY + '" text-anchor="middle" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + lab + '</text>'; } }
  const perDay = pw / (span / 86400), every = Math.max(1, Math.ceil(46 / perDay));
  for (let t = mid0, k = 0; t < t1 + 86400; t += 86400, k++) {
    if (t > t0 && t < t1 && span > 36 * 3600) g += '<line x1="' + X(t).toFixed(1) + '" x2="' + X(t).toFixed(1) + '" y1="' + m.t + '" y2="' + (m.t + ph) + '" stroke="var(--line)" stroke-width="1"/>';
    if (span > 36 * 3600 && k % every === 0) { const mid = t - 43200; if (mid >= t0 && mid <= t1) g += '<text x="' + X(mid).toFixed(1) + '" y="' + axisY + '" text-anchor="middle" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + (perDay > 56 ? dayLabel(localStr(mid * 1000, off)) : WD[dow(localStr(mid * 1000, off))].slice(0, 2) + ' ' + parseT(localStr(mid * 1000, off)).d) + '</text>'; }
  }
  // surf score strip
  if (sc) {
    const hi2 = new Map(D.H.t.map((s, i) => [s, i])), hw = Math.max(1, pw * 3600 / span + 0.6);
    for (let t = Math.ceil(t0 / 3600) * 3600; t < t1; t += 3600) { const i = hi2.get(localStr(t * 1000, off).slice(0, 13) + ':00'), r = i != null ? sc[i] : null; if (r) g += '<rect x="' + X(t).toFixed(1) + '" y="' + (m.t + ph + 5) + '" width="' + hw.toFixed(1) + '" height="7" fill="var(--q' + r.band + ')" opacity=".9"/>'; }
  }
  // curve
  const col = 'var(--water)'; let d = '';
  cur.forEach((p, k) => { d += (k ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(cv(p[1])).toFixed(1); });
  g += '<defs><linearGradient id="tg' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '" stop-opacity=".38"/><stop offset="1" stop-color="' + col + '" stop-opacity=".03"/></linearGradient></defs>' +
    '<path d="' + d + 'L' + X(cur[cur.length - 1][0]).toFixed(1) + ' ' + (m.t + ph) + 'L' + X(cur[0][0]).toFixed(1) + ' ' + (m.t + ph) + 'Z" fill="url(#tg' + uid + ')"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>';
  // measured water level (NOAA gauge)
  const ob = (TM.obs || []).filter(p => p[0] >= t0 && p[0] <= Math.min(t1, nowS));
  if (ob.length > 2) g += '<path d="' + ob.map((p, k) => (k ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(cv(p[1])).toFixed(1)).join('') + '" fill="none" stroke="var(--ink-2)" stroke-width="1.6" stroke-dasharray="4 3"/>';
  // highs and lows
  let lastX = -99;
  tideEventsIn(TM, t0, t1).forEach(e => {
    const x = X(e.t), y = Y(cv(e.v)), up = e.type === 'H';
    g += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.8" fill="var(--surface)" stroke="' + col + '" stroke-width="2"/>';
    if (labels && x - lastX >= 52) { lastX = x; const lx = clamp(x, m.l + 24, W - m.r - 24); g += '<text text-anchor="middle" font-size="10.5" font-family="var(--f-mono)" fill="var(--ink)"><tspan x="' + lx.toFixed(1) + '" y="' + (y + (up ? -19 : 17)).toFixed(1) + '" font-weight="600">' + tClock(D, e.t) + '</tspan><tspan x="' + lx.toFixed(1) + '" dy="12" fill="var(--ink-2)">' + L(e.v) + ' ' + lu() + '</tspan></text>'; }
  });
  // now
  if (nowS >= t0 && nowS <= t1) {
    const nv = TM.at(nowS), x = X(nowS);
    g += '<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + m.t + '" y2="' + (m.t + ph) + '" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 3"/>' + (nv != null ? '<circle cx="' + x.toFixed(1) + '" cy="' + Y(cv(nv)).toFixed(1) + '" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>' : '') +
      '<text x="' + (x + (x > W - 60 ? -5 : 5)).toFixed(1) + '" y="' + (m.t - 9) + '" text-anchor="' + (x > W - 60 ? 'end' : 'start') + '" font-size="10" font-weight="600" font-family="var(--f-mono)" fill="var(--accent)">Now</text>';
  }
  const evs = tideEventsIn(TM, t0, Math.min(t1, t0 + 3 * 86400)).slice(0, 8).map(e => (e.type === 'H' ? 'High ' : 'Low ') + tClock(D, e.t) + ' ' + L(e.v) + ' ' + lu()).join('. ');
  host.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + Ht + '" width="' + W + '" height="' + Ht + '" role="img" tabindex="0" aria-label="' + esc('Tide graph from ' + dayLong(localStr(t0 * 1000, off)) + ' for ' + Math.round(span / 86400) + (span > 86400 ? ' days' : ' day') + '. ' + evs + '. Use the left and right arrow keys to read the height at any time.') + '">' + g +
    '<line class="xh" x1="0" x2="0" y1="' + m.t + '" y2="' + (m.t + ph) + '" stroke="var(--ink)" stroke-width="1" visibility="hidden"/><circle class="xd" r="4.5" fill="var(--ink)" visibility="hidden"/>' +
    '<rect class="hit" x="' + m.l + '" y="0" width="' + pw + '" height="' + Ht + '" fill="transparent"/></svg>';
  const tip = box.querySelector('.tip'), live = box.querySelector('.sr-live'), svgEl = host.querySelector('svg'), xh = svgEl.querySelector('.xh'), xd = svgEl.querySelector('.xd'), hit = svgEl.querySelector('.hit');
  let kb = nowS >= t0 && nowS <= t1 ? nowS : t0, kbMode = false;
  const hIdx = sc ? new Map(D.H.t.map((s, i) => [s, i])) : null;
  const at = t => {
    t = clamp(t, t0, t1); kb = t; const v = TM.at(t); if (v == null) return;
    const x = X(t); xh.setAttribute('x1', x); xh.setAttribute('x2', x); xh.setAttribute('visibility', 'visible'); xd.setAttribute('cx', x); xd.setAttribute('cy', Y(cv(v))); xd.setAttribute('visibility', 'visible');
    const tr = tideTrendAt(TM, t), ls = localStr(t * 1000, off), ri = hIdx ? hIdx.get(ls.slice(0, 13) + ':00') : null, rr = ri != null && sc[ri] ? sc[ri] : null;
    tip.innerHTML = '<div>' + dayLabel(ls) + ' ' + fmtClock(ls) + '</div><div><i style="background:var(--water)"></i>Tide ' + L(v) + ' ' + lu() + (tr ? ', ' + tr : '') + '</div>' + (rr ? '<div><i style="background:var(--q' + rr.band + ')"></i>Surf ' + BANDS[rr.band].name + ' ' + rr.score + '</div>' : '');
    tip.hidden = false; const bw = box.clientWidth, tw = tip.offsetWidth; tip.style.left = clamp(x + 22 - (x > W * 0.6 ? tw + 24 : 0), 4, bw - tw - 4) + 'px'; tip.style.top = '8px';
    if (live && kbMode) live.textContent = Array.from(tip.children).map(k => k.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean).join('. ');
  };
  const show = ev => { const r = svgEl.getBoundingClientRect(); at(t0 + ((ev.clientX - r.left) * (W / r.width) - m.l) / pw * span); };
  svgEl.addEventListener('keydown', e => {
    const k = e.key, st = k === 'ArrowRight' ? 1800 : k === 'ArrowLeft' ? -1800 : k === 'PageUp' ? 10800 : k === 'PageDown' ? -10800 : 0; if (!st && k !== 'Home' && k !== 'End') return; e.preventDefault(); kbMode = true;
    at(k === 'Home' ? t0 : k === 'End' ? t1 : kb + st);
  });
  svgEl.addEventListener('blur', () => { kbMode = false; tip.hidden = true; xh.setAttribute('visibility', 'hidden'); xd.setAttribute('visibility', 'hidden'); });
  hit.addEventListener('pointermove', show); hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', () => { tip.hidden = true; xh.setAttribute('visibility', 'hidden'); xd.setAttribute('visibility', 'hidden'); });
}
function tideNav(act, D, sp) {
  if (act === 'prev') TVIEW.now = Math.max(0, TVIEW.now - 1); else if (act === 'next') TVIEW.now = TVIEW.now + 1; else TVIEW.now = 0;
  tideFillOne('tide-now', D, sp, 'now');
}
const kmBetween = (a, b, c, d) => { const R = 6371, r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const distTxt = km => S.units === 'imperial' ? f0(km * 0.621371) + ' mi' : f0(km) + ' km';
function agoTxt(t) { const m = Math.max(0, Math.round((Date.now() / 1000 - t) / 60)); return 'Reported ' + (m < 90 ? m + ' min' : Math.round(m / 60) + ' h') + ' ago'; }
const SW16 = DIRS16.map((n, i) => [n, i * 22.5]);
const swinDefault = sp => SW16.filter(d => angDiff(d[1], sp.face) <= 45).map(d => d[1]);
const swinCur = sp => winOf(sp) || swinDefault(sp);
const swinNames = sp => { const cur = new Set(swinCur(sp)), n = SW16.filter(d => cur.has(d[1])).map(d => d[0]); return n.length > 1 ? n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1] : n.join(''); };
function swinBlock(sp) {
  const cur = new Set(swinCur(sp)), own = !!winOf(sp);
  return '<div class="swin-ed"><h3 class="swin-h">Best swell directions <small>' + (own ? plural(cur.size, 'direction') + ' picked' : 'not picked, using ' + esc(swinNames(sp)) + ' from the beach direction') + '</small></h3>' +
    '<p class="note">Tap every direction the swell can come from for this spot to work. A point might work on W and NW, a beach on S, SW and W. The score, compass and map use your picks.</p>' +
    '<div class="swin-grid" role="group" aria-label="Best swell directions for ' + esc(sp.name) + '">' + SW16.map(d => '<button type="button" class="chip swin-b" data-swin="' + d[1] + '" aria-pressed="' + cur.has(d[1]) + '">' + d[0] + '</button>').join('') + '</div>' +
    '<div class="picker"><button type="button" class="btn sm" data-swin="reset"' + (own ? '' : ' disabled') + '>Use the beach direction instead</button></div></div>';
}
function swinHtml() {
  const sp = spotById(S.selId); if (!sp) return '';
  const cur = new Set(swinCur(sp)), own = !!winOf(sp), names = SW16.filter(d => cur.has(d[1])).map(d => d[0]);
  return '<details class="swin"' + (S.swinOpen ? ' open' : '') + '><summary>Swell directions for this spot <small>' + esc(names.join(', ')) + (own ? '' : ' (default from the beach facing)') + '</small></summary>' +
    '<p class="note">Tap every direction swell can come from for this spot to work. For example south, southwest, west and northwest, or north and northwest. The score, compass and map use your picks.</p>' +
    '<div class="swin-grid" role="group" aria-label="Swell directions that work at ' + esc(sp.name) + '">' + SW16.map(d => '<button type="button" class="chip swin-b" data-swin="' + d[1] + '" aria-pressed="' + cur.has(d[1]) + '">' + d[0] + '</button>').join('') + '</div>' +
    '<div class="modal-btns" style="margin-top:8px"><button type="button" class="btn sm" data-swin="reset"' + (own ? '' : ' disabled') + '>Reset to default</button></div></details>';
}
function swinChanged(sp) {
  S.detail.forEach(D => { D._sc = {}; }); S.scan.delete(sp.id);
  const D = S.detail.get(sp.id); if (S.selId === sp.id) { if (D) renderDetail(D, sp); else renderHead(null, sp); } renderRank(); renderMarkers(); scanRegion();
}
function wireSwin() {
  document.addEventListener('toggle', e => { if (e.target.classList && e.target.classList.contains('swin')) S.swinOpen = e.target.open; }, true);
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-swin]'); if (!b || b.disabled) return;
    const sp = spotById(S.selId); if (!sp) return;
    if (b.dataset.swin === 'reset') { delete S.wins[sp.id]; store.set('wins', S.wins); swinChanged(sp); toast('Swell directions reset for ' + sp.name + '.'); return; }
    const cur = new Set(swinCur(sp)), d = +b.dataset.swin; if (cur.has(d)) cur.delete(d); else cur.add(d);
    if (!cur.size) { delete S.wins[sp.id]; store.set('wins', S.wins); swinChanged(sp); toast('No directions picked, so ' + sp.name + ' is back to its default.'); return; }
    S.wins[sp.id] = Array.from(cur).sort((a, b2) => a - b2); store.set('wins', S.wins); swinChanged(sp);
  });
}
const compassSec = (D, i, pre) => '<div class="sec" id="compass-sec"><h2>Compass <small>swell and wind directions</small></h2><div class="card cmp"><div class="cmp-fig" data-tile="swell1" role="button" tabindex="0" aria-label="Swell compass: show details" id="' + pre + '-fig"></div><div class="cmp-leg" id="' + pre + '-leg"></div></div><div class="cmp-ctl">' + (pre === 'cmp' ? '<button class="btn sm" id="cmp-play" type="button" aria-pressed="false">Play</button>' : '') + '<span>Hours ahead</span><input type="range" id="' + pre + '-i" min="0" max="' + Math.max(0, Math.min(D.H.t.length - 1 - i, 120)) + '" step="1" value="0" aria-label="Hours ahead"><output id="' + pre + '-t" for="' + pre + '-i">Now</output></div><p class="note">Each arrow points the way it is travelling and its dot marks where it comes from. Its compass heading sits beside it. Press Play to step through the forecast hours. Swell arrows sit inside the ring, wind outside. The green wedge is this spot\u2019s swell window: swell from inside the bright part hits the beach head on, the paler part still works, and anything outside is blocked.</p>' + swinHtml() + '</div>';
/* Play steps the compass through the forecast hours; it stops on drag, re-render or leaving the spot */
let CMPPLAY = 0;
function cmpStop() { if (CMPPLAY) clearInterval(CMPPLAY); CMPPLAY = 0; const b = $('#cmp-play'); if (b) { b.textContent = 'Play'; b.setAttribute('aria-pressed', 'false'); } }
function cmpPlay(on) {
  if (!on) { cmpStop(); return; }
  const sp = spotById(S.selId), D = S.detail.get(S.selId), scr = $('#cmp-i'), b = $('#cmp-play'); if (!sp || !D || !scr || !b) return;
  const max = +scr.max; if (max < 1) return;
  if (+scr.value >= max) scr.value = '0';
  b.textContent = 'Pause'; b.setAttribute('aria-pressed', 'true');
  CMPPLAY = setInterval(() => {
    if (!$('#cmp-fig')) { cmpStop(); return; }
    let k = +scr.value + 1; if (k > max) k = 0;
    scr.value = String(k); renderCompass(D, sp, k, 'cmp');
  }, 500);
}
function renderCompass(D, spot, k, pre) {
  pre = pre || 'cmp'; const fig = $('#' + pre + '-fig'), leg = $('#' + pre + '-leg'); if (!fig || !leg) return;
  const i = clamp(hourIndexNow(D.H, D.off) + k, 0, D.H.t.length - 1), v = valAt(D.H, i), cur = D.current || {}, useCur = k === 0 && cur.wind_speed_10m != null;
  const wsp = useCur ? cur.wind_speed_10m : v.wsp, wdir = useCur && cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir, gust = useCur && cur.wind_gusts_10m != null ? cur.wind_gusts_10m : v.gust;
  const items = [], rows = [], dt = d => dirName(d) + ' ' + f0(norm360(d)) + '\u00b0';
  if (D.marineOk) {
    const pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, pD = v.sD != null ? v.sD : v.wD;
    if (pD != null) { items.push({ dir: pD, color: 'var(--s1)', w: 5, len: 52 }); rows.push(['var(--s1)', 'Primary swell', L(pH) + ' ' + lu() + ' at ' + f0(pT) + ' s', 'from ' + dt(pD) + ' \u00b7 ' + exposureWord(pD, SX(spot)) + ' here']); }
    if (v.s2H != null && v.s2H > 0.1 && v.s2D != null) { items.push({ dir: v.s2D, color: 'var(--s2)', w: 4, len: 42 }); rows.push(['var(--s2)', 'Secondary swell', L(v.s2H) + ' ' + lu() + ' at ' + f0(v.s2T) + ' s', 'from ' + dt(v.s2D) + ' \u00b7 ' + exposureWord(v.s2D, SX(spot)) + ' here']); }
    if (v.wwH != null && v.wwH > 0.15 && v.wwD != null) { items.push({ dir: v.wwD, color: 'var(--s3)', w: 3, len: 32 }); rows.push(['var(--s3)', 'Wind chop', L(v.wwH) + ' ' + lu() + ' at ' + f0(v.wwT) + ' s', 'from ' + dt(v.wwD)]); }
  }
  if (wdir != null) { const rel = windRel(wsp, wdir, spot.face); items.push({ dir: wdir, color: 'var(--ink)', w: 4, len: 46, ring: 'out' }); rows.push(['var(--ink)', 'Wind', SP(wsp) + ' ' + su() + ', gusts ' + SP(gust), 'from ' + dt(wdir) + ' \u00b7 ' + rel.label]); }
  rows.push(['var(--ok)', 'Best swell for this spot', winOf(spot) ? 'from ' + windowText(SX(spot)) : 'from ' + dt(spot.face), winOf(spot) ? 'The green wedge shows the swell directions you picked for this spot, with a paler shoulder on each side. Change them under the compass.' : 'Green wedge: full exposure from ' + windowText(SX(spot)) + ', partial out to ' + dirName(spot.face - 90) + ' and ' + dirName(spot.face + 90) + '. The beach faces ' + dirName(spot.face) + '.']);
  fig.innerHTML = compassSvg(SX(spot), items, 'Compass rose for ' + spot.name + ': ' + rows.map(r => r[1] + ' ' + r[3]).join('; '));
  leg.innerHTML = rows.map(r => '<div class="lg"><i' + (r[0] === 'sand' ? ' class="sand"' : ' style="background:' + r[0] + '"') + '></i><div><b>' + r[1] + '</b> ' + r[2] + '<br><span>' + r[3] + '</span></div></div>').join('');
  $('#' + pre + '-t').textContent = k === 0 ? 'Now' : WD[dow(D.H.t[i])] + ' ' + fmtHr(D.H.t[i]);
}
function buoyCards(d, D, compact) {
  const g = (k, h) => buoyLatest(d, k, h || 6), kph = ms => ms * 3.6, v = valAt(D.H, hourIndexNow(D.H, D.off));
  const wv = g('wvht'), dp = g('dpd'), ap = g('apd'), md = g('mwd'), sh = g('swh'), sp = g('swp'), sd = g('swd'), wh = g('wwh'), wp = g('wwp'), ws = g('wspd'), gs = g('gst'), wdr = g('wdir'), wt = g('wtmp'), at = g('atmp'), pr = g('pres'), pt = g('ptdy');
  let h = '';
  if (wv) h += stat('Buoy waves', L(wv.v), lu(), (dp ? f0(dp.v) + ' s dominant' : '') + (md ? ' from ' + dirName(md.v) + ' ' + arrowSvg(md.v + 180, 14, 'travel direction') : '') + (ap && !compact ? '<br>Average period ' + f0(ap.v) + ' s' : '') + (D.marineOk && v.wH != null ? '<br>Model here ' + L(v.wH) + ' ' + lu() : '') + '<br>' + agoTxt(wv.t));
  if (sh) h += stat('Buoy swell', L(sh.v), lu(), (sp ? f0(sp.v) + ' s' : '') + (sd ? ' from ' + dirName(sd.v) + ' ' + arrowSvg(sd.v + 180, 14, 'travel direction') : '') + (wh ? '<br>Wind waves ' + L(wh.v) + ' ' + lu() + (wp ? ' at ' + f0(wp.v) + ' s' : '') : ''));
  if (ws) h += stat('Buoy wind', SP(kph(ws.v)), su(), (wdr ? 'from ' + dirName(wdr.v) + ' ' + arrowSvg(wdr.v + 180, 14, 'wind direction') : '') + (gs ? '<br>Gusts ' + SP(kph(gs.v)) + ' ' + su() : ''));
  if (wt) h += stat('Buoy water', TP(wt.v), tu(), esc(wetsuit(wt.v) || ''));
  if (!compact) {
    if (at) h += stat('Buoy air', TP(at.v), tu(), '');
    if (pr) h += stat('Buoy pressure', f0(pr.v), 'hPa', pt ? (pt.v > 0.6 ? 'Rising' : pt.v < -0.6 ? 'Falling' : 'Steady') + ' over 3 h' : '');
  }
  return h;
}
async function fillBuoyNow(D, spot) {
  if (S.mode !== 'live' || !$('#buoy-now')) return;
  try {
    const b = await pickBuoy(spot); const box = $('#buoy-now'); if (S.selId !== spot.id || !box) return;
    const cards = buoyCards(b.data, D, true); if (!cards) return;
    box.hidden = false; box.innerHTML = '<h2><span class="bn">Nearest buoy</span> <small>' + esc(b.station.name) + ' \u00b7 ' + distTxt(b.station.km) + ' away</small></h2><div class="grid">' + cards + '</div><p class="note">Real readings from NOAA. A buoy sits offshore, so the surf at the beach will likely differ. Charts for the last few days are under Buoys, below.</p>';
  } catch (e) { /* the Forecast tab explains buoy errors */ }
}
async function loadBuoySection(D, spot) {
  const body = $('#buoy-body'); if (!body) return;
  if (S.mode !== 'live') { body.innerHTML = '<p class="bnote">Buoy observations load when the app is live.</p>'; return; }
  body.innerHTML = '<div class="skel">Looking up nearby buoys\u2026</div>';
  try {
    const b = await pickBuoy(spot); if (S.selId !== spot.id || !$('#buoy-body')) return;
    const chips = b.stations.slice(0, 8).map(s => '<button type="button" class="chip" data-bid="' + esc(s.id) + '" aria-pressed="' + (s.id === b.station.id) + '">' + esc(s.id.toUpperCase()) + '<small>' + distTxt(s.km) + (s.type === 'buoy' ? '' : ' \u00b7 ' + esc(s.type)) + '</small></button>').join('');
    const days = [[1, '24 h'], [3, '3 days'], [5, '5 days']].map(d => '<button type="button" class="chip" data-bd="' + d[0] + '" aria-pressed="' + (BU.days === d[0]) + '">' + d[1] + '</button>').join('');
    const cards = buoyCards(b.data, D, false);
    body.innerHTML = '<div class="bchips">' + chips + '</div><div id="buoy-five"></div><div class="bnote"><b>' + esc(b.station.name) + '</b> \u00b7 ' + distTxt(b.station.km) + ' from this spot' + (b.station.owner ? ' \u00b7 ' + esc(b.station.owner) : '') + ' \u00b7 <a target="_blank" rel="noopener noreferrer" href="https://www.ndbc.noaa.gov/station_page.php?station=' + encodeURIComponent(b.station.id) + '">station page</a></div>' +
      (cards ? '<div class="grid">' + cards + '</div>' : '<div class="err">This station has no recent readings. Try another one above.</div>') +
      '<div class="ctl"><div class="chips">' + days + '</div></div><div id="bspec" data-id="' + esc(b.station.id) + '"></div><div id="bcharts" style="display:grid;gap:12px"></div><p class="bnote">Observations from NOAA National Data Buoy Center, shown in local time at the spot. Gaps mean the buoy didn’t report that value. Waves are measured at the buoy, not at your beach.</p>';
    mountBuoyCharts(b.data, D, spot); fillSpectra(b.station.id); fillNearFive(spot, b.stations.slice(0, 5), b.station.id);
  } catch (e) {
    if (S.selId !== spot.id || !$('#buoy-body')) return;
    const known = BU.near.get(spot.lat.toFixed(2) + ',' + spot.lon.toFixed(2)) || [], sel = BU.sel.get(spot.id);
    const chips = known.length ? '<div class="bchips">' + known.slice(0, 8).map(s => '<button type="button" class="chip" data-bid="' + esc(s.id) + '" aria-pressed="' + (s.id === sel) + '">' + esc(s.id.toUpperCase()) + '<small>' + distTxt(s.km) + (s.type === 'buoy' ? '' : ' \u00b7 ' + esc(s.type)) + '</small></button>').join('') + '</div>' : '';
    $('#buoy-body').innerHTML = chips + '<div class="err"><b>' + (sel ? 'That station has no recent readings.' : 'Buoy data is not available right now.') + '</b><div class="note" style="margin-top:4px">' + esc(e.message || 'network error') + '</div></div><p class="bnote">You can also check <a target="_blank" rel="noopener noreferrer" href="https://www.ndbc.noaa.gov/">NOAA NDBC</a> directly.</p>';
  }
}
async function fillSpectra(id) {
  const box = $('#bspec'); if (!box) return;
  box.innerHTML = '<div class="skel">Loading the swell spectrum\u2026</div>';
  try {
    const sp = await apiGet('/api/spectra/' + encodeURIComponent(id), 20000), now = $('#bspec'); if (!now || now.dataset.id !== id) return;
    now.innerHTML = spectraHtml(sp);
  } catch (e) { const now = $('#bspec'); if (now && now.dataset.id === id) now.innerHTML = '<p class="bnote">This station does not publish a wave spectrum, so there is no swell breakdown for it.</p>'; }
}
/* the five nearest stations side by side, sorted by distance, with a short read of how they agree */
async function fillNearFive(spot, list, selId) {
  const box = $('#buoy-five'); if (!box || !list.length) return;
  box.innerHTML = '<div class="skel">Comparing the nearest five buoys…</div>';
  const res = await Promise.allSettled(list.map(s => buoyObs(s.id)));
  if (S.selId !== spot.id || !$('#buoy-five')) return;
  const nowS = Date.now() / 1000;
  const rows = list.map((s, i) => {
    const d = res[i].status === 'fulfilled' ? res[i].value : null, T = d && d.std && d.spec ? Math.max(-Infinity, ...d.std.t, ...d.spec.t) : -Infinity;
    if (!isFinite(T)) return { s, ok: false };
    const g = k => buoyLatest(d, k, 6);
    return { s, ok: true, age: (nowS - T) / 60, wv: g('wvht'), per: g('dpd'), dir: g('mwd'), wd: g('wdir'), ws: g('wspd'), wt: g('wtmp') };
  });
  const ageTxt = r => r.age < 60 ? Math.round(r.age) + ' min ago' : Math.round(r.age / 60) + ' h ago';
  const tr = r => {
    const id = esc(r.s.id), btn = '<button type="button" class="chip" data-bid="' + id + '" aria-pressed="' + (r.s.id === selId) + '">' + id.toUpperCase() + '</button>';
    const wave = r.ok && r.wv ? L(r.wv.v) + ' ' + lu() : '–';
    const per = r.ok && r.per ? f0(r.per.v) + ' s' : '–';
    const dir = r.ok && r.dir ? dirName(r.dir.v) : '–';
    const wind = r.ok && r.ws ? SP(r.ws.v * 3.6) + ' ' + su() + (r.wd ? ' from ' + dirName(r.wd.v) : '') : '–';
    const wat = r.ok && r.wt ? TP(r.wt.v) + ' ' + tu() : '–';
    return '<tr><td>' + btn + '<br><small>' + esc(r.s.name) + '</small></td><td>' + distTxt(r.s.km) + '</td><td>' + esc(r.s.type) + '</td><td>' + wave + '</td><td>' + per + '</td><td>' + dir + '</td><td>' + wind + '</td><td>' + wat + '</td><td>' + (r.ok ? ageTxt(r) : 'no data') + '</td></tr>';
  };
  const notes = buoyNotes(rows, spot);
  box.innerHTML = '<h3 class="spec-h">Nearest five buoys <small>sorted by distance from this spot</small></h3><div class="tablewrap"><table class="t"><thead><tr><th>Buoy</th><th>Distance</th><th>Type</th><th>Waves</th><th>Period</th><th>Swell from</th><th>Wind</th><th>Water</th><th>Reported</th></tr></thead><tbody>' + rows.map(tr).join('') + '</tbody></table></div>' +
    '' + buoyRoseHtml(rows, spot) + '<h3 class="spec-h">What the five say together</h3><ul style="margin:6px 0 0 18px;line-height:1.5">' + notes.map(n => '<li>' + n + '</li>').join('') + '</ul>' +
    '<p class="bnote">Five separate sensors, not one model. Treat their agreement as a clue about the swell, not a forecast.</p>';
}
/* plain-English read across the buoy rows: agreement in height, direction, period and wind */
function buoyNotes(rows, spot) {
  const out = [], waves = rows.filter(r => r.ok && r.wv), rad = Math.PI / 180;
  if (waves.length >= 2) {
    const near = waves[0], far = waves[waves.length - 1], hs = waves.map(r => r.wv.v), lo = Math.min(...hs), hi = Math.max(...hs);
    if (hi <= 1.25 * lo) out.push('Wave height agrees across the ' + waves.length + ' wave buoys (' + L(lo) + ' to ' + L(hi) + ' ' + lu() + '), so the swell is uniform along this stretch of coast.');
    else if (near.wv.v < 0.75 * far.wv.v) out.push('Waves are smaller at ' + esc(near.s.id.toUpperCase()) + ' (' + L(near.wv.v) + ' ' + lu() + ') than at ' + esc(far.s.id.toUpperCase()) + ' (' + L(far.wv.v) + ' ' + lu() + ') further out. Something between them, such as a point, reef or shallow shelf, probably takes energy out, so the beach may run smaller than the offshore buoy.');
    else if (near.wv.v > 1.25 * far.wv.v) out.push('Waves are bigger at ' + esc(near.s.id.toUpperCase()) + ' than further out. That usually means local wind chop, or a bay or shelf building the waves. Check the wind before you trust the height.');
    else out.push('Heights differ only a little between the wave buoys, so the swell is reasonably consistent.');
    const pr = waves.filter(r => r.per);
    if (pr.length >= 2) {
      const pn = pr[0], pf = pr[pr.length - 1];
      if (pf.per.v - pn.per.v >= 2) out.push('Periods get longer further out (' + f0(pf.per.v) + ' s at ' + esc(pf.s.id.toUpperCase()) + ', ' + f0(pn.per.v) + ' s at ' + esc(pn.s.id.toUpperCase()) + '). Longer-period swell carries more energy, and the nearshore waves should grow as it arrives.');
      else out.push('Periods match across the wave buoys, so one swell is reaching the coast without spreading out much.');
    }
  }
  const dd = rows.filter(r => r.ok && r.dir).map(r => r.dir.v);
  if (dd.length >= 2) {
    const mean = norm360(Math.atan2(dd.reduce((a, d) => a + Math.sin(d * rad), 0), dd.reduce((a, d) => a + Math.cos(d * rad), 0)) / rad), spread = Math.max(...dd.map(d => angDiff(d, mean)));
    if (spread <= 30) out.push('Swell comes from ' + dirName(mean) + ' at every wave buoy (within ' + Math.round(spread) + '°), so a single swell system is arriving.');
    else out.push('Wave directions differ by up to ' + Math.round(spread) + '° between buoys, so more than one swell is mixing in. The swell window for this spot matters more than usual.');
  }
  const w = rows.find(r => r.ok && r.wd && r.ws);
  if (w && spot.face != null) {
    const rel = angDiff(w.wd.v, spot.face + 180), word = rel <= 45 ? 'offshore' : rel >= 135 ? 'onshore' : 'cross-shore';
    out.push('Wind at ' + esc(w.s.id.toUpperCase()) + ' (' + SP(w.ws.v * 3.6) + ' ' + su() + ' from ' + dirName(w.wd.v) + ', ' + distTxt(w.s.km) + ' away) is ' + word + ' for this beach, which ' + (word === 'offshore' ? 'holds the waves up' : word === 'onshore' ? 'chops up the waves' : 'partly disrupts the waves') + '.');
  }
  if (!out.length) out.push('The five buoys have not reported enough recent readings to compare.');
  return out;
}
function mountBuoyCharts(d, D, spot) {
  const host = $('#bcharts'); if (!host) return;
  const hr = buoyHourly(d, BU.days * 24, D.off); if (!hr) { host.innerHTML = '<p class="bnote">No observations to chart.</p>'; return; }
  const has = k => hr[k] && hr[k].some(v => v != null), conv = (a, f) => a.map(v => (v == null ? null : f(v)));
  const t = hr.t, i0 = 0, i1 = hr.n - 1, every = hr.n > 72 ? 6 : hr.n > 30 ? 3 : 2, add = box => { host.appendChild(box); mountChart(box); };
  const ser = list => list.filter(x => has(x[0])).map(x => ({ label: x[1], color: x[2], data: x[3] ? conv(hr[x[0]], x[3]) : hr[x[0]], dash: x[4], w: x[4] ? 1.25 : 2 }));
  const len = m => cvLen(m, S.units), kmh = ms => cvSpd(ms * 3.6, S.units), tmp = c => cvTmp(c, S.units);
  const dirsW = has('mwd') ? hr.mwd : has('swd') ? hr.swd : null;
  let s = ser([['wvht', 'Significant waves', 'var(--s1)', len], ['swh', 'Swell', 'var(--s2)', len, '4 3'], ['wwh', 'Wind waves', 'var(--s3)', len, '4 3']]);
  if (s.length) add(makeChart('Buoy wave height', lu() + ', measured at the buoy', { t, i0, i1, nowIdx: null, series: s, unit: lu(), type: 'line', min: 0, arrows: dirsW ? { dirs: dirsW, every } : null }));
  s = ser([['dpd', 'Dominant period', 'var(--s1)'], ['apd', 'Average period', 'var(--s2)', null, '4 3'], ['swp', 'Swell period', 'var(--s3)', null, '4 3']]);
  if (s.length) add(makeChart('Buoy wave period', 'seconds', { t, i0, i1, nowIdx: null, series: s, unit: 's', type: 'line', min: 0 }));
  s = ser([['wspd', 'Wind', 'var(--s1)', kmh], ['gst', 'Gusts', 'var(--s2)', kmh, '4 3']]);
  if (s.length) add(makeChart('Buoy wind', su(), { t, i0, i1, nowIdx: null, series: s, unit: su(), type: 'line', min: 0, arrows: has('wdir') ? { dirs: hr.wdir, every } : null, fmt: (v, se, i) => f0(v) + ' ' + su() + (se.label === 'Wind' && hr.wdir[i] != null ? ' from ' + dirName(hr.wdir[i]) : '') }));
  s = ser([['pres', 'Pressure', 'var(--s1)']]);
  if (s.length) add(makeChart('Buoy pressure', 'hPa', { t, i0, i1, nowIdx: null, series: s, unit: 'hPa', type: 'line' }));
  s = ser([['wtmp', 'Water', 'var(--s3)', tmp], ['atmp', 'Air', 'var(--s2)', tmp]]);
  if (s.length) add(makeChart('Buoy water and air temperature', tu(), { t, i0, i1, nowIdx: null, series: s, unit: tu(), type: 'line' }));
  if (!host.children.length) host.innerHTML = '<p class="bnote">This station reports no chartable values. Try another one above.</p>';
}
function plannerHTML(D, spot, days) {
  const sc = scoresOf(D, spot), tideArr = planActive() ? tideHourly(D) : null, nowI = hourIndexNow(D.H, D.off), kc = calibFactor(S.log, spot.id).k, beg = S.prof.level === 'beginner', HRS = []; for (let h = 4; h <= 20; h++) HRS.push(h);
  let h = '<div class="planner" id="planner"><div class="pl-axis"><span></span>' + HRS.map(x => '<span>' + ([4, 8, 12, 16, 20].includes(x) ? (x % 12 || 12) + (x < 12 ? 'a' : 'p') : '') + '</span>').join('') + '</div>';
  for (let d = 0; d < days; d++) {
    const date = D.daily.time[d]; if (!date) break;
    const [h0, h1] = lightRange(D.daily.sunrise[d], D.daily.sunset[d]);
    h += '<div class="pl-row"><b>' + dayLabel(date) + '</b>' + HRS.map(hr => {
      const idx = D.H.t.indexOf(date + 'T' + String(hr).padStart(2, '0') + ':00'), r = idx >= 0 ? sc[idx] : null;
      if (!r) return '<span class="pl-cell dark"></span>';
      const night = hr < h0 || hr > h1, cz = beg && !night ? cautV(valAt(D.H, idx), spot, kc) : null;
      return '<button type="button" class="pl-cell' + (idx < nowI ? ' past' : '') + (night ? ' dark' : '') + (cz ? ' cz' : '') + (!night && planActive() && !planHourOk(D, spot, idx, tideArr) ? ' pl-off' : '') + '" data-i="' + idx + '"' + (night ? '' : ' data-b="' + r.band + '"') + ' aria-pressed="false" aria-label="' + dayLabel(date) + ' ' + hr + ':00 score ' + r.score + (cz ? ', caution: surf above 4 feet' : '') + '">' + (night ? '' : r.score) + (cz ? '<i class="czm" aria-hidden="true">!</i>' : '') + '</button>';
    }).join('') + '</div>';
  }
  return h + '</div><div class="legend" style="margin-top:8px">' + BANDS.map((b, k) => '<span><i style="background:var(--q' + k + ')"></i>' + b.name + '</span>').join('') + '<span>Blank = dark</span>' + (beg ? '<span><i class="czk">!</i>Caution, over ' + cautLim() + '</span>' : '') + '</div>';
}
function readoutFor(D, spot, i) {
  const v = valAt(D.H, i), r = scoresOf(D, spot)[i]; if (!r) return 'No wave data for this hour.'; const cz = cautV(v, spot);
  const pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, pD = v.sD != null ? v.sD : v.wD, rel = windRel(v.wsp, v.wdir, spot.face);
  return '<b>' + dayLabel(v.t) + ' ' + fmtHr(v.t) + '</b> · ' + BANDS[r.band].name + ' ' + r.score + '<br>' + L(pH) + ' ' + lu() + ' @ ' + f0(pT) + ' s ' + dirName(pD) + ' · wind ' + SP(v.wsp) + ' ' + su() + ' ' + dirName(v.wdir) + ' (' + rel.label.toLowerCase() + ')' + (v.tide != null ? ' · tide ' + L(v.tide) + ' ' + lu() : '') + (cz ? '<br>' + cautionShort(cz) : '');
}
function dayCaut(D, spot, idx, kc) {
  let top = null; idx.forEach(k => { const c = cautV(valAt(D.H, k), spot, kc); if (c && (!top || c.hiM > top.hiM)) top = c; });
  return top ? '<br><span class="dcaut">Caution: up to ' + rr(top.hiM) + ' ' + lu() + '</span>' : '';
}
function dayCardsHTML(D, spot) {
  const sc = scoresOf(D, spot), kc = calibFactor(S.log, spot.id).k, beg = S.prof.level === 'beginner'; let h = '<div class="days">';
  D.daily.time.forEach((date, d) => {
    const bw = bestWindow(D.H, sc, date, D.daily.sunrise[d], D.daily.sunset[d]);
    const idx = D.H.t.map((t, k) => k).filter(k => D.H.t[k].startsWith(date) && parseT(D.H.t[k]).h >= 6 && parseT(D.H.t[k]).h <= 18);
    const hs = idx.map(k => (D.H.sH[k] != null ? D.H.sH[k] : D.H.wH[k])).filter(x => x != null), ws = idx.map(k => D.H.wsp[k]).filter(x => x != null);
    const lo = hs.length ? Math.min(...hs) : null, hi = hs.length ? Math.max(...hs) : null, wa = ws.length ? ws.reduce((a, b) => a + b, 0) / ws.length : null;
    h += '<div class="day"' + (bw && bandOf(bw.avg) >= 3 ? ' data-b="' + bandOf(bw.avg) + '"' : '') + '>' + dayWaveSvg(hi != null ? hi * M2FT : 0, bw ? bandOf(bw.avg) : 0) + '<div class="in"><div class="d">' + dayLabel(date) + '</div><div class="h">' + (bw ? Math.round(bw.avg) + ' <small>' + BANDS[bandOf(bw.avg)].name + '</small>' : '–') + '</div><div class="w">' + (bw ? fmtHr(D.H.t[bw.i0]).replace(' ', '') + '–' + fmtHr(D.H.t[bw.i1 + 1] || D.H.t[bw.i1]).replace(' ', '') : 'no window') + '<br>' + (lo != null ? L(lo) + '–' + L(hi) + ' ' + lu() : '') + '<br>wind ' + (wa != null ? SP(wa) + ' ' + su() : '–') + (beg ? dayCaut(D, spot, idx, kc) : '') + '</div><div class="sc"' + (bw ? ' data-b="' + bandOf(bw.avg) + '"' : '') + '></div></div></div>';
  });
  return h + '</div>';
}
function tableHTML(D, spot, days) {
  const sc = scoresOf(D, spot), n = Math.min(D.H.t.length, days * 24); let h = '<div class="tablewrap"><table class="t"><thead><tr><th>Time</th><th>Score</th><th>Swell</th><th>Wind</th><th>Tide</th><th>Air</th></tr></thead><tbody>'; let lastDay = '';
  for (let i = 0; i < n; i += 3) {
    const t = D.H.t[i], day = t.slice(0, 10); if (day !== lastDay) { h += '<tr class="dayrow"><td colspan="6">' + dayLabel(t) + '</td></tr>'; lastDay = day; }
    const v = valAt(D.H, i), r = sc[i], pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, pD = v.sD != null ? v.sD : v.wD;
    h += '<tr><td>' + fmtHr(t) + '</td><td>' + (r ? r.score + ' ' + BANDS[r.band].name : '–') + '</td><td>' + (pH != null ? L(pH) + ' ' + lu() + ' @ ' + f0(pT) + ' s ' + dirName(pD) : '–') + '</td><td>' + SP(v.wsp) + ' ' + su() + ' ' + dirName(v.wdir) + ' ' + windRel(v.wsp, v.wdir, spot.face).label.toLowerCase() + '</td><td>' + (v.tide != null ? L(v.tide) + ' ' + lu() : '–') + '</td><td>' + TP(v.temp) + tu() + '</td></tr>';
  }
  return h + '</tbody></table></div>';
}
function renderForecast(D, spot) {
  const root = $('#tab-forecast'), days = S.range;
  const bw0 = D.marineOk ? upcomingWindow(D, spot, hourIndexNow(D.H, D.off)) : null, bwSum = bw0 ? winText(D, bw0) + ', ' + BANDS[bandOf(bw0.avg)].name.toLowerCase() : '';
  let h = '<div class="pane">';
  const chips = '<div class="chips" id="range" role="group" aria-label="Days shown">' + [3, 5, 7, 10, 14].map(d => '<button type="button" class="chip" data-r="' + d + '" aria-pressed="' + (d === days) + '">' + d + ' days</button>').join('') + '</div>';
  if (D.marineOk) {
    h += '<div class="sec" id="best-days"><h2>Next days <small>best 3-hour daylight window each day</small></h2>' + chips + dayCardsHTML(D, spot) + dayRadarHtml(D, spot) + '</div>';
    h += '<div class="sec" id="planner-sec"' + sumAttr(bwSum) + '><h2>Hour by hour <small>surf score, tap an hour</small></h2><details class="spotedit plf"' + (S.plfOpen || planActive() ? ' open' : '') + '><summary>Filter hours by tide or wind' + (planActive() ? ', filter on' : '') + '</summary>' + planFilterHtml(D, spot) + '</details>' + plannerHTML(D, spot, days) + planMatchHtml(D, spot) + '<div class="readout" id="readout">Tap an hour to see its swell, wind and tide.</div><p class="note"><button class="btn sm" data-act="ics" type="button">Add best windows to calendar</button> Good-or-better daylight windows in the days shown, as an .ics file.</p>' + dialsHtml(D, spot) + '</div>';
  } else h += '<div class="sec" id="best-days"><h2>Next days</h2>' + chips + '</div>';
  const hv = D.marineOk ? D.H.wH.slice(0, S.range * 24).filter(x => x != null) : [];
  const fbSum = hv.length ? 'up to ' + L(Math.max.apply(null, hv)) + ' ' + lu() + ' over ' + S.range + ' days' : '';
  h += '<div class="sec" id="fbody"' + sumAttr(fbSum) + '><h2>' + (D.marineOk ? 'Swell and wind' : 'Wind') + ' <small>hourly, local time at the spot</small></h2>' +
    '<div class="ctl"><div class="seg" id="fview" role="group" aria-label="Hourly view"><button type="button" data-f="chart" aria-pressed="' + (S.fview === 'chart') + '">Charts</button><button type="button" data-f="table" aria-pressed="' + (S.fview === 'table') + '">Table</button></div></div>' +
    (S.fview === 'table' ? '<div id="charts">' + tableHTML(D, spot, S.range) + '</div>' : '<div id="charts" style="display:grid;gap:12px"></div>') +
    '<p class="note">Days 8 to 14 carry much more uncertainty than the first few: treat them as a trend, not a plan.</p></div>';
  h += '</div>';
  root.innerHTML = h; foldPane(root);
  if (S.fview === 'chart') { mountForecastCharts(D, spot, 'core'); mountForecastCharts(D, spot, 'more'); }
  if (S.xopen) renderXfc(D, spot); else { stopAnim(); stopReplay(); $('#tab-xfc').innerHTML = ''; }
}
/* the extra forecast sections, shown under "More detail" */
function renderXfc(D, spot) {
  const root = $('#tab-xfc'); let h = '<div class="pane">';
  h += animSection(D) + replaySection(D);
  h += tideSecHtml('tides-fc', 'Tides ahead', 'highs, lows and the curve for the whole range');
  h += accSecHtml();
  h += '<div class="sec" id="mc-sec"><h2>Model comparison <small>do the forecast models agree?</small></h2><div id="mc-body">' + (D.mc ? '' : mcIntro()) + '</div></div>';
  h += '<div class="sec" id="buoy-sec"><h2>Buoys <small>observed, NOAA NDBC</small></h2><div class="buoys" id="buoy-body"><div class="skel">Looking up nearby buoys…</div></div></div>';
  h += '</div>';
  stopAnim(); stopReplay(); root.innerHTML = h; foldPane(root); mountAnim(D, spot); mountReplay(D, spot);
  loadBuoySection(D, spot); if (D.mc) mountModels(D, spot);
  fillAccuracy(D, spot); fillTides(D, spot);
}
const STABS = [['now', 'Now'], ['forecast', 'Forecast'], ['more', 'More']];
function stabsHtml() { return '<nav class="stabs" id="stabs" aria-label="Spot sections">' + STABS.map(([k, l]) => '<button type="button" data-stab="' + k + '" aria-pressed="' + (S.stab === k) + '">' + l + '</button>').join('') + '</nav>'; }
/* Now, Forecast or More. More holds the extra sections, so they are only rendered while it is selected. */
function setStab(t) {
  if (!STABS.some(s => s[0] === t)) t = 'now';
  S.stab = t; S.xopen = t === 'more';
  const dt = $('#detail'); if (dt) { dt.dataset.stab = t; dt.scrollTop = 0; }
  document.querySelectorAll('#stabs button[data-stab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stab === t)));
  const sp = spotById(S.selId), D = sp && S.detail.get(sp.id);
  if (t === 'more') { if (D) { renderXnow(D, sp); renderXfc(D, sp); } }
  else { stopAnim(); stopReplay(); stopScenes(); $('#tab-xnow').innerHTML = ''; $('#tab-xfc').innerHTML = ''; }
  applyLayoutAll();
}
/* sections that start open; any other section starts closed until the user opens it (the choice is kept on this device) */
const FOLD_OPEN = ['rightnow', 'best-days', 'planner-sec'];
function foldOpen(k) { const f = S.fold || {}; return Object.prototype.hasOwnProperty.call(f, k) ? !!f[k] : FOLD_OPEN.includes(k); }
function sumAttr(s) { return s ? ' data-sum="' + esc(s) + '"' : ''; }
/* each section on a spot-page tab gets a title row that opens and closes it. A closed section keeps its full width, so charts drawn in it stay correct when it opens. */
function foldPane(root) {
  if (!root) return;
  Array.from(root.querySelectorAll('.pane > .sec')).forEach((sec, n) => {
    const h = sec.querySelector(':scope > h2'); if (!h) return;
    const key = sec.id || ('sec-' + n);
    sec.dataset.fk = key;
    if (!sec.querySelector(':scope > .sec-b')) {
      const body = document.createElement('div'); body.className = 'sec-b'; body.id = key + '-fold';
      const inner = document.createElement('div'); inner.className = 'sec-i'; body.appendChild(inner);
      Array.from(sec.childNodes).forEach(nd => { if (nd !== h && !(nd.classList && nd.classList.contains('lay-bar'))) inner.appendChild(nd); });
      sec.appendChild(body);
      const sub = h.querySelector('small');
      const name = Array.from(h.childNodes).filter(nd => nd !== sub).map(nd => nd.textContent).join('').trim();
      const sum = sec.dataset.sum || (sub ? sub.textContent : '');
      h.innerHTML = '<button type="button" class="sec-tog" aria-controls="' + body.id + '"><span class="sec-name">' + esc(name) + '</span>' + (sub ? sub.outerHTML : '') + '<span class="sec-sum">' + esc(sum) + '</span></button>';
    }
    const open = foldOpen(key);
    sec.classList.toggle('fold-closed', !open);
    const t = sec.querySelector(':scope > h2 > .sec-tog'); if (t) t.setAttribute('aria-expanded', String(open));
  });
}
function toggleFold(btn) {
  const sec = btn.closest('.sec'); if (!sec || !sec.dataset.fk) return;
  const open = sec.classList.contains('fold-closed');
  sec.classList.toggle('fold-closed', !open); btn.setAttribute('aria-expanded', String(open));
  S.fold = Object.assign({}, S.fold || {}, { [sec.dataset.fk]: open }); store.set('fold', S.fold);
}

const ANIM = { raf: 0, playing: false, pos: 0, speed: 3, last: 0, vis: true, io: null };
function stopAnim() { if (ANIM.raf) cancelAnimationFrame(ANIM.raf); ANIM.raf = 0; ANIM.playing = false; if (ANIM.io) { ANIM.io.disconnect(); ANIM.io = null; } }
const lerpAng = (a, b, f) => { if (a == null) return b; if (b == null) return a; const d = ((b - a + 540) % 360) - 180; return norm360(a + d * f); };
const lerpN = (a, b, f) => (a == null ? b : b == null ? a : a + (b - a) * f);
const animSection = D => '<div class="sec" id="an-sec"><h2>Forecast timelapse <small>play the next ' + S.range + ' days</small></h2>' +
  '<div class="card scene-card"><canvas class="scene" id="an-scene" role="img" aria-label="Animated lineup for the playhead time"></canvas><div class="scene-cap" id="an-cap"></div></div>' +
  '<div class="an-strip" id="an-strip" aria-hidden="true" title="Surf score for each hour. Tap to jump."></div><div class="an-days" id="an-days" aria-hidden="true"></div>' +
  '<div class="cmp-ctl"><button class="btn sm" id="an-play" type="button">Play</button><input type="range" id="an-i" min="0" max="1" step="1" value="0" aria-label="Forecast time"><output id="an-t" for="an-i">Now</output></div>' +
  '<div class="chips" id="an-speed" role="group" aria-label="Animation speed" style="margin-top:8px">' + [['Slow', 1.5], ['Normal', 3], ['Fast', 7]].map(x => '<button type="button" class="chip" data-s="' + x[1] + '" aria-pressed="' + (ANIM.speed === x[1]) + '">' + x[0] + '</button>').join('') + '</div>' +
  '<div class="card cmp" style="margin-top:12px"><div class="cmp-fig" id="an-fig"></div><div class="cmp-leg" id="an-leg"></div></div>' +
  '<p class="note">One playhead drives everything here. The strip shows the surf score for every hour (dark cells are night). The picture is the lineup at that time and the compass arrows turn through the forecast. A longer swell arrow means bigger swell and a longer wind arrow means stronger wind, with faint dots showing where each came from over the last hours. The green wedge is this spot’s swell window.</p></div>';
function mountAnim(D, spot) {
  stopAnim(); const fig = $('#an-fig'); if (!fig) return;
  const H = D.H, n0 = hourIndexNow(H, D.off), n1 = Math.min(H.t.length - 1, n0 + S.range * 24), span = n1 - n0; if (span < 2) { $('#an-sec').hidden = true; return; }
  const has = a => !!a && a.some(x => x != null), sw = has(H.sH) ? { h: H.sH, t: H.sT, d: H.sD } : { h: H.wH, t: H.wT, d: H.wD };
  const sc = D.marineOk ? scoresOf(D, spot) : null, dt = d => dirName(d) + ' ' + f0(norm360(d)) + '°';
  let mH = 0.3, mW = 10; for (let i = n0; i <= n1; i++) { if (sw.h[i] > mH) mH = sw.h[i]; if (H.wsp[i] > mW) mW = H.wsp[i]; }
  const at = (arr, p, circ) => { const q = clamp(p, n0, n1), a = Math.floor(q), b = Math.min(n1, a + 1), f = q - a; return circ ? lerpAng(arr[a], arr[b], f) : lerpN(arr[a], arr[b], f); };
  const trail = (arr, p) => [1, 2, 3, 4, 5, 6].map(k => (p - k >= n0 ? at(arr, p - k, true) : null));
  const scr = $('#an-i'), outT = $('#an-t'), leg = $('#an-leg'), btn = $('#an-play'); scr.max = String(span * 10);
  let lastHr = -1; const tl = mountTimelapseExtras(D, spot, n0, n1, () => ANIM.pos);
  const draw = () => {
    const p = n0 + ANIM.pos, items = [], hr = Math.round(p);
    if (D.marineOk && has(sw.d)) { const h = at(sw.h, p), d = at(sw.d, p, true); if (d != null) items.push({ dir: d, color: 'var(--s1)', w: 5, len: 26 + 30 * clamp((h || 0) / mH, 0, 1), trail: trail(sw.d, p) }); }
    if (D.marineOk && has(H.s2D)) { const h = at(H.s2H, p); if (h != null && h > 0.15) items.push({ dir: at(H.s2D, p, true), color: 'var(--s2)', w: 4, len: 22 + 20 * clamp(h / mH, 0, 1) }); }
    if (has(H.wdir)) items.push({ dir: at(H.wdir, p, true), color: 'var(--ink)', w: 4, len: 30 + 28 * clamp((at(H.wsp, p) || 0) / mW, 0, 1), ring: 'out', trail: trail(H.wdir, p) });
    fig.innerHTML = compassSvg(SX(spot), items, 'Animated compass for ' + spot.name + ' at ' + outT.textContent);
    if (tl) tl.update(); scr.value = String(Math.round(ANIM.pos * 10)); outT.textContent = hr === n0 && ANIM.pos < 0.5 ? 'Now' : WD[dow(H.t[hr])] + ' ' + fmtHr(H.t[hr]);
    if (hr !== lastHr) {
      lastHr = hr; const v = valAt(H, hr), rows = [], r = sc ? sc[hr] : null;
      if (D.marineOk) { const pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, pD = v.sD != null ? v.sD : v.wD; if (pD != null) rows.push(['var(--s1)', 'Primary swell', L(pH) + ' ' + lu() + ' at ' + f0(pT) + ' s', 'from ' + dt(pD) + ' · ' + exposureWord(pD, SX(spot)) + ' here']); if (v.s2H != null && v.s2H > 0.15 && v.s2D != null) rows.push(['var(--s2)', 'Secondary swell', L(v.s2H) + ' ' + lu() + ' at ' + f0(v.s2T) + ' s', 'from ' + dt(v.s2D) + ' · ' + exposureWord(v.s2D, SX(spot)) + ' here']); }
      if (v.wdir != null) rows.push(['var(--ink)', 'Wind', SP(v.wsp) + ' ' + su() + ', gusts ' + SP(v.gust), 'from ' + dt(v.wdir) + ' · ' + windRel(v.wsp, v.wdir, spot.face).label]);
      if (r) rows.push(['var(--ok)', 'Surf score', r.score + ' ' + BANDS[r.band].name, 'green wedge: swell window ' + windowText(SX(spot))]);
      leg.innerHTML = rows.map(x => '<div class="lg"><i style="background:' + x[0] + '"></i><div><b>' + x[1] + '</b> ' + x[2] + '<br><span>' + x[3] + '</span></div></div>').join('');
    }
  };
  const tick = ts => {
    if (!document.body.contains(fig)) { stopAnim(); return; }
    if (ANIM.playing && ANIM.vis) { ANIM.pos += Math.min(0.1, (ts - ANIM.last) / 1000) * ANIM.speed; if (ANIM.pos >= span) ANIM.pos = 0; draw(); ANIM.last = ts; ANIM.raf = requestAnimationFrame(tick); } else ANIM.raf = 0;
  };
  const setPlaying = on => { ANIM.playing = on; btn.textContent = on ? 'Pause' : 'Play'; btn.setAttribute('aria-pressed', on); if (on && !ANIM.raf) { ANIM.last = performance.now(); ANIM.raf = requestAnimationFrame(tick); } };
  btn.addEventListener('click', () => setPlaying(!ANIM.playing));
  const st = $('#an-strip'); if (st) st.addEventListener('pointerdown', e => { const r = st.getBoundingClientRect(); setPlaying(false); ANIM.pos = clamp((e.clientX - r.left) / Math.max(1, r.width) * span, 0, span); draw(); });
  scr.addEventListener('input', () => { setPlaying(false); ANIM.pos = clamp(+scr.value / 10, 0, span); draw(); });
  $('#an-speed').addEventListener('click', e => { const b = e.target.closest('button[data-s]'); if (!b) return; ANIM.speed = +b.dataset.s; document.querySelectorAll('#an-speed button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  if ('IntersectionObserver' in window) { ANIM.io = new IntersectionObserver(es => { ANIM.vis = es[es.length - 1].isIntersecting; if (ANIM.vis && ANIM.playing && !ANIM.raf) { ANIM.last = performance.now(); ANIM.raf = requestAnimationFrame(tick); } }); ANIM.io.observe(fig); }
  ANIM.pos = 0; draw(); setPlaying(!reduced());
}
function mountForecastCharts(D, spot, set) {
  const host = $('#charts'); if (!host) return; const core = set === 'core';
  const H = D.H, t = H.t, i0 = 0, i1 = Math.min(t.length - 1, S.range * 24 - 1), nowIdx = hourIndexNow(H, D.off);
  const conv = (arr, f) => arr.map(v => (v == null ? null : f(v)));
  const lenArr = a => conv(a, m => cvLen(m, S.units)), spdArr = a => conv(a, k => cvSpd(k, S.units)), tmpArr = a => conv(a, c => cvTmp(c, S.units));
  const add = box => { host.appendChild(box); mountChart(box); };
  if (core) {
    if (D.marineOk) {
      const heightSeries = [];
      if (H.sH.some(v => v != null)) heightSeries.push({ label: 'Primary swell', color: 'var(--s1)', data: lenArr(H.sH) }); else heightSeries.push({ label: 'Waves', color: 'var(--s1)', data: lenArr(H.wH) });
      if (H.s2H.some(v => v != null)) heightSeries.push({ label: 'Secondary swell', color: 'var(--s2)', data: lenArr(H.s2H) });
      if (H.wwH.some(v => v != null)) heightSeries.push({ label: 'Wind chop', color: 'var(--s3)', data: lenArr(H.wwH) });
      if (H.wH.some(v => v != null) && H.sH.some(v => v != null)) heightSeries.push({ label: 'Total sea', color: 'var(--ink-3)', data: lenArr(H.wH), dash: '4 3', w: 1.25 });
      const swDirs = H.sD.some(v => v != null) ? H.sD : H.wD.some(v => v != null) ? H.wD : null;
      add(makeChart('Swell height', lu() + ', offshore model, arrows show swell travel direction', { t, i0, i1, nowIdx, series: heightSeries, unit: lu(), type: 'line', min: 0, arrows: swDirs ? { dirs: swDirs, every: S.range > 5 ? 6 : 3 } : null }));
      const per = []; if (H.sT.some(v => v != null)) per.push({ label: 'Primary period', color: 'var(--s1)', data: H.sT }); else per.push({ label: 'Period', color: 'var(--s1)', data: H.wT });
      if (H.s2T.some(v => v != null)) per.push({ label: 'Secondary period', color: 'var(--s2)', data: H.s2T });
      add(makeChart('Swell period', 'seconds, longer is more powerful', { t, i0, i1, nowIdx, series: per, unit: 's', type: 'line', min: 0 }));
    }
    add(makeChart('Wind', su() + ', arrows show where it blows to', { t, i0, i1, nowIdx, series: [{ label: 'Wind', color: 'var(--s1)', data: spdArr(H.wsp) }, { label: 'Gusts', color: 'var(--s2)', data: spdArr(H.gust), w: 1.25, dash: '4 3' }], unit: su(), type: 'line', min: 0, arrows: { dirs: H.wdir, every: S.range > 5 ? 6 : 3 }, fmt: (v, s, i) => f0(v) + ' ' + su() + (s.label === 'Wind' ? ' from ' + dirName(H.wdir[i]) + ' (' + windRel(H.wsp[i], H.wdir[i], spot.face).label.toLowerCase() + ')' : '') }));
    return;
  }
  D._tideChart = false;
  const TN = D.tideN && D.tideN.supported ? D.tideN : null;
  if (TN) {
    const ep = t.map(x => epochOf(x, D.off)), ser = tideSeries(TN.hilo, ep);
    if (ser.some(v => v != null)) {
      D._tideChart = true;
      const marks = S.range <= 5 ? TN.hilo.filter(e => e.t >= ep[i0] && e.t <= ep[i1]).map(e => ({ i: clamp(Math.round((e.t - ep[0]) / 3600), i0, i1), text: (e.type === 'H' ? 'H ' : 'L ') + f1(cvLen(e.v, S.units)), pos: e.type === 'H' ? 'up' : 'down' })) : [];
      add(makeChart('Tide height (NOAA predictions)', lu() + ' above lowest tide, ' + TN.station.name, { t, i0, i1, nowIdx, series: [{ label: 'Tide', color: 'var(--s1)', data: lenArr(ser) }], unit: lu(), type: 'area', marks }));
    }
  }
  if (!D._tideChart && D.marineOk && H.tide.some(v => v != null)) {
    const ex = tideExtrema(t, H.tide).filter(e => e.i >= i0 && e.i <= i1);
    add(makeChart('Tide height (model)', lu() + ' vs mean sea level', { t, i0, i1, nowIdx, series: [{ label: 'Tide', color: 'var(--s1)', data: lenArr(H.tide) }], unit: lu(), type: 'area', marks: S.range <= 5 ? ex.map(e => ({ i: e.i, text: (e.type === 'high' ? 'H ' : 'L ') + f1(cvLen(e.h, S.units)), pos: e.type === 'high' ? 'up' : 'down' })) : [] }));
  }
  if (D.marineOk && H.sst.some(v => v != null)) add(makeChart('Sea surface temperature', tu() + ', model', { t, i0, i1, nowIdx, series: [{ label: 'Water', color: 'var(--s3)', data: tmpArr(H.sst) }], unit: tu(), type: 'line' }));
  if (D.marineOk && H.curV.some(v => v != null)) add(makeChart('Ocean current', su() + ', arrows show where it flows to', { t, i0, i1, nowIdx, series: [{ label: 'Current', color: 'var(--s1)', data: spdArr(H.curV) }], unit: su(), type: 'line', min: 0, arrows: H.curD.some(v => v != null) ? { dirs: H.curD, every: S.range > 5 ? 6 : 3 } : null, fmt: (v, s, i) => f1(v) + ' ' + su() + (H.curD[i] != null ? ' to ' + dirName(H.curD[i]) : '') }));
  if (H.press.some(v => v != null)) add(makeChart('Barometric pressure', 'hPa, falling fast often means wind and swell on the way', { t, i0, i1, nowIdx, series: [{ label: 'Pressure', color: 'var(--s1)', data: H.press }], unit: 'hPa', type: 'line' }));
  if (H.cloud.some(v => v != null)) add(makeChart('Cloud cover', '%', { t, i0, i1, nowIdx, series: [{ label: 'Cloud', color: 'var(--ink-3)', data: H.cloud }], unit: '%', type: 'area', min: 0, max: 100, height: 120 }));
  if (H.vis.some(v => v != null)) add(makeChart('Visibility', S.units === 'imperial' ? 'miles, fog and haze' : 'km, fog and haze', { t, i0, i1, nowIdx, series: [{ label: 'Visibility', color: 'var(--s2)', data: conv(H.vis, m => S.units === 'imperial' ? m / 1609.34 : m / 1000) }], unit: S.units === 'imperial' ? 'mi' : 'km', type: 'line', min: 0, height: 130 }));
  if (H.prcp.some(v => v != null && v > 0)) add(makeChart('Rain amount', S.units === 'imperial' ? 'inches per hour' : 'mm per hour', { t, i0, i1, nowIdx, series: [{ label: 'Rain', color: 'var(--s1)', data: conv(H.prcp, m => S.units === 'imperial' ? m / 25.4 : m) }], unit: S.units === 'imperial' ? 'in' : 'mm', type: 'bars', min: 0, height: 120, fmt: v => (S.units === 'imperial' ? v.toFixed(2) + ' in' : v.toFixed(1) + ' mm') }));
  add(makeChart('Air temperature', tu(), { t, i0, i1, nowIdx, series: [{ label: 'Air', color: 'var(--s2)', data: tmpArr(H.temp) }], unit: tu(), type: 'line' }));
  add(makeChart('Chance of rain', '%', { t, i0, i1, nowIdx, series: [{ label: 'Rain chance', color: 'var(--s1)', data: H.pop }], unit: '%', type: 'bars', min: 0, max: 100, height: 120 }));
}
const mcIntro = () => S.mode === 'live' ? '<p class="note"><button class="btn sm" data-act="mc-load" type="button">Compare wave and wind models</button> Asks four wave models and four wind models, plus the NOAA forecast grid, the CDIP nearshore model (California) and the PacIOOS models (Hawaii) where they cover this spot. Shows how sure the wind and rain forecasts are out to 14 days. Where they agree, you can trust the forecast more.</p>' : '<p class="note">Model comparison needs the live connection.</p>';
async function loadModels(D, spot) {
  const body = $('#mc-body'); if (!body) return; body.innerHTML = '<div class="skel">Asking the wave and wind models…</div>';
  try {
    const q = '?lat=' + spot.lat + '&lon=' + spot.lon, fq = spot.face != null && isFinite(spot.face) ? '&face=' + Math.round(spot.face) : '';
    const hi = spot.lat > 17.5 && spot.lat < 23.5 && spot.lon > -162 && spot.lon < -153.5;
    const [m, c, n, pc, en, xs] = await Promise.allSettled([apiGet('/api/models' + q, 30000), apiGet('/api/cdip' + q, 30000), apiGet('/api/nwsgrid' + q + fq, 30000), hi ? apiGet('/api/pacioos' + q, 40000) : Promise.reject(new Error('not Hawaii')), apiGet('/api/ensemble' + q, 30000), xsrcOn() ? apiGet('/api/xsrc' + q, 20000) : Promise.reject(new Error('off'))]);
    if (m.status !== 'fulfilled') throw m.reason;
    D.mc = m.value; D.mc.cdip = c.status === 'fulfilled' && c.value && c.value.supported ? c.value : null; D.mc.nws = n.status === 'fulfilled' && n.value && n.value.supported && n.value.hasWaves ? n.value : null; D.mc.nwsWind = n.status === 'fulfilled' && n.value && n.value.supported && n.value.hasWind ? n.value : null;
    D.mc.pac = pc.status === 'fulfilled' && pc.value && pc.value.supported ? pc.value.models : null; D.mc.ens = en.status === 'fulfilled' && en.value && en.value.supported ? en.value : null;
    D.mc.xs = xs.status === 'fulfilled' && xs.value && xs.value.supported ? xs.value : null;
  }
  catch (e) { if ($('#mc-body')) $('#mc-body').innerHTML = '<div class="err"><b>Model comparison is not available right now.</b><div class="note" style="margin-top:4px">' + esc(e.message || 'network error') + '</div></div>' + mcIntro(); return; }
  if (S.selId === spot.id && $('#mc-body')) mountModels(D, spot);
}
const XS_COL = { wa: '#8e44ad', vc: '#b7791f' };
const xsNames = x => (x.wa && x.vc ? 'WeatherAPI.com and Visual Crossing' : x.wa ? 'WeatherAPI.com' : 'Visual Crossing');
const xsNote = D => (!D.xs ? 'Model data from Open-Meteo, loaded ' : D.xs.backup ? 'Open-Meteo did not answer, so this view uses ' + xsNames(D.xs) + ' for the next 3 days only. Loaded ' : 'Model data from Open-Meteo, checked against ' + xsNames(D.xs) + ' for the next 3 days. Loaded ');
const MC_COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', '#9b59b6'], PAC_COL = { nearshore: '#c0392b', regional: '#2980b9' };
function modelBand(ser, n) {
  if (ser.length < 3) return [];
  const lo = [], hi = [];
  for (let i = 0; i < n; i++) { const v = ser.map(x => x.data[i]).filter(x => x != null); if (v.length >= 3) { lo.push(Math.min(...v)); hi.push(Math.max(...v)); } else { lo.push(null); hi.push(null); } }
  return lo.some(x => x != null) ? [{ lo, hi, color: 'var(--s1)', label: 'Range of all models', op: 0.14 }] : [];
}
function modelSpread(series, hours) {
  let sp = 0, mean = 0, n = 0;
  for (let i = 0; i < hours; i++) { const v = series.map(a => a[i]).filter(x => x != null); if (v.length >= 2) { sp += Math.max(...v) - Math.min(...v); mean += v.reduce((a, b) => a + b, 0) / v.length; n++; } }
  return n ? { spread: sp / n, mean: mean / n, pct: mean > 0 ? sp / mean : 0, n } : null;
}
function agreeTag(pct) { return pct < 0.2 ? '<span class="tag off">Good agreement</span>' : pct < 0.4 ? '<span class="tag cross">Some disagreement</span>' : '<span class="tag on">Low confidence</span>'; }
function mountModels(D, spot) {
  const body = $('#mc-body'); if (!body || !D.mc) return;
  const M = D.mc, t = D.H.t, i0 = 0, i1 = Math.min(t.length - 1, S.range * 24 - 1), nowIdx = hourIndexNow(D.H, D.off);
  const align = (g, key) => { const ix = new Map(g.t.map((s, k) => [s, k])); return g.models.map(m => t.map(s => { const k = ix.get(s); return k == null ? null : m[key][k]; })); };
  const ep = t.map(x => epochOf(x, D.off));
  const alignE = (g, key) => { const ix = new Map(g.t.map((x, k) => [x, k])); return ep.map(x => { const k = ix.get(x); return k == null ? null : g[key][k]; }); };
  const X = M.xs, alignX = (g, key) => { if (!g || !g.ok) return null; const ix = new Map(g.t.map((x, k) => [x, k])); const a = ep.map(x => { const k = ix.get(x); return k == null ? null : g[key][k]; }); return a.some(v => v != null) ? a : null; };
  let h = '<div class="mcs">', charts = [], radars = [];
  const lenA = a => a.map(v => (v == null ? null : cvLen(v, S.units))), spdA = a => a.map(v => (v == null ? null : cvSpd(v, S.units)));
  if (M.marine && M.marine.models.length) {
    const hs = align(M.marine, 'h'), ps = align(M.marine, 'p'), waHs = alignX(X && X.wa, 'sigH'), sp = modelSpread(waHs ? hs.concat([waHs]) : hs, 72);
    if (sp) h += '<div><b>Wave height</b> over the next 3 days: models differ by about ' + f1(cvLen(sp.spread, S.units)) + ' ' + lu() + ' on average (' + Math.round(sp.pct * 100) + '% of the average). ' + agreeTag(sp.pct) + '</div>';
    const ser = M.marine.models.map((m, k) => ({ label: m.name, color: MC_COL[k % 4], data: lenA(hs[k]) }));
    if (M.nws) { const a = alignE(M.nws, 'wh'); if (a.some(v => v != null)) ser.push({ label: 'NOAA NWS forecast', color: '#e67e22', data: lenA(a), w: 2.25 }); }
    if (M.cdip) { const a = alignE(M.cdip, 'hs'); if (a.some(v => v != null)) ser.push({ label: 'CDIP nearshore', color: '#16a085', data: lenA(a), w: 2.25 }); }
    (M.pac || []).forEach(pm => { const a = alignE(pm, 'hs'); if (a.some(v => v != null)) ser.push({ label: pm.name, color: PAC_COL[pm.kind] || '#c0392b', data: lenA(a), w: 2.25 }); });
    if (waHs) ser.push({ label: 'WeatherAPI.com', color: XS_COL.wa, data: lenA(waHs), w: 2.25 });
    const bands = modelBand(ser, t.length); radars.push({ title: 'Wave height by model, 3-day average', ser, unit: lu(), dec: 1 });
    if (D.marineOk) ser.push({ label: 'This app (best match)', color: 'var(--ink-3)', data: lenA(D.H.wH), dash: '4 3', w: 1.25 });
    charts.push(makeChart('Wave height by model', lu() + ', total sea, one line per model, shaded band is the spread', { t, i0, i1, nowIdx, series: ser, bands, unit: lu(), type: 'line', min: 0 }));
    const pser = M.marine.models.map((m, k) => ({ label: m.name, color: MC_COL[k % 4], data: ps[k] }));
    if (M.nws) { const a = alignE(M.nws, 'wp'); if (a.some(v => v != null)) pser.push({ label: 'NOAA NWS forecast', color: '#e67e22', data: a, w: 2.25 }); }
    if (M.cdip) { const a = alignE(M.cdip, 'tp'); if (a.some(v => v != null)) pser.push({ label: 'CDIP nearshore', color: '#16a085', data: a, w: 2.25 }); }
    (M.pac || []).forEach(pm => { const a = alignE(pm, 'tp'); if (a.some(v => v != null)) pser.push({ label: pm.name, color: PAC_COL[pm.kind] || '#c0392b', data: a, w: 2.25 }); });
    { const a = alignX(X && X.wa, 'swT'); if (a) pser.push({ label: 'WeatherAPI.com (swell)', color: XS_COL.wa, data: a, w: 2.25 }); }
    charts.push(makeChart('Wave period by model', 'seconds', { t, i0, i1, nowIdx, series: pser, unit: 's', type: 'line', min: 0 }));
    if (M.cdip) { const dd = alignE(M.cdip, 'dp'); if (dd.some(v => v != null)) charts.push(makeChart('Nearshore wave direction (CDIP)', 'degrees the swell comes from, at ' + (M.cdip.cell.depth != null ? Math.round(M.cdip.cell.depth) + ' m' : 'the nearest water') + ' depth', { t, i0, i1, nowIdx, series: [{ label: 'Swell from', color: '#16a085', data: dd }], unit: '\u00b0', type: 'line', min: 0, max: 360, arrows: { dirs: dd, every: 6 } })); }
    (M.pac || []).filter(pm => pm.kind === 'nearshore').slice(0, 1).forEach(pm => { const dd = alignE(pm, 'dp'); if (dd.some(v => v != null)) charts.push(makeChart('Nearshore wave direction (PacIOOS SWAN)', 'degrees the waves come from, at the nearest water cell (' + (pm.cell.distM < 1000 ? pm.cell.distM + ' m' : f1(pm.cell.distM / 1000) + ' km') + ' from the spot)', { t, i0, i1, nowIdx, series: [{ label: 'Waves from', color: PAC_COL.nearshore, data: dd }], unit: '\u00b0', type: 'line', min: 0, max: 360, arrows: { dirs: dd, every: 6 } })); });
  }
  if (M.wind && M.wind.models.length) {
    const ws = align(M.wind, 's'), wxA = alignX(X && X.wa, 'wsp'), wxV = alignX(X && X.vc, 'wsp'), sp = modelSpread(ws.concat([wxA, wxV].filter(Boolean)), 72);
    if (sp) h += '<div><b>Wind</b> over the next 3 days: models differ by about ' + f0(cvSpd(sp.spread, S.units)) + ' ' + su() + ' on average. ' + agreeTag(sp.pct * 0.8) + '</div>';
    const ser = M.wind.models.map((m, k) => ({ label: m.name, color: MC_COL[k % 4], data: spdA(ws[k]) })); if (M.nwsWind) { const a = alignE(M.nwsWind, 'ws'); if (a.some(v => v != null)) ser.push({ label: 'NOAA NWS forecast', color: '#e67e22', data: spdA(a), w: 2.25 }); } if (wxA) ser.push({ label: 'WeatherAPI.com', color: XS_COL.wa, data: spdA(wxA), w: 2.25 }); if (wxV) ser.push({ label: 'Visual Crossing', color: XS_COL.vc, data: spdA(wxV), w: 2.25 }); ser.push({ label: 'This app (best match)', color: 'var(--ink-3)', data: spdA(D.H.wsp), dash: '4 3', w: 1.25 });
    radars.push({ title: 'Wind speed by model, 3-day average', ser, unit: su(), dec: 0 }); charts.push(makeChart('Wind speed by model', su(), { t, i0, i1, nowIdx, series: ser, unit: su(), type: 'line', min: 0 }));
  }
  if (!(M.marine && M.marine.models.length) && (M.nws || M.cdip || M.pac)) {
    const ser = []; if (M.nws) ser.push({ label: 'NOAA NWS forecast', color: '#e67e22', data: lenA(alignE(M.nws, 'wh')), w: 2.25 }); if (M.cdip) ser.push({ label: 'CDIP nearshore', color: '#16a085', data: lenA(alignE(M.cdip, 'hs')), w: 2.25 }); (M.pac || []).forEach(pm => ser.push({ label: pm.name, color: PAC_COL[pm.kind] || '#c0392b', data: lenA(alignE(pm, 'hs')), w: 2.25 }));
    charts.push(makeChart('Wave height by model', lu(), { t, i0, i1, nowIdx, series: ser, unit: lu(), type: 'line', min: 0 }));
  }
  if (M.ens) {
    const ix = new Map(M.ens.t.map((x, k) => [x, k])), pick = a => t.map(x => { const k = ix.get(x); return k == null ? null : a[k]; });
    const p10 = spdA(pick(M.ens.wind.p10)), p50 = spdA(pick(M.ens.wind.p50)), p90 = spdA(pick(M.ens.wind.p90)), rp = pick(M.ens.rainProb);
    if (p50.some(v => v != null)) {
      const at = dd => { const k = Math.min(t.length - 1, Math.max(0, (nowIdx || 0) + dd * 24 + 12)); return p10[k] != null && p90[k] != null ? [p10[k], p90[k]] : null; }, a3 = at(3), lastD = Math.min(10, Math.floor((t.length - 1 - (nowIdx || 0)) / 24) - 1), aL = lastD >= 6 ? at(lastD) : null;
      if (a3 && aL) h += '<div><b>Wind confidence</b>: three days out the ensemble puts wind between ' + f0(a3[0]) + ' and ' + f0(a3[1]) + ' ' + su() + '; by day ' + lastD + ' the range widens to ' + f0(aL[0]) + ' to ' + f0(aL[1]) + ' ' + su() + '. ' + (aL[1] - aL[0] > (a3[1] - a3[0]) * 1.8 ? '<span class="tag cross">Plan loosely past day ' + Math.max(4, lastD - 3) + '</span>' : '<span class="tag off">Stays fairly steady</span>') + '</div>';
      charts.push(makeChart('Wind confidence band (ensemble)', su() + ', line is the middle of ' + M.ens.members + ' forecast runs. The shaded band is where 8 in 10 runs fall', { t, i0, i1, nowIdx, series: [{ label: 'Typical wind', color: 'var(--s2)', data: p50 }], bands: [{ lo: p10, hi: p90, color: 'var(--s2)', label: 'Where 80% of runs fall', op: 0.2 }], unit: su(), type: 'line', min: 0 }));
    }
    if (rp.some(v => v != null && v > 0)) charts.push(makeChart('Chance of rain (ensemble)', '% of ' + M.ens.members + ' forecast runs showing measurable rain in that hour', { t, i0, i1, nowIdx, series: [{ label: 'Rain chance', color: 'var(--s1)', data: rp }], unit: '%', type: 'bars', min: 0, max: 100, height: 120 }));
  }
  const srcs = []; (M.pac || []).forEach(pm => srcs.push(pm.name + ' (University of Hawaii), ' + (pm.cell.distM < 1000 ? pm.cell.distM + ' m' : f1(pm.cell.distM / 1000) + ' km') + ' from the spot' + (pm.kind === 'nearshore' ? ', about 500 m grid' : ', regional 5 km grid'))); if (X && X.wa) srcs.push('<a href="https://www.weatherapi.com/" target="_blank" rel="noopener">WeatherAPI.com</a> marine and wind forecast, 3 days'); if (X && X.vc) srcs.push('<a href="https://www.visualcrossing.com/" target="_blank" rel="noopener">Weather data by Visual Crossing</a>, wind forecast, 3 days'); if (M.ens) srcs.push('ensemble runs: ECMWF IFS and NOAA GFS through Open-Meteo, ' + M.ens.members + ' runs pooled'); if (M.cdip) srcs.push('CDIP MOP nearshore model, grid ' + M.cdip.grid + ', ' + (M.cdip.cell.distM < 1000 ? M.cdip.cell.distM + ' m' : f1(M.cdip.cell.distM / 1000) + ' km') + ' from the spot, updates every 6 hours and is smoothed to hourly here'); if (M.nws) srcs.push('NOAA NWS wave grid ' + M.nws.office + ' ' + M.nws.grid + (M.nws.offshoreKm ? ', taken ' + M.nws.offshoreKm + ' km offshore' : ''));
  if (!charts.length) { body.innerHTML = '<div class="err">No model returned data for this point. It may be inland or outside model coverage.</div>'; return; }
  body.innerHTML = h + '</div><div id="mc-charts" style="display:grid;gap:12px"></div><p class="note">Open-Meteo model output. Wave models: ECMWF WAM, NOAA GFS Wave, Météo-France MFWAM, DWD GWAM. Wind models: NOAA GFS, ECMWF IFS, DWD ICON, Canada GEM. Models that can’t cover this point are left out.' + (srcs.length ? ' Also shown: ' + srcs.join('; ') + '.' : ' CDIP covers California and parts of Hawaii and the Pacific Northwest, PacIOOS covers the Hawaiian islands, and NOAA grids cover US waters, so these do not appear for every spot.') + '</p>';
  const host = $('#mc-charts'); charts.forEach(c => { host.appendChild(c); mountChart(c); }); radars.forEach(rd => { const hh = modelRadarHtml(rd.title, rd.ser, rd.unit, nowIdx, rd.dec); if (hh) host.insertAdjacentHTML('beforeend', hh); });
}
function setView(v) {
  if (v !== 'home' && v !== 'spot') v = 'home';
  if (v === 'spot' && !spotById(S.selId)) v = 'home';
  const was = S.view; S.view = v; $('#app').dataset.view = v;
  if (v === 'home' && map) requestAnimationFrame(() => map.resize());
  if (!isDesktop() && v === 'spot' && was !== 'spot') { try { history.pushState({ dp: 'spot' }, ''); } catch (e) { /* history is optional */ } const d = $('#detail'); if (d) d.scrollTop = 0; }
}
function goHome() { if (history.state && history.state.dp === 'spot') history.back(); else setView('home'); }
function renderAllLists() { renderRank(); renderMarkers(); const sp = spotById(S.selId), D = sp && S.detail.get(sp.id); if (sp && D) renderDetail(D, sp); menuRefresh(); }
const TDET = { id: null, days: 3 };
const tfact = (k, v, s) => '<div><span>' + k + '</span><b>' + v + '</b>' + (s ? '<small>' + s + '</small>' : '') + '</div>';
const whenAt = (D, i) => (i != null && i >= 0 && D.H.t[i] ? dayLabel(D.H.t[i]) + ' ' + fmtClock(D.H.t[i]) : '–');
const argBest = (arr, a, b, dir) => { let k = -1; for (let i = a; i <= b; i++) if (arr[i] != null && (k < 0 || (dir > 0 ? arr[i] > arr[k] : arr[i] < arr[k]))) k = i; return k; };
const uvWord = u => (u == null ? '–' : u < 3 ? 'Low' : u < 6 ? 'Moderate' : u < 8 ? 'High' : u < 11 ? 'Very high' : 'Extreme');
function moonSvg(age) {
  const syn = 29.530588853, ph = age / syn, R = 40, c = 50, k = Math.cos(2 * Math.PI * ph), rx = (Math.abs(k) * R).toFixed(1), wax = ph < 0.5;
  const s1 = wax ? 1 : 0, s2 = wax ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);
  return '<svg viewBox="0 0 100 100" width="96" height="96" role="img" aria-label="Moon phase"><circle cx="50" cy="50" r="40" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1.5"/><path d="M' + c + ' ' + (c - R) + ' A' + R + ' ' + R + ' 0 0 ' + s1 + ' ' + c + ' ' + (c + R) + ' A' + rx + ' ' + R + ' 0 0 ' + s2 + ' ' + c + ' ' + (c - R) + 'Z" fill="var(--ink)" opacity=".88"/></svg>';
}
function tileSpec(id, D, spot) {
  const H = D.H, t = H.t, n = hourIndexNow(H, D.off), v = valAt(H, n), cur = D.current || {};
  const i0 = Math.max(0, n - 6), i1 = Math.min(t.length - 1, n + TDET.days * 24), ev = TDET.days > 3 ? 6 : TDET.days > 1 ? 3 : 2, a24 = Math.min(t.length - 1, n + 24), a48 = Math.min(t.length - 1, n + 48);
  const conv = (a, f) => a.map(x => (x == null ? null : f(x))), len = a => conv(a, m => cvLen(m, S.units)), spd = a => conv(a, k => cvSpd(k, S.units)), tmp = a => conv(a, c => cvTmp(c, S.units));
  const ch = (title, sub, series, o) => makeChart(title, sub, Object.assign({ t, i0, i1, nowIdx: n, series }, o));
  const has = a => !!a && a.some(x => x != null), S1 = 'var(--s1)', S2 = 'var(--s2)', S3 = 'var(--s3)', INK = 'var(--ink-3)';
  const sc = D.marineOk ? scoresOf(D, spot) : null, r = sc ? sc[n] : null;
  const pri = has(H.sH) ? { h: H.sH, t: H.sT, d: H.sD } : { h: H.wH, t: H.wT, d: H.wD };
  const dirFmt = x => f0(x) + '° ' + dirName(x), pw = (h, p) => (h != null && p != null ? 0.4906 * h * h * p : null);
  const o = { title: '', sub: '', facts: [], charts: [], html: '', note: '' };
  const swellTile = (name, hA, tA, dA, extraSer) => {
    const hN = hA[n], tN = tA[n], dN = dA[n], pk = argBest(hA, n, a48, 1), lp = argBest(tA, n, a48, 1);
    o.facts = [tfact('Height now', L(hN) + ' ' + lu()), tfact('Period', f0(tN) + ' s', 'longer swells travel farther and hit harder'), tfact('From', dN == null ? '–' : dirFmt(dN)), tfact('Power', f0(pw(hN, tN)) + ' kW/m', 'height squared times period'),
      tfact('Peak, next 48 h', L(hA[pk]) + ' ' + lu(), whenAt(D, pk)), tfact('Longest period, next 48 h', f0(tA[lp]) + ' s', whenAt(D, lp))];
    if (dN != null && name === 'primary') o.facts.splice(3, 0, tfact('Beach exposure', Math.round(exposure(dN, SX(spot)) * 100) + '%', winOf(spot) ? 'works from ' + windowText(SX(spot)) : 'beach faces ' + dirName(spot.face)));
    o.charts.push(ch('Height', lu() + ', arrows show travel direction', [{ label: name === 'primary' ? 'This swell' : 'Secondary swell', color: S1, data: len(hA) }].concat(extraSer(len)), { unit: lu(), type: 'line', min: 0, arrows: has(dA) ? { dirs: dA, every: ev } : null }));
    o.charts.push(ch('Period', 'seconds', [{ label: 'This swell', color: S1, data: tA }, { label: 'Total sea mean', color: INK, data: H.wT, dash: '4 3', w: 1.25 }], { unit: 's', type: 'line', min: 0 }));
    o.charts.push(ch('Power', 'kW per metre of wave front', [{ label: 'Power', color: S2, data: hA.map((h, i) => (pw(h, tA[i]) == null ? null : Math.round(pw(h, tA[i]) * 10) / 10)) }], { unit: 'kW/m', type: 'area', min: 0, height: 130 }));
    o.charts.push(ch('Direction', 'degrees the swell comes from', [{ label: 'From', color: S3, data: dA }], { unit: '°', type: 'line', min: 0, max: 360, height: 130, fmt: x => dirFmt(x) }));
  };
  switch (id) {
    case 'swell1': o.title = 'Primary swell'; o.sub = 'The main swell train in the offshore wave model';
      { const its = []; if (pri.d[n] != null) its.push({ dir: pri.d[n], color: S1, w: 5, len: 52 }); if (has(H.s2D) && H.s2H[n] > 0.1) its.push({ dir: H.s2D[n], color: S2, w: 4, len: 42 }); if (H.wdir[n] != null) its.push({ dir: H.wdir[n], color: 'var(--ink)', w: 4, len: 46, ring: 'out' });
        o.html = '<div class="cmp"><div class="cmp-fig" style="max-width:260px">' + compassSvg(SX(spot), its, 'Compass for ' + spot.name) + '</div><div class="cmp-leg"><div class="lg"><i style="background:var(--ok)"></i><div><b>Best swell for this spot</b> from ' + dirName(spot.face) + ' ' + f0(spot.face) + '\u00b0<br><span>Full exposure from ' + windowText(SX(spot)) + '</span></div></div><div class="lg"><i style="background:' + S1 + '"></i><div><b>Primary swell now</b> from ' + (pri.d[n] == null ? '\u2013' : dirName(pri.d[n]) + ' ' + f0(pri.d[n]) + '\u00b0') + '<br><span>' + (pri.d[n] == null ? '' : exposureWord(pri.d[n], SX(spot)) + ' at this beach') + '</span></div></div><div class="lg"><i style="background:var(--ink)"></i><div><b>Wind</b> from ' + dirName(H.wdir[n]) + '</div></div></div></div>'; }
      swellTile('primary', pri.h, pri.t, pri.d, l => [].concat(has(H.s2H) ? [{ label: 'Secondary swell', color: S2, data: l(H.s2H) }] : [], has(H.sH) && has(H.wH) ? [{ label: 'Total sea', color: INK, data: l(H.wH), dash: '4 3', w: 1.25 }] : [])); break;
    case 'swell2': o.title = 'Secondary swell'; o.sub = 'A second, usually smaller swell crossing the main one';
      swellTile('secondary', H.s2H, H.s2T, H.s2D, l => [{ label: 'Primary swell', color: S1, data: l(pri.h), w: 1.25, dash: '4 3' }]); break;
    case 'chop': {
      const sh = H.wH[n] ? (H.wwH[n] || 0) / H.wH[n] : null, pk = argBest(H.wwH, n, a48, 1);
      o.title = 'Wind chop'; o.sub = 'Short, local waves pushed up by the wind. They add texture and lower the quality of the swell.';
      o.facts = [tfact('Height now', L(H.wwH[n]) + ' ' + lu()), tfact('Period', f0(H.wwT[n]) + ' s', 'short period means choppy'), tfact('From', H.wwD[n] == null ? '–' : dirFmt(H.wwD[n])), tfact('Share of total sea', sh == null ? '–' : Math.round(sh * 100) + '%', sh == null ? '' : sh > 0.5 ? 'texture likely' : 'mostly clean swell'), tfact('Peak, next 48 h', L(H.wwH[pk]) + ' ' + lu(), whenAt(D, pk))];
      o.charts.push(ch('Chop height', lu() + ' vs total sea', [{ label: 'Wind chop', color: S3, data: len(H.wwH) }, { label: 'Total sea', color: INK, data: len(H.wH), dash: '4 3', w: 1.25 }], { unit: lu(), type: 'line', min: 0, arrows: has(H.wwD) ? { dirs: H.wwD, every: ev } : null }));
      o.charts.push(ch('Chop period', 'seconds', [{ label: 'Chop', color: S3, data: H.wwT }], { unit: 's', type: 'line', min: 0, height: 130 }));
      o.charts.push(ch('Wind speed', su() + ', chop follows the wind', [{ label: 'Wind', color: S1, data: spd(H.wsp) }], { unit: su(), type: 'line', min: 0, height: 130 })); break; }
    case 'sea': {
      const sw = H.wH[n] ? (pri.h[n] || 0) / H.wH[n] : null, pk = argBest(H.wH, n, a48, 1);
      o.title = 'Total sea state'; o.sub = 'All the waves in the water together: swell plus chop';
      o.facts = [tfact('Height now', L(H.wH[n]) + ' ' + lu()), tfact('Mean period', f0(H.wT[n]) + ' s'), tfact('Mean direction', H.wD[n] == null ? '–' : dirFmt(H.wD[n])), tfact('Swell share', sw == null ? '–' : Math.round(Math.min(1, sw) * 100) + '%', 'of the total height'), tfact('Peak, next 48 h', L(H.wH[pk]) + ' ' + lu(), whenAt(D, pk))];
      o.charts.push(ch('Total sea height', lu() + ', with its parts', [{ label: 'Total sea', color: S1, data: len(H.wH) }].concat(has(H.sH) ? [{ label: 'Primary swell', color: S2, data: len(H.sH), w: 1.5 }] : [], has(H.wwH) ? [{ label: 'Wind chop', color: S3, data: len(H.wwH), w: 1.5 }] : []), { unit: lu(), type: 'line', min: 0, arrows: has(H.wD) ? { dirs: H.wD, every: ev } : null }));
      o.charts.push(ch('Mean period', 'seconds', [{ label: 'Mean period', color: S1, data: H.wT }], { unit: 's', type: 'line', min: 0, height: 130 })); break; }
    case 'wind': {
      const wsp = cur.wind_speed_10m != null ? cur.wind_speed_10m : v.wsp, wdir = cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir, gust = cur.wind_gusts_10m != null ? cur.wind_gusts_10m : v.gust, rel = windRel(wsp, wdir, spot.face);
      let good = 0, tot = 0; for (let i = n; i <= a24; i++) { if (H.wsp[i] == null) continue; tot++; const k = windRel(H.wsp[i], H.wdir[i], spot.face).kind; if (k === 'off' || k === 'light') good++; }
      const calm = argBest(H.wsp, n, a24, -1), bw = sc ? argBest(sc.map(x => (x && x.parts ? x.parts.wind : null)), n, a24, 1) : -1;
      o.title = 'Wind'; o.sub = 'Offshore wind grooms the waves, onshore wind roughs them up';
      o.facts = [tfact('Speed now', SP(wsp) + ' ' + su(), 'gusts ' + SP(gust)), tfact('From', wdir == null ? '–' : dirFmt(wdir)), tfact('For this beach', rel.label, 'beach faces ' + dirName(spot.face)), tfact('Clean hours, next 24 h', good + ' of ' + tot, 'offshore or light'), tfact('Calmest, next 24 h', calm < 0 ? '–' : SP(H.wsp[calm]) + ' ' + su(), whenAt(D, calm))];
      if (bw >= 0) o.facts.push(tfact('Best wind hour, next 24 h', whenAt(D, bw), 'for this beach'));
      o.charts.push(ch('Wind speed and gusts', su() + ', arrows show where it blows to', [{ label: 'Wind', color: S1, data: spd(H.wsp) }, { label: 'Gusts', color: S2, data: spd(H.gust), w: 1.25, dash: '4 3' }], { unit: su(), type: 'line', min: 0, arrows: { dirs: H.wdir, every: ev }, fmt: (x, s, i) => f0(x) + ' ' + su() + (s.label === 'Wind' ? ' from ' + dirName(H.wdir[i]) + ' (' + windRel(H.wsp[i], H.wdir[i], spot.face).label.toLowerCase() + ')' : '') }));
      o.charts.push(ch('Offshore component', su() + ', above zero is offshore (good), below is onshore', [{ label: 'Offshore', color: S3, data: spd(H.wsp.map((s, i) => (s == null || H.wdir[i] == null ? null : -windRel(s, H.wdir[i], spot.face).c * s))) }], { unit: su(), type: 'area', height: 140 }));
      if (sc) o.charts.push(ch('Wind quality for this beach', 'points out of 15 in the surf score', [{ label: 'Wind points', color: S2, data: sc.map(x => (x && x.parts ? Math.round(x.parts.wind * 10) / 10 : null)) }], { unit: 'pts', type: 'area', min: 0, max: 15, height: 130 })); break; }
    case 'tide': {
      const ser = tideHourly(D), nw = D.tideN && D.tideN.supported; o.title = 'Tide'; o.sub = nw ? 'NOAA predictions, ' + D.tideN.station.name : 'Ocean model sea level, approximate';
      if (!ser) { o.note = 'No tide data for this point.'; break; }
      const ex = tideExtrema(t, ser).filter(e => e.i >= n && e.i <= Math.min(t.length - 1, n + 36)).slice(0, 4), win = ser.slice(n, a24 + 1).filter(x => x != null), tdp = (TIDE_PREFS.find(x => x[0] === ((S.notes[spot.id] || {}).tide || 'any')) || [])[1];
      o.facts = [tfact('Height now', L(ser[n]) + ' ' + lu(), (ser[n + 1] != null && ser[n] != null ? (ser[n + 1] > ser[n] ? 'rising' : 'falling') : '')), win.length ? tfact('Range, next 24 h', L(Math.max(...win) - Math.min(...win)) + ' ' + lu(), 'low to high') : ''].concat(ex.map(e => tfact((e.type === 'high' ? 'High' : 'Low') + ' tide', fmtClock(t[e.i]), L(e.h) + ' ' + lu() + ' · ' + dayLabel(t[e.i]))), [tfact('Your best tide here', esc(tdp || 'Any'), 'change it under For you'), tfact('Tide swing', moonInfo(Date.now()).springs ? 'Springs' : 'Neaps-ish', moonInfo(Date.now()).springs ? 'bigger range, stronger flow' : 'smaller range')]);
      const marks = TDET.days <= 3 ? tideExtrema(t, ser).filter(e => e.i >= i0 && e.i <= i1).map(e => ({ i: e.i, text: (e.type === 'high' ? 'H ' : 'L ') + f1(cvLen(e.h, S.units)), pos: e.type === 'high' ? 'up' : 'down' })) : [];
      o.charts.push(ch('Tide height', lu() + (nw ? ' above lowest tide' : ' vs mean sea level'), [{ label: 'Tide', color: S1, data: len(ser) }], { unit: lu(), type: 'area', marks }));
      if (sc) o.charts.push(ch('Surf score by hour', 'compare it with the tide above to find your best tide', [{ label: 'Score', color: S2, data: sc.map(x => (x ? x.score : null)) }], { unit: '', type: 'line', min: 0, max: 100, height: 140 })); break; }
    case 'water': {
      const cs = H.curV[n]; o.title = 'Water'; o.sub = 'Sea surface temperature and current from the ocean model';
      o.facts = [tfact('Temperature', TP(v.sst) + tu()), tfact('Wetsuit', esc(wetsuit(v.sst) || '–')), tfact('Wax', esc(waxFor(v.sst) || '–'))].concat(cs != null ? [tfact('Current', f1(cvSpd(cs, S.units)) + ' ' + su(), 'to ' + dirName(H.curD[n]))] : []).concat(habFacts(spot, v.sst));
      o.charts.push(ch('Sea surface temperature', tu(), [{ label: 'Water', color: S3, data: tmp(H.sst) }], { unit: tu(), type: 'line' }));
      if (has(H.curV)) o.charts.push(ch('Ocean current', su() + ', arrows show where it flows to', [{ label: 'Current', color: S1, data: spd(H.curV) }], { unit: su(), type: 'line', min: 0, arrows: has(H.curD) ? { dirs: H.curD, every: ev } : null, fmt: (x, s, i) => f1(x) + ' ' + su() + (H.curD[i] != null ? ' to ' + dirName(H.curD[i]) : '') })); break; }
    case 'air': {
      const w = H.temp.slice(n, a24 + 1).filter(x => x != null), tn = cur.temperature_2m != null ? cur.temperature_2m : v.temp, code = cur.weather_code != null ? cur.weather_code : v.code, pk = argBest(H.pop, n, a24, 1);
      o.title = 'Air'; o.sub = 'Air temperature and weather at the beach';
      o.facts = [tfact('Temperature', TP(tn) + tu(), 'feels ' + TP(cur.apparent_temperature != null ? cur.apparent_temperature : v.feels) + tu()), tfact('Conditions', esc(wxText(code))), w.length ? tfact('Next 24 h', TP(Math.min(...w)) + ' to ' + TP(Math.max(...w)) + tu()) : '', tfact('Humidity', f0(cur.relative_humidity_2m != null ? cur.relative_humidity_2m : v.hum) + '%'), tfact('Rain chance, next 24 h', pk < 0 ? '–' : f0(H.pop[pk]) + '%', pk < 0 ? '' : 'peaks ' + whenAt(D, pk))];
      o.charts.push(ch('Temperature and feels like', tu(), [{ label: 'Air', color: S2, data: tmp(H.temp) }, { label: 'Feels like', color: S1, data: tmp(H.feels), w: 1.25, dash: '4 3' }], { unit: tu(), type: 'line' }));
      o.charts.push(ch('Chance of rain', '%', [{ label: 'Rain chance', color: S1, data: H.pop }], { unit: '%', type: 'bars', min: 0, max: 100, height: 120 }));
      if (H.prcp.some(x => x != null && x > 0)) o.charts.push(ch('Rain amount', S.units === 'imperial' ? 'inches per hour' : 'mm per hour', [{ label: 'Rain', color: S1, data: conv(H.prcp, m => (S.units === 'imperial' ? m / 25.4 : m)) }], { unit: S.units === 'imperial' ? 'in' : 'mm', type: 'bars', min: 0, height: 120, fmt: x => (S.units === 'imperial' ? x.toFixed(2) + ' in' : x.toFixed(1) + ' mm') })); break; }
    case 'sky': {
      const uvMax = D.daily.uv_index_max ? D.daily.uv_index_max[0] : null, cl = cur.cloud_cover != null ? cur.cloud_cover : v.cloud;
      o.title = 'Sky and sun'; o.sub = 'Cloud, UV, humidity and visibility';
      o.facts = [tfact('Cloud cover', f0(cl) + '%'), tfact('UV now', f1(v.uv), uvWord(v.uv)), uvMax != null ? tfact('UV peak today', f1(uvMax), uvWord(uvMax)) : '', tfact('Humidity', f0(cur.relative_humidity_2m != null ? cur.relative_humidity_2m : v.hum) + '%'), tfact('Visibility', v.vis == null ? '–' : (S.units === 'imperial' ? f1(v.vis / 1609.34) + ' mi' : f1(v.vis / 1000) + ' km'))];
      o.note = 'Sunscreen and a rash guard from UV 3 up. Water reflects extra sun, so UV on the water runs higher than the number shows.';
      o.charts.push(ch('Cloud cover', '%', [{ label: 'Cloud', color: INK, data: H.cloud }], { unit: '%', type: 'area', min: 0, max: 100, height: 120 }));
      if (has(H.uv)) o.charts.push(ch('UV index', '3 moderate, 6 high, 8 very high, 11 extreme', [{ label: 'UV', color: S2, data: H.uv }], { unit: '', type: 'area', min: 0, height: 130 }));
      o.charts.push(ch('Humidity', '%', [{ label: 'Humidity', color: S1, data: H.hum }], { unit: '%', type: 'line', min: 0, max: 100, height: 120 }));
      if (has(H.vis)) o.charts.push(ch('Visibility', S.units === 'imperial' ? 'miles, fog and haze' : 'km, fog and haze', [{ label: 'Visibility', color: S3, data: conv(H.vis, m => (S.units === 'imperial' ? m / 1609.34 : m / 1000)) }], { unit: S.units === 'imperial' ? 'mi' : 'km', type: 'line', min: 0, height: 130 })); break; }
    case 'pressure': {
      const p = H.press, d3 = n >= 3 && p[n] != null && p[n - 3] != null ? p[n] - p[n - 3] : null, f24 = p[a24] != null && p[n] != null ? p[a24] - p[n] : null, wd = x => (x == null ? '' : x > 0.6 ? 'rising' : x < -0.6 ? 'falling' : 'steady');
      o.title = 'Pressure'; o.sub = 'Sea level pressure. Falling fast often means wind and swell on the way.';
      o.facts = [tfact('Now', f0(cur.pressure_msl != null ? cur.pressure_msl : v.press) + ' hPa'), tfact('Last 3 h', d3 == null ? '–' : (d3 > 0 ? '+' : '') + f1(d3) + ' hPa', wd(d3)), tfact('Next 24 h', f24 == null ? '–' : (f24 > 0 ? '+' : '') + f1(f24) + ' hPa', f24 == null ? '' : f24 > 3 ? 'clearing and settling' : f24 < -3 ? 'a system is approaching' : wd(f24 / 8))];
      o.charts.push(ch('Pressure', 'hPa', [{ label: 'Pressure', color: S1, data: p }], { unit: 'hPa', type: 'line' }));
      o.charts.push(ch('Change over 3 hours', 'hPa, below zero means falling', [{ label: 'Change', color: S2, data: p.map((x, i) => (i >= 3 && x != null && p[i - 3] != null ? Math.round((x - p[i - 3]) * 10) / 10 : null)) }], { unit: 'hPa', type: 'bars', height: 120 })); break; }
    case 'sun': {
      const dsr = D.daily.sunrise || [], dss = D.daily.sunset || [], rows = [], hrs = [], tt = [];
      for (let k = 0; k < Math.min(7, dsr.length); k++) { const a = epochOf(dsr[k], D.off), b = epochOf(dss[k], D.off), dl = (b - a) / 3600; hrs.push(Math.round(dl * 100) / 100); tt.push(dsr[k]); const se = D.spot ? sunEvents(D.spot.lat, D.spot.lon, dsr[k], D.off) : null; rows.push('<tr><td>' + dayLabel(dsr[k]) + '</td><td>' + fmtClock(se && se.dawn ? se.dawn : localStr(a * 1000 - 30 * 60000, D.off)) + '</td><td>' + fmtClock(dsr[k]) + '</td><td>' + fmtClock(dss[k]) + '</td><td>' + fmtClock(se && se.dusk ? se.dusk : localStr(b * 1000 + 30 * 60000, D.off)) + '</td><td>' + Math.floor(dl) + ' h ' + Math.round((dl % 1) * 60) + ' m</td></tr>'); }
      o.title = 'Sunrise and sunset'; o.sub = 'First and last light are civil twilight: the sun is 6 degrees below the horizon and you can see the lineup';
      o.html = '<div class="tscroll"><table class="t"><thead><tr><th>Day</th><th>First light</th><th>Sunrise</th><th>Sunset</th><th>Last light</th><th>Daylight</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
      if (hrs.length > 1) o.charts.push(makeChart('Daylight length', 'hours of sun each day', { t: tt, i0: 0, i1: tt.length - 1, nowIdx: null, series: [{ label: 'Daylight', color: S2, data: hrs }], daily: true, unit: 'h', type: 'bars', min: Math.max(0, Math.floor(Math.min(...hrs)) - 2), height: 130, fmt: x => Math.floor(x) + ' h ' + Math.round((x % 1) * 60) + ' m' })); break; }
    case 'moon': {
      const syn = 29.530588853, mi = moonInfo(Date.now()), dayFmt = ms => new Date(ms + D.off * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
      const toNew = (syn - mi.age) * 864e5, toFull = (mi.age < syn / 2 ? syn / 2 - mi.age : syn * 1.5 - mi.age) * 864e5, tt = [], il = [];
      for (let k = 0; k < 30; k++) { const ms = Date.now() + k * 864e5; tt.push(localStr(ms, D.off).slice(0, 10) + 'T12:00'); il.push(Math.round(moonInfo(ms).illum * 100)); }
      o.title = 'Moon and tides'; o.sub = 'New and full moons bring spring tides: bigger highs, lower lows and stronger currents';
      o.html = '<div class="moonrow">' + moonSvg(mi.age) + '<div>' + esc(mi.name) + '<br><small>' + Math.round(mi.illum * 100) + '% lit, day ' + f0(mi.age) + ' of the cycle</small></div></div>';
      o.facts = [tfact('Tide swing now', mi.springs ? 'Springs' : 'Neaps-ish', mi.springs ? 'bigger tidal range' : 'smaller tidal range'), tfact('Next full moon', dayFmt(Date.now() + toFull)), tfact('Next new moon', dayFmt(Date.now() + toNew))];
      o.charts.push(makeChart('Moon lit, next 30 days', '% of the disc, peaks are full moons, lows new moons', { t: tt, i0: 0, i1: tt.length - 1, nowIdx: 0, series: [{ label: 'Lit', color: S2, data: il }], daily: true, unit: '%', type: 'area', min: 0, max: 100, height: 140 })); break; }
    case 'size': {
      const lo = [], hi = [], mid = []; for (let i = 0; i < t.length; i++) { const e = i >= i0 && i <= i1 && D.marineOk ? sizeInfo(D, spot, i) : null; lo.push(e ? e.lo : null); mid.push(e ? e.mid : null); hi.push(e ? e.hi : null); }
      const e = sizeInfo(D, spot, n), pk = argBest(mid, n, Math.min(i1, a48), 1);
      o.title = 'Surf size estimate'; o.sub = 'Rough breaking wave height from the swell, its period and how squarely it hits this beach';
      if (e) o.facts = [tfact('Likely now', rr(e.lo) + '–' + rr(e.hi) + ' ' + lu()), tfact('From swell', L(e.H) + ' ' + lu() + ' at ' + f0(e.T) + ' s', dirName(e.dir)), tfact('Peak, next 48 h', pk < 0 ? '–' : rr(mid[pk]) + ' ' + lu(), whenAt(D, pk)), tfact('Your level', (LEVELS.find(l => l[0] === S.prof.level) || LEVELS[1])[1], 'change it in Settings')];
      o.note = 'The estimate comes from offshore model swell, so treat it as a guide. A reef or sandbar that focuses swell can make waves break bigger or smaller.';
      o.charts.push(ch('Estimated surf size', lu() + ', the band is the likely range', [{ label: 'High end', color: S3, data: len(hi), w: 1.25, dash: '4 3' }, { label: 'Likely', color: S1, data: len(mid), w: 2.5 }, { label: 'Low end', color: 'var(--s5)', data: len(lo), w: 1.25, dash: '4 3' }], { unit: lu(), type: 'line', min: 0 })); break; }
    case 'score': {
      const p = r && r.parts, mx = { period: 35, size: 25, wind: 30 };
      o.title = 'Surf score'; o.sub = 'How good the conditions look, 0 to 100';
      if (r) o.facts = [tfact('Now', r.score + ' ' + BANDS[r.band].name)].concat(['period', 'size', 'wind'].map(k => tfact({ period: 'Swell period', size: 'Wave size', wind: 'Wind' }[k], Math.round(p[k]) + ' / ' + mx[k])), [tfact('Exposure', '×' + p.exposure.toFixed(2), 'beach faces ' + dirName(spot.face)), tfact('Chop penalty', '−' + Math.round(p.chop))]);
      o.note = 'Poor under 25 (brown), Fair 25 to 49 (between brown and green), Good 50 to 69, Great 70 to 84, Epic 85 and up. Your tide and size picks in the For you card nudge the score.';
      if (sc) o.charts.push(ch('Score by hour', '0 to 100', [{ label: 'Score', color: S1, data: sc.map(x => (x ? x.score : null)) }], { unit: '', type: 'area', min: 0, max: 100, fmt: (x, s, i) => Math.round(x) + ' ' + (sc[i] ? BANDS[sc[i].band].name : '') }));
      if (sc) o.charts.push(ch('What drives it', 'swell period, size and wind points', [{ label: 'Period (of 35)', color: S1, data: sc.map(x => (x && x.parts ? Math.round(x.parts.period * 10) / 10 : null)) }, { label: 'Size (of 25)', color: S2, data: sc.map(x => (x && x.parts ? Math.round(x.parts.size * 10) / 10 : null)) }, { label: 'Wind (of 15)', color: S3, data: sc.map(x => (x && x.parts ? Math.round(x.parts.wind * 10) / 10 : null)) }], { unit: 'pts', type: 'line', min: 0, height: 150 })); break; }
    default: o.note = 'No detail for this tile.';
  }
  o.facts = o.facts.filter(Boolean); return o;
}
function openTile(id, keepScroll) {
  const D = S.detail.get(S.selId), spot = spotById(S.selId); if (!D || !spot) return;
  TDET.id = id; const sp = tileSpec(id, D, spot), host = $('#tile'), body = $('#tile-body');
  $('#tile-h').innerHTML = tileIcon(id) + '<span>' + esc(sp.title) + '</span>'; host.querySelector('.tile-card').className = 'modal-card tile-card t-' + id; $('#tile-sub').textContent = sp.sub + ' · ' + spot.name;
  document.querySelectorAll('#tile-range button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.d === TDET.days));
  $('#tile-range').hidden = !sp.charts.length || id === 'sun' || id === 'moon';
  const st = keepScroll ? host.querySelector('.tile-card').scrollTop : 0;
  body.innerHTML = (sp.html || '') + (sp.facts.length ? '<div class="tfacts">' + sp.facts.join('') + '</div>' : '') + (sp.note ? '<p class="note">' + esc(sp.note) + '</p>' : '') + '<div id="tile-charts" style="display:grid;gap:12px"></div>';
  host.hidden = false; const g = $('#tile-charts'); sp.charts.forEach(c => { g.appendChild(c); mountChart(c); });
  host.querySelector('.tile-card').scrollTop = st; if (!keepScroll) $('#tile-close').focus({ preventScroll: true });
}
function closeTile() { const was = TDET.id; TDET.id = null; $('#tile').hidden = true; const c = document.querySelector('[data-tile="' + was + '"]'); if (c && c.offsetParent) c.focus({ preventScroll: true }); }
function wireTiles() {
  document.addEventListener('click', e => { const c = e.target.closest('[data-tile]'); if (c && !e.target.closest('a,select,input,textarea')) openTile(c.dataset.tile); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && TDET.id) { closeTile(); return; } if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-tile]')) { e.preventDefault(); openTile(e.target.dataset.tile); } });
  $('#tile-close').addEventListener('click', closeTile);
  $('#tile').addEventListener('click', e => { if (e.target.id === 'tile') closeTile(); });
  $('#tile-range').addEventListener('click', e => { const b = e.target.closest('button[data-d]'); if (!b) return; TDET.days = +b.dataset.d; openTile(TDET.id, true); });
}
function wire() {
  wireTiles();
  $('#status-pop').addEventListener('click', e => { if (e.target.id === 'retry-live') retryLive(); });
  window.addEventListener('online', () => { if (S.mode === 'offline') retryLive(true); });
  $('#status').addEventListener('click', () => { const p = $('#status-pop'); p.hidden = !p.hidden; $('#status').setAttribute('aria-expanded', !p.hidden); });
  document.addEventListener('click', e => {
    if (!e.target.closest('#status,#status-pop')) $('#status-pop').hidden = true;
    if (!e.target.closest('#search,#results')) $('#results').hidden = true;
  });
  wireMapPlay(); wireGroup5(); wireMenu(); wireShare(); wireHelp(); wireReport(); wireSwin();
  mapInit();
  $('#pin-btn').addEventListener('click', () => setPinMode(!S.pinMode));
  $('#layers-btn').addEventListener('click', () => setLayers($('#layers').hidden));
  $('#layers-close').addEventListener('click', () => setLayers(false));
  ['change', 'click'].forEach(ev => $('#layers').addEventListener(ev, () => setTimeout(layerNote, 0)));
  window.addEventListener('hashchange', applyShare);
  window.addEventListener('popstate', () => { if (S.view === 'spot' && !isDesktop()) setView('home'); });
  $('#base').addEventListener('click', e => { const b = e.target.closest('button[data-b]'); if (!b) return; S.base = b.dataset.b; S.chartIdx = 0; map.setNote(false); document.querySelectorAll('#base button').forEach(x => x.setAttribute('aria-pressed', x === b)); map.setLayers(mapLayers()); });
  $('#ov-more').addEventListener('change', e => {
    if (e.target.value && S.mode !== 'live') { toast('Satellite layers need the live connection.'); e.target.value = ''; return; }
    S.more = e.target.value; map.setLayers(mapLayers());
    if (S.more === 'sst') toast('Sea temperature from NASA MUR: blue is cold, red is warm. Updated daily, about a day behind.');
    if (S.more === 'clouds') toast(lonOf(map.v.x) > -180 && lonOf(map.v.x) < -30 ? 'Live GOES satellite clouds for the Americas, refreshed about every 10 minutes.' : 'Live GOES clouds cover the Americas only, so this shows yesterday’s daily satellite image.');
    if (S.more === 'noaa') toast('NOAA nautical chart: depths, buoys, reefs and hazards for US waters. Zoom in past the coarse view to see detail.');
    if (S.more === 'daily') toast('NASA MODIS true-color image from yesterday. Some areas have gaps between orbits.');
  });
  $('#ov-sea').addEventListener('change', e => { S.sea = e.target.checked; map.setLayers(mapLayers()); });
  $('#ov-rain').addEventListener('change', async e => { S.rain = e.target.checked; if (S.rain) { if (S.mode !== 'live') { toast('Radar needs the live connection.'); S.rain = false; e.target.checked = false; return; } await loadRadar(); } map.setLayers(mapLayers()); });
  $('#rank').addEventListener('click', rankClick);
  document.addEventListener('click', e => { if (e.target.closest('[data-act="startpin"]')) { setPinMode(true); const m = $('#map'); if (m) m.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); } });
  $('#search').addEventListener('submit', async e => {
    e.preventDefault(); const q = $('#q').value.trim(), box = $('#results'); if (!q) return; box.hidden = false; box.innerHTML = '<div class="msg">Searching…</div>'; $('#find-live').textContent = 'Searching.';
    try {
      const res = await geocode(q, S.mode); box._res = res; $('#find-live').textContent = res.length ? res.length + (res.length === 1 ? ' place' : ' places') + ' found. Move to the list to choose one.' : 'No places found.';
      box.innerHTML = res.length ? '<div class="msg">Pick a place to add it as a spot. You can move or rename it later.</div>' + res.map((r, k) => '<button type="button" data-k="' + k + '">' + esc(r.name) + '<small>' + esc(r.sub) + ', ' + fmtLat(r.lat) + ' ' + fmtLon(r.lon) + '</small></button>').join('') : '<div class="msg">No matches. Try a nearby town.</div>';
    } catch (err) { box.innerHTML = '<div class="msg">' + esc(err.message || 'Search failed') + '</div>'; $('#find-live').textContent = err.message || 'Search failed'; }
  });
  $('#results').addEventListener('click', e => {
    const b = e.target.closest('button[data-k]'); if (!b) return; const r = $('#results')._res[+b.dataset.k]; $('#results').hidden = true; $('#q').value = '';
    const have = S.pins.find(p => kmBetween(p.lat, p.lon, r.lat, r.lon) < 1); if (have) { select(have.id, { go: true, fly: true }); toast(have.name + ' is already one of your spots.'); return; }
    map.setView(r.lat, r.lon, 11); dropPin(r.lat, r.lon, r.name);
  });
  $('#namer-form').addEventListener('submit', e => { e.preventDefault(); closeNamer(true); });
  $('#namer-skip').addEventListener('click', () => closeNamer(false));
  $('#namer').addEventListener('click', e => { if (e.target.id === 'namer') closeNamer(false); });
  $('#namer-sug').addEventListener('click', e => { const b = e.target.closest('button[data-s]'); if (b) { $('#namer-in').value = b.dataset.s; $('#namer-in').focus(); } });
  document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (!$('#namer').hidden) closeNamer(false); if (!$('#layers').hidden) setLayers(false); if (S.pinMode) setPinMode(false); });
  const detail = $('#detail');
  detail.addEventListener('click', e => { if (e.target.closest && e.target.closest('#cmp-play')) cmpPlay(!CMPPLAY); });
  detail.addEventListener('input', e => { if (e.target.id === 'cmp-i') { cmpStop(); const sp = spotById(S.selId), D = S.detail.get(S.selId); if (sp && D) renderCompass(D, sp, +e.target.value, 'cmp'); } });
  detail.addEventListener('toggle', e => { const c = e.target.classList; if (!c) return; if (c.contains('plf')) S.plfOpen = e.target.open; else if (c.contains('spotedit')) S.editOpen = e.target.open; }, true);
  detail.addEventListener('change', e => {
    if (e.target.id === 'me-size') { saveNote(S.selId, { size: e.target.value }); return; }
    if (e.target.id === 'me-tide') { saveNote(S.selId, { tide: e.target.value }); return; }
    if (e.target.id === 'me-note') saveNote(S.selId, { note: e.target.value.trim().slice(0, 600) });
    if (e.target.id === 'pin-depth') { const p = S.pins.find(x => x.id === S.selId); if (p) { const v = +e.target.value; if (v > 0) { p.depth = v; delete p.nodepth; } else if (v < 0) { delete p.depth; p.nodepth = 1; } else { delete p.depth; delete p.nodepth; } store.set('pins', S.pins); S.scan.delete(p.id); const D = S.detail.get(p.id); if (D) { D._sc = {}; renderDetail(D, p); } else renderHead(null, p); scanRegion(); } }
    if (e.target.id === 'pin-face') { const p = S.pins.find(x => x.id === S.selId); if (p) { p.face = +e.target.value; p.faceAuto = false; p.faceSet = true; store.set('pins', S.pins); S.scan.delete(p.id); const D = S.detail.get(p.id); if (D) { D._sc = {}; renderDetail(D, p); } else renderHead(null, p); scanRegion(); } }
  });
  detail.addEventListener('click', e => {
    const stb = e.target.closest('#stabs button[data-stab]'); if (stb) { setStab(stb.dataset.stab); return; }
    const ftg = e.target.closest('.sec-tog'); if (ftg) { toggleFold(ftg); return; }
    const act = e.target.closest('[data-act]'); const sp = spotById(S.selId), D = S.detail.get(S.selId);
    if (act) {
      const a = act.dataset.act;
      if (a === 'back') goHome();
      if (a === 'refresh' && sp) { S.detail.delete(S.selId); S.scan.delete(S.selId); select(S.selId); scanRegion(true); }
      if (a === 'retry') select(S.selId);
      if (a === 'delpin' && sp) removePin(sp.id);
      if (a === 'mc-load' && sp && D) loadModels(D, sp);
      if (a === 'share' && sp) shareSpot(sp);
      if (a === 'rate-reset' && sp) { delete S.obs[sp.id]; store.set('obs', S.obs); S.scan.delete(sp.id); if (D) renderDetail(D, sp); renderRank(); renderMarkers(); toast('Your reports for ' + sp.name + ' were cleared.'); }
      if (a === 'ics' && sp && D) exportSpotIcs(D, sp);
      if (a === 'detect' && sp) { if (S.mode !== 'live') toast('Detecting the coastline needs the live connection.'); else { act.disabled = true; autoFace(sp, false).then(() => { act.disabled = false; }); } }
      if (a === 'renamepin' && sp) openNamer(sp, false);
      return;
    }
    const rt = e.target.closest('#rateit button[data-rate]'); if (rt && sp) { rateSpot(sp, +rt.dataset.rate); return; }
    const bc = e.target.closest('#buoy-body button[data-bid]'); if (bc && D) { BU.sel.set(S.selId, bc.dataset.bid); loadBuoySection(D, sp); return; }
    const bd = e.target.closest('#buoy-body button[data-bd]'); if (bd && D) { BU.days = +bd.dataset.bd; loadBuoySection(D, sp); return; }
    const tg = e.target.closest('button[data-tg]'); if (tg && D) { tideNav(tg.dataset.tg, D, sp); return; }
    const rg = e.target.closest('#range button[data-r], #tides-fc button[data-r]'); if (rg && D) { S.range = +rg.dataset.r; renderForecast(D, sp); return; }
    const fv = e.target.closest('#fview button[data-f]'); if (fv && D) { S.fview = fv.dataset.f; renderForecast(D, sp); return; }
    const cell = e.target.closest('.pl-cell[data-i]'); if (cell && D) { document.querySelectorAll('.pl-cell[aria-pressed="true"]').forEach(c => c.setAttribute('aria-pressed', 'false')); cell.setAttribute('aria-pressed', 'true'); $('#readout').innerHTML = readoutFor(D, sp, +cell.dataset.i); }
  });
  detail.addEventListener('pointerover', e => { const cell = e.target.closest('.pl-cell[data-i]'); const D = S.detail.get(S.selId), sp = spotById(S.selId); if (cell && D && e.pointerType === 'mouse') $('#readout').innerHTML = readoutFor(D, sp, +cell.dataset.i); });
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => { if (!isDesktop() && S.view === 'spot' && !(history.state && history.state.dp === 'spot')) { try { history.pushState({ dp: 'spot' }, ''); } catch (e) { /* optional */ } } setView(S.view); renderRank(); menuRefresh(); });
  const sk = $('#skip'); if (sk) sk.addEventListener('click', e => { e.preventDefault(); if (!isDesktop() && S.selId) setView('spot'); const d = $('#detail'); if (d) d.focus(); });
}
/* a short line under the layer controls explaining what the picked layers show here, or why they may look empty */
function layerNote() {
  const el = $('#ly-note'); if (!el || !map) return;
  const z = map.v.z, lat = latOf(map.v.y), lon = lonOf(map.v.x), out = [];
  if (S.sea && z < 9) out.push('Seamarks appear once you zoom in on a harbor or stretch of coast.');
  if (S.rain && !S.radarPath) out.push('Loading rain radar…'); else if (S.rain && z > 7) out.push('Radar is shown at a coarser scale when zoomed in this far.');
  if (S.more === 'noaa' && !(lat > 15 && lat < 72 && (lon < -60 || lon > 140))) out.push('NOAA nautical charts only cover US waters.');
  if (S.more === 'sst') out.push('Sea temperature from satellite, updated daily: red is warmer, blue is colder.');
  if (S.more === 'clouds') out.push(lon > -180 && lon < -30 ? 'Live clouds from the GOES weather satellites, about 10 minutes old.' : 'Live clouds cover the Americas only, so this shows yesterday’s satellite picture instead.');
  if (S.more === 'daily') out.push('Yesterday’s true-color satellite picture.');
  const bad = [...new Set(map.layers.filter(l => S.layerFail.has(l.id)).map(l => LAYER_NAMES[l.id] || l.id))];
  if (bad.length) out.unshift(bad.join(', ') + ' could not load' + (onSite() ? ': the map server is not answering or is blocked on this network. Try again in a minute.' : ' in this preview. Open dawnpatrol.casadelfuego.org to see map layers.'));
  el.textContent = out.join(' ');
}
function setLayers(on) {
  const p = $('#layers'); p.hidden = !on; $('#layers-btn').setAttribute('aria-expanded', String(!!on));
  if (on) { layerNote(); if (!isDesktop()) p.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); }
  if (!on) { if (MP.playing) mpPlay(false); if (S.when.kind !== 'now') mpSet(0); }
}
async function retryLive(silent) {
  const spot = spotById(S.selId) || S.pins[0] || null, rb = () => $('#retry-live'); if (rb()) rb().textContent = 'Connecting…';
  try {
    if (spot) { const d = await loadDetail(spot, 'live'); d.mode = 'live'; S.detail.clear(); S.scan.clear(); S.detail.set(spot.id, d); offlineSave(spot.id, d); fcRecord(d, spot); } else await probeLive();
    S.mode = 'live'; S.radarPath = null;
    renderStatus(); $('#status-pop').hidden = true; toast('Connected. Showing live data.'); if (spot) await select(spot.id); scanRegion(true);
  } catch (e) { if (rb()) rb().textContent = 'Try the live connection again'; if (!silent) toast('Still cannot reach the live services' + (e && e.status ? ' (HTTP ' + e.status + ')' : '') + '.'); }
}
/* with no spots saved yet, a tiny request tells live from demo: one open-ocean cell, one hour of waves */
const probeLive = () => jget('https://marine-api.open-meteo.com/v1/marine?latitude=0&longitude=-140&hourly=wave_height&forecast_days=1', 8000);
const PWA = { evt: null };
const isStandalone = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
async function initPwa() {
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); PWA.evt = e; menuRefresh(); });
  window.addEventListener('appinstalled', () => { PWA.evt = null; toast('Installed. Open Dawn Patrol from your home screen.'); menuRefresh(); });
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
  try { const reg = await navigator.serviceWorker.register('/sw.js'); if (!store.get('bloom', false)) stopOldPush(reg); } catch (e) { /* no offline shell here */ }
}
/* surf alerts were retired: switch off a subscription left over from an older version so it stops sending */
async function stopOldPush(reg) {
  try {
    const sub = reg && reg.pushManager && await reg.pushManager.getSubscription(); if (!sub) return;
    hostFetch('/api/push/unsubscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
    await sub.unsubscribe();
  } catch (e) { /* nothing to switch off */ }
}
const cNum = (v, a, b) => { v = typeof v === 'string' && v.trim() === '' ? NaN : +v; return isFinite(v) && v >= a && v <= b ? v : null; };
const cStr = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
const cSlug = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
const newPinId = () => 'pin-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
function cleanPin(p, keepId) {
  if (!isObj(p)) return null;
  const lat = cNum(p.lat, -90, 90), lon = cNum(p.lon, -180, 180); if (lat == null || lon == null) return null;
  const face = cNum(p.face, 0, 360), old = cStr(p.id, 40);
  const o = { id: keepId && /^pin-[a-z0-9]{3,24}$/.test(old) ? old : newPinId(), name: cStr(p.name, 40) || 'Imported spot', lat: +lat.toFixed(4), lon: +lon.toFixed(4), face: face == null ? 270 : Math.round(face) % 360, custom: true, region: 'Your pins' };
  if (p.faceAuto === true) o.faceAuto = true;
  if (p.faceSet === true) o.faceSet = true;
  const dp = cNum(p.depth, 0.3, 30); if (dp != null) o.depth = Math.round(dp * 100) / 100; else if (p.nodepth === true) o.nodepth = true;
  Object.defineProperty(o, '_old', { value: old, enumerable: false });
  return o;
}
function cleanWins(w) {
  if (!isObj(w)) return null; const o = {};
  Object.keys(w).slice(0, 200).forEach(id => {
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(id) || !Array.isArray(w[id])) return;
    const set = new Set(); w[id].slice(0, 32).forEach(d => { const n = cNum(d, 0, 360); if (n != null) set.add((Math.round(n / 22.5) % 16) * 22.5); });
    if (set.size) o[id] = Array.from(set).sort((a, b) => a - b);
  });
  return o;
}
function cleanNote(n) {
  if (!isObj(n)) return null; const o = {};
  if (TIDE_PREFS.some(x => x[0] === n.tide) && n.tide !== 'any') o.tide = n.tide;
  if (SIZE_PREFS.some(x => x[0] === n.size) && n.size !== 'any') o.size = n.size;
  const t = cStr(n.note, 600); if (t) o.note = t;
  return Object.keys(o).length ? o : null;
}
function cleanLayout(l) {
  const out = {}; if (!isObj(l)) return out;
  LAY_TABS.forEach(t => {
    const x = l[t]; if (!isObj(x)) return;
    const list = a => (Array.isArray(a) ? a.filter(k => typeof k === 'string' && /^[a-z0-9-]{1,40}$/.test(k)).slice(0, 40) : []);
    const o = list(x.o), h = list(x.h); if (o.length || h.length) out[t] = { o: o.filter((k, i) => o.indexOf(k) === i), h: h.filter((k, i) => h.indexOf(k) === i) };
  });
  return out;
}
/* turns anything into a safe bundle: {pins, notes, wins, layout, units, theme, prof, plan, a11y}; absent parts stay absent */
function cleanBundle(b, keepIds) {
  const o = {}; if (!isObj(b)) return o;
  const pins = Array.isArray(b.pins) ? b.pins : Array.isArray(b.spots) ? b.spots : null;
  if (pins) o.pins = pins.slice(0, 200).map(p => cleanPin(p, keepIds)).filter(Boolean).slice(0, 24);
  if (isObj(b.notes)) { o.notes = {}; Object.keys(b.notes).slice(0, 300).forEach(k => { const n = cleanNote(b.notes[k]); if (n && k.length <= 60) o.notes[k] = n; }); }
  if (isObj(b.layout)) o.layout = cleanLayout(b.layout);
  if (isObj(b.wins)) o.wins = cleanWins(b.wins);
  const pf = isObj(b.prefs) ? b.prefs : b;
  if (pf.units === 'imperial' || pf.units === 'metric') o.units = pf.units;
  if (pf.theme === 'light' || pf.theme === 'dark') o.theme = pf.theme;
  if (isObj(pf.prof)) o.prof = { level: LEVELS.some(x => x[0] === pf.prof.level) ? pf.prof.level : 'intermediate', board: cStr(pf.prof.board, 40) };
  if (isObj(pf.plan)) o.plan = cleanPlan(pf.plan);
  if (isObj(pf.a11y)) o.a11y = cleanA11y(pf.a11y);
  return o;
}
const nearPin = (list, p) => list.find(x => Math.abs(x.lat - p.lat) < 0.0006 && Math.abs(x.lon - p.lon) < 0.0006);
const acAgo = t => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago'; };
const b64e = t => { const by = new TextEncoder().encode(t); let s = ''; for (let i = 0; i < by.length; i += 8192) s += String.fromCharCode.apply(null, by.subarray(i, i + 8192)); return btoa(s); };
const b64d = t => { const s = atob(t), by = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) by[i] = s.charCodeAt(i); return new TextDecoder().decode(by); };
const plural = (n, a, b) => n + ' ' + (n === 1 ? a : b || a + 's');
const X_CATS = [
  ['spots', 'Your spots', () => S.pins.length, n => plural(n, 'spot') + ' with names and beach direction', true],
  ['notes', 'Spot notes and swell directions', () => new Set(Object.keys(S.notes).concat(Object.keys(S.wins))).size, n => plural(n, 'spot') + ' with tide, size, notes or swell directions', true],
  ['prefs', 'Settings', () => 1, () => 'Units, light or dark, your level, accessibility', true],
  ['layout', 'Page layout', () => Object.keys(S.layout).length, n => 'Your section order and hidden sections', true],
];
let xSel = {};
function openExport() {
  xSel = {}; X_CATS.forEach(c => { xSel[c[0]] = c[4] && c[2]() > 0; });
  $('#x-list').innerHTML = X_CATS.map(c => { const n = c[2](); return '<label class="xrow' + (n ? '' : ' off') + '"><input type="checkbox" data-xc="' + c[0] + '"' + (xSel[c[0]] ? ' checked' : '') + (n ? '' : ' disabled') + '><span><b>' + esc(c[1]) + '</b><small>' + esc(n ? c[3](n) : 'Nothing to export yet') + '</small></span></label>'; }).join('');
  xRefresh(); $('#xport').hidden = false;
}
function buildBundle(sel) {
  const b = { app: 'dawn-patrol', kind: 'export', v: 1, created: new Date().toISOString() };
  if (sel.spots) b.spots = S.pins.map(p => { const o = { id: p.id, name: p.name, lat: p.lat, lon: p.lon, face: p.face }; if (p.faceAuto) o.faceAuto = true; if (p.faceSet) o.faceSet = true; if (p.depth > 0) o.depth = p.depth; else if (p.nodepth) o.nodepth = true; return o; });
  if (sel.notes) { b.notes = S.notes; b.wins = S.wins; }
  if (sel.prefs) b.prefs = { units: S.units, theme: isDark() ? 'dark' : 'light', prof: S.prof, plan: S.plan, a11y: S.a11y };
  if (sel.layout) b.layout = S.layout;
  return b;
}
const X_PREFIX = 'DAWNPATROL1:';
function xRefresh() {
  const any = Object.keys(xSel).some(k => xSel[k]), b = buildBundle(xSel), txt = X_PREFIX + b64e(JSON.stringify(b));
  $('#x-text').value = any ? txt : ''; $('#x-copy').disabled = $('#x-dl').disabled = !any;
  $('#x-note').textContent = any ? 'About ' + Math.max(1, Math.round(txt.length / 1024)) + ' KB. Anyone with this text or file can import it.' : 'Pick at least one item to export.';
}
function exportBundleFile() { const d = new Date(); return 'dawn-patrol-' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + '.json'; }
let iClean = null, iMode = 'merge', iSel = {};
function parseBundleText(t) {
  t = String(t || '').trim(); if (!t) return { error: '' };
  if (t.length > 3e6) return { error: 'That is too large to be a Dawn Patrol export.' };
  let j;
  try { if (t[0] === '{') j = JSON.parse(t); else { const raw = t.replace(/^DAWNPATROL1:/i, '').replace(/\s+/g, ''); j = JSON.parse(b64d(raw)); } }
  catch (e) { return { error: 'That doesn’t look like a Dawn Patrol export. Paste the whole text or choose the file you downloaded.' }; }
  if (!isObj(j) || j.app !== 'dawn-patrol') return { error: 'That file is not a Dawn Patrol export.' };
  if (+j.v !== 1) return { error: 'This export comes from a newer version of the app. Reload the page and try again.' };
  return { bundle: j };
}
function importPreview() {
  const r = parseBundleText($('#i-text').value); iClean = null; iSel = {};
  if (!r.bundle) { $('#i-prev').innerHTML = ''; $('#i-note').textContent = r.error; $('#i-go').disabled = true; return; }
  const c = cleanBundle(r.bundle, false); iClean = c;
  const rows = [['spots', 'Spots', c.pins ? c.pins.length : 0, c.pins ? c.pins.map(p => p.name).slice(0, 4).join(', ') + (c.pins.length > 4 ? '…' : '') : ''], ['notes', 'Spot notes and swell directions', (c.notes ? Object.keys(c.notes).length : 0) + (c.wins ? Object.keys(c.wins).length : 0), ''], ['prefs', 'Settings', c.units || c.theme || c.prof || c.plan || c.a11y ? 1 : 0, 'Units, light or dark, level, accessibility'], ['layout', 'Page layout', c.layout ? Object.keys(c.layout).length : 0, '']];
  rows.forEach(x => { iSel[x[0]] = x[2] > 0; });
  $('#i-prev').innerHTML = rows.map(x => '<label class="xrow' + (x[2] ? '' : ' off') + '"><input type="checkbox" data-ic="' + x[0] + '"' + (iSel[x[0]] ? ' checked' : '') + (x[2] ? '' : ' disabled') + '><span><b>' + esc(x[1]) + (x[2] && x[0] === 'spots' ? ' (' + x[2] + ')' : '') + '</b><small>' + esc(x[2] ? x[3] || 'In this export' : 'Not in this export') + '</small></span></label>').join('');
  importNote();
}
function importNote() {
  const any = iClean && Object.keys(iSel).some(k => iSel[k]);
  $('#i-go').disabled = !any;
  $('#i-note').textContent = !iClean ? '' : !any ? 'Tick at least one item to import.' : iMode === 'merge' ? 'Adds the ticked items to what you have. Spots within about 60 m of one of yours are skipped. Settings and layout from the file replace yours.' : 'Replaces the ticked items with the contents of the file. Anything of yours in those groups that is not in the file is removed.';
}
function applyImport() {
  const c = iClean, sel = iSel, rep = iMode === 'replace'; if (!c) return;
  const idMap = {}; let added = 0, skipped = 0, over = 0;
  if (sel.spots && c.pins) {
    const before = S.pins.slice();
    if (rep) S.pins.length = 0;
    c.pins.forEach(p => {
      if (rep) { const was = nearPin(before, p); if (was && !S.pins.some(x => x.id === was.id)) p.id = was.id; }
      const ex = nearPin(S.pins, p); if (ex) { idMap[p._old] = ex.id; skipped++; return; }
      if (S.pins.length >= 24) { over++; return; }
      S.pins.push(p); idMap[p._old] = p.id; added++;
    });
    store.set('pins', S.pins);
  }
  const mp = id => (idMap[id] || id), remap = o => { const n = {}; Object.keys(o || {}).forEach(k => { n[mp(k)] = o[k]; }); return n; };
  if (sel.notes && c.notes) { S.notes = rep ? remap(c.notes) : Object.assign({}, S.notes, remap(c.notes)); store.set('notes', S.notes); }
  if (sel.notes && c.wins) { S.wins = rep ? remap(c.wins) : Object.assign({}, S.wins, remap(c.wins)); store.set('wins', S.wins); }
  if (sel.prefs) {
    if (c.units) { S.units = c.units; store.set('units', S.units); }
    if (c.prof) { S.prof = c.prof; store.set('prof', S.prof); store.set('lvlask', 1); setSurfLevel(S.prof.level); S.detail.forEach(d => { d._sc = {}; }); }
    if (c.plan) { S.plan = c.plan; store.set('plan', S.plan); }
    if (c.a11y) { S.a11y = cleanA11y(c.a11y); store.set('a11y', S.a11y); applyA11y(); }
    if (c.theme && c.theme !== (isDark() ? 'dark' : 'light')) setTheme(c.theme);
  }
  if (sel.layout && c.layout) { S.layout = rep ? c.layout : Object.assign({}, S.layout, c.layout); store.set('layout', S.layout); }
  if (!spotById(S.selId)) S.selId = S.pins.length ? S.pins[0].id : null;
  const off = offlineAll(); Object.keys(off).forEach(k => { if (!spotById(k)) delete off[k]; }); store.set('offline', off);
  S.detail.forEach(d => { d._sc = {}; }); S.scan.clear();
  renderAllLists(); fitPins(); scanRegion(); applyLayoutAll(); if (S.selId) select(S.selId); else renderEmptyDetail();
  const parts = []; if (added) parts.push(plural(added, 'spot') + ' added'); if (skipped) parts.push(plural(skipped, 'spot') + ' already there'); if (over) parts.push(plural(over, 'spot') + ' left out (limit of 24)');
  ['notes', 'prefs', 'layout'].forEach(k => { if (sel[k]) parts.push({ notes: 'notes', prefs: 'settings', layout: 'layout' }[k]); });
  $('#iport').hidden = true; toast('Imported: ' + (parts.join(', ') || 'nothing new') + '.');
}
const LAY_TABS = ['now', 'forecast', 'xnow', 'xfc'];
const LAY = { drag: null };
const layMovable = el => el.nodeType === 1 && (el.classList.contains('sec') || el.classList.contains('verdict') || el.id === 'haz');
const layPane = tab => { const s = $('#tab-' + tab); return s ? s.querySelector(':scope > .pane') : null; };
function layKeys(pane) {
  const used = new Set();
  return Array.from(pane.children).filter(layMovable).map(el => {
    let k = el.dataset.lk || '';
    if (!k) { if (el.id) k = cSlug(el.id); else if (el.classList.contains('verdict')) k = 'summary'; else { const h = el.querySelector('h2'); if (h) { const c = h.cloneNode(true); c.querySelectorAll('small, .srcb').forEach(x => x.remove()); k = cSlug(c.textContent); } } }
    k = k || 'section'; let n = k, i = 2; while (used.has(n)) n = k + '-' + i++; used.add(n); el.dataset.k = n; return el;
  });
}
function layName(el) {
  const h = el.querySelector('h2'); if (h) { const c = h.cloneNode(true); c.querySelectorAll('small, .srcb').forEach(x => x.remove()); const t = c.textContent.trim(); if (t) return t; }
  return el.id === 'haz' ? 'Alerts and surf zone' : el.classList.contains('verdict') ? 'Summary of right now' : el.dataset.k;
}
function applyLayout(tab) {
  const pane = layPane(tab); if (!pane) return;
  const items = layKeys(pane); items.forEach((el, i) => { if (el.dataset.di == null) el.dataset.di = i; });
  const L = S.layout[tab] || {}, o = L.o || [], hs = new Set(L.h || []);
  const base = items.slice().sort((a, b) => a.dataset.di - b.dataset.di);
  const known = base.filter(e => o.includes(e.dataset.k)).sort((a, b) => o.indexOf(a.dataset.k) - o.indexOf(b.dataset.k)), res = known.slice();
  base.forEach((e, i) => { if (known.includes(e)) return; let j = i - 1; while (j >= 0 && !res.includes(base[j])) j--; res.splice(j < 0 ? 0 : res.indexOf(base[j]) + 1, 0, e); });
  const kids = Array.from(pane.children); let n = 0; const out = kids.map(c => (layMovable(c) ? res[n++] : c));
  if (out.some((c, i) => c !== kids[i])) out.forEach(c => pane.appendChild(c));
  items.forEach(el => el.classList.toggle('lay-hide', hs.has(el.dataset.k) && !el.hasAttribute('data-lay-fixed')));
  if (document.body.classList.contains('editing')) layDecorate(pane);
}
const applyLayoutAll = () => LAY_TABS.forEach(applyLayout);
const GRIP = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.800"/><circle cx="15" cy="6" r="1.800"/><circle cx="9" cy="12" r="1.800"/><circle cx="15" cy="12" r="1.800"/><circle cx="9" cy="18" r="1.800"/><circle cx="15" cy="18" r="1.800"/></svg>';
function layDecorate(pane) {
  Array.from(pane.children).filter(layMovable).forEach(el => {
    if (el.hidden || (el.id === 'haz' && !el.textContent.trim())) return;
    el.classList.add('lay-edit'); el.draggable = true;
    let bar = el.querySelector(':scope > .lay-bar');
    if (!bar) { bar = document.createElement('div'); bar.className = 'lay-bar'; bar.contentEditable = 'false'; el.insertBefore(bar, el.firstChild); }
    const fixed = el.hasAttribute('data-lay-fixed'), hid = el.classList.contains('lay-hide');
    bar.innerHTML = '<span class="lay-grip" title="Drag to move">' + GRIP + '</span><span class="lay-name">' + esc(layName(el)) + (hid ? ' (hidden)' : '') + '</span><button type="button" data-lay="up" aria-label="Move ' + esc(layName(el)) + ' up">↑</button><button type="button" data-lay="down" aria-label="Move ' + esc(layName(el)) + ' down">↓</button>' + (fixed ? '' : '<button type="button" data-lay="hide">' + (hid ? 'Show' : 'Hide') + '</button>');
  });
}
function layUndecorate() {
  document.querySelectorAll('.lay-bar').forEach(b => b.remove());
  document.querySelectorAll('.lay-edit').forEach(e => { e.classList.remove('lay-edit', 'lay-drag', 'lay-before', 'lay-after'); e.draggable = false; });
}
function laySave(tab) {
  const pane = layPane(tab); if (!pane) return;
  const cur = Array.from(pane.children).filter(layMovable).map(e => e.dataset.k), present = new Set(cur), L = S.layout[tab] || { o: [], h: [] }, merged = []; let ci = 0;
  (L.o || []).forEach(k => merged.push(present.has(k) ? cur[ci++] : k)); while (ci < cur.length) merged.push(cur[ci++]);
  L.o = merged.slice(0, 40); L.h = (L.h || []).slice(0, 40); S.layout[tab] = L; store.set('layout', S.layout);
}
function layToggleHide(el, tab) {
  const L = S.layout[tab] || { o: [], h: [] }, k = el.dataset.k, h = L.h || [], i = h.indexOf(k);
  if (i < 0) h.push(k); else h.splice(i, 1); L.h = h; L.o = L.o || []; S.layout[tab] = L; el.classList.toggle('lay-hide', i < 0); laySave(tab);
}
function layReset(tab) { const t = tab ? [tab] : LAY_TABS; t.forEach(x => delete S.layout[x]); store.set('layout', S.layout); applyLayoutAll(); }
function setEditing(on) {
  if (on && !isDesktop()) { toast('Editing the layout works on a larger screen, such as a computer.'); return; } on = !!on;
  document.body.classList.toggle('editing', on); $('#lay-banner').hidden = !on;
  if (on) { closeMenu(); applyLayoutAll(); const d = $('#detail'); if (d) d.scrollTop = 0; } else layUndecorate();
}
function layClearMarks() { document.querySelectorAll('.lay-before,.lay-after,.lay-drag').forEach(e => e.classList.remove('lay-before', 'lay-after', 'lay-drag')); }
function wireLayout() {
  LAY_TABS.forEach(tab => { const s = $('#tab-' + tab); if (s) new MutationObserver(() => applyLayout(tab)).observe(s, { childList: true }); });
  $('#lay-done').addEventListener('click', () => setEditing(false));
  $('#lay-banner').addEventListener('click', e => { const b = e.target.closest('[data-lay-reset]'); if (!b) return; layReset(); toast('The spot page is back to the default order.'); });
  document.addEventListener('click', e => {
    const b = e.target.closest('.lay-bar button[data-lay]'); if (!b) return; const el = b.closest('.lay-edit'), pane = el.parentElement, tab = pane.parentElement.dataset.tab, w = b.dataset.lay;
    if (w === 'hide') { layToggleHide(el, tab); layDecorate(pane); return; }
    const sib = p => { let x = p === 'up' ? el.previousElementSibling : el.nextElementSibling; while (x && !x.classList.contains('lay-edit')) x = p === 'up' ? x.previousElementSibling : x.nextElementSibling; return x; };
    const t = sib(w); if (!t) return; if (w === 'up') pane.insertBefore(el, t); else pane.insertBefore(el, t.nextSibling);
    laySave(tab); el.scrollIntoView({ block: 'nearest' }); const nb = el.querySelector('.lay-bar button[data-lay="' + w + '"]'); if (nb) nb.focus({ preventScroll: true });
  });
  document.addEventListener('dragstart', e => { const el = e.target.closest && e.target.closest('.pane > .lay-edit'); if (!el || !document.body.classList.contains('editing')) return; LAY.drag = el; e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', el.dataset.k); } catch (x) { /* ok */ } setTimeout(() => el.classList.add('lay-drag'), 0); });
  document.addEventListener('dragover', e => {
    const t = LAY.drag && e.target.closest && e.target.closest('.pane > .lay-edit'); if (!t || t.parentElement !== LAY.drag.parentElement) return; e.preventDefault(); e.dataTransfer.dropEffect = 'move';
    document.querySelectorAll('.lay-before,.lay-after').forEach(x => x.classList.remove('lay-before', 'lay-after')); if (t === LAY.drag) return;
    const r = t.getBoundingClientRect(); t.classList.add(e.clientY > r.top + r.height / 2 ? 'lay-after' : 'lay-before');
  });
  document.addEventListener('drop', e => {
    const t = LAY.drag && e.target.closest && e.target.closest('.pane > .lay-edit'); if (!t || t.parentElement !== LAY.drag.parentElement) return; e.preventDefault();
    const d = LAY.drag, pane = d.parentElement, tab = pane.parentElement.dataset.tab;
    if (t !== d) { const r = t.getBoundingClientRect(); if (e.clientY > r.top + r.height / 2) pane.insertBefore(d, t.nextSibling); else pane.insertBefore(d, t); laySave(tab); }
    LAY.drag = null; layClearMarks();
  });
  document.addEventListener('dragend', () => { LAY.drag = null; layClearMarks(); });
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => { if (!isDesktop()) setEditing(false); });
}
const brgTo = (a, b, c, d) => { const r = Math.PI / 180, y = Math.sin((d - b) * r) * Math.cos(c * r), x = Math.cos(a * r) * Math.sin(c * r) - Math.sin(a * r) * Math.cos(c * r) * Math.cos((d - b) * r); return (Math.atan2(y, x) / r + 360) % 360; };
function swellSeries(D) { const h = [], t = [], d = []; for (let i = 0; i < D.H.t.length; i++) { const v = valAt(D.H, i); h.push(v.sH != null ? v.sH : v.wH); t.push(v.sT != null ? v.sT : v.wT); d.push(v.sD != null ? v.sD : v.wD); } return { h, t, d }; }
function forecastPulse(D, i0) {
  const s = swellSeries(D), end = Math.min(s.h.length - 1, i0 + 60), b = s.h.slice(i0, i0 + 4).filter(x => x != null);
  if (!b.length) return null; const base = b.reduce((x, y) => x + y, 0) / b.length; let pk = -1;
  for (let i = i0 + 4; i <= end; i++) if (s.h[i] != null && (pk < 0 || s.h[i] > s.h[pk])) pk = i;
  const now = { base, T: s.t[i0], dir: s.d[i0] };
  if (pk < 0 || s.h[pk] < base * 1.3 || s.h[pk] - base < 0.3) return Object.assign({ flat: true }, now);
  const half = base + (s.h[pk] - base) * 0.5; let up = i0; for (let i = i0; i <= pk; i++) if (s.h[i] != null && s.h[i] >= half) { up = i; break; }
  let st = up; while (st - 1 >= i0 && s.h[st - 1] != null && s.h[st - 1] < s.h[st]) st--;
  return { base, Tbase: s.t[i0], peak: s.h[pk], pk, up, st, T: s.t[pk], dir: s.d[pk] };
}
async function buoyLead(spot, dirFrom) {
  const list = await nearBuoys(spot);
  const c = list.filter(s => s.type === 'buoy' && s.km >= 25 && s.km <= 500 && isFinite(s.lat) && angDiff(brgTo(spot.lat, spot.lon, s.lat, s.lon), dirFrom) <= 55).sort((a, b) => b.km - a.km).slice(0, 4);
  for (const st of c) {
    try {
      const d = await buoyObs(st.id), H = buoyLatest(d, 'wvht', 3), T = buoyLatest(d, 'dpd', 3); if (!H || !T || T.v < 8) continue;
      const dir = buoyLatest(d, 'mwd', 3), col = d.std.wvht; let tr = null;
      for (let j = d.std.t.length - 1; j >= 0; j--) if (d.std.t[j] <= H.t - 5 * 3600 && col[j] != null) { const r = (H.v - col[j]) / Math.max(0.1, col[j]); tr = r > 0.15 ? 'rising' : r < -0.15 ? 'dropping' : 'steady'; break; }
      const hrs = st.km / (2.81 * T.v);
      return { st, H: H.v, T: T.v, dir: dir ? dir.v : null, tr, hrs, arrive: H.t * 1000 + hrs * 3600000, brg: brgTo(spot.lat, spot.lon, st.lat, st.lon) };
    } catch (e) { /* next buoy */ }
  }
  return null;
}
const arrAt = (D, i) => dayLabel(D.H.t[i]) + ' ' + fmtClock(D.H.t[i]);
function arrivalHtml(D, p) {
  if (!p) return '<p class="note" style="margin:0">No swell forecast for this point.</p>';
  if (p.flat) return '<div class="arr-h">No new pulse in the next 2½ days</div><p class="arr-s">Swell holds near ' + L(p.base) + ' ' + lu() + (p.T != null ? ' at ' + f0(p.T) + ' s' : '') + (p.dir != null ? ' from the ' + dirName(p.dir) : '') + '.</p>';
  const lead = p.T - p.Tbase >= 2 ? ' The longer-period lines (' + f0(p.T) + ' s) show up first, so the first sets can look bigger than the numbers suggest.' : '';
  return '<div class="arr-h">Pulse arriving around ' + esc(arrAt(D, p.up)) + '</div><p class="arr-s">Swell builds from about ' + esc(arrAt(D, p.st)) + ', going from ' + L(p.base) + ' to <b>' + L(p.peak) + ' ' + lu() + '</b> at ' + f0(p.T) + ' s from the ' + dirName(p.dir) + ', peaking near ' + esc(arrAt(D, p.pk)) + '.' + lead + '</p>';
}
async function fillArrival(D, spot) {
  const box = $('#arr-body'); if (!box) return; const i = hourIndexNow(D.H, D.off), p = D.marineOk ? forecastPulse(D, i) : null;
  let h = arrivalHtml(D, p); const live = S.mode === 'live';
  box.innerHTML = h + (live ? '<p class="note arr-b" id="arr-buoy" style="margin:8px 0 0">Checking buoys upstream…</p>' : '');
  if (!live) return;
  try {
    const dirFrom = p && p.dir != null ? p.dir : (valAt(D.H, i).sD != null ? valAt(D.H, i).sD : valAt(D.H, i).wD), b = dirFrom != null ? await buoyLead(spot, dirFrom) : null;
    const el = $('#arr-buoy'); if (!el || S.selId !== spot.id) return;
    if (!b) { el.textContent = 'No wave buoy upstream of this spot is reporting right now, so this is the model forecast only.'; return; }
    const ms = b.arrive, when = localStr(ms, D.off), hrsTxt = b.hrs < 1.2 ? 'about an hour' : 'about ' + f1(b.hrs) + ' hours';
    el.innerHTML = '<b>Upstream check:</b> ' + esc(b.st.name) + ' (' + distTxt(b.st.km) + ' to the ' + dirName(b.brg) + ') reads <b>' + L(b.H) + ' ' + lu() + ' at ' + f0(b.T) + ' s</b>' + (b.tr ? ', ' + b.tr + ' over 6 h' : '') + '. Swell at that period covers the distance in ' + hrsTxt + ', so it reaches ' + esc(spot.name) + ' around <b>' + esc(arrAt({ H: { t: [when] } }, 0)) + '</b>' + (ms < Date.now() ? ' (already here)' : '') + '.';
  } catch (e) { const el = $('#arr-buoy'); if (el) el.textContent = 'Buoy data isn’t available right now, so this is the model forecast only.'; }
}
const WIND_PREFS = [['any', 'Any wind'], ['clean', 'Light or offshore'], ['off', 'Offshore only']];
function cleanPlan(p) { if (!isObj(p)) return null; return { tide: TIDE_PREFS.some(x => x[0] === p.tide) ? p.tide : 'any', wind: WIND_PREFS.some(x => x[0] === p.wind) ? p.wind : 'any' }; }
const planActive = () => S.plan.tide !== 'any' || S.plan.wind !== 'any';
function planHourOk(D, spot, i, tide) {
  const v = valAt(D.H, i);
  if (S.plan.tide !== 'any' && tide) { const m = tideMatch(S.plan.tide, tidePhase(tide, i)); if (m === false) return false; }
  if (S.plan.wind !== 'any') { const k = windRel(v.wsp, v.wdir, spot.face).kind; if (S.plan.wind === 'off' ? k !== 'off' : !(k === 'light' || k === 'off')) return false; }
  return true;
}
function planFilterHtml(D, spot) {
  const chip = (k, v, t, cur) => '<button type="button" class="chip" data-pl="' + k + '" data-v="' + v + '" aria-pressed="' + (cur === v) + '">' + t + '</button>';
  return '<div class="plan-f"><div class="plan-r"><span>Tide</span><div class="chips">' + TIDE_PREFS.map(x => chip('tide', x[0], x[0] === 'any' ? 'Any' : x[1].replace(' tide', ''), S.plan.tide)).join('') + '</div></div>' +
    '<div class="plan-r"><span>Wind</span><div class="chips">' + WIND_PREFS.map(x => chip('wind', x[0], x[1], S.plan.wind)).join('') + '</div></div></div>';
}
function planMatchHtml(D, spot) {
  if (!planActive()) return '';
  const sc = scoresOf(D, spot), tide = tideHourly(D), masked = sc.map((r, i) => (r && planHourOk(D, spot, i, tide) ? r : null)), nowI = hourIndexNow(D.H, D.off), rows = [];
  for (let d = 0; d < Math.min(S.range, D.daily.time.length); d++) { const w = bestWindow(D.H, masked, D.daily.time[d], D.daily.sunrise[d], D.daily.sunset[d]); if (w && w.i1 >= nowI) rows.push(w); }
  let h = '<div class="plan-m" id="pl-match"><b>Windows that match your filters</b>';
  if (S.plan.tide !== 'any' && !tide) h += '<p class="note" style="margin:4px 0">There is no tide data for this spot, so the tide filter is not applied.</p>';
  h += rows.length ? '<div class="plan-l">' + rows.map(w => '<div><span>' + esc(winText(D, w)) + '</span><b>' + BANDS[bandOf(w.avg)].name + ' ' + Math.round(w.avg) + '</b></div>').join('') + '</div>' : '<p class="note" style="margin:4px 0">No 3-hour daylight window matches in the next ' + S.range + ' days. Loosen a filter to see more.</p>';
  if (S.plan.tide !== 'any' && tide && (S.notes[spot.id] || {}).tide !== S.plan.tide) h += '<button type="button" class="btn sm" data-pl="save">Save ' + esc(S.plan.tide) + (/^(low|mid|high)$/.test(S.plan.tide) ? ' tide' : ' tide') + ' as the preferred tide for ' + esc(spot.name) + '</button>';
  else if (S.plan.tide !== 'any' && (S.notes[spot.id] || {}).tide === S.plan.tide) h += '<p class="note" style="margin:4px 0">This is saved as your tide preference here, so scores already favor it.</p>';
  return h + '</div>';
}
function wireGroup2() {
  document.addEventListener('click', e => {
    const pl = e.target.closest('[data-pl]'); if (!pl) return;
    const D = S.detail.get(S.selId), sp = spotById(S.selId), k = pl.dataset.pl;
    if (k === 'save') { if (sp) saveNote(sp.id, { tide: S.plan.tide }); toast('Saved. Scores at ' + (sp ? sp.name : 'this spot') + ' now favor that tide.'); return; }
    S.plan = cleanPlan(Object.assign({}, S.plan, { [k]: pl.dataset.v })); store.set('plan', S.plan); if (D && sp) renderForecast(D, sp);
  });
}
const RAIN_CAUTION_MM = 2.5, RAIN_HEAVY_MM = 12.7;
function rainAdvice(mmPast72, mmNext24) {
  if (mmPast72 >= RAIN_HEAVY_MM) return { tone: 'bad', head: 'Heavy rain in the last 3 days', text: 'Runoff carries bacteria and debris into the surf, especially near river mouths, creeks and storm drains. Many coastal health departments advise staying out of the water for 72 hours after rain, and longer after heavy rain.' };
  if (mmPast72 >= RAIN_CAUTION_MM) return { tone: 'warn', head: 'Rain in the last 3 days', text: 'Many coastal health departments advise staying out of the water for 72 hours after rain. Stay away from river mouths, creeks and storm drains, and check the local advisory before you paddle out.' };
  if (mmNext24 >= RAIN_CAUTION_MM) return { tone: 'warn', head: 'Rain is forecast in the next day', text: 'The water is likely fine now. After the rain arrives, expect poorer water quality for about three days, especially near drains.' };
  return { tone: 'ok', head: 'No significant rain in the last 3 days', text: 'Rain runoff is not expected to affect the water. This does not measure bacteria, so follow any posted beach advisory.' };
}
const rainMm = mm => (S.units === 'imperial' ? f1(mm / 25.4 * 10) / 10 + ' in' : f1(mm) + ' mm');
async function loadRain(spot) {
  const k = spot.lat.toFixed(2) + ',' + spot.lon.toFixed(2), hit = RAIN.get(k); if (hit && Date.now() - hit.at < 30 * 60000) return hit.v;
  const j = await jget('https://api.open-meteo.com/v1/forecast?latitude=' + spot.lat.toFixed(3) + '&longitude=' + spot.lon.toFixed(3) + '&hourly=precipitation&past_days=3&forecast_days=2&timezone=GMT', 15000);
  if (!j.hourly || !Array.isArray(j.hourly.time) || !Array.isArray(j.hourly.precipitation)) throw new Error('No rain data');
  const now = Date.now(); let past = 0, next = 0, n = 0;
  j.hourly.time.forEach((t, i) => { const ms = Date.parse(t + ':00Z'), v = j.hourly.precipitation[i]; if (!isFinite(ms) || v == null) return; n++; if (ms <= now && ms > now - 72 * 3600000) past += v; else if (ms > now && ms <= now + 24 * 3600000) next += v; });
  if (!n) throw new Error('No rain data');
  const v = { past, next }; RAIN.set(k, { at: now, v }); return v;
}
const RAIN = new Map();
async function fillRain(D, spot) {
  const box = $('#rain-body'); if (!box) return;
  if (S.mode !== 'live') { box.innerHTML = '<p class="note" style="margin:0">Rain history needs the live connection.</p>'; return; }
  try {
    const r = await loadRain(spot); if (S.selId !== spot.id || !$('#rain-body')) return; const a = rainAdvice(r.past, r.next);
    $('#rain-body').innerHTML = '<div class="adv" data-t="' + a.tone + '"><b>' + esc(a.head) + '</b><p>' + esc(a.text) + '</p><div class="adv-n">Last 72 hours: <b>' + esc(rainMm(r.past)) + '</b> · Next 24 hours: <b>' + esc(rainMm(r.next)) + '</b></div></div><p class="note" style="margin:8px 0 0">This is based on rainfall, not a lab test. For measured water quality, see <a target="_blank" rel="noopener noreferrer" href="https://beachreportcard.org">Heal the Bay’s Beach Report Card</a> or <a target="_blank" rel="noopener noreferrer" href="https://www.surfrider.org/programs/blue-water-task-force">Surfrider’s Blue Water Task Force</a>.</p>';
  } catch (e) { const b = $('#rain-body'); if (b) b.innerHTML = '<p class="note" style="margin:0">Rain history is not available right now.</p>'; }
}
/* conditions in the Now summary: tide height and direction, water temperature, wind, and a note after meaningful rain in the last 72 hours */
async function fillNowConds(D, spot) {
  if (!$('#cond-slot')) return;
  if (D.tideN === undefined) { try { D.tideN = await getTides(spot); } catch (e) { D.tideN = null; } }
  let rain = null;
  try { rain = await loadRain(spot); } catch (e) { rain = null; }
  if (S.selId !== spot.id || !$('#cond-slot')) return;
  const nowS = Math.floor(Date.now() / 1000), lines = [];
  const i = hourIndexNow(D.H, D.off), v = valAt(D.H, i), cur = D.current || {};
  const TM = tideModelFor(D), th = TM ? TM.at(nowS) : null, tr = TM ? tideTrendAt(TM, nowS) : null;
  if (th != null) lines.push(dpEm(tr === 'rising' ? '⬆️' : tr === 'falling' ? '⬇️' : '↔️') + '<b>Tide</b> ' + L(th) + ' ' + lu() + ', <span>' + (tr === 'rising' ? 'rising' : tr === 'falling' ? 'falling' : 'steady') + '</span> <span class="cond-src">' + esc(TM.kind === 'noaa' ? 'NOAA ' + ((TM.station && TM.station.name) || '') : 'model') + '</span>');
  const T = D.tideN, last = T && T.supported && T.temp && T.temp.length ? T.temp[T.temp.length - 1] : null;
  if (last && nowS - last[0] < 3 * 3600) {
    const src = 'NOAA ' + ((T.station && T.station.name) || '') + (T.station && T.station.km != null ? ', ' + Math.round(T.station.km * 0.621) + ' mi' : '');
    lines.push(dpEm(dpWaterEm(last[1])) + '<b>Water</b> ' + TP(last[1]) + tu() + ' <span class="cond-src">' + esc(src.trim()) + '</span>');
  } else if (D.marineOk && v.sst != null) {
    lines.push(dpEm(dpWaterEm(v.sst)) + '<b>Water</b> ' + TP(v.sst) + tu() + ' <span class="cond-src">model</span>');
  }
  const wsp = cur.wind_speed_10m != null ? cur.wind_speed_10m : v.wsp, wdir = cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir;
  if (wsp != null) lines.push(dpEm(dpWindEm(wsp)) + '<b>Wind</b> ' + SP(wsp) + ' ' + su() + ' from ' + dirName(wdir) + ' <span class="cond-src">model</span>');
  if (rain && rain.past >= RAIN_CAUTION_MM) lines.push(dpEm('❌') + '<b>Contamination note</b> ' + rainMm(rain.past) + ' of rain in the last 72 hours. Runoff can make the water unsafe for about 72 hours after rain. Stay away from river mouths, creeks and storm drains.');
  $('#cond-slot').innerHTML = lines.map(x => '<span class="cond-line" style="display:block;margin-top:6px">' + x + '</span>').join('');
}
const CROWD_HR = { 5: .25, 6: .55, 7: .8, 8: .9, 9: .85, 10: .75, 11: .7, 12: .7, 13: .65, 14: .6, 15: .6, 16: .7, 17: .75, 18: .55, 19: .25 };
const CROWD_LV = [[25, 'Quiet'], [45, 'Light'], [65, 'Moderate'], [85, 'Busy'], [999, 'Packed']];
const crowdWord = v => CROWD_LV.find(x => v < x[0])[1];
/* stoplight: green = quiet or light, yellow = moderate, red = busy or packed */
const crowdCls = v => v < 45 ? 'sl-g' : v < 65 ? 'sl-y' : 'sl-r';
function crowdAt(D, spot, i, sc) {
  const t = D.H.t[i], h = parseT(t).h, base = CROWD_HR[h]; if (base == null) return null;
  const d = dow(t), wk = d === 0 || d === 6 ? 1.35 : d === 5 ? 1.1 : 1, r = sc[i], v = valAt(D.H, i);
  let f = base * wk * (0.6 + 0.8 * (r ? r.score : 40) / 100);
  const ph = v.sH != null ? v.sH : v.wH, ft = ph != null ? ph * M2FT : null; if (ft != null) { if (ft < 1) f *= 0.6; else if (ft > 8) f *= 0.7; }
  if (v.sst != null) f *= v.sst < 13 ? 0.85 : v.sst >= 20 ? 1.1 : 1;
  if (v.pop != null && v.pop > 60) f *= 0.7;
  return Math.round(clamp(f / 1.7 * 100, 0, 130));
}
function crowdPlan(D, spot) {
  const sc = scoresOf(D, spot), nowI = hourIndexNow(D.H, D.off), out = []; let bestQ = null;
  for (let d = 0; d < Math.min(3, D.daily.time.length); d++) {
    const day = D.daily.time[d], [h0, h1] = lightRange(D.daily.sunrise[d], D.daily.sunset[d]);
    const idx = []; for (let i = 0; i < D.H.t.length; i++) if (D.H.t[i].startsWith(day)) { const h = parseT(D.H.t[i]).h; if (h >= h0 && h <= h1) idx.push(i); }
    for (let a = 0; a + 3 <= idx.length; a++) {
      const seg = idx.slice(a, a + 3); if (seg[2] < nowI) continue; const vals = seg.map(i => (sc[i] ? sc[i].score : null)); if (vals.some(x => x == null)) continue;
      const cs = seg.map(i => crowdAt(D, spot, i, sc)); if (cs.some(x => x == null)) continue;
      const w = { i0: seg[0], i1: seg[2], avg: vals.reduce((x, y) => x + y, 0) / 3, crowd: Math.round(cs.reduce((x, y) => x + y, 0) / 3) }; w.val = w.avg - 0.35 * w.crowd; out.push(w);
      if (!bestQ || w.avg > bestQ.avg) bestQ = w;
    }
  }
  const quiet = out.filter(w => w.avg >= 45).sort((a, b) => b.val - a.val)[0] || null;
  return { bestQ, quiet };
}
function crowdHtml(D, spot) {
  if (!D.marineOk) return '<p class="note" style="margin:0">Crowd estimates need the wave forecast.</p>';
  const sc = scoresOf(D, spot), i = hourIndexNow(D.H, D.off), now = crowdAt(D, spot, i, sc), p = crowdPlan(D, spot);
  let h = '<div class="crowd-h">' + (now != null ? 'Right now: <b class="' + crowdCls(now) + '">' + crowdWord(now) + '</b>' : 'Right now: <b>Dark, nobody out</b>') + '</div>';
  const cells = []; const t0 = D.H.t[i].slice(0, 10);
  for (let k = 0; k < D.H.t.length && cells.length < 16; k++) { if (!D.H.t[k].startsWith(t0)) continue; const c = crowdAt(D, spot, k, sc); if (c != null) cells.push([k, c]); }
  if (cells.length) h += '<div class="crowd-row" role="img" aria-label="Estimated crowd by hour today">' + cells.map(x => '<span class="crowd-c ' + crowdCls(x[1]) + '" style="--c:' + Math.min(1, x[1] / 100).toFixed(2) + '" title="' + esc(fmtHr(D.H.t[x[0]]) + ': ' + crowdWord(x[1])) + '"><i></i><small>' + ([6, 9, 12, 15, 18].includes(parseT(D.H.t[x[0]]).h) ? (parseT(D.H.t[x[0]]).h % 12 || 12) : '') + '</small></span>').join('') + '</div>';
  if (p.bestQ) {
    h += '<p class="crowd-p">Best surf: <b>' + esc(winText(D, p.bestQ)) + '</b> (' + BANDS[bandOf(p.bestQ.avg)].name.toLowerCase() + ', ' + Math.round(p.bestQ.avg) + '), expect <b class="' + crowdCls(p.bestQ.crowd) + '">' + crowdWord(p.bestQ.crowd).toLowerCase() + '</b> crowds.';
    if (p.quiet && p.quiet.i0 !== p.bestQ.i0 && p.quiet.crowd + 12 < p.bestQ.crowd) h += ' A quieter choice: <b>' + esc(winText(D, p.quiet)) + '</b> (' + BANDS[bandOf(p.quiet.avg)].name.toLowerCase() + ', ' + Math.round(p.quiet.avg) + '), ' + crowdWord(p.quiet.crowd).toLowerCase() + '.';
    h += '</p>';
  }
  return h + '<div class="crowd-key"><span class="sl-g">● Quiet or light</span><span class="sl-y">● Moderate</span><span class="sl-r">● Busy or packed</span></div><p class="note" style="margin:6px 0 0">An estimate from the time of day and week, how good the surf is, size and water temperature. It is not a headcount, and a well-known break can be busier than this suggests.</p>';
}
async function fillSources(D, spot) {
  const box = $('#src-body'); if (!box) return;
  const ago = t => (t ? acAgo(t) : 'just now');
  const line = (n, w) => '<li><b>' + esc(n) + '</b><span>' + esc(w) + '</span></li>';
  const src = () => {
    const bu = BU.near.get(spot.lat.toFixed(2) + ',' + spot.lon.toFixed(2)), nb = bu && bu.find(s => s.type === 'buoy'), M = D.mcLite || D.mc;
    let l = line('Open-Meteo marine and weather', 'Wave, swell, wind, tide height and air data, loaded ' + ago(D.loadedAt));
    if (D.xs) l += line(xsNames(D.xs), D.xs.backup ? 'Stood in for Open-Meteo, which didn’t answer. Next 3 days only.' : 'Blended into wind and swell for the next 3 days (' + D.xs.wind + ' wind hours, ' + D.xs.swell + ' swell hours)');
    if (M && M.marine && M.marine.models.length) l += line('Wave models', M.marine.models.map(m => m.name).join(', '));
    if (M && M.wind && M.wind.models.length) l += line('Wind models', M.wind.models.map(m => m.name).join(', '));
    l += line('NOAA buoys (NDBC)', nb ? 'Nearest wave buoy: ' + nb.name + ', ' + distTxt(nb.km) + ' away' : 'Listed under Buoys, below');
    l += line('Tides', D.tideN && D.tideN.supported ? 'NOAA CO-OPS predictions for the nearest station' : 'Model sea level (no NOAA station nearby)');
    l += line('Alerts and rain', 'National Weather Service alerts, Open-Meteo rainfall');
    return '<details class="src"><summary>Where this comes from</summary><ul>' + l + '</ul><p class="note" style="margin:6px 0 0">Scores and the crowd estimate are worked out in this app from that data.</p></details>';
  };
  const badge = (t, w, pctWave, pctWind) => '<div class="agree">' + (pctWave != null ? '<div><span class="agree-k">Waves</span> ' + agreeTag(pctWave) + '<small>' + w + '</small></div>' : '') + (pctWind != null ? '<div><span class="agree-k">Wind</span> ' + agreeTag(pctWind * 0.8) + '<small>' + t + '</small></div>' : '') + '</div>';
  box.innerHTML = '<div id="agree-slot"><p class="note" style="margin:0">Checking whether the forecast models agree…</p></div>' + src();
  if (S.mode !== 'live') { $('#agree-slot').innerHTML = '<p class="note" style="margin:0">Model agreement needs the live connection.</p>'; return; }
  try {
    let M = D.mc || D.mcLite; if (!M) { M = await apiGet('/api/models?lat=' + spot.lat + '&lon=' + spot.lon, 30000); D.mcLite = M; }
    if (S.selId !== spot.id || !$('#agree-slot')) return;
    const tt = D.H.t, alignA = (g, key) => { const ix = new Map(g.t.map((s, k) => [s, k])); return g.models.map(m => tt.map(s => { const k = ix.get(s); return k == null ? null : m[key][k]; })); };
    const wv = M.marine && M.marine.models.length > 1 ? modelSpread(alignA(M.marine, 'h'), 72) : null, wd = M.wind && M.wind.models.length > 1 ? modelSpread(alignA(M.wind, 's'), 72) : null;
    if (!wv && !wd) { $('#agree-slot').innerHTML = '<p class="note" style="margin:0">Not enough models cover this point to compare them.</p>'; return; }
    const wT = wv ? 'Models differ by about ' + f1(cvLen(wv.spread, S.units)) + ' ' + lu() + ' over the next 3 days' : '', nT = wd ? 'Models differ by about ' + f0(cvSpd(wd.spread, S.units)) + ' ' + su() + ' over the next 3 days' : '';
    $('#agree-slot').innerHTML = badge(nT, wT, wv ? wv.pct : null, wd ? wd.pct : null);
    const st = $('#src-body details.src'); if (st) { const open = st.open; st.outerHTML = src(); const n = $('#src-body details.src'); if (n && open) n.open = true; }
  } catch (e) { const s = $('#agree-slot'); if (s) s.innerHTML = '<p class="note" style="margin:0">Model agreement is not available right now.</p>'; }
}
const reduced = () => (S.a11y && S.a11y.motion === 'reduce') || !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const SCENES = new Set();
function stopScenes() { SCENES.forEach(s => s.stop()); SCENES.clear(); }
const mixC = (a, b, f) => a.map((x, k) => x + (b[k] - x) * f), rgbS = (c, a) => 'rgba(' + c.map(Math.round).join(',') + ',' + (a == null ? 1 : a) + ')';
function sceneAt(D, spot, i) {
  const H = D.H; i = clamp(i, 0, H.t.length - 1);
  const v = valAt(H, i), date = H.t[i].slice(0, 10), d = D.daily.time.indexOf(date), pt = parseT(H.t[i]);
  const sr = d >= 0 && D.daily.sunrise[d] ? parseT(D.daily.sunrise[d]) : { h: 6, mi: 0 }, ss = d >= 0 && D.daily.sunset[d] ? parseT(D.daily.sunset[d]) : { h: 19, mi: 0 };
  const a = sr.h + sr.mi / 60, b = ss.h + ss.mi / 60, dayF = (pt.h + (pt.mi || 0) / 60 - a) / Math.max(1, b - a);
  let lo = Infinity, hi = -Infinity; for (let k = 0; k < H.t.length; k++) if (H.t[k].startsWith(date) && H.tide[k] != null) { lo = Math.min(lo, H.tide[k]); hi = Math.max(hi, H.tide[k]); }
  const tide = v.tide != null && hi > lo ? (v.tide - lo) / (hi - lo) : 0.5, nx = H.tide[Math.min(H.t.length - 1, i + 1)], tdir = v.tide != null && nx != null ? Math.sign(nx - v.tide) : 0;
  const pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, rel = windRel(v.wsp, v.wdir, spot.face), sc = D.marineOk ? scoresOf(D, spot) : [], r = sc[i], cr = D.marineOk ? crowdAt(D, spot, i, sc) : null;
  return { i, t: H.t[i], m: pH || 0, ft: (pH || 0) * M2FT, per: pT || 8, wsp: v.wsp || 0, kind: rel.kind, c: rel.c || 0, windLabel: rel.label, tide, tdir, tideV: v.tide, dayF, band: r ? r.band : null, score: r ? r.score : null, crowd: cr == null ? 0 : cr, surfers: cr == null ? 0 : Math.round(clamp(cr / 100 * 9, 0, 9)) };
}
function sceneBlend(a, b, f) {
  if (!b || b === a || f <= 0) return a;
  const o = { ...(f < 0.5 ? a : b) }; ['m', 'ft', 'per', 'wsp', 'c', 'tide', 'crowd'].forEach(k => { o[k] = a[k] + (b[k] - a[k]) * f; });
  if (Math.abs(a.dayF - b.dayF) < 0.8) o.dayF = a.dayF + (b.dayF - a.dayF) * f;
  o.kind = o.wsp < 8 ? 'light' : o.c <= -0.3 ? 'off' : o.c < 0.3 ? 'cross' : 'on'; o.surfers = Math.round(clamp(o.crowd / 100 * 9, 0, 9)); return o;
}
const tideWord = p => (p.tide > 0.66 ? 'High' : p.tide < 0.34 ? 'Low' : 'Mid') + ' tide' + (p.tdir > 0 ? ', rising' : p.tdir < 0 ? ', falling' : '');
const sceneLabel = p => 'Drawing of the lineup: waves about ' + L(p.m) + ' ' + lu() + ' every ' + f0(p.per) + ' seconds, wind ' + (p.windLabel || 'light').toLowerCase() + ' at ' + SP(p.wsp) + ' ' + su() + ', ' + tideWord(p).toLowerCase() + (p.surfers ? ', about ' + p.surfers + ' surfers out' : ', nobody out') + (p.dayF < 0 || p.dayF > 1 ? ', dark' : '');
const sceneCap = p => '<span><b>' + L(p.m) + ' ' + lu() + '</b> at ' + f0(p.per) + ' s</span><span>Wind <b>' + SP(p.wsp) + ' ' + su() + '</b> ' + esc((p.windLabel || '').toLowerCase()) + '</span><span>' + tideWord(p) + '</span><span>' + (p.dayF < -0.04 || p.dayF > 1.04 ? 'Dark' : p.surfers ? '<b>' + crowdWord(p.crowd) + '</b> lineup' : 'Empty lineup') + '</span>';
function drawLineup(cv, p, ts) {
  const dpr = window.devicePixelRatio || 1, W = cv.clientWidth || 640, Hh = cv.clientHeight || 220;
  if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(Hh * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(Hh * dpr); }
  const c = cv.getContext('2d'); if (!c) return; c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const t = ts / 1000, sc = W / 700, hz = Hh * 0.36, day = p.dayF;
  const light = clamp(Math.min(day + 0.06, 1.06 - day) / 0.2, 0, 1), warm = light > 0.02 && light < 0.8 ? 1 - light : 0;
  let top = mixC([9, 22, 42], [86, 158, 206], light), hor = mixC([26, 50, 76], [206, 232, 242], light);
  if (warm) { hor = mixC(hor, [244, 160, 112], warm * 0.55); top = mixC(top, [120, 118, 170], warm * 0.25); }
  const g = c.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, rgbS(top)); g.addColorStop(1, rgbS(hor)); c.fillStyle = g; c.fillRect(0, 0, W, Hh);
  if (light < 0.35) { c.fillStyle = 'rgba(255,255,255,' + (0.8 * (1 - light / 0.35)).toFixed(2) + ')'; for (let k = 0; k < 26; k++) c.fillRect((k * 137.5 % 100) / 100 * W, ((k * 53.7) % 100) / 100 * hz * 0.8, 1.5, 1.5); }
  if (day > -0.04 && day < 1.04) { const d = clamp(day, 0, 1), x = W * (0.1 + 0.8 * d), y = hz - hz * 0.78 * Math.sin(Math.PI * d); c.fillStyle = 'rgba(255,232,170,.2)'; c.beginPath(); c.arc(x, y, 26 * sc + 6, 0, 7); c.fill(); c.fillStyle = 'rgba(255,232,170,.96)'; c.beginPath(); c.arc(x, y, 12 * sc + 3, 0, 7); c.fill(); }
  else { c.fillStyle = 'rgba(236,240,250,.92)'; c.beginPath(); c.arc(W * 0.2, hz * 0.42, 9 * sc + 2, 0, 7); c.fill(); }
  const tide = clamp(p.tide == null ? 0.5 : p.tide, 0, 1), y0 = hz + (Hh - hz) * 0.36 - 7 * tide, shore = W * (0.76 + 0.09 * tide);
  const lam = W * clamp(p.per / 55, 0.12, 0.34), k = 2 * Math.PI / lam, spd = (22 + p.per * 6) * sc;
  const A0 = clamp(p.ft, 0.3, 16) * Hh * 0.0155, chop = clamp(p.wsp / 28, 0, 1.3) * (p.kind === 'on' ? 1.7 : p.kind === 'off' ? 0.3 : 1) * 1.7;
  const far = mixC([10, 40, 62], [70, 150, 180], light * 0.9 + 0.1), seaTop = mixC([22, 84, 112], [64, 160, 186], light * 0.9 + 0.1), seaDeep = mixC([8, 26, 44], [20, 78, 108], light);
  const fg = c.createLinearGradient(0, hz, 0, y0); fg.addColorStop(0, rgbS(mixC(far, hor, 0.35))); fg.addColorStop(1, rgbS(far)); c.fillStyle = fg; c.fillRect(0, hz, W, Hh - hz);
  const ys = [], crest = [];
  c.beginPath(); c.moveTo(0, Hh);
  for (let x = 0; x <= shore + 6; x += 3) {
    const s = clamp((x - W * 0.38) / (shore - W * 0.38), 0, 1), ph = k * (x - spd * t), sh = Math.sin(ph), A = A0 * (0.45 + 1.7 * s * s);
    const y = y0 - A * (sh + 0.3 * s * Math.sin(2 * ph + 0.9)) + chop * Math.sin(x * 0.13 - t * 3.1) * (0.6 + 0.4 * Math.sin(x * 0.031 + t));
    ys.push(y); if (s > 0.5 && sh > 0.9) crest.push([x, y, s]); c.lineTo(x, y);
  }
  c.lineTo(shore + 6, Hh); c.closePath();
  const sg = c.createLinearGradient(0, y0 - A0 * 2, 0, Hh); sg.addColorStop(0, rgbS(seaTop)); sg.addColorStop(1, rgbS(seaDeep)); c.fillStyle = sg; c.fill();
  c.strokeStyle = 'rgba(255,255,255,.38)'; c.lineWidth = 1.4; c.beginPath(); ys.forEach((y, n) => (n ? c.lineTo(n * 3, y) : c.moveTo(0, y))); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.85)'; crest.forEach(q => { c.beginPath(); c.arc(q[0], q[1] + 1, 1.2 + 2.2 * q[2], 0, 7); c.fill(); });
  if (p.kind === 'off') { c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1; crest.forEach((q, n) => { if (n % 2) return; c.beginPath(); c.moveTo(q[0], q[1] - 2); c.lineTo(q[0] - (5 + p.wsp * 0.3) * sc, q[1] - 5 - (n % 3)); c.stroke(); }); }
  const sand = mixC([92, 82, 70], [236, 214, 166], light * 0.9 + 0.1); c.fillStyle = rgbS(sand); c.beginPath(); c.moveTo(shore - 30, Hh); c.lineTo(shore + 2, y0 + 4); c.lineTo(W, y0 - 22); c.lineTo(W, Hh); c.closePath(); c.fill();
  c.fillStyle = 'rgba(255,255,255,.75)'; c.beginPath(); c.ellipse(shore + 2 + 5 * Math.sin(t * 1.3), y0 + 5, 14, 2.2, 0, 0, 7); c.fill();
  if (light > 0.08 && p.surfers > 0) for (let n = 0; n < p.surfers; n++) {
    const x = W * (0.46 + 0.052 * n + 0.012 * Math.sin(n * 3.1)), y = ys[Math.min(ys.length - 1, Math.round(x / 3))] - 2 + Math.sin(t * 1.2 + n) * 0.8;
    c.fillStyle = 'rgba(250,240,220,.95)'; c.beginPath(); c.ellipse(x, y, 7 * sc + 2, 1.7, 0, 0, 7); c.fill();
    c.fillStyle = 'rgba(18,26,34,.92)'; c.beginPath(); c.arc(x, y - 5 * sc - 1.5, 2.1 * sc + 0.9, 0, 7); c.fill(); c.fillRect(x - 0.9, y - 5 * sc, 1.8, 4 * sc);
  }
  const ns = clamp(Math.round(p.wsp / 5), 0, 9), dir = p.c >= 0 ? 1 : -1; c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 1.2;
  for (let n = 0; n < ns; n++) { const x = (((n * 211.3) + t * (30 + p.wsp * 2.2) * dir * sc) % W + W) % W, y = 14 + ((n * 0.618034) % 1) * hz * 0.9, len = (18 + p.wsp * 0.6) * sc; c.beginPath(); c.moveTo(x, y); c.lineTo(x - dir * len, y); c.stroke(); }
}
function mountScene(cv, getP) {
  let raf = 0, vis = true, last = 0, io = null, dead = false;
  const api = {
    redraw() { try { drawLineup(cv, getP(), api.t0 || 0); } catch (e) { /* drawing is decoration */ } },
    stop() { dead = true; if (raf) cancelAnimationFrame(raf); raf = 0; if (io) io.disconnect(); SCENES.delete(api); },
  };
  const frame = ts => {
    if (dead) return; if (!document.body.contains(cv)) { api.stop(); return; }
    if (vis && ts - last >= 32) { last = ts; try { drawLineup(cv, getP(), ts); } catch (e) { /* ignore */ } }
    raf = requestAnimationFrame(frame);
  };
  SCENES.add(api);
  if ('IntersectionObserver' in window) { io = new IntersectionObserver(es => { vis = es[es.length - 1].isIntersecting; }); io.observe(cv); }
  api.redraw(); if (!reduced()) raf = requestAnimationFrame(frame);
  return api;
}
const lineupNowHtml = () => '<div class="sec" id="lineup-now"><h2>Lineup <small>a picture of the numbers right now</small></h2><div class="card scene-card"><canvas class="scene" id="ln-cv" role="img" aria-label="Drawing of the lineup"></canvas><div class="scene-cap" id="ln-cap"></div></div><p class="note">A drawing built from the forecast, not a photo. Wave size, period, wind, tide and the crowd estimate shape it. The sea is drawn larger than life so you can see the difference.</p></div>';
function mountLineupNow(D, spot) {
  const cv = $('#ln-cv'); if (!cv) return; const p = sceneAt(D, spot, hourIndexNow(D.H, D.off));
  cv.setAttribute('aria-label', sceneLabel(p)); $('#ln-cap').innerHTML = sceneCap(p); mountScene(cv, () => p);
}
function mountTimelapseExtras(D, spot, n0, n1, getPos) {
  const cv = $('#an-scene'), strip = $('#an-strip'); if (!cv) return null;
  const cache = new Map(), at = i => { i = clamp(i, 0, D.H.t.length - 1); if (!cache.has(i)) cache.set(i, sceneAt(D, spot, i)); return cache.get(i); };
  const sc = D.marineOk ? scoresOf(D, spot) : null; let cur = at(n0);
  const scene = mountScene(cv, () => cur);
  if (strip) {
    let h = '', days = '';
    for (let i = n0; i <= n1; i++) {
      const date = D.H.t[i].slice(0, 10), d = D.daily.time.indexOf(date), [h0, h1] = d >= 0 ? lightRange(D.daily.sunrise[d], D.daily.sunset[d]) : [6, 19], hr = parseT(D.H.t[i]).h, night = hr < h0 || hr > h1, r = sc ? sc[i] : null;
      h += '<i class="an-c' + (night ? ' dk' : '') + '"' + (r && !night ? ' data-b="' + r.band + '"' : '') + '></i>';
      if (hr === 0 && i > n0) days += '<span style="left:' + ((i - n0) / (n1 - n0) * 100).toFixed(2) + '%">' + WD[dow(D.H.t[i])] + '</span>';
    }
    strip.innerHTML = h + '<b class="an-ph" id="an-ph"></b>'; const dl = $('#an-days'); if (dl) dl.innerHTML = days;
  }
  return {
    update() {
      const pos = getPos(), a = Math.floor(n0 + pos), f = n0 + pos - a; cur = sceneBlend(at(a), at(Math.min(n1, a + 1)), f);
      cv.setAttribute('aria-label', sceneLabel(cur)); const cap = $('#an-cap'); if (cap) cap.innerHTML = sceneCap(cur);
      const ph = $('#an-ph'); if (ph) ph.style.left = (pos / Math.max(1, n1 - n0) * 100).toFixed(2) + '%'; if (reduced()) scene.redraw();
    },
  };
}
const REPLAY = { day: 0, pos: 12, playing: false, raf: 0, speed: 1.5, last: 0 };
function stopReplay() { if (REPLAY.raf) cancelAnimationFrame(REPLAY.raf); REPLAY.raf = 0; REPLAY.playing = false; }
const replaySection = D => D.marineOk ? '<div class="sec" id="replay-sec"><h2>Day replay <small>watch one day unfold, hour by hour</small></h2><div class="chips" id="rp-days" role="group" aria-label="Day to replay"></div><div class="card scene-card"><canvas class="scene" id="rp-cv" role="img" aria-label="Drawing of the lineup for the chosen time"></canvas><div class="scene-cap" id="rp-cap"></div></div>' +
  '<svg class="rp-chart" id="rp-chart" viewBox="0 0 600 96" preserveAspectRatio="none" role="img" aria-label="Tide, swell size and surf score through the day"></svg><div class="rp-key"><span><i style="background:var(--s1)"></i>Tide</span><span><i style="background:var(--s2)"></i>Swell size</span><span><i style="background:var(--q3)"></i>Score by hour</span></div>' +
  '<div class="cmp-ctl"><button class="btn sm" id="rp-play" type="button">Play</button><input type="range" id="rp-i" min="0" max="239" step="1" value="120" aria-label="Time of day"><output id="rp-t" for="rp-i"></output></div>' +
  '<div class="chips" id="rp-speed" role="group" aria-label="Replay speed" style="margin-top:8px">' + [['Slow', 0.8], ['Normal', 1.5], ['Fast', 3.5]].map(x => '<button type="button" class="chip" data-s="' + x[1] + '" aria-pressed="' + (REPLAY.speed === x[1]) + '">' + x[0] + '</button>').join('') + '</div>' +
  '<p class="note">The water rises and falls with the tide, the swell grows and shrinks with the forecast, and the wind streaks follow its direction. Tap the chart to jump to a time.</p></div>' : '';
function mountReplay(D, spot) {
  stopReplay(); const cv = $('#rp-cv'); if (!cv) return;
  const H = D.H, sc = scoresOf(D, spot), nd = Math.min(D.daily.time.length, S.range, 7), chips = $('#rp-days');
  if (REPLAY.day >= nd) REPLAY.day = 0;
  chips.innerHTML = D.daily.time.slice(0, nd).map((d, k) => '<button type="button" class="chip" data-d="' + k + '" aria-pressed="' + (k === REPLAY.day) + '">' + dayLabel(d) + '</button>').join('');
  const cache = new Map(), at = i => { i = clamp(i, 0, H.t.length - 1); if (!cache.has(i)) cache.set(i, sceneAt(D, spot, i)); return cache.get(i); };
  let idx0 = 0, hrs = 24, cur = at(0), lastKey = '';
  const setDay = k => {
    REPLAY.day = k; const date = D.daily.time[k]; idx0 = H.t.findIndex(t => t.startsWith(date)); if (idx0 < 0) idx0 = 0; hrs = 0; while (idx0 + hrs < H.t.length && H.t[idx0 + hrs].startsWith(date)) hrs++;
    $('#rp-i').max = String(Math.max(1, hrs - 1) * 10 + 9); REPLAY.pos = clamp(REPLAY.pos, 0, hrs - 0.01);
    chips.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.d === k)); drawChart(); update();
  };
  function drawChart() {
    const ix = []; for (let h = 0; h < hrs; h++) ix.push(idx0 + h); const tv = ix.map(i => H.tide[i]).filter(x => x != null), tl = Math.min(...tv), th = Math.max(...tv);
    const sw = ix.map(i => (H.sH[i] != null ? H.sH[i] : H.wH[i])), mx = Math.max(0.3, ...sw.filter(x => x != null)), X = h => (h / Math.max(1, hrs - 1)) * 600;
    const line = (arr, lo, hi) => arr.map((v, h) => (v == null ? null : (h ? 'L' : 'M') + X(h).toFixed(1) + ' ' + (78 - 68 * (hi > lo ? (v - lo) / (hi - lo) : 0.5)).toFixed(1))).filter(Boolean).join('').replace(/^L/, 'M');
    let svg = ''; ix.forEach((i, h) => { const r = sc[i]; if (r) svg += '<rect x="' + (X(h) - 300 / Math.max(1, hrs - 1)).toFixed(1) + '" y="86" width="' + (600 / Math.max(1, hrs - 1)).toFixed(1) + '" height="10" fill="var(--q' + r.band + ')"/>'; });
    if (tv.length) svg += '<path d="' + line(ix.map(i => H.tide[i]), tl, th) + '" fill="none" stroke="var(--s1)" stroke-width="2.4" vector-effect="non-scaling-stroke"/>';
    svg += '<path d="' + line(sw, 0, mx) + '" fill="none" stroke="var(--s2)" stroke-width="2.4" stroke-dasharray="5 3" vector-effect="non-scaling-stroke"/><line id="rp-ph" x1="0" x2="0" y1="0" y2="96" stroke="var(--ink)" stroke-width="1.6" vector-effect="non-scaling-stroke"/>';
    $('#rp-chart').innerHTML = svg;
  }
  function update() {
    const h = REPLAY.pos, a = Math.floor(h), f = h - a; cur = sceneBlend(at(idx0 + a), at(idx0 + Math.min(hrs - 1, a + 1)), f);
    const key = Math.round(h * 10) + '|' + REPLAY.day; if (key === lastKey) return; lastKey = key;
    $('#rp-i').value = String(Math.round(h * 10)); const hh = Math.floor(h), mm = Math.round((h - hh) * 60 / 5) * 5;
    $('#rp-t').textContent = dayLabel(H.t[idx0]) + ' ' + ((hh % 12) || 12) + ':' + String(mm % 60).padStart(2, '0') + (hh < 12 ? ' AM' : ' PM');
    const ph = $('#rp-ph'); if (ph) { const x = h / Math.max(1, hrs - 1) * 600; ph.setAttribute('x1', x); ph.setAttribute('x2', x); }
    cv.setAttribute('aria-label', sceneLabel(cur)); $('#rp-cap').innerHTML = (cur.score != null ? '<span><b>' + BANDS[cur.band].name + ' ' + Math.round(cur.score) + '</b></span>' : '') + sceneCap(cur); if (reduced()) scene.redraw();
  }
  const scene = mountScene(cv, () => cur);
  const tick = ts => {
    if (!document.body.contains(cv)) { stopReplay(); return; }
    if (REPLAY.playing) { REPLAY.pos += Math.min(0.1, (ts - REPLAY.last) / 1000) * REPLAY.speed; if (REPLAY.pos >= hrs - 0.01) REPLAY.pos = 0; REPLAY.last = ts; update(); REPLAY.raf = requestAnimationFrame(tick); } else REPLAY.raf = 0;
  };
  const setPlaying = on => { REPLAY.playing = on; const b = $('#rp-play'); b.textContent = on ? 'Pause' : 'Play'; b.setAttribute('aria-pressed', on); if (on && !REPLAY.raf) { REPLAY.last = performance.now(); REPLAY.raf = requestAnimationFrame(tick); } };
  $('#rp-play').addEventListener('click', () => setPlaying(!REPLAY.playing));
  $('#rp-i').addEventListener('input', e => { setPlaying(false); REPLAY.pos = clamp(+e.target.value / 10, 0, hrs - 0.01); update(); });
  chips.addEventListener('click', e => { const b = e.target.closest('button[data-d]'); if (b) { lastKey = ''; setDay(+b.dataset.d); } });
  $('#rp-speed').addEventListener('click', e => { const b = e.target.closest('button[data-s]'); if (!b) return; REPLAY.speed = +b.dataset.s; document.querySelectorAll('#rp-speed button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#rp-chart').addEventListener('pointerdown', e => { const r = e.currentTarget.getBoundingClientRect(); setPlaying(false); REPLAY.pos = clamp((e.clientX - r.left) / Math.max(1, r.width) * (hrs - 1), 0, hrs - 0.01); update(); });
  setDay(REPLAY.day);
}
const MP = { pos: 0, playing: false, raf: 0, last: 0, speed: 5, flow: false, layer: 'swell', grid: null, key: '', fraf: 0, fl: 0, parts: [], mv: 0 };
const mpDate = h => { const d = new Date(); d.setMinutes(0, 0, 0); d.setTime(d.getTime() + h * 3600000); return d; };
const mpLabel = h => { if (!h) return 'Now'; const d = mpDate(h), hr = d.getHours(); return WD[d.getDay()] + ' ' + ((hr % 12) || 12) + (hr < 12 ? ' AM' : ' PM'); };
function mpSet(h) {
  h = clamp(Math.round(h), 0, +($('#mp-i').max) || 90); const changed = h !== MP.shown; MP.pos = h; $('#mp-i').value = String(h); $('#mp-t').textContent = mpLabel(h);
  if (!changed) return; MP.shown = h;
  S.when = h === 0 ? { kind: 'now' } : { kind: 'ahead', h };
  renderMarkers(); renderRank(); if (MP.flow && reduced()) mpStatic();
}
function mpPlay(on) {
  MP.playing = on; $('#mp-play').textContent = on ? 'Pause' : 'Play'; $('#mp-play').setAttribute('aria-pressed', on);
  if (on) MP.f = MP.pos; if (on && !MP.raf) { MP.last = performance.now(); MP.raf = requestAnimationFrame(mpTick); }
}
function mpTick(ts) {
  if (!MP.playing) { MP.raf = 0; return; }
  if (!$('#mapplay').offsetParent) { mpPlay(false); MP.raf = 0; return; }
  MP.f += Math.min(0.1, (ts - MP.last) / 1000) * MP.speed; MP.last = ts; if (MP.f > +($('#mp-i').max)) MP.f = 0; mpSet(MP.f); MP.raf = requestAnimationFrame(mpTick);
}
async function mpLoadGrid() {
  if (!map || !MP.flow) return; const w = map.w, h = map.h, nx = 7, ny = 5, pts = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const q = map.fromPx(w * (i + 0.5) / nx, h * (j + 0.5) / ny); pts.push({ lat: +clamp(q.lat, -80, 80).toFixed(2), lon: +(((q.lon + 540) % 360) - 180).toFixed(2) }); }
  const key = [pts[0].lat, pts[0].lon, pts[pts.length - 1].lat, pts[pts.length - 1].lon].join(',');
  if (MP.key === key && MP.grid) return; MP.key = key; const note = $('#mp-note');
  if (S.mode === 'offline') { note.textContent = 'Swell flow needs the live connection.'; return; }
  note.textContent = 'Loading the swell field…';
  try {
    const [mar, wx] = await Promise.all([fetchMarine(pts, 5, ['swell_wave_height', 'swell_wave_period', 'swell_wave_direction', 'wave_height', 'wave_period', 'wave_direction'], S.mode), fetchWx(pts, 5, { hourly: ['wind_speed_10m', 'wind_direction_10m'] }, S.mode)]);
    if (key !== MP.key || !MP.flow) return;
    MP.grid = pts.map((p, n) => {
      const m = mar[n] && mar[n].hourly, wv = wx[n] && wx[n].hourly; if (!m || !wv) return null;
      const sea = !(mar[n].latitude != null && (Math.abs(mar[n].latitude - p.lat) > 0.25 || Math.abs(mar[n].longitude - p.lon) > 0.25));
      return { lat: p.lat, lon: p.lon, sea, m, w: wv, mi: hourIndexNow({ t: m.time }, mar[n].utc_offset_seconds || 0), wi: hourIndexNow({ t: wv.time }, wx[n].utc_offset_seconds || 0) };
    });
    note.textContent = 'Streaks move the way the swell travels. Color shows size, from small (blue) to large (pink).'; if (MP.layer === 'wind') note.textContent = 'Streaks move the way the wind blows. Longer streaks mean stronger wind.';
    mpStartFlow();
  } catch (e) { MP.grid = null; MP.key = ''; note.textContent = 'The swell field is not available right now.'; }
}
function mpSample(px, py, k) {
  const q = map.fromPx(px, py), cl = Math.cos(rad(q.lat)); let wsum = 0, ux = 0, uy = 0, hh = 0, pp = 0, wx = 0, wy = 0, ws = 0, near = Infinity, nearSea = true;
  for (const g of MP.grid) {
    if (!g) continue; const dl = ((g.lon - q.lon + 540) % 360) - 180, d2 = (g.lat - q.lat) ** 2 + (dl * cl) ** 2 + 1e-4;
    if (d2 < near) { near = d2; nearSea = g.sea; } if (!g.sea) continue;
    const sh = g.m.swell_wave_height || g.m.wave_height, sp = g.m.swell_wave_period || g.m.wave_period, sd = g.m.swell_wave_direction || g.m.wave_direction, a = g.mi + k, b = g.wi + k;
    const h = sh && sh[a], d = sd && sd[a], wsp = g.w.wind_speed_10m && g.w.wind_speed_10m[b], wd = g.w.wind_direction_10m && g.w.wind_direction_10m[b]; if (h == null || d == null) continue;
    const w = 1 / d2; wsum += w; ux += w * Math.sin(rad(d)); uy += w * Math.cos(rad(d)); hh += w * h; pp += w * ((sp && sp[a]) || 10);
    if (wsp != null && wd != null) { ws += w * wsp; wx += w * Math.sin(rad(wd)); wy += w * Math.cos(rad(wd)); }
  }
  if (!wsum || !nearSea) return null;
  return { dir: norm360(Math.atan2(ux, uy) * 180 / Math.PI), h: hh / wsum, per: pp / wsum, wdir: norm360(Math.atan2(wx, wy) * 180 / Math.PI), wsp: ws / wsum };
}
function mpCanvas() {
  const cv = map.flow, dpr = window.devicePixelRatio || 1; if (cv.width !== Math.round(map.w * dpr) || cv.height !== Math.round(map.h * dpr)) { cv.width = Math.round(map.w * dpr); cv.height = Math.round(map.h * dpr); }
  cv.style.width = map.w + 'px'; cv.style.height = map.h + 'px'; const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); return c;
}
function mpStartFlow() { if (reduced()) { mpStatic(); return; } if (!MP.fraf && MP.flow && MP.grid) { MP.fl = performance.now(); MP.fraf = requestAnimationFrame(mpFrame); } }
function mpFrame(ts) {
  if (!MP.flow || !MP.grid || !map) { MP.fraf = 0; return; }
  const c = mpCanvas(), W = map.w, Hh = map.h, dt = Math.min(0.05, (ts - MP.fl) / 1000), k = Math.round(MP.pos), wind = MP.layer === 'wind'; MP.fl = ts;
  c.globalCompositeOperation = 'destination-out'; c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 0, W, Hh); c.globalCompositeOperation = 'source-over';
  const N = Math.round(clamp(W * Hh / 1800, 90, 260)); while (MP.parts.length < N) MP.parts.push({ x: Math.random() * W, y: Math.random() * Hh, a: 0, life: 0 }); MP.parts.length = N;
  c.lineCap = 'round';
  for (const p of MP.parts) {
    if (p.a >= p.life) { p.x = Math.random() * W; p.y = Math.random() * Hh; p.a = 0; p.life = 50 + Math.random() * 70; }
    const s = mpSample(p.x, p.y, k); if (!s) { p.a = p.life; continue; }
    const to = rad((wind ? s.wdir : s.dir) + 180), sp = wind ? 10 + s.wsp * 2.4 : 16 + s.per * 3.4, nx = p.x + Math.sin(to) * sp * dt, ny = p.y - Math.cos(to) * sp * dt;
    if (wind) { c.strokeStyle = 'hsla(36,92%,56%,.85)'; c.lineWidth = 1.3; } else { const f = clamp(s.h / 3, 0, 1); c.strokeStyle = 'hsla(' + (195 + 120 * f).toFixed(0) + ',90%,' + (60 - 8 * f).toFixed(0) + '%,.9)'; c.lineWidth = 1.2 + 1.6 * f; }
    c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(nx, ny); c.stroke(); p.x = nx; p.y = ny; p.a++;
  }
  MP.fraf = requestAnimationFrame(mpFrame);
}
function mpStatic() {
  if (!map || !MP.flow || !MP.grid) return; const c = mpCanvas(), W = map.w, Hh = map.h, k = Math.round(MP.pos), wind = MP.layer === 'wind'; c.clearRect(0, 0, W, Hh); c.lineCap = 'round';
  for (let x = 30; x < W; x += 56) for (let y = 30; y < Hh; y += 56) {
    const s = mpSample(x, y, k); if (!s) continue; const to = rad((wind ? s.wdir : s.dir) + 180), len = wind ? 8 + s.wsp * 0.5 : 8 + s.per * 1.1; c.strokeStyle = wind ? 'hsla(36,92%,56%,.9)' : 'hsla(' + (195 + 120 * clamp(s.h / 3, 0, 1)).toFixed(0) + ',90%,55%,.9)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(to) * len, y - Math.cos(to) * len); c.stroke(); c.beginPath(); c.arc(x, y, 2, 0, 7); c.fill();
  }
}
function mpFlowOn(on) {
  MP.flow = on; $('#mp-layer').hidden = !on; if (!on) { if (MP.fraf) cancelAnimationFrame(MP.fraf); MP.fraf = 0; if (map) { const c = mpCanvas(); c.clearRect(0, 0, map.w, map.h); } $('#mp-note').textContent = ''; return; }
  MP.key = ''; mpLoadGrid();
}
function mpMoved() { if (!MP.flow) return; clearTimeout(MP.mv); MP.mv = setTimeout(mpLoadGrid, 900); }
function wireMapPlay() {
  $('#mp-play').addEventListener('click', () => { if (!S.pins.length && !MP.playing) { toast('Add a spot first: the scores on your pins play through the coming days.'); return; } mpPlay(!MP.playing); });
  $('#mp-i').addEventListener('input', e => { mpPlay(false); mpSet(+e.target.value); });
  $('#mp-flow').addEventListener('change', e => mpFlowOn(e.target.checked));
  $('#mp-layer').addEventListener('click', e => { const b = e.target.closest('button[data-l]'); if (!b) return; MP.layer = b.dataset.l; document.querySelectorAll('#mp-layer button').forEach(x => x.setAttribute('aria-pressed', x === b)); if (MP.grid) { $('#mp-note').textContent = MP.layer === 'wind' ? 'Streaks move the way the wind blows. Longer streaks mean stronger wind.' : 'Streaks move the way the swell travels. Color shows size, from small (blue) to large (pink).'; } if (reduced()) mpStatic(); });
}
const FC_KEY = 'fcLog', FC_KEEP = 12, FC_SPOTS = 10;
function fcRecord(D, spot) {
  if (!D || D.mode !== 'live' || !D.marineOk) return;
  try {
    const all = store.get(FC_KEY, {}), list = all[spot.id] || [], now = Math.floor(Date.now() / 1000);
    if (list.length && now - list[list.length - 1].iss < 5 * 3600) return;
    const i0 = hourIndexNow(D.H, D.off), n = Math.min(72, D.H.t.length - i0); if (n < 24) return;
    const col = (arr, f) => { const o = []; for (let k = 0; k < n; k++) { const v = arr[i0 + k]; o.push(v == null ? null : Math.round(v * f)); } return o; };
    list.push({ iss: now, t0: epochOf(D.H.t[i0], D.off), h: col(D.H.wH, 100), w: col(D.H.wsp, 10) }); all[spot.id] = list.slice(-FC_KEEP);
    const ids = Object.keys(all); if (ids.length > FC_SPOTS) ids.sort((a, b) => all[a][all[a].length - 1].iss - all[b][all[b].length - 1].iss).slice(0, ids.length - FC_SPOTS).forEach(k => delete all[k]);
    store.set(FC_KEY, all);
  } catch (e) { /* storage full: skip */ }
}
function buoyMap(d, key) {
  const m = new Map(), src = d.std && d.std[key] ? d.std : d.spec && d.spec[key] ? d.spec : null; if (!src) return m;
  for (let r = 0; r < src.t.length; r++) if (src[key][r] != null) m.set(Math.floor(src.t[r] / 3600), src[key][r]); return m;
}
function accuracySummary(P) {
  const mean = a => a.reduce((x, y) => x + y, 0) / a.length, one = (f, o) => (f.length ? { n: f.length, bias: mean(o) > 0.15 ? mean(f) / mean(o) - 1 : null, mae: mean(f.map((x, k) => Math.abs(x - o[k]))) } : null);
  return { waves: one(P.wf, P.wo), wind: one(P.sf, P.so) };
}
function accuracyCalc(D, obs, snaps, nowSec) {
  const wv = buoyMap(obs, 'wvht'), ws = buoyMap(obs, 'wspd'), mk = () => ({ wf: [], wo: [], sf: [], so: [] }), B = { now: mk(), d1: mk(), d3: mk() };
  const pair = (b, hr, fh, fw) => { const o = wv.get(hr), w = ws.get(hr); if (o != null && fh != null) { b.wf.push(fh); b.wo.push(o); } if (w != null && fw != null) { b.sf.push(fw); b.so.push(w * 3.6); } };
  const n0 = hourIndexNow(D.H, D.off);
  for (let i = Math.max(0, n0 - 48); i < n0; i++) pair(B.now, Math.floor(epochOf(D.H.t[i], D.off) / 3600), D.H.wH[i], D.H.wsp[i]);
  snaps.forEach(s => s.h.forEach((v, k) => {
    const hr = Math.floor(s.t0 / 3600) + k; if (hr * 3600 > nowSec - 1800) return; const lead = (hr * 3600 - s.iss) / 3600, b = lead >= 12 && lead < 36 ? B.d1 : lead >= 36 && lead < 72 ? B.d3 : null; if (!b) return;
    pair(b, hr, v == null ? null : v / 100, s.w[k] == null ? null : s.w[k] / 10);
  }));
  return { now: accuracySummary(B.now), d1: accuracySummary(B.d1), d3: accuracySummary(B.d3) };
}
const biasWord = b => (b == null ? '' : Math.abs(b) < 0.08 ? 'about right' : 'ran ' + Math.round(Math.abs(b) * 100) + '% ' + (b > 0 ? 'high' : 'low'));
const accSecHtml = () => '<div class="sec" id="acc-sec"><h2>Forecast accuracy <small>how the forecast compares with the nearest buoy</small></h2><div class="card" id="acc-body"><div class="skel">Comparing with the buoy…</div></div></div>';
async function fillAccuracy(D, spot) {
  const box = $('#acc-body'); if (!box) return;
  if (!D.marineOk) { box.innerHTML = '<p class="note" style="margin:0">Accuracy needs the wave forecast.</p>'; return; }
  if (S.mode !== 'live') { box.innerHTML = '<p class="note" style="margin:0">Accuracy needs the live connection.</p>'; return; }
  try {
    const b = await pickBuoy(spot); if (S.selId !== spot.id || !$('#acc-body')) return;
    const snaps = (store.get(FC_KEY, {})[spot.id] || []), nowSec = Date.now() / 1000, A = accuracyCalc(D, b.data, snaps, nowSec);
    const row = (label, r, wait) => { const w = r.waves, s = r.wind; return '<tr><th scope="row">' + label + '</th>' + (w ? '<td>' + (biasWord(w.bias) ? '<b>' + biasWord(w.bias) + '</b>, ' : '') + 'off by ' + L(w.mae) + ' ' + lu() + ' on average <small>(' + w.n + ' hours)</small></td>' : '<td class="note">' + wait + '</td>') + '<td>' + (s ? 'off by ' + SP(s.mae) + ' ' + su() : '–') + '</td></tr>'; };
    const wait = 'Not enough history yet. The app saves each forecast on this device and checks it a day later.';
    let tip = ''; const ref = A.d1.waves && A.d1.waves.n >= 12 ? A.d1 : A.now.waves && A.now.waves.n >= 12 ? A.now : null;
    if (ref && ref.waves.bias != null && Math.abs(ref.waves.bias) >= 0.1) tip = '<p class="crowd-p">Near <b>' + esc(b.station.name) + '</b> the wave forecast has ' + biasWord(ref.waves.bias).replace('ran ', 'run ') + '. ' + (ref.waves.bias > 0 ? 'Treat the sizes as a little generous.' : 'It may be a little conservative.') + '</p>';
    else if (ref) tip = '<p class="crowd-p">Near <b>' + esc(b.station.name) + '</b> the wave forecast has been close to what the buoy measured.</p>';
    box.innerHTML = tip + '<div class="tablewrap"><table class="t acc-t"><thead><tr><th></th><th>Waves vs buoy</th><th>Wind</th></tr></thead><tbody>' + row('Last 2 days (model now)', A.now, 'The buoy has no recent wave readings.') + row('Forecast a day ahead', A.d1, wait) + row('Forecast 2 to 3 days ahead', A.d3, wait) + '</tbody></table></div><div id="acc-chart"></div><p class="note" style="margin:6px 0 0">Compared with ' + esc(b.station.name) + ', ' + distTxt(b.station.km) + ' away. A buoy sits offshore in deeper water, so expect the beach itself to differ, and a spot that is sheltered or far from the buoy will differ more.</p>';
    const n0 = hourIndexNow(D.H, D.off), i0 = Math.max(0, n0 - 48), wv = buoyMap(b.data, 'wvht'), conv = x => (x == null ? null : cvLen(x, S.units));
    const obsS = D.H.t.map((t, i) => (i < i0 || i > n0 ? null : conv(wv.get(Math.floor(epochOf(t, D.off) / 3600)))));
    const mdl = D.H.wH.map((v, i) => (i < i0 || i > n0 ? null : conv(v)));
    const ser = [{ label: 'Buoy measured', color: 'var(--ink)', data: obsS, w: 2.2 }, { label: 'Model now', color: 'var(--s1)', data: mdl, w: 1.6 }];
    const target = nowSec - 24 * 3600, pick = snaps.filter(s => { const a = nowSec - s.iss; return a > 8 * 3600 && a < 40 * 3600; }).sort((x, y) => Math.abs(x.iss - target) - Math.abs(y.iss - target))[0];
    if (pick) { const m = new Map(); pick.h.forEach((v, k) => { if (v != null) m.set(Math.floor(pick.t0 / 3600) + k, v / 100); }); ser.push({ label: 'Forecast from ' + Math.round((nowSec - pick.iss) / 3600) + ' h ago', color: 'var(--s2)', data: D.H.t.map((t, i) => (i < i0 || i > n0 ? null : conv(m.get(Math.floor(epochOf(t, D.off) / 3600))))), dash: '4 3', w: 1.8 }); }
    if (obsS.some(x => x != null)) { const c = makeChart('Waves: forecast against the buoy', lu() + ', last 2 days', { t: D.H.t, i0, i1: n0, nowIdx: n0, series: ser, unit: lu(), type: 'line', min: 0 }); $('#acc-chart').appendChild(c); mountChart(c); }
  } catch (e) { const bx = $('#acc-body'); if (bx) bx.innerHTML = '<p class="note" style="margin:0">' + esc(e.message || 'No buoy to compare with.') + '</p>'; }
}
function offlineInfo() { const all = offlineAll(); return Object.keys(all).map(id => ({ id, sp: spotById(id), at: all[id].loadedAt || 0, kb: Math.round(JSON.stringify(all[id]).length / 1024) })).filter(x => x.sp).sort((a, b) => b.at - a.at); }
function offlineHtml() {
  const list = offlineInfo(), kb = list.reduce((a, x) => a + x.kb, 0);
  return '<div class="msec" id="offline-saved"><h4>Offline</h4><p class="note">' + (list.length ? plural(list.length, 'forecast') + ' saved on this device, about ' + kb + ' KB. ' : 'Nothing saved yet. ') + 'Each spot you open is saved automatically, so the app still shows it with no signal. Up to ' + OFF_MAX + ' spots are kept.</p><div class="mbtns"><button class="btn sm" type="button" data-g5="prefetch"' + (S.mode === 'live' && S.pins.length ? '' : ' disabled') + '>Save my spots now</button>' + (list.length ? '<button class="btn sm" type="button" data-g5="clearoff">Clear saved forecasts</button>' : '') + '</div></div>';
}
let prefetchBusy = false;
async function offlinePrefetch(force) {
  if (prefetchBusy || S.mode !== 'live' || navigator.onLine === false) return 0; prefetchBusy = true; let n = 0;
  try {
    const all = offlineAll();
    for (const sp of S.pins.slice(0, OFF_MAX)) {
      const hit = all[sp.id]; if (!force && hit && Date.now() - (hit.loadedAt || 0) < 45 * 60000) continue;
      const open = sp.id === S.selId && S.detail.get(sp.id); if (open && open.mode === 'live') { offlineSave(sp.id, open); n++; continue; } /* the open spot is already loaded: save that copy rather than swap it out under the page */
      try { await getDetail(sp, true); n++; } catch (e) { /* next spot */ } await sleep(250);
    }
  } finally { prefetchBusy = false; }
  menuRefresh(); return n;
}
function offlineScan() {
  const all = offlineAll(); let n = 0;
  S.pins.forEach(s => { const d = all[s.id]; if (d && d.H) { S.scan.set(s.id, { id: s.id, H: d.H, off: d.off, ok: hasMarine(d.H), mode: 'offline' }); n++; } });
  S.scanErr = n || !S.pins.length ? null : 'you are offline and no forecasts are saved on this device'; S.scanBusy = false; renderRank(); renderMarkers();
}
function wireGroup5() {
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-g5]'); if (!b) return;
    if (b.dataset.g5 === 'prefetch') { b.disabled = true; b.textContent = 'Saving…'; const n = await offlinePrefetch(true); if (n) celebrate(); toast(n ? 'Saved ' + plural(n, 'forecast') + ' for offline.' : S.pins.length ? 'Couldn’t save your spots right now. Try again in a moment.' : 'Add a spot first.'); menuRefresh(); }
    else if (b.dataset.g5 === 'clearoff') { store.set('offline', {}); toast('Saved forecasts cleared.'); menuRefresh(); }
  });
  setTimeout(() => offlinePrefetch(), 9000); setInterval(() => offlinePrefetch(), 45 * 60000);
}
/* contrast: 'auto' follows the device's more-contrast setting; 'high' and 'normal' are fixed. Older saves stored true or false. */
function cleanA11y(a) {
  a = isObj(a) ? a : {};
  const contrast = a.contrast === true || a.contrast === 'high' ? 'high' : a.contrast === false || a.contrast === 'normal' ? 'normal' : 'auto';
  const rate = [0.8, 1, 1.25, 1.5].indexOf(+a.rate) >= 0 ? +a.rate : 1;
  return { text: a.text === 'large' || a.text === 'xl' ? a.text : 'normal', contrast, motion: a.motion === 'reduce' ? 'reduce' : 'auto', spacing: a.spacing === 'wide' ? 'wide' : 'normal', cvd: a.cvd === 'on' ? 'on' : 'off', font: a.font === 'easy' ? 'easy' : 'normal', rate };
}
S.a11y = cleanA11y(store.get('a11y', {}));
const CONTRAST_MQ = window.matchMedia ? matchMedia('(prefers-contrast: more)') : null;
if (CONTRAST_MQ) {
  const onDeviceContrast = () => { if (S.a11y && S.a11y.contrast === 'auto') applyA11y(); };
  if (CONTRAST_MQ.addEventListener) CONTRAST_MQ.addEventListener('change', onDeviceContrast); else if (CONTRAST_MQ.addListener) CONTRAST_MQ.addListener(onDeviceContrast);
}
function applyA11y() {
  const r = document.documentElement, a = S.a11y;
  const hc = a.contrast === 'high' || (a.contrast === 'auto' && !!(CONTRAST_MQ && CONTRAST_MQ.matches));
  r.dataset.text = a.text; r.dataset.contrast = hc ? 'high' : 'normal'; r.dataset.motion = a.motion; r.dataset.spacing = a.spacing; r.dataset.cvd = a.cvd; r.dataset.font = a.font;
  if (a.font === 'easy') easyFontLoad();
}
function a11ySet(patch) {
  S.a11y = cleanA11y(Object.assign({}, S.a11y, patch)); store.set('a11y', S.a11y); applyA11y();
  if (map) requestAnimationFrame(() => map.resize());
}
/* ---- 0.1.29: easier-to-read font (loaded only when chosen) and Read aloud ----
   Read aloud speaks a summary put together from the same forecast numbers the page shows, with the device's own voice. No AI model writes the numbers. */
function easyFontLoad() {
  if (document.getElementById('dp-easyfont')) return;
  const l = document.createElement('link'); l.id = 'dp-easyfont'; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap'; document.head.appendChild(l);
}
const RA = { ctx: null, on: false, paused: false, i: 0, list: [], spot: null, cur: null };
const raOK = () => typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
const RA_DIRS = ['north', 'north-northeast', 'northeast', 'east-northeast', 'east', 'east-southeast', 'southeast', 'south-southeast', 'south', 'south-southwest', 'southwest', 'west-southwest', 'west', 'west-northwest', 'northwest', 'north-northwest'];
const raDir = d => (d == null || isNaN(d)) ? '' : RA_DIRS[Math.round(norm360(d) / 22.5) % 16];
const raUnit = u => ({ ft: 'feet', m: 'metres', mph: 'miles per hour', 'km/h': 'kilometres per hour', '\u00b0F': 'degrees Fahrenheit', '\u00b0C': 'degrees Celsius' }[u] || u);
const raBar = () => '<div class="ra" role="group" aria-label="Read aloud"><button type="button" class="btn sm" id="ra-go" aria-label="Read the forecast aloud">Read aloud</button><button type="button" class="btn sm" id="ra-pause" hidden>Pause</button><p class="ra-now note" id="ra-now" aria-hidden="true" hidden></p><span class="sr-only" id="ra-live" role="status" aria-live="polite"></span></div>';
function raScript(D, spot) {
  const out = [], i = hourIndexNow(D.H, D.off), v = valAt(D.H, i), cur = D.current || {};
  const r = D.marineOk ? scoresOf(D, spot)[i] : null, e = D.marineOk ? sizeInfo(D, spot, i) : null;
  const U = { len: raUnit(lu()), spd: raUnit(su()), tmp: raUnit(tu()) };
  const cl = s => String(s == null ? '' : s).replace(/\s+/g, ' ').replace(/\u2013/g, ' to ').trim();
  out.push('Forecast for ' + spot.name + '.');
  if (S.mode === 'demo') out.push('This is demo data, not a real forecast. Do not use it to decide where to surf.');
  if (S.mode === 'offline') { const mins = Math.max(0, Math.round((Date.now() - (D.loadedAt || 0)) / 60000)); out.push('You are offline. This forecast was saved ' + (mins < 90 ? mins + ' minutes' : Math.round(mins / 60) + ' hours') + ' ago.'); }
  const c = e && cautionFor(e, S.prof.level);
  if (c) out.push('Caution. Respect the ocean and your limits. The surf could reach about ' + rr(c.hiM) + ' ' + U.len + ' here, which is above ' + (S.units === 'imperial' ? '4 feet' : '1.2 metres') + ' and big for a beginner. Rips, strong currents and heavy sets can turn dangerous fast. Forecasts are estimates, and real waves can be bigger.');
  const hz = document.getElementById('haz');
  if (hz) {
    hz.querySelectorAll('.alert').forEach(a => {
      const t = a.getAttribute('data-t'); if (t === 'ok' || t === 'info') return;
      const s = a.tagName === 'DETAILS' ? a.querySelector('summary') : a, bb = s && s.querySelector && s.querySelector('b'), sp = s && s.querySelector && s.querySelector('span'), x = bb ? cl(bb.textContent) + (sp ? ', ' + cl(sp.textContent.split('\u00b7')[0]) : '') : cl(s && s.textContent);
      if (x) out.push((a.tagName === 'DETAILS' ? 'Weather alert. ' : '') + x + (/[.!?]$/.test(x) ? '' : '.'));
    });
    const rd = Array.from(hz.querySelectorAll('.rip-days .pill')).slice(0, 2).map(p => { const b = p.querySelector('b'), lab = cl(b && b.textContent), rest = cl(p.textContent.slice((b ? b.textContent : '').length)).split('\u00b7')[0].trim().toLowerCase(); return rest ? lab + ' ' + rest : ''; }).filter(Boolean);
    if (rd.length) out.push('Rip current risk. ' + rd.join('. ') + '.');
  }
  if (r) { out.push(BANDS[r.band].name + ' surf right now, score ' + Math.round(r.score) + ' out of 100.'); if (e) out.push('Surf size about ' + rr(e.lo) + ' to ' + rr(e.hi) + ' ' + U.len + '.'); }
  if (D.marineOk) {
    const pH = v.sH != null ? v.sH : v.wH, pT = v.sT != null ? v.sT : v.wT, pD = v.sD != null ? v.sD : v.wD;
    if (pH != null) out.push('Main swell ' + L(pH) + ' ' + U.len + ' at ' + f0(pT) + ' seconds from the ' + raDir(pD) + '.');
    if (v.s2H != null && v.s2H > 0.1) out.push('Second swell ' + L(v.s2H) + ' ' + U.len + ' at ' + f0(v.s2T) + ' seconds from the ' + raDir(v.s2D) + '.');
  }
  const wsp = cur.wind_speed_10m != null ? cur.wind_speed_10m : v.wsp, wdir = cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir, gust = cur.wind_gusts_10m != null ? cur.wind_gusts_10m : v.gust;
  if (wsp != null) { const rel = windRel(wsp, wdir, spot.face); out.push('Wind ' + SP(wsp) + ' ' + U.spd + ' from the ' + raDir(wdir) + (rel && rel.label && !/^[\u2013\u2014-]$/.test(rel.label.trim()) ? ', ' + rel.label.toLowerCase() + ' for this beach' : '') + (gust != null ? ', gusting to ' + SP(gust) : '') + '.'); }
  let tideDone = false;
  try {
    const T = D.tideN;
    if (T && T.supported) { const info = tideNowInfo(T.hilo, Math.floor(Date.now() / 1000)); if (info) { const nx = (info.next || []).slice(0, 2); out.push('Tide ' + L(info.h) + ' ' + U.len + ', ' + cl(info.trend).toLowerCase() + (nx.length ? '. Next ' + nx.map(x => (x.type === 'H' ? 'high' : 'low') + ' at ' + fmtClock(localStr(x.t * 1000, D.off))).join(', then ') : '') + '.'); tideDone = true; } }
  } catch (er) { /* fall back to the model tide */ }
  if (!tideDone && D.marineOk) { const td = tideSummary(D.H, i); if (td) { const nx = [td.nextHigh, td.nextLow].filter(Boolean).sort((a, b) => a.i - b.i); out.push('Tide, from the ocean model, ' + L(td.h) + ' ' + U.len + ', ' + cl(td.trend).toLowerCase() + (nx.length ? '. Next ' + nx.map(x => (x.type === 'high' ? 'high' : 'low') + ' at ' + fmtClock(x.t)).join(', then ') : '') + '.'); } }
  if (D.marineOk && v.sst != null) { const wt = cl(wetsuit(v.sst)).replace(/[.\s]+$/, ''); out.push('Water ' + TP(v.sst) + ' ' + U.tmp + (wt ? '. ' + wt : '') + '.'); }
  const at = cur.temperature_2m != null ? cur.temperature_2m : v.temp, wc = cur.weather_code != null ? cur.weather_code : v.code;
  if (at != null) out.push('Air ' + TP(at) + ' ' + U.tmp + (wc != null ? ', ' + cl(wxText(wc)).toLowerCase() : '') + '.');
  try { const sr = D.daily.sunrise[0], ss = D.daily.sunset[0]; if (sr && ss) out.push('Sunrise ' + fmtClock(sr) + ', sunset ' + fmtClock(ss) + '.'); } catch (er) { /* skip the sun line */ }
  if (r) { const bw = upcomingWindow(D, spot, i); if (bw) out.push('Best upcoming window: ' + cl(winText(D, bw)) + ', ' + BANDS[bandOf(bw.avg)].name + ', score ' + Math.round(bw.avg) + '.'); }
  if (D.marineOk) {
    const sc = scoresOf(D, spot), kc = calibFactor(S.log, spot.id).k, beg = S.prof.level === 'beginner', nd = Math.min(D.daily.time.length, S.range || 5, 5);
    if (nd > 1) out.push('Next days.');
    for (let d = 1; d < nd; d++) {
      const date = D.daily.time[d], bw = bestWindow(D.H, sc, date, D.daily.sunrise[d], D.daily.sunset[d]);
      const idx = D.H.t.map((t, k) => k).filter(k => D.H.t[k].startsWith(date) && parseT(D.H.t[k]).h >= 6 && parseT(D.H.t[k]).h <= 18);
      const hs = idx.map(k => (D.H.sH[k] != null ? D.H.sH[k] : D.H.wH[k])).filter(x => x != null), ws = idx.map(k => D.H.wsp[k]).filter(x => x != null);
      let s = dayLong(date) + ': ';
      if (bw) s += 'best window ' + fmtHr(D.H.t[bw.i0]) + ' to ' + fmtHr(D.H.t[bw.i1 + 1] || D.H.t[bw.i1]) + ', ' + BANDS[bandOf(bw.avg)].name + ', score ' + Math.round(bw.avg) + '. '; else s += 'no good window. ';
      if (hs.length) s += 'Swell ' + L(Math.min.apply(null, hs)) + ' to ' + L(Math.max.apply(null, hs)) + ' ' + U.len + '. ';
      if (ws.length) s += 'Wind about ' + SP(ws.reduce((a, b) => a + b, 0) / ws.length) + ' ' + U.spd + '. ';
      if (beg) { let top = null; idx.forEach(k => { const cz = cautV(valAt(D.H, k), spot, kc); if (cz && (!top || cz.hiM > top.hiM)) top = cz; }); if (top) s += 'Caution: surf up to about ' + rr(top.hiM) + ' ' + U.len + '. '; }
      if (d >= 7) s += 'Low confidence this far out. ';
      out.push(cl(s));
    }
  }
  out.push('These are model estimates. Check the surf and local advice before you go in.');
  return out;
}
function raUi() {
  const go = document.getElementById('ra-go'), pa = document.getElementById('ra-pause'), nw = document.getElementById('ra-now'); if (!go) return;
  go.textContent = RA.on ? 'Stop' : 'Read aloud'; go.setAttribute('aria-label', RA.on ? 'Stop reading aloud' : 'Read the forecast aloud');
  if (pa) { pa.hidden = !RA.on; pa.textContent = RA.paused ? 'Resume' : 'Pause'; }
  if (nw) { nw.hidden = !RA.on; nw.textContent = RA.on ? (RA.list[Math.min(RA.i, RA.list.length - 1)] || '') : ''; }
}
function raLive(t) { const l = document.getElementById('ra-live'); if (l) l.textContent = t; }
function raSay() {
  if (!RA.on || RA.paused) return;
  if (RA.i >= RA.list.length) { raEnd(); raLive('Finished reading the forecast.'); return; }
  const u = new SpeechSynthesisUtterance(RA.list[RA.i]); u.lang = 'en-US'; u.rate = (S.a11y && S.a11y.rate) || 1;
  try { const vs = speechSynthesis.getVoices(), v = vs.filter(x => x.localService && /^en/i.test(x.lang))[0]; if (v) u.voice = v; } catch (e) { /* use the default voice */ }
  u.onend = () => { if (!RA.on || RA.paused || u !== RA.cur) return; RA.i++; raSay(); };
  u.onerror = ev => { if (ev && (ev.error === 'canceled' || ev.error === 'interrupted')) return; if (u !== RA.cur) return; raEnd(); toast('Read aloud could not start on this device.'); };
  RA.cur = u; raUi(); speechSynthesis.speak(u);
}
function raStart() {
  const c = RA.ctx; if (!c || !raOK()) return;
  speechSynthesis.cancel(); RA.list = raScript(c.D, c.spot); RA.i = 0; RA.on = true; RA.paused = false; RA.spot = c.spot.id;
  raUi(); raLive('Reading the forecast aloud.'); raSay();
}
function raPause() {
  if (!RA.on) return;
  if (RA.paused) { RA.paused = false; raUi(); raLive('Resumed.'); raSay(); }
  else { RA.paused = true; RA.cur = null; speechSynthesis.cancel(); raUi(); raLive('Paused.'); }
}
function raEnd() { RA.on = false; RA.paused = false; RA.cur = null; try { speechSynthesis.cancel(); } catch (e) { /* nothing to stop */ } raUi(); }
document.addEventListener('click', e => {
  const b = e.target && e.target.closest ? e.target.closest('#ra-go, #ra-pause') : null; if (!b) return;
  if (b.id === 'ra-go') { if (RA.on) { raEnd(); raLive('Stopped.'); } else raStart(); } else raPause();
});
window.addEventListener('pagehide', () => { if (RA.on) raEnd(); });
/* ---- 0.1.30 Source menu: right click, press and hold, or the Source button on a section, chart or picture opens a menu with a link to the data behind it. Links open in a new tab. ---- */
const SRCM = { el: null, back: null, pre: null, how: '', t: 0, tm: 0, sx: 0, sy: 0, pid: -1, lpid: -1, swallow: 0, touchAt: 0, q: 0, sel: '', link: '' };
const srcLL = sp => 'latitude=' + sp.lat.toFixed(3) + '&longitude=' + sp.lon.toFixed(3);
const srcImp = () => S.units === 'imperial';
const srcMar = (sp, v) => 'https://marine-api.open-meteo.com/v1/marine?' + srcLL(sp) + '&hourly=' + v + '&forecast_days=7&timezone=auto&cell_selection=sea' + (srcImp() ? '&length_unit=imperial&temperature_unit=fahrenheit&wind_speed_unit=mph' : '');
const srcWx = (sp, v, days) => 'https://api.open-meteo.com/v1/forecast?' + srcLL(sp) + '&hourly=' + v + (days || '&forecast_days=7') + '&timezone=auto' + (srcImp() ? '&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch' : '');
const SRC_WAVES = 'wave_height,wave_period,wave_direction,swell_wave_height,swell_wave_period,swell_wave_direction,secondary_swell_wave_height,secondary_swell_wave_period,secondary_swell_wave_direction';
const SRC_WIND = 'wind_speed_10m,wind_direction_10m,wind_gusts_10m';
const SRC_CH = {
  'Swell height': ['m', 'swell_wave_height,secondary_swell_wave_height,wave_height'],
  'Swell period': ['m', 'swell_wave_period,secondary_swell_wave_period,wave_period'],
  'Wind': ['w', SRC_WIND],
  'Tide height (model)': ['m', 'sea_level_height_msl'],
  'Sea surface temperature': ['m', 'sea_surface_temperature'],
  'Ocean current': ['m', 'ocean_current_velocity,ocean_current_direction'],
  'Barometric pressure': ['w', 'pressure_msl'],
  'Cloud cover': ['w', 'cloud_cover'],
  'Visibility': ['w', 'visibility'],
  'Rain amount': ['w', 'precipitation'],
  'Air temperature': ['w', 'temperature_2m'],
  'Chance of rain': ['w', 'precipitation_probability']
};
const SRC_P = {
  om: ['Open-Meteo', 'https://open-meteo.com/en/docs', 'Weather data by Open-Meteo.com'],
  coops: ['NOAA CO-OPS', 'https://tidesandcurrents.noaa.gov/', 'Tide predictions: NOAA CO-OPS'],
  ndbc: ['NOAA National Data Buoy Center', 'https://www.ndbc.noaa.gov/', 'Buoy readings: NOAA National Data Buoy Center'],
  nws: ['the US National Weather Service', 'https://www.weather.gov/', 'Forecasts and alerts: US National Weather Service'],
  ca: ['California Safe to Swim', 'https://mywaterquality.ca.gov/safe-to-swim/safe-to-swim-maps.html', 'Water quality: California Beach Watch'],
  hab: ['CalHABMAP and SCCOOS', 'https://calhabmap.org/scripps-pier', 'Algae and water samples: CalHABMAP and SCCOOS, Scripps Institution of Oceanography'],
  osm: ['OpenStreetMap', 'https://www.openstreetmap.org/copyright', '© OpenStreetMap contributors'],
  wa: ['WeatherAPI.com', 'https://www.weatherapi.com/', 'WeatherAPI.com'],
  vc: ['Visual Crossing', 'https://www.visualcrossing.com/', 'Weather data by Visual Crossing'],
  sun: ['NOAA solar calculator', 'https://gml.noaa.gov/grad/solcalc/', 'Sun times: NOAA solar equations, worked out on your device'],
  local: [null, null, 'Worked out on your device. No outside source.']
};
const SRC_SCORE = ['now', 'rightnow', 'why-score', 'best-days', 'planner-sec'];
const srcSkip = el => !!(el.closest && el.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [data-nosrcm]'));
const srcEl = n => (n && n.nodeType === 1 ? n : n && n.parentElement) || null;
function srcCtx() { const sp = spotById(S.selId); return { spot: sp, D: sp ? S.detail.get(sp.id) || null : null }; }
function srcTarget(el) {
  const lab = h => { if (!h) return ''; const nm = h.querySelector('.sec-name, .bn'); if (nm) return nm.textContent.replace(/\s+/g, ' ').trim(); const x = h.cloneNode(true); x.querySelectorAll('small, .srcb, .more, .snd, .sec-sum').forEach(n => n.remove()); return x.textContent.replace(/\s+/g, ' ').trim(); };
  const cb = el.closest('.chartbox[data-chart]');
  if (cb && /^Tide height/.test(cb.dataset.chart)) return { key: 'tide-now', label: lab(cb.querySelector(':scope > h3')) || cb.dataset.chart };
  if (cb && SRC_CH[cb.dataset.chart]) return { key: 'chart', ch: cb.dataset.chart, label: lab(cb.querySelector(':scope > h3')) || cb.dataset.chart };
  const sec = el.closest('.sec, #haz, .dhead, .badge-slot, .scene-wrap, .verdict, #rateit, #mapwrap, #rank');
  if (!sec) return { key: 'app', label: 'Dawn Patrol' };
  if (sec.classList.contains('srf')) return { key: 'srf', label: lab(sec.querySelector(':scope > h2')) || 'Surf zone forecast' };
  if (sec.classList.contains('sec')) return { key: sec.id || sec.dataset.fk || '', label: lab(sec.querySelector(':scope > h2')) || 'This section' };
  const m = { haz: ['haz', 'Weather alerts'], mapwrap: ['map', 'Map'], rank: ['rank', 'Your spots'], rateit: ['rate', 'Forecast check'] };
  return m[sec.id] ? { key: m[sec.id][0], label: m[sec.id][1] } : { key: 'now', label: 'This spot' };
}
function srcBuild(t, c) {
  const sp = c.spot, o = { items: [], prov: [], note: '' };
  const add = (l, u, p) => { o.items.push({ l: l, u: u, p: p || null }); };
  const P = function () { Array.prototype.forEach.call(arguments, x => { if (o.prov.indexOf(x) < 0) o.prov.push(x); }); };
  if (!sp) { o.note = 'Choose a spot to see where its numbers come from.'; return o; }
  const mar = v => srcMar(sp, v), wx = (v, d) => srcWx(sp, v, d), pt = sp.lat.toFixed(4) + ',' + sp.lon.toFixed(4), live = S.mode === 'live';
  const om = () => { P('om'); add('Waves and swell, raw data', mar(SRC_WAVES)); add('Wind and weather, raw data', wx(SRC_WIND + ',temperature_2m,cloud_cover,precipitation')); };
  const tide = () => {
    const T = c.D && c.D.tideN;
    if (T && T.supported && T.station) { const id = encodeURIComponent(T.station.id); P('coops'); add('Tide predictions, ' + T.station.name, 'https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=' + id); add('Station page', 'https://tidesandcurrents.noaa.gov/stationhome.html?id=' + id); }
    else { P('om'); add('Sea level from the ocean model, raw data', mar('sea_level_height_msl')); }
  };
  const buoy = () => {
    P('ndbc'); const chip = document.querySelector('#buoy-body [data-bid][aria-pressed="true"]'), mk = id => 'https://www.ndbc.noaa.gov/station_page.php?station=' + encodeURIComponent(id);
    add('Buoy station page', chip ? mk(chip.dataset.bid) : 'https://www.ndbc.noaa.gov/', !chip && live && typeof pickBuoy === 'function' ? pickBuoy(sp).then(b => (b && b.station ? mk(b.station.id) : null)) : null);
  };
  const score = () => { if (SRC_SCORE.indexOf(t.key) >= 0) o.note = 'The score is worked out on your device from these numbers. See How the score works under Why this score.'; };
  switch (t.key) {
    case 'chart': { const e = SRC_CH[t.ch]; P('om'); add(t.label + ', raw data', e[0] === 'm' ? mar(e[1]) : wx(e[1])); break; }
    case 'srf': P('nws'); add('Original surf zone forecast', 'https://www.weather.gov/', live && typeof getHazards === 'function' ? getHazards(sp).then(N => (N && N.srfUrl) || null) : null); add('Point forecast for this spot', 'https://forecast.weather.gov/MapClick.php?lat=' + sp.lat.toFixed(4) + '&lon=' + sp.lon.toFixed(4)); break;
    case 'haz': P('nws'); add('Active alerts here, raw data', 'https://api.weather.gov/alerts/active?point=' + pt); add('Point forecast for this spot', 'https://forecast.weather.gov/MapClick.php?lat=' + sp.lat.toFixed(4) + '&lon=' + sp.lon.toFixed(4)); break;
    case 'tide-now': case 'tides-fc': tide(); break;
    case 'buoy-now': case 'buoy-sec': buoy(); break;
    case 'acc-sec': buoy(); P('om'); add('Forecast waves, raw data', mar(SRC_WAVES)); o.note = 'Compares the forecast with what the buoy measured. Your own ratings stay on this device.'; break;
    case 'mc-sec': case 'sources-now': om(); P('wa', 'vc'); add('Ensemble wind, raw data', 'https://ensemble-api.open-meteo.com/v1/ensemble?' + srcLL(sp) + '&hourly=wind_speed_10m&models=ecmwf_ifs025,gfs025&forecast_days=3&timezone=auto' + (srcImp() ? '&wind_speed_unit=mph' : '')); o.note = 'Also compared with WeatherAPI.com and Visual Crossing where they have data.'; break;
    case 'water-adv': P('om', 'ca', 'hab'); add('Recent rain, raw data', wx('precipitation', '&past_days=3&forecast_days=2')); add('EPA BEACON, beach advisories', 'https://watersgeo.epa.gov/beacon2/'); add('Scripps Pier algae and water samples, raw data (SCCOOS CalHABMAP)', 'https://erddap.sccoos.org/erddap/tabledap/HABs-ScrippsPier.html'); break;
    case 'comfort': P('om', 'sun'); add('Air quality, raw data', 'https://air-quality-api.open-meteo.com/v1/air-quality?' + srcLL(sp) + '&hourly=us_aqi&forecast_days=3&timezone=auto'); add('Wind and weather, raw data', wx(SRC_WIND + ',temperature_2m,cloud_cover,precipitation')); add('Sunrise and sunset calculator', 'https://gml.noaa.gov/grad/solcalc/'); break;
    case 'crowd-now': P('local'); o.note = 'A guess from the time, the day of the week and the surf. Nothing is looked up.'; break;
    case 'me-now': case 'rate': P('local'); o.note = 'Your notes, gear and ratings are saved on this device only.'; break;
    case 'map': P('osm'); add('This area on OpenStreetMap', 'https://www.openstreetmap.org/?mlat=' + sp.lat.toFixed(4) + '&mlon=' + sp.lon.toFixed(4) + '#map=12/' + sp.lat.toFixed(4) + '/' + sp.lon.toFixed(4)); break;
    case 'app': o.note = 'Dawn Patrol uses free public weather, ocean and tide data. The links below list every source.'; break;
    case 'rank': om(); o.note = 'Each spot is scored on your device from its own forecast numbers.'; break;
    default: om(); score();
  }
  return o;
}
function srcClose(back) {
  if (!SRCM.el) return;
  SRCM.el.remove(); SRCM.el = null;
  if (back && SRCM.back && SRCM.back.focus) { try { SRCM.back.focus({ preventScroll: true }); } catch (e) { /* element gone */ } }
  SRCM.back = null;
}
function srcCopy(text) {
  const done = () => toast('Copied.');
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, () => { /* blocked */ }); return; }
  const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;left:-999px;top:0'; document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { /* not allowed */ } ta.remove();
}
function srcOpen(el, x, y, how) {
  const prev = SRCM.pre || document.activeElement; SRCM.pre = null; srcClose();
  const t = srcTarget(el), o = srcBuild(t, srcCtx()), lk = (l, u, i) => '<a role="menuitem" class="srcm-i" target="_blank" rel="noopener noreferrer"' + (i != null ? ' data-i="' + i + '"' : '') + ' href="' + esc(u) + '"><span>' + esc(l) + '</span><span aria-hidden="true">↗</span></a>';
  const bt = (act, l) => '<button type="button" role="menuitem" class="srcm-i" data-srcm="' + act + '"><span>' + esc(l) + '</span></button>';
  let h = '<div class="srcm-h"><b>' + esc(t.label) + '</b>Where this comes from</div>', top = '';
  const a = el.closest('a[href]'), im = el.closest('img[src]'); SRCM.sel = ''; SRCM.link = '';
  if (a && !a.closest('.srcm') && /^https?:/.test(a.href)) { SRCM.link = a.href; top += lk('Open link in a new tab', a.href) + bt('copylink', 'Copy link address'); }
  if (im && /^https?:/.test(im.src)) top += lk('Open image in a new tab', im.src);
  if (how !== 'touch') { try { SRCM.sel = String(window.getSelection() || '').trim().slice(0, 4000); } catch (e) { SRCM.sel = ''; } if (SRCM.sel) top += bt('copy', 'Copy'); }
  if (top) h += top + '<hr>';
  o.items.forEach((s, i) => { h += lk(s.l, s.u, i); });
  const provs = o.prov.map(k => SRC_P[k]).filter(p => p && p[1]);
  if (o.items.length) h += '<hr>';
  provs.slice(0, 2).forEach(p => { h += lk('About ' + p[0], p[1]); });
  h += lk('All data sources', '/docs/DATA_SOURCES');
  if (o.note) h += '<p class="srcm-a">' + esc(o.note) + '</p>';
  const cr = o.prov.map(k => SRC_P[k] && SRC_P[k][2]).filter(Boolean).join(' · ');
  if (cr) h += '<p class="srcm-a">' + esc(cr) + '</p>';
  const m = document.createElement('div'); m.className = 'srcm'; m.setAttribute('role', 'menu'); m.setAttribute('aria-label', 'Source for ' + t.label); m.tabIndex = -1; m.innerHTML = h;
  m.addEventListener('click', e => {
    const b = e.target.closest('[data-srcm]');
    if (b) { e.preventDefault(); if (b.dataset.srcm === 'copy') srcCopy(SRCM.sel); else if (b.dataset.srcm === 'copylink') srcCopy(SRCM.link); srcClose(true); return; }
    if (e.target.closest('a')) setTimeout(() => srcClose(), 0);
  });
  m.addEventListener('keydown', srcKey);
  document.body.appendChild(m); SRCM.el = m; SRCM.back = prev; SRCM.how = how; SRCM.t = Date.now();
  const r = m.getBoundingClientRect(); let L = x + 2, T = y + 2;
  if (how === 'touch') { T = y - r.height - 18; if (T < 8) T = y + 28; }
  L = Math.max(8, Math.min(L, innerWidth - r.width - 8)); T = Math.max(8, Math.min(T, innerHeight - r.height - 8));
  m.style.left = L + 'px'; m.style.top = T + 'px';
  o.items.forEach((s, i) => { if (s.p && s.p.then) s.p.then(u => { const n = m.querySelector('[data-i="' + i + '"]'); if (n && typeof u === 'string' && /^https:\/\//.test(u)) n.href = u; }).catch(() => { /* keep the fallback link */ }); });
  if (how === 'touch') { try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) { /* not supported */ } try { window.getSelection().removeAllRanges(); } catch (e) { /* none */ } }
  try { (how === 'key' || how === 'btn') && m.querySelector('.srcm-i') ? m.querySelector('.srcm-i').focus({ preventScroll: true }) : m.focus({ preventScroll: true }); } catch (e) { /* focus not possible */ }
}
function srcKey(e) {
  if (!SRCM.el) return;
  const its = Array.prototype.slice.call(SRCM.el.querySelectorAll('.srcm-i')), i = its.indexOf(document.activeElement);
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); srcClose(true); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); its[(i + 1) % its.length].focus(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); its[(i <= 0 ? its.length : i) - 1].focus(); }
  else if (e.key === 'Home') { e.preventDefault(); its[0].focus(); }
  else if (e.key === 'End') { e.preventDefault(); its[its.length - 1].focus(); }
  else if (e.key === 'Tab') srcClose();
}
function srcDecorate() {
  SRCM.q = 0;
  document.querySelectorAll('[id^="tab-"] .sec > h2, [id^="tab-"] .chartbox > h3').forEach(h => {
    if (h.querySelector(':scope > .srcb')) return;
    const t = srcTarget(h), b = document.createElement('button'); b.type = 'button'; b.className = 'srcb'; b.textContent = 'Source';
    b.setAttribute('aria-haspopup', 'menu'); b.setAttribute('aria-label', 'Source for ' + (t.label || 'this section')); h.appendChild(b);
  });
}
document.addEventListener('contextmenu', e => {
  const el = srcEl(e.target); if (!el) return;
  if (el.closest('.srcm')) { e.preventDefault(); return; }
  const touch = e.pointerType === 'touch' || e.pointerType === 'pen' || !!SRCM.tm || Date.now() - SRCM.touchAt < 1200;
  if (!touch && e.shiftKey && e.button === 2) return;
  if (srcSkip(el)) return;
  e.preventDefault();
  if (touch) { if (SRCM.how === 'touch' && Date.now() - SRCM.t < 900) return; clearTimeout(SRCM.tm); SRCM.tm = 0; SRCM.pid = SRCM.lpid; srcOpen(el, e.clientX || SRCM.sx, e.clientY || SRCM.sy, 'touch'); return; }
  if (e.button === 0) { const r = el.getBoundingClientRect(); srcOpen(el, r.left + 12, r.top + Math.min(r.height, 24), 'key'); return; }
  srcOpen(el, e.clientX, e.clientY, 'mouse');
}, true);
document.addEventListener('pointerdown', e => {
  const el = srcEl(e.target); if (!el) return;
  if (SRCM.el && !el.closest('.srcm, .srcb')) srcClose();
  if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
  SRCM.touchAt = Date.now(); SRCM.lpid = e.pointerId;
  if (!e.isPrimary || srcSkip(el) || el.closest('.srcm')) return;
  clearTimeout(SRCM.tm); SRCM.sx = e.clientX; SRCM.sy = e.clientY;
  SRCM.tm = setTimeout(() => { SRCM.tm = 0; SRCM.pid = e.pointerId; srcOpen(el, SRCM.sx, SRCM.sy, 'touch'); }, 550);
}, true);
document.addEventListener('pointermove', e => { if (SRCM.tm && Math.hypot(e.clientX - SRCM.sx, e.clientY - SRCM.sy) > 10) { clearTimeout(SRCM.tm); SRCM.tm = 0; } }, true);
document.addEventListener('pointerup', e => { clearTimeout(SRCM.tm); SRCM.tm = 0; if (e.pointerId === SRCM.pid) { SRCM.pid = -1; SRCM.swallow = Date.now() + 500; } }, true);
document.addEventListener('pointercancel', () => { clearTimeout(SRCM.tm); SRCM.tm = 0; SRCM.pid = -1; }, true);
document.addEventListener('click', e => {
  if (SRCM.swallow > Date.now()) { SRCM.swallow = 0; e.preventDefault(); e.stopPropagation(); return; }
  const b = e.target.closest && e.target.closest('.srcb'); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  if (SRCM.el && SRCM.back === b) { srcClose(true); return; }
  const r = b.getBoundingClientRect(); SRCM.pre = b; srcOpen(b, r.left, r.bottom + 4, e.detail === 0 ? 'key' : 'btn');
}, true);
window.addEventListener('scroll', e => { clearTimeout(SRCM.tm); SRCM.tm = 0; if (SRCM.el && !SRCM.el.contains(e.target)) srcClose(); }, true);
window.addEventListener('resize', () => srcClose());
window.addEventListener('blur', () => srcClose());
new MutationObserver(ms => {
  if (SRCM.q) return;
  for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && (n.matches('h2, h3, .sec, .chartbox, .pane') || n.querySelector('h2, h3'))) { SRCM.q = setTimeout(srcDecorate, 40); return; }
}).observe(document.body, { childList: true, subtree: true });
/* Keeps Tab and Shift+Tab inside the open dialog, so focus cannot land on the page behind it */
function dialogTrap(e) {
  if (e.key !== 'Tab') return;
  const open = [...document.querySelectorAll('.modal')].filter(m => !m.hidden);
  if (!open.length) return;
  const top = open[open.length - 1], a = document.activeElement;
  const f = [...top.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(x => x.offsetParent !== null || x === a);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (a === first || !top.contains(a))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (a === last || !top.contains(a))) { e.preventDefault(); first.focus(); }
}
function a11yHtml() {
  const a = S.a11y, sel = (on) => on ? ' selected' : '';
  return '<div class="msec" id="a11y-sec"><h4>Accessibility</h4><div class="form2">' +
    '<label class="fld"><span>Text size</span><select id="a11y-text"><option value="normal"' + sel(a.text === 'normal') + '>Normal</option><option value="large"' + sel(a.text === 'large') + '>Larger</option><option value="xl"' + sel(a.text === 'xl') + '>Largest</option></select></label>' +
    '<label class="fld"><span>Contrast</span><select id="a11y-contrast"><option value="auto"' + sel(a.contrast === 'auto') + '>Follow my device</option><option value="high"' + sel(a.contrast === 'high') + '>Higher contrast</option><option value="normal"' + sel(a.contrast === 'normal') + '>Normal</option></select></label>' +
    '<label class="fld"><span>Text spacing</span><select id="a11y-spacing"><option value="normal"' + sel(a.spacing === 'normal') + '>Normal</option><option value="wide"' + sel(a.spacing === 'wide') + '>Wider spacing</option></select></label>' +
    '<label class="fld"><span>Color vision</span><select id="a11y-cvd"><option value="off"' + sel(a.cvd === 'off') + '>Normal</option><option value="on"' + sel(a.cvd === 'on') + '>Color-blind-safe colors and patterns</option></select></label>' +
    '<label class="fld"><span>Font</span><select id="a11y-font"><option value="normal"' + sel(a.font === 'normal') + '>Standard</option><option value="easy"' + sel(a.font === 'easy') + '>Easier-to-read font</option></select></label>' +
    '<label class="fld"><span>Read aloud speed</span><select id="a11y-rate"><option value="0.8"' + sel(a.rate === 0.8) + '>Slower</option><option value="1"' + sel(a.rate === 1) + '>Normal</option><option value="1.25"' + sel(a.rate === 1.25) + '>Faster</option><option value="1.5"' + sel(a.rate === 1.5) + '>Fastest</option></select></label>' +
    '<label class="fld"><span>Animation</span><select id="a11y-motion"><option value="auto"' + sel(a.motion === 'auto') + '>Follow my device</option><option value="reduce"' + sel(a.motion === 'reduce') + '>Turn all animation off</option></select></label></div>' +
    '<p class="note" style="margin-top:8px">Every chart has a spoken summary. To step through a chart by keyboard, focus it and use the left and right arrow keys. Page Up and Page Down jump six hours. On the map, focus it and use the arrow keys to pan and the plus and minus keys to zoom.</p></div>';
}
const HELP = [
  { h: 'Getting started', open: true, items: [
    ['What is Dawn Patrol?', '<p>Dawn Patrol is a surf forecast for the spots you pick. It reads the marine models, buoys, tides and weather, scores each spot from 0 to 100 for every hour, and finds the best daylight windows.</p>'],
    ['How do I add a spot?', '<p>There are two ways. Type a beach or town into <b>Search a beach or town</b> and pick a result, and a pin drops there. Or tap <b>Show map</b>, then <b>Map tools</b>, then <b>Drop pin</b>, and tap the water where you surf. Name the pin and the app works out which way the beach faces from the coastline. You can keep up to 24 spots.</p>'],
    ['How is the app laid out?', '<p>The map and <b>Your spots</b> come first. Tap a spot to open its page, which shows the score, conditions right now, the tide, the next few days and an hour-by-hour planner. On a computer the map is on the left and the spot page on the right. On a phone, tap <b>‹ Your spots</b> to go back to the map.</p>'],
    ['What are the tabs on a spot page?', '<p>Each spot page has three tabs. <b>Now</b> has the score, Right now and the tide. <b>Forecast</b> has the next days, the hour-by-hour planner, and swell and wind (as charts or a table of every hour). <b>More</b> has the compass, swell arrival, water and rain, the crowd estimate, forecast confidence, your notes, a timelapse, a day replay, tides ahead, forecast accuracy, model comparison and buoy charts. Tap any section title to open or close it. Opening another spot always starts you on Now.</p>'],
    ['What do the colors and numbers mean?', '<p>The score runs from 0 to 100. <b>Poor</b> (under 25) is brown. <b>Fair</b> (25 to 49) sits between brown and <b>Good</b> (50 to 69). <b>Great</b> (70 to 84) and <b>Epic</b> (85 and up) have their own colors. Great and Epic hours glow in the hour-by-hour grid and Next days. Turn off motion under Accessibility if the glow bothers you. The score combines every swell reaching the beach, estimates the breaking wave size from swell height and period, checks how well the swell lines up with the beach, and weighs wind (offshore is best) and the tide or size you prefer. Your surfing level changes it too.</p>'],
    ['Where are the settings?', '<p>Tap <b>Menu</b> at the top right. It has units (feet or metres), dark mode, your surfing level, alerts, export and import, offline saving, accessibility, install, help and problem reports.</p>'],
    ['What does my surfing level do?', '<p>It tailors the forecast to you. <b>Beginner</b> favors small, gentle surf up to about 4 ft and scores bigger hours lower. <b>Intermediate</b> favors medium surf and scores lower above about 8 ft. <b>Advanced</b> keeps the full-size score. On Beginner, any hour where the surf could top 4 ft gets a caution: a banner on the Now tab, a ! on the hour grid and day cards, a warning on the spot list, and a ! on the map pin. The caution is a reminder to respect the ocean and know your limits. It does not mean smaller surf is safe. Change your level any time in <b>Menu</b>, under <b>Your surfing level</b>. The first time you open the site, a window asks you to pick one.</p>'],
    ['Can Dawn Patrol alert me when a spot is good?', '<p>Yes. In <b>Menu</b>, under <b>Alerts</b>, pick a score (70 is a good start for Great surf), paste one or more webhook addresses that start with https://, one per line, and turn on <b>Send alerts</b>. Dawn Patrol checks every spot up to 14 days ahead and sends one message per spot and day, or one summary a day if you prefer. A webhook is a link that passes a message to another app, such as an IFTTT applet or a chat channel. Alerts only run while this page is open, and Dawn Patrol cannot tell whether a message arrived. Try <b>Send a test</b> first.</p>'],
  ] },
  { h: 'Your spots', items: [
    ['How do I rename, move or remove a spot?', '<p>Open the spot and tap <b>Edit spot</b> under the picture. From there you can rename it, set the direction the beach faces, detect that direction from the coastline, or remove it. You can also tap <b>Remove</b> on any spot in <b>Your spots</b>; the app asks you to confirm first. Removing gives you an <b>Undo</b> button for a few seconds. To move a spot, drop a new pin where you want it and remove the old one.</p>'],
    ['How do I merge spots that are the same place?', '<p>Tap <b>Select spots to merge</b> above Your spots. A checkbox appears on each spot. Tick two or more, then tap <b>Merge</b>. In the window, pick the name, location, beach direction and break depth to keep. Each one can come from any of the ticked spots, or the location can be their average. Notes from all of them are combined, and the other spots are removed. An <b>Undo</b> button appears for a few seconds.</p>'],
    ['What is break depth?', '<p>Break depth is how deep the water is where the waves break. A wave cannot stand much taller than about 0.78 times the water depth, so on a reef or sandbar the app caps the size it shows. Open <b>Edit spot</b> and pick a depth from the list. For California spots, the app reads the water depth from the nearest CDIP model point and uses it by default, shown as <b>Automatic</b>. That point is a model grid cell, not a survey of your reef, so set your own depth if you know it. <b>Deep water (no limit)</b> turns the cap off. Anywhere else, deep water is the default and the forecast is unchanged.</p>'],
    ['How do I see drive times?', '<p>Open <b>Menu</b>, find <b>Home</b>, then either search for a town and pick it, or tap <b>Use my location</b> and allow the permission your browser asks for. Each spot then shows its drive time from home, on the spot list and on its page. Your home position is saved only on this device. Routes come from OpenStreetMap roads through a public routing service, which assumes no traffic, so treat the times as a rough guide. Your home position and your spots’ positions are sent to that service, and Dawn Patrol does not store them. If you use your location, the app looks up the nearest town name from OpenStreetMap, using your position rounded to about 1 km.</p>'],
    ['What is Best spot today?', '<p>The top of <b>Your spots</b> names the spot with the best surf you can still get today, with the next two below it. For each spot the app finds the best three-hour stretch of daylight from now until dusk (a shorter one if less daylight is left), using the same score as the spot list. Tap a spot to open it. If there is no daylight left, the card says so. <b>Best spot tomorrow</b> does the same for tomorrow, from first to last light.</p>'],
    ['The beach direction looks wrong', '<p>Pins get their direction from the coastline, and that can be off at points and in bays. Open <b>Edit spot</b> and set it by hand. The wind and swell scoring follow it.</p>'],
    ['What do the nearest five buoys show?', '<p>The Buoys section lists the five NOAA stations closest to the spot, nearest first, with distance, waves, period, swell direction, wind and water temperature. Tap a station to see its charts. Below the table, the app compares the five together: whether wave height and direction agree, whether the periods get longer further out, and whether the wind at the nearest station is offshore, onshore or cross-shore for this beach. It is a reading of five separate sensors, not a forecast.</p>'],
    ['What do the numbers at the top and bottom mean?', '<p>The version number and the time are shown at the top right and bottom left. The app is still pre-1.0, so the first number is 0. The middle number goes up with each feature release, and the last number goes up with each fix or small change. A change that breaks saved spots or shared links will bring in version 1.0. The time is when this copy of the site was last updated, in your local time.</p>'],
    ['How do I tell the app whether a forecast was right?', '<p>Open a spot and tap <b>Was the forecast right?</b> under the score, then tap what the surf is really like. The app adjusts that spot’s scores on this device. Your reports never leave it. <b>Reset</b> clears them.</p>'],
    ['Can a spot work on more than one swell direction?', '<p>Yes. Open the spot, then <b>Edit spot</b>, and under <b>Best swell directions</b> tap every direction the swell can come from. For example, W and NW, or S, SW and W. The score, compass and map all use your picks, and the spot header lists them. <b>Use the beach direction instead</b> goes back to a single facing. You can also change these picks under the compass on the <b>More</b> tab.</p>'],
    ['Can I add notes or a preferred tide?', '<p>Yes. On the <b>More</b> tab, <b>Your notes and gear</b> lets you pick the tide and size you like at that spot, and write notes. A match nudges the score up, and a mismatch nudges it down.</p>'],
    ['How do I share a spot?', '<p>Open the spot, tap <b>Share</b>, then <b>Copy link</b> or <b>Share…</b>. Whoever opens the link gets the spot added to their own list, with its beach direction, break depth and any swell directions you picked. Your notes and score reports stay private.</p>'],
    ['Can I share all my spots at once?', '<p>Yes. Open <b>Menu</b> and tap <b>Share all as a link</b> under Your spots. The person who opens it sees the list and picks which spots to add. Spots they already have are skipped.</p>'],
    ['The score looks wrong for my spot', '<p>Start with the beach direction under <b>Edit spot</b>. If it says <b>guessed</b>, set it yourself, because the swell and wind scoring both depend on it. Next, check your surfing level in the Menu. Beginner and Intermediate scores are lower for big surf on purpose. Then use <b>Was the forecast right?</b> under the score to tell the app what the surf is really like. Each report shifts that spot’s scores, more with every report, by up to 35 points either way. <b>Reset</b> clears them.</p>'],
    ['How do I move my spots to another device?', '<p>Open <b>Menu</b> and tap <b>Export</b> under Your spots. Copy the text or download the file, then use <b>Import</b> on the other device. You choose whether to add to what is already there or replace it.</p>'],
  ] },
  { h: 'Reading the forecast', items: [
    ['How do I read the spot page?', '<p>The big number is the score for this hour. The picture is drawn from the real numbers: wave size, wind, tide and time of day. <b>Right now</b> lists the estimated surf size, swell, wind, tide, water, air and sunrise. Tap any tile for its charts and details.</p>'],
    ['Where can I see the tide?', '<p>Every spot has a tide graph for today, with a <b>Now</b> marker, the highs and lows, and a strip underneath that shows the surf score for each hour. Tap the arrows to step to tomorrow and later. Touch or hover the graph to read any time, or use the arrow keys. <b>Tides ahead</b> on the More tab shows the full range. In the US the tide times come from official NOAA predictions for the nearest station. Elsewhere they are estimated from the ocean model, so check a local tide table for anything that matters.</p>'],
    ['What are Next days and Hour by hour?', '<p><b>Next days</b> shows the best three-hour daylight window for each day. <b>Hour by hour</b> colors every daylight hour by its score. Tap an hour to see its swell, wind and tide. Use the tide and wind filters to gray out hours that do not suit you, and <b>Add best windows to calendar</b> to save them. On Beginner, hours with surf above 4 ft get a ! and a caution when you tap them, and a day with such hours says "Caution: up to" its largest size.</p>'],
    ['Are the sizes the wave face height?', '<p>The tiles show swell height from the models and an estimated surf size for the spot. Sandbars, reefs and the tide change what you actually see, so treat the size as a guide.</p>'],
    ['What do model comparison and forecast confidence mean?', '<p>Weather models often disagree. On the More tab, <b>Model comparison</b> puts them side by side, and <b>Forecast confidence</b> tells you whether they agree. If a day has low confidence, treat it as a maybe.</p>'],
    ['What does Swell arrival tell me?', '<p>If a buoy sits upstream of your spot, the app checks what it is reading now and estimates when that swell will reach you, based on the swell period.</p>'],
    ['What is the crowd estimate?', '<p>It is a rough guess based on the day of the week, the time of day, how good the surf is, the wave size, the water temperature and the chance of rain. It is not a headcount, and no live count is connected. Dawn Patrol does not use Google or Surfline crowd data, because neither has a public feed it can use. Use it as a hint.</p><p>It works like a stoplight. <b>Green</b> means quiet or light, <b>yellow</b> means moderate, and <b>red</b> means busy or packed. The hour bars and the words above them use the same colors.</p>'],
  ] },
  { h: 'The map', items: [
    ['What is under Map layers?', '<p>Open <b>Show map</b>, then <b>Map tools</b>, then <b>Map layers</b>. You can switch between a street map, an ocean chart and satellite imagery. You can also add seamarks for reefs and hazards, rain radar, live clouds, a daily satellite image, sea temperature or the NOAA nautical chart. Some layers need a live connection.</p>'],
    ['Why is the map hidden?', '<p>The map starts closed so your spots and the forecast come first. Tap <b>Show map</b> to open it and <b>Hide map</b> to close it. The buttons on the map (<b>Drop pin</b>, <b>Map layers</b> and the zoom buttons) sit behind <b>Map tools</b>. Tap it to show them, and tap again to hide them. Both start closed each time you open the site.</p>'],
    ['Can I play the forecast on the map?', '<p>Yes. Open <b>Map layers</b> and tap <b>Play</b>. The scores on your pins step through the coming days. Drag the slider to pick a time, and turn on <b>Show swell flow</b> to see streaks for the swell or the wind.</p>'],
  ] },
  { h: 'Settings and offline', items: [
    ['Metric or imperial? Light or dark?', '<p>Open <b>Menu</b>. Units switches between feet, mph and °F, or metres, km/h and °C. Dark mode switches the colors. Both are remembered. The first time you open Dawn Patrol with no spots saved, it asks which units you want.</p>'],
    ['Will it work without a signal?', '<p>Partly. Each spot you open is saved on the device, up to ' + OFF_MAX + ' spots, and an installed copy opens offline. Offline, you see the last saved forecast and how old it is.</p>'],
    ['How do I install it on my phone?', '<p>Open <b>Menu</b> and tap <b>Install</b>. On an iPhone, use the Share button in Safari and choose <b>Add to Home Screen</b>.</p>'],
    ['Can I rearrange the spot page?', '<p>On a computer, open <b>Menu</b> and tap <b>Edit layout</b>. Drag sections into the order you want, use the arrows, or hide the ones you do not need. <b>Reset layout</b> puts everything back.</p>'],
    ['Can I use Dawn Patrol in another language?', '<p>Yes. Open <b>Menu</b>, then choose a language under <b>Language</b> at the top of the Display section: English, Español, Français, Deutsch, Português (Brasil) or Italiano. The choice is saved on this device. Most labels and buttons change. Times, numbers and the compass letters stay in English for now. The Help text, the Terms and the Privacy Policy are in English.</p>'],
    ['Text is too small or animations bother me', '<p>Open <b>Menu</b>, then <b>Accessibility</b>. You can choose larger text, higher contrast or wider spacing, or turn off all animation. The app also follows your device’s contrast and reduce-motion settings.</p>'],
    ['Does it work with a screen reader or keyboard?', '<p>Yes. Charts read out a summary of their range and peak. Focus a chart and use the left and right arrow keys to move hour by hour. Page Up and Page Down jump six hours, and Home and End go to the ends. A <b>Skip to the forecast</b> link appears on your first Tab press. The <a href="/docs/ACCESSIBILITY" target="_blank" rel="noopener noreferrer">accessibility statement</a> lists what is supported and what is not yet.</p>'],
    ['What does Read aloud do?', '<p>On the <b>Now</b> tab, <b>Read aloud</b> speaks a short forecast for the spot with your device’s own voice. It starts with cautions and rip current risk, then conditions right now, the best upcoming window and the next few days. The words are put together from the same forecast numbers shown on the page, in your chosen units, so nothing is made up. It speaks English for now. <b>Pause</b> and <b>Stop</b> sit next to it, and the speed is under <b>Menu</b>, <b>Accessibility</b>. If you already use VoiceOver or TalkBack, you can skip it. The page works with them directly. Your browser picks the voice, and some browsers use an online voice.</p>'],
    ['What do the color-blind and font options do?', '<p>In <b>Menu</b>, <b>Accessibility</b>, <b>Color vision</b> switches the score colors to a set that stays easy to tell apart for most kinds of color blindness. It also puts a pattern on each score color: plain for Poor, lines for Fair, dots for Good, diagonal lines for Great and a crosshatch for Epic. The score word and number always show too. <b>Font</b> switches to an easier-to-read typeface (Atkinson Hyperlegible, loaded when you choose it, with Verdana as a backup). It was made for low vision, and many people with dyslexia find it easier too, though no font works for everyone. <b>Wider spacing</b> also adds space between paragraphs.</p>'],
    ['Can I hear a chart?', '<p>Yes. The swell, wind, water, air and tide charts have a <b>Hear it</b> button. It plays the values as a short run of tones. A higher pitch means a higher value, and a quick high ping marks now. The spoken summary and the arrow keys still work. Sound plays on your device only.</p>'],
    ['Can I see where a number comes from?', '<p>Yes. Right-click (or press and hold on a phone) on any section, chart or the picture at the top, or use the small <b>Source</b> button on a heading. A menu opens with a link to the data behind it, such as the NOAA tide station, the buoy page, the National Weather Service text or the raw forecast numbers, plus a link about the provider. Links open in a new tab. Text boxes keep the normal browser menu, and on a computer you can hold Shift while right-clicking to get the browser’s own menu. With the keyboard, Tab to a <b>Source</b> button and press Enter.</p>'],
    ['Where is my data kept?', '<p>On your device only. Your spots, notes and settings are stored in this browser. Use Export to keep a copy or move them to another device.</p>'],
    ['Something is broken. How do I report it?', '<p>Open <b>Menu</b> and tap <b>Report a problem</b>. The app keeps a short list of errors and your last few taps, on this device only. Save the log and email it if you want to. Nothing is sent unless you send it.</p>'],
    ['Where are the docs and the source code?', '<p>Both are public on this site. The <a href="/docs/" target="_blank" rel="noopener">Documentation</a> covers how it works, the API, data sources, testing and deployment. The <a href="/source/" target="_blank" rel="noopener">Source files</a> page lists every file as plain text.</p>'],
  ] },
  { h: 'Data and trust', items: [
    ['Where does the data come from?', '<p>Waves, swell, sea temperature and tide height come from the Open-Meteo marine models. Wind, air, sun and rain come from the Open-Meteo weather models. Where they are available, the app also uses NOAA National Weather Service forecasts, NOAA tide predictions, NDBC and CDIP wave buoys, the CDIP nearshore model for California, the PacIOOS wave models for Hawaii, Open-Meteo ensemble runs, California state beach advisories and Open-Meteo air quality. For the next 3 days it also checks wind and swell against <a href="https://www.weatherapi.com/" target="_blank" rel="noopener">WeatherAPI.com</a> and <a href="https://www.visualcrossing.com/" target="_blank" rel="noopener">Visual Crossing</a> (<a href="https://www.visualcrossing.com/" target="_blank" rel="noopener">Weather data by Visual Crossing</a>). It blends them into the score and falls back to them if Open-Meteo is down. First and last light are worked out on your device from the spot’s position.</p>'],
    ['What does the extra weather sources setting do?', '<p>For the next 3 days, Dawn Patrol asks two more free forecast services, WeatherAPI.com and Visual Crossing, for wind, and WeatherAPI.com for swell. Wind is averaged, with Open-Meteo counting for half and the other two for a quarter each. Swell moves toward WeatherAPI.com only when the two agree on direction and period. Otherwise Open-Meteo is used alone. From day 4 on, and in the ranking of all your spots, only Open-Meteo is used. If Open-Meteo does not answer, these two sources keep a real 3-day forecast on screen. Turn the setting off in the Menu to use Open-Meteo only.</p>'],
    ['It says "Demo data". What does that mean?', '<p>The app could not reach the live services, so the numbers are made up to show you the screens. Do not use them to decide where to surf. Check the status chip at the top and reload once you are back online.</p>'],
    ['How accurate is it?', '<p>Models are a guide. Small, short-period surf and local wind are the hardest to predict. Check a buoy and local reports before you drive. <b>Forecast accuracy</b> on the More tab shows how the models have done at your spot.</p>'],
    ['How far ahead can I trust it?', '<p>Pick 3, 5, 7, 10 or 14 days above Next days. The first three or four days are the most reliable. Past about a week, treat the forecast as a trend.</p>'],
    ['What are the shaded bands on the model charts?', '<p>On the wave chart, the band runs from the lowest model to the highest each hour, so a narrow band means the models agree. On the wind chart it covers the range where 8 in 10 ensemble runs fall. A band that spreads out means the forecast is unsure.</p>'],
    ['What is the swell spectrum?', '<p>Under <b>Buoys</b>, pick a buoy to see how its wave energy is split by period. A tall peak at 14 seconds or more is groundswell. Energy at 6 to 8 seconds is local wind chop. Not every station publishes a spectrum.</p>'],
    ['Why do some spots show extra wave models?', '<p>Some regions have local wave models that are finer than the global ones. In model comparison, California spots get the CDIP nearshore model, and spots in the Hawaiian islands get the University of Hawaii PacIOOS models, including a 500 m nearshore model for the main islands. Everywhere else you see the global models only. The local models pick up how islands and headlands shadow and bend the swell.</p>'],
    ['Where do the beach advisories come from?', '<p>For California spots, <b>Water and rain</b> shows postings and closures from the State Water Board Beach Watch records for the nearest monitored beach. The state updates these in batches, so check the Safe to Swim map or your county health department for today. Outside California, Dawn Patrol links to EPA BEACON.</p>'],
    ['What is the algae report?', '<p>For spots within about 60 km of Scripps Pier in La Jolla, <b>Water and rain</b> shows the weekly CalHABMAP sample from the pier: water temperature, chlorophyll, counts of harmful algae and domoic acid. Each line has its own date, because lab counts and toxin tests arrive a week or more after the water temperature. A bloom is flagged when Pseudo-nitzschia passes 10,000 cells/L or particulate domoic acid passes 0.5 ng/mL (the SCCOOS HAB Bulletin levels), or when red tide algae or Akashiwo pass 100,000 cells/L (this app’s own guide). One pier does not describe every beach, so use it as a heads-up and check county advisories before swimming or eating shellfish. When the pier water temperature differs from the ocean model, the water tile says so.</p>'],
    ['Can Dawn Patrol alert me to algae blooms?', '<p>Yes. Open the Menu and turn on <b>Algae bloom alerts</b>, then allow notifications. Dawn Patrol checks the Scripps Pier sample every hour and sends one notification when a bloom is newly flagged. It sends nothing else. Samples are weekly and lab results lag, so an alert can come days after the water was sampled. On iPhone and iPad, add Dawn Patrol to your Home Screen first. Turn the switch off any time to remove your device from the list.</p>'],
    ['What is the rip current risk?', '<p>In the US, the National Weather Service surf zone forecast gives a rip current risk for each period. Low does not mean no rips. If you get caught in one, stay calm, do not fight it, and swim parallel to the shore.</p>'],
    ['What does first light mean?', '<p>First light is when it is bright enough to see the lineup, about when the sun is 6 degrees below the horizon. Last light is the same in the evening.</p>'],
    ['Is it safe to rely on?', '<p>No forecast can tell you the surf is safe. Rips, hazards, closures and your own ability matter more. Hazard hints are advice only. Never surf beyond your limits.</p>'],
    ['Where are the Terms of Service and Privacy Policy?', '<p>Read the <a href="/terms" target="_blank" rel="noopener">Terms of Service</a> and the <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>. By using Dawn Patrol you agree to the Terms.</p>'],
  ] },
];
function helpHtml(q) {
  q = (q || '').trim().toLowerCase(); let n = 0;
  const strip = h => h.replace(/<[^>]+>/g, ' ');
  const out = HELP.map(sec => {
    const items = sec.items.filter(it => !q || (it[0] + ' ' + strip(it[1])).toLowerCase().includes(q));
    if (!items.length) return ''; n += items.length;
    return '<section class="help-sec"><h3>' + esc(sec.h) + '</h3>' + items.map((it, i) => '<details' + ((q && items.length < 6) || (!q && sec.open && i < 1) ? ' open' : '') + '><summary>' + esc(it[0]) + '</summary><div class="help-a">' + it[1] + '</div></details>').join('') + '</section>';
  }).join('');
  return out || '<p class="note">Nothing matches "' + esc(q) + '". Try a shorter word, such as "pin", "tide" or "offline".</p>';
}
let helpFrom = null;
function openHelp() {
  const m = $('#helpm'); if (!m) return; helpFrom = document.activeElement; $('#help-q').value = ''; $('#help-body').innerHTML = helpHtml(''); m.hidden = false; $('#help-q').focus();
}
function closeHelp() { const m = $('#helpm'); if (!m || m.hidden) return; m.hidden = true; if (location.hash === '#help') { try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) { /* ok */ } } if (helpFrom && helpFrom.focus) helpFrom.focus(); }

const REPORT_TO = ['dawnpatrol.reports', 'example.com'].join('@');
let reportNote = '';
function reportCtx() {
  const a = S.a11y || {};
  return { app: 'Dawn Patrol', screen: S.view, mode: S.mode, note: reportNote, settings: { 'Units': S.units, 'Theme': document.documentElement.dataset.theme || '', 'Spot': S.selId || 'none', 'Range': S.range + ' days', 'More detail': S.xopen ? 'open' : 'closed', 'Text size': a.text, 'Spots': S.pins.length } };
}
function reportHtml() {
  const c = DPLOG.counts();
  return '<div class="sec" id="report-sec"><h2>Report a problem <small>' + (c.errors ? c.errors + ' recorded' : 'nothing recorded') + '</small></h2><div class="card">' +
    '<p class="note" style="margin:0 0 8px">Dawn Patrol keeps a short log of errors and your last few taps, on this device only. If something looks wrong, save the log and email it. Nothing is sent unless you send it. Your notes, name and password aren’t in the log. Spot names can appear, because the log records what you tapped.</p>' +
    '<label class="fld"><span>What went wrong? <small>(optional)</small></span><textarea id="rp-note" rows="3" maxlength="1000" placeholder="For example: the Forecast page was blank after I picked 14 days">' + esc(reportNote) + '</textarea></label>' +
    '<div class="modal-btns" style="flex-wrap:wrap;gap:8px;margin-top:10px"><button type="button" class="btn pri" data-rp="save">Save log (.txt)</button><button type="button" class="btn" data-rp="mail">Email it</button><button type="button" class="btn" data-rp="share" id="rp-share"' + (navigator.share ? '' : ' hidden') + '>Share</button><button type="button" class="btn" data-rp="copy">Copy</button><button type="button" class="btn sm" data-rp="view">Preview</button><button type="button" class="btn sm" data-rp="clear">Clear log</button></div>' +
    '<p class="note" id="rp-msg" role="status" style="margin:8px 0 0"></p><pre id="rp-pre" hidden style="max-height:240px;overflow:auto;font-size:11px;white-space:pre-wrap;margin:8px 0 0"></pre></div></div>';
}
function reportMsg(t) { const m = $('#rp-msg'); if (m) m.textContent = t; toast(t); }
function reportText() { const n = $('#rp-note'); if (n) reportNote = n.value; return DPLOG.report(reportCtx()); }
function reportFile() { return 'dawn-patrol-log-' + DPLOG.stamp() + '.txt'; }
function reportMailUrl(txt) {
  const c = DPLOG.counts(), body = 'Hi,\r\n\r\n' + (reportNote ? reportNote.trim() + '\r\n\r\n' : 'Something went wrong in Dawn Patrol.\r\n\r\n') + '(Please attach the log file I just saved: ' + reportFile() + ')\r\n\r\nQuick summary:\r\n' + txt.split('\r\n').filter(l => /^(Created|Screen|Data mode|Browser|Screen size|Online|Problems recorded)/.test(l)).join('\r\n') + '\r\n' + (c.last ? '\r\nLast error: ' + c.last.m.slice(0, 300) + '\r\n' : '');
  return 'mailto:' + REPORT_TO + '?subject=' + encodeURIComponent('Dawn Patrol problem report') + '&body=' + encodeURIComponent(body.slice(0, 1700));
}
function wireReport() {
  document.addEventListener('input', e => { if (e.target && e.target.id === 'rp-note') reportNote = e.target.value; });
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-rp]'); if (!b) return; const a = b.dataset.rp;
    if (a === 'save') { download(reportFile(), reportText(), 'text/plain'); reportMsg('Log saved as ' + reportFile() + '. Attach it to an email.'); }
    else if (a === 'mail') {
      const txt = reportText(); download(reportFile(), txt, 'text/plain');
      location.href = reportMailUrl(txt);
      reportMsg('Your email app should open. Attach the saved file ' + reportFile() + ' before sending. If nothing opened, send it to ' + REPORT_TO + '.');
    }
    else if (a === 'share') {
      const txt = reportText(); try { const f = new File([txt], reportFile(), { type: 'text/plain' }); if (navigator.canShare && navigator.canShare({ files: [f] })) await navigator.share({ files: [f], title: 'Dawn Patrol problem report', text: 'Dawn Patrol problem report' }); else await navigator.share({ title: 'Dawn Patrol problem report', text: txt.slice(0, 6000) }); } catch (er) { if (!er || er.name !== 'AbortError') reportMsg('Sharing isn’t available here. Use Save log instead.'); }
    }
    else if (a === 'copy') { const txt = reportText(); try { await navigator.clipboard.writeText(txt); reportMsg('Log copied. Paste it into an email.'); } catch (er) { const p = $('#rp-pre'); p.hidden = false; p.textContent = txt; const r = document.createRange(); r.selectNodeContents(p); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); reportMsg('Select the text below and copy it.'); } }
    else if (a === 'view') { const p = $('#rp-pre'); if (!p) return; p.hidden = !p.hidden; if (!p.hidden) p.textContent = reportText(); }
    else if (a === 'clear') { DPLOG.clear(); menuRefresh(); const m = $('#rp-msg'); if (m) m.textContent = 'Log cleared.'; }
  });
  let told = false;
  DPLOG.onError(en => {
    if (told || en.k === 'net') return; told = true;
    toast('Something went wrong. You can send details from Menu, then Report a problem.');
    menuRefresh();
  });
}
function wireHelp() {
  $('#help-q').addEventListener('input', e => { $('#help-body').innerHTML = helpHtml(e.target.value); });
  $('#help-close').addEventListener('click', closeHelp);
  $('#helpm').addEventListener('click', e => { if (e.target.id === 'helpm') closeHelp(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });
}
const WQ = new Map();
const wqDay = d => (d ? new Date(d + 'T12:00:00Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '');
const HABC = new Map();
const habDay = t => (t ? new Date(t * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }) : '');
const habNum = n => (n == null ? '–' : Math.round(n).toLocaleString());
function habBannerHtml(D) {
  const v = D && D._hab; if (!v || v.status !== 'bloom' || !v.flags.length) return '';
  return '<div class="alert hab-b" data-t="warn"><b>Algae bloom flagged at ' + esc(v.site.name) + '.</b> <span class="note">' + esc(v.flags.map(f => f.short).join(' ')) + ' Sampled ' + esc(habDay(Math.max.apply(null, v.flags.map(f => f.t)))) + '. See Water and rain below, and check county advisories before swimming.</span></div>';
}
function habFacts(spot, sst) {
  const w = HABC.get(cellKey(spot)), v = w && w.v; if (!v || !v.water || v.water.temp == null) return [];
  const d = sst != null ? v.water.temp - sst : null, dd = d == null ? null : (S.units === 'imperial' ? d * 1.8 : d);
  const sub = habDay(v.water.t) + (dd != null && Math.abs(dd) >= (S.units === 'imperial' ? 1 : 0.5) ? ', ' + f1(Math.abs(dd)) + tu() + (dd > 0 ? ' warmer' : ' cooler') + ' than the model' : '');
  return [tfact('Measured at ' + esc(v.site.name), f1(cvTmp(v.water.temp, S.units)) + tu(), esc(sub))];
}
function habHtml(v, D) {
  const tone = v.status === 'bloom' ? 'warn' : v.status === 'stale' ? 'info' : 'ok';
  const head = v.status === 'bloom' ? 'Algae bloom flagged at ' + v.site.name : v.status === 'stale' ? 'No recent sample from ' + v.site.name : 'No algae bloom flagged at ' + v.site.name;
  const L = [], w = v.water, cn = v.counts, da = v.da, ch = v.chl;
  const sst = D && D.H && D.H.sst ? D.H.sst[hourIndexNow(D.H, D.off)] : null;
  if (w && w.temp != null) {
    const d = sst != null ? w.temp - sst : null, dd = d == null ? null : (S.units === 'imperial' ? d * 1.8 : d), big = dd != null && Math.abs(dd) >= (S.units === 'imperial' ? 1 : 0.5);
    L.push('<li><b>Water ' + f1(cvTmp(w.temp, S.units)) + tu() + '</b> ' + esc(habDay(w.t)) + (big ? ' · ' + f1(Math.abs(dd)) + tu() + (dd > 0 ? ' warmer' : ' cooler') + ' than the ocean model now' : sst != null ? ' · close to the ocean model' : '') + '</li>');
  }
  if (ch && ch.v != null) L.push('<li><b>Chlorophyll ' + ch.v + ' mg/m³</b> ' + esc(habDay(ch.t)) + '</li>');
  if (cn) {
    const pn = Math.max(cn.pnSeriata || 0, cn.pnDelicatissima || 0), bits = [['Pseudo-nitzschia', pn], ['Alexandrium', cn.alexandrium], ['Red tide alga (Lingulodinium)', cn.lingulodinium], ['Akashiwo', cn.akashiwo], ['Dinophysis', cn.dinophysis]].filter(x => x[1]).map(x => esc(x[0]) + ' ' + habNum(x[1]));
    L.push('<li><b>Algae counts</b> ' + esc(habDay(cn.t)) + ' · ' + (bits.length ? bits.join(', ') + ' cells/L' : 'none of the watched kinds counted') + '</li>');
  }
  if (da && da.pda != null) L.push('<li><b>Domoic acid (particulate) ' + da.pda + ' ng/mL</b> ' + esc(habDay(da.t)) + '</li>');
  const why = v.flags.length ? '<ul class="wq-list">' + v.flags.map(f => '<li>' + esc(f.text) + '</li>').join('') + '</ul>' : '';
  return '<div class="adv" data-t="' + tone + '" style="margin-top:10px"><b>' + esc(head) + '</b><p>' + esc(v.site.name) + ' · ' + (v.km < 1 ? 'right here' : f1(v.km) + ' km from this spot') + ' · weekly sample' + (v.late ? ' (showing saved data)' : '') + '</p>' + why + (L.length ? '<ul class="wq-list">' + L.join('') + '</ul>' : '') +
    '<div class="adv-n">Samples are taken on Mondays. Temperature arrives first and lab counts and toxin tests a week or more later, so each line shows its own date. Bloom levels are Pseudo-nitzschia above 10,000 cells/L or domoic acid above 0.5 ng/mL (SCCOOS HAB Bulletin); 100,000 cells/L for red tide and Akashiwo is this app’s own guide. It is a sample from one pier, not a health advisory: check county notices before swimming or eating shellfish. Data: <a target="_blank" rel="noopener noreferrer" href="' + esc(v.link) + '">CalHABMAP and SCCOOS</a>.</div></div>';
}
async function fillHab(D, spot) {
  const box = $('#hab-body'); if (!box || S.mode !== 'live') return;
  if (!(spot.lat >= 32.3 && spot.lat <= 33.4 && spot.lon >= -118.0 && spot.lon <= -116.5)) return;
  try {
    const k = cellKey(spot); let w = HABC.get(k);
    if (!w || Date.now() - w.at > 3600000) { w = { at: Date.now(), v: await apiGet('/api/sccoos?lat=' + spot.lat + '&lon=' + spot.lon, 30000) }; HABC.set(k, w); }
    if (S.selId !== spot.id || !$('#hab-body')) return;
    const v = w.v; if (!v || !v.supported) { $('#hab-body').innerHTML = ''; return; }
    D._hab = v;
    const hz = $('#haz'); if (hz && v.status === 'bloom' && !hz.querySelector('.hab-b')) hz.insertAdjacentHTML('afterbegin', habBannerHtml(D));
    $('#hab-body').innerHTML = habHtml(v, D);
  } catch (e) { const b = $('#hab-body'); if (b) b.innerHTML = '<p class="note" style="margin:8px 0 0">The Scripps Pier algae report is not available right now. See <a target="_blank" rel="noopener noreferrer" href="https://calhabmap.org/scripps-pier">CalHABMAP</a>.</p>'; }
}
const b64uBytes = s => { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); s += '='.repeat((4 - s.length % 4) % 4); const r = atob(s), a = new Uint8Array(r.length); for (let i = 0; i < r.length; i++) a[i] = r.charCodeAt(i); return a; };
const pushPost = (path, body) => hostFetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
async function bloomOff() {
  store.set('bloom', false);
  try { const reg = await navigator.serviceWorker.getRegistration(), sub = reg && await reg.pushManager.getSubscription(); if (sub) { await pushPost('/api/push/unsubscribe', { endpoint: sub.endpoint }).catch(() => {}); await sub.unsubscribe(); } } catch (e) { /* nothing to switch off */ }
}
async function bloomToggle(t) {
  if (!t.checked) { await bloomOff(); toast('Algae bloom alerts are off.'); menuRefresh(); return; }
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) throw new Error('This browser can’t receive push notifications.');
    if (Notification.permission === 'denied') throw new Error('Notifications are blocked for Dawn Patrol in this browser’s settings.');
    const perm = await Notification.requestPermission(); if (perm !== 'granted') throw new Error('Allow notifications to turn on algae bloom alerts.');
    const reg = await navigator.serviceWorker.ready, key = (await apiGet('/api/push/key', 15000)).key;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uBytes(key) });
    const r = await pushPost('/api/push/subscribe', { endpoint: sub.endpoint, bloom: true });
    if (!r.ok) { let m = ''; try { m = (await r.json()).error; } catch (e) { /* no detail */ } throw new Error(m || 'The server didn’t accept the subscription.'); }
    store.set('bloom', true); toast('Algae bloom alerts are on. Use Send a test to check.');
  } catch (e) { await bloomOff(); toast(String((e && e.message) || e)); }
  menuRefresh();
}
async function bloomTest() {
  try {
    const reg = await navigator.serviceWorker.ready, sub = await reg.pushManager.getSubscription(); if (!sub) throw new Error('Turn on algae bloom alerts first.');
    const j = await (await pushPost('/api/push/ping', { endpoint: sub.endpoint })).json();
    toast(j.ok ? 'Test sent. It shows the current Scripps Pier report.' : (j.error || 'The push service didn’t accept the test.'));
  } catch (e) { toast(String((e && e.message) || e)); }
}
function bloomHtml() {
  const on = !!store.get('bloom', false), can = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const ios = /iPhone|iPad/.test(navigator.userAgent) && !(window.matchMedia && matchMedia('(display-mode: standalone)').matches) ? ' On iPhone and iPad, add Dawn Patrol to your Home Screen first.' : '';
  return '<div class="msec"><h4>Algae bloom alerts</h4><p class="note">Get a phone notification when the weekly Scripps Pier sample (SCCOOS CalHABMAP) first shows a harmful algae bloom or toxin level. Samples are taken on Mondays and lab results can take a week or more, so alerts can lag. The notification only reports what the sample shows. It is not a health advisory.' + ios + '</p>' +
    '<div class="mrow"><label for="bl-on">Algae bloom alerts</label><input type="checkbox" id="bl-on"' + (on ? ' checked' : '') + (can ? '' : ' disabled') + '></div>' +
    '<div class="mbtns"><button class="btn sm" type="button" data-menu="bl-test"' + (on ? '' : ' disabled') + '>Send a test</button></div>' +
    (can ? '' : '<p class="note">This browser can’t receive push notifications.</p>') + '</div>';
}
async function fillBeachWq(D, spot) {
  const box = $('#wq-body'); if (!box || S.mode !== 'live') return;
  const ca = spot.lat >= 32.3 && spot.lat <= 42.1 && spot.lon >= -124.7 && spot.lon <= -114.0, us = spot.lat > 17 && spot.lat < 50 && spot.lon < -64 && spot.lon > -161;
  if (!ca) { if (us) box.innerHTML = '<p class="note" style="margin:8px 0 0">Posted beach advisories for US coasts are in <a target="_blank" rel="noopener noreferrer" href="https://watersgeo.epa.gov/beacon2/">EPA BEACON</a>. Dawn Patrol reads state records for California only.</p>'; return; }
  box.innerHTML = '<div class="skel" style="margin-top:8px">Checking California beach advisories…</div>';
  try {
    const k = cellKey(spot); let w = WQ.get(k);
    if (!w || Date.now() - w.at > 3600000) { w = { at: Date.now(), v: await apiGet('/api/beachwq?lat=' + spot.lat + '&lon=' + spot.lon, 30000) }; WQ.set(k, w); }
    if (S.selId !== spot.id || !$('#wq-body')) return;
    const v = w.v; if (!v.supported) { $('#wq-body').innerHTML = ''; return; }
    if (!v.beach) { $('#wq-body').innerHTML = '<p class="note" style="margin:8px 0 0">No monitored beach within 6 km of this spot in the California state records.</p>'; return; }
    const ns = v.notices || [], n0 = ns[0], age = n0 && n0.date ? (Date.now() - Date.parse(n0.date + 'T12:00:00Z')) / 864e5 : null, open = n0 && !n0.reopened;
    const tone = n0 && age != null && age <= 21 && open ? (/closure/i.test(n0.type) ? 'bad' : 'warn') : 'info';
    const head = n0 && age != null && age <= 30 ? 'Recent ' + String(n0.type || 'advisory').toLowerCase() + ' near ' + v.beach.name : 'No notice in the last 30 days at ' + v.beach.name;
    const list = ns.slice(0, 3).map(x => '<li><b>' + esc(x.type || 'Notice') + '</b> ' + esc(wqDay(x.date)) + (x.reopened ? ', reopened ' + esc(wqDay(x.reopened)) : '') + (x.cause ? ' · ' + esc(x.cause) : '') + (x.where ? ' · ' + esc(x.where) : '') + '</li>').join('');
    $('#wq-body').innerHTML = '<div class="adv" data-t="' + tone + '" style="margin-top:10px"><b>' + esc(head) + '</b><p>' + esc(v.beach.name) + (v.beach.city ? ', ' + esc(v.beach.city) : '') + ' · ' + (v.beach.km < 1 ? 'right here' : f1(v.beach.km) + ' km away') + ' · ' + esc(v.beach.county || '') + ' County</p>' + (list ? '<ul class="wq-list">' + list + '</ul>' : '') +
      '<div class="adv-n">State records are loaded in batches' + (v.dataThrough ? ' and currently run through ' + esc(wqDay(v.dataThrough)) : '') + '. They can lag, so for today’s status check the <a target="_blank" rel="noopener noreferrer" href="' + esc(v.link) + '">Safe to Swim map</a> or the county health department.</div></div>';
  } catch (e) { const b = $('#wq-body'); if (b) b.innerHTML = '<p class="note" style="margin:8px 0 0">California beach advisories are not available right now. Check the <a target="_blank" rel="noopener noreferrer" href="https://mywaterquality.ca.gov/safe-to-swim/safe-to-swim-maps.html">Safe to Swim map</a>.</p>'; }
}
const AIR = new Map();
function comfortHtml(D, spot, i) {
  const H = D.H, day = H.t[i].slice(0, 10); let uvPk = null, uvA = null, uvB = null;
  for (let k = 0; k < H.t.length && H.t[k].slice(0, 10) <= day; k++) { if (H.t[k].slice(0, 10) !== day) continue; const u = H.uv[k]; if (u == null) continue; if (uvPk == null || u > uvPk) uvPk = u; if (u >= 3) { if (uvA == null) uvA = k; uvB = k; } }
  let h = '<div class="sec" id="comfort"><h2>Comfort and air <small>sun, rain, fog, smoke</small></h2><div class="grid" id="comfort-body">';
  if (uvPk != null) h += stat('Sun protection', 'UV ' + f0(uvPk), '', uvA != null ? 'Sunscreen from ' + esc(fmtClock(H.t[uvA])) + ' to ' + esc(fmtClock(H.t[uvB])) + '<br>' + uvWord(uvPk) + ' at the peak' : 'Low all day, no sunscreen window');
  const nx = []; for (let k = i; k < Math.min(H.t.length, i + 12); k++) nx.push(k);
  const pops = nx.map(k => H.pop[k]).filter(x => x != null);
  if (pops.length) { const mp = Math.max(...pops), wk = nx.find(k => H.pop[k] === mp); h += stat('Rain chance', f0(mp), '%', mp >= 20 ? 'Highest around ' + esc(fmtClock(H.t[wk])) + '<br>next 12 hours' : 'Dry for the next 12 hours'); }
  const vis = nx.map(k => H.vis[k]).filter(x => x != null);
  if (vis.length) { const mv = Math.min(...vis), imp = S.units === 'imperial'; h += stat('Visibility', imp ? f1(mv / 1609.34) : f1(mv / 1000), imp ? 'mi' : 'km', mv < 1000 ? 'Fog likely: hard to see the lineup and other surfers' : mv < 4000 ? 'Hazy: reduced view of the lineup' : 'Clear for the next 12 hours'); }
  return h + '</div></div>';
}
const aqiWord = a => (a == null ? '' : a <= 50 ? 'Good' : a <= 100 ? 'Moderate' : a <= 150 ? 'Unhealthy for sensitive groups' : a <= 200 ? 'Unhealthy' : a <= 300 ? 'Very unhealthy' : 'Hazardous');
async function fillAir(D, spot) {
  const box = $('#comfort-body'); if (!box || S.mode !== 'live') return;
  try {
    const k = cellKey(spot); let a = AIR.get(k);
    if (!a || Date.now() - a.at > 30 * 60000) { const j = await jget('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=' + spot.lat.toFixed(3) + '&longitude=' + spot.lon.toFixed(3) + '&hourly=us_aqi&forecast_days=3&timezone=auto', 15000); a = { at: Date.now(), j }; AIR.set(k, a); }
    const hr = a.j && a.j.hourly; if (!hr || !Array.isArray(hr.time) || !Array.isArray(hr.us_aqi)) return;
    const box2 = $('#comfort-body'); if (!box2 || S.selId !== spot.id) return;
    let i0 = hr.time.indexOf(D.H.t[hourIndexNow(D.H, D.off)]); if (i0 < 0) i0 = 0;
    const win = hr.us_aqi.slice(i0, i0 + 24).filter(x => x != null); if (!win.length) return;
    const now = hr.us_aqi[i0] != null ? hr.us_aqi[i0] : win[0], mx = Math.max(...win);
    if (box2.querySelector('[data-air]')) return;
    box2.insertAdjacentHTML('beforeend', stat('Air quality', f0(now), 'AQI', esc(aqiWord(now)) + (mx > now + 15 ? '<br>Up to ' + f0(mx) + ' in the next day' : '') + (now > 100 || mx > 100 ? '<br>Smoke or haze: hard paddling is rough on the lungs' : '')).replace('<div class="card"', '<div class="card" data-air="1"'));
  } catch (e) { /* air quality is a bonus: stay quiet when it is not available */ }
}
/* first visit: ask once which units to use. Closing the question keeps the default (feet) and asks again next time, until a spot is added or a choice is made. */
function unitsAsk() {
  const m = $('#unitsm'); if (!m) return;
  const show = () => {
    const lang = String(navigator.language || '').toLowerCase(), guess = /^en-(us|lr)$|^my(-|$)/.test(lang) ? 'imperial' : 'metric';
    m.querySelectorAll('[data-uask]').forEach(b => b.classList.toggle('pri', b.dataset.uask === guess));
    m.hidden = false; const g = m.querySelector('[data-uask="' + guess + '"]'); if (g) g.focus();
  };
  const r = $('#recvm');
  if (r && !r.hidden) { let n = 0; const tm = setInterval(() => { if (r.hidden || ++n > 600) { clearInterval(tm); if (r.hidden && store.get('units', null) === null) show(); } }, 500); return; }
  show();
}
function wireUnitsAsk() {
  const m = $('#unitsm'); if (!m) return;
  m.addEventListener('click', e => {
    if (e.target === m) { m.hidden = true; return; }
    const b = e.target.closest('[data-uask]'); if (!b) return;
    S.units = b.dataset.uask; store.set('units', S.units); m.hidden = true; renderAllLists(); if (TDET.id) openTile(TDET.id, true);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) m.hidden = true; });
}
/* first visit (and once for people who used an older version): ask for the surfing level before showing the site. It cannot be dismissed. */
function levelAsk(done) {
  const m = $('#levelm'); if (!m) { if (done) done(); return; }
  const cur = LEVELS.some(l => l[0] === S.prof.level) ? S.prof.level : 'intermediate';
  m.querySelectorAll('[data-lask]').forEach(b => b.classList.toggle('pri', b.dataset.lask === cur));
  m._done = done || null; m.hidden = false; const g = m.querySelector('[data-lask="' + cur + '"]'); if (g) g.focus();
}
function wireLevelAsk() {
  const m = $('#levelm'); if (!m) return;
  m.addEventListener('click', e => {
    const b = e.target.closest('[data-lask]'); if (!b) return;
    S.prof.level = b.dataset.lask; store.set('prof', S.prof); store.set('lvlask', 1); m.hidden = true; applyLevel();
    const f = m._done; m._done = null; if (f) f();
  });
}
async function boot() {
  const askUnits = store.get('units', null) === null && S.pins.length === 0, askLevel = store.get('lvlask', null) === null;
  setSurfLevel(S.prof.level);
  applyA11y(); syncTheme(); i18nInit();
  initMap(); wire(); wireGroup2(); wireMerge(); wireLayout(); wireUnitsAsk(); wireLevelAsk(); renderStatus(); setView('home');
  if (askLevel) levelAsk(() => { if (askUnits) unitsAsk(); });
  startAlerts();
  fitPins();
  const spot = spotById(S.selId) || S.pins[0] || null; S.selId = spot ? spot.id : null;
  if (spot) { renderHead(null, spot); $('#tab-now').innerHTML = '<div class="skel">Connecting to the marine models…</div>'; } else renderEmptyDetail();
  S.scanBusy = S.pins.length > 0; renderRank(); renderMarkers();
  try {
    S.mode = 'live';
    if (spot) { const d = await loadDetail(spot, 'live'); d.mode = 'live'; S.detail.set(spot.id, d); offlineSave(spot.id, d); fcRecord(d, spot); } else await probeLive();
  } catch (e) {
    S.mode = e && e.status ? 'live' : 'demo';
    if (!(e && e.status)) {
      const saved = offlineAll(), ids = Object.keys(saved).filter(i => spotById(i)).sort((a, b) => (saved[b].loadedAt || 0) - (saved[a].loadedAt || 0));
      if (ids.length) { S.mode = 'offline'; if (!saved[S.selId]) S.selId = ids[0]; }
    }
  }
  renderStatus();
  if (S.selId) await select(S.selId);
  scanRegion(); applyShare();
  initPwa(); applyLayoutAll();
  if (askUnits && !askLevel) unitsAsk();
}
function fitPins() {
  if (!map) return; const sp = S.pins;
  if (sp.length === 1) { map.setView(sp[0].lat, sp[0].lon, 10); return; }
  if (sp.length) { map.fit(sp, 46); return; }
  /* nothing saved yet: a neutral whole-world view. No region is assumed, so the clock's timezone is not used */
  map.setView(20, 0, 2);
}
/* ============================================================
   ALERTS: a message to a webhook (for example IFTTT) when a spot is forecast to reach a score the person picks.
   Looks 14 days ahead, runs only while this page is open, and sends straight from the browser.
   The webhook address stays on this device; Dawn Patrol's servers never see it.
   ============================================================ */
const AL_DAYS = 14, AL_CAP = 12, AL_KEY = 'alerts-sent';
const alertCfg = () => Object.assign({ on: false, url: '', min: 70, mode: 'spot' }, store.get('alerts', {}));
const alertUrlOk = u => /^https:\/\/\S+$/.test(String(u || '').trim());
/* one webhook address per line (any channel that takes a POST); only https addresses are used, up to five */
const AL_MAX_URLS = 5;
const alertUrls = c => String(c.url || '').split(/\s+/).filter(alertUrlOk).slice(0, AL_MAX_URLS);
/* the best hour per spot per local day at or above the chosen score */
function alertHits(now) {
  const cfg = alertCfg(), out = [];
  S.pins.forEach(spot => {
    const sc = S.scan.get(spot.id); if (!sc || !sc.ok || !sc.H || !sc.H.t) return;
    const i0 = Math.max(0, hourIndexNow(sc.H, sc.off, now)), end = Math.min(sc.H.t.length, i0 + AL_DAYS * 24), bias = scoreBias(spot.id).d, best = {};
    for (let i = i0; i < end; i++) {
      const t = sc.H.t[i]; if (!t) continue;
      const r = biasOne(scoreHour(valAt(sc.H, i), SX(spot)), bias); if (!r || r.score < cfg.min) continue;
      const day = t.slice(0, 10);
      if (!best[day] || r.score > best[day].score) best[day] = { spot, day, t, score: r.score, band: r.band };
    }
    Object.keys(best).forEach(d => out.push(best[d]));
  });
  return out;
}
async function sendAlert(urls, title, message) {
  /* no-cors: the browser cannot read the replies, so only a network failure shows. Counts as sent if any address took it */
  const body = JSON.stringify({ title, message, value1: title, value2: message });
  const res = await Promise.allSettled(urls.map(u => fetch(u, { method: 'POST', mode: 'no-cors', keepalive: true, body })));
  if (!res.some(r => r.status === 'fulfilled')) throw new Error('no address accepted the message');
}
async function checkAlerts() {
  const cfg = alertCfg(), urls = alertUrls(cfg); if (!cfg.on || !urls.length || !S.pins.length) return 0;
  const now = Date.now(), sent = store.get(AL_KEY, {}), hits = alertHits(now);
  let n = 0;
  const send = async (key, title, message) => {
    if (sent[key] || n >= AL_CAP) return;
    try { await sendAlert(urls, title, message); sent[key] = now; n++; } catch (e) { /* no connection: the next check tries again */ }
  };
  if (cfg.mode === 'daily') {
    const days = {};
    hits.forEach(h => { (days[h.day] = days[h.day] || []).push(h); });
    for (const day of Object.keys(days).sort()) {
      const list = days[day].sort((a, b) => b.score - a.score);
      await send('daily|' + day, 'Dawn Patrol: ' + plural(list.length, 'spot') + ' at ' + cfg.min + '+ on ' + dayLabel(list[0].t),
        list.map(h => h.spot.name + ' ' + h.score + ' ' + BANDS[h.band].name + ' ' + fmtClock(h.t)).join('; '));
    }
  } else {
    for (const h of hits.sort((a, b) => (a.t < b.t ? -1 : 1))) {
      await send('spot|' + h.spot.id + '|' + h.day, 'Dawn Patrol: ' + h.spot.name,
        dayLabel(h.t) + ' ' + fmtClock(h.t) + ' score ' + h.score + ' (' + BANDS[h.band].name + ')');
    }
  }
  /* forget sent-markers older than two days so the list stays small */
  const cut = new Date(now - 2 * 864e5).toISOString().slice(0, 10);
  Object.keys(sent).forEach(k => { if (k.slice(-10) < cut) delete sent[k]; });
  store.set(AL_KEY, sent);
  return n;
}
async function runAlerts() {
  const cfg = alertCfg(); if (!cfg.on || !alertUrls(cfg).length || S.mode !== 'live' || !S.pins.length) return;
  try { await scanRegion(true); } catch (e) { return; }
  await checkAlerts();
}
function startAlerts() { setTimeout(runAlerts, 20000); setInterval(runAlerts, 30 * 60000); }
function alertsChange(t) {
  const c = alertCfg(), before = alertUrls(c).length;
  if (t.id === 'al-on') c.on = t.checked;
  else if (t.id === 'al-min') { const v = Math.round(+t.value); if (isFinite(v) && t.value !== '') c.min = clamp(v, 0, 100); }
  else if (t.id === 'al-mode') c.mode = t.value === 'daily' ? 'daily' : 'spot';
  else if (t.id === 'al-url') c.url = String(t.value || '').slice(0, 2000);
  if (c.on && !alertUrls(c).length) { c.on = false; toast('Add a webhook address that starts with https:// first.'); }
  store.set('alerts', c);
  /* typing an address does not rebuild the menu, so a click on Send a test is not lost to the blur */
  if (t.id !== 'al-url' || alertUrls(c).length !== before) menuRefresh();
  if (c.on) runAlerts();
}
function alertsHtml() {
  const c = alertCfg(), urls = alertUrls(c), typed = String(c.url || '').split(/\s+/).filter(Boolean).length;
  const note = !urls.length ? 'Add a webhook address that starts with https:// to use alerts.'
    : typed > urls.length ? 'Only https:// addresses are used, up to ' + AL_MAX_URLS + '. ' + plural(urls.length, 'address', 'addresses') + ' will get each alert.'
    : c.on ? 'Alerts are on. Dawn Patrol can’t tell whether a message arrived, so send a test first.'
    : 'Turn on Send alerts to start.';
  return bloomHtml() + '<div class="msec"><h4>Alerts</h4>' +
    '<p class="note">Get a message at one or more webhooks you set up (IFTTT or a chat channel) when a spot is forecast to reach a score you pick, up to 14 days ahead. Alerts only run while this page is open. Addresses stay on this device, and messages are sent straight from your browser.</p>' +
    '<div class="mrow"><label for="al-on">Send alerts</label><input type="checkbox" id="al-on"' + (c.on ? ' checked' : '') + '></div>' +
    '<div class="mrow"><label for="al-min">Score at or above</label><input type="number" id="al-min" min="0" max="100" step="1" value="' + c.min + '"></div>' +
    '<div class="mrow"><label for="al-mode">Send</label><select id="al-mode"><option value="spot"' + (c.mode === 'daily' ? '' : ' selected') + '>Each spot when it qualifies</option><option value="daily"' + (c.mode === 'daily' ? ' selected' : '') + '>One summary a day</option></select></div>' +
    '<div style="display:grid;gap:6px;margin-top:6px"><label for="al-url">Webhook addresses, one per line</label><textarea id="al-url" rows="3" spellcheck="false" autocomplete="off" placeholder="https://maker.ifttt.com/trigger/…" style="width:100%;font:inherit;padding:8px 10px">' + esc(c.url) + '</textarea></div>' +
    '<div class="mbtns"><button class="btn sm" type="button" data-menu="al-test"' + (urls.length ? '' : ' disabled') + '>Send a test</button></div>' +
    '<p class="note">' + note + '</p></div>';
}
const MENU = { report: false };
const THEMER = '<span class="knob"><svg class="sun" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="4.200"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900l2.100 2.100M17 17l2.100 2.100M4.900 19.100L7 17M17 7l2.100-2.100" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><svg class="moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.500 14.500A8.500 8.500 0 0 1 9.500 3.500a8.500 8.500 0 1 0 11 11z"/></svg></span>';
function menuHtml() {
  const pr = S.prof, dk = isDark();
  let h = '<div class="msec"><h4>Display</h4>' +
    '<div class="mrow"><label for="lang-sel">Language</label><select id="lang-sel">' + I18N_LANGS.map(l => '<option value="' + l.code + '" lang="' + l.code + '"' + (I18N.lang === l.code ? ' selected' : '') + '>' + l.name + '</option>').join('') + '</select></div>' +
    '<div class="mrow"><span id="units-l">Units</span><div class="seg" id="units" role="group" aria-labelledby="units-l"><button type="button" data-u="imperial" aria-pressed="' + (S.units === 'imperial') + '">Feet, mph, °F</button><button type="button" data-u="metric" aria-pressed="' + (S.units === 'metric') + '">Metres, km/h, °C</button></div></div>' +
    '<div class="mrow"><label for="xs-on">Check wind and swell against WeatherAPI.com and Visual Crossing</label><input type="checkbox" id="xs-on"' + (xsrcOn() ? ' checked' : '') + '></div>' +
    '<div class="mrow"><span id="themer-l">Dark mode</span><button class="themer" id="themer" type="button" role="switch" aria-checked="' + dk + '" aria-labelledby="themer-l">' + THEMER + '</button></div>' +
    '<div class="mrow"><label for="pf-level">Your surfing level</label><select id="pf-level">' + LEVELS.map(o => '<option value="' + o[0] + '"' + (pr.level === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div><p class="note">Tailors the score, size cautions and board hints on every spot. Beginner favors small, gentle surf and warns above 4 ft; Advanced keeps the full-size score.</p></div>';
  h += homeHtml();
  h += alertsHtml();
  h += '<div class="msec"><h4>Your spots</h4><p class="note">' + (S.pins.length ? plural(S.pins.length, 'spot') + ' saved on this device. ' : 'No spots yet. ') + 'Export them to move them to another device or send them to a friend.</p><div class="mbtns"><button class="btn sm" type="button" data-menu="export"' + (S.pins.length ? '' : ' disabled') + '>Export</button><button class="btn sm" type="button" data-menu="import">Import</button><button class="btn sm" type="button" data-menu="shareall"' + (S.pins.length ? '' : ' disabled') + '>Share all as a link</button></div></div>';
  h += offlineHtml();
  if (isDesktop()) h += '<div class="msec"><h4>Page layout</h4><p class="note">Drag the sections of the spot page into your own order, or hide the ones you do not use.</p><div class="mbtns"><button class="btn sm" type="button" data-menu="layout"' + (S.selId ? '' : ' disabled') + '>Edit layout</button><button class="btn sm" type="button" data-menu="layout-reset"' + (Object.keys(S.layout).length ? '' : ' disabled') + '>Reset layout</button></div></div>';
  h += a11yHtml();
  h += '<div class="msec"><h4>Install</h4>' + (isStandalone() ? '<p class="note">Dawn Patrol is installed on this device.</p>' : PWA.evt ? '<p class="note">Opens full screen from your home screen and keeps working with no signal.</p><div class="mbtns"><button class="btn sm pri" type="button" data-menu="install">Install the app</button></div>' : '<p class="note">On iPhone, tap Share, then <b>Add to Home Screen</b>. On Android or desktop Chrome, use the browser menu, then <b>Install app</b>. Installed copies keep working offline.</p>') + '</div>';
  h += '<div class="msec"><h4>Support Dawn Patrol</h4><p class="note">Dawn Patrol is free to use. Donations help fund future development.</p><div class="mbtns"><a class="btn sm pri" href="' + DONATE_URL + '" target="_blank" rel="noopener">Donate on Venmo</a></div></div>' + '<div class="msec"><h4>Help</h4><div class="mbtns"><button class="btn sm" type="button" data-menu="help">Help and FAQ</button><button class="btn sm" type="button" data-menu="report" aria-expanded="' + MENU.report + '">Report a problem</button></div>' + (MENU.report ? reportHtml() : '') + '<p class="note mlinks"><a href="/docs/" target="_blank" rel="noopener">Documentation</a><a href="/source/" target="_blank" rel="noopener">Source code</a><a href="/terms" target="_blank" rel="noopener">Terms</a><a href="/privacy" target="_blank" rel="noopener">Privacy</a></p></div>';
  return h;
}
function openMenu() { const m = $('#menu'); MENU.from = document.activeElement; $('#menu-body').innerHTML = menuHtml(); m.hidden = false; $('#menu-btn').setAttribute('aria-expanded', 'true'); $('#menu-close').focus(); }
function closeMenu() { const m = $('#menu'); if (m.hidden) return; m.hidden = true; $('#menu-btn').setAttribute('aria-expanded', 'false'); if (MENU.from && MENU.from.focus && document.body.contains(MENU.from)) MENU.from.focus(); }
function menuRefresh() { const m = $('#menu'); if (!m || m.hidden) return; const c = m.querySelector('.menu-card'), st = c.scrollTop, f = document.activeElement && document.activeElement.id; $('#menu-body').innerHTML = menuHtml(); c.scrollTop = st; if (f && $('#' + f)) $('#' + f).focus({ preventScroll: true }); }
function wireMenu() {
  $('#menu-btn').addEventListener('click', openMenu);
  $('#menu-close').addEventListener('click', closeMenu);
  $('#menu').addEventListener('click', e => {
    if (e.target.id === 'menu') { closeMenu(); return; }
    const u = e.target.closest('#units button[data-u]'); if (u) { S.units = u.dataset.u; store.set('units', S.units); renderAllLists(); if (TDET.id) openTile(TDET.id, true); return; }
    if (e.target.closest('#themer')) { setTheme(isDark() ? 'light' : 'dark'); menuRefresh(); return; }
    const hp = e.target.closest('[data-home-pick]'); if (hp) { homePick(+hp.dataset.homePick); menuRefresh(); return; }
    const b = e.target.closest('[data-menu]'); if (!b) return; const a = b.dataset.menu;
    if (a === 'export') { closeMenu(); openExport(); }
    else if (a === 'shareall') { closeMenu(); shareAllSpots(); }
    else if (a === 'import') { closeMenu(); $('#i-text').value = ''; $('#i-file').value = ''; iMode = 'merge'; document.querySelectorAll('#i-mode .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.m === 'merge')); importPreview(); $('#iport').hidden = false; $('#i-text').focus(); }
    else if (a === 'layout') setEditing(true);
    else if (a === 'layout-reset') { layReset(); toast('The spot page is back to the default order.'); menuRefresh(); }
    else if (a === 'install' && PWA.evt) { const ev = PWA.evt; PWA.evt = null; ev.prompt(); menuRefresh(); }
    else if (a === 'bl-test') bloomTest();
    else if (a === 'al-test') { const u = alertUrls(alertCfg()); sendAlert(u, 'Dawn Patrol test', 'If this arrives, alerts work on this device.').then(() => toast('Test sent to ' + plural(u.length, 'address', 'addresses') + '. Check your service to see whether it arrived.')).catch(() => toast('Couldn’t send the test. Check the addresses and your connection.')); }
    else if (a === 'home-find') homeFind();
    else if (a === 'home-gps') homeGps();
    else if (a === 'home-clear') { S.home = null; store.set('home', null); renderAllLists(); }
    else if (a === 'help') { closeMenu(); openHelp(); }
    else if (a === 'report') { MENU.report = !MENU.report; menuRefresh(); if (MENU.report) { const s = $('#report-sec'); if (s) s.scrollIntoView({ block: 'nearest' }); } }
  });
  $('#menu').addEventListener('change', e => {
    const t = e.target; if (!t.id) return;
    if (t.id === 'lang-sel') { i18nSet(t.value); menuRefresh(); i18nNode($('#menu')); }
    else if (t.id === 'pf-level') { S.prof.level = t.value; store.set('prof', S.prof); store.set('lvlask', 1); applyLevel(); }
    else if (t.id === 'xs-on') { store.set('xsrc', !!t.checked); S.detail.clear(); if (S.selId) select(S.selId).catch(() => {}); }
    else if (t.id === 'bl-on') bloomToggle(t);
    else if (t.id === 'al-on' || t.id === 'al-min' || t.id === 'al-mode' || t.id === 'al-url') alertsChange(t);
    else if (t.id === 'a11y-text') a11ySet({ text: t.value }); else if (t.id === 'a11y-motion') a11ySet({ motion: t.value });
    else if (t.id === 'a11y-contrast') a11ySet({ contrast: t.value }); else if (t.id === 'a11y-spacing') a11ySet({ spacing: t.value });
    else if (t.id === 'a11y-cvd') a11ySet({ cvd: t.value }); else if (t.id === 'a11y-font') a11ySet({ font: t.value }); else if (t.id === 'a11y-rate') a11ySet({ rate: parseFloat(t.value) });
  });
  $('#menu').addEventListener('keydown', e => { if (e.target.id === 'home-q' && e.key === 'Enter') { e.preventDefault(); homeFind(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#menu').hidden) closeMenu(); });
  document.addEventListener('keydown', dialogTrap);
  /* export and import dialogs */
  $('#x-list').addEventListener('change', e => { const c = e.target.closest('[data-xc]'); if (c) { xSel[c.dataset.xc] = c.checked; xRefresh(); } });
  $('#x-close').addEventListener('click', () => { $('#xport').hidden = true; });
  $('#xport').addEventListener('click', e => { if (e.target.id === 'xport') $('#xport').hidden = true; });
  $('#x-copy').addEventListener('click', async () => { const t = $('#x-text').value; try { await navigator.clipboard.writeText(t); toast('Copied. Paste it into Import on the other device.'); } catch (er) { $('#x-text').select(); toast('Select the text and copy it.'); } });
  $('#x-dl').addEventListener('click', () => { download(exportBundleFile(), JSON.stringify(buildBundle(xSel), null, 1), 'application/json'); toast('Saved ' + exportBundleFile() + '.'); });
  $('#i-text').addEventListener('input', importPreview);
  $('#i-file').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (!f) return; if (f.size > 3e6) { $('#i-note').textContent = 'That file is too large to be a Dawn Patrol export.'; return; } const r = new FileReader(); r.onload = () => { $('#i-text').value = String(r.result || ''); importPreview(); }; r.readAsText(f); });
  $('#i-prev').addEventListener('change', e => { const c = e.target.closest('[data-ic]'); if (c) { iSel[c.dataset.ic] = c.checked; importNote(); } });
  $('#i-mode').addEventListener('click', e => { const b = e.target.closest('button[data-m]'); if (!b) return; iMode = b.dataset.m; document.querySelectorAll('#i-mode button').forEach(x => x.setAttribute('aria-pressed', x === b)); importNote(); });
  $('#i-close').addEventListener('click', () => { $('#iport').hidden = true; });
  $('#iport').addEventListener('click', e => { if (e.target.id === 'iport') $('#iport').hidden = true; });
  $('#i-go').addEventListener('click', applyImport);
  document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (!$('#xport').hidden) $('#xport').hidden = true; if (!$('#iport').hidden) $('#iport').hidden = true; });
}
boot();
/* version and build time: stamped by build.sh from VERSION, shown top right and bottom left */
const APP_VERSION = '0.1.31', APP_BUILT = '2026-10-12T14:51:59Z';
function verText() {
  if (APP_VERSION.startsWith('__')) return 'v dev';
  let when = APP_BUILT;
  try { when = new Date(APP_BUILT).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); } catch (e) { /* keep the raw stamp */ }
  return 'v' + APP_VERSION + ' \u00b7 updated ' + when;
}
function stampVersion() {
  const top = document.querySelector('.top'); if (top) { const t = document.createElement('span'); t.className = 'verstamp'; t.textContent = verText(); top.prepend(t); }
  const f = document.createElement('div'); f.className = 'verfoot'; f.textContent = verText(); document.body.appendChild(f);
}
stampVersion();
/* Terms and Privacy links at the foot of every page: the spot list and the spot page. Absolute addresses, so the links also work from the published artifact copy. */
const LEGAL_BASE = 'https://dawnpatrol.casadelfuego.org';
const DONATE_URL = 'https://venmo.com/u/Max-Schwede';
function addLegal() {
  const html = '<footer class="legal"><p class="donate-foot"><span>Dawn Patrol is free to use.</span> <a href="' + DONATE_URL + '" target="_blank" rel="noopener">Support development on Venmo</a></p><nav aria-label="Legal"><a href="' + LEGAL_BASE + '/terms" target="_blank" rel="noopener">Terms of Service</a><a href="' + LEGAL_BASE + '/privacy" target="_blank" rel="noopener">Privacy Policy</a></nav></footer>';
  ['#scout', '#detail'].forEach(s => { const el = document.querySelector(s); if (el && !el.querySelector(':scope > .legal')) el.insertAdjacentHTML('beforeend', html); });
}
addLegal();
