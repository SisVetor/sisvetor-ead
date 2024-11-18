export function Required(target: object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        get() {
            throw new Error(`Atributo @Input() ${propertyKey} é obrigatório`);
        },
        set(value) {
            Object.defineProperty(target, propertyKey, {
                value,
                writable: true,
                configurable: true
            });
        }
    });
}