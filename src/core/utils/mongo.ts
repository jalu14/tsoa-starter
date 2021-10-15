import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI || typeof MONGODB_URI !== 'string') {
    throw new Error(
        'Please define the MONGODB_URI environment variable'
    );
}

if (!MONGODB_DB || typeof MONGODB_DB !== 'string') {
    throw new Error(
        'Please define the MONGODB_DB environment variable'
    );
}

const cached: any = { conn: null, promise: null };

export async function connectToDatabase(): Promise<any> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // @ts-ignore
        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB),
            };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}