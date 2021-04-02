(self.webpackChunkpixi_gsap_responsive=self.webpackChunkpixi_gsap_responsive||[]).push([[622],{622:e=>{"use strict";e.exports=JSON.parse('{"page-1":{"titlePartOne":"Rijndael","titlePartTwo":"Chiffre","text":"Animation mit einer Größe von jeweils 128 Bit für den Datenblock und den Schlüssel"},"page-2":{"boxText":"Rijndael-\\nVerschlüsseler","textLeft":"Chiffrierschlüssel","textBottom":"Chiffretext","textTop":"Klartext"},"page-3":{"title":"Input","subtitleLeft":"Zustand","subtitleRight":"Chiffrierschlüssel","explanationLeft":"Dies ist ein Block aus der zu verschlüsselnden Klartextnachricht","explanationRight":"Hexadezimale Notation (Beispiel):","textLeft":"zum Verschlüsselungsprozess","textRight":"zum Key Schedule"},"page-4":{"title":"Verschlüsselungs-\\nprozess","text":"(Durchführen der Verschlüsselung des gegebenen Klartextblocks mit 4 verschiedenen Transformationen in der ersten Runde, den 9 Hauptrunden und der letzten Runde)"},"page-5":{"title":"Verschlüsselungsprozess","titleInitialRound":"erste Runde","titleMainRounds":"9 Hauptrunden","titleFinalRound":"letzte Runde","labelInitial":"AddRoundKey","labelMrone":"1-SubBytes","labelMrTwo":"2-ShiftRows","labelMrThree":"3-MixColumns","labelMrFour":"4-addRoundKey","labelFrOne":"SubBytes","labelFrTwo":"ShiftRows","labelFrThree":"AddRoundKey","boxTitleOne":"Chiffrierschlüssel","boxTitleTwo":"Round key 0","boxTitleThree":"Round Key 10"},"page-6":{"title":"Die 4 Arten von Transformationen:","labelOne":"1-SubBytes","labelTwo":"2-ShiftRows","labelThree":"3-MixColumns","labelFour":"4-addRoundKey"},"page-7":{"title":"1 - SubBytes","round":"Runde 1","sboxLabel":"S-Box","sboxExplanation":"Byte-Substitutionstabelle"},"page-8":{"title":"2 - ShiftRows","rotateTextOne":"um 1 Byte drehen","rotateTextTwo":"um 2 Bytes drehen","rotateTextThree":"um 3 Bytes drehen"},"page-9":{"title":"3 - MixColumns","text":"Die vier Zahlen einer Spalte werden im Rijndael\'schen Galoisfeld mit einer gegebenen Matrix modulo multipliziert.","text2":"Der Schritt \'MixColumns\' ist zusammen mit dem Schritt \'ShiftRows\' die Hauptquelle der Diffusion in Rijndael.."},"page-10":{"title":"4 - AddRoundKey","roundKeyLabel":"Round key","roundKeyText":"(Erzeugt als Rundtaste 1 während des Tastenplans - siehe Folie 14)"},"page-11":{"intoText":"Diese Transformationen werden für 9 weitere Runden auf den Zustand angewendet. Die letzte Runde beinhaltet nicht die MixColumns-Transformation.","roundLabel":"Runde","subBytesLabel":"SubBytes","ShiftRowsLabel":"ShiftRows","MixColumnsLabel":"MixColumns","RoundKeyLabel":"Round key","inputLabel":"Input","roundOneLabel":"Runde 1","roundTwoLabel":"Runde 2","roundThreeLabel":"Runde 3","roundFourLabel":"Runde 4","roundFiveLabel":"Runde 5"},"page-12":{"intoText":"Diese Transformationen werden für 9 weitere Runden auf den Zustand angewendet. Die letzte Runde beinhaltet nicht die MixColumns-Transformation.","roundLabel":"Runde","subBytesLabel":"SubBytes","ShiftRowsLabel":"ShiftRows","MixColumnsLabel":"MixColumns","RoundKeyLabel":"Round key","outputLabel":"Output","roundSixLabel":"Runde 6","roundSevenLabel":"Runde 7","roundEightLabel":"Runde 8","roundNineLabel":"Runde 9","roundTenLabel":"Runde 10","cipherTextLabel":"Chiffretext"},"page-13":{"title":"Key Schedule","text":"(Zerlegung des gegebenen Chiffrierschlüssels in 11 Teilschlüssel, die in der Anfangsrunde, den 9 Hauptrunden und der Endrunde verwendet werden)"},"page-14":{"title":"Key Schedule","RotWordLabel":"RotWord","RconLabel":"Rcon","SubBytesLabel":"SubBytes","SBoxLabel":"S-Box","WOne":"Wi-4","WTwo":"Wi-1","WThree":"Wi","RconFourLabel":"Rcon(4)","textIntro":"Der erweiterte Schlüssel kann als ein Array von 32-Bit-Wörtern (Spalten) gesehen werden, die von 0 bis 43 nummeriert sind. Die ersten vier Spalten sind mit dem angegebenen Chiffrierschlüssel gefüllt","text":"Wörter an Positionen, die ein Vielfaches von 4 sind (W4, W5, ..., W40), werden berechnet durch:","textA":"a) Anwendung der RotWord- und SubBytes-Transformation auf das vorherige Wort wi-1","textB":"b) Addieren (XOR) dieses Ergebnisses zum Wort 4 Stellen vorher wi-4, plus eine Rundkonstante Rcon","textXOR":"Die verbleibenden 32-Bit-Worte wi, werden durch Addition (XOR) des vorherigen Wortes wi-1 mit dem Wort 4 Positionen früher Wi-4 berechnet","cipherKeyLabel":"Chiffrierschlüssel","roundKeyOneLabel":"Round key 1","roundKeyTwoLabel":"Round key 2","roundKeyThreeLabel":"Round key 3","roundKeyTenLabel":"Round key 10"}}')}}]);