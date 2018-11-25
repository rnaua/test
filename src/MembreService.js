import axios from "axios";

const url = "http://localhost:3000/api/membres/";

class MembreService {
  //Get Membres
  static getMembresAndActualise(sort_by) {
    return new Promise(async (resolve, reject) => {
      try {
        const sort = sort_by; //choisir l'attribut pour trier les données
        const res = await axios.get(`${url}?sort_by=${sort}`);
        const data = res.data;
        resolve(
          data.map(membre => ({
            ...membre,
            naissance: new Date(membre.naissance),
            age: calculateAge(membre.naissance, membre._id), //permet d'actualiser l'age à chaque fois
            inscription: new Date(membre.inscription)
          }))
        ); //pour pouvoir utiliser les méthodes getYear ...
      } catch (err) {
        reject(err);
      }
    });
  }
  static MembreActualiseAge(id, naissance) {
    calculateAge(naissance, id);
  }

  static getMembres(sort_by) {
    return new Promise(async (resolve, reject) => {
      try {
        const sort = sort_by; //choisir l'attribut pour trier les données
        const res = await axios.get(`${url}?sort_by=${sort}`);
        const data = res.data;
        resolve(
          data.map(membre => ({
            ...membre,
            naissance: new Date(membre.naissance),
            inscription: new Date(membre.inscription)
          }))
        ); //pour pouvoir utiliser les méthodes getYear ...
      } catch (err) {
        reject(err);
      }
    });
  }

  //Create Membre
  static postMembre(nom, pre, adr, mail, tel, naiss) {
    return axios.post(url, {
      nom: nom,
      prenom: pre,
      mail: mail,
      telephone: tel,
      adresse: adr,
      naissance: naiss
    });
  }
  static udpateMembreNom(id, nom) {
    return axios.put(`${url}${id}`, {
      nom: nom
    });
  }
  static udpateMembrePrenom(id, pre) {
    return axios.put(`${url}${id}`, {
      prenom: pre
    });
  }
  static udpateMembreAdresse(id, adr) {
    return axios.put(`${url}${id}`, {
      adresse: adr
    });
  }

  static udpateMembreAge(id, age) {
    return axios.put(`${url}${id}`, {
      age: age
    });
  }
  static udpateMembreNaissance(id, naiss) {
    return axios.put(`${url}${id}`, {
      naissance: naiss
    });
  }
  static udpateMembreInscription(id, inscr) {
    return axios.put(`${url}${id}`, {
      inscription: inscr
    });
  }
  static udpateMembreTelephone(id, tel) {
    return axios.put(`${url}${id}`, {
      telephone: tel
    });
  }
  static udpateMembreMail(id, mail) {
    return axios.put(`${url}${id}`, {
      mail: mail
    });
  }
  static getFiltredMembres(sort_by, search) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `${url}?sort_by=${sort_by}&start_by=${search}`
        );
        const data = res.data;
        resolve(
          data.map(membre => ({
            ...membre,
            naissance: new Date(membre.naissance),
            inscription: new Date(membre.inscription)
          }))
        ); //pour pouvoir utiliser les méthodes getYear ...
      } catch (err) {
        reject(err);
      }
    });
  }
  //Delete Membre
  static deleteMembre(id) {
    return axios.delete(`${url}${id}`);
  }
}

function calculateAge(n, id) {
  const now = new Date();
  const naissance = new Date(n);
  var age;
  if (now.getMonth() < naissance.getMonth()) {
    age = now.getFullYear() - naissance.getFullYear() - 1;
  } else if (
    now.getMonth() == naissance.getMonth() &&
    now.getDate() < naissance.getDate()
  ) {
    age = now.getYear() - naissance.getYear() - 1;
  } else {
    age = now.getYear() - naissance.getYear();
  }

  axios.put(`${url}${id}`, {
    age: age
  });
  return age;
}

export default MembreService;
