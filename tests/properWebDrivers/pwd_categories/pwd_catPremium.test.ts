import { ITitleLinkPair } from "./helperCategories";
import { TestSubcategory } from "./pwd_catTemplate";

// Starting URL
const rootURL:string = process.env.CATEGORY_PREMIUM;

// Subcategory titles and their part of URL
const premiumTitleLinkPairs: ITitleLinkPair[] = [
    { title: "Lunsjguiden", link: "lunsjguiden"},
    { title: "Klokker", link: "klokker"},
    { title: "Sport & Fritid", link: "sport-og-fritid"},
    { title: "Design", link: "design"},
    { title: "Kunst", link: "kunst"},
    { title: "Kultur", link: "kultur"},
    { title: "Mat & drikke", link: "mat-og-drikke"},
    { title: "Vin", link: "vin"},
    { title: "Mote", link: "mote"},
    { title: "Opplevelse", link: "opplevelse"}
];

TestSubcategory(rootURL, premiumTitleLinkPairs, "Premium", "premium", 13);