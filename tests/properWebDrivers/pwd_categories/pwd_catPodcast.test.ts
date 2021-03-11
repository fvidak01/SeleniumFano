import { ITitleLinkPair } from "./helperCategories";
import { TestSubcategory } from "./pwd_catTemplate";

// Starting URL
const rootURL:string = process.env.CATEGORY_PODCAST;

// Subcategory titles and their part of URL
const podcastTitleLinkPairs: ITitleLinkPair[] = [
    { title: "Økonominyhetene", link:  "okonominyhetene"},
    { title: "Mil etter mil", link:  "mil-etter-mil"},
    { title: "Morgenkaffen", link: "morgenkaffen"},
    { title: "Oppsummert", link: "oppsummert"},
    { title: "Veien hit", link:  "veien-hit"},
    { title: "Ukens Vin", link:  "ukens-vin"}
];

TestSubcategory(rootURL, podcastTitleLinkPairs, "Podcast", "podcast", 6);