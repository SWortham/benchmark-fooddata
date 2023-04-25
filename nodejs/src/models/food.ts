export interface Food {
  foodClass: string;
  description: string;
  foodNutrients: FoodNutrient[];
  nutrientConversionFactors: NutrientConversionFactor[];
  isHistoricalReference: boolean;
  ndbNumber: number;
  dataType: string;
  foodCategory: FoodCategory;
  fdcId: number;
  foodPortions: FoodPortion[];
  publicationDate: Date;
  inputFoods: InputFood[];  
}

export interface FoodNutrient {
  type: string;
  id: number;
  nutrient: Nutrient;
  dataPoints: number;
  foodNutrientDerivation: FoodNutrientDerivation;
  median: number;
  amount: number;
}

export interface Nutrient {
  id: number;
  number: string;
  name: string;
  rank: number;
  unitName: string;
}

export interface FoodNutrientDerivation {
  code: string;
  description: string;
  foodNutrientSource: FoodNutrientSource;
}

export interface FoodNutrientSource {
  id: number;
  code: string;
  description: string;
}

export interface NutrientConversionFactor {
  type: string;
  proteinValue: number | undefined;
  fatValue: number | undefined;
  carbohydrateValue: number | undefined;
  value: number | undefined;
}

export interface FoodCategory {
  description: string;
}

export interface FoodPortion {
  id: number;
  value: number;
  measureUnit: MeasureUnit;
  modifier: string;
  gramWeight: number;
  sequenceNumber: number;
  minYearAcquired: number;
  amount: number;
}

export interface MeasureUnit {
  id: number;
  name: string;
  abbreviation: string;
}

export interface InputFood {
  id: number;
  foodDescription: string;
}