import mysql from "mysql2/promise";

const sslCACertBase64 = process.env.MYSQL_CA_CERT;
const decodedCACert = Buffer.from(sslCACertBase64, 'base64');
const caCert = decodedCACert.toString('utf-8');

export async function query({ query, values = [] }) {
  // PlanetScale;
  const dbconnection = await mysql.createConnection(
    process.env.MYSQL_DATABASE_URL,
    {
      ssl: {
        ca: caCert
      }
    }
  );

  //local
  // const dbconnection = await mysql.createConnection({
  //   host: process.env.MYSQL_HOST,
  //   database: process.env.MYSQL_DATABASE,
  //   user: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  // });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}