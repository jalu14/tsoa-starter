import { connectToDatabase } from '../utils/mongo';

export class EstacionService {

    static async getAll() {
        try {
            const { db } = await connectToDatabase();
            const estacionList = await db.collection('estaciones').find();
            return { data: estacionList };
        } catch (e) {
            return { error: e };
        }
    }
}