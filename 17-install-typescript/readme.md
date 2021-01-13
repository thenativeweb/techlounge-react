# React und Typescript

Dieser Ordner enthält den Einkaufslistenrechner mit React in Version 17 und Webpack in Version 5 aus Folge 16 – vorbereitet für TypeScript.

Hier wurde jedoch noch keine Typisierungen vorgenommen, sondern lediglich das Build-System und die Dateien auf TypeScript umgestellt. Im wesentlichen handelt es sich aber noch um nativen JavaScript-Code.

## JSX-Datein umwandeln

Um alle JSX-Dateien in einem Verzeichnis und dessen Unterverzeichnisen umzuwandeln, kann folgender Befehl benutzt werden:

```shell
$ for file in **/*.jsx; do mv -- "$file" "${file%.jsx}.tsx"; done
```

**Stellt bitte unbedingt sicher, dass Ihr Euch im richtign Projektverzeichnis befindet, da dieser Befehl rekursiv alle vorgefundenen `.jsx`-Dateien in allen Unterverzeichnissen des aktullen Ordners in `.tsx` umwandelt.
