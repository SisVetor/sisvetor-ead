// tslint:disable
import { APP_BASE_HREF } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideMockStore } from "@ngrx/store/testing";

import { ListarCursoComponent } from "./listar.component";

describe("ListarComponent", () => {
    let fixture;
    let component;
    const initialState = {};
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ListarCursoComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                { provide: APP_BASE_HREF, useValue: "/" },
                provideMockStore({
                    initialState,
                }),
            ],
        })
            .overrideComponent(ListarCursoComponent, {})
            .compileComponents();
        fixture = TestBed.createComponent(ListarCursoComponent);
        component = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
        component.ngOnDestroy = function () {};
        fixture.destroy();
    });

    it("should run #constructor()", async () => {
        expect(component).toBeTruthy();
    });

    it("should run #ngOnInit()", async () => {
        spyOn(component, "carregarTabela");
        component.ngOnInit();
        expect(component.carregarTabela).toHaveBeenCalled();
    });

    it("should run #carregarTabela()", async () => {
        component.store = component.store || {};
        spyOn(component.store, "select");
        spyOn(component, "listarLocalmente");
        component.carregarTabela();
        expect(component.store.select).toHaveBeenCalled();
        expect(component.listarLocalmente).toHaveBeenCalled();
    });

    it("should run #atualizarListaAtividades()", async () => {
        spyOn(component, "listarNuvem");
        spyOn(component, "listarLocalmente");
        component.atualizarListaAtividades();
        expect(component.listarNuvem).toHaveBeenCalled();
        expect(component.listarLocalmente).toHaveBeenCalled();
    });

    it("should run #listarNuvem()", async () => {
        component.store = component.store || {};
        spyOn(component.store, "dispatch");
        component.listarNuvem();
        expect(component.store.dispatch).toHaveBeenCalled();
    });

    it("should run #listarLocalmente()", async () => {
        component.store = component.store || {};
        spyOn(component.store, "dispatch");
        component.listarLocalmente();
        expect(component.store.dispatch).toHaveBeenCalled();
    });

    it("should run #selecionarItem()", async () => {
        component.itemSelecionadoEmitter = component.itemSelecionadoEmitter || {};
        spyOn(component.itemSelecionadoEmitter, "emit");
        component.selecionarItem({});
        expect(component.itemSelecionadoEmitter.emit).toHaveBeenCalled();
    });

    it("should run #formatarData()", async () => {
        component.formatarData("data");
    });
});
