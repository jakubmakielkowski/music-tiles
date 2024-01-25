import { CONFIG } from "scripts/config";

const alphabet: string = "0123456789abcdefghijklmnopqrstuvwxyz";

const pairs: Array<Array<string>> = new Array();

const generate = (): void => {
  for (let i = 0; i < CONFIG.SCREEN_HEIGHT; i++) {
    pairs[i] = new Array();

    for (let j = 0; j < CONFIG.SCREEN_WIDTH; j++) {
      pairs[i].push(`${alphabet[i]}${alphabet[j]}`);
    }
  }
};

const getLastPair = (): string => {
  return pairs[CONFIG.SCREEN_HEIGHT - 1][CONFIG.SCREEN_WIDTH - 1];
};

generate();

export { alphabet, getLastPair, pairs };
