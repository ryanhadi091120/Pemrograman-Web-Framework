import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { QueryResult, QueryConfig } from 'https://deno.land/x/postgres/query.ts';

const client = new Client({
    hostname : "localhost",
    port : 5432,
    user : "postgres",
    password : "123ryan890",
    database : "db_blog"
});

export async function select(qry : QueryConfig | QueryConfig[]):Promise<any[]> {
    await client.connect();
    let tables : any = [];
    let hasil : QueryResult | QueryResult[];
    if(Array.isArray(qry)){
        hasil = await client.multiQuery(qry);
        hasil.forEach((object) => {
            tables.push(object.rowsOfObjects() );
        });
    } else {
        hasil = await client.query(qry);
        tables = hasil.rowsOfObjects();
    }
    await client.end();
    return  tables;
}

export async function insert(qry:QueryConfig):Promise<any[]> {
    let tables : any = [];
    try {
        await client.connect();
        let hasil : QueryResult = await client.query(qry);
        await client.end();
        tables[0] = 'Sukses';
        tables[1] = 'Jumlah Baris yang Tersimpan '+hasil.rowCount;
    } catch (error) {
        tables[0] = 'Gagal';
        tables[1] = `${error}`;
    }
    return  tables;
}