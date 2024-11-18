import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import Feature from "ol/Feature";
import Geolocation from "ol/Geolocation";
import Geometry from "ol/geom/Geometry";
import Point from "ol/geom/Point";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Map from "ol/Map";
import { transform } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Fill, Icon, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import View from "ol/View";

@Component({
    selector: "app-mapa-component",
    templateUrl: "./mapa.component.html",
    styleUrls: ["./mapa.component.scss"],
})
export class MapaComponent implements OnInit {
    map: Map;
    @Output() definirCoordenadasEventEmitter = new EventEmitter<any>();
    @Output() cancelarEventEmitter = new EventEmitter<any>();
    zoomAtualMapa: number;
    markerPosicaoImovel: SVShapeNoMapa;
    svMarker: SVMarker;
    movendoMapa: boolean = false;

    ngOnInit(): void {
        this.prepararMapa();
    }

    prepararMapa() {
        const view = new View({
            center: [0, 0],
            zoom: 12,
        });
        this.map = new Map({
            view,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: "ol-map",
            controls: [],
        });
        const geolocation = new Geolocation({
            trackingOptions: {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: Infinity,
            },
            projection: view.getProjection(),
        });

        geolocation.on("error", function (error) {
            console.log("Não foi possível obter a geolocalização: " + error.message);
        });

        const accuracyFeature = new Feature();

        const positionFeature = new Feature();

        const vectorLayer = new VectorLayer();
        const vectorSource = new VectorSource({
            features: [accuracyFeature, positionFeature],
        });
        vectorLayer.setSource(vectorSource);
        vectorLayer.setMap(this.map);
        vectorLayer.once("change", () => {
            this.map.setView(
                new View({
                    center: geolocation.getPosition(),
                    zoom: 15,
                })
            );
        });
        geolocation.setTracking(true);

        this.map.on("moveend", (evento) => {
            console.log("moveend", evento);
            this.movendoMapa = false;
            if (this.map.getView().getZoom() != this.zoomAtualMapa) {
                this.markerPosicaoImovel = this.exibirSVMarkerNoMapa(this.svMarker);
                return;
            }
            const coordinates = this.map.getView().getCenter();
            positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
            this.svMarker = {
                options: {},
                latLong: { latitude: coordinates[1], longitude: coordinates[0] },
            } as SVMarker;
            this.markerPosicaoImovel = this.exibirSVMarkerNoMapa(this.svMarker);
        });
        this.map.on("movestart", (evento) => {
            this.movendoMapa = true;
            this.removerItemDoMapa(this.markerPosicaoImovel);
            this.zoomAtualMapa = this.map.getView().getZoom();
        });

        this.map.setView(
            new View({
                center: [0, 0],
                zoom: 15,
            })
        );
    }

    adicionarEventoDeMovimento(
        geolocation: Geolocation,
        accuracyFeature: Feature<Geometry>,
        positionFeature: Feature<Geometry>
    ) {
        geolocation.on("change", function () {
            console.log("Geolocation changed", geolocation);
        });
        geolocation.on("change:accuracyGeometry", function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });
        geolocation.on("change:position", function () {
            const coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        });
    }

    definirCoordenadas() {
        try {
            const coordenadasConvertidas = transform(this.map.getView().getCenter(), "EPSG:3857", "EPSG:4326");
            const coordenadasFinal = {
                latitude: coordenadasConvertidas[1],
                longitude: coordenadasConvertidas[0],
            };
            console.log("definirCoordenadas", coordenadasFinal);
            this.definirCoordenadasEventEmitter.emit(coordenadasFinal);
        } catch (error) {
            console.log("Erro ao definir coordenadas", error);
        }
    }

    cancelar() {
        this.cancelarEventEmitter.emit();
    }

    private exibirSVMarkerNoMapa(svMarker: SVMarker): SVShapeNoMapa {
        let marker: Feature<Geometry>;
        let vectorSourceMarker: VectorSource;
        if (svMarker.latLong.latitude) {
            const image = new Icon({
                anchor: [0.5, 1],
                anchorXUnits: "fraction",
                anchorYUnits: "fraction",
                opacity: 1,
                src: "/assets/icons/marker.svg",
                color: "#ff0d0d",
            });
            const iconStyle = new Style({
                image,
            });
            marker = new Feature({
                type: "icon",
                geometry: new Point([svMarker.latLong.longitude, svMarker.latLong.latitude]),
                svItem: svMarker,
                innerHtml: svMarker.infoWindowData ? svMarker.infoWindowData.html : null,
            });

            marker.setStyle(iconStyle);

            vectorSourceMarker = new VectorSource({
                features: [marker],
            });

            const vectorLayerMarker = new VectorLayer({
                source: vectorSourceMarker,
                zIndex: svMarker.options.zIndex,
            });

            this.map.addLayer(vectorLayerMarker);

            if (svMarker.options.focusIn) {
                this.map
                    .getView()
                    .setCenter(
                        transform([svMarker.latLong.longitude, svMarker.latLong.latitude], "EPSG:4326", "EPSG:3857")
                    );
            }
        }
        return { shape: vectorSourceMarker, label: undefined, type: "marker", centro: undefined };
    }

    definirEstiloDoMarker(positionFeature: Feature<Geometry>) {
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: "#3399CC",
                    }),
                    stroke: new Stroke({
                        color: "#fff",
                        width: 2,
                    }),
                }),
            })
        );
    }

    public removerItemDoMapa(svShapeNoMapa: SVShapeNoMapa) {
        console.log("removerItemDoMapa", svShapeNoMapa);
        if (!svShapeNoMapa) {
            return;
        }
        try {
            svShapeNoMapa.shape.clear();
        } catch (error) {}
        try {
            svShapeNoMapa.shape.getSource().clear();
        } catch (error) {}
    }
}

export interface SVShapeNoMapa {
    shape: any;
    centro: any;
    label: any;
    type: string;
}

export enum SVShapeType {
    POLYGON = "POLYGON",
    CIRCLE = "CIRCLE",
    MARKER = "MARKER",
    HEATMAP = "HEATMAP",
}

export interface SVShape {
    id: number;
    options: SVOptions;
    type: SVShapeType;
}

export interface SVMarker extends SVShape {
    data: any;
    infoWindowData?: { html: any; data: any };
    weight?: number;
    options: SVMarkerOptions;
    latLong: SVLatLong;
}

export interface SVOptions {
    visible: boolean;
    focusIn: boolean;
    editable: boolean;
    zIndex: number;
}

export interface SVMarkerOptions extends SVOptions {
    focusIn: boolean;
    fillColor: string;
    editable: boolean;
    weight: number;
}

export interface SVLatLong {
    latitude: number;
    longitude: number;
}
