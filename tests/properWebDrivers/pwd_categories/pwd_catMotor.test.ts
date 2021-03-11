import { ITitleLinkPair } from "./helperCategories";
import { TestSubcategory } from "./pwd_catTemplate";

// Starting URL
const rootURL: string = process.env.CATEGORY_MOTOR;

// Subcategory titles and their part of URL
const motorTitleLinkPairs: ITitleLinkPair[] = [
    { title: "Biltester", link: "biltester"},
    { title: "Klassiske biler", link: "klassiske-biler"},
    { title: "Nyheter", link: "nyheter"},
    { title: "Båt", link: "bat"},
    { title: "Reportasjer", link: "reportasjer"},
    { title: "Gadgets", link: "gadgets"},
    { title: "Design og teknikk", link: "design-og-teknikk"},  
    { title: "Bilkalkulator (betalt innhold)", link: "autolease"}
];

TestSubcategory(rootURL, motorTitleLinkPairs, "Motor", "motor", 8);