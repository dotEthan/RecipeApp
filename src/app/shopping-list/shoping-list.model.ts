import { NamedItem } from '../shared/namedItem.model';

export class ShoppingList {
    public title: string;
    public ingredients: NamedItem[];
    public isDefault: boolean;

    constructor(title: string, ingredients: NamedItem[], isDefault: boolean) {
        this.title = title;
        this.ingredients = ingredients;
        this.isDefault = isDefault;
    }
}