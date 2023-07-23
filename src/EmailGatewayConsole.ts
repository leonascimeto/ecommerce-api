export type mail = {
   to: string,
   from: string,
   email: string,
   subject: string,
}

export class EmailGatewayConsole {
    async send({email, from, subject, to}: mail) {
        console.log({email, from, subject, to})
    }
}
