const {cut, count, tokenize} = require('./index');

describe('simply cutting words', () => {
  it('should cut sentences into words', () => {
    expect(cut('hello world')).toEqual(['hello', 'world']);

    const lorem = cut('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    expect(lorem[0]).toEqual('Lorem');
    expect(lorem[4]).toEqual('amet');
    expect(lorem.length).toBe(20);

    // punctuation at the end
    const myMind = cut('Where is my mind, where should I look for it ?');
    expect(myMind[9]).toBe('it');

    // special characters in words
    const specialChar = cut('Rodrigue as-tu du cœur ?');
    expect(specialChar[4]).toBe('cœur');

    // special characters between words
    expect(cut('Ce qu‘il m’a donné à manger… jeûner pour 50€ (HT) été£ %été^ été! ')[6]).toBe('manger');
    expect(cut('espace ; insécable devant le point-virgule, le point d\'exclamation ! et d\'interrogation ?')[0]).toBe('espace');
  });
});

describe('simply counting occurences', () => {
  it('should count words', () => {
    expect(count(['hello', 'world']).size).toBe(2);
    expect(count([]).size).toBe(0);
  });
  it('should deduplicate words', () => {
    expect(count(['hello', 'hello']).size).toBe(1);
    const numbers = count(['one', 'two', 'three', 'two']);
    expect(numbers.get('one')).toBe(1);
    expect(numbers.get('two')).toBe(2);
    expect(count(['Capital', 'capital', 'CAPITAL']).size).toBe(1);
  });
});

describe('combining simple cases', () => {
  it('should check ignored word size limit', () => {
    expect(tokenize('Hello world').size).toBe(2);
    expect(tokenize('Hello a world', 2).size).toBe(2);
    expect(tokenize('one two three four five', 3).size).toBe(3);
    expect(tokenize('one two three four five', 999).size).toBe(0);
  });
});


// test dataset
const texts = {
  de: [
    // Johann Wolfgang von Goethe, Erlkönig, 1782
    `Wer reitet so spät durch Nacht und Wind?
Es ist der Vater mit seinem Kind.
Er hat den Knaben wohl in dem Arm,
Er faßt ihn sicher, er hält ihn warm.

Mein Sohn, was birgst du so bang dein Gesicht?
Siehst Vater, du den Erlkönig nicht!
Den Erlenkönig mit Kron' und Schweif?
Mein Sohn, es ist ein Nebelstreif.

Du liebes Kind, komm geh' mit mir!
Gar schöne Spiele, spiel ich mit dir,
Manch bunte Blumen sind an dem Strand,
Meine Mutter hat manch gülden Gewand.

Mein Vater, mein Vater, und hörest du nicht,
Was Erlenkönig mir leise verspricht?
Sei ruhig, bleibe ruhig, mein Kind,
In dürren Blättern säuselt der Wind.

Willst feiner Knabe du mit mir geh'n?
Meine Töchter sollen dich warten schön,
Meine Töchter führen den nächtlichen Reihn
Und wiegen und tanzen und singen dich ein.

Mein Vater, mein Vater, und siehst du nicht dort
Erlkönigs Töchter am düsteren Ort?
Mein Sohn, mein Sohn, ich seh'es genau:
Es scheinen die alten Weiden so grau.

Ich lieb dich, mich reizt deine schöne Gestalt,
Und bist du nicht willig, so brauch ich Gewalt!
Mein Vater, mein Vater, jetzt faßt er mich an,
Erlkönig hat mir ein Leids getan.

Dem Vater grauset's, er reitet geschwind,
Er hält in den Armen das ächzende Kind,
Erreicht den Hof mit Mühe und Not,
In seinen Armen das Kind war tot.`
  ],
  dk: [
    // Søren Kierkegaard: Gjentagelsen, 1843, Af Constantin Constantius [Kladde og trykmanuskript]
    `Da jeg i længere Tid havde beskæftiget mig, leilighedsviis idetmindste, med det Problem, om en Gjentagelse er mulig og hvilken Betydning den har, om en Ting vinder eller taber ved at gjentages, faldt det mig pludselig ind: Du kan jo reise til Berlin, der har Du engang før været, og nu overbevise Dig om en Gjentagelse er mulig og hvad den har at betyde. I mit Hjem var jeg næsten gaaet istaae over dette Problem. Man sige havd man vil derom, det vil komme til at spille en saare vigtig Rolle i den nyere Philosophi; thi Gjentagelse er et afgjørende Udtryk for hvad "Erindring" var hos Grækerne. Som da disse lærte, at al Erkjenden er en Erinden, saaledes vil den nye Philosophi lære, at Livet er en Gjentagelse.`
  ],

  en: [
    // William Shakespear Hamlet, 1602, Act I: Scene 2
    "In a trumpet flourish, Claudius, the new King of Denmark, and his wife Gertrude enter their stateroom in the company of various courtiers, including Prince Hamlet, Claudius' aide Polonius, Polonius' son Laertes, and the ambasadors to Norway Voltemand and Cornelius. Claudius explains that he and Gertrude have chosen to marry immediately after his brother's death because, in light of the encroaching Danish army, the court could not afford excessive grief lest young Fortinbras mistake their mourning for weakness. He dispatches Voltemand and Cornelius to inform young Fortinbras' uncle of the young man's campaign against the Danes. As Claudius is himself, Fortinbras' uncle is brother to the recently dead king and currently controls the throne. Claudius hopes that the old man has the power to stop Fortinbras from carrying out his mission.",
    // Eminem, Slim Shady, 2000
    `Y'all act like you never seen a white person before
Jaws all on the floor like Pam and Tommy just burst in the door
Started whoopin' her ass worse than before, they first get divorced
Throwing her over furniture
It's the return of the \"Oh wait, no way, your kidding,
He didn't just say what I think he did, did he?\"`
  ],
  fr: [
    // Pierre Corneille, Le Cid, Acte I scene 5
    `D'un affront si cruel,
Qu'à l'honneur de tous deux il porte un coup mortel:
D'un soufflet. L'insolent en eût perdu la vie ;
Mais mon âge a trompé ma généreuse envie ;
Et ce fer que mon bras ne peut plus soutenir,
Je le remets au tien pour venger et punir.
va contre un arrogant éprouver ton courage :
Ce n'est que dans le sang qu'on lave un tel outrage ;
Meurs, ou tue. Au surplus, pour ne te point flatter
Je te donne à combattre un homme à redouter ;
Je l'ai vu, tout couvert de sang et de poussière,
Porter partout l'effroi dans une armée entière.
J'ai vu par sa valeur cent escadrons rompus ;
Et pour t'en dire encore quelque chose de plus,
Plus que brave soldat, plus que grand capitaine, C'est...`,
    // Franck Ribéry, Interview, Oct 2015
    "Le traitement médiatique français m’a beaucoup blessé. Cela a même blessé mon entourage qui m’entoure. Je suis un grand joueur respecté dans tous les pays du monde sauf en France, c’est comme si Messi n’était pas aimé au Brésil.",
    // Roland Barthe, Mythologies, 20??
    "Œuvres d'été, œuvres diverses."
  ]
};


describe('real life examples', () => {
  it('should like Shakespear', () => {
    const shakespearWords = tokenize(texts.en[0]);
    expect(shakespearWords.get('the')).toBe(11);
    expect(shakespearWords.get('polonius')).toBe(2);
    expect(shakespearWords.get('claudius')).toBe(5);
  });
  it('should be able to read multi-lines Eminem', () => {
    const eminemWords = tokenize(texts.en[1]);
    expect(eminemWords.get('did')).toBe(2);
  });
  it('should be able to read Latin and special caracters', () => {
    const kierkegaardWords = tokenize(texts.dk[0]);
    expect(kierkegaardWords.get('erindring')).toBe(1);
    const goetheWords = tokenize(texts.de[0]);
    expect(goetheWords.get('faßt')).toBe(2);
    const corneilleWords = tokenize(texts.fr[0]);
    expect(corneilleWords.get('eût')).toBe(1);
    expect(corneilleWords.get('plus')).toBe(4);
    const riberyWords = tokenize(texts.fr[1]);
    expect(riberyWords.get('blessé')).toBe(2);
    expect(riberyWords.get('entoure')).toBe(1);
    const bartheWords = tokenize(texts.fr[2]);
    expect(bartheWords.get('œuvres')).toBe(2);
  });

});
