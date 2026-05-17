import { aktivityData } from "./data";

// Typy z číselníku pro kardio a silový trénink.
type KardioData = {
  id: number;
  typ: "kardio";
  nazev: string;
  kalorieNaJednotku: number;
  trvaniMinut: number;
};

type SilovaData = {
  id: number;
  typ: "silova";
  nazev: string;
  kalorieNaJednotku: number;
  serie: number;
  opakovani: number;
};

type AktivitaData = KardioData | SilovaData;

// Základní třída pro aktivitu.
abstract class Aktivita {
  constructor(
    protected nazev: string,
    protected kalorieNaJednotku: number
  ) {}

  abstract vypocitejKalorie(): number;

  get popis(): string {
    return `${this.nazev}: ${this.vypocitejKalorie()} kcal`;
  }
}

// Kardio aktivita.
class KardioAktivita extends Aktivita {
  constructor(nazev: string, kalorieNaJednotku: number, private trvaniMinut: number) {
    super(nazev, kalorieNaJednotku);
  }

  vypocitejKalorie(): number {
    return this.kalorieNaJednotku * this.trvaniMinut;
  }
}

// Silová aktivita.
class SilovaAktivita extends Aktivita {
  constructor(
    nazev: string,
    kalorieNaJednotku: number,
    private serie: number,
    private opakovani: number
  ) {
    super(nazev, kalorieNaJednotku);
  }

  vypocitejKalorie(): number {
    return this.kalorieNaJednotku * this.serie * this.opakovani;
  }
}

class Uzivatel {
  private aktivity: Aktivita[] = [];

  pridejAktivitu(aktivita: Aktivita): void {
    this.aktivity.push(aktivita);
  }

  spocitejCelkemKalorie(): number {
    return this.aktivity.reduce((souctem, aktivita) => souctem + aktivita.vypocitejKalorie(), 0);
  }

  ziskejAktivity(): Aktivita[] {
    return [...this.aktivity];
  }
}

function vytvorAktivitu(data: AktivitaData): Aktivita {
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
