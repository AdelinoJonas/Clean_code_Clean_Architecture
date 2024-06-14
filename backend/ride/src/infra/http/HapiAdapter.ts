import HttpServer from "./HttpServer";
import Hapi from "@hapi/hapi";

export default class HapiAdapter implements HttpServer{
  server: Hapi.Server;
  
  constructor () {
    this.server = new Hapi.Server({});
  }
  on(method: any, url: string, callback: Function): void {
    this.server.route({
      method,
      path: url.replace(/\:/g, ""),
      handler: async function (request: any, reply: any) {
        try {
          const output = await callback(request.params, request.payload);
          return output;
        } catch (e:any) {
          return reply.response(e.message).code(422);
        } 
      }    
    })
  };
  listen(port: number): void{
    this.server.settings.port = port, () => {
      console.log(`Servidor ouvindo na porta http://localhost:${port}/`);
    };
    this.server.start();
  }
}

// import HttpServer from "./HttpServer";
// import Hapi from "@hapi/hapi";

// export default class ExpressAdapter implements HttpServer {
//   server: Hapi.Server;
  
//   constructor () {
//     this.server = new Hapi.Server({});
//   }
  
//   on(method: any, url: string, callback: Function): void {
//     this.server.route({
//       method,
//       path: url,
//       handler: async function (request: Hapi.Request, h: Hapi.ResponseToolkit) {
//         try {
//           const output = await callback(request.params, request.payload);
//           return output;
//         } catch (e:any) {
//           return h.response(e.message).code(422);
//         } 
//       }    
//     })
//   };
  
//   listen(port: number): void {
//     this.server.start().then(() => {
//       console.log(`Servidor ouvindo na porta http://localhost:${port}/`);
//     }).catch((err) => {
//       console.error('Erro ao iniciar o servidor:', err);
//     });
//   }
// }