package prices

import (
	"bufio"
	"fmt"
	"os"
	"example.com/tax_calc/conversion"
)

type TaxIncludedPriceJob struct {
	TaxRate          float64
	InputPrice       []float64
	TaxIncludedPrice map[string]float64
}

func (job *TaxIncludedPriceJob) LoadData() {
	file, err := os.Open("prices.txt")

	if err != nil {
		fmt.Println("Could not open the file!")
		fmt.Println(err)
		return
	}

	scanner := bufio.NewScanner(file)

	var lines []string

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	err = scanner.Err()

	if err != nil {
		fmt.Println("Could not read the file!")
		fmt.Println(err)
		file.Close()
		return
	}

	prices, err := conversion.StringsToFloats(lines)
	
	if err != nil {
	fmt.Println(err)
	file.Close()
	return
	}

	job.InputPrice = prices
	file.Close()
}

func (job *TaxIncludedPriceJob) Process() {
	job.LoadData()

	result := make(map[string]string)

	for _, price := range job.InputPrice {
		taxIncludedPrice := price * (1 + job.TaxRate)
		result[fmt.Sprintf("%.2f", price)] = fmt.Sprintf("%.2f", taxIncludedPrice)
	}

	fmt.Println(result)
}

func NewTaxIncludedPriceJob(taxRate float64) *TaxIncludedPriceJob {
	return &TaxIncludedPriceJob{
		InputPrice: []float64{10, 20, 30, 45},
		TaxRate:    taxRate,
	}
}