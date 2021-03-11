import { ITitleLinkPair } from "./helperCategories";
import { TestSubcategory } from "./pwd_catTemplate";

// Starting URL
const rootURL: string = process.env.CATEGORY_LORDAG;

// Subcategory titles and their part of URL
const lordagTitleLinkPairs: ITitleLinkPair[] = [
    { title: "Gründerintervjuet", link: "grunderintervjuet"},
    { title: "Profil", link: "profil"},
    { title: "Reportasje", link: "reportasje"},
    { title: "Ukens selskap", link: "ukens-selskap"},
    { title: "Bokanmeldelser", link: "bokanmeldelser"},
];

TestSubcategory(rootURL, lordagTitleLinkPairs, "Lørdag", "lordag", 5);