import DriverGateway from "./DriverGateway";
import HttpClient from "../http/HttpClient";
import Driver from "../../domain/Driver";

export default class DriverGatewayHttp implements DriverGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async save (driver: Driver) {
		const driverData = await this.httpClient.post("http://localhost:3000/driver", driver);
		console.log('GATEWAY', driverData.data.driver_id[0]);
		return driverData.data.driver_id[0];
	}
}