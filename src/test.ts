type classification = {
  name: string
  nameChi: string
  id: number
}

type building = {
  name: string
  nameChi: string
  id: number
  classifications?: classification[]
}

type housing = {
  name: string
  nameChi: string
  id: number
  buildings?: building[]
}

// classification

const cPrivateEstates: classification = {
  name: "Private_Estates",
  nameChi: "私人屋苑",
  id: 0
}

const cPRHEstates: classification = {
  name: "PRH_Estates",
  nameChi: "公共租住房屋",
  id: 1
}

const cSingleBlockBuilding = {
  name: "Single_Block_Building",
  nameChi: "單幢式樓宇",
  id: 2
}

const c3_NilBuildings: classification = {
  name: "3-nil_buildings",
  nameChi: "三無大廈",
  id: 3
}

const cRuralVillage: classification = {
  name: "Rural_Village",
  nameChi: "鄉村",
  id: 4
}

// building

const bHousingEstate: building = {
  name: "Housing_Estate",
  nameChi: "屋苑",
  id: 0
}

const bHousingEstatesVillas: building = {
  name: "Housing_Estates_Villas",
  nameChi: "屋苑 (別墅式)",
  id: 1
}

const bSingleBlockBuilding: building = {
  name: "Single_Block_Building",
  nameChi: "單幢式樓宇",
  id: 2
}

const bVillageHouse: building = {
  name: "Village_House",
  nameChi: "村屋",
  id: 3
}

// housing

const hPrivateHousing: housing = {
  name: "Private_housing",
  nameChi: "私人樓宇",
  id: 0
}

const hHomeOwnershipScheme: housing = {
  name: "Home_ownership_scheme",
  nameChi: "居者有其屋計劃",
  id: 1
}

const hSandwichClassHousingScheme: housing = {
  name: "Sandwich_class_housing_scheme",
  nameChi: "夾心階層住屋計劃",
  id: 2
}

const hTenantsPurchaseScheme: housing = {
  name: "Tenants_Purchase_scheme",
  nameChi: "租者置其屋計劃",
  id: 3
}

const hGovernmentQuarters: housing = {
  name: "Government_quarters",
  nameChi: "政府宿舍",
  id: 4
}

const hUniversityQuarters: housing = {
  name: "University_quarters",
  nameChi: "大學宿舍",
  id: 5
}

const hPRHUnderHKHA: housing = {
  name: "PRH_under_HKHA",
  nameChi: "房屋委員會轄下公共租住房屋",
  id: 6
}

const hPRHUnderHKHS: housing = {
  name: "PRH_under_HKHS",
  nameChi: "房屋協會轄下公共租住房屋",
  id: 7
}

const hRuralVillage: housing = {
  name: "Rural_Village",
  nameChi: "鄉村 (已登記原居鄉村)",
  id: 8
}

const hOthers: housing = {
  name: "Others",
  nameChi: "其他 (原居鄉村以外鄉村或其他)",
  id: 9
}

//

const housingList: housing[] = [
  {
    ...hPrivateHousing,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [
          c3_NilBuildings,
          cPrivateEstates
        ]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [
          cPrivateEstates,
          c3_NilBuildings
        ]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [
          cSingleBlockBuilding,
          c3_NilBuildings
        ]
      },
      {
        ...bVillageHouse,
        classifications: [
          cPrivateEstates
        ]
      }
    ]
  },
  {
    ...hTenantsPurchaseScheme,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [
          cPRHEstates,
          cPrivateEstates,
          cSingleBlockBuilding
        ]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [
          cPrivateEstates,
          cPRHEstates
        ]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [
          cSingleBlockBuilding
        ]
      }
    ]
  },
  {
    ...hHomeOwnershipScheme,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [cPrivateEstates]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [cPrivateEstates]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [cSingleBlockBuilding]
      }
    ]
  },
  {
    ...hPRHUnderHKHA,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [cPRHEstates]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [cPRHEstates]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [cPRHEstates]
      }
    ]
  },
  {
    ...hGovernmentQuarters,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [cPrivateEstates]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [cPrivateEstates]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [cSingleBlockBuilding]
      }
    ]
  },
  {
    ...hSandwichClassHousingScheme,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [cPrivateEstates]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [cPrivateEstates]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [cSingleBlockBuilding]
      }
    ]
  },
  {
    ...hPRHUnderHKHS,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [cPRHEstates]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [cPRHEstates]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [cPRHEstates]
      }
    ]
  },
  {
    ...hUniversityQuarters,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [
          cPrivateEstates,
          cSingleBlockBuilding
        ]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [cPrivateEstates]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [cSingleBlockBuilding]
      }
    ]
  },
  {
    ...hRuralVillage,
    buildings: [
      {
        ...bVillageHouse,
        classifications: [cRuralVillage]  
      }
    ]
  },
  {
    ...hOthers,
    buildings: [
      {
        ...bHousingEstate,
        classifications: [
          c3_NilBuildings,
          cSingleBlockBuilding,
          cPrivateEstates
        ]
      },
      {
        ...bHousingEstatesVillas,
        classifications: [
          cPrivateEstates
        ]
      },
      {
        ...bSingleBlockBuilding,
        classifications: [
          cSingleBlockBuilding
        ]
      },
      {
        ...bVillageHouse,
        classifications: [
          cPrivateEstates,
          c3_NilBuildings,
          cSingleBlockBuilding
        ]
      }
    ] 
  }
]

// console.log(housingList)

let selectedHouse = housingList.filter(item => 
  item.id == 0
)[0]

console.log(selectedHouse.buildings)

import * as fs from 'fs'
let data = JSON.stringify(housingList)

fs.writeFileSync('housing_list.json', data)
