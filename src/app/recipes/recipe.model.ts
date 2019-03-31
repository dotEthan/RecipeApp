import { NamedItem } from '../shared/namedItem.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: { title: string, item: NamedItem[] }[];
    public directions: { title: string, item: NamedItem[] }[];
    public url: string;
    public keyword: string;
    public tags: string[];

    constructor(name: string, desc: string, imagePath: string, ingredients: { title: string, item: NamedItem[] }[], directions: { title: string, item: NamedItem[] }[], url: string, keyword: string, tags: string[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.directions = directions;
        this.url = url;
        this.keyword = keyword;
        this.tags = tags;
    }
}