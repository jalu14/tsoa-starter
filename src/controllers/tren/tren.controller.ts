import { Controller, Get, Route } from "@tsoa/runtime";


@Route('trenes')
export class TrenesController extends Controller {

    @Get()
    public async get() {
        return 'Hola trenes';
    }
}