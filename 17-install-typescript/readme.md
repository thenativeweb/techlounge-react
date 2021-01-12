# React Typescript

Dieser Ordner enthält den Einkauflistenrechner mit React Version 17 und Webpack Version 5 aus Folge 16 – vorbereitet für TypeScript.

Hier wurden jedoch noch keine Typisierungen vorgenommen, sondern lediglich das Build-System und die Datene auf TypeScript umgestellt. Im wesentlichen handelt es sich aber noch um nativen JavaScript Code.

## JSX Datein umwandeln

Um alle JSX Dateien in einem Verzeichnis und dessen Unterverzeichnisen umzuwandeln, kann folgender Befehl benutzt werden.

```bash
for file in **/*.jsx; do mv -- "$file" "${file%.jsx}.tsx"; done
```

**Stellt bitte unbedingt sicher, dass ihr Euch im richtign Projektverzeichnis befindet, da dieser Befehl rekursiv alle vorgefundenen `.jsx`-Dateien in allen Subverzeichnissen des aktullen Ordners in `.tsx` umwandelt.
