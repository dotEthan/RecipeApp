import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public directions: string;
    public url: string;

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], directions: string, url: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.directions = directions;
        this.url = url;
    }
}