from dataclasses import dataclass

@dataclass
class FoodNutrientSource:
  id: int
  code: str
  description: str

@dataclass
class FoodNutrientDerivation:
  code: str
  description: str
  foodNutrientSource: FoodNutrientSource

@dataclass
class Nutrient:
  id: int
  number: str
  name: str
  rank: int
  UnitName: str

@dataclass
class FoodNutrients:
  type: str
  id: int
  nutrient: Nutrient
  dataPoints: int
  foodNutrientDerivation: FoodNutrientDerivation
  median: float
  amount: float
  max: float
  min: float
  
@dataclass
class NutrientConversionFactors:
  type: str
  proteinValue: float
  fatValue: float
  carbohydrateValue: float
  value: float  
  
@dataclass
class FoodCategory:
  id: int
  code: str
  description: str  
  
@dataclass
class MeasureUnit:
  id: int
  name: str
  abbreviation: str  

@dataclass
class FoodPortions:
  id: int
  value: float
  measureUnit: MeasureUnit
  modifier: str
  gramWeight: float
  sequenceNumber: int
  minYearAcquired: int
  amount: float


@dataclass
class InputFood:
  foodClass: str
  description: str
  dataType: str
  foodCategory: FoodCategory
  fdcId: int
  publicationDate: str  
  
@dataclass
class InputFoods:
  id: int
  foodDescription: str
  inputFood: InputFood  

@dataclass
class Food:
  foodClass: str
  description: str
  foodNutrients: list[FoodNutrients]
  foodAttributes: list[any]
  nutrientConversionFactors: list[NutrientConversionFactors]
  isHistoricalReference: bool
  ndbNumber: int
  dataType: str
  foodCategory: FoodCategory
  fdcId: int
  foodPortions: list[FoodPortions]
  publicationDate: str
  inputFoods: list[InputFoods]
  scientificName: str

@dataclass
class FoundationFoods:
  FoundationFoods: list[Food]














