import { Controller, Get, Route } from "@tsoa/runtime";


@Route('estaciones')
export class EstacionesController extends Controller {

    @Get()
    public async get() {
        return 'Hola estaciones';
    }
}