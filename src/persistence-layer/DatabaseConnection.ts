import { DataSource, EntityTarget, Repository } from "typeorm";
import Car from "../domain-layer/entities/Car";
import Sales from "../domain-layer/entities/Sales";

export default class DatabaseConnection {
    private static instance: DatabaseConnection;

    private dataSource: DataSource;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'lgja010306mys',
            database: 'car_db',
            entities: [Car, Sales],
            synchronize: true,
        });
    }

    public getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
        return this.dataSource.getRepository(target);
    }

    //Singleton
    public static async getInstance(): Promise<DatabaseConnection> {
        if(!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            await DatabaseConnection.instance.waitForInitialized();
        }
        return DatabaseConnection.instance;
    }

    private async waitForInitialized(): Promise<void> {
        await this.dataSource.initialize();
    }
}