public class FoundationFoods
{
  public Food[] FoundationFoods { get; set; }
}

public class Food
{
  public string foodClass { get; set; }
  public string description { get; set; }
  public FoodNutrient[] foodNutrients { get; set; }
  public NutrientConversionFactor[] nutrientConversionFactors { get; set; }
  public boolean isHistoricalReference { get; set; }
  public int ndbNumber { get; set; }
  public string dataType { get; set; }
  public FoodCategory foodCategory { get; set; }
  public int fdcId { get; set; }
  public FoodPortion[] foodPortions { get; set; }
  public Date publicationDate { get; set; }
  public InputFood[] inputFoods { get; set; }
  public string scientificName { get; set; }
}

public class FoodNutrient
{
  public string type { get; set; }
  public int id { get; set; }
  public Nutrient nutrient { get; set; }
  public int dataPoints { get; set; }
  public FoodNutrientDerivation foodNutrientDerivation { get; set; }
  public float median { get; set; }
  public float amount { get; set; }
  public float max { get; set; }
  public float min { get; set; }
}

public class Nutrient
{
  public int id { get; set; }
  public string number { get; set; }
  public string name { get; set; }
  public int rank { get; set; }
  public string unitName { get; set; }
}

public class FoodNutrientDerivation
{
  public string code { get; set; }
  public string description { get; set; }
  public FoodNutrientSource foodNutrientSource { get; set; }
}

public class FoodNutrientSource
{
  public int id { get; set; }
  public string code { get; set; }
  public string description { get; set; }
}

public class NutrientConversionFactor
{
  public string type { get; set; }
  public float? proteinValue { get; set; }
  public float? fatValue { get; set; }
  public float? carbohydrateValue { get; set; }
  public float? value { get; set; }
}

public class FoodCategory
{
  public string description { get; set; }
}

public class FoodPortion
{
  public int id { get; set; }
  public float value { get; set; }
  public MeasureUnit measureUnit { get; set; }
  public string modifier { get; set; }
  public float gramWeight { get; set; }
  public int sequenceNumber { get; set; }
  public int minYearAcquired { get; set; }
  public float amount { get; set; }
}

public class MeasureUnit
{
  public int id { get; set; }
  public string name { get; set; }
  public string abbreviation { get; set; }
}

public class InputFood
{
  public int id { get; set; }
  public string foodDescription { get; set; }
}