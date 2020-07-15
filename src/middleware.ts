export function expressAuthentication(req: any, securityName: string, perms?: string[]): Promise<any> {
    let token: string = req.body.token || req.query.token || req.headers['authorization'];
    return new Promise((res, rej) => {
        if (!token) rej({ res: 'No auth provided' });
        res();
    });

}