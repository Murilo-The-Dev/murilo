package main

import "fmt"

type Product struct{
	title string
	id string
	price float64
} 

func main() {
	// 1)
	hobbies := [3]string{"music", "code", "games"}
	fmt.Println(hobbies)

	// 2)
	fmt.Println(hobbies[0])
	lastHobbies := hobbies[1:]
	fmt.Println(lastHobbies)

	// 3)
	mainHobbies := hobbies[:2]
	fmt.Println(mainHobbies)

	// 4)
	fmt.Println(cap(mainHobbies))
	mainHobbies = mainHobbies[1:3]
	fmt.Println(mainHobbies)

	// 5)
	courseGoals := []string{"new job", "more $", "life change"}
	fmt.Println(courseGoals)

	// 6)
	courseGoals[1] = "much more $"
	fmt.Println(courseGoals)
	courseGoals = append(courseGoals, "one more goal")
	fmt.Println(courseGoals)

	// 7)
	products := []Product{
		{
			"First_Product", 
			"001", 
			11.99,
		},
		{
			"Second_Product",
			"002",
			15.99,
		},
	}

	fmt.Println(products)

	newProduct := Product{
		"Third_Product",
		"003",
		99.99,
	}

	products = append(products, newProduct)
	fmt.Println(products)
}

// Time to practice what you learned!

// 1) Create a new array (!) that contains three hobbies you have
// 		Output (print) that array in the command line.
// 2) Also output more data about that array:
//		- The first element (standalone)
//		- The second and third element combined as a new list
// 3) Create a slice based on the first element that contains
//		the first and second elements.
//		Create that slice in two different ways (i.e. create two slices in the end)
// 4) Re-slice the slice from (3) and change it to contain the second
//		and last element of the original array.
// 5) Create a "dynamic array" that contains your course goals (at least 2 goals)
// 6) Set the second goal to a different one AND then add a third goal to that existing dynamic array
// 7) Bonus: Create a "Product" struct with title, id, price and create a
//		dynamic list of products (at least 2 products).
//		Then add a third product to the existing list of products.