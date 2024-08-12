import DriverGateway, { CreateDriverInput } from "./DriverGateway";
import HttpClient from "../http/HttpClient";
import Driver from "../../domain/Driver";

export default class DriverGatewayHttp implements DriverGateway {
    constructor(readonly httpClient: HttpClient) {}

    async create(driver: Driver): Promise<string> {
        const input: CreateDriverInput = {
            name: driver.name.getValue(),
            email: driver.email.getValue(),
            document: driver.document.getValue(),
						carPlate: driver.carPlate.getValue()
        };

        try {
					const response = await this.httpClient.post("http://localhost:3000/driver", input);
					const driverId = response.data.driver_id.toString();
					return driverId;
			} catch (error:any) {
					if (error) {
							console.log("Requisição cancelada:", error.message);
					} else if (error.response) {
							console.log("Erro na resposta:", error.response.data);
					} else if (error.request) {
							console.log("Erro na requisição:", error.request);
					} else {
							console.log("Erro desconhecido:", error.message);
					}
					throw error;
			}
    }
}
