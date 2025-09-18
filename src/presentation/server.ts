import express,{Router} from 'express'
import path from 'path';
import cors from 'cors'; // Importar CORS

interface Options {
     port: number;
     routes: Router;
     publicPath?: string;
}

export class Server {
     

     public readonly app = express();
     private serverListener?: any;
     private readonly port: number;
     private readonly publicPath: string;
     private readonly routes: Router;

     constructor(options: Options){
          const {port,routes,publicPath='public'} = options;
          this.port = port;
          this.publicPath = publicPath;
          this.routes = routes;
     }
     
     async start(){
          this.app.use(cors({
               origin: '*',
               methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Métodos permitidos
               allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
           }));

           //middlewares
           this.app.use(express.json());
           this.app.use( express.urlencoded({extended: true}) );


           //public path
           this.app.use(express.static(this.publicPath))


          // routes 
          this.app.use(this.routes);

          // this.app.get('*',(req,res) => {
          //      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
          //      res.sendFile(indexPath);
          // } )

          this.serverListener = this.app.listen(this.port, () => {
               console.log(` Servidor escuchando en puerto ${this.port}` )
          })

     }

      public close() {
          this.serverListener?.close();
     }


}