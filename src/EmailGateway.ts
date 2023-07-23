import { mail } from "./EmailGatewayConsole";

export default interface EmailGateway {
   send(input: mail): Promise<void>;
}
