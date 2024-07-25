import PassengerGateway, { CreatePassengerInput } from "./PassengerGateway";
import HttpClient from "../http/HttpClient";
import Passenger from "../../domain/Passenger";

export default class PassengerGatewayHttp implements PassengerGateway {
    constructor(readonly httpClient: HttpClient) {}

    async create(passenger: Passenger): Promise<string> {
        const input: CreatePassengerInput = {
            name: passenger.name.getValue(),
            email: passenger.email.getValue(),
            document: passenger.document.getValue()
        };

        try {
					const response = await this.httpClient.post("http://localhost:3000/passengers", input);
					const passengerId = response.data.passenger_id.toString();
					console.log("ID", passengerId);
					return passengerId;
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
