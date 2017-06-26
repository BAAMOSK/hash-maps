class Hash {
  constructor() {
    this.length = 0;
    this._slots = [];
    this._capacity = 8;
    this._deleted = 0;
  }

  _resize(size) {
    //makes a reference to old array
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._slots = [];
    //reiterate
    for (const slot of oldSlots) {
      if (slot !== undefined) {
        //rehashes based on size of 24 instead of 8
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {

    //prime number
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //converting the asci code
      // console.log(string.charCodeAt(i));
      hash = (hash << 5) + hash + string.charCodeAt(i);
      // console.log(hash);
      //Makes sure that hash is a positive number
      //The & is a bitwise operator
      hash = hash & hash;
    }
    //returns a positive number
    return hash >>> 0;
  }

  set(key, value, parent) {
    //computes load ratio
    const loadRatio = (this.length + 1) / this._capacity;
    //if close to 90% will increase size
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //index is KEY
    let theSlot = this._findSlot(key);
    const index = theSlot[0];
    const prev = theSlot[1];
    //finds slot
    let prevObj = this._slots[prev];

    if (typeof prevObj !== "undefined") {
      prevObj.next = index;
    }

    this._slots[prev] = prevObj;

    this._slots[index] = {
      key,
      value,
      next: null
    };



    this.length++;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      //throw new Error('Key error');
      return undefined;
    }
    return this._slots[index].value;
  }
  _findSlot(key) {
    let prevEl = null;
    //takes key and hashes it
    const hash = HashMap._hashString(key);
    //starting index of key
    const start = hash % this._capacity;
    // console.log(start);
    for (let i = start; i < start + this._capacity; i++) {
      let index = i % this._capacity;
      let slot = this._slots[index];
      let originalSlot = slot;
      //finds if key is empty

      //console.log((slot === undefined || slot.key == key))

      while (!(slot === undefined)) {
        prevEl = index;
        index++;
        slot = this._slots[index];

      }

      return [index, prevEl];
    }
  }
}

let x = new Hash();
x.set("foo", "buzz");
x.set("foo", "bar");
x.set("Bizz", "beetle");
x.set("Bizz", "bop");
x.set("ars", "technica");
x.set("prosthetic", "knowledge");
x.set("foo", "buzz");
x.set("foo", "bar");
x.set("Bizz", "beetle");
x.set("Bizz", "bop");
x.set("ars", "technica");
x.set("prosthetic", "knowledge");
console.log(x);
