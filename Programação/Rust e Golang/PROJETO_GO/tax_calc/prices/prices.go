package prices

import (
	"fmt"

	"example.com/tax_calc/conversion"
	"example.com/tax_calc/filemanager"
)

type TaxIncludedPriceJob struct {
	IOManager        filemanager.FileManager
	TaxRate          float64
	InputPrice       []float64
	TaxIncludedPrice map[string]string
}

func (job *TaxIncludedPriceJob) LoadData() {

	lines, err := job.IOManager.ReadLines()

	if err != nil {
		fmt.Println(err)
		return
	}

	prices, err := conversion.StringsToFloats(lines)

	if err != nil {
		fmt.Println(err)
		return
	}

	job.InputPrice = prices
}

func (job *TaxIncludedPriceJob) Process() {
	job.LoadData()

	result := make(map[string]string)

	for _, price := range job.InputPrice {
		taxIncludedPrice := price * (1 + job.TaxRate)
		result[fmt.Sprintf("%.2f", price)] = fmt.Sprintf("%.2f", taxIncludedPrice)
	}

	job.TaxIncludedPrice = result
	job.IOManager.WriteResult(job)
}

func NewTaxIncludedPriceJob(fm filemanager.FileManager, taxRate float64) *TaxIncludedPriceJob {
	return &TaxIncludedPriceJob{
		IOManager: fm,
		InputPrice: []float64{10, 20, 30, 45},
		TaxRate:    taxRate,
	}
}
