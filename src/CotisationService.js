import axios from "axios";

const url = "http://localhost:3000/api/cotisations/";

class CotisationService {
  static getCotisations() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(cotisation => ({
            ...cotisation
          }))
        ); //pour pouvoir utiliser les méthodes getYear ...
      } catch (err) {
        reject(err);
      }
    });
  }
  static postCotisation(annee, montant) {
    return axios.post(url, {
      annee: annee,
      montant: montant
    });
  }
}

export default CotisationService;
