package main

type FoundationFoods struct {
	FoundationFoods []Food `json:"FoundationFoods"`
}
type Nutrient struct {
	ID       int    `json:"id"`
	Number   string `json:"number"`
	Name     string `json:"name"`
	Rank     int    `json:"rank"`
	UnitName string `json:"unitName"`
}
type FoodNutrientSource struct {
	ID          int    `json:"id"`
	Code        string `json:"code"`
	Description string `json:"description"`
}
type FoodNutrientDerivation struct {
	Code               string             `json:"code"`
	Description        string             `json:"description"`
	FoodNutrientSource FoodNutrientSource `json:"foodNutrientSource"`
}
type FoodNutrients struct {
	Type                   string                 `json:"type"`
	ID                     int                    `json:"id"`
	Nutrient               Nutrient               `json:"nutrient"`
	DataPoints             int                    `json:"dataPoints,omitempty"`
	FoodNutrientDerivation FoodNutrientDerivation `json:"foodNutrientDerivation"`
	Median                 float64                `json:"median,omitempty"`
	Amount                 float64                `json:"amount"`
	Max                    float64                `json:"max,omitempty"`
	Min                    float64                `json:"min,omitempty"`
}
type NutrientConversionFactors struct {
	Type              string  `json:"type"`
	ProteinValue      float64 `json:"proteinValue,omitempty"`
	FatValue          float64 `json:"fatValue,omitempty"`
	CarbohydrateValue float64 `json:"carbohydrateValue,omitempty"`
	Value             float64 `json:"value,omitempty"`
}
type MeasureUnit struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
}
type FoodPortions struct {
	ID              int         `json:"id"`
	Value           float64     `json:"value"`
	MeasureUnit     MeasureUnit `json:"measureUnit"`
	Modifier        string      `json:"modifier"`
	GramWeight      float64     `json:"gramWeight"`
	SequenceNumber  int         `json:"sequenceNumber"`
	MinYearAcquired int         `json:"minYearAcquired"`
	Amount          float64     `json:"amount"`
}
type FoodCategory struct {
	ID          int    `json:"id"`
	Code        string `json:"code"`
	Description string `json:"description"`
}
type InputFood struct {
	FoodClass       string       `json:"foodClass"`
	Description     string       `json:"description"`
	DataType        string       `json:"dataType"`
	FoodCategory    FoodCategory `json:"foodCategory"`
	FdcID           int          `json:"fdcId"`
	PublicationDate string       `json:"publicationDate"`
}
type InputFoods struct {
	ID              int       `json:"id"`
	FoodDescription string    `json:"foodDescription"`
	InputFood       InputFood `json:"inputFood"`
}
type Food struct {
	FoodClass                 string                      `json:"foodClass"`
	Description               string                      `json:"description"`
	FoodNutrients             []FoodNutrients             `json:"foodNutrients"`
	FoodAttributes            []any                       `json:"foodAttributes"`
	NutrientConversionFactors []NutrientConversionFactors `json:"nutrientConversionFactors"`
	IsHistoricalReference     bool                        `json:"isHistoricalReference"`
	NdbNumber                 int                         `json:"ndbNumber"`
	DataType                  string                      `json:"dataType"`
	FoodCategory              FoodCategory                `json:"foodCategory"`
	FdcID                     int                         `json:"fdcId"`
	FoodPortions              []FoodPortions              `json:"foodPortions"`
	PublicationDate           string                      `json:"publicationDate"`
	InputFoods                []InputFoods                `json:"inputFoods"`
	ScientificName            string                      `json:"scientificName,omitempty"`
}