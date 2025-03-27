package main

import (
	"example.com/tax_calc/prices"
)
func main() {
	taxRates := []float64{0, 0.4, 0.07, 0.15}

	for _, taxRate := range taxRates {
		priceJob := prices.NewTaxIncludedPriceJob(taxRate)
		priceJob.Process()
	}
}