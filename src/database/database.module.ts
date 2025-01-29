import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import * as dotenv from 'dotenv';
dotenv.config({ path: ".env" });


@Global()
@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI || "", {
            onConnectionCreate: (connection: Connection) => {
                connection.on('connected', () => console.log('MongoDB connected'));
                connection.on('disconnected', () => console.log('MongoDB disconnected'));            
                return connection;
              },
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }
