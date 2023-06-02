import type { ILocationIlce } from "./location_ilce_model";

export interface ILocation {
  il_adi: string;
  plaka_kodu: string;
  alan_kodu: string;
  nufus: string;
  bolge: string;
  yuzolcumu: string;
  nufus_artisi: string;
  erkek_nufus_yuzde: string;
  erkek_nufus: string;
  kadin_nufus_yuzde: string;
  kadin_nufus: string;
  nufus_yuzdesi_genel: string;
  ilceler: Array<ILocationIlce>;
}
