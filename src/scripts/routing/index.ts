import CONFIG from "scripts/config";
import { alphabet, getLastPair, pairs } from "./helpers/compression";
import { generateCubesFromCoords } from "./helpers/cubes";

const decodeUrlParams = (url: string): void => {
  // containing only helpers alphabet letters pairs
  const regex = /^([0-9a-z]{2})+$/g;

  // Return if query string malformed
  if (!regex.test(url)) {
    return;
  }

  // Query string containing
  let areCoordsValid: boolean = true;

  const coordsStrings: Array<string> = url.match(/[0-9a-z]{2}/g);

  const coords: Array<Array<number>> = coordsStrings.map((coordString: string) => {
    const [a, b] = coordString.split("");

    const lastPair: string = getLastPair();
    const [lastA, lastB] = lastPair.split("");
    
    // If coords values are too big for grid
    if (alphabet.indexOf(a) > alphabet.indexOf(lastA) || alphabet.indexOf(b) > alphabet.indexOf(lastB)) {
      areCoordsValid = false;
    }

    return [alphabet.indexOf(a), alphabet.indexOf(b)];
  });

  if (areCoordsValid) {
    generateCubesFromCoords(coords);
  }
};

// Change querystring based on current active cubes seed
const changeUrlSeed = (seed: string): void => {
  const { origin } = window.location;
  const newURL: string = `${origin}/?${CONFIG.URL_SEED_PARAM_NAME}=${seed}`;
  history.pushState({}, null, newURL);
};

// Clear querystring
const clearUrlSeed = (): void => {
  const { origin } = window.location;
  const newURL: string = `${origin}`;
  history.pushState({}, null, newURL);
};

// Generate cubes based on query string param
window.addEventListener("load", (): void => {
  const { search } = window.location;

  const params: URLSearchParams = new URLSearchParams(search);
  const param = params.get(CONFIG.URL_SEED_PARAM_NAME);
  
  if (param) {
    decodeUrlParams(param);
  }
});

export { changeUrlSeed, clearUrlSeed };
