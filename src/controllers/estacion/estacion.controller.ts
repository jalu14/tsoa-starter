import { Controller, Get, Res, Route, TsoaResponse } from "@tsoa/runtime";
import { EstacionService } from './../../core/services/estacion.service';


@Route('estaciones')
export class EstacionesController extends Controller {

    @Get()
    public async get(
        @Res() errorResponse: TsoaResponse<500, { reason: string }>
    ) {
        let { data, error } = await EstacionService.getAll();
        
        if (error) {
            return errorResponse(500, {reason: 'server-error'});
        }

        return data;
    }
}