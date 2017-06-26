class HashMap {
    //Initial data structure is an array
    constructor(initialCapacity=8) {
        //no length
        this.length = 0;
        //empty array
        this._slots = [];
        //capacity is arg or 8
        this._capacity = initialCapacity;
        this.deleted = 0;
    }
    //this hashes the KEY
    static _hashString(string) {
        //prime number
        let hash = 5381;

        for (let i=0; i<string.length; i++) {
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
    //adding KEY VALUE to hashmap
    set(key, value) {
        //computes load ratio
        const loadRatio = (this.length + 1) / this._capacity;
        //if close to 90% will increase size
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //index is KEY
        const index = this._findSlot(key);
        //finds slot
        this._slots[index] = {
            key,
            value
        };
        this.length++;
    }

    _findSlot(key) {
        //takes key and hashes it
        const hash = HashMap._hashString(key);
        //starting index of key
        const start = hash % this._capacity;
        // console.log(start);
        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._slots[index];
            //finds if key is empty
            if (slot === undefined || slot.key == key) {
                return index;
            }
        }
    }
    remove(key) {
            const index = this._findSlot(key);
            //index
            const slot = this._slots[index];
            //if empty won't delete anything
            if (slot === undefined) {
                throw new Error('Key error');
            }

            slot.deleted = true;
            this.length--;
            this._deleted++;
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
}
//90% of array filled
HashMap.MAX_LOAD_RATIO = 0.9;
//The size we can increase by
HashMap.SIZE_RATIO = 3;

const hashes = new HashMap();
console.log(hashes);

// console.log(hashes._findSlot('bob'));
console.log(hashes.set('1'));
console.log(hashes.set('2'));
console.log(hashes.set('3'));
console.log(hashes.set('4'));
console.log(hashes.set('5'));
console.log(hashes.set('6'));
console.log(hashes.set('7'));
console.log(hashes.set('8'));
console.log(hashes);