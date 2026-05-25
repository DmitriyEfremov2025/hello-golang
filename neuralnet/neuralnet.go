package neuralnet

import (
	"fmt"
	"math"
	"math/rand"
)

// Network represents a feedforward neural network.
type Network struct {
	layers  []int
	weights [][][]float64
	biases  [][]float64
	lr      float64
}

// New creates a neural network with the given layer sizes and learning rate.
// Example: New([]int{2, 4, 1}, 0.5) creates a network with 2 inputs, 4 hidden neurons, 1 output.
func New(layers []int, learningRate float64) *Network {
	n := &Network{
		layers: layers,
		lr:     learningRate,
	}
	n.weights = make([][][]float64, len(layers)-1)
	n.biases = make([][]float64, len(layers)-1)

	for i := 0; i < len(layers)-1; i++ {
		n.weights[i] = make([][]float64, layers[i+1])
		n.biases[i] = make([]float64, layers[i+1])
		for j := 0; j < layers[i+1]; j++ {
			n.weights[i][j] = make([]float64, layers[i])
			for k := 0; k < layers[i]; k++ {
				n.weights[i][j][k] = rand.Float64()*2 - 1
			}
			n.biases[i][j] = rand.Float64()*2 - 1
		}
	}
	return n
}

func sigmoid(x float64) float64 {
	return 1.0 / (1.0 + math.Exp(-x))
}

func sigmoidDerivative(x float64) float64 {
	return x * (1 - x)
}

// Forward performs a forward pass and returns activations for all layers.
func (n *Network) forward(input []float64) [][]float64 {
	activations := make([][]float64, len(n.layers))
	activations[0] = input

	for i := 0; i < len(n.layers)-1; i++ {
		activations[i+1] = make([]float64, n.layers[i+1])
		for j := 0; j < n.layers[i+1]; j++ {
			sum := n.biases[i][j]
			for k := 0; k < n.layers[i]; k++ {
				sum += n.weights[i][j][k] * activations[i][k]
			}
			activations[i+1][j] = sigmoid(sum)
		}
	}
	return activations
}

// Predict returns the network output for a given input.
func (n *Network) Predict(input []float64) []float64 {
	activations := n.forward(input)
	return activations[len(activations)-1]
}

// Train trains the network on a single sample using backpropagation.
func (n *Network) Train(input, target []float64) float64 {
	activations := n.forward(input)
	numLayers := len(n.layers)
	outputLayer := numLayers - 1

	deltas := make([][]float64, numLayers)

	// Output layer error
	deltas[outputLayer] = make([]float64, n.layers[outputLayer])
	var loss float64
	for j := 0; j < n.layers[outputLayer]; j++ {
		err := target[j] - activations[outputLayer][j]
		loss += err * err
		deltas[outputLayer][j] = err * sigmoidDerivative(activations[outputLayer][j])
	}

	// Hidden layers error (backpropagation)
	for i := outputLayer - 1; i >= 1; i-- {
		deltas[i] = make([]float64, n.layers[i])
		for j := 0; j < n.layers[i]; j++ {
			var err float64
			for k := 0; k < n.layers[i+1]; k++ {
				err += deltas[i+1][k] * n.weights[i][k][j]
			}
			deltas[i][j] = err * sigmoidDerivative(activations[i][j])
		}
	}

	// Update weights and biases
	for i := 0; i < numLayers-1; i++ {
		for j := 0; j < n.layers[i+1]; j++ {
			for k := 0; k < n.layers[i]; k++ {
				n.weights[i][j][k] += n.lr * deltas[i+1][j] * activations[i][k]
			}
			n.biases[i][j] += n.lr * deltas[i+1][j]
		}
	}

	return loss
}

// Fit trains the network on a dataset for a given number of epochs.
// Returns the final average loss.
func (n *Network) Fit(inputs, targets [][]float64, epochs int) float64 {
	var avgLoss float64
	for epoch := 0; epoch < epochs; epoch++ {
		var totalLoss float64
		for i := range inputs {
			totalLoss += n.Train(inputs[i], targets[i])
		}
		avgLoss = totalLoss / float64(len(inputs))
		if (epoch+1)%1000 == 0 {
			fmt.Printf("Epoch %d, Loss: %.6f\n", epoch+1, avgLoss)
		}
	}
	return avgLoss
}
