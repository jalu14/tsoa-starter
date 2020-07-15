import { Controller, Route, Tags, Get } from "tsoa";

@Route("ping")
@Tags('Ping')
export class PingController extends Controller {
    @Get()
    public async getPing(): Promise<any> {
        return {"message": "pong"}
    }
}