import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('infoTemp.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists infoTemp (ID integer primary key autoincrement not null, car integer not null, bus integer not null, trucks integer not null, motorcycles integer not null, SessionID integer not null, Date text not null, longitude real not null,  latitude real not null, endDate text not null);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const addInfo = (
  car,
  bus,
  trucks,
  motorcycles,
  SessionID,
  startDate,
  longitude,
  latitude,
  endDate
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into infoTemp(car, bus, trucks, motorcycles, SessionID, Date, longitude, latitude, endDate) values(?,?,?,?,?,?,?,?,?);',
        [
          car,
          bus,
          trucks,
          motorcycles,
          SessionID,
          startDate,
          longitude,
          latitude,
          endDate,
        ],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}

export const fetchAllInfo = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from infoTemp;',
        [],
        (tx, result) => {
          resolve(result)
        },
        (tx, err) => {
          reject(err)
        }
      )
    })
  })
  return promise
}
