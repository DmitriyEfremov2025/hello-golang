package main

import (
	"fmt"
	"math/rand"

	"github.com/DmitriyEfremov2025/hello-golang/neuralnet"
)

func main() {
	rand.Seed(42)

	fmt.Println("=== Neural Network: XOR Problem ===")
	fmt.Println()
	fmt.Println("Architecture: 2 inputs -> 8 hidden -> 1 output")
	fmt.Println("Activation: sigmoid | Learning rate: 2.0")
	fmt.Println("Training on XOR truth table...")
	fmt.Println()

	nn := neuralnet.New([]int{2, 8, 1}, 2.0)

	inputs := [][]float64{
		{0, 0},
		{0, 1},
		{1, 0},
		{1, 1},
	}
	targets := [][]float64{
		{0},
		{1},
		{1},
		{0},
	}

	nn.Fit(inputs, targets, 5000)

	fmt.Println()
	fmt.Println("=== Results ===")
	fmt.Printf("%-12s %-10s %-10s\n", "Input", "Expected", "Predicted")
	fmt.Println("-----------------------------------")
	for i, input := range inputs {
		output := nn.Predict(input)
		fmt.Printf("[%.0f, %.0f]      %.0f         %.4f\n", input[0], input[1], targets[i][0], output[0])
	}
	fmt.Println()
	fmt.Println("Network successfully learned the XOR function!")
}
