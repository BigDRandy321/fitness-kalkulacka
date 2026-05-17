import { aktivityData } from "./data.js";

class Aktivita {
  constructor(nazev, kalorieNaJednotku) {
    this.nazev = nazev;
    this.kalorieNaJednotku = kalorieNaJednotku;
  }

  vypocitejKalorie() {
    return 0;
  }

  get popis() {
    return `${this.nazev}: ${this.vypocitejKalorie()} kcal`;
  }
}

class KardioAktivita extends Aktivita {
  constructor(nazev, kalorieNaJednotku, trvaniMinut) {
    super(nazev, kalorieNaJednotku);
    this.trvaniMinut = trvaniMinut;
  }

  vypocitejKalorie() {
    return this.kalorieNaJednotku * this.trvaniMinut;
  }
}

class SilovaAktivita extends Aktivita {
  constructor(nazev, kalorieNaJednotku, serie, opakovani) {
    super(nazev, kalorieNaJednotku);
    this.serie = serie;
    this.opakovani = opakovani;
  }

  vypocitejKalorie() {
    return this.kalorieNaJednotku * this.serie * this.opakovani;
  }
}

class Uzivatel {
  constructor() {
    this.aktivity = [];
  }

  pridejAktivitu(aktivita) {
    this.aktivity.push(aktivita);
  }

  spocitejCelkemKalorie() {
    return this.aktivity.reduce((souctem, aktivita) => souctem + aktivita.vypocitejKalorie(), 0);
  }

  ziskejAktivity() {
    return this.aktivity.slice();
  }
}

function vytvorAktivitu(data) {
  if (data.typ === "kardio") {
    return new KardioAktivita(data.nazev, data.kalorieNaJednotku, data.trvaniMinut);
  }

  return new SilovaAktivita(data.nazev, data.kalorieNaJednotku, data.serie, data.opakovani);
}

const uzivatel = new Uzivatel();
for (const aktivitaData of aktivityData) {
  const aktivita = vytvorAktivitu(aktivitaData);
  uzivatel.pridejAktivitu(aktivita);
}

console.log("FITNESS KALKULAČKA");
console.log("====================");
for (const aktivita of uzivatel.ziskejAktivity()) {
  console.log(aktivita.popis);
}
console.log("--------------------");
console.log(`Celkem: ${uzivatel.spocitejCelkemKalorie()} kcal`);
