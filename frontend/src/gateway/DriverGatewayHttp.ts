import axios from "axios";
import DriverGateway from "./DriverGateway";

export default class DriverGatewayHttp implements DriverGateway {
  async save (driver: any) {
    const response = await axios.post("http://localhost:3000/driver", driver);
    return response.data;
  }
}