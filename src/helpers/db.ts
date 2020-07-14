import * as SQLite from 'expo-sqlite';

import { Place } from '../models';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export function insertPlace({
  title,
  imageUri,
  address,
  lat,
  lng,
}: Omit<Place, 'id'>): Promise<SQLite.SQLResultSet> {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
}
