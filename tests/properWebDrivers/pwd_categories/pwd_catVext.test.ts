import { ITitleLinkPair } from "./helperCategories";
import { TestSubcategory } from "./pwd_catTemplate";

// Starting URL
const rootURL:string = process.env.CATEGORY_VEXT;

// Subcategory titles and their part of URL
const vextTitleLinkPairs: ITitleLinkPair[] = [
    { title: "Gründer", link: "grunder" },
    { title: "Tech", link: "tech" },
    { title: "TV-serie", link: "tv-serie" }
];

TestSubcategory(rootURL, vextTitleLinkPairs, "Vext", "vext", 3);