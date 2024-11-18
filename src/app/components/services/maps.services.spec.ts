import { MapasService } from "./mapas.service";

describe("MapasService", () => {
    let service: MapasService;

    beforeEach(() => {
        service = new MapasService({ open: () => {} } as any, { open: () => {} } as any);
    });

    it("Deve executar #pegarPosicaoAtualPromisse()", async (done) => {
        service.pegarPosicaoAtualPromisse().subscribe(
            (o) => {
                done();
            },
            (error) => {
                done();
            }
        );
    });

    it("Deve executar #pegarPosicaoAtual()", async (done) => {
        spyOn(service.dialog, "open").and.returnValue({
            close: function () {},
        } as any);
        spyOn(service, "abrirSnackBar");
        service.pegarPosicaoAtual().subscribe(
            (o) => {
                done();
            },
            (error) => {
                expect(service.abrirSnackBar).toHaveBeenCalled();
                done();
            }
        );
    });

    it("Deve executar #abrirSnackBar()", async () => {
        spyOn(service.snackBar, "open");
        service.abrirSnackBar({} as any, {} as any, {} as any);
        expect(service.snackBar.open).toHaveBeenCalled();
    });
});
