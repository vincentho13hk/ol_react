"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// classification
var cPrivateEstates = {
    name: "Private_Estates",
    nameChi: "私人屋苑",
    id: 0
};
var cPRHEstates = {
    name: "PRH_Estates",
    nameChi: "公共租住房屋",
    id: 1
};
var cSingleBlockBuilding = {
    name: "Single_Block_Building",
    nameChi: "單幢式樓宇",
    id: 2
};
var c3_NilBuildings = {
    name: "3-nil_buildings",
    nameChi: "三無大廈",
    id: 3
};
var cRuralVillage = {
    name: "Rural_Village",
    nameChi: "鄉村",
    id: 4
};
// building
var bHousingEstate = {
    name: "Housing_Estate",
    nameChi: "屋苑",
    id: 0
};
var bHousingEstatesVillas = {
    name: "Housing_Estates_Villas",
    nameChi: "屋苑 (別墅式)",
    id: 1
};
var bSingleBlockBuilding = {
    name: "Single_Block_Building",
    nameChi: "單幢式樓宇",
    id: 2
};
var bVillageHouse = {
    name: "Village_House",
    nameChi: "村屋",
    id: 3
};
// housing
var hPrivateHousing = {
    name: "Private_housing",
    nameChi: "私人樓宇",
    id: 0
};
var hHomeOwnershipScheme = {
    name: "Home_ownership_scheme",
    nameChi: "居者有其屋計劃",
    id: 1
};
var hSandwichClassHousingScheme = {
    name: "Sandwich_class_housing_scheme",
    nameChi: "夾心階層住屋計劃",
    id: 2
};
var hTenantsPurchaseScheme = {
    name: "Tenants_Purchase_scheme",
    nameChi: "租者置其屋計劃",
    id: 3
};
var hGovernmentQuarters = {
    name: "Government_quarters",
    nameChi: "政府宿舍",
    id: 4
};
var hUniversityQuarters = {
    name: "University_quarters",
    nameChi: "大學宿舍",
    id: 5
};
var hPRHUnderHKHA = {
    name: "PRH_under_HKHA",
    nameChi: "房屋委員會轄下公共租住房屋",
    id: 6
};
var hPRHUnderHKHS = {
    name: "PRH_under_HKHS",
    nameChi: "房屋協會轄下公共租住房屋",
    id: 7
};
var hRuralVillage = {
    name: "Rural_Village",
    nameChi: "鄉村 (已登記原居鄉村)",
    id: 8
};
var hOthers = {
    name: "Others",
    nameChi: "其他 (原居鄉村以外鄉村或其他)",
    id: 9
};
//
var housingList = [
    __assign(__assign({}, hPrivateHousing), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [
                    c3_NilBuildings,
                    cPrivateEstates
                ] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [
                    cPrivateEstates,
                    c3_NilBuildings
                ] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [
                    cSingleBlockBuilding,
                    c3_NilBuildings
                ] }),
            __assign(__assign({}, bVillageHouse), { classifications: [
                    cPrivateEstates
                ] })
        ] }),
    __assign(__assign({}, hTenantsPurchaseScheme), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [
                    cPRHEstates,
                    cPrivateEstates,
                    cSingleBlockBuilding
                ] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [
                    cPrivateEstates,
                    cPRHEstates
                ] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [
                    cSingleBlockBuilding
                ] })
        ] }),
    __assign(__assign({}, hHomeOwnershipScheme), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [cSingleBlockBuilding] })
        ] }),
    __assign(__assign({}, hPRHUnderHKHA), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [cPRHEstates] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [cPRHEstates] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [cPRHEstates] })
        ] }),
    __assign(__assign({}, hGovernmentQuarters), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [cSingleBlockBuilding] })
        ] }),
    __assign(__assign({}, hSandwichClassHousingScheme), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [cSingleBlockBuilding] })
        ] }),
    __assign(__assign({}, hPRHUnderHKHS), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [cPRHEstates] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [cPRHEstates] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [cPRHEstates] })
        ] }),
    __assign(__assign({}, hUniversityQuarters), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [
                    cPrivateEstates,
                    cSingleBlockBuilding
                ] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [cPrivateEstates] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [cSingleBlockBuilding] })
        ] }),
    __assign(__assign({}, hRuralVillage), { buildings: [
            __assign(__assign({}, bVillageHouse), { classifications: [cRuralVillage] })
        ] }),
    __assign(__assign({}, hOthers), { buildings: [
            __assign(__assign({}, bHousingEstate), { classifications: [
                    c3_NilBuildings,
                    cSingleBlockBuilding,
                    cPrivateEstates
                ] }),
            __assign(__assign({}, bHousingEstatesVillas), { classifications: [
                    cPrivateEstates
                ] }),
            __assign(__assign({}, bSingleBlockBuilding), { classifications: [
                    cSingleBlockBuilding
                ] }),
            __assign(__assign({}, bVillageHouse), { classifications: [
                    cPrivateEstates,
                    c3_NilBuildings,
                    cSingleBlockBuilding
                ] })
        ] })
];
// console.log(housingList)
var selectedHouse = housingList.filter(function (item) {
    return item.id == 0;
})[0];
console.log(selectedHouse.buildings);
var fs = require("fs");
var data = JSON.stringify(housingList);
fs.writeFileSync('housing_list.json', data);
