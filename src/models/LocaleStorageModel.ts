import { StorageKeys } from "../configs/storagekeys";

class ObjectStorage implements Storage {
  private storage: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.storage).length;
  }

  getItem(key: string): string | null {
    return this.storage[key];
  }

  setItem(key: string, value: string): void {
    this.storage[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }

  clear(): void {
    this.storage = {};
  }

  key(keyIndex: number) {
    return Object.keys(this.storage)[keyIndex] || null;
  }
}

class LocalStorageModel implements Storage {
  private storage: Storage;

  constructor() {
    if (window.localStorage) {
      this.storage = window.localStorage;
    } else if (window.sessionStorage) {
      this.storage = window.sessionStorage;
    } else {
      this.storage = new ObjectStorage();
    }
  }

  get length(): number {
    return this.storage.length;
  }
  getItem(key: StorageKeys): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: StorageKeys, value: string): void {
    this.storage.setItem(key, value);
  }

  removeItem(key: StorageKeys): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  key(keyIndex: number): string | null {
    return this.storage.key(keyIndex);
  }
}

export const ownLocalStorage = new LocalStorageModel();
