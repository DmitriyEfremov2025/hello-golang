package main

import (
	"fmt"
	"os"
	"sort"
)

func main() {
	var a, b, c int
	if _, err := fmt.Fscan(os.Stdin, &a, &b, &c); err != nil {
		return
	}

	fmt.Println(middle(a, b, c))
}

func middle(a, b, c int) int {
	numbers := []int{a, b, c}
	sort.Ints(numbers)
	return numbers[1]
}
