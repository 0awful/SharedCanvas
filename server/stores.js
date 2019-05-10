class KeyStore {
  constructor() {
    this.activeKeys = new Set();
  }

  // eslint-disable-next-line
  randomLetter() {
    let letter = '';
    switch (Math.floor(Math.random() * 26)) {
      case 0:
        letter = 'a';
        break;
      case 1:
        letter = 'b';
        break;
      case 2:
        letter = 'c';
        break;
      case 3:
        letter = 'd';
        break;
      case 4:
        letter = 'e';
        break;
      case 5:
        letter = 'f';
        break;
      case 6:
        letter = 'g';
        break;
      case 7:
        letter = 'h';
        break;
      case 8:
        letter = 'i';
        break;
      case 9:
        letter = 'j';
        break;
      case 10:
        letter = 'k';
        break;
      case 11:
        letter = 'l';
        break;
      case 12:
        letter = 'm';
        break;
      case 13:
        letter = 'n';
        break;
      case 14:
        letter = 'o';
        break;
      case 15:
        letter = 'p';
        break;
      case 16:
        letter = 'q';
        break;
      case 17:
        letter = 'r';
        break;
      case 18:
        letter = 's';
        break;
      case 19:
        letter = 't';
        break;
      case 20:
        letter = 'u';
        break;
      case 21:
        letter = 'v';
        break;
      case 22:
        letter = 'w';
        break;
      case 23:
        letter = 'x';
        break;
      case 24:
        letter = 'y';
        break;
      case 25:
        letter = 'z';
        break;
      default:
        break;
    }
    if (Math.floor(Math.random() * 2)) {
      return letter.toUpperCase();
    }
    return letter;
  }

  randomKey() {
    // obviously this could be improved, but effectively this solves all my problems. The performance
    // is O(1) so it's not horrible. The generation doesn't ensure that collisions can't occur, so, that's a problem
    // we fix this by our usage of this function
    const key =
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter() +
      this.randomLetter();

    return key;
  }

  guardedKey() {
    // we have a keyspace of 52^24, which is 1.5e41, so collisions are unlikely, and a DDOS
    // would take, well I mean, a little time, to be effective, but as
    // we approach max this generation method will be really bad. So we'll
    // get a better method later on.

    const tempKey = this.randomKey();

    if (this.activeKeys.has(tempKey)) {
      return this.guardedKey();
    }

    this.activeKeys.add(tempKey);
    return tempKey;
  }

  checkKey(key) {
    return this.activeKeys.has(key);
  }
}

module.exports.KeyStore = KeyStore;
